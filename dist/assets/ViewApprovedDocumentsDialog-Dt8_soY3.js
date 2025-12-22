import { j as jsxRuntimeExports, F as FileText, bj as Image, B as Button, aD as ExternalLink } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';

function ViewApprovedDocumentsDialog({
  open,
  onOpenChange,
  student
}) {
  if (!student) return null;
  const getDocumentTypeLabel = (key) => {
    return key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  const isImage = (url) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes("storage.supabase.co");
  };
  const isFullUrl = (url) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };
  const getDocumentUrl = (url) => {
    if (isFullUrl(url)) {
      return url;
    }
    return url;
  };
  const approvedDocuments = student.approved_documents || {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Approved Documents" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "View all approved documents for ",
        student.name
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Student Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: student.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: student.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Matric Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: student.matric_number })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Documents Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: [
            student.documents_count,
            " ",
            student.documents_count === 1 ? "Document" : "Documents"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: "Approved Documents" }),
        Object.keys(approvedDocuments).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No approved documents available." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Object.entries(approvedDocuments).map(([docType, url]) => {
          const documentUrl = getDocumentUrl(url);
          const isImageFile = isImage(documentUrl);
          const hasValidUrl = isFullUrl(documentUrl);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  isImageFile ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium", children: getDocumentTypeLabel(docType) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: "Approved" })
                ] }),
                hasValidUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: isImageFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: documentUrl,
                      alt: getDocumentTypeLabel(docType),
                      className: "max-w-xs h-auto rounded-lg border cursor-pointer hover:opacity-80 transition-opacity",
                      onClick: () => window.open(documentUrl, "_blank")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => window.open(documentUrl, "_blank"),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 mr-2" }),
                        "Open in New Tab"
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => window.open(documentUrl, "_blank"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 mr-2" }),
                      "View Document"
                    ]
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: url || "Document URL not available" })
                ] })
              ] }) })
            },
            docType
          );
        }) })
      ] })
    ] })
  ] }) });
}

export { ViewApprovedDocumentsDialog as default };
