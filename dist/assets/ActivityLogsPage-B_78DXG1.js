import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, a5 as Download, a4 as Funnel, x as User, o as Activity, y as Calendar, a6 as Globe, $ as ChevronLeft, a0 as ChevronRight } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { j as getAdmins, l as getActivityLogs } from './admin-BVl3HTxX.js';
import './index-BHy36ITo.js';

function ActivityLogsPage() {
  const [logs, setLogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [page, setPage] = reactExports.useState(1);
  const [limit] = reactExports.useState(20);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [totalItems, setTotalItems] = reactExports.useState(0);
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  const [adminFilter, setAdminFilter] = reactExports.useState("all");
  const [admins, setAdmins] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchAdmins();
  }, []);
  reactExports.useEffect(() => {
    fetchLogs();
  }, [page, actionFilter, adminFilter]);
  const fetchAdmins = async () => {
    try {
      const response = await getAdmins();
      if (response.success) {
        setAdmins(response.data.admins);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit
      };
      if (actionFilter !== "all") {
        params.action = actionFilter;
      }
      if (adminFilter !== "all") {
        params.admin_id = parseInt(adminFilter);
      }
      const response = await getActivityLogs(params);
      if (response.success) {
        setLogs(response.data.logs);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      toast.error(error.response?.data?.message || "Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateString;
    }
  };
  const getActionBadge = (action) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes("login")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-purple-500", children: "Login" });
    }
    if (actionLower.includes("logout")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-500", children: "Logout" });
    }
    if (actionLower.includes("create") || actionLower.includes("created")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500", children: "Create" });
    }
    if (actionLower.includes("update") || actionLower.includes("updated")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500", children: "Update" });
    }
    if (actionLower.includes("delete") || actionLower.includes("deleted")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Delete" });
    }
    if (actionLower.includes("activate") || actionLower.includes("activated")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-600", children: "Activate" });
    }
    if (actionLower.includes("deactivate") || actionLower.includes("deactivated")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-orange-500", children: "Deactivate" });
    }
    if (actionLower.includes("reset") && actionLower.includes("password")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500", children: "Reset Password" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: action.replace(/_/g, " ") });
  };
  const getResultBadge = (result) => {
    if (result === "success") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500", children: "Success" });
    }
    if (result === "failed" || result === "error") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Failed" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: result });
  };
  const exportToCSV = () => {
    const headers = ["Date/Time", "Admin", "Action", "Target Type", "Target ID", "Description", "Result", "IP Address", "User Agent"];
    const rows = logs.map((log) => {
      const ipAddress = log.ip_address ? log.ip_address.startsWith("::ffff:") ? log.ip_address.replace("::ffff:", "") : log.ip_address : "-";
      return [
        formatDate(log.created_at),
        log.admin ? `${log.admin.fname} ${log.admin.lname} (${log.admin.email})` : "System",
        log.action.replace(/_/g, " "),
        log.target_type,
        log.target_id.toString(),
        log.description,
        log.result,
        ipAddress,
        log.user_agent || "-"
      ];
    });
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `activity-logs-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Activity logs exported to CSV");
  };
  const actionOptions = [
    { value: "all", label: "All Actions" },
    { value: "admin_login", label: "Login" },
    { value: "admin_logout", label: "Logout" },
    { value: "created", label: "Created" },
    { value: "updated", label: "Updated" },
    { value: "deleted", label: "Deleted" },
    { value: "activated_student", label: "Activated Student" },
    { value: "deactivated_student", label: "Deactivated Student" },
    { value: "activated_staff", label: "Activated Staff" },
    { value: "deactivated_staff", label: "Deactivated Staff" },
    { value: "reset_student_password", label: "Reset Password" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Activity Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "View all administrative actions and changes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: exportToCSV, variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
        "Export to CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Activity Logs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
            "Showing ",
            logs.length,
            " of ",
            totalItems,
            " logs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: actionFilter, onValueChange: setActionFilter, disabled: loading, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 mr-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: actionOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: adminFilter, onValueChange: setAdminFilter, disabled: loading, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-48", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 mr-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by admin" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Admins" }),
              admins.map((admin) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: admin.id.toString(), children: [
                admin.fname,
                " ",
                admin.lname
              ] }, admin.id))
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date/Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Action" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Target" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Result" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IP Address" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) })
          ] }, index)) : logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-12 w-12 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No activity logs found" })
          ] }) }) }) : logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              formatDate(log.created_at)
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: log.admin ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                  log.admin.fname,
                  " ",
                  log.admin.lname
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: log.admin.email })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "System" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getActionBadge(log.action) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: log.target_type }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "ID: ",
                log.target_id
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: log.description }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getResultBadge(log.result) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: log.ip_address ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: log.ip_address.startsWith("::ffff:") ? log.ip_address.replace("::ffff:", "") : log.ip_address })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "-" }) })
          ] }, log.id)) })
        ] }) }),
        !loading && logs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            page,
            " of ",
            totalPages,
            " (",
            totalItems,
            " total logs)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                disabled: page === 1 || loading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                  "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                disabled: page === totalPages || loading,
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}

export { ActivityLogsPage as default };
