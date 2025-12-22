import { r as reactExports, j as jsxRuntimeExports, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { c as createProgram } from './programs-a0V4l-AP.js';
import './index-BHy36ITo.js';

const FACULTIES = [
  { id: 2, name: "Economics & Management" },
  { id: 6, name: "Environmental Science" },
  { id: 8, name: "Science & Technology" },
  { id: 10, name: "Law & Political Science" },
  { id: 12, name: "Communications" },
  { id: 14, name: "College of Education" }
];
function CreateProgramDialog({
  open,
  onOpenChange,
  onProgramCreated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    description: "",
    faculty_id: 0,
    status: "Y"
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (open) {
      setFormData({
        title: "",
        description: "",
        faculty_id: 0,
        status: "Y"
      });
      setErrors({});
    }
  }, [open]);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
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
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await createProgram(formData);
      toast.success("Program created successfully");
      onProgramCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating program:", error);
      toast.error(error?.response?.data?.message || "Failed to create program");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Program" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new academic program to the system" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
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
              value: formData.title,
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
              value: formData.description,
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
              value: formData.faculty_id.toString(),
              onValueChange: (value) => setFormData({ ...formData, faculty_id: parseInt(value) }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.faculty_id ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a faculty" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FACULTIES.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: faculty.id.toString(), children: faculty.name }, faculty.id)) })
              ]
            }
          ),
          errors.faculty_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.faculty_id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: formData.status,
              onValueChange: (value) => setFormData({ ...formData, status: value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Y", children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "N", children: "Inactive" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Set to Active to make this program available immediately" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Create Program" })
      ] })
    ] })
  ] }) });
}

export { CreateProgramDialog as default };
