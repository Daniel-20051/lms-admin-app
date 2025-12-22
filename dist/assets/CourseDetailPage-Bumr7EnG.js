const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AddModuleDialog-CqxBrbWH.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/index-DSZNHD2t.js","assets/courses-DmFTm-zX.js","assets/quiz-DTu6yipn.js","assets/exams-CpQ4GBAC.js","assets/admin-BVl3HTxX.js","assets/AddUnitDialog-7p-UZ4hk.js","assets/progress-B5LDT67g.js","assets/ContentEditor-C7WWW0-1.js","assets/ContentEditor-CPA2VslW.css","assets/EditUnitDialog-DSIRcH4a.js","assets/UnitPreviewDialog-DZ-nk7Nr.js","assets/badge-CVay2utB.js","assets/card-DKXLAlrm.js","assets/CreateQuizDialog-BGKloDrd.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/checkbox-CgkZGnpM.js","assets/EditQuizDialog-CImVnXqX.js","assets/QuizDetailsDialog-BJU05DbK.js","assets/QuizStatsDialog-ByccWR-T.js","assets/ConfirmDialog-D7vm-GNq.js"])))=>i.map(i=>d[i]);
import { aG as useParams, u as useNavigate, aH as useLocation, r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, e as ArrowLeft, a1 as Plus, k as BookOpen, aI as ChevronDown, a8 as Trash2, F as FileText, b as Eye, p as SquarePen, aJ as ListChecks, aK as Info, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from './card-DKXLAlrm.js';
import { B as Badge } from './badge-CVay2utB.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { G as GetStaffCoursesbyId, a as GetCourseModules, D as DeleteModule, b as DeleteUnit } from './courses-DmFTm-zX.js';
import { G as GetQuiz, D as DeleteQuiz } from './quiz-DTu6yipn.js';

const AddModuleDialog = reactExports.lazy(() => __vitePreload(() => import('./AddModuleDialog-CqxBrbWH.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]):void 0));
const AddUnitDialog = reactExports.lazy(() => __vitePreload(() => import('./AddUnitDialog-7p-UZ4hk.js'),true              ?__vite__mapDeps([12,1,2,3,4,5,8,13,14,15]):void 0));
const EditUnitDialog = reactExports.lazy(() => __vitePreload(() => import('./EditUnitDialog-DSIRcH4a.js'),true              ?__vite__mapDeps([16,1,2,3,4,5,8,13,14,15]):void 0));
const UnitPreviewDialog = reactExports.lazy(() => __vitePreload(() => import('./UnitPreviewDialog-DZ-nk7Nr.js'),true              ?__vite__mapDeps([17,1,2,3,18,19]):void 0));
const CreateQuizDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateQuizDialog-BGKloDrd.js'),true              ?__vite__mapDeps([20,1,2,3,4,5,6,21,22,9,23]):void 0));
const EditQuizDialog = reactExports.lazy(() => __vitePreload(() => import('./EditQuizDialog-CImVnXqX.js'),true              ?__vite__mapDeps([24,1,2,3,4,5,6,19,21,22,23,9]):void 0));
const QuizDetailsDialog = reactExports.lazy(() => __vitePreload(() => import('./QuizDetailsDialog-BJU05DbK.js'),true              ?__vite__mapDeps([25,1,2,3,18,19,9]):void 0));
const QuizStatsDialog = reactExports.lazy(() => __vitePreload(() => import('./QuizStatsDialog-ByccWR-T.js'),true              ?__vite__mapDeps([26,1,2,3,19,4,13,9]):void 0));
const ConfirmDialog = reactExports.lazy(() => __vitePreload(() => import('./ConfirmDialog-D7vm-GNq.js'),true              ?__vite__mapDeps([27,1,2,3]):void 0));
function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const basePath = isSuperAdmin ? "/super-admin" : "/admin";
  const [course, setCourse] = reactExports.useState(null);
  const [modules, setModules] = reactExports.useState([]);
  const [quizzes, setQuizzes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [courseLoading, setCourseLoading] = reactExports.useState(true);
  const [expandedModules, setExpandedModules] = reactExports.useState({});
  const [showAddModuleDialog, setShowAddModuleDialog] = reactExports.useState(false);
  const [showAddUnitDialog, setShowAddUnitDialog] = reactExports.useState(false);
  const [showEditUnitDialog, setShowEditUnitDialog] = reactExports.useState(false);
  const [showUnitPreviewDialog, setShowUnitPreviewDialog] = reactExports.useState(false);
  const [showCreateQuizDialog, setShowCreateQuizDialog] = reactExports.useState(false);
  const [showEditQuizDialog, setShowEditQuizDialog] = reactExports.useState(false);
  const [showQuizDetailsDialog, setShowQuizDetailsDialog] = reactExports.useState(false);
  const [showQuizStatsDialog, setShowQuizStatsDialog] = reactExports.useState(false);
  const [showDeleteModuleDialog, setShowDeleteModuleDialog] = reactExports.useState(false);
  const [showDeleteUnitDialog, setShowDeleteUnitDialog] = reactExports.useState(false);
  const [showDeleteQuizDialog, setShowDeleteQuizDialog] = reactExports.useState(false);
  const [deleteUnitLoading, setDeleteUnitLoading] = reactExports.useState(false);
  const [deleteQuizLoading, setDeleteQuizLoading] = reactExports.useState(false);
  const [selectedModule, setSelectedModule] = reactExports.useState(null);
  const [selectedUnit, setSelectedUnit] = reactExports.useState(null);
  const [selectedQuiz, setSelectedQuiz] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadModules();
      loadQuizzes();
    }
  }, [courseId]);
  const loadCourseData = async () => {
    try {
      setCourseLoading(true);
      const response = await GetStaffCoursesbyId(courseId);
      const data = response.data;
      if (data?.status || data?.success) {
        setCourse(data.data);
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Failed to load course details");
      }
    } catch (error) {
      console.error("Error loading course:", error);
      toast.error("Failed to load course details");
    } finally {
      setCourseLoading(false);
    }
  };
  const loadModules = async () => {
    try {
      setLoading(true);
      const response = await GetCourseModules(courseId);
      const data = response.data;
      if (data?.status || data?.success) {
        setModules(data.data || []);
      } else {
        console.error("Unexpected response format:", data);
        setModules([]);
      }
    } catch (error) {
      console.error("Error loading modules:", error);
      toast.error("Failed to load modules");
      setModules([]);
    } finally {
      setLoading(false);
    }
  };
  const loadQuizzes = async () => {
    try {
      const response = await GetQuiz(Number(courseId));
      const data = response.data;
      if (data?.status || data?.success) {
        setQuizzes(data.data || []);
      } else {
        setQuizzes([]);
      }
    } catch (error) {
      console.error("Error loading quizzes:", error);
      setQuizzes([]);
    }
  };
  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  const handleDeleteModule = async () => {
    if (!selectedModule) return;
    try {
      await DeleteModule(String(selectedModule.id));
      toast.success("Module deleted successfully");
      loadModules();
      setShowDeleteModuleDialog(false);
      setSelectedModule(null);
    } catch (error) {
      console.error("Error deleting module:", error);
      toast.error("Failed to delete module");
    }
  };
  const handleDeleteUnit = async () => {
    if (!selectedUnit) return;
    try {
      setDeleteUnitLoading(true);
      await DeleteUnit(String(selectedUnit.id));
      toast.success("Unit deleted successfully");
      loadModules();
      setShowDeleteUnitDialog(false);
      setSelectedUnit(null);
    } catch (error) {
      console.error("Error deleting unit:", error);
      toast.error("Failed to delete unit");
    } finally {
      setDeleteUnitLoading(false);
    }
  };
  const handleDeleteQuiz = async () => {
    if (!selectedQuiz) return;
    try {
      setDeleteQuizLoading(true);
      await DeleteQuiz(selectedQuiz.id);
      toast.success("Quiz deleted successfully");
      loadQuizzes();
      setShowDeleteQuizDialog(false);
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    } finally {
      setDeleteQuizLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate(`${basePath}/content/course-content`),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: courseLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Loading course..." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: course?.title || "Course Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          course?.course_code && `${course.course_code} • `,
          "Level ",
          course?.course_level
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "modules", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "modules", children: "Modules & Units" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "quizzes", children: "Quizzes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "modules", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Course Modules" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddModuleDialog(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Module"
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Loading modules..." })
        ] }) : modules.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: 'No modules yet. Click "Add Module" to get started.' })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: modules.map((module, index) => {
          const isExpanded = expandedModules[module.id];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3 pb-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm", children: index + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: module.title }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-black", children: [
                    module.units?.length || 0,
                    " units"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => toggleModule(module.id),
                      className: "h-8 transition-transform duration-200",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          className: `h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"}`
                        }
                      )
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      setSelectedModule(module);
                      setShowAddUnitDialog(true);
                    },
                    className: "h-8",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                      "Add Unit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive hover:text-destructive",
                    onClick: () => {
                      setSelectedModule(module);
                      setShowDeleteModuleDialog(true);
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`,
                children: module.units && module.units.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `space-y-2 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`, children: module.units.map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm", children: "I" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: unit.title })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8",
                            onClick: () => {
                              setSelectedUnit(unit);
                              setShowUnitPreviewDialog(true);
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8",
                            onClick: () => {
                              setSelectedUnit(unit);
                              setShowEditUnitDialog(true);
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8 text-destructive hover:text-destructive",
                            onClick: () => {
                              setSelectedUnit(unit);
                              setShowDeleteUnitDialog(true);
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                          }
                        )
                      ] })
                    ]
                  },
                  unit.id
                )) }) })
              }
            )
          ] }, module.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "quizzes", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Course Quizzes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreateQuizDialog(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Create Quiz"
          ] })
        ] }),
        quizzes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-12 w-12 text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: 'No quizzes yet. Click "Create Quiz" to get started.' })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-12", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Attempts Allowed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[120px]", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: quizzes.map((quiz, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm", children: index + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: quiz.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              quiz.duration_minutes,
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: quiz.questions?.length || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: quiz.attempts_allowed || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: quiz.status === "published" ? "default" : "secondary",
                children: quiz.status
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => {
                    setSelectedQuiz(quiz);
                    setShowQuizStatsDialog(true);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-primary" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => {
                    setSelectedQuiz(quiz);
                    setShowQuizDetailsDialog(true);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => {
                    setSelectedQuiz(quiz);
                    setShowEditQuizDialog(true);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => {
                    setSelectedQuiz(quiz);
                    setShowDeleteQuizDialog(true);
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                }
              )
            ] }) })
          ] }, quiz.id)) })
        ] }) })
      ] })
    ] }),
    showAddModuleDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddModuleDialog,
      {
        open: showAddModuleDialog,
        onOpenChange: setShowAddModuleDialog,
        courseId,
        onSuccess: loadModules
      }
    ) }) : null,
    selectedModule && showAddUnitDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddUnitDialog,
      {
        open: showAddUnitDialog,
        onOpenChange: setShowAddUnitDialog,
        moduleId: String(selectedModule.id),
        moduleTitle: selectedModule.title,
        onSuccess: loadModules
      }
    ) }) : null,
    selectedUnit && (showEditUnitDialog || showUnitPreviewDialog) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
      showEditUnitDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditUnitDialog,
        {
          open: showEditUnitDialog,
          onOpenChange: setShowEditUnitDialog,
          unit: selectedUnit,
          onSuccess: loadModules
        }
      ) : null,
      showUnitPreviewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        UnitPreviewDialog,
        {
          open: showUnitPreviewDialog,
          onOpenChange: setShowUnitPreviewDialog,
          unit: selectedUnit
        }
      ) : null
    ] }) : null,
    courseId && modules.length > 0 && showCreateQuizDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateQuizDialog,
      {
        open: showCreateQuizDialog,
        onOpenChange: setShowCreateQuizDialog,
        courseId: Number(courseId),
        modules,
        onSuccess: loadQuizzes
      }
    ) }) : null,
    selectedQuiz && (showEditQuizDialog || showQuizDetailsDialog || showQuizStatsDialog) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
      showEditQuizDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditQuizDialog,
        {
          open: showEditQuizDialog,
          onOpenChange: setShowEditQuizDialog,
          quiz: selectedQuiz,
          onSuccess: loadQuizzes
        }
      ) : null,
      showQuizDetailsDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuizDetailsDialog,
        {
          open: showQuizDetailsDialog,
          onOpenChange: setShowQuizDetailsDialog,
          quizId: selectedQuiz.id,
          quiz: selectedQuiz
        }
      ) : null,
      showQuizStatsDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuizStatsDialog,
        {
          open: showQuizStatsDialog,
          onOpenChange: setShowQuizStatsDialog,
          quizId: selectedQuiz.id,
          quizTitle: selectedQuiz.title
        }
      ) : null
    ] }) : null,
    showDeleteModuleDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: showDeleteModuleDialog,
        onOpenChange: setShowDeleteModuleDialog,
        onConfirm: handleDeleteModule,
        title: "Delete Module",
        description: "Are you sure you want to delete this module? This will also delete all units within it. This action cannot be undone.",
        confirmText: "Delete",
        variant: "destructive"
      }
    ) }) : null,
    showDeleteUnitDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: showDeleteUnitDialog,
        onOpenChange: setShowDeleteUnitDialog,
        onConfirm: handleDeleteUnit,
        title: "Delete Unit",
        description: "Are you sure you want to delete this unit? This action cannot be undone.",
        confirmText: "Delete",
        variant: "destructive",
        isProcessing: deleteUnitLoading
      }
    ) }) : null,
    showDeleteQuizDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: showDeleteQuizDialog,
        onOpenChange: setShowDeleteQuizDialog,
        onConfirm: handleDeleteQuiz,
        title: "Delete Quiz",
        description: "Are you sure you want to delete this quiz? This will also delete all questions and student attempts. This action cannot be undone.",
        confirmText: "Delete",
        variant: "destructive",
        isProcessing: deleteQuizLoading
      }
    ) }) : null
  ] });
}

export { CourseDetailPage as default };
