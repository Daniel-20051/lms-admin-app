import { r as reactExports, j as jsxRuntimeExports, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { A as Api } from './index-DSZNHD2t.js';
import './courses-DmFTm-zX.js';
import './quiz-DTu6yipn.js';
import './exams-CpQ4GBAC.js';
import './admin-BVl3HTxX.js';

function AddModuleDialog({
  open,
  onOpenChange,
  courseId,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    description: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a module title");
      return;
    }
    try {
      setLoading(true);
      const api = new Api();
      const response = await api.AddModule(
        courseId,
        formData.title,
        formData.description
      );
      const data = response.data;
      if (data?.status || data?.success || response.status === 201 || response.status === 200) {
        toast.success("Module created successfully");
        setFormData({ title: "", description: "" });
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(data?.message || "Failed to create module");
      }
    } catch (error) {
      console.error("Error creating module:", error);
      toast.error(error.response?.data?.message || "Failed to create module");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (!loading) {
      setFormData({ title: "", description: "" });
      onOpenChange(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "sm:max-w-[500px] p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Module" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new module to organize your course content" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Module Title *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "title",
            placeholder: "e.g., Introduction to Programming",
            value: formData.title,
            onChange: (e) => setFormData({ ...formData, title: e.target.value }),
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
            placeholder: "Brief description of what this module covers...",
            value: formData.description,
            onChange: (e) => setFormData({ ...formData, description: e.target.value }),
            disabled: loading,
            rows: 4
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Create Module" })
    ] })
  ] }) }) });
}

export { AddModuleDialog as default };
