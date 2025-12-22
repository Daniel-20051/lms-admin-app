const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ViewSemesterDialog-Cc8ONRU8.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/separator-BjHBJBAG.js","assets/semesters-oK3Qf9Wp.js","assets/CreateSemesterDialog-Dnkxi_uR.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/EditSemesterDialog-CJx6sL4Y.js","assets/CloseSemesterDialog-C0ocyU5g.js","assets/alert-dialog-B-eBACCp.js","assets/textarea-LWcfCAwC.js","assets/ExtendSemesterDialog-CsRVcE7J.js","assets/ActivateSemesterDialog-CKF5Fdfq.js","assets/SemesterActionDialogs-VS_h5uBO.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, b as Eye, p as SquarePen, ab as CirclePlay, D as CircleX, ac as CalendarPlus, a8 as Trash2, $ as ChevronLeft, a0 as ChevronRight, a1 as Plus, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { g as getSemesters, d as deleteSemester } from './semesters-oK3Qf9Wp.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import './index-BHy36ITo.js';

const useSemestersManagement = () => {
  const [semesters, setSemesters] = reactExports.useState([]);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [academicYearFilter, setAcademicYearFilter] = reactExports.useState(null);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedSemesterId, setSelectedSemesterId] = reactExports.useState(null);
  const [selectedSemester, setSelectedSemester] = reactExports.useState(null);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showCloseDialog, setShowCloseDialog] = reactExports.useState(false);
  const [showExtendDialog, setShowExtendDialog] = reactExports.useState(false);
  const [showActivateDialog, setShowActivateDialog] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const fetchSemesters = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 20
      };
      if (academicYearFilter) {
        params.academicYear = academicYearFilter;
      }
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }
      const response = await getSemesters(params);
      setSemesters(response.data.semesters);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching semesters:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch semesters");
      setSemesters([]);
      setPagination({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, academicYearFilter, statusFilter]);
  reactExports.useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters]);
  reactExports.useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [academicYearFilter, statusFilter]);
  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleDeleteSemester = async () => {
    if (!selectedSemester) return;
    setActionLoading(true);
    try {
      await deleteSemester(selectedSemester.id);
      toast.success("Semester deleted successfully");
      setShowDeleteDialog(false);
      setSelectedSemester(null);
      fetchSemesters();
    } catch (error) {
      console.error("Error deleting semester:", error);
      toast.error(error?.response?.data?.message || "Failed to delete semester");
    } finally {
      setActionLoading(false);
    }
  };
  const handleSemesterUpdated = () => {
    toast.success("Semester updated successfully");
    setShowEditDialog(false);
    setSelectedSemesterId(null);
    fetchSemesters();
  };
  const handleSemesterClosed = () => {
    setShowCloseDialog(false);
    setSelectedSemester(null);
    fetchSemesters();
  };
  const handleSemesterExtended = () => {
    setShowExtendDialog(false);
    setSelectedSemester(null);
    fetchSemesters();
  };
  const handleSemesterActivated = () => {
    setShowActivateDialog(false);
    setSelectedSemester(null);
    fetchSemesters();
  };
  return {
    // Data
    semesters,
    pagination,
    loading,
    // Filters
    searchTerm,
    setSearchTerm,
    academicYearFilter,
    setAcademicYearFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    // Selected items
    selectedSemesterId,
    setSelectedSemesterId,
    selectedSemester,
    setSelectedSemester,
    // Dialog states
    showViewDialog,
    setShowViewDialog,
    showCreateDialog,
    setShowCreateDialog,
    showEditDialog,
    setShowEditDialog,
    showCloseDialog,
    setShowCloseDialog,
    showExtendDialog,
    setShowExtendDialog,
    showActivateDialog,
    setShowActivateDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    actionLoading,
    setActionLoading,
    // Handlers
    handleNextPage,
    handlePreviousPage,
    handleDeleteSemester,
    handleSemesterUpdated,
    handleSemesterClosed,
    handleSemesterExtended,
    handleSemesterActivated,
    fetchSemesters,
    refetchSemesters: fetchSemesters
    // Alias for clarity
  };
};

function SemestersFilters({
  academicYearFilter,
  onAcademicYearChange,
  statusFilter,
  onStatusChange,
  availableAcademicYears
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "academicYear", children: "Academic Year" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: academicYearFilter || "all",
          onValueChange: (value) => onAcademicYearChange(value === "all" ? null : value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Academic Years" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Academic Years" }),
              availableAcademicYears.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: onStatusChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "closed", children: "Closed" })
        ] })
      ] })
    ] })
  ] });
}

function SemestersTable({
  loading,
  semesters,
  academicYearFilter,
  statusFilter,
  onViewSemester,
  onEditSemester,
  onCloseSemester,
  onExtendSemester,
  onActivateSemester,
  onDeleteSemester
}) {
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading semesters..." })
    ] }) });
  }
  if (semesters.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: academicYearFilter || statusFilter !== "all" ? "No semesters found matching your filters." : "No semesters found." }) }) });
  }
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "bg-green-500 hover:bg-green-600", children: "Active" });
      case "closed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-gray-500 hover:bg-gray-600 text-white", children: "Closed" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-yellow-500 hover:bg-yellow-600 text-white", children: "Pending" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
    }
  };
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return dateString;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[80px]", children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Academic Year" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Start Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "End Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden lg:table-cell", children: "Date Created" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: semesters.filter((semester) => semester != null).map((semester, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: semester.academic_year || "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: semester.semester || "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(semester.status) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: formatDate(semester.start_date) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: formatDate(semester.end_date) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: formatDate(semester.date) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onViewSemester(semester.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-2 h-4 w-4" }),
            "View Details"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEditSemester(semester.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "mr-2 h-4 w-4" }),
            "Edit Semester"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          semester.status.toLowerCase() !== "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onActivateSemester(semester),
              className: "text-green-600 focus:text-green-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "mr-2 h-4 w-4" }),
                "Activate"
              ]
            }
          ),
          semester.status.toLowerCase() !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onCloseSemester(semester),
              className: "text-orange-600 focus:text-orange-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mr-2 h-4 w-4" }),
                "Close"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onExtendSemester(semester),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mr-2 h-4 w-4" }),
                "Extend"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onDeleteSemester(semester),
              disabled: semester.status.toLowerCase() === "active",
              className: "text-red-600 focus:text-red-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delete Semester" })
              ]
            }
          )
        ] })
      ] }) })
    ] }, semester.id)) })
  ] }) });
}

function SemestersPagination({
  currentPage,
  pagination,
  onPreviousPage,
  onNextPage
}) {
  const startIndex = (currentPage - 1) * pagination.limit + 1;
  const endIndex = Math.min(currentPage * pagination.limit, pagination.total);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "Showing ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: startIndex }),
      " to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: endIndex }),
      " of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: pagination.total }),
      " semesters"
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        "Page ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: currentPage }),
        " of",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: pagination.totalPages })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onNextPage,
          disabled: currentPage === pagination.totalPages,
          children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
          ]
        }
      )
    ] })
  ] });
}

const ViewSemesterDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewSemesterDialog-Cc8ONRU8.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6]):void 0));
const CreateSemesterDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateSemesterDialog-Dnkxi_uR.js'),true              ?__vite__mapDeps([7,1,2,3,8,9,10,11,6]):void 0));
const EditSemesterDialog = reactExports.lazy(() => __vitePreload(() => import('./EditSemesterDialog-CJx6sL4Y.js'),true              ?__vite__mapDeps([12,1,2,3,8,9,10,11,6]):void 0));
const CloseSemesterDialog = reactExports.lazy(() => __vitePreload(() => import('./CloseSemesterDialog-C0ocyU5g.js'),true              ?__vite__mapDeps([13,1,2,14,9,15,6]):void 0));
const ExtendSemesterDialog = reactExports.lazy(() => __vitePreload(() => import('./ExtendSemesterDialog-CsRVcE7J.js'),true              ?__vite__mapDeps([16,1,2,3,8,9,15,6]):void 0));
const ActivateSemesterDialog = reactExports.lazy(() => __vitePreload(() => import('./ActivateSemesterDialog-CKF5Fdfq.js'),true              ?__vite__mapDeps([17,1,2,14,6]):void 0));
const SemesterActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./SemesterActionDialogs-VS_h5uBO.js'),true              ?__vite__mapDeps([18,1,2,14]):void 0));
function SemestersPage() {
  const {
    semesters,
    pagination,
    loading,
    academicYearFilter,
    statusFilter,
    currentPage,
    selectedSemesterId,
    selectedSemester,
    showViewDialog,
    showCreateDialog,
    showEditDialog,
    showCloseDialog,
    showExtendDialog,
    showActivateDialog,
    showDeleteDialog,
    actionLoading,
    setAcademicYearFilter,
    setStatusFilter,
    setSelectedSemesterId,
    setSelectedSemester,
    setShowViewDialog,
    setShowCreateDialog,
    setShowEditDialog,
    setShowCloseDialog,
    setShowExtendDialog,
    setShowActivateDialog,
    setShowDeleteDialog,
    setActionLoading,
    handlePreviousPage,
    handleNextPage,
    handleDeleteSemester,
    handleSemesterUpdated,
    handleSemesterClosed,
    handleSemesterExtended,
    handleSemesterActivated,
    refetchSemesters
  } = useSemestersManagement();
  const availableAcademicYears = reactExports.useMemo(() => {
    const years = /* @__PURE__ */ new Set();
    semesters.forEach((semester) => {
      if (semester.academic_year) {
        years.add(semester.academic_year);
      }
    });
    return Array.from(years).sort().reverse();
  }, [semesters]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold", children: "Semesters Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground", children: "Manage all academic semesters in the system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowCreateDialog(true),
          className: "w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Semester"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Semesters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "A list of all academic semesters with their details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SemestersFilters,
          {
            academicYearFilter,
            onAcademicYearChange: setAcademicYearFilter,
            statusFilter,
            onStatusChange: setStatusFilter,
            availableAcademicYears
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SemestersTable,
          {
            loading,
            semesters,
            academicYearFilter,
            statusFilter,
            onViewSemester: (id) => {
              setSelectedSemesterId(id);
              setShowViewDialog(true);
            },
            onEditSemester: (id) => {
              setSelectedSemesterId(id);
              setShowEditDialog(true);
            },
            onCloseSemester: (semester) => {
              setSelectedSemester(semester);
              setShowCloseDialog(true);
            },
            onExtendSemester: (semester) => {
              setSelectedSemester(semester);
              setShowExtendDialog(true);
            },
            onActivateSemester: (semester) => {
              setSelectedSemester(semester);
              setShowActivateDialog(true);
            },
            onDeleteSemester: (semester) => {
              setSelectedSemester(semester);
              setShowDeleteDialog(true);
            }
          }
        ),
        !loading && semesters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SemestersPagination,
          {
            currentPage,
            pagination,
            onPreviousPage: handlePreviousPage,
            onNextPage: handleNextPage
          }
        )
      ] })
    ] }),
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewSemesterDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedSemesterId(null);
          }
        },
        semesterId: selectedSemesterId
      },
      `view-${selectedSemesterId}-${showViewDialog ? "open" : "closed"}`
    ) }) : null,
    showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateSemesterDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onSemesterCreated: refetchSemesters
      }
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditSemesterDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowEditDialog(false);
            setSelectedSemesterId(null);
          }
        },
        semesterId: selectedSemesterId,
        onSemesterUpdated: handleSemesterUpdated
      }
    ) }) : null,
    showCloseDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CloseSemesterDialog,
      {
        open: showCloseDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowCloseDialog(false);
            setSelectedSemester(null);
          }
        },
        selectedSemester,
        onSemesterClosed: handleSemesterClosed,
        actionLoading,
        setActionLoading
      }
    ) }) : null,
    showExtendDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExtendSemesterDialog,
      {
        open: showExtendDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowExtendDialog(false);
            setSelectedSemester(null);
          }
        },
        selectedSemester,
        onSemesterExtended: handleSemesterExtended,
        actionLoading,
        setActionLoading
      }
    ) }) : null,
    showActivateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActivateSemesterDialog,
      {
        open: showActivateDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowActivateDialog(false);
            setSelectedSemester(null);
          }
        },
        selectedSemester,
        onSemesterActivated: handleSemesterActivated,
        actionLoading,
        setActionLoading
      }
    ) }) : null,
    showDeleteDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SemesterActionDialogs,
      {
        selectedSemester,
        actionLoading,
        showDeleteDialog,
        onDeleteDialogChange: (open) => {
          setShowDeleteDialog(open);
          if (!open) {
            setSelectedSemester(null);
          }
        },
        onConfirmDelete: handleDeleteSemester
      }
    ) }) : null
  ] });
}

export { SemestersPage as default };
