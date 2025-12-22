import { r as reactExports, t as toast, j as jsxRuntimeExports, l as Building2, U as Users, k as BookOpen, a9 as DollarSign, aC as CircleCheckBig, z as Clock, D as CircleX } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-DKXLAlrm.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { ab as getOrganizationById } from './admin-BVl3HTxX.js';

function ViewOrganizationDialog({
  open,
  onOpenChange,
  organizationId
}) {
  const [organizationData, setOrganizationData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (open && organizationId) {
      setOrganizationData(null);
      setError(null);
      setLoading(false);
      const timer = setTimeout(() => {
        fetchOrganizationDetails();
      }, 50);
      return () => clearTimeout(timer);
    }
    if (!open) {
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    }
    return () => {
      setOrganizationData(null);
      setError(null);
      setLoading(false);
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    };
  }, [open, organizationId]);
  const fetchOrganizationDetails = async () => {
    if (!organizationId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await getOrganizationById(organizationId);
      if (response.success) {
        setOrganizationData(response.data.organization);
      }
    } catch (error2) {
      console.error("Error fetching organization details:", error2);
      const errorMessage = error2.response?.data?.message || "Failed to fetch organization details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "active" || statusLower === "approved") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3 mr-1" }),
        "Active"
      ] });
    } else if (statusLower === "suspended") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 mr-1" }),
        "Suspended"
      ] });
    } else if (statusLower === "pending" || statusLower === "pending_approval") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 mr-1" }),
        "Pending"
      ] });
    } else if (statusLower === "rejected") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3 mr-1" }),
        "Rejected"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status || "Unknown" });
  };
  const formatCurrency = (amount, currency = "USD") => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD"
    }).format(numAmount);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Organization Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "View complete organization information, users, courses, and earnings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive", children: error }) }) : organizationData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "profile", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "users", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "courses", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "earnings", children: "Earnings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", className: "space-y-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5" }),
          "Organization Information"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.entries(organizationData).map(([key, value]) => {
            if (key === "users" || key === "courses" || key === "earnings" || typeof value === "object") {
              return null;
            }
            if (key === "id") {
              return null;
            }
            const displayKey = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
            const displayValue = value === null || value === void 0 ? "N/A" : String(value);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: displayKey }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: displayValue })
            ] }, key);
          }) }),
          organizationData.status && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground mb-2", children: "Status" }),
            getStatusBadge(organizationData.status)
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", className: "space-y-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
          "Organization Users (Tutors)"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: organizationData.users && organizationData.users.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: organizationData.users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: user.name || `User #${user.id}` }),
          user.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user.email })
        ] }) }) }) }, user.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No users assigned" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "courses", className: "space-y-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
          "Courses"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: organizationData.courses && organizationData.courses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: organizationData.courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: course.title }),
          course.course_code && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Code: ",
            course.course_code
          ] })
        ] }) }) }) }, course.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No courses assigned" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "earnings", className: "space-y-4 mt-4", children: organizationData.earnings ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }),
          "Earnings Summary"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 bg-muted rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Earnings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: formatCurrency(
            typeof organizationData.earnings.total === "string" ? parseFloat(organizationData.earnings.total) : organizationData.earnings.total,
            organizationData.earnings.currency || "USD"
          ) })
        ] }) }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No earnings information available" })
      ] }) }) })
    ] }) : null })
  ] }) });
}

export { ViewOrganizationDialog as default };
