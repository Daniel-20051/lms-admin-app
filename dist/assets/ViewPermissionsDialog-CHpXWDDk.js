import { r as reactExports, j as jsxRuntimeExports, Z as Check, X } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';

function ViewPermissionsDialog({
  open,
  onOpenChange,
  admin
}) {
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
  if (!admin) return null;
  const permissions = admin.permissions || {
    staff: {},
    admins: {},
    system: {},
    content: {},
    courses: {},
    students: {}
  };
  const PermissionItem = ({
    label,
    value
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label }),
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", className: "bg-green-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 mr-1" }),
      "Allowed"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 mr-1" }),
      "Denied"
    ] })
  ] });
  const PermissionSection = ({
    title,
    permissions: permissions2
  }) => {
    if (!permissions2 || typeof permissions2 !== "object") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-base", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No permissions data available" }) })
      ] });
    }
    const entries = Object.entries(permissions2);
    if (entries.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-base", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No permissions configured" }) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-base", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: entries.map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionItem,
        {
          label: key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
          value
        },
        key
      )) })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Permissions & Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "View permissions and access levels for ",
        admin.fname,
        " ",
        admin.lname
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionSection,
        {
          title: "Staff Management",
          permissions: permissions.staff || {}
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionSection,
        {
          title: "Admin Management",
          permissions: permissions.admins || {}
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionSection,
        {
          title: "System Access",
          permissions: permissions.system || {}
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionSection,
        {
          title: "Content Management",
          permissions: permissions.content || {}
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionSection,
        {
          title: "Course Management",
          permissions: permissions.courses || {}
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionSection,
        {
          title: "Student Management",
          permissions: permissions.students || {}
        }
      )
    ] }) }) })
  ] }) });
}

export { ViewPermissionsDialog as default };
