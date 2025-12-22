import { r as reactExports, j as jsxRuntimeExports, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Switch } from './switch-aojsMll3.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { C as CreateExam } from './exams-CpQ4GBAC.js';
import { A as Api } from './index-DSZNHD2t.js';
import './index-BHy36ITo.js';
import './courses-DmFTm-zX.js';
import './quiz-DTu6yipn.js';
import './admin-BVl3HTxX.js';

const generateAcademicYears = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const years = [];
  for (let i = -5; i <= 2; i++) {
    const year = currentYear + i;
    years.push(`${year}/${year + 1}`);
  }
  return years.reverse();
};
const ACADEMIC_YEARS = generateAcademicYears();
const SEMESTERS = ["1ST", "2ND"];
const EXAM_TYPES = [
  { value: "objective-only", label: "Objective Only" },
  { value: "theory-only", label: "Theory Only" },
  { value: "mixed", label: "Mixed" }
];
const SELECTION_MODES = [
  { value: "manual", label: "Manual Selection" },
  { value: "random", label: "Random Selection" }
];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" }
];
function CreateExamDialog({
  open,
  onOpenChange,
  courseId,
  onExamCreated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingSession, setLoadingSession] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    duration_minutes: 60,
    instructions: "",
    academic_year: "",
    semester: "1ST",
    start_at: "",
    end_at: "",
    exam_type: "mixed",
    selection_mode: "manual",
    status: "draft",
    randomize: false,
    objective_count: 0,
    theory_count: 0
  });
  reactExports.useEffect(() => {
    if (open) {
      loadActiveSession();
    }
  }, [open]);
  const loadActiveSession = async () => {
    try {
      setLoadingSession(true);
      const api = new Api();
      const response = await api.Getsessions();
      const items = response?.data?.data ?? response?.data ?? [];
      if (Array.isArray(items) && items.length > 0) {
        const active = items.find((it) => it.status === "Active");
        if (active?.academic_year) {
          setFormData((prev) => ({
            ...prev,
            academic_year: active.academic_year,
            semester: active.semester || "1ST"
          }));
        } else {
          const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
          setFormData((prev) => ({
            ...prev,
            academic_year: `${currentYear}/${currentYear + 1}`
          }));
        }
      } else {
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        setFormData((prev) => ({
          ...prev,
          academic_year: `${currentYear}/${currentYear + 1}`
        }));
      }
    } catch (error) {
      console.error("Error loading active session:", error);
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      setFormData((prev) => ({
        ...prev,
        academic_year: `${currentYear}/${currentYear + 1}`
      }));
    } finally {
      setLoadingSession(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter an exam title");
      return;
    }
    if (!formData.academic_year) {
      toast.error("Please select an academic year");
      return;
    }
    if (!formData.semester) {
      toast.error("Please select a semester");
      return;
    }
    try {
      setLoading(true);
      const startAt = formData.start_at ? new Date(formData.start_at).toISOString() : void 0;
      const endAt = formData.end_at ? new Date(formData.end_at).toISOString() : void 0;
      const payload = {
        course_id: courseId,
        title: formData.title.trim(),
        duration_minutes: formData.duration_minutes,
        instructions: formData.instructions.trim() || void 0,
        academic_year: formData.academic_year,
        semester: formData.semester,
        start_at: startAt,
        end_at: endAt,
        exam_type: formData.exam_type,
        selection_mode: formData.selection_mode,
        status: formData.status,
        visibility: formData.status,
        // visibility should match status
        randomize: formData.randomize,
        objective_count: formData.exam_type === "mixed" || formData.exam_type === "objective-only" ? formData.objective_count : void 0,
        theory_count: formData.exam_type === "mixed" || formData.exam_type === "theory-only" ? formData.theory_count : void 0
      };
      const response = await CreateExam(payload);
      const data = response?.data;
      if (data?.status || data?.success || response?.status === 201) {
        toast.success("Exam created successfully");
        onExamCreated();
        handleClose();
      } else {
        toast.error(data?.message || "Failed to create exam");
      }
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create exam"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: "",
        duration_minutes: 60,
        instructions: "",
        academic_year: "",
        semester: "1ST",
        start_at: "",
        end_at: "",
        exam_type: "mixed",
        selection_mode: "manual",
        status: "draft",
        randomize: false,
        objective_count: 0,
        theory_count: 0
      });
      onOpenChange(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Exam" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { className: "pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
              "Title ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "title",
                placeholder: "Enter exam title",
                value: formData.title,
                onChange: (e) => setFormData({ ...formData, title: e.target.value }),
                disabled: loading,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "duration", children: [
              "Duration (minutes) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "duration",
                type: "number",
                min: "1",
                value: formData.duration_minutes,
                onChange: (e) => setFormData({
                  ...formData,
                  duration_minutes: parseInt(e.target.value) || 60
                }),
                disabled: loading,
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "instructions", children: "Instructions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "instructions",
              placeholder: "Enter exam instructions for students",
              value: formData.instructions,
              onChange: (e) => setFormData({ ...formData, instructions: e.target.value }),
              disabled: loading,
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "academic_year", children: [
              "Academic Year ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.academic_year,
                onValueChange: (value) => setFormData({ ...formData, academic_year: value }),
                disabled: loading || loadingSession,
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select academic year" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ACADEMIC_YEARS.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "semester", children: [
              "Semester ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.semester,
                onValueChange: (value) => setFormData({ ...formData, semester: value }),
                disabled: loading,
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select semester" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SEMESTERS.map((sem) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: sem, children: sem }, sem)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start_at", children: "Start Date & Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "start_at",
                type: "datetime-local",
                value: formData.start_at,
                onChange: (e) => setFormData({ ...formData, start_at: e.target.value }),
                disabled: loading
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "end_at", children: "End Date & Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "end_at",
                type: "datetime-local",
                value: formData.end_at,
                onChange: (e) => setFormData({ ...formData, end_at: e.target.value }),
                disabled: loading
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "exam_type", children: "Exam Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.exam_type,
                onValueChange: (value) => setFormData({ ...formData, exam_type: value }),
                disabled: loading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select exam type" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EXAM_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type.value, children: type.label }, type.value)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "selection_mode", children: "Selection Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.selection_mode,
                onValueChange: (value) => setFormData({ ...formData, selection_mode: value }),
                disabled: loading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select mode" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SELECTION_MODES.map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: mode.value, children: mode.label }, mode.value)) })
                ]
              }
            )
          ] })
        ] }),
        (formData.exam_type === "mixed" || formData.exam_type === "objective-only") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "objective_count", children: "Objective Questions Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "objective_count",
              type: "number",
              min: "0",
              value: formData.objective_count,
              onChange: (e) => setFormData({
                ...formData,
                objective_count: parseInt(e.target.value) || 0
              }),
              disabled: loading
            }
          )
        ] }),
        (formData.exam_type === "mixed" || formData.exam_type === "theory-only") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "theory_count", children: "Theory Questions Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "theory_count",
              type: "number",
              min: "0",
              value: formData.theory_count,
              onChange: (e) => setFormData({
                ...formData,
                theory_count: parseInt(e.target.value) || 0
              }),
              disabled: loading
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select status" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status.value, children: status.label }, status.value)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "randomize", className: "flex-1", children: "Randomize Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "randomize",
              checked: formData.randomize,
              onCheckedChange: (checked) => setFormData({ ...formData, randomize: checked }),
              disabled: loading
            }
          )
        ] })
      ] }) }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Create Exam" })
      ] })
    ] })
  ] }) });
}

export { CreateExamDialog as default };
