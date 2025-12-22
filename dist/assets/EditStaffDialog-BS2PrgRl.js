import { r as reactExports, j as jsxRuntimeExports, B as Button, c as LoaderCircle, q as Save, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { a0 as updateStaff } from './admin-BVl3HTxX.js';

function EditStaffDialog({
  open,
  onOpenChange,
  staff,
  onStaffUpdated
}) {
  const [saving, setSaving] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    fname: "",
    lname: "",
    title: "",
    phone: ""
  });
  reactExports.useEffect(() => {
    if (open && staff) {
      const nameParts = staff.full_name.split(" ");
      const fname = nameParts[0] || "";
      const lname = nameParts.slice(1).join(" ") || "";
      setFormData({
        fname,
        lname,
        title: "",
        // Title might not be in the Staff interface, will need to be added
        phone: staff.phone || ""
      });
    }
  }, [open, staff]);
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
    if (!staff) return;
    try {
      setSaving(true);
      const response = await updateStaff(staff.id, formData);
      if (response.success) {
        toast.success(response.message);
        onStaffUpdated({ ...formData, id: staff.id });
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error(error.response?.data?.message || "Failed to update staff");
    } finally {
      setSaving(false);
    }
  };
  if (!staff) return null;
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Staff" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update staff information. Email cannot be changed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
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
                  value: staff.email,
                  disabled: true,
                  className: "bg-muted"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email cannot be changed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "title",
                    name: "title",
                    value: formData.title,
                    onChange: handleInputChange,
                    placeholder: "e.g., Assistant Lecturer",
                    disabled: saving
                  }
                )
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
                    placeholder: "+234801234567",
                    disabled: saving
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 py-4", children: [
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
        ] }) })
      ]
    }
  ) });
}

export { EditStaffDialog as default };
