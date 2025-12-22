import { j as jsxRuntimeExports, bi as TriangleAlert, t as toast } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';
import { f as activateSemester } from './semesters-oK3Qf9Wp.js';

function ActivateSemesterDialog({
  open,
  onOpenChange,
  selectedSemester,
  onSemesterActivated,
  actionLoading,
  setActionLoading
}) {
  const handleActivate = async () => {
    if (!selectedSemester) return;
    setActionLoading(true);
    try {
      await activateSemester(selectedSemester.id);
      toast.success("Semester activated successfully. All other active semesters have been closed.");
      onSemesterActivated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error activating semester:", error);
      toast.error(error?.response?.data?.message || "Failed to activate semester");
    } finally {
      setActionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-yellow-500" }),
        "Activate Semester"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          'Are you sure you want to activate the semester "',
          selectedSemester?.academic_year,
          " - ",
          selectedSemester?.semester,
          '"?'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-yellow-600 dark:text-yellow-500", children: "⚠️ Warning: This will automatically close all other active semesters in the system." })
      ] })
    ] }),
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
          onClick: handleActivate,
          disabled: actionLoading,
          className: "bg-green-600 hover:bg-green-700",
          children: actionLoading ? "Activating..." : "Activate Semester"
        }
      )
    ] })
  ] }) });
}

export { ActivateSemesterDialog as default };
