const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ProgramActionDialogs-Bzvqo5GA.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/alert-dialog-B-eBACCp.js","assets/ViewProgramDialog-6-T32wLa.js","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/separator-BjHBJBAG.js","assets/programs-a0V4l-AP.js","assets/CreateProgramDialog-DlNJdXH6.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/EditProgramDialog-D04yMzwV.js","assets/CreateCourseDialog-xgXfZmSD.js","assets/courses-DmFTm-zX.js","assets/admin-BVl3HTxX.js","assets/index-DSZNHD2t.js","assets/quiz-DTu6yipn.js","assets/exams-CpQ4GBAC.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, G as GraduationCap, C as CircleCheck, D as CircleX, k as BookOpen, J as Search, a7 as getFaculties, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, b as Eye, p as SquarePen, a1 as Plus, a8 as Trash2, $ as ChevronLeft, a0 as ChevronRight, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-DKXLAlrm.js';
import { g as getPrograms, d as deleteProgram } from './programs-a0V4l-AP.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import './index-BHy36ITo.js';

const useProgramsManagement = () => {
  const [programs, setPrograms] = reactExports.useState([]);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [facultyFilter, setFacultyFilter] = reactExports.useState(null);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [selectedProgram, setSelectedProgram] = reactExports.useState(null);
  const [selectedProgramId, setSelectedProgramId] = reactExports.useState(null);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const fetchPrograms = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 20
      };
      if (searchTerm) {
        params.search = searchTerm;
      }
      if (facultyFilter) {
        params.facultyId = facultyFilter;
      }
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }
      const response = await getPrograms(params);
      setPrograms(response.data.programs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch programs");
      setPrograms([]);
      setPagination({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, facultyFilter, statusFilter]);
  reactExports.useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);
  reactExports.useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, facultyFilter, statusFilter]);
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
  const handleDeleteProgram = async () => {
    if (!selectedProgram) return;
    setActionLoading(true);
    try {
      await deleteProgram(selectedProgram.id);
      toast.success("Program deleted successfully");
      setShowDeleteDialog(false);
      setSelectedProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      toast.error(error?.response?.data?.message || "Failed to delete program");
    } finally {
      setActionLoading(false);
    }
  };
  const handleProgramUpdated = () => {
    toast.success("Program updated successfully");
    setShowEditDialog(false);
    setSelectedProgramId(null);
    fetchPrograms();
  };
  const handleProgramCreated = () => {
    toast.success("Program created successfully");
    setShowCreateDialog(false);
    fetchPrograms();
  };
  return {
    // Data
    programs,
    pagination,
    loading,
    actionLoading,
    // Filters
    searchTerm,
    setSearchTerm,
    facultyFilter,
    setFacultyFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    // Selected items
    selectedProgram,
    setSelectedProgram,
    selectedProgramId,
    setSelectedProgramId,
    // Dialog states
    showViewDialog,
    setShowViewDialog,
    showEditDialog,
    setShowEditDialog,
    showCreateDialog,
    setShowCreateDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    // Handlers
    handleNextPage,
    handlePreviousPage,
    handleDeleteProgram,
    handleProgramUpdated,
    handleProgramCreated,
    fetchPrograms,
    refetchPrograms: fetchPrograms
    // Alias for clarity
  };
};

function ProgramsStatistics({
  loading,
  programs,
  pagination
}) {
  const activePrograms = programs.filter((p) => p.status === "Y").length;
  const inactivePrograms = programs.filter((p) => p.status === "N").length;
  const uniqueFaculties = new Set(programs.map((p) => p.faculty_id)).size;
  const stats = [
    {
      title: "Total Programs",
      value: loading ? "..." : pagination.total,
      icon: GraduationCap,
      description: "All programs in the system",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      title: "Active Programs",
      value: loading ? "..." : activePrograms,
      icon: CircleCheck,
      description: "Currently active programs",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30"
    },
    {
      title: "Inactive Programs",
      value: loading ? "..." : inactivePrograms,
      icon: CircleX,
      description: "Deactivated programs",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/30"
    },
    {
      title: "Faculties",
      value: loading ? "..." : uniqueFaculties,
      icon: BookOpen,
      description: "Unique faculties on this page",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((stat) => {
    const Icon = stat.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: stat.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${stat.bgColor}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${stat.color}` }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: stat.description })
      ] })
    ] }, stat.title);
  }) });
}

function ProgramsFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  facultyFilter,
  onFacultyChange
}) {
  const [faculties, setFaculties] = reactExports.useState([]);
  const [loadingFaculties, setLoadingFaculties] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const fetchFaculties = async () => {
      setLoadingFaculties(true);
      try {
        const response = await getFaculties({ limit: 100 });
        setFaculties(response.data.faculties);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        toast.error("Failed to load faculties");
      } finally {
        setLoadingFaculties(false);
      }
    };
    fetchFaculties();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search programs by title...",
          value: searchTerm,
          onChange: (e) => onSearchChange(e.target.value),
          className: "pl-10"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: facultyFilter?.toString() || "all",
        onValueChange: (value) => onFacultyChange(value === "all" ? null : parseInt(value)),
        disabled: loadingFaculties,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Faculties" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Faculties" }),
            faculties.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: faculty.id.toString(), children: faculty.name }, faculty.id))
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: onStatusChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Y", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "N", children: "Inactive" })
      ] })
    ] })
  ] });
}

function ProgramsTable({
  loading,
  programs,
  searchTerm,
  statusFilter,
  onViewProgram,
  onEditProgram,
  onDeleteProgram,
  onAddCourse
}) {
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading programs..." })
    ] }) });
  }
  if (programs.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: searchTerm || statusFilter !== "all" ? "No programs found matching your filters." : "No programs found." }) }) });
  }
  const truncateText = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[80px]", children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Faculty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden lg:table-cell", children: "Date Created" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: programs.map((program, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: program.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: program.faculty.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground max-w-xs", children: truncateText(program.description, 50) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: program.status === "Y" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "bg-green-500 hover:bg-green-600", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-gray-500 hover:bg-gray-600 text-white", children: "Inactive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: new Date(program.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onViewProgram(program.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-2 h-4 w-4" }),
            "View Details"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onEditProgram(program.id),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "mr-2 h-4 w-4" }),
                "Edit Program"
              ]
            }
          ),
          onAddCourse && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onAddCourse(program),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
                "Add Course"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onDeleteProgram(program),
              className: "text-red-600 focus:text-red-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delete Program" })
              ]
            }
          )
        ] })
      ] }) })
    ] }, program.id)) })
  ] }) });
}

function ProgramsPagination({
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
      " programs"
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

const ProgramActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./ProgramActionDialogs-Bzvqo5GA.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0));
const ViewProgramDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewProgramDialog-6-T32wLa.js'),true              ?__vite__mapDeps([4,1,2,5,6,7,8]):void 0));
const CreateProgramDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateProgramDialog-DlNJdXH6.js'),true              ?__vite__mapDeps([9,1,2,5,10,11,12,13,14,8]):void 0));
const EditProgramDialog = reactExports.lazy(() => __vitePreload(() => import('./EditProgramDialog-D04yMzwV.js'),true              ?__vite__mapDeps([15,1,2,5,10,11,12,13,14,8]):void 0));
const CreateCourseDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateCourseDialog-xgXfZmSD.js'),true              ?__vite__mapDeps([16,1,2,5,10,11,13,14,17,8,18,19,20,21]):void 0));
function ProgramsPage() {
  const {
    programs,
    pagination,
    loading,
    searchTerm,
    statusFilter,
    facultyFilter,
    currentPage,
    selectedProgram,
    selectedProgramId,
    actionLoading,
    showViewDialog,
    showEditDialog,
    showDeleteDialog,
    showCreateDialog,
    setSearchTerm,
    setStatusFilter,
    setFacultyFilter,
    setSelectedProgram,
    setSelectedProgramId,
    setShowViewDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    setShowCreateDialog,
    handlePreviousPage,
    handleNextPage,
    handleDeleteProgram,
    handleProgramUpdated,
    refetchPrograms
  } = useProgramsManagement();
  const [showCourseDialog, setShowCourseDialog] = reactExports.useState(false);
  const [selectedProgramForCourse, setSelectedProgramForCourse] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold", children: "Programs Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground", children: "Manage all academic programs in the system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowCreateDialog(true),
          className: "w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Program"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProgramsStatistics,
      {
        loading,
        programs,
        pagination,
        currentPage
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Programs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "A list of all academic programs with their details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProgramsFilters,
          {
            searchTerm,
            onSearchChange: setSearchTerm,
            statusFilter,
            onStatusChange: setStatusFilter,
            facultyFilter,
            onFacultyChange: setFacultyFilter
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProgramsTable,
          {
            loading,
            programs,
            searchTerm,
            statusFilter,
            onViewProgram: (id) => {
              setSelectedProgramId(id);
              setShowViewDialog(true);
            },
            onEditProgram: (id) => {
              setSelectedProgramId(id);
              setShowEditDialog(true);
            },
            onDeleteProgram: (program) => {
              setSelectedProgram(program);
              setShowDeleteDialog(true);
            },
            onAddCourse: (program) => {
              setSelectedProgramForCourse(program);
              setShowCourseDialog(true);
            }
          }
        ),
        !loading && programs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProgramsPagination,
          {
            currentPage,
            pagination,
            onPreviousPage: handlePreviousPage,
            onNextPage: handleNextPage
          }
        )
      ] })
    ] }),
    showDeleteDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProgramActionDialogs,
      {
        selectedProgram,
        actionLoading,
        showDeleteDialog,
        onDeleteDialogChange: (open) => {
          setShowDeleteDialog(open);
          if (!open) {
            setSelectedProgram(null);
          }
        },
        onConfirmDelete: handleDeleteProgram
      }
    ) }) : null,
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewProgramDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedProgramId(null);
          }
        },
        programId: selectedProgramId
      },
      `view-${selectedProgramId}-${showViewDialog ? "open" : "closed"}`
    ) }) : null,
    showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateProgramDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onProgramCreated: refetchPrograms
      }
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProgramDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowEditDialog(false);
            setSelectedProgramId(null);
          }
        },
        programId: selectedProgramId,
        onProgramUpdated: handleProgramUpdated
      }
    ) }) : null,
    showCourseDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateCourseDialog,
      {
        open: showCourseDialog,
        onOpenChange: (open) => {
          setShowCourseDialog(open);
          if (!open) {
            setSelectedProgramForCourse(null);
          }
        },
        onCourseCreated: () => {
          setShowCourseDialog(false);
          setSelectedProgramForCourse(null);
        },
        initialProgramId: selectedProgramForCourse?.id,
        initialFacultyId: selectedProgramForCourse?.faculty_id
      }
    ) }) : null
  ] });
}

export { ProgramsPage as default };
