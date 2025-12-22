import { r as reactExports, j as jsxRuntimeExports, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { a1 as createStaff } from './admin-BVl3HTxX.js';

function CreateStaffDialog({ open, onOpenChange, onStaffCreated }) {
  const [formData, setFormData] = reactExports.useState({
    fname: "",
    lname: "",
    email: "",
    title: "",
    phone: "",
    password: ""
  });
  const [isLoading, setIsLoading] = reactExports.useState(false);
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
  const handleOpenChange = (isOpen) => {
    onOpenChange(isOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const staffData = {
        email: formData.email,
        password: formData.password,
        fname: formData.fname,
        lname: formData.lname,
        title: formData.title,
        phone: formData.phone
      };
      const response = await createStaff(staffData);
      if (response.success) {
        toast.success(response.message);
        onOpenChange(false);
        setFormData({
          fname: "",
          lname: "",
          email: "",
          title: "",
          phone: "",
          password: ""
        });
        if (onStaffCreated) {
          onStaffCreated();
        }
      }
    } catch (error) {
      console.error("Error creating staff:", error);
      toast.error(error.response?.data?.message || "Failed to create staff member");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Staff Member" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new staff member to the system. An email will be sent with login credentials." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4 px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fname", children: "First Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fname",
                placeholder: "Jane",
                value: formData.fname,
                onChange: (e) => setFormData({ ...formData, fname: e.target.value }),
                required: true,
                disabled: isLoading
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lname", children: "Last Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lname",
                placeholder: "Smith",
                value: formData.lname,
                onChange: (e) => setFormData({ ...formData, lname: e.target.value }),
                required: true,
                disabled: isLoading
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "staff@example.com",
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              required: true,
              disabled: isLoading
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "title",
                placeholder: "Assistant Lecturer",
                value: formData.title,
                onChange: (e) => setFormData({ ...formData, title: e.target.value }),
                required: true,
                disabled: isLoading
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                placeholder: "+2348022222222",
                value: formData.phone,
                onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                required: true,
                disabled: isLoading
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "password",
              type: "password",
              placeholder: "••••••••",
              value: formData.password,
              onChange: (e) => setFormData({ ...formData, password: e.target.value }),
              required: true,
              disabled: isLoading
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Creating..." : "Create Staff" })
      ] })
    ] })
  ] }) });
}

export { CreateStaffDialog as default };
