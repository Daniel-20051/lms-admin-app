const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/StudentActionDialogs-B1CmJo3Z.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/alert-dialog-B-eBACCp.js","assets/ViewStudentDialog-D4-gHdsy.js","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/skeleton-Bd8cuwAJ.js","assets/card-DKXLAlrm.js","assets/tabs-CdamqglU.js","assets/admin-BVl3HTxX.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/EditStudentDialog-BWY_kYDV.js","assets/programs-a0V4l-AP.js","assets/CreateStudentDialog-9n47Twm6.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, U as Users, I as UserCheck, m as UserX, G as GraduationCap, J as Search, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, b as Eye, p as SquarePen, Y as Power, Z as Check, _ as Key, $ as ChevronLeft, a0 as ChevronRight, a1 as Plus, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-DKXLAlrm.js';
import { b as getStudents, d as deactivateStudent, c as activateStudent, r as resetStudentPassword, e as getStudentStatistics } from './admin-BVl3HTxX.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import './index-BHy36ITo.js';

function useStudentsManagement() {
  const [students, setStudents] = reactExports.useState([]);
  const [pagination, setPagination] = reactExports.useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [levelFilter, setLevelFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("active");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [selectedStudent, setSelectedStudent] = reactExports.useState(null);
  const [selectedStudentId, setSelectedStudentId] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = reactExports.useState(false);
  const [showActivateDialog, setShowActivateDialog] = reactExports.useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchStudents();
  }, [currentPage, levelFilter, statusFilter]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchStudents();
      } else {
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10
      };
      if (searchTerm) params.search = searchTerm;
      if (levelFilter !== "all") params.level = parseInt(levelFilter);
      if (statusFilter !== "all") params.status = statusFilter;
      const response = await getStudents(params);
      if (response.success) {
        setStudents(response.data.students);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error(error.response?.data?.message || "Failed to load students");
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
  const handleDeactivateStudent = async () => {
    if (!selectedStudent) return;
    try {
      setActionLoading(true);
      const response = await deactivateStudent(selectedStudent.id);
      if (response.success) {
        setStudents(
          (prevStudents) => prevStudents.map(
            (student) => student.id === selectedStudent.id ? { ...student, admin_status: "inactive" } : student
          )
        );
        toast.success(response.message);
        setShowDeactivateDialog(false);
      }
    } catch (error) {
      console.error("Error deactivating student:", error);
      toast.error(error.response?.data?.message || "Failed to deactivate student");
    } finally {
      setActionLoading(false);
    }
  };
  const handleActivateStudent = async () => {
    if (!selectedStudent) return;
    try {
      setActionLoading(true);
      const response = await activateStudent(selectedStudent.id);
      if (response.success) {
        setStudents(
          (prevStudents) => prevStudents.map(
            (student) => student.id === selectedStudent.id ? { ...student, admin_status: "active" } : student
          )
        );
        toast.success(response.message);
        setShowActivateDialog(false);
      }
    } catch (error) {
      console.error("Error activating student:", error);
      toast.error(error.response?.data?.message || "Failed to activate student");
    } finally {
      setActionLoading(false);
    }
  };
  const handleResetPassword = async () => {
    if (!selectedStudent) return;
    try {
      setActionLoading(true);
      const tempPassword = `Student${selectedStudent.id}!${Math.random().toString(36).slice(-4)}`;
      const response = await resetStudentPassword(selectedStudent.id, {
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
  const handleStudentUpdated = (updatedData) => {
    setStudents(
      (prevStudents) => prevStudents.map(
        (student) => student.id === updatedData.id ? { ...student, ...updatedData } : student
      )
    );
  };
  const handleStudentCreated = () => {
    fetchStudents();
  };
  return {
    // State
    students,
    pagination,
    loading,
    searchTerm,
    levelFilter,
    statusFilter,
    currentPage,
    selectedStudent,
    selectedStudentId,
    actionLoading,
    showViewDialog,
    showEditDialog,
    showCreateDialog,
    showDeactivateDialog,
    showActivateDialog,
    showResetPasswordDialog,
    // Setters
    setSearchTerm,
    setLevelFilter,
    setStatusFilter,
    setSelectedStudent,
    setSelectedStudentId,
    setShowViewDialog,
    setShowEditDialog,
    setShowCreateDialog,
    setShowDeactivateDialog,
    setShowActivateDialog,
    setShowResetPasswordDialog,
    // Handlers
    handlePreviousPage,
    handleNextPage,
    handleDeactivateStudent,
    handleActivateStudent,
    handleResetPassword,
    handleStudentUpdated,
    handleStudentCreated
  };
}

function StudentsStatistics({
  loading: externalLoading,
  pagination,
  currentPage
}) {
  const [stats, setStats] = reactExports.useState(null);
  const [loadingStats, setLoadingStats] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const response = await getStudentStatistics();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching student statistics:", error);
        toast.error(error.response?.data?.message || "Failed to load student statistics");
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);
  const loading = externalLoading || loadingStats;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : stats?.total ?? pagination.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Across all levels" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Active Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 text-green-600" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : stats?.active ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total active students" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Inactive Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : stats?.inactive ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Total inactive students" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Current Page" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : `${currentPage}/${pagination.totalPages || 1}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          pagination.limit || 10,
          " per page"
        ] })
      ] })
    ] })
  ] });
}

function StudentsFilters({
  searchTerm,
  onSearchChange,
  levelFilter,
  onLevelChange,
  statusFilter,
  onStatusChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by name or email...",
          value: searchTerm,
          onChange: (e) => onSearchChange(e.target.value),
          className: "pl-10"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: levelFilter, onValueChange: onLevelChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by level" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "100", children: "100 Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "200", children: "200 Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "300", children: "300 Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "400", children: "400 Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "500", children: "500 Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "600", children: "600 Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "700", children: "700 Level" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: onStatusChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" })
      ] })
    ] })
  ] });
}

function StudentsTable({
  loading,
  students,
  searchTerm,
  levelFilter,
  statusFilter,
  onViewStudent,
  onEditStudent,
  onDeactivateStudent,
  onActivateStudent,
  onResetPassword
}) {
  const getStatusBadge = (status) => {
    if (status === "active" || status === "Active") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3 w-3 mr-1" }),
        "Active"
      ] });
    } else if (status === "pending" || status === "Pending") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 mr-1" }),
        "Pending"
      ] });
    } else {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-3 w-3 mr-1" }),
        "Inactive"
      ] });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Matric Number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Program" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[50px]", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8" }) })
    ] }, index)) : students.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No students found" }),
      (searchTerm || levelFilter !== "all" || statusFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your filters" })
    ] }) }) }) : students.map((student) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
        student.fname,
        " ",
        student.lname
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: student.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: student.matric_number ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: student.matric_number }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "Not assigned" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
        student.level,
        " Level"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(student.admin_status) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: student.program?.title || `Program ${student.program_id}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onViewStudent(student.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-2 h-4 w-4" }),
            "View Details"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEditStudent(student.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "mr-2 h-4 w-4" }),
            "Edit Student"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          student.admin_status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onDeactivateStudent(student),
              className: "text-orange-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "mr-2 h-4 w-4" }),
                "Deactivate"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onActivateStudent(student),
              className: "text-green-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 h-4 w-4" }),
                "Activate"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onResetPassword(student), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "mr-2 h-4 w-4" }),
            "Reset Password"
          ] })
        ] })
      ] }) })
    ] }, student.id)) })
  ] }) });
}

function StudentsPagination({
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
      " students"
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

const StudentActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./StudentActionDialogs-B1CmJo3Z.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0));
const ViewStudentDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewStudentDialog-D4-gHdsy.js'),true              ?__vite__mapDeps([4,1,2,5,6,7,8,9,10,11,12,13,14,15]):void 0));
const EditStudentDialog = reactExports.lazy(() => __vitePreload(() => import('./EditStudentDialog-BWY_kYDV.js'),true              ?__vite__mapDeps([16,1,2,5,11,12,7,14,15,10,17]):void 0));
const CreateStudentDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateStudentDialog-9n47Twm6.js'),true              ?__vite__mapDeps([18,1,2,5,11,12,14,15,10,17]):void 0));
function StudentsPage() {
  const {
    students,
    pagination,
    loading,
    searchTerm,
    levelFilter,
    statusFilter,
    currentPage,
    selectedStudent,
    selectedStudentId,
    actionLoading,
    showViewDialog,
    showEditDialog,
    showCreateDialog,
    showDeactivateDialog,
    showActivateDialog,
    showResetPasswordDialog,
    setSearchTerm,
    setLevelFilter,
    setStatusFilter,
    setSelectedStudent,
    setSelectedStudentId,
    setShowViewDialog,
    setShowEditDialog,
    setShowCreateDialog,
    setShowDeactivateDialog,
    setShowActivateDialog,
    setShowResetPasswordDialog,
    handlePreviousPage,
    handleNextPage,
    handleDeactivateStudent,
    handleActivateStudent,
    handleResetPassword,
    handleStudentUpdated,
    handleStudentCreated
  } = useStudentsManagement();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold", children: "Students Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground", children: "Manage all students in the system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), className: "w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Student"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StudentsStatistics,
      {
        loading,
        pagination,
        currentPage
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "A list of all students with their details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StudentsFilters,
          {
            searchTerm,
            onSearchChange: setSearchTerm,
            levelFilter,
            onLevelChange: setLevelFilter,
            statusFilter,
            onStatusChange: setStatusFilter
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StudentsTable,
          {
            loading,
            students,
            searchTerm,
            levelFilter,
            statusFilter,
            onViewStudent: (id) => {
              setSelectedStudentId(id);
              setShowViewDialog(true);
            },
            onEditStudent: (id) => {
              setSelectedStudentId(id);
              setShowEditDialog(true);
            },
            onDeactivateStudent: (student) => {
              setSelectedStudent(student);
              setShowDeactivateDialog(true);
            },
            onActivateStudent: (student) => {
              setSelectedStudent(student);
              setShowActivateDialog(true);
            },
            onResetPassword: (student) => {
              setSelectedStudent(student);
              setShowResetPasswordDialog(true);
            }
          }
        ),
        !loading && students.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          StudentsPagination,
          {
            currentPage,
            pagination,
            onPreviousPage: handlePreviousPage,
            onNextPage: handleNextPage
          }
        )
      ] })
    ] }),
    showDeactivateDialog || showActivateDialog || showResetPasswordDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StudentActionDialogs,
      {
        selectedStudent,
        actionLoading,
        showDeactivateDialog,
        showActivateDialog,
        showResetPasswordDialog,
        onDeactivateDialogChange: setShowDeactivateDialog,
        onActivateDialogChange: setShowActivateDialog,
        onResetPasswordDialogChange: setShowResetPasswordDialog,
        onConfirmDeactivate: handleDeactivateStudent,
        onConfirmActivate: handleActivateStudent,
        onConfirmResetPassword: handleResetPassword
      }
    ) }) : null,
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewStudentDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedStudentId(null);
          }
        },
        studentId: selectedStudentId
      },
      `view-${selectedStudentId}-${showViewDialog ? "open" : "closed"}`
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditStudentDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowEditDialog(false);
            setSelectedStudentId(null);
          }
        },
        studentId: selectedStudentId,
        onStudentUpdated: handleStudentUpdated
      },
      `edit-${selectedStudentId}-${showEditDialog ? "open" : "closed"}`
    ) }) : null,
    showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateStudentDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onStudentCreated: handleStudentCreated
      }
    ) }) : null
  ] });
}

export { StudentsPage as default };
