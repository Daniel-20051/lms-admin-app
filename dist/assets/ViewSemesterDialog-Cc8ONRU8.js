import { r as reactExports, t as toast, j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Separator } from './separator-BjHBJBAG.js';
import { a as getSemester } from './semesters-oK3Qf9Wp.js';

function ViewSemesterDialog({
  open,
  onOpenChange,
  semesterId
}) {
  const [semester, setSemester] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open && semesterId) {
      fetchSemester();
    } else {
      setSemester(null);
    }
  }, [open, semesterId]);
  const fetchSemester = async () => {
    if (!semesterId) return;
    setLoading(true);
    try {
      const response = await getSemester(semesterId);
      setSemester(response.data.semester);
    } catch (error) {
      console.error("Error fetching semester:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch semester details");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "bg-green-500", children: "Active" });
      case "closed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-gray-500 text-white", children: "Closed" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-yellow-500 text-white", children: "Pending" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
    }
  };
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return dateString;
    }
  };
  const formatDateFull = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateString;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Semester Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "View detailed information about this semester" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading semester details..." })
    ] }) : semester ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Semester Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "ID:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: semester.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Academic Year:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm font-medium", children: semester.academic_year })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Semester:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm font-medium", children: semester.semester })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Status:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: getStatusBadge(semester.status) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Start Date:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: formatDate(semester.start_date) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "End Date:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: formatDate(semester.end_date) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Date Created:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: formatDateFull(semester.date) })
        ] })
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No semester data available" }) }) })
  ] }) });
}

export { ViewSemesterDialog as default };
