import { j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';

function StudentActionDialogs({
  selectedStudent,
  actionLoading,
  showDeactivateDialog,
  showActivateDialog,
  showResetPasswordDialog,
  onDeactivateDialogChange,
  onActivateDialogChange,
  onResetPasswordDialogChange,
  onConfirmDeactivate,
  onConfirmActivate,
  onConfirmResetPassword
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeactivateDialog, onOpenChange: onDeactivateDialogChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Deactivate Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to deactivate ",
          selectedStudent?.fname,
          " ",
          selectedStudent?.lname,
          "? The student will not be able to login until reactivated."
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showActivateDialog, onOpenChange: onActivateDialogChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Activate Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to activate ",
          selectedStudent?.fname,
          " ",
          selectedStudent?.lname,
          "? The student will be able to login again."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: onConfirmActivate,
            disabled: actionLoading,
            className: "bg-green-600 hover:bg-green-700",
            children: actionLoading ? "Activating..." : "Activate"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reset Student Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to reset the password for ",
              selectedStudent?.fname,
              " ",
              selectedStudent?.lname,
              "? A new temporary password will be generated and an email notification will be sent to the student."
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

export { StudentActionDialogs as default };
