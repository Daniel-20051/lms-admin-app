import { j as jsxRuntimeExports, B as Button } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';

const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  onOpenChange,
  isProcessing = false,
  children,
  variant = "default"
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onOpenChange) {
      onOpenChange(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (next) => {
        if (!next) {
          handleCancel();
        } else if (onOpenChange) {
          onOpenChange(next);
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "px-0 pt-0 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "pt-2", children: description })
        ] }),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-0 pb-4", children }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-0 pb-0 pt-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: handleCancel, disabled: isProcessing, children: cancelText }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: onConfirm,
              disabled: isProcessing,
              className: "gap-2",
              variant: variant === "destructive" ? "destructive" : "default",
              children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                "Processing..."
              ] }) : confirmText
            }
          )
        ] })
      ] })
    }
  );
};

export { ConfirmDialog as default };
