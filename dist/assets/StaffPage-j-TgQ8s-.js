const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/StaffActionDialogs-B-BRVhks.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/alert-dialog-B-eBACCp.js","assets/EditStaffDialog-BS2PrgRl.js","assets/dialog-Bga1LIUy.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/admin-BVl3HTxX.js","assets/CreateStaffDialog-BRDFLvI3.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, U as Users, I as UserCheck, k as BookOpen, G as GraduationCap, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, p as SquarePen, _ as Key, D as CircleX, $ as ChevronLeft, a0 as ChevronRight, a1 as Plus, J as Search, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-DKXLAlrm.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { f as getStaff, h as deactivateStaff, i as resetStaffPassword } from './admin-BVl3HTxX.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';

function useStaffManagement() {
  const [staff, setStaff] = reactExports.useState([]);
  const [pagination, setPagination] = reactExports.useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [selectedStaff, setSelectedStaff] = reactExports.useState(null);
  const [selectedStaffId, setSelectedStaffId] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = reactExports.useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchStaff();
  }, [currentPage]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchStaff();
      } else {
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10
      };
      if (searchTerm) params.search = searchTerm;
      const response = await getStaff(params);
      if (response.success) {
        setStaff(response.data.staff);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      toast.error(error.response?.data?.message || "Failed to load staff");
    } finally {
      setLoading(false);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleDeactivateStaff = async () => {
    if (!selectedStaff) return;
    try {
      setActionLoading(true);
      const response = await deactivateStaff(selectedStaff.id);
      if (response.success) {
        setStaff(
          (prevStaff) => prevStaff.map(
            (member) => member.id === selectedStaff.id ? { ...member, admin_status: "inactive" } : member
          )
        );
        toast.success(response.message);
        setShowDeactivateDialog(false);
      }
    } catch (error) {
      console.error("Error deactivating staff:", error);
      toast.error(error.response?.data?.message || "Failed to deactivate staff");
    } finally {
      setActionLoading(false);
    }
  };
  const handleResetPassword = async () => {
    if (!selectedStaff) return;
    try {
      setActionLoading(true);
      const tempPassword = `Staff${selectedStaff.id}!${Math.random().toString(36).slice(-4)}`;
      const response = await resetStaffPassword(selectedStaff.id, {
        newPassword: tempPassword
      });
      if (response.success) {
        toast.success(response.message);
        setShowResetPasswordDialog(false);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setActionLoading(false);
    }
  };
  const handleStaffUpdated = (updatedData) => {
    setStaff(
      (prevStaff) => prevStaff.map(
        (member) => member.id === updatedData.id ? { ...member, ...updatedData } : member
      )
    );
  };
  const handleStaffCreated = () => {
    fetchStaff();
  };
  return {
    // State
    staff,
    pagination,
    loading,
    searchTerm,
    currentPage,
    selectedStaff,
    selectedStaffId,
    actionLoading,
    showEditDialog,
    showCreateDialog,
    showDeactivateDialog,
    showResetPasswordDialog,
    // Setters
    setSearchTerm,
    setSelectedStaff,
    setSelectedStaffId,
    setShowEditDialog,
    setShowCreateDialog,
    setShowDeactivateDialog,
    setShowResetPasswordDialog,
    // Handlers
    handlePreviousPage,
    handleNextPage,
    handleDeactivateStaff,
    handleResetPassword,
    handleStaffUpdated,
    handleStaffCreated,
    refetchStaff: fetchStaff
  };
}

function StaffStatistics({
  loading,
  staff,
  pagination
}) {
  const staffWithCourses = staff.filter((s) => s.courses && s.courses.length > 0).length;
  const totalCourses = staff.reduce((sum, s) => sum + (s.courses?.length || 0), 0);
  const avgCourses = staff.length > 0 ? (totalCourses / staff.length).toFixed(1) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Staff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : pagination.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "All staff members" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Teaching Staff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 text-green-600" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : staffWithCourses }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "With assigned courses" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-blue-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-500", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : totalCourses }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Assigned to staff" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Avg. Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-purple-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-purple-500", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : avgCourses }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Per staff member" })
      ] })
    ] })
  ] });
}

function StaffTable({
  loading,
  staff,
  searchTerm,
  onEditStaff,
  onResetPassword,
  onDeactivateStaff
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[50px]", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8" }) })
    ] }, index)) : staff.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No staff members found" }),
      searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your search" })
    ] }) }) }) : staff.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: member.full_name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: member.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: member.phone || "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
        member.courses?.length || 0,
        " ",
        member.courses?.length === 1 ? "Course" : "Courses"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEditStaff(member), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "mr-2 h-4 w-4" }),
            "Edit Staff"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onResetPassword(member), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "mr-2 h-4 w-4" }),
            "Reset Password"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              className: "text-orange-600",
              onClick: () => onDeactivateStaff(member),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mr-2 h-4 w-4" }),
                "Deactivate"
              ]
            }
          )
        ] })
      ] }) })
    ] }, member.id)) })
  ] }) });
}

function StaffPagination({
  currentPage,
  pagination,
  onPreviousPage,
  onNextPage
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "Showing ",
      (currentPage - 1) * (pagination.limit || 10) + 1,
      " to",
      " ",
      Math.min(
        currentPage * (pagination.limit || 10),
        pagination.total || 0
      ),
      " ",
      "of ",
      pagination.total || 0,
      " staff"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onPreviousPage,
          disabled: currentPage === 1,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
            "Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium px-3", children: [
        "Page ",
        currentPage,
        " of ",
        pagination.totalPages || 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onNextPage,
          disabled: currentPage >= (pagination.totalPages || 1),
          children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
          ]
        }
      )
    ] })
  ] });
}

const StaffActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./StaffActionDialogs-B-BRVhks.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0));
const EditStaffDialog = reactExports.lazy(() => __vitePreload(() => import('./EditStaffDialog-BS2PrgRl.js'),true              ?__vite__mapDeps([4,1,2,5,6,7,8]):void 0));
const CreateStaffDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateStaffDialog-BRDFLvI3.js'),true              ?__vite__mapDeps([9,1,2,5,6,7,8]):void 0));
function StaffPage() {
  const {
    staff,
    pagination,
    loading,
    searchTerm,
    currentPage,
    selectedStaff,
    actionLoading,
    showEditDialog,
    showCreateDialog,
    showDeactivateDialog,
    showResetPasswordDialog,
    setSearchTerm,
    setSelectedStaff,
    setShowEditDialog,
    setShowCreateDialog,
    setShowDeactivateDialog,
    setShowResetPasswordDialog,
    handlePreviousPage,
    handleNextPage,
    handleDeactivateStaff,
    handleResetPassword,
    handleStaffUpdated,
    handleStaffCreated
  } = useStaffManagement();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Staff Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage all staff members in the system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Staff"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaffStatistics, { loading, staff, pagination }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Staff" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View and manage staff accounts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search staff...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "pl-10"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StaffTable,
          {
            loading,
            staff,
            searchTerm,
            onEditStaff: (staff2) => {
              setSelectedStaff(staff2);
              setShowEditDialog(true);
            },
            onResetPassword: (staff2) => {
              setSelectedStaff(staff2);
              setShowResetPasswordDialog(true);
            },
            onDeactivateStaff: (staff2) => {
              setSelectedStaff(staff2);
              setShowDeactivateDialog(true);
            }
          }
        ),
        !loading && staff.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          StaffPagination,
          {
            currentPage,
            pagination,
            onPreviousPage: handlePreviousPage,
            onNextPage: handleNextPage
          }
        )
      ] })
    ] }),
    showDeactivateDialog || showResetPasswordDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaffActionDialogs,
      {
        selectedStaff,
        actionLoading,
        showDeactivateDialog,
        showResetPasswordDialog,
        onDeactivateDialogChange: setShowDeactivateDialog,
        onResetPasswordDialogChange: setShowResetPasswordDialog,
        onConfirmDeactivate: handleDeactivateStaff,
        onConfirmResetPassword: handleResetPassword
      }
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditStaffDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowEditDialog(false);
            setSelectedStaff(null);
          }
        },
        staff: selectedStaff,
        onStaffUpdated: handleStaffUpdated
      }
    ) }) : null,
    showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateStaffDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onStaffCreated: handleStaffCreated
      }
    ) }) : null
  ] });
}

export { StaffPage as default };
