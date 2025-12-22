const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ViewNoticeDialog-b-XPiKDL.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/skeleton-Bd8cuwAJ.js","assets/admin-BVl3HTxX.js","assets/EditNoticeDialog-y67D2eaH.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/CreateNoticeDialog-B8aDS44Z.js","assets/NoticeActionDialogs-Bjah4gJv.js","assets/alert-dialog-B-eBACCp.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, J as Search, ad as Bell, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, b as Eye, p as SquarePen, a3 as Trash, $ as ChevronLeft, a0 as ChevronRight, a1 as Plus, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { q as getNotices, s as deleteNotice } from './admin-BVl3HTxX.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import './index-BHy36ITo.js';

function useNoticesManagement() {
  const [notices, setNotices] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [courseFilter, setCourseFilter] = reactExports.useState("all");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1
  });
  const fetchNotices = reactExports.useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 20
      };
      if (searchTerm) {
        params.search = searchTerm;
      }
      if (courseFilter !== "all") {
        if (courseFilter === "system") {
          params.course_id = null;
        } else {
          params.course_id = parseInt(courseFilter);
        }
      }
      const response = await getNotices(params);
      if (response.success) {
        setNotices(response.data.notices);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast.error(error.response?.data?.message || "Failed to load notices");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, courseFilter]);
  reactExports.useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);
  reactExports.useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, courseFilter]);
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
  const refetchNotices = () => {
    fetchNotices();
  };
  return {
    // State
    notices,
    loading,
    searchTerm,
    courseFilter,
    currentPage,
    pagination,
    // Setters
    setSearchTerm,
    setCourseFilter,
    setCurrentPage,
    // Handlers
    handlePreviousPage,
    handleNextPage,
    refetchNotices
  };
}

function NoticesFilters({
  searchTerm,
  onSearchChange,
  courseFilter,
  onCourseFilterChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search notices...",
          value: searchTerm,
          onChange: (e) => onSearchChange(e.target.value),
          className: "pl-10"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: courseFilter, onValueChange: onCourseFilterChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by course" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Notices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "system", children: "System-Wide" })
      ] })
    ] })
  ] });
}

function NoticesTable({
  loading,
  notices,
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
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "-";
    }
  };
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Note" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Expires At" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8" }) })
    ] }, index)) : notices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No notices found" }),
      searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your search" })
    ] }) }) }) : notices.map((notice, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: notice.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: truncateText(notice.note.replace(/\\r\\n/g, " ")) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: notice.course_id === null ? "default" : "secondary", children: notice.course_id === null ? "System-Wide" : notice.course?.title || "Course" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: formatDate(notice.date) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: notice.expires_at ? formatDate(notice.expires_at) : "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          onView && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onView(notice), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-2" }),
            "View Details"
          ] }),
          onEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEdit(notice), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
            "Edit"
          ] }),
          onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                className: "text-destructive",
                onClick: () => onDelete(notice),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "h-4 w-4 mr-2" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      ] }) })
    ] }, notice.id)) })
  ] }) });
}

function NoticesPagination({
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
      " notices"
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

const ViewNoticeDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewNoticeDialog-b-XPiKDL.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6]):void 0));
const EditNoticeDialog = reactExports.lazy(() => __vitePreload(() => import('./EditNoticeDialog-y67D2eaH.js'),true              ?__vite__mapDeps([7,1,2,3,8,9,10,6]):void 0));
const CreateNoticeDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateNoticeDialog-B8aDS44Z.js'),true              ?__vite__mapDeps([11,1,2,3,8,9,10,6]):void 0));
const NoticeActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./NoticeActionDialogs-Bjah4gJv.js'),true              ?__vite__mapDeps([12,1,2,13]):void 0));
function NoticesPage() {
  const {
    notices,
    loading,
    searchTerm,
    courseFilter,
    currentPage,
    pagination,
    setSearchTerm,
    setCourseFilter,
    handlePreviousPage,
    handleNextPage,
    refetchNotices
  } = useNoticesManagement();
  const [selectedNotice, setSelectedNotice] = reactExports.useState(null);
  const [selectedNoticeId, setSelectedNoticeId] = reactExports.useState(null);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold", children: "Notices Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground", children: "Manage all system notices and announcements" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), className: "w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Notice"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Notice Statistics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Overview of notice data" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" })
      ] }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Notices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: pagination.total })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "System-Wide" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-500", children: notices.filter((n) => n.course_id === null).length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Showing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-500", children: [
            notices.length,
            " of ",
            pagination.total
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Notices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "A list of all notices with their details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NoticesFilters,
          {
            searchTerm,
            onSearchChange: setSearchTerm,
            courseFilter,
            onCourseFilterChange: setCourseFilter
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NoticesTable,
          {
            loading,
            notices,
            searchTerm,
            onView: (notice) => {
              setSelectedNoticeId(notice.id);
              setShowViewDialog(true);
            },
            onEdit: (notice) => {
              setSelectedNotice(notice);
              setShowEditDialog(true);
            },
            onDelete: (notice) => {
              setSelectedNotice(notice);
              setShowDeleteDialog(true);
            }
          }
        ),
        !loading && notices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          NoticesPagination,
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
      CreateNoticeDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onNoticeCreated: () => {
          refetchNotices();
        }
      }
    ) }) : null,
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewNoticeDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedNoticeId(null);
          }
        },
        noticeId: selectedNoticeId
      },
      `view-${selectedNoticeId}-${showViewDialog ? "open" : "closed"}`
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditNoticeDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          setShowEditDialog(open);
          if (!open) {
            setSelectedNotice(null);
          }
        },
        notice: selectedNotice,
        onNoticeUpdated: () => {
          refetchNotices();
          setSelectedNotice(null);
        }
      }
    ) }) : null,
    showDeleteDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      NoticeActionDialogs,
      {
        selectedNotice,
        actionLoading,
        showDeleteDialog,
        onDeleteDialogChange: (open) => {
          setShowDeleteDialog(open);
          if (!open) {
            setSelectedNotice(null);
          }
        },
        onConfirmDelete: async () => {
          if (!selectedNotice) return;
          try {
            setActionLoading(true);
            const response = await deleteNotice(selectedNotice.id);
            if (response.success) {
              toast.success(response.message || "Notice deleted successfully");
              refetchNotices();
              setShowDeleteDialog(false);
              setSelectedNotice(null);
            }
          } catch (error) {
            console.error("Error deleting notice:", error);
            toast.error(error.response?.data?.message || "Failed to delete notice");
          } finally {
            setActionLoading(false);
          }
        }
      }
    ) }) : null
  ] });
}

export { NoticesPage as default };
