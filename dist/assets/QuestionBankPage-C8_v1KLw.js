const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AddQuestionDialog-BJTv6Bmx.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/exams-CpQ4GBAC.js"])))=>i.map(i=>d[i]);
import { u as useNavigate, f as useSearchParams, r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, e as ArrowLeft, a1 as Plus, J as Search, aN as FileQuestionMark, $ as ChevronLeft, a0 as ChevronRight, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { a as GetBankQuestions } from './exams-CpQ4GBAC.js';
import { G as GetStaffCoursesbyId } from './courses-DmFTm-zX.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import './index-BHy36ITo.js';

const AddQuestionDialog = reactExports.lazy(() => __vitePreload(() => import('./AddQuestionDialog-BJTv6Bmx.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]):void 0));
function QuestionBankPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [courseTitle, setCourseTitle] = reactExports.useState("");
  const [courseLoading, setCourseLoading] = reactExports.useState(false);
  const [questions, setQuestions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [difficultyFilter, setDifficultyFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [showAddDialog, setShowAddDialog] = reactExports.useState(false);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });
  reactExports.useEffect(() => {
    if (courseId) {
      setCurrentPage(1);
      loadCourseData();
      loadQuestions();
    } else {
      toast.error("Course ID is required");
      navigate("/super-admin/content/exams");
    }
  }, [courseId]);
  reactExports.useEffect(() => {
    if (courseId && currentPage > 0) {
      loadQuestions();
    }
  }, [currentPage]);
  const loadCourseData = async () => {
    if (!courseId) return;
    try {
      setCourseLoading(true);
      const response = await GetStaffCoursesbyId(courseId);
      const data = response.data;
      if (data?.status || data?.success) {
        setCourseTitle(data.data?.title || data.data?.course?.title || "");
      }
    } catch (error) {
      console.error("Error loading course:", error);
    } finally {
      setCourseLoading(false);
    }
  };
  const loadQuestions = async () => {
    if (!courseId) return;
    const limit = 20;
    try {
      setLoading(true);
      const response = await GetBankQuestions(Number(courseId), currentPage, limit);
      const data = response.data;
      if (data?.status === true || data?.success === true) {
        const questionsData = data.data;
        if (Array.isArray(questionsData)) {
          setQuestions(questionsData);
        } else if (questionsData && typeof questionsData === "object" && questionsData.id) {
          setQuestions([questionsData]);
        } else {
          setQuestions([]);
        }
        if (data.pagination) {
          setPagination({
            total: data.pagination.total || 0,
            page: data.pagination.page || currentPage,
            limit: data.pagination.limit || 20,
            totalPages: data.pagination.totalPages || 1,
            hasNextPage: data.pagination.hasNextPage || false,
            hasPreviousPage: data.pagination.hasPreviousPage || false
          });
        }
      } else if (Array.isArray(data?.data)) {
        setQuestions(data.data);
      } else if (data?.data && typeof data.data === "object" && data.data.id) {
        setQuestions([data.data]);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      toast.error("Failed to load questions");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };
  const filteredQuestions = reactExports.useMemo(() => {
    return questions.filter((q) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const questionText = q.objective?.question_text?.toLowerCase() || q.theory?.question_text?.toLowerCase() || "";
        if (!questionText.includes(searchLower)) {
          return false;
        }
      }
      if (typeFilter !== "all" && q.question_type !== typeFilter) {
        return false;
      }
      if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) {
        return false;
      }
      if (statusFilter !== "all" && q.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [questions, searchTerm, typeFilter, difficultyFilter, statusFilter]);
  const totalObjectiveQuestions = questions.filter((q) => q.question_type === "objective").length;
  const totalTheoryQuestions = questions.filter((q) => q.question_type === "theory").length;
  const totalApprovedQuestions = questions.filter((q) => q.status === "approved").length;
  const totalQuestions = pagination.total > 0 ? pagination.total : questions.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => navigate("/super-admin/content/exams"),
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Exams"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddDialog(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Question"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "Question Bank" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-lg font-medium", children: courseLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48" }) : courseTitle.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Objective Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: totalObjectiveQuestions })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Theory Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: totalTheoryQuestions })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Approved Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: totalApprovedQuestions })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Total Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: totalQuestions })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search questions...",
              className: "pl-9",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "objective", children: "Objective" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "theory", children: "Theory" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: difficultyFilter, onValueChange: setDifficultyFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Levels" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "easy", children: "Easy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hard", children: "Hard" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Status" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "approved", children: "Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rejected", children: "Rejected" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "Showing ",
        filteredQuestions.length,
        " of ",
        questions.length,
        " questions on this page",
        pagination.total > 0 && ` (${pagination.total} total)`
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }) })
      ] }, i)) }) : filteredQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileQuestionMark, { className: "h-16 w-16 text-muted-foreground mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium mb-2", children: "No questions found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "This course doesn't have any questions in the bank yet." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filteredQuestions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: question.question_type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: question.difficulty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: question.status === "approved" ? "default" : "outline",
              children: question.status
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg mb-2", children: [
          index + 1,
          ". ",
          question.objective?.question_text || question.theory?.question_text
        ] }),
        question.objective && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-4", children: question.objective.options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `p-2 rounded border ${option.id === question.objective?.correct_option ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-gray-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                option.id,
                ". "
              ] }),
              option.text,
              option.id === question.objective?.correct_option && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "ml-2", children: "Correct" })
            ]
          },
          option.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
          question.objective?.marks || question.theory?.max_marks,
          " marks"
        ] }) })
      ] }) }) }) }, question.id)) }),
      pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Showing ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (currentPage - 1) * pagination.limit + 1 }),
          " to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: Math.min(currentPage * pagination.limit, pagination.total) }),
          " of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: pagination.total }),
          " questions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setCurrentPage((prev) => Math.max(1, prev - 1)),
              disabled: !pagination.hasPreviousPage || currentPage === 1,
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
              onClick: () => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1)),
              disabled: !pagination.hasNextPage || currentPage >= pagination.totalPages,
              children: [
                "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    courseId && showAddDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddQuestionDialog,
      {
        open: showAddDialog,
        onOpenChange: setShowAddDialog,
        courseId: Number(courseId),
        onQuestionAdded: () => {
          setCurrentPage(1);
          loadQuestions();
        }
      }
    ) }) : null
  ] });
}

export { QuestionBankPage as default };
