import { r as reactExports, j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';

function AdminActionDialogs({
  selectedAdmin,
  actionLoading,
  showDeactivateDialog,
  onDeactivateDialogChange,
  onConfirmDeactivate,
  currentAdminId
}) {
  const adminName = selectedAdmin ? `${selectedAdmin.fname} ${selectedAdmin.lname}` : "this admin";
  const isCurrentAdmin = selectedAdmin?.id === currentAdminId;
  const isSuperAdmin = selectedAdmin?.role === "super_admin";
  reactExports.useEffect(() => {
    if (!showDeactivateDialog) {
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
  }, [showDeactivateDialog]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AlertDialog,
    {
      open: showDeactivateDialog,
      onOpenChange: onDeactivateDialogChange,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Deactivate Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: isCurrentAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium", children: "You cannot deactivate your own account." }) : isSuperAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-600 font-medium", children: "Warning: You cannot deactivate other Super Admins. Only WPU Admins can be deactivated." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Are you sure you want to deactivate ",
            adminName,
            "? The admin will not be able to login until reactivated."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
          !isCurrentAdmin && !isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              onClick: onConfirmDeactivate,
              disabled: actionLoading,
              className: "bg-orange-600 hover:bg-orange-700",
              children: actionLoading ? "Deactivating..." : "Deactivate"
            }
          )
        ] })
      ] })
    }
  ) });
}

export { AdminActionDialogs as default };
