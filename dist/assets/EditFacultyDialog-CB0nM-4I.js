import { r as reactExports, j as jsxRuntimeExports, B as Button, c as LoaderCircle, q as Save, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { a5 as updateFaculty } from './admin-BVl3HTxX.js';

function EditFacultyDialog({
  open,
  onOpenChange,
  faculty,
  onFacultyUpdated
}) {
  const [saving, setSaving] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    description: ""
  });
  reactExports.useEffect(() => {
    if (open && faculty) {
      setFormData({
        name: faculty.name || "",
        description: faculty.description || ""
      });
    }
  }, [open, faculty]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!faculty) return;
    try {
      setSaving(true);
      const response = await updateFaculty(faculty.id, formData);
      if (response.success) {
        toast.success(response.message || "Faculty updated successfully");
        onFacultyUpdated?.();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error updating faculty:", error);
      toast.error(error.response?.data?.message || "Failed to update faculty");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Faculty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the faculty information below" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Faculty Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "Enter faculty name",
              required: true,
              disabled: saving
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "Enter faculty description",
              rows: 4,
              disabled: saving
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
            onClick: () => onOpenChange(false),
            disabled: saving,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Saving..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
          "Save Changes"
        ] }) })
      ] })
    ] })
  ] }) });
}

export { EditFacultyDialog as default };
