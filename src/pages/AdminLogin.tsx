import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { AuthApi } from "@/api/auth";
import { toast } from "sonner";
import { Shield, Loader2, Eye, EyeOff } from "lucide-react";
import { setUserData, setLoginState } from "@/lib/cookies";

interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      permissions: any;
      status: string;
      profileImage: string | null;
    };
    accessToken: string;
    userType: string;
    expiresIn: number;
  };
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const authApi = new AuthApi();
      const response = await authApi.LoginAdmin({ email, password });
      const data = response.data as AdminLoginResponse;

      if (data.success) {
        const adminData = data.data.admin;
        
        // Format user data for auth context
        const userData = {
          id: String(adminData.id),
          email: adminData.email,
          name: `${adminData.firstName} ${adminData.lastName}`,
          role: adminData.role === "super_admin" ? "super_admin" : "admin",
          permissions: adminData.permissions,
          userType: "admin",
        };

        // Store user data
        setUserData(userData);
        setLoginState(true);
        
        // Update auth context
        setIsLoggedIn(true);
        setUser(userData as any);

        toast.success("Admin login successful!");
        
        // Redirect to super admin dashboard
        navigate("/super-admin/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Admin login error:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center pt-3">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Access the administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login as Admin"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

