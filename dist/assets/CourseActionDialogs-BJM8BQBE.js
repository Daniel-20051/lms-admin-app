import { j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';

function CourseActionDialogs({
  selectedCourse,
  actionLoading,
  showDeleteDialog,
  onDeleteDialogChange,
  onConfirmDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeleteDialog, onOpenChange: onDeleteDialogChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
        'Are you sure you want to delete the course "',
        selectedCourse?.title,
        '" (',
        selectedCourse?.course_code,
        ")? This action cannot be undone and will permanently remove the course from the system."
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
          disabled: actionLoading,
          className: "bg-destructive hover:bg-destructive/90",
          children: actionLoading ? "Deleting..." : "Delete"
        }
      )
    ] })
  ] }) }) });
}

export { CourseActionDialogs as default };
