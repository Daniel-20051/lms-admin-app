import { j as jsxRuntimeExports, B as Button, aD as ExternalLink, X, Z as Check } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';

function ViewKYCDocumentDialog({
  open,
  onOpenChange,
  document,
  studentKYCData,
  onApprove,
  onReject
}) {
  if (!document || !studentKYCData) return null;
  const getDocumentTypeLabel = (type) => {
    return type.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  const currentDocument = document.document_type === "profile_image" ? studentKYCData.profile_image : studentKYCData.documents[document.document_type];
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "View KYC Document" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Review student document before approval or rejection" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Student Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: studentKYCData.student.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: studentKYCData.student.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Matric Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: studentKYCData.student.matric_number })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Document Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: getDocumentTypeLabel(document.document_type) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Document Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg p-4 bg-muted/50", children: currentDocument?.url ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          isImage(currentDocument.url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: currentDocument.url,
              alt: getDocumentTypeLabel(document.document_type),
              className: "max-w-full h-auto rounded-lg border"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8 border rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "Document file" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => window.open(currentDocument.url, "_blank"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 mr-2" }),
                "Open in New Tab"
              ]
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center py-8", children: "No document available" }) })
      ] }),
      currentDocument && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: currentDocument.status === "approved" ? "default" : currentDocument.status === "rejected" ? "destructive" : "secondary",
              children: currentDocument.status.toUpperCase()
            }
          ),
          currentDocument.reviewed_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "Reviewed on ",
            new Date(currentDocument.reviewed_at).toLocaleDateString()
          ] })
        ] }),
        currentDocument.rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-destructive/10 border border-destructive/20 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-1", children: "Rejection Reason:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: currentDocument.rejection_reason })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-6 mt-6 border-t pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "destructive",
            onClick: onReject,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
              "Reject"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "default",
            className: "bg-green-600 hover:bg-green-700",
            onClick: onApprove,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-2" }),
              "Approve"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}

export { ViewKYCDocumentDialog as default };
