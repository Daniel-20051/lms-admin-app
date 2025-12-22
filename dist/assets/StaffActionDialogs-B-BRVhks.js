import { j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';

function StaffActionDialogs({
  selectedStaff,
  actionLoading,
  showDeactivateDialog,
  showResetPasswordDialog,
  onDeactivateDialogChange,
  onResetPasswordDialogChange,
  onConfirmDeactivate,
  onConfirmResetPassword
}) {
  const staffName = selectedStaff?.full_name || "this staff member";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeactivateDialog, onOpenChange: onDeactivateDialogChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Deactivate Staff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to deactivate ",
          staffName,
          "? The staff member will not be able to login until reactivated."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: onConfirmDeactivate,
            disabled: actionLoading,
            className: "bg-orange-600 hover:bg-orange-700",
            children: actionLoading ? "Deactivating..." : "Deactivate"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: showResetPasswordDialog,
        onOpenChange: onResetPasswordDialogChange,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reset Staff Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to reset the password for ",
              staffName,
              "? A new password will be set and an email notification will be sent to the staff member."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: onConfirmResetPassword, disabled: actionLoading, children: actionLoading ? "Resetting..." : "Reset Password" })
          ] })
        ] })
      }
    )
  ] });
}

export { StaffActionDialogs as default };
