import { j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { C as Card, d as CardContent } from './card-DKXLAlrm.js';

function UnitPreviewDialog({
  open,
  onOpenChange,
  unit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-4xl max-h-[90vh] overflow-y-auto p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl", children: unit.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: unit.content_type })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      unit.video_url && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          src: unit.video_url,
          controls: true,
          className: "w-full rounded-lg",
          style: { maxHeight: "400px" },
          children: "Your browser does not support the video tag."
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "prose prose-sm max-w-none dark:prose-invert",
          dangerouslySetInnerHTML: { __html: unit.content }
        }
      ) }) })
    ] })
  ] }) });
}

export { UnitPreviewDialog as default };
