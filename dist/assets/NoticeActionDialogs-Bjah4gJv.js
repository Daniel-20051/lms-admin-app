import { r as reactExports, j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';

function NoticeActionDialogs({
  selectedNotice,
  actionLoading,
  showDeleteDialog,
  onDeleteDialogChange,
  onConfirmDelete
}) {
  const noticeTitle = selectedNotice?.title || "this notice";
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Notice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
            "Are you sure you want to delete ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: noticeTitle }),
            "? This action cannot be undone."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: actionLoading, children: "Cancel" }),
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
      ] })
    }
  ) });
}

export { NoticeActionDialogs as default };
