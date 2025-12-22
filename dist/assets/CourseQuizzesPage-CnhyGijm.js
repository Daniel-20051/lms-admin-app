import { aG as useParams, u as useNavigate, aH as useLocation, r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, e as ArrowLeft, aJ as ListChecks, T as TrendingUp } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, c as CardDescription, b as CardTitle, d as CardContent } from './card-DKXLAlrm.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { G as GetStaffCoursesbyId } from './courses-DmFTm-zX.js';
import { G as GetQuiz } from './quiz-DTu6yipn.js';
import QuizStatsDialog from './QuizStatsDialog-ByccWR-T.js';
import './dialog-Bga1LIUy.js';
import './input-DBQ7-6Gz.js';
import './progress-B5LDT67g.js';

function CourseQuizzesPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const basePath = isSuperAdmin ? "/super-admin" : "/admin";
  const [course, setCourse] = reactExports.useState(null);
  const [quizzes, setQuizzes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedQuiz, setSelectedQuiz] = reactExports.useState(null);
  const [showStatsDialog, setShowStatsDialog] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadQuizzes();
    }
  }, [courseId]);
  const loadCourseData = async () => {
    try {
      const response = await GetStaffCoursesbyId(courseId);
      const data = response.data;
      if (data?.success) {
        setCourse(data.data);
      }
    } catch (error) {
      console.error("Error loading course:", error);
      toast.error("Failed to load course details");
    }
  };
  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await GetQuiz(Number(courseId));
      const data = response.data;
      if (data?.success) {
        setQuizzes(data.data || []);
      }
    } catch (error) {
      console.error("Error loading quizzes:", error);
      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };
  const handleViewStats = (quiz) => {
    setSelectedQuiz(quiz);
    setShowStatsDialog(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate(`${basePath}/content/results`),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: course?.title || "Loading..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          course?.course_code,
          " • Quiz Results and Statistics"
        ] })
      ] })
    ] }),
    course && quizzes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Quizzes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: quizzes.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: quizzes.reduce((acc, q) => acc + (q.questions?.length || 0), 0) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Quiz Results" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }) })
      ] }, i)) }) : quizzes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-12 w-12 text-muted-foreground mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: "No quizzes found for this course" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: quizzes.map((quiz) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg line-clamp-2", children: quiz.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "mt-1", children: [
              quiz.duration_minutes,
              " minutes"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: quiz.status === "published" ? "default" : "secondary",
              children: quiz.status
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Questions:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: quiz.questions?.length || 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Attempts Allowed:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: quiz.attempts_allowed || 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              variant: "secondary",
              onClick: () => handleViewStats(quiz),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 mr-2" }),
                "View Statistics"
              ]
            }
          )
        ] })
      ] }, quiz.id)) })
    ] }),
    selectedQuiz && /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizStatsDialog,
      {
        open: showStatsDialog,
        onOpenChange: setShowStatsDialog,
        quizId: selectedQuiz.id
      }
    )
  ] });
}

export { CourseQuizzesPage as default };
