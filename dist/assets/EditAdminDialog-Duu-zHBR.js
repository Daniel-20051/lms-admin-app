import { r as reactExports, j as jsxRuntimeExports, B as Button, c as LoaderCircle, q as Save, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { a3 as updateAdmin } from './admin-BVl3HTxX.js';

function EditAdminDialog({
  open,
  onOpenChange,
  admin,
  onAdminUpdated
}) {
  const [saving, setSaving] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    fname: "",
    lname: "",
    phone: ""
  });
  reactExports.useEffect(() => {
    if (open && admin) {
      setFormData({
        fname: admin.fname || "",
        lname: admin.lname || "",
        phone: admin.phone || ""
      });
    }
  }, [open, admin]);
  reactExports.useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        if (document.body.style.pointerEvents === "none") {
          document.body.style.pointerEvents = "";
        }
        if (document.body.style.overflow === "hidden") {
          document.body.style.overflow = "";
        }
        const overlays = document.querySelectorAll("[data-radix-dialog-overlay]");
        overlays.forEach((overlay) => {
          if (overlay instanceof HTMLElement) {
            overlay.style.pointerEvents = "";
          }
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin) return;
    try {
      setSaving(true);
      const response = await updateAdmin(admin.id, formData);
      if (response.success) {
        toast.success(response.message || "Admin updated successfully");
        onAdminUpdated?.();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error(error.response?.data?.message || "Failed to update admin");
    } finally {
      setSaving(false);
    }
  };
  if (!admin) return null;
  const handleOpenChange = (isOpen) => {
    onOpenChange(isOpen);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl",
      onInteractOutside: (e) => {
        if (saving) {
          e.preventDefault();
        }
      },
      onEscapeKeyDown: (e) => {
        if (saving) {
          e.preventDefault();
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update admin information. Email and role cannot be changed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fname", children: "First Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fname",
                    name: "fname",
                    value: formData.fname,
                    onChange: handleInputChange,
                    placeholder: "Enter first name",
                    required: true,
                    disabled: saving
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lname", children: "Last Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "lname",
                    name: "lname",
                    value: formData.lname,
                    onChange: handleInputChange,
                    placeholder: "Enter last name",
                    required: true,
                    disabled: saving
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  value: admin.email,
                  disabled: true,
                  className: "bg-muted"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email cannot be changed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "role", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "role",
                  value: admin.role,
                  disabled: true,
                  className: "bg-muted"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Role cannot be changed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  name: "phone",
                  value: formData.phone,
                  onChange: handleInputChange,
                  placeholder: "+2348033333333",
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
      ]
    }
  ) });
}

export { EditAdminDialog as default };
