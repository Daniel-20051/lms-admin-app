import { r as reactExports, j as jsxRuntimeExports, B as Button, a1 as Plus, a8 as Trash2, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { C as Card, d as CardContent } from './card-DKXLAlrm.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { C as Checkbox } from './checkbox-CgkZGnpM.js';
import { a as GetQuizById, U as UpdateQuiz, c as UpdateQuizQuestions } from './quiz-DTu6yipn.js';
import './index-BHy36ITo.js';

function EditQuizDialog({
  open,
  onOpenChange,
  quiz,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [fetchingQuiz, setFetchingQuiz] = reactExports.useState(false);
  const [quizFormData, setQuizFormData] = reactExports.useState({
    title: quiz.title,
    description: quiz.description || "",
    duration_minutes: quiz.duration_minutes,
    status: quiz.status
  });
  const [questions, setQuestions] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (open) {
      loadQuizDetails();
    }
  }, [open, quiz.id]);
  const loadQuizDetails = async () => {
    try {
      setFetchingQuiz(true);
      const response = await GetQuizById(quiz.id);
      const data = response.data;
      if (data?.status || data?.success) {
        const fullQuiz = data.data;
        setQuizFormData({
          title: fullQuiz.title || quiz.title,
          description: fullQuiz.description || quiz.description || "",
          duration_minutes: fullQuiz.duration_minutes || quiz.duration_minutes,
          status: fullQuiz.status || quiz.status
        });
        if (fullQuiz.questions && fullQuiz.questions.length > 0) {
          const mappedQuestions = fullQuiz.questions.map((q) => {
            const mappedOptions = (q.options || []).map((opt) => ({
              id: opt.id,
              text: opt.option_text || opt.text || "",
              is_correct: opt.is_correct || false
            }));
            while (mappedOptions.length < 2) {
              mappedOptions.push({
                text: "",
                is_correct: false
              });
            }
            return {
              id: q.id,
              html: q.question_text || q.html || "",
              points: q.points || 1,
              type: q.question_type || q.type || "single_choice",
              options: mappedOptions
            };
          });
          console.log("Loaded questions with options:", mappedQuestions);
          setQuestions(mappedQuestions);
        } else {
          setQuestions([]);
        }
      } else {
        setQuizFormData({
          title: quiz.title,
          description: quiz.description || "",
          duration_minutes: quiz.duration_minutes,
          status: quiz.status
        });
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error loading quiz details:", error);
      setQuizFormData({
        title: quiz.title,
        description: quiz.description || "",
        duration_minutes: quiz.duration_minutes,
        status: quiz.status
      });
      setQuestions([]);
    } finally {
      setFetchingQuiz(false);
    }
  };
  const updateQuestion = (qIndex, field, value, optIndex) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (field === "option_text" && optIndex !== void 0) {
        updated[qIndex].options[optIndex].text = value;
      } else if (field === "option_correct" && optIndex !== void 0) {
        if (value && updated[qIndex].type === "single_choice") {
          updated[qIndex].options.forEach((opt, idx) => {
            opt.is_correct = idx === optIndex;
          });
        } else {
          updated[qIndex].options[optIndex].is_correct = value;
        }
      } else {
        updated[qIndex][field] = value;
      }
      return updated;
    });
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        html: "",
        points: 1,
        type: "single_choice",
        options: [
          { text: "", is_correct: false },
          { text: "", is_correct: false }
        ]
      }
    ]);
  };
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  const addOption = (qIndex) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (!updated[qIndex].options) {
        updated[qIndex].options = [];
      }
      updated[qIndex].options.push({ text: "", is_correct: false });
      return updated;
    });
  };
  const removeOption = (qIndex, optIndex) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (updated[qIndex].options.length > 2) {
        updated[qIndex].options.splice(optIndex, 1);
      }
      return updated;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quizFormData.title.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.html.trim()) {
        toast.error(`Question ${i + 1} text is required`);
        return;
      }
      if (q.options.length < 2) {
        toast.error(`Question ${i + 1} must have at least 2 options`);
        return;
      }
      const hasCorrect = q.options.some((opt) => opt.is_correct);
      if (!hasCorrect) {
        toast.error(`Question ${i + 1} must have at least one correct answer`);
        return;
      }
      if (q.type === "single_choice") {
        const correctCount = q.options.filter((opt) => opt.is_correct).length;
        if (correctCount !== 1) {
          toast.error(`Question ${i + 1} (Single Choice) must have exactly one correct answer`);
          return;
        }
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].text.trim()) {
          toast.error(`Question ${i + 1}, Option ${j + 1} text is required`);
          return;
        }
      }
    }
    try {
      setLoading(true);
      await UpdateQuiz(quiz.id, quizFormData);
      if (questions.length > 0) {
        const questionsPayload = questions.map((q) => {
          const questionPayload = {
            html: q.html,
            points: q.points,
            type: q.type,
            options: q.options.map((opt) => {
              const optionPayload = {
                option_text: opt.text,
                is_correct: opt.is_correct
              };
              if (opt.id) {
                optionPayload.id = opt.id;
              }
              return optionPayload;
            })
          };
          if (q.id) {
            questionPayload.id = q.id;
          }
          return questionPayload;
        });
        await UpdateQuizQuestions(quiz.id, questionsPayload);
      }
      toast.success("Quiz updated successfully");
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error(error.response?.data?.message || "Failed to update quiz");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "px-6 pt-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Quiz" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update quiz details and questions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 pb-6", children: fetchingQuiz ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-6 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Quiz Details" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 pb-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "title",
                  placeholder: "e.g., Module 1 Assessment",
                  value: quizFormData.title,
                  onChange: (e) => setQuizFormData({ ...quizFormData, title: e.target.value }),
                  disabled: loading,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  placeholder: "Brief description of the quiz...",
                  value: quizFormData.description,
                  onChange: (e) => setQuizFormData({ ...quizFormData, description: e.target.value }),
                  disabled: loading,
                  rows: 4
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "duration", children: "Duration (minutes) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "duration",
                  type: "number",
                  min: "1",
                  value: quizFormData.duration_minutes,
                  onChange: (e) => setQuizFormData({
                    ...quizFormData,
                    duration_minutes: parseInt(e.target.value) || 1
                  }),
                  disabled: loading,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: quizFormData.status,
                  onValueChange: (value) => setQuizFormData({ ...quizFormData, status: value }),
                  disabled: loading,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Draft" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-3", children: "Questions Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: questions.length > 0 ? questions.map((q, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                  "Q",
                  index + 1,
                  ": ",
                  q.html || "Untitled Question"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  q.options.length,
                  " options • ",
                  q.points,
                  " points"
                ] })
              ] }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No questions yet" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: addQuestion,
                disabled: loading,
                size: "sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                  "Add Question"
                ]
              }
            )
          ] }),
          questions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8 text-center text-muted-foreground", children: 'No questions added. Click "Add Question" to get started.' }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: questions.map((question, qIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 pb-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold", children: [
                "Question ",
                qIndex + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => removeQuestion(qIndex),
                  disabled: loading || questions.length === 1,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Points:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "1",
                    value: question.points,
                    onChange: (e) => updateQuestion(qIndex, "points", parseInt(e.target.value) || 1),
                    disabled: loading
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Question Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: question.type,
                    onValueChange: (value) => updateQuestion(qIndex, "type", value),
                    disabled: loading,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "single_choice", children: "Single Choice" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "multiple_choice", children: "Multiple Choice" })
                      ] })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Question Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: "Enter the question...",
                  value: question.html,
                  onChange: (e) => updateQuestion(qIndex, "html", e.target.value),
                  disabled: loading,
                  rows: 3,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Answer Options" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => addOption(qIndex),
                    disabled: loading,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                      "Add Option"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (question.options || []).length > 0 ? (question.options || []).map((option, optIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        checked: option.is_correct || false,
                        onCheckedChange: (checked) => updateQuestion(
                          qIndex,
                          "option_correct",
                          checked,
                          optIndex
                        ),
                        disabled: loading
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: `Option ${optIndex + 1}`,
                        value: option.text || "",
                        onChange: (e) => updateQuestion(
                          qIndex,
                          "option_text",
                          e.target.value,
                          optIndex
                        ),
                        disabled: loading,
                        required: true
                      }
                    ),
                    (question.options || []).length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        onClick: () => removeOption(qIndex, optIndex),
                        disabled: loading,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                      }
                    )
                  ]
                },
                optIndex
              )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'No options added. Click "Add Option" to add options.' }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: question.type === "single_choice" ? "Select exactly one correct option" : "Select one or more correct options" })
            ] })
          ] }) }, qIndex)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-6 border-t mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: loading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Updating..." : "Update Quiz" })
      ] })
    ] }) })
  ] }) });
}

export { EditQuizDialog as default };
