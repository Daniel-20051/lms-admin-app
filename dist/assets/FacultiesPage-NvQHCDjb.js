const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ViewFacultyDialog-CkHRqQwD.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/skeleton-Bd8cuwAJ.js","assets/admin-BVl3HTxX.js","assets/EditFacultyDialog-CB0nM-4I.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/CreateFacultyDialog-BClaYErC.js","assets/FacultyActionDialogs-vaue0sYn.js","assets/alert-dialog-B-eBACCp.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, J as Search, l as Building2, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, b as Eye, p as SquarePen, a3 as Trash, $ as ChevronLeft, a0 as ChevronRight, a1 as Plus, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { m as getFaculties, n as deleteFaculty } from './admin-BVl3HTxX.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { B as Badge } from './badge-CVay2utB.js';

function useFacultiesManagement() {
  const [faculties, setFaculties] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1
  });
  const fetchFaculties = reactExports.useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 20
      };
      if (searchTerm) {
        params.search = searchTerm;
      }
      const response = await getFaculties(params);
      if (response.success) {
        setFaculties(response.data.faculties);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
      toast.error(error.response?.data?.message || "Failed to load faculties");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);
  reactExports.useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);
  reactExports.useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm]);
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
  const refetchFaculties = () => {
    fetchFaculties();
  };
  return {
    // State
    faculties,
    loading,
    searchTerm,
    currentPage,
    pagination,
    // Setters
    setSearchTerm,
    setCurrentPage,
    // Handlers
    handlePreviousPage,
    handleNextPage,
    refetchFaculties
  };
}

function FacultiesFilters({
  searchTerm,
  onSearchChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Search faculties...",
        value: searchTerm,
        onChange: (e) => onSearchChange(e.target.value),
        className: "pl-10"
      }
    )
  ] }) });
}

function FacultiesTable({
  loading,
  faculties,
  searchTerm,
  onView,
  onEdit,
  onDelete
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return "-";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Programs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8" }) })
    ] }, index)) : faculties.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No faculties found" }),
      searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your search" })
    ] }) }) }) : faculties.map((faculty, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: faculty.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: faculty.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
        faculty.programs.length,
        " ",
        faculty.programs.length === 1 ? "Program" : "Programs"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: formatDate(faculty.date) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          onView && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onView(faculty), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-2" }),
            "View Details"
          ] }),
          onEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEdit(faculty), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
            "Edit"
          ] }),
          onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                className: "text-destructive",
                onClick: () => onDelete(faculty),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "h-4 w-4 mr-2" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      ] }) })
    ] }, faculty.id)) })
  ] }) });
}

function FacultiesPagination({
  currentPage,
  pagination,
  onPreviousPage,
  onNextPage
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "Showing ",
      (currentPage - 1) * (pagination.limit || 20) + 1,
      " to",
      " ",
      Math.min(
        currentPage * (pagination.limit || 20),
        pagination.total || 0
      ),
      " ",
      "of ",
      pagination.total || 0,
      " faculties"
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

const ViewFacultyDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewFacultyDialog-CkHRqQwD.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6]):void 0));
const EditFacultyDialog = reactExports.lazy(() => __vitePreload(() => import('./EditFacultyDialog-CB0nM-4I.js'),true              ?__vite__mapDeps([7,1,2,3,8,9,10,6]):void 0));
const CreateFacultyDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateFacultyDialog-BClaYErC.js'),true              ?__vite__mapDeps([11,1,2,3,8,9,10,6]):void 0));
const FacultyActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./FacultyActionDialogs-vaue0sYn.js'),true              ?__vite__mapDeps([12,1,2,13]):void 0));
function FacultiesPage() {
  const {
    faculties,
    loading,
    searchTerm,
    currentPage,
    pagination,
    setSearchTerm,
    handlePreviousPage,
    handleNextPage,
    refetchFaculties
  } = useFacultiesManagement();
  const [selectedFaculty, setSelectedFaculty] = reactExports.useState(null);
  const [selectedFacultyId, setSelectedFacultyId] = reactExports.useState(null);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold", children: "Faculties Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground", children: "Manage all faculties in the system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), className: "w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Faculty"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Faculty Statistics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Overview of faculty data" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" })
      ] }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Faculties" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: pagination.total })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Programs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-500", children: faculties.reduce((sum, faculty) => sum + faculty.programs.length, 0) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Showing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-500", children: [
            faculties.length,
            " of ",
            pagination.total
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Faculties" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "A list of all faculties with their details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FacultiesFilters,
          {
            searchTerm,
            onSearchChange: setSearchTerm
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FacultiesTable,
          {
            loading,
            faculties,
            searchTerm,
            onView: (faculty) => {
              setSelectedFacultyId(faculty.id);
              setShowViewDialog(true);
            },
            onEdit: (faculty) => {
              setSelectedFaculty(faculty);
              setShowEditDialog(true);
            },
            onDelete: (faculty) => {
              setSelectedFaculty(faculty);
              setShowDeleteDialog(true);
            }
          }
        ),
        !loading && faculties.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          FacultiesPagination,
          {
            currentPage,
            pagination,
            onPreviousPage: handlePreviousPage,
            onNextPage: handleNextPage
          }
        )
      ] })
    ] }),
    showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateFacultyDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onFacultyCreated: () => {
          refetchFaculties();
        }
      }
    ) }) : null,
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewFacultyDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedFacultyId(null);
          }
        },
        facultyId: selectedFacultyId
      },
      `view-${selectedFacultyId}-${showViewDialog ? "open" : "closed"}`
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditFacultyDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          setShowEditDialog(open);
          if (!open) {
            setSelectedFaculty(null);
          }
        },
        faculty: selectedFaculty,
        onFacultyUpdated: () => {
          refetchFaculties();
          setSelectedFaculty(null);
        }
      }
    ) }) : null,
    showDeleteDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FacultyActionDialogs,
      {
        selectedFaculty,
        actionLoading,
        showDeleteDialog,
        onDeleteDialogChange: (open) => {
          setShowDeleteDialog(open);
          if (!open) {
            setSelectedFaculty(null);
          }
        },
        onConfirmDelete: async () => {
          if (!selectedFaculty) return;
          try {
            setActionLoading(true);
            const response = await deleteFaculty(selectedFaculty.id);
            if (response.success) {
              toast.success(response.message || "Faculty deleted successfully");
              refetchFaculties();
              setShowDeleteDialog(false);
              setSelectedFaculty(null);
            }
          } catch (error) {
            console.error("Error deleting faculty:", error);
            toast.error(error.response?.data?.message || "Failed to delete faculty");
          } finally {
            setActionLoading(false);
          }
        }
      }
    ) }) : null
  ] });
}

export { FacultiesPage as default };
