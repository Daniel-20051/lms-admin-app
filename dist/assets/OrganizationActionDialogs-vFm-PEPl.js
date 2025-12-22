import { r as reactExports, j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';

function OrganizationActionDialogs({
  selectedOrganization,
  actionLoading,
  showApproveDialog,
  showRejectDialog,
  showStatusDialog,
  onApproveDialogChange,
  onRejectDialogChange,
  onStatusDialogChange,
  onConfirmApprove,
  onConfirmReject,
  onConfirmStatusUpdate
}) {
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [selectedStatus, setSelectedStatus] = reactExports.useState("active");
  const handleRejectConfirm = () => {
    if (rejectReason.trim()) {
      onConfirmReject(rejectReason);
      setRejectReason("");
    }
  };
  const handleStatusConfirm = () => {
    onConfirmStatusUpdate(selectedStatus);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showApproveDialog, onOpenChange: onApproveDialogChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Approve Organization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to approve this organization? An email notification will be sent automatically.",
          selectedOrganization && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-2 bg-muted rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
            "Organization ID: ",
            selectedOrganization.id
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: onConfirmApprove,
            disabled: actionLoading,
            className: "bg-green-600 hover:bg-green-700",
            children: actionLoading ? "Approving..." : "Approve"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showRejectDialog, onOpenChange: (open) => {
      onRejectDialogChange(open);
      if (!open) setRejectReason("");
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reject Organization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Please provide a reason for rejecting this organization. An email notification will be sent automatically.",
          selectedOrganization && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-2 bg-muted rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
            "Organization ID: ",
            selectedOrganization.id
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reject-reason", children: "Rejection Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "reject-reason",
            placeholder: "e.g., Invalid registration documents, Missing qualifications...",
            value: rejectReason,
            onChange: (e) => setRejectReason(e.target.value),
            className: "mt-2",
            rows: 4,
            disabled: actionLoading
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleRejectConfirm,
            disabled: actionLoading || !rejectReason.trim(),
            className: "bg-red-600 hover:bg-red-700",
            children: actionLoading ? "Rejecting..." : "Reject"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showStatusDialog, onOpenChange: (open) => {
      onStatusDialogChange(open);
      if (!open) setSelectedStatus("active");
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Update Organization Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Select the new status for this organization.",
          selectedOrganization && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-2 bg-muted rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
            "Organization ID: ",
            selectedOrganization.id
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status-select", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "status-select",
            value: selectedStatus,
            onChange: (e) => setSelectedStatus(e.target.value),
            className: "mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            disabled: actionLoading,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suspended", children: "Suspended" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleStatusConfirm,
            disabled: actionLoading,
            className: selectedStatus === "suspended" ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700",
            children: actionLoading ? "Updating..." : "Update Status"
          }
        )
      ] })
    ] }) })
  ] });
}

export { OrganizationActionDialogs as default };
