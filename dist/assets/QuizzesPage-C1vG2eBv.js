import { r as reactExports, t as toast, j as jsxRuntimeExports, J as Search, aJ as ListChecks, k as BookOpen, B as Button, b as Eye, T as TrendingUp, p as SquarePen, a8 as Trash2 } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { G as GetQuiz, D as DeleteQuiz } from './quiz-DTu6yipn.js';
import QuizDetailsDialog from './QuizDetailsDialog-BJU05DbK.js';
import QuizStatsDialog from './QuizStatsDialog-ByccWR-T.js';
import EditQuizDialog from './EditQuizDialog-CImVnXqX.js';
import ConfirmDialog from './ConfirmDialog-D7vm-GNq.js';
import { u as useCoursesManagement, C as CoursesFilters } from './CoursesFilters-CVm0Ynpd.js';
import './dialog-Bga1LIUy.js';
import './progress-B5LDT67g.js';
import './label-UX76_odr.js';
import './textarea-LWcfCAwC.js';
import './select-cypf-omf.js';
import './index-BHy36ITo.js';
import './checkbox-CgkZGnpM.js';
import './courses-DmFTm-zX.js';
import './programs-a0V4l-AP.js';
import './admin-BVl3HTxX.js';

function QuizzesPage() {
  const {
    courses,
    searchTerm,
    semesterFilter,
    academicYearFilter,
    programFilter,
    facultyFilter,
    staffFilter,
    levelFilter,
    setSearchTerm,
    setSemesterFilter,
    setAcademicYearFilter,
    setProgramFilter,
    setFacultyFilter,
    setStaffFilter,
    setLevelFilter
  } = useCoursesManagement();
  const [quizzes, setQuizzes] = reactExports.useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedQuiz, setSelectedQuiz] = reactExports.useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = reactExports.useState(false);
  const [showStatsDialog, setShowStatsDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (courses.length > 0) {
      loadAllQuizzes();
    }
  }, [courses]);
  reactExports.useEffect(() => {
    if (searchQuery) {
      const filtered = quizzes.filter(
        (quiz) => quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || quiz.course?.course_code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    } else {
      setFilteredQuizzes(quizzes);
    }
  }, [searchQuery, quizzes]);
  const loadAllQuizzes = async () => {
    try {
      setLoading(true);
      const allQuizzes = [];
      for (const course of courses) {
        try {
          const quizzesResponse = await GetQuiz(course.id);
          const data = quizzesResponse.data;
          if (data?.success) {
            const courseQuizzes = (data.data || []).map((quiz) => ({
              ...quiz,
              course: {
                id: course.id,
                title: course.title,
                course_code: course.course_code
              }
            }));
            allQuizzes.push(...courseQuizzes);
          }
        } catch (error) {
          console.error(`Error loading quizzes for course ${course.id}:`, error);
        }
      }
      setQuizzes(allQuizzes);
      setFilteredQuizzes(allQuizzes);
    } catch (error) {
      console.error("Error loading quizzes:", error);
      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteQuiz = async () => {
    if (!selectedQuiz) return;
    try {
      await DeleteQuiz(selectedQuiz.id);
      toast.success("Quiz deleted successfully");
      loadAllQuizzes();
      setShowDeleteDialog(false);
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "All Quizzes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage all quizzes across courses" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Filter Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm", children: "Use filters to find quizzes from specific courses" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CoursesFilters,
        {
          searchTerm,
          onSearchChange: setSearchTerm,
          semesterFilter,
          onSemesterChange: setSemesterFilter,
          academicYearFilter,
          onAcademicYearChange: setAcademicYearFilter,
          programFilter,
          onProgramChange: setProgramFilter,
          facultyFilter,
          onFacultyChange: setFacultyFilter,
          staffFilter,
          onStaffChange: setStaffFilter,
          levelFilter,
          onLevelChange: setLevelFilter
        }
      ) })
    ] }),
    quizzes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Quizzes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: quizzes.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Published" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: quizzes.filter((q) => q.status === "published").length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: quizzes.reduce((acc, q) => acc + (q.questions?.length || 0), 0) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Search Quizzes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Find quizzes by title or course code" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by quiz title or course code...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-10"
          }
        )
      ] }) })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }) })
    ] }, i)) }) : filteredQuizzes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: searchQuery ? "No quizzes found matching your search" : "No quizzes available for this session" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredQuizzes.map((quiz) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg line-clamp-2", children: quiz.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { className: "mt-1", children: [
            quiz.course?.course_code,
            " • ",
            quiz.duration_minutes,
            " min"
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: quiz.course?.title })
        ] }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setSelectedQuiz(quiz);
                setShowDetailsDialog(true);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-1" }),
                "Details"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setSelectedQuiz(quiz);
                setShowStatsDialog(true);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 mr-1" }),
                "Stats"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => {
                setSelectedQuiz(quiz);
                setShowEditDialog(true);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-1" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              size: "sm",
              onClick: () => {
                setSelectedQuiz(quiz);
                setShowDeleteDialog(true);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1" }),
                "Delete"
              ]
            }
          )
        ] })
      ] })
    ] }, quiz.id)) }),
    selectedQuiz && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuizDetailsDialog,
        {
          open: showDetailsDialog,
          onOpenChange: setShowDetailsDialog,
          quizId: selectedQuiz.id
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuizStatsDialog,
        {
          open: showStatsDialog,
          onOpenChange: setShowStatsDialog,
          quizId: selectedQuiz.id
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditQuizDialog,
        {
          open: showEditDialog,
          onOpenChange: setShowEditDialog,
          quiz: selectedQuiz,
          onSuccess: loadAllQuizzes
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: showDeleteDialog,
        onOpenChange: setShowDeleteDialog,
        onConfirm: handleDeleteQuiz,
        title: "Delete Quiz",
        description: "Are you sure you want to delete this quiz? This will also delete all questions and student attempts. This action cannot be undone.",
        confirmText: "Delete",
        variant: "destructive"
      }
    )
  ] });
}

export { QuizzesPage as default };
