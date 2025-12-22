import { r as reactExports, j as jsxRuntimeExports, B as Button, a8 as Trash2, a1 as Plus, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { C as CreateQuiz, A as AddQuizQuestions } from './quiz-DTu6yipn.js';
import { C as Checkbox } from './checkbox-CgkZGnpM.js';
import './index-BHy36ITo.js';

function CreateQuizDialog({
  open,
  onOpenChange,
  modules,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [step, setStep] = reactExports.useState("details");
  const [quizId, setQuizId] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    module_id: "",
    duration_minutes: 20,
    description: "",
    status: "draft"
  });
  const [questions, setQuestions] = reactExports.useState([
    {
      text: "",
      type: "single_choice",
      points: 1,
      options: [
        { text: "", is_correct: false },
        { text: "", is_correct: false }
      ]
    }
  ]);
  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.module_id || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: formData.title.trim(),
        module_id: parseInt(formData.module_id, 10),
        duration_minutes: formData.duration_minutes,
        description: formData.description.trim(),
        status: formData.status
      };
      const response = await CreateQuiz(payload);
      const data = response.data;
      if (data?.data?.id) {
        setQuizId(data.data.id);
        toast.success("Quiz created successfully");
        setStep("questions");
      } else {
        toast.error("Failed to create quiz - invalid response");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error(error.response?.data?.message || "Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitQuestions = async (e) => {
    e.preventDefault();
    if (!quizId) return;
    for (const q of questions) {
      if (!q.text.trim()) {
        toast.error("Please fill in all question texts");
        return;
      }
      if (q.options.some((opt) => !opt.text.trim())) {
        toast.error("Please fill in all option texts");
        return;
      }
      if (!q.options.some((opt) => opt.is_correct)) {
        toast.error("Each question must have at least one correct answer");
        return;
      }
    }
    try {
      setLoading(true);
      await AddQuizQuestions(quizId, questions);
      toast.success("Questions added successfully");
      handleClose();
      onSuccess();
    } catch (error) {
      console.error("Error adding questions:", error);
      toast.error(error.response?.data?.message || "Failed to add questions");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: "",
        module_id: "",
        duration_minutes: 20,
        description: "",
        status: "draft"
      });
      setQuestions([
        {
          text: "",
          type: "single_choice",
          points: 1,
          options: [
            { text: "", is_correct: false },
            { text: "", is_correct: false }
          ]
        }
      ]);
      setStep("details");
      setQuizId(null);
      onOpenChange(false);
    }
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: "single_choice",
        points: 1,
        options: [
          { text: "", is_correct: false },
          { text: "", is_correct: false }
        ]
      }
    ]);
  };
  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };
  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };
  const addOption = (questionIndex) => {
    const updated = [...questions];
    updated[questionIndex].options.push({ text: "", is_correct: false });
    setQuestions(updated);
  };
  const removeOption = (questionIndex, optionIndex) => {
    const updated = [...questions];
    if (updated[questionIndex].options.length > 2) {
      updated[questionIndex].options = updated[questionIndex].options.filter(
        (_, i) => i !== optionIndex
      );
      setQuestions(updated);
    }
  };
  const updateOption = (questionIndex, optionIndex, field, value) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = {
      ...updated[questionIndex].options[optionIndex],
      [field]: value
    };
    if (field === "is_correct" && value && updated[questionIndex].type === "single_choice") {
      updated[questionIndex].options.forEach((opt, i) => {
        if (i !== optionIndex) opt.is_correct = false;
      });
    }
    setQuestions(updated);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6", children: step === "details" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmitDetails, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: formData.module_id ? `Create Quiz for ${modules.find((m) => String(m.id) === formData.module_id)?.title || "Module"}` : "Create New Quiz" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Set up the basic details for your quiz" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Quiz Title *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "title",
            placeholder: "e.g., Module 1 Assessment",
            value: formData.title,
            onChange: (e) => setFormData({ ...formData, title: e.target.value }),
            disabled: loading,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "module", children: "Module *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: formData.module_id,
            onValueChange: (value) => setFormData({ ...formData, module_id: value }),
            disabled: loading,
            required: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a module" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: modules.map((module) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(module.id), children: module.title }, module.id)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "duration", children: "Duration (minutes) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "duration",
              type: "number",
              min: "1",
              value: formData.duration_minutes,
              onChange: (e) => setFormData({
                ...formData,
                duration_minutes: parseInt(e.target.value) || 20
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
              value: formData.status,
              onValueChange: (value) => setFormData({ ...formData, status: value }),
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
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "description",
            placeholder: "Brief description of the quiz...",
            value: formData.description,
            onChange: (e) => setFormData({ ...formData, description: e.target.value }),
            disabled: loading,
            rows: 3,
            required: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: handleClose,
          disabled: loading,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Add Questions" })
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmitQuestions, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Quiz Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create questions for your quiz" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
      questions.map((question, qIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-lg space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-base font-semibold", children: [
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
              disabled: questions.length === 1,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Question text",
            value: question.text,
            onChange: (e) => updateQuestion(qIndex, "text", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: question.type,
              onValueChange: (value) => updateQuestion(qIndex, "type", value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "single_choice", children: "Single Choice" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "multiple_choice", children: "Multiple Choice" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: "Points",
              min: "1",
              value: question.points,
              onChange: (e) => updateQuestion(
                qIndex,
                "points",
                parseInt(e.target.value) || 1
              ),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Options" }),
          question.options.map((option, oIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: option.is_correct,
                onCheckedChange: (checked) => updateOption(qIndex, oIndex, "is_correct", checked)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: `Option ${oIndex + 1}`,
                value: option.text,
                onChange: (e) => updateOption(qIndex, oIndex, "text", e.target.value),
                className: "flex-1",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => removeOption(qIndex, oIndex),
                disabled: question.options.length <= 2,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }, oIndex)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => addOption(qIndex),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                "Add Option"
              ]
            }
          )
        ] })
      ] }, qIndex)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: addQuestion,
          className: "w-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Question"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => setStep("details"),
          disabled: loading,
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Saving..." : "Create Quiz" })
    ] })
  ] }) }) });
}

export { CreateQuizDialog as default };
