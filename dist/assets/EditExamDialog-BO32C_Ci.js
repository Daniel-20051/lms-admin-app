import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Switch } from './switch-aojsMll3.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { b as GetExamById, U as UpdateExam } from './exams-CpQ4GBAC.js';
import './index-BHy36ITo.js';

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
function EditExamDialog({
  open,
  onOpenChange,
  examId,
  onExamUpdated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingExam, setLoadingExam] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    duration_minutes: 60,
    instructions: "",
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
    if (open && examId) {
      loadExamData();
    } else if (!open) {
      setFormData({
        title: "",
        duration_minutes: 60,
        instructions: "",
        start_at: "",
        end_at: "",
        exam_type: "mixed",
        selection_mode: "manual",
        status: "draft",
        randomize: false,
        objective_count: 0,
        theory_count: 0
      });
    }
  }, [open, examId]);
  const loadExamData = async () => {
    if (!examId) return;
    try {
      setLoadingExam(true);
      const response = await GetExamById(examId);
      const data = response?.data;
      if (data?.status || data?.success || response?.status === 200) {
        const exam = data?.data?.exam || data?.data || data;
        console.log("Exam data loaded:", {
          visibility: exam.visibility,
          status: exam.status,
          responseData: data,
          exam
        });
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          try {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          } catch {
            return "";
          }
        };
        let examStatus = "draft";
        if (exam.visibility !== void 0 && exam.visibility !== null && exam.visibility !== "") {
          examStatus = exam.visibility;
        } else if (exam.status !== void 0 && exam.status !== null && exam.status !== "") {
          examStatus = exam.status;
        }
        if (examStatus !== "draft" && examStatus !== "published") {
          examStatus = "draft";
        }
        setFormData({
          title: exam.title || "",
          duration_minutes: exam.duration_minutes || 60,
          instructions: exam.instructions || "",
          start_at: formatDateForInput(exam.start_at),
          end_at: formatDateForInput(exam.end_at),
          exam_type: exam.exam_type || "mixed",
          selection_mode: exam.selection_mode || "manual",
          status: examStatus,
          randomize: exam.randomize || false,
          objective_count: exam.objective_count || 0,
          theory_count: exam.theory_count || 0
        });
      } else {
        toast.error(data?.message || "Failed to load exam details");
      }
    } catch (error) {
      console.error("Error loading exam:", error);
      toast.error("Failed to load exam details");
    } finally {
      setLoadingExam(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!examId) return;
    if (!formData.title.trim()) {
      toast.error("Please enter an exam title");
      return;
    }
    try {
      setLoading(true);
      const startAt = formData.start_at ? new Date(formData.start_at).toISOString() : null;
      const endAt = formData.end_at ? new Date(formData.end_at).toISOString() : null;
      const payload = {
        title: formData.title.trim(),
        duration_minutes: formData.duration_minutes,
        instructions: formData.instructions.trim() || void 0,
        start_at: startAt,
        end_at: endAt,
        exam_type: formData.exam_type,
        selection_mode: formData.selection_mode,
        visibility: formData.status,
        randomize: formData.randomize
      };
      if (formData.exam_type === "mixed" || formData.exam_type === "objective-only") {
        payload.objective_count = formData.objective_count;
      }
      if (formData.exam_type === "mixed" || formData.exam_type === "theory-only") {
        payload.theory_count = formData.theory_count;
      }
      const response = await UpdateExam(examId, payload);
      const data = response?.data;
      if (data?.status || data?.success || response?.status === 200) {
        toast.success("Exam updated successfully");
        onExamUpdated();
        handleClose();
      } else {
        toast.error(data?.message || "Failed to update exam");
      }
    } catch (error) {
      console.error("Error updating exam:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update exam"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (!loading && !loadingExam) {
      onOpenChange(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Exam" }) }),
    loadingExam ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { className: "px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-24 bg-muted animate-pulse rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-full bg-muted animate-pulse rounded" })
    ] }, i)) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { className: "px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
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
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
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
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Updating..." : "Update Exam" })
      ] })
    ] })
  ] }) });
}

export { EditExamDialog as default };
