import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { a as getProgram, u as updateProgram } from './programs-a0V4l-AP.js';
import './index-BHy36ITo.js';

const FACULTIES = [
  { id: 2, name: "Economics & Management" },
  { id: 6, name: "Environmental Science" },
  { id: 8, name: "Science & Technology" },
  { id: 10, name: "Law & Political Science" },
  { id: 12, name: "Communications" },
  { id: 14, name: "College of Education" }
];
function EditProgramDialog({
  open,
  onOpenChange,
  programId,
  onProgramUpdated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [fetching, setFetching] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    description: "",
    faculty_id: 0
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (open && programId) {
      setFetching(true);
      getProgram(programId).then((response) => {
        const program = response.data.program;
        setFormData({
          title: program.title,
          description: program.description,
          faculty_id: program.faculty_id
        });
      }).catch((error) => {
        console.error("Error fetching program:", error);
        toast.error(error?.response?.data?.message || "Failed to fetch program details");
        onOpenChange(false);
      }).finally(() => {
        setFetching(false);
      });
    }
  }, [open, programId, onOpenChange]);
  reactExports.useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        description: "",
        faculty_id: 0
      });
      setErrors({});
    }
  }, [open]);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.faculty_id || formData.faculty_id === 0) {
      newErrors.faculty_id = "Please select a faculty";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!programId || !validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await updateProgram(programId, formData);
      toast.success("Program updated successfully");
      onProgramUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating program:", error);
      toast.error(error?.response?.data?.message || "Failed to update program");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Program" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update program information" })
    ] }),
    fetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading program details..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
            "Program Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              placeholder: "e.g., BSc Computer Science",
              value: formData.title || "",
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              className: errors.title ? "border-destructive" : ""
            }
          ),
          errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", children: [
            "Description ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              placeholder: "Enter program description...",
              value: formData.description || "",
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              className: errors.description ? "border-destructive" : "",
              rows: 4
            }
          ),
          errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "faculty", children: [
            "Faculty ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: formData.faculty_id?.toString() || "",
              onValueChange: (value) => setFormData({ ...formData, faculty_id: parseInt(value) }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.faculty_id ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a faculty" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FACULTIES.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: faculty.id.toString(), children: faculty.name }, faculty.id)) })
              ]
            }
          ),
          errors.faculty_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.faculty_id })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Updating..." : "Update Program" })
      ] })
    ] })
  ] }) });
}

export { EditProgramDialog as default };
