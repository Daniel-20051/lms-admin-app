import { r as reactExports, u as useNavigate, a as useAuth, j as jsxRuntimeExports, S as Shield, E as EyeOff, b as Eye, L as Link, B as Button, c as LoaderCircle, A as AuthApi, s as setUserData, d as setLoginState, t as toast } from './index-BG4-akrH.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';

function AdminLoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const authApi = new AuthApi();
      const response = await authApi.LoginAdmin({ email, password });
      const data = response.data;
      if (data.success) {
        const adminData = data.data.admin;
        const userData = {
          id: String(adminData.id),
          email: adminData.email,
          name: `${adminData.firstName} ${adminData.lastName}`,
          role: adminData.role === "super_admin" ? "super_admin" : "admin",
          permissions: adminData.permissions,
          userType: "admin"
        };
        setUserData(userData);
        setLoginState(true);
        setIsLoggedIn(true);
        setUser(userData);
        toast.success("Admin login successful!");
        navigate("/super-admin/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary/10 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-primary" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "Admin Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Access the administrative dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "email",
            type: "email",
            placeholder: "admin@example.com",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            disabled: isLoading
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "password",
              type: showPassword ? "text" : "password",
              placeholder: "••••••••",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              disabled: isLoading,
              className: "pr-10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPassword((prev) => !prev),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": showPassword ? "Hide password" : "Show password",
              children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/forgot-password",
          className: "text-sm text-muted-foreground hover:text-primary",
          children: "Forgot password?"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full",
          disabled: isLoading,
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Logging in..."
          ] }) : "Login as Admin"
        }
      )
    ] }) })
  ] }) }) });
}

export { AdminLoginPage as default };
