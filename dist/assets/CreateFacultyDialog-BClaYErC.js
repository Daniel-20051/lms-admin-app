import { r as reactExports, j as jsxRuntimeExports, B as Button, c as LoaderCircle, a1 as Plus, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { a6 as createFaculty } from './admin-BVl3HTxX.js';

function CreateFacultyDialog({
  open,
  onOpenChange,
  onFacultyCreated
}) {
  const [creating, setCreating] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    description: ""
  });
  reactExports.useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        description: ""
      });
    }
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a faculty name");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a faculty description");
      return;
    }
    try {
      setCreating(true);
      const response = await createFaculty(formData);
      if (response.success) {
        toast.success(response.message || "Faculty created successfully");
        setFormData({
          name: "",
          description: ""
        });
        onFacultyCreated?.();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error creating faculty:", error);
      toast.error(error.response?.data?.message || "Failed to create faculty");
    } finally {
      setCreating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Faculty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new faculty to the system. Fill in the details below." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Faculty Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "e.g., Faculty of Engineering",
              required: true,
              disabled: creating
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "e.g., Engineering programs and courses",
              rows: 4,
              required: true,
              disabled: creating
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: creating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: creating, children: creating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Creating..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Create Faculty"
        ] }) })
      ] })
    ] }) })
  ] }) });
}

export { CreateFacultyDialog as default };
