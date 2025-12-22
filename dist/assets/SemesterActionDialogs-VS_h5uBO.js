import { j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';

function SemesterActionDialogs({
  selectedSemester,
  actionLoading,
  showDeleteDialog,
  onDeleteDialogChange,
  onConfirmDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeleteDialog, onOpenChange: onDeleteDialogChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          'Are you sure you want to delete the semester "',
          selectedSemester?.academic_year,
          " - ",
          selectedSemester?.semester,
          '"? This action cannot be undone and will permanently remove the semester from the system.'
        ] }),
        selectedSemester?.status === "Active" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-destructive", children: "⚠️ Note: You cannot delete an active semester. Please close it first." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialogCancel,
        {
          disabled: actionLoading,
          onClick: () => onDeleteDialogChange(false),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialogAction,
        {
          onClick: onConfirmDelete,
          disabled: actionLoading || selectedSemester?.status === "Active",
          className: "bg-destructive hover:bg-destructive/90",
          children: actionLoading ? "Deleting..." : "Delete"
        }
      )
    ] })
  ] }) }) });
}

export { SemesterActionDialogs as default };
