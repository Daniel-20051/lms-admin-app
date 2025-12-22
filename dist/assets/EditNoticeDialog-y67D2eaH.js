import { r as reactExports, j as jsxRuntimeExports, B as Button, c as LoaderCircle, q as Save, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { a8 as updateNotice } from './admin-BVl3HTxX.js';

function EditNoticeDialog({
  open,
  onOpenChange,
  notice,
  onNoticeUpdated
}) {
  const [saving, setSaving] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    note: "",
    course_id: null,
    expires_at: null,
    expires_at_local: ""
  });
  const isoToDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
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
    if (open && notice) {
      setFormData({
        title: notice.title || "",
        note: notice.note || "",
        course_id: notice.course_id,
        expires_at: notice.expires_at,
        expires_at_local: isoToDatetimeLocal(notice.expires_at)
      });
    }
  }, [open, notice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notice) return;
    if (!formData.title?.trim()) {
      toast.error("Please enter a notice title");
      return;
    }
    if (!formData.note?.trim()) {
      toast.error("Please enter notice content");
      return;
    }
    try {
      setSaving(true);
      const updateData = {
        title: formData.title,
        note: formData.note,
        course_id: formData.course_id,
        expires_at: datetimeLocalToIso(formData.expires_at_local || "")
      };
      const response = await updateNotice(notice.id, updateData);
      if (response.success) {
        toast.success(response.message || "Notice updated successfully");
        onNoticeUpdated?.();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error updating notice:", error);
      toast.error(error.response?.data?.message || "Failed to update notice");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Notice" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the notice information below" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Notice Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              value: formData.title,
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              placeholder: "Enter notice title",
              required: true,
              disabled: saving
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
              disabled: saving
            }
          )
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
              disabled: saving
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

export { EditNoticeDialog as default };
