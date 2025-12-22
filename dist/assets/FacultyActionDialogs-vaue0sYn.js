import { r as reactExports, j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';

function FacultyActionDialogs({
  selectedFaculty,
  actionLoading,
  showDeleteDialog,
  onDeleteDialogChange,
  onConfirmDelete
}) {
  const facultyName = selectedFaculty?.name || "this faculty";
  const hasPrograms = selectedFaculty?.programs && selectedFaculty.programs.length > 0;
  reactExports.useEffect(() => {
    if (!showDeleteDialog) {
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
  }, [showDeleteDialog]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AlertDialog,
    {
      open: showDeleteDialog,
      onOpenChange: onDeleteDialogChange,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Faculty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: hasPrograms ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive font-medium", children: [
            "Cannot delete this faculty. It has ",
            selectedFaculty?.programs.length,
            " program(s) associated with it. Please remove all programs before deleting the faculty."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Are you sure you want to delete ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: facultyName }),
            "? This action cannot be undone."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
          !hasPrograms && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              onClick: onConfirmDelete,
              disabled: actionLoading,
              className: "bg-destructive hover:bg-destructive/90",
              children: actionLoading ? "Deleting..." : "Delete"
            }
          )
        ] })
      ] })
    }
  ) });
}

export { FacultyActionDialogs as default };
