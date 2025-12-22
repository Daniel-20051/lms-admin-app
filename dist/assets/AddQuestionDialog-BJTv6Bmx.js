import { r as reactExports, j as jsxRuntimeExports, B as Button, a1 as Plus, X, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { A as AddObjectiveQuestion, e as AddTheoryQuestion } from './exams-CpQ4GBAC.js';
import './index-BHy36ITo.js';

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" }
];
const QUESTION_TYPES = [
  { value: "objective", label: "Objective" },
  { value: "theory", label: "Theory" }
];
function AddQuestionDialog({
  open,
  onOpenChange,
  courseId,
  onQuestionAdded
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [questionType, setQuestionType] = reactExports.useState("objective");
  const [questionText, setQuestionText] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState([
    { id: "A", text: "" },
    { id: "B", text: "" }
  ]);
  const [correctOption, setCorrectOption] = reactExports.useState("");
  const [marks, setMarks] = reactExports.useState("");
  const [maxMarks, setMaxMarks] = reactExports.useState("1");
  const [difficulty, setDifficulty] = reactExports.useState("medium");
  const [topic, setTopic] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (open) {
      setQuestionType("objective");
      setQuestionText("");
      setOptions([
        { id: "A", text: "" },
        { id: "B", text: "" }
      ]);
      setCorrectOption("");
      setMarks("");
      setMaxMarks("1");
      setDifficulty("medium");
      setTopic("");
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (questionType === "objective" && options.length > 0) {
      const optionIds = options.map((opt) => opt.id);
      if (!optionIds.includes(correctOption)) {
        setCorrectOption("");
      }
    }
  }, [options, questionType, correctOption]);
  const addOption = () => {
    const nextId = String.fromCharCode(65 + options.length);
    setOptions([...options, { id: nextId, text: "" }]);
  };
  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      const updatedOptions = newOptions.map((_, i) => ({
        id: String.fromCharCode(65 + i),
        text: newOptions[i].text
      }));
      setOptions(updatedOptions);
      if (correctOption === options[index].id) {
        setCorrectOption("");
      }
    } else {
      toast.error("At least 2 options are required");
    }
  };
  const updateOption = (index, text) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) {
      toast.error("Question text is required");
      return;
    }
    if (questionType === "objective") {
      if (options.length < 2) {
        toast.error("At least 2 options are required");
        return;
      }
      const emptyOptions = options.filter((opt) => !opt.text.trim());
      if (emptyOptions.length > 0) {
        toast.error("All options must have text");
        return;
      }
      if (!correctOption) {
        toast.error("Please select the correct option");
        return;
      }
      if (!marks || parseFloat(marks) <= 0) {
        toast.error("Please enter valid marks");
        return;
      }
      try {
        setLoading(true);
        await AddObjectiveQuestion({
          course_id: courseId,
          question_text: questionText,
          options: options.map((opt) => ({ id: opt.id, text: opt.text.trim() })),
          correct_option: correctOption,
          marks: parseFloat(marks)
        });
        toast.success("Objective question added successfully");
        onQuestionAdded();
        onOpenChange(false);
      } catch (error) {
        console.error("Error adding objective question:", error);
        toast.error(
          error?.response?.data?.message || "Failed to add objective question"
        );
      } finally {
        setLoading(false);
      }
    } else {
      if (!maxMarks || parseFloat(maxMarks) <= 0) {
        toast.error("Please enter valid max marks");
        return;
      }
      try {
        setLoading(true);
        await AddTheoryQuestion({
          course_id: courseId,
          question_text: questionText,
          max_marks: parseFloat(maxMarks),
          difficulty: difficulty || void 0,
          topic: topic.trim() || void 0
        });
        toast.success("Theory question added successfully");
        onQuestionAdded();
        onOpenChange(false);
      } catch (error) {
        console.error("Error adding theory question:", error);
        toast.error(
          error?.response?.data?.message || "Failed to add theory question"
        );
      } finally {
        setLoading(false);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Question" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogBody, { className: "space-y-4 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "questionType", children: [
            "Question Type ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: questionType,
              onValueChange: (value) => setQuestionType(value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "questionType", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select question type" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: QUESTION_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type.value, children: type.label }, type.value)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "questionText", children: [
            "Question Text ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "questionText",
              placeholder: "Enter your question here...",
              value: questionText,
              onChange: (e) => setQuestionText(e.target.value),
              rows: 4,
              required: true
            }
          )
        ] }),
        questionType === "objective" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Options ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: addOption,
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                    "Add Option"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-sm w-6 text-muted-foreground", children: [
                  option.id,
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: `Enter option ${option.id} text`,
                    value: option.text,
                    onChange: (e) => updateOption(index, e.target.value),
                    required: true,
                    className: "flex-1"
                  }
                )
              ] }),
              options.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  onClick: () => removeOption(index),
                  className: "h-9 w-9",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "correctOption", children: [
              "Correct Option ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: correctOption, onValueChange: setCorrectOption, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "correctOption", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select correct option" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.id, children: option.id }, option.id)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "marks", children: [
              "Marks ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "marks",
                type: "number",
                step: "0.01",
                min: "0.01",
                placeholder: "Enter marks",
                value: marks,
                onChange: (e) => setMarks(e.target.value),
                required: true
              }
            )
          ] })
        ] }),
        questionType === "theory" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "maxMarks", children: [
              "Max Marks ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "maxMarks",
                type: "number",
                step: "0.01",
                min: "0.01",
                placeholder: "Enter max marks",
                value: maxMarks,
                onChange: (e) => setMaxMarks(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "difficulty", children: "Difficulty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: difficulty, onValueChange: setDifficulty, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "difficulty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select difficulty" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DIFFICULTY_OPTIONS.map((diff) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: diff.value, children: diff.label }, diff.value)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "topic", children: "Topic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "topic",
                placeholder: "e.g., Biology",
                value: topic,
                onChange: (e) => setTopic(e.target.value)
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pb-6 pr-2d", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Adding..." : "Add Question" })
      ] })
    ] })
  ] }) });
}

export { AddQuestionDialog as default };
