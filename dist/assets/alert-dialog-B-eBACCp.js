import { r as reactExports, j as jsxRuntimeExports, as as cn, B as Button } from './index-BG4-akrH.js';

const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/80",
        onClick: () => onOpenChange(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-50", children })
  ] });
};
const AlertDialogContent = ({ children, className }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "bg-background border rounded-lg shadow-lg p-6 w-full max-w-lg mx-4",
        className
      ),
      onClick: (e) => e.stopPropagation(),
      children
    }
  );
};
const AlertDialogHeader = ({ children, className }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left mb-4", className), children });
};
const AlertDialogFooter = ({ children, className }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className), children });
};
const AlertDialogTitle = ({ children, className }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cn("text-lg font-semibold", className), children });
};
const AlertDialogDescription = ({ children, className }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm text-muted-foreground", className), children });
};
const AlertDialogAction = reactExports.forwardRef(
  ({ children, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        ref,
        className,
        ...props,
        children
      }
    );
  }
);
AlertDialogAction.displayName = "AlertDialogAction";
const AlertDialogCancel = reactExports.forwardRef(
  ({ children, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        ref,
        variant: "outline",
        className: cn("mt-2 sm:mt-0", className),
        ...props,
        children
      }
    );
  }
);
AlertDialogCancel.displayName = "AlertDialogCancel";
const AlertDialogTrigger = ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
const AlertDialogPortal = ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
const AlertDialogOverlay = ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });

export { AlertDialog as A, AlertDialogContent as a, AlertDialogHeader as b, AlertDialogTitle as c, AlertDialogDescription as d, AlertDialogFooter as e, AlertDialogCancel as f, AlertDialogAction as g };
