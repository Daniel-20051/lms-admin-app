import { aO as cva, j as jsxRuntimeExports, as as cn, r as reactExports, g as CircleAlert, aK as Info, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { C as Checkbox } from './checkbox-CgkZGnpM.js';
import { a2 as createAdmin } from './admin-BVl3HTxX.js';
import './index-BHy36ITo.js';

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}

const defaultPermissions = {
  students: {
    view: false,
    create: false,
    edit: false,
    delete: false
  },
  staff: {
    view: false,
    create: false,
    edit: false,
    delete: false
  },
  courses: {
    view: false,
    create: false,
    edit: false,
    delete: false
  }
};
function CreateAdminDialog({ open, onOpenChange, onAdminCreated }) {
  const [formData, setFormData] = reactExports.useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    role: "wpu_admin",
    phone: "",
    permissions: { ...defaultPermissions }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createAdmin(formData);
      if (response.success) {
        toast.success(response.message || "Admin created successfully! Welcome email sent.");
        onOpenChange(false);
        setFormData({
          email: "",
          password: "",
          fname: "",
          lname: "",
          role: "wpu_admin",
          phone: "",
          permissions: { ...defaultPermissions }
        });
        onAdminCreated?.();
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      toast.error(error.response?.data?.message || "Failed to create admin");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-[600px] max-h-[90vh] overflow-y-auto",
      onInteractOutside: (e) => {
        if (isLoading) {
          e.preventDefault();
        }
      },
      onEscapeKeyDown: (e) => {
        if (isLoading) {
          e.preventDefault();
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new admin to the system. An email will be sent with login credentials." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Admins have full access to the system. Create admin accounts carefully." })
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
                    placeholder: "John",
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
                    placeholder: "Doe",
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
                  placeholder: "newadmin@pinnacleuniversity.co",
                  value: formData.email,
                  onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                  required: true,
                  disabled: isLoading
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "role", children: "Role *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.role,
                  onValueChange: (value) => setFormData({ ...formData, role: value }),
                  disabled: isLoading,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select role" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "super_admin", children: "Super Admin - Full control" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "wpu_admin", children: "WPU Admin - Content management only" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs text-muted-foreground mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3 w-3 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Super Admin:" }),
                    " Full system access and control"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "WPU Admin:" }),
                    " Content management and limited access"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  placeholder: "+2348033333333",
                  value: formData.phone || "",
                  onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                  disabled: isLoading
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Temporary Password *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  placeholder: "TempPassword123",
                  value: formData.password,
                  onChange: (e) => setFormData({ ...formData, password: e.target.value }),
                  required: true,
                  disabled: isLoading
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A welcome email with login credentials will be sent to the admin." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-4 border-t", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-semibold", children: "Permissions Matrix" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Select granular permissions for this admin. Email will be sent automatically upon creation." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Students" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pl-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "students-view",
                          checked: formData.permissions.students.view,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              students: {
                                ...formData.permissions.students,
                                view: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "students-view", className: "text-sm font-normal cursor-pointer", children: "View" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "students-create",
                          checked: formData.permissions.students.create,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              students: {
                                ...formData.permissions.students,
                                create: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "students-create", className: "text-sm font-normal cursor-pointer", children: "Create" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "students-edit",
                          checked: formData.permissions.students.edit,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              students: {
                                ...formData.permissions.students,
                                edit: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "students-edit", className: "text-sm font-normal cursor-pointer", children: "Edit" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "students-delete",
                          checked: formData.permissions.students.delete,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              students: {
                                ...formData.permissions.students,
                                delete: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "students-delete", className: "text-sm font-normal cursor-pointer", children: "Delete" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Staff" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pl-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "staff-view",
                          checked: formData.permissions.staff.view,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              staff: {
                                ...formData.permissions.staff,
                                view: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "staff-view", className: "text-sm font-normal cursor-pointer", children: "View" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "staff-create",
                          checked: formData.permissions.staff.create,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              staff: {
                                ...formData.permissions.staff,
                                create: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "staff-create", className: "text-sm font-normal cursor-pointer", children: "Create" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "staff-edit",
                          checked: formData.permissions.staff.edit,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              staff: {
                                ...formData.permissions.staff,
                                edit: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "staff-edit", className: "text-sm font-normal cursor-pointer", children: "Edit" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "staff-delete",
                          checked: formData.permissions.staff.delete,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              staff: {
                                ...formData.permissions.staff,
                                delete: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "staff-delete", className: "text-sm font-normal cursor-pointer", children: "Delete" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Courses" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pl-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "courses-view",
                          checked: formData.permissions.courses.view,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              courses: {
                                ...formData.permissions.courses,
                                view: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "courses-view", className: "text-sm font-normal cursor-pointer", children: "View" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "courses-create",
                          checked: formData.permissions.courses.create,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              courses: {
                                ...formData.permissions.courses,
                                create: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "courses-create", className: "text-sm font-normal cursor-pointer", children: "Create" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "courses-edit",
                          checked: formData.permissions.courses.edit,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              courses: {
                                ...formData.permissions.courses,
                                edit: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "courses-edit", className: "text-sm font-normal cursor-pointer", children: "Edit" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "courses-delete",
                          checked: formData.permissions.courses.delete,
                          onCheckedChange: (checked) => setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              courses: {
                                ...formData.permissions.courses,
                                delete: checked === true
                              }
                            }
                          }),
                          disabled: isLoading
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "courses-delete", className: "text-sm font-normal cursor-pointer", children: "Delete" })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => onOpenChange(false),
                disabled: isLoading,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Creating..." : "Create Admin" })
          ] })
        ] })
      ]
    }
  ) });
}

export { CreateAdminDialog as default };
