const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CreateExamDialog-DeWZOhpF.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/switch-aojsMll3.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/exams-CpQ4GBAC.js","assets/index-DSZNHD2t.js","assets/courses-DmFTm-zX.js","assets/quiz-DTu6yipn.js","assets/admin-BVl3HTxX.js","assets/EditExamDialog-BO32C_Ci.js","assets/ViewExamDialog-Cxpm3caQ.js","assets/badge-CVay2utB.js","assets/skeleton-Bd8cuwAJ.js","assets/tabs-CdamqglU.js","assets/card-DKXLAlrm.js","assets/ConfirmDialog-D7vm-GNq.js"])))=>i.map(i=>d[i]);
import { aG as useParams, u as useNavigate, r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, e as ArrowLeft, a1 as Plus, b as Eye, aM as Pencil, a8 as Trash2, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, d as CardContent } from './card-DKXLAlrm.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { G as GetExams, D as DeleteExam } from './exams-CpQ4GBAC.js';
import { G as GetStaffCoursesbyId } from './courses-DmFTm-zX.js';

const CreateExamDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateExamDialog-DeWZOhpF.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]):void 0));
const EditExamDialog = reactExports.lazy(() => __vitePreload(() => import('./EditExamDialog-BO32C_Ci.js'),true              ?__vite__mapDeps([15,1,2,3,4,5,6,7,8,9,10]):void 0));
const ViewExamDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewExamDialog-Cxpm3caQ.js'),true              ?__vite__mapDeps([16,1,2,3,4,17,18,19,20,10,12]):void 0));
const ConfirmDialog = reactExports.lazy(() => __vitePreload(() => import('./ConfirmDialog-D7vm-GNq.js'),true              ?__vite__mapDeps([21,1,2,3]):void 0));
function CourseExamsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = reactExports.useState([]);
  const [courseTitle, setCourseTitle] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [courseLoading, setCourseLoading] = reactExports.useState(false);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const [selectedExamId, setSelectedExamId] = reactExports.useState(null);
  const [selectedExam, setSelectedExam] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadExams(1);
    }
  }, [courseId]);
  const loadCourseData = async () => {
    try {
      setCourseLoading(true);
      const response = await GetStaffCoursesbyId(courseId);
      const data = response.data;
      if (data?.status || data?.success) {
        setCourseTitle(data.data?.title || "Course");
      }
    } catch (error) {
      console.error("Error loading course:", error);
      setCourseTitle("Course");
    } finally {
      setCourseLoading(false);
    }
  };
  const loadExams = async (page = 1) => {
    if (!courseId) return;
    try {
      setLoading(true);
      const response = await GetExams(Number(courseId), page, 20);
      const data = response?.data;
      if (data?.status && data?.data) {
        setExams(data.data);
        setPagination(data.pagination);
        setCurrentPage(page);
      } else {
        setExams([]);
        toast.error(data?.message || "Failed to load exams");
      }
    } catch (error) {
      console.error("Error loading exams:", error);
      setExams([]);
      toast.error("Failed to load exams");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
      });
    } catch {
      return dateString;
    }
  };
  const getExamTypeBadge = (examType) => {
    const typeMap = {
      "objective-only": { label: "Objective", variant: "secondary" },
      "theory-only": { label: "Theory", variant: "secondary" },
      "mixed": { label: "Mixed", variant: "secondary" }
    };
    const config = typeMap[examType] || { label: examType, variant: "outline" };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: config.variant, children: config.label });
  };
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "published") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: "published" });
    } else if (statusLower === "draft") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", children: "draft" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      loadExams(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      loadExams(currentPage + 1);
    }
  };
  const handleViewExam = (examId) => {
    setSelectedExamId(examId);
    setShowViewDialog(true);
  };
  const handleEditExam = (examId) => {
    setSelectedExamId(examId);
    setShowEditDialog(true);
  };
  const handleDeleteExam = (exam) => {
    setSelectedExam(exam);
    setShowDeleteDialog(true);
  };
  const confirmDeleteExam = async () => {
    if (!selectedExam) return;
    try {
      setDeleting(true);
      const response = await DeleteExam(selectedExam.id);
      const data = response?.data;
      if (data?.status || data?.success || response?.status === 200) {
        toast.success("Exam deleted successfully");
        setShowDeleteDialog(false);
        setSelectedExam(null);
        loadExams(currentPage);
      } else {
        toast.error(data?.message || "Failed to delete exam");
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete exam"
      );
    } finally {
      setDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: courseLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-64" }) : `${courseTitle.toUpperCase()} - Exams` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage exams for this course." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => navigate("/super-admin/content/exams"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
              "Back to Exams"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateDialog(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "Create Exam"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, i)) }) : exams.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No exams found for this course." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Academic Year" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Semester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Max Attempts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: exams.map((exam) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-3", children: exam.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: exam.academic_year }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: exam.semester }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
            exam.duration_minutes,
            " min"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getExamTypeBadge(exam.exam_type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(exam.visibility) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Obj: ",
              exam.objective_count || 0
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Theory: ",
              exam.theory_count || 0
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: exam.max_attempts }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDate(exam.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleViewExam(exam.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleEditExam(exam.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleDeleteExam(exam),
                className: "text-destructive hover:text-destructive",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, exam.id)) })
      ] }) }),
      !loading && exams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Showing ",
          (currentPage - 1) * pagination.limit + 1,
          " to",
          " ",
          Math.min(currentPage * pagination.limit, pagination.total),
          " of",
          " ",
          pagination.total,
          " exams"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handlePreviousPage,
              disabled: !pagination.hasPreviousPage,
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            "Page ",
            currentPage,
            " of ",
            pagination.totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleNextPage,
              disabled: !pagination.hasNextPage,
              children: "Next"
            }
          )
        ] })
      ] })
    ] }) }) }),
    courseId && showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateExamDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        courseId: Number(courseId),
        onExamCreated: () => {
          loadExams(currentPage);
          setShowCreateDialog(false);
        }
      }
    ) }) : null,
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewExamDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          setShowViewDialog(open);
          if (!open) {
            setSelectedExamId(null);
          }
        },
        examId: selectedExamId
      }
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditExamDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          setShowEditDialog(open);
          if (!open) {
            setSelectedExamId(null);
          }
        },
        examId: selectedExamId,
        onExamUpdated: () => {
          loadExams(currentPage);
          setShowEditDialog(false);
        }
      }
    ) }) : null,
    showDeleteDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: showDeleteDialog,
        onOpenChange: setShowDeleteDialog,
        title: "Delete Exam",
        description: selectedExam ? `Are you sure you want to delete the exam "${selectedExam.title}"? This action cannot be undone and will permanently remove the exam from the system.` : "Are you sure you want to delete this exam? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: confirmDeleteExam,
        isProcessing: deleting,
        variant: "destructive"
      }
    ) }) : null
  ] });
}

export { CourseExamsPage as default };
