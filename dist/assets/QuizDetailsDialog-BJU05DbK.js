import { r as reactExports, t as toast, j as jsxRuntimeExports, z as Clock, F as FileText, U as Users, y as Calendar, C as CircleCheck, D as CircleX, B as Button } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-DKXLAlrm.js';
import { a as GetQuizById } from './quiz-DTu6yipn.js';

function QuizDetailsDialog({
  open,
  onOpenChange,
  quizId,
  quiz: quizProp
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [quiz, setQuiz] = reactExports.useState(quizProp || null);
  reactExports.useEffect(() => {
    if (open) {
      if (quizProp) {
        setQuiz(quizProp);
      } else {
        loadQuizDetails();
      }
    }
  }, [open, quizId, quizProp]);
  const loadQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await GetQuizById(quizId);
      const data = response.data;
      if (data?.status || data?.success) {
        setQuiz(data.data);
      }
    } catch (error) {
      console.error("Error loading quiz details:", error);
      toast.error("Failed to load quiz details");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-6 pt-6 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl", children: quiz?.title || "Loading..." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 pb-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Loading quiz details..." })
    ] }) : quiz ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 px-6 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Quiz Information" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 px-6 pb-6", children: [
          quiz.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: quiz.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Duration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                  quiz.duration_minutes,
                  " minutes"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Questions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: quiz.questions?.length || 0 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: quiz.status === "published" ? "default" : "secondary", children: quiz.status }) }),
            quiz.attempts_allowed !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Attempts Allowed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: quiz.attempts_allowed })
              ] })
            ] }),
            quiz.created_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Created" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: formatDate(quiz.created_at) })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4 px-6 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Questions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-6 pb-6", children: quiz.questions && quiz.questions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: quiz.questions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pb-4 border-b last:border-b-0 last:pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: [
                "Question ",
                index + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium", children: question.question_text })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize text-xs", children: question.question_type.replace("_", " ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                question.points,
                " points"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Options:" }),
            question.options && question.options.length > 0 ? question.options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-2 p-2 rounded-lg border transition-colors ${option.is_correct ? "bg-green-50 border-green-200" : "bg-muted/30 border-muted"}`,
                children: [
                  option.is_correct ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-600 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-red-600 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm ${option.is_correct ? "font-medium text-green-900" : "text-muted-foreground"}`, children: option.text })
                ]
              },
              option.id
            )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No options available" })
          ] })
        ] }, question.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No questions added yet" }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8 text-center text-muted-foreground", children: "Failed to load quiz details" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 pt-4 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), className: "w-full", children: "Close" }) })
  ] }) });
}

export { QuizDetailsDialog as default };
