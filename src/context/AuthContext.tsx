import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { 
  hasValidToken, 
  getUserData, 
  getLoginState, 
  clearAllAuthCookies
} from "../lib/cookies";
import { AuthApi } from "@/api/auth";

interface User {
  id: string;
  email: string;
  name: string;
  role: "staff" | "student" | "super_admin" | "admin";
  permissions?: any;
  userType?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isInitializing: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const isAdmin = user?.role === "staff";
  const isSuperAdmin = user?.role === "super_admin" || user?.role === "admin";


  const authApiRef = useRef<AuthApi | null>(null);
  if (!authApiRef.current) {
    authApiRef.current = new AuthApi();
  }

  const performLogout = (shouldBroadcast = true) => {
    clearAllAuthCookies();
    setIsLoggedIn(false);
    setUser(null);

    if (shouldBroadcast) {
      // Dispatch custom event for cross-tab logout synchronization
      window.dispatchEvent(new CustomEvent("auth:token-removed"));
    }
  };

  const logout = () => {
    authApiRef.current
      ?.logout()
      .catch((error) => {
        console.error("Failed to logout via API:", error);
      });
    performLogout(true);
  };

  useEffect(() => {
    try {
      const savedUser = getUserData();
      const savedIsLoggedIn = getLoginState();
      const hasToken = hasValidToken();

      // Check if user is logged in and has a valid token
      if (savedIsLoggedIn && savedUser && hasToken) {
        setIsLoggedIn(true);
        setUser(savedUser);
      } else if (savedIsLoggedIn && !hasToken) {
        // Token expired, logout user without rebroadcasting
        performLogout(false);
      }
    } catch (error) {
      // Ignore cookie errors and start unauthenticated
      performLogout(false);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  // Proactively detect token removal/expiry without requiring a page refresh
  useEffect(() => {
    // Periodic check in case the cookie expires naturally
    const intervalId = window.setInterval(() => {
      if (isLoggedIn && !hasValidToken()) {
        logout();
      }
    }, 15000); // check every 15s

    // Listen for explicit logout signals from API layer or other tabs
    const handleAuthTokenRemoved = () => {
      if (isLoggedIn) {
        performLogout(false);
      }
    };

    // Listen for explicit logout signals from API layer or other tabs
    window.addEventListener(
      "auth:token-removed",
      handleAuthTokenRemoved as EventListener
    );

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(
        "auth:token-removed",
        handleAuthTokenRemoved as EventListener
      );
    };
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isAdmin,
        isSuperAdmin,
        isInitializing,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
