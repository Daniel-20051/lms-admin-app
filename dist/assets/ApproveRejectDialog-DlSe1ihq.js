import { r as reactExports, j as jsxRuntimeExports, B as Button, Z as Check, X } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { L as Label } from './label-UX76_odr.js';

function ApproveRejectDialog({
  open,
  onOpenChange,
  actionType,
  document,
  loading,
  onConfirm
}) {
  const [rejectionReason, setRejectionReason] = reactExports.useState("");
  const handleConfirm = () => {
    if (actionType === "reject" && !rejectionReason.trim()) {
      return;
    }
    onConfirm(actionType === "reject" ? rejectionReason : void 0);
    if (actionType === "approve") {
      setRejectionReason("");
    }
  };
  const handleClose = () => {
    setRejectionReason("");
    onOpenChange(false);
  };
  const getDocumentTypeLabel = (type) => {
    return type.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: actionType === "approve" ? "Approve Document" : "Reject Document" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: actionType === "approve" ? "Are you sure you want to approve this document? The student will be able to see the approved status." : "Please provide a reason for rejecting this document. The student will see this reason." })
    ] }),
    document && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: document.student_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: document.student_email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Document Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: getDocumentTypeLabel(document.document_type) })
      ] }),
      actionType === "reject" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rejection-reason", children: [
          "Rejection Reason ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "rejection-reason",
            placeholder: "Enter the reason for rejecting this document. The student will see this message.",
            value: rejectionReason,
            onChange: (e) => setRejectionReason(e.target.value),
            rows: 4,
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This reason will be visible to the student." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: handleClose, disabled: loading, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: actionType === "approve" ? "default" : "destructive",
          onClick: handleConfirm,
          disabled: loading || actionType === "reject" && !rejectionReason.trim(),
          className: actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "",
          children: loading ? "Processing..." : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: actionType === "approve" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-2" }),
            "Approve"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
            "Reject"
          ] }) })
        }
      )
    ] })
  ] }) });
}

export { ApproveRejectDialog as default };
