const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ViewPermissionsDialog-CHpXWDDk.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/CreateAdminDialog-yuzU3TbM.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/checkbox-CgkZGnpM.js","assets/admin-BVl3HTxX.js","assets/EditAdminDialog-Duu-zHBR.js","assets/AdminActionDialogs-CvGVOcys.js","assets/alert-dialog-B-eBACCp.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, U as Users, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, S as Shield, b as Eye, o as Activity, p as SquarePen, D as CircleX, a3 as Trash, u as useNavigate, a1 as Plus, J as Search, a4 as Funnel, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { j as getAdmins, a as getAdminProfile, k as deactivateAdmin } from './admin-BVl3HTxX.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import './index-BHy36ITo.js';

function useAdminsManagement() {
  const [allAdmins, setAllAdmins] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    fetchAdmins();
  }, []);
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await getAdmins();
      if (response.success) {
        setAllAdmins(response.data.admins);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error(error.response?.data?.message || "Failed to load admins");
    } finally {
      setLoading(false);
    }
  };
  const admins = reactExports.useMemo(() => {
    let filtered = [...allAdmins];
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (admin) => admin.email.toLowerCase().includes(searchLower) || admin.fname.toLowerCase().includes(searchLower) || admin.lname.toLowerCase().includes(searchLower) || `${admin.fname} ${admin.lname}`.toLowerCase().includes(searchLower)
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (admin) => admin.status === statusFilter
      );
    }
    return filtered;
  }, [allAdmins, searchTerm, statusFilter]);
  const totalAdmins = count;
  const activeAdmins = allAdmins.filter((admin) => admin.status === "active").length;
  const inactiveAdmins = allAdmins.filter((admin) => admin.status === "inactive").length;
  return {
    // State
    admins,
    loading,
    searchTerm,
    statusFilter,
    totalAdmins,
    activeAdmins,
    inactiveAdmins,
    // Setters
    setSearchTerm,
    setStatusFilter,
    // Handlers
    refetchAdmins: fetchAdmins
  };
}

function AdminsTable({
  loading,
  admins,
  searchTerm,
  onShowPermissions,
  onViewDetails,
  onViewActivityLog,
  onEdit,
  onDeactivate,
  onDelete
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "-";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Last Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Joined Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8" }) })
    ] }, index)) : admins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No admins found" }),
      searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your search" })
    ] }) }) }) : admins.map((admin, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
        admin.fname,
        " ",
        admin.lname
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: admin.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-purple-50", children: admin.role }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: admin.status === "active" ? "default" : "secondary",
          children: admin.status
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: formatDate(admin.last_login) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: formatDate(admin.created_at) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onShowPermissions(admin),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 mr-2" }),
                "Show Permissions"
              ]
            }
          ),
          onViewDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onViewDetails(admin), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-2" }),
            "View Details"
          ] }),
          onViewActivityLog && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onViewActivityLog(admin),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 mr-2" }),
                "View Activity Log"
              ]
            }
          ),
          onEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEdit(admin), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
            "Edit"
          ] }),
          onDeactivate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              className: "text-orange-500",
              onClick: () => onDeactivate(admin),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-2" }),
                "Deactivate"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              className: "text-destructive",
              onClick: () => onDelete(admin),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "h-4 w-4 mr-2" }),
                "Delete"
              ]
            }
          )
        ] })
      ] }) })
    ] }, admin.id)) })
  ] }) });
}

const ViewPermissionsDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewPermissionsDialog-CHpXWDDk.js'),true              ?__vite__mapDeps([0,1,2,3,4]):void 0));
const CreateAdminDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateAdminDialog-yuzU3TbM.js'),true              ?__vite__mapDeps([5,1,2,3,6,7,8,9,10,11]):void 0));
const EditAdminDialog = reactExports.lazy(() => __vitePreload(() => import('./EditAdminDialog-Duu-zHBR.js'),true              ?__vite__mapDeps([12,1,2,3,6,7,11]):void 0));
const AdminActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./AdminActionDialogs-CvGVOcys.js'),true              ?__vite__mapDeps([13,1,2,14]):void 0));
function AdminsPage() {
  const navigate = useNavigate();
  const {
    admins,
    loading,
    searchTerm,
    statusFilter,
    totalAdmins,
    activeAdmins,
    inactiveAdmins,
    setSearchTerm,
    setStatusFilter,
    refetchAdmins
  } = useAdminsManagement();
  const [selectedAdmin, setSelectedAdmin] = reactExports.useState(null);
  const [showPermissionsDialog, setShowPermissionsDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [currentAdminId, setCurrentAdminId] = reactExports.useState();
  reactExports.useEffect(() => {
    fetchCurrentAdmin();
  }, []);
  const fetchCurrentAdmin = async () => {
    try {
      const response = await getAdminProfile();
      if (response.success) {
        setCurrentAdminId(response.data.admin.id);
      }
    } catch (error) {
      console.error("Error fetching current admin:", error);
    }
  };
  const handleCreateAdmin = () => {
    refetchAdmins();
  };
  const handleEditAdmin = () => {
    refetchAdmins();
  };
  const handleDeactivateAdmin = async () => {
    if (!selectedAdmin) return;
    try {
      setActionLoading(true);
      const response = await deactivateAdmin(selectedAdmin.id);
      if (response.success) {
        toast.success(response.message || "Admin deactivated successfully");
        refetchAdmins();
        setShowDeactivateDialog(false);
        setSelectedAdmin(null);
      }
    } catch (error) {
      console.error("Error deactivating admin:", error);
      toast.error(error.response?.data?.message || "Failed to deactivate admin");
    } finally {
      setActionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Admins Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage all system administrators" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Admin"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Admin Statistics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Overview of admin data" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" })
      ] }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Admins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: totalAdmins })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Active Admins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-500", children: activeAdmins })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Inactive Admins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-500", children: inactiveAdmins })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Recent Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-500", children: "-" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Admins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View and manage admin accounts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => navigate("/super-admin/activity-logs"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 mr-2" }),
                "View Activity Logs"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search admins...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-8",
                disabled: loading
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, disabled: loading, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-32", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 mr-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdminsTable,
        {
          loading,
          admins,
          searchTerm,
          onShowPermissions: (admin) => {
            setSelectedAdmin(admin);
            setShowPermissionsDialog(true);
          },
          onEdit: (admin) => {
            setSelectedAdmin(admin);
            setShowEditDialog(true);
          },
          onDeactivate: (admin) => {
            setSelectedAdmin(admin);
            setShowDeactivateDialog(true);
          }
        }
      ) })
    ] }),
    showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateAdminDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onAdminCreated: handleCreateAdmin
      }
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditAdminDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          setShowEditDialog(open);
          if (!open) {
            setSelectedAdmin(null);
          }
        },
        admin: selectedAdmin,
        onAdminUpdated: handleEditAdmin
      }
    ) }) : null,
    showDeactivateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminActionDialogs,
      {
        selectedAdmin,
        actionLoading,
        showDeactivateDialog,
        onDeactivateDialogChange: (open) => {
          setShowDeactivateDialog(open);
          if (!open) {
            setSelectedAdmin(null);
          }
        },
        onConfirmDeactivate: handleDeactivateAdmin,
        currentAdminId
      }
    ) }) : null,
    showPermissionsDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewPermissionsDialog,
      {
        open: showPermissionsDialog,
        onOpenChange: (open) => {
          setShowPermissionsDialog(open);
          if (!open) {
            setSelectedAdmin(null);
          }
        },
        admin: selectedAdmin
      }
    ) }) : null
  ] });
}

export { AdminsPage as default };
