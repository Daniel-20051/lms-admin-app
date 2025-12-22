import { r as reactExports, j as jsxRuntimeExports, B as Button, c as LoaderCircle, a1 as Plus, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { a9 as createNotice } from './admin-BVl3HTxX.js';

function CreateNoticeDialog({
  open,
  onOpenChange,
  onNoticeCreated
}) {
  const [creating, setCreating] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    note: "",
    course_id: null,
    expires_at: null,
    expires_at_local: ""
  });
  const datetimeLocalToIso = (localString) => {
    if (!localString) return null;
    try {
      const date = new Date(localString);
      return date.toISOString();
    } catch {
      return null;
    }
  };
  reactExports.useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        note: "",
        course_id: null,
        expires_at: null,
        expires_at_local: ""
      });
    }
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a notice title");
      return;
    }
    if (!formData.note.trim()) {
      toast.error("Please enter notice content");
      return;
    }
    try {
      setCreating(true);
      const createData = {
        title: formData.title,
        note: formData.note,
        course_id: formData.course_id,
        expires_at: datetimeLocalToIso(formData.expires_at_local || "")
      };
      const response = await createNotice(createData);
      if (response.success) {
        toast.success(response.message || "Notice created successfully");
        setFormData({
          title: "",
          note: "",
          course_id: null,
          expires_at: null,
          expires_at_local: ""
        });
        onNoticeCreated?.();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error creating notice:", error);
      toast.error(error.response?.data?.message || "Failed to create notice");
    } finally {
      setCreating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Notice" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: 'Add a new notice to the system. Leave course selection as "System-Wide" for all users.' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Notice Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              value: formData.title,
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              placeholder: "e.g., Important Announcement",
              required: true,
              disabled: creating
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "note", children: "Notice Content *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "note",
              value: formData.note,
              onChange: (e) => setFormData({ ...formData, note: e.target.value }),
              placeholder: "Enter the notice content...",
              rows: 6,
              required: true,
              disabled: creating
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This notice will be visible to all users (system-wide notice)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "expires_at", children: "Expires At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "expires_at",
              type: "datetime-local",
              value: formData.expires_at_local || "",
              onChange: (e) => setFormData({ ...formData, expires_at_local: e.target.value }),
              disabled: creating
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Leave empty for permanent notice" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
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
          "Create Notice"
        ] }) })
      ] })
    ] }) })
  ] }) });
}

export { CreateNoticeDialog as default };
