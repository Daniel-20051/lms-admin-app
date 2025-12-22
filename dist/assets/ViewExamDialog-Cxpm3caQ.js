import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, e as ArrowLeft, aY as ChevronUp, aI as ChevronDown, U as Users, aF as ChartColumn, J as Search } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, f as DialogBody } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { b as GetExamById, c as GetExamAttempts, d as GetExamStatistics } from './exams-CpQ4GBAC.js';
import { G as GetStaffCoursesbyId } from './courses-DmFTm-zX.js';

function ViewExamDialog({
  open,
  onOpenChange,
  examId
}) {
  const [examDetails, setExamDetails] = reactExports.useState(null);
  const [courseTitle, setCourseTitle] = reactExports.useState("");
  const [attempts, setAttempts] = reactExports.useState([]);
  const [statistics, setStatistics] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingAttempts, setLoadingAttempts] = reactExports.useState(false);
  const [loadingStatistics, setLoadingStatistics] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showDetails, setShowDetails] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (open && examId) {
      loadExamDetails();
      loadAttempts();
      loadStatistics();
    } else {
      setExamDetails(null);
      setAttempts([]);
      setStatistics(null);
      setSearchQuery("");
    }
  }, [open, examId]);
  const loadExamDetails = async () => {
    if (!examId) return;
    try {
      setLoading(true);
      const response = await GetExamById(examId);
      const data = response?.data;
      if (data?.status || data?.success || response?.status === 200) {
        const exam = data?.data || data;
        setExamDetails(exam);
        if (exam.course_id) {
          try {
            const courseResponse = await GetStaffCoursesbyId(String(exam.course_id));
            const courseData = courseResponse.data;
            if (courseData?.status || courseData?.success) {
              setCourseTitle(courseData.data?.title || "");
            }
          } catch (error) {
            console.error("Error loading course:", error);
          }
        }
      } else {
        toast.error(data?.message || "Failed to load exam details");
      }
    } catch (error) {
      console.error("Error loading exam details:", error);
      toast.error("Failed to load exam details");
    } finally {
      setLoading(false);
    }
  };
  const loadAttempts = async () => {
    if (!examId) return;
    try {
      setLoadingAttempts(true);
      const response = await GetExamAttempts(examId);
      const data = response?.data;
      if (data?.status && data?.data) {
        setAttempts(data.data);
      } else {
        setAttempts([]);
      }
    } catch (error) {
      console.error("Error loading attempts:", error);
      setAttempts([]);
    } finally {
      setLoadingAttempts(false);
    }
  };
  const loadStatistics = async () => {
    if (!examId) return;
    try {
      setLoadingStatistics(true);
      const response = await GetExamStatistics(examId);
      const data = response?.data;
      if (data?.status && data?.data) {
        setStatistics(data.data);
      } else {
        setStatistics(null);
      }
    } catch (error) {
      console.error("Error loading statistics:", error);
      setStatistics(null);
    } finally {
      setLoadingStatistics(false);
    }
  };
  const filteredAttempts = attempts.filter((attempt) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return attempt.student_name?.toLowerCase().includes(query) || attempt.matric_number?.toLowerCase().includes(query);
  });
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateString;
    }
  };
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "submitted" || statusLower === "completed") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800", children: "Submitted" });
    } else if (statusLower === "in_progress") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-800", children: "In Progress" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-background border-b px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => onOpenChange(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
              "Back"
            ]
          }
        ),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: examDetails?.title || "Exam Details" })
      ] }),
      !loading && examDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        courseTitle.toUpperCase(),
        " - Exam Details"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { className: "px-6 py-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" })
    ] }) : examDetails ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowDetails(!showDetails),
            className: "flex items-center gap-2 text-lg font-semibold mb-2",
            children: [
              "Exam Details",
              showDetails ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
            ]
          }
        ),
        showDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Academic Year" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: examDetails.academic_year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Semester" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: examDetails.semester })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
              examDetails.duration_minutes,
              " minutes"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Exam Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium capitalize", children: examDetails.exam_type.replace("-", " ") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Max Attempts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: examDetails.max_attempts })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: examDetails.visibility === "published" ? "default" : "secondary",
                children: examDetails.visibility
              }
            )
          ] }),
          examDetails.instructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Instructions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: examDetails.instructions })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "attempts", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "attempts", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
            "Student Attempts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "statistics", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
            "Statistics"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "attempts", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Student Attempts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View and grade student exam attempts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search by student name or matric number...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "pl-10"
                }
              )
            ] }),
            loadingAttempts ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, i)) }) : filteredAttempts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "No attempts yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No student attempts found for this exam." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredAttempts.map((attempt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-4 border rounded-lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: attempt.student_name || "Unknown Student" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: attempt.matric_number || "N/A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                      "Started: ",
                      formatDate(attempt.started_at)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    attempt.submitted_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: attempt.total_score !== void 0 && attempt.max_score !== void 0 ? `${attempt.total_score}/${attempt.max_score}` : "N/A" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(attempt.submitted_at) })
                    ] }),
                    getStatusBadge(attempt.status)
                  ] })
                ]
              },
              attempt.id
            )) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "statistics", className: "mt-4", children: loadingStatistics ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 mt-2" })
        ] }) }, i)) }) : statistics ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Total Attempts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-3xl font-bold text-foreground mt-2", children: statistics.total_attempts })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Average Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-3xl font-bold text-foreground mt-2", children: parseFloat(statistics.average_score).toFixed(2) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Highest Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-3xl font-bold text-foreground mt-2", children: statistics.highest_score })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Lowest Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-3xl font-bold text-foreground mt-2", children: statistics.lowest_score })
            ] }) })
          ] }),
          statistics.total_attempts === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mb-1", children: "No student attempts have been submitted yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Statistics will appear once students start taking the exam." })
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-12 w-12 text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed to load statistics." })
        ] }) }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed to load exam details" }) }) })
  ] }) });
}

export { ViewExamDialog as default };
