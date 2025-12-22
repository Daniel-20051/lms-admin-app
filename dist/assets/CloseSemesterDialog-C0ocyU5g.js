import { r as reactExports, j as jsxRuntimeExports, t as toast } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { b as closeSemester } from './semesters-oK3Qf9Wp.js';

function CloseSemesterDialog({
  open,
  onOpenChange,
  selectedSemester,
  onSemesterClosed,
  actionLoading,
  setActionLoading
}) {
  const [reason, setReason] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!open) {
      setReason("");
      setError("");
    }
  }, [open]);
  const handleClose = async () => {
    if (!selectedSemester) return;
    if (!reason.trim()) {
      setError("Reason is required");
      return;
    }
    setActionLoading(true);
    try {
      await closeSemester(selectedSemester.id, { reason: reason.trim() });
      toast.success("Semester closed successfully");
      onSemesterClosed();
      onOpenChange(false);
    } catch (error2) {
      console.error("Error closing semester:", error2);
      toast.error(error2?.response?.data?.message || "Failed to close semester");
    } finally {
      setActionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Close Semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
        'Are you sure you want to close the semester "',
        selectedSemester?.academic_year,
        " - ",
        selectedSemester?.semester,
        '"? Please provide a reason for closing this semester.'
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reason", children: [
        "Reason ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "reason",
          placeholder: "e.g., End of academic session",
          value: reason,
          onChange: (e) => {
            setReason(e.target.value);
            setError("");
          },
          className: error ? "border-destructive" : "",
          rows: 3
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialogCancel,
        {
          disabled: actionLoading,
          onClick: () => onOpenChange(false),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialogAction,
        {
          onClick: handleClose,
          disabled: actionLoading,
          className: "bg-destructive hover:bg-destructive/90",
          children: actionLoading ? "Closing..." : "Close Semester"
        }
      )
    ] })
  ] }) });
}

export { CloseSemesterDialog as default };
