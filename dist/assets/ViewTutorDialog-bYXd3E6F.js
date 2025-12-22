import { r as reactExports, t as toast, j as jsxRuntimeExports, x as User, k as BookOpen, a9 as DollarSign, au as Wallet, aC as CircleCheckBig, z as Clock, D as CircleX } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-DKXLAlrm.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { aa as getSoleTutorById } from './admin-BVl3HTxX.js';

function ViewTutorDialog({
  open,
  onOpenChange,
  tutorId
}) {
  const [tutorData, setTutorData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (open && tutorId) {
      setTutorData(null);
      setError(null);
      setLoading(false);
      const timer = setTimeout(() => {
        fetchTutorDetails();
      }, 50);
      return () => clearTimeout(timer);
    }
    if (!open) {
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    }
    return () => {
      setTutorData(null);
      setError(null);
      setLoading(false);
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    };
  }, [open, tutorId]);
  const fetchTutorDetails = async () => {
    if (!tutorId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await getSoleTutorById(tutorId);
      if (response.success) {
        setTutorData(response.data.tutor);
      }
    } catch (error2) {
      console.error("Error fetching tutor details:", error2);
      const errorMessage = error2.response?.data?.message || "Failed to fetch tutor details";
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
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return dateString;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tutor Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "View complete tutor information, courses, and earnings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive", children: error }) }) : tutorData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "profile", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "courses", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "earnings", children: "Earnings & Wallet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", className: "space-y-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }),
          "Personal Information"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.entries(tutorData).map(([key, value]) => {
            if (key === "courses" || key === "wallet" || key === "earnings" || typeof value === "object") {
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
          tutorData.status && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground mb-2", children: "Status" }),
            getStatusBadge(tutorData.status)
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "courses", className: "space-y-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
          "Courses"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: tutorData.courses && tutorData.courses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: tutorData.courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "earnings", className: "space-y-4 mt-4", children: [
        tutorData.earnings && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }),
            "Earnings Summary"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: formatCurrency(
              typeof tutorData.earnings.total === "string" ? parseFloat(tutorData.earnings.total) : tutorData.earnings.total,
              tutorData.earnings.currency || "USD"
            ) })
          ] }) }) })
        ] }),
        tutorData.wallet && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }),
            "Wallet"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 bg-muted rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Current Balance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: formatCurrency(
                typeof tutorData.wallet.balance === "string" ? parseFloat(tutorData.wallet.balance) : tutorData.wallet.balance,
                tutorData.wallet.currency || "USD"
              ) })
            ] }),
            tutorData.wallet.transactions && tutorData.wallet.transactions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Recent Transactions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: tutorData.wallet.transactions.slice(0, 10).map((transaction) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-2 border rounded", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: transaction.type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(transaction.date) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${transaction.type === "Credit" ? "text-green-600" : "text-red-600"}`, children: [
                  transaction.type === "Credit" ? "+" : "-",
                  formatCurrency(transaction.amount, tutorData.wallet?.currency || "USD")
                ] })
              ] }, transaction.id)) })
            ] })
          ] })
        ] }),
        !tutorData.earnings && !tutorData.wallet && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No earnings or wallet information available" })
        ] }) })
      ] })
    ] }) : null })
  ] }) });
}

export { ViewTutorDialog as default };
