import { r as reactExports, t as toast, j as jsxRuntimeExports, bj as Image, F as FileText, B as Button, aD as ExternalLink, c as LoaderCircle, Z as Check, X } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { ac as getStudentKYC, S as approveKYCDocument, T as rejectKYCDocument } from './admin-BVl3HTxX.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { L as Label } from './label-UX76_odr.js';

function ApproveStudentDocumentsDialog({
  open,
  onOpenChange,
  studentId,
  studentName,
  studentEmail,
  matricNumber,
  onSuccess
}) {
  const [studentKYCData, setStudentKYCData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [approving, setApproving] = reactExports.useState(null);
  const [rejecting, setRejecting] = reactExports.useState(null);
  const [showRejectDialog, setShowRejectDialog] = reactExports.useState(false);
  const [selectedDocForReject, setSelectedDocForReject] = reactExports.useState(null);
  const [rejectionReason, setRejectionReason] = reactExports.useState("");
  const [hasChanges, setHasChanges] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open && studentId) {
      fetchStudentKYC();
      setHasChanges(false);
    } else {
      if (hasChanges) {
        onSuccess();
      }
      setStudentKYCData(null);
      setHasChanges(false);
    }
  }, [open, studentId]);
  const fetchStudentKYC = async () => {
    try {
      setLoading(true);
      const response = await getStudentKYC(studentId);
      if (response.success) {
        setStudentKYCData(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load student documents");
    } finally {
      setLoading(false);
    }
  };
  const handleApproveDocument = async (documentType) => {
    try {
      setApproving(documentType);
      const response = await approveKYCDocument(studentId, documentType);
      if (response.success) {
        toast.success(response.message || "Document approved successfully");
        if (studentKYCData) {
          const updatedData = { ...studentKYCData };
          if (documentType === "profile_image") {
            updatedData.profile_image = {
              ...updatedData.profile_image,
              status: "approved",
              reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
            };
          } else if (updatedData.documents[documentType]) {
            updatedData.documents[documentType] = {
              ...updatedData.documents[documentType],
              status: "approved",
              reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
            };
          }
          setStudentKYCData(updatedData);
          setHasChanges(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve document");
    } finally {
      setApproving(null);
    }
  };
  const handleRejectDocument = async (documentType, reason) => {
    try {
      setRejecting(documentType);
      const response = await rejectKYCDocument(studentId, documentType, {
        rejection_reason: reason
      });
      if (response.success) {
        toast.success(response.message || "Document rejected successfully");
        if (studentKYCData) {
          const updatedData = { ...studentKYCData };
          if (documentType === "profile_image") {
            updatedData.profile_image = {
              ...updatedData.profile_image,
              status: "rejected",
              rejection_reason: reason,
              reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
            };
          } else if (updatedData.documents[documentType]) {
            updatedData.documents[documentType] = {
              ...updatedData.documents[documentType],
              status: "rejected",
              rejection_reason: reason,
              reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
            };
          }
          setStudentKYCData(updatedData);
          setHasChanges(true);
        }
        setShowRejectDialog(false);
        setSelectedDocForReject(null);
        setRejectionReason("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject document");
    } finally {
      setRejecting(null);
    }
  };
  const getDocumentStatus = (documentType) => {
    if (documentType === "profile_image") {
      return studentKYCData?.profile_image || null;
    }
    return studentKYCData?.documents?.[documentType] || null;
  };
  const allDocumentTypes = reactExports.useMemo(() => {
    const allDocs = [];
    if (studentKYCData?.profile_image) {
      allDocs.push({ key: "profile_image", label: "Profile Image" });
    }
    if (studentKYCData?.documents) {
      Object.keys(studentKYCData.documents).forEach((key) => {
        if (key === "profile_image" || !studentKYCData.documents[key]) return;
        const label = key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        allDocs.push({ key, label });
      });
    }
    return allDocs;
  }, [studentKYCData]);
  const getStatusBadge = (status) => {
    if (!status) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-gray-100 text-gray-600", children: "Not Uploaded" });
    }
    switch (status) {
      case "approved":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: "Approved" });
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Rejected" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Pending" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
    }
  };
  const isImage = (url) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes("storage.supabase.co");
  };
  const pendingDocuments = reactExports.useMemo(() => {
    if (!studentKYCData) return [];
    return allDocumentTypes.filter((doc) => {
      const document = getDocumentStatus(doc.key);
      return document?.status === "pending";
    });
  }, [studentKYCData, allDocumentTypes]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Approve Student Documents" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "Review and approve all KYC documents for ",
        studentName
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Student Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: studentName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: studentEmail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Matric Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: matricNumber })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: "Documents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: allDocumentTypes.map((docType) => {
          const document = getDocumentStatus(docType.key);
          const status = document?.status || null;
          const isPending = status === "pending";
          const isApproved = status === "approved";
          const isRejected = status === "rejected";
          const notUploaded = !document;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    document?.url && isImage(document.url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium", children: docType.label }),
                    getStatusBadge(status)
                  ] }),
                  notUploaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No document has been uploaded" }) : document?.url ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: isImage(document.url) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: document.url,
                        alt: docType.label,
                        className: "max-w-xs h-auto rounded-lg border cursor-pointer hover:opacity-80 transition-opacity",
                        onClick: () => window.open(document.url, "_blank")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: () => window.open(document.url, "_blank"),
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
                      onClick: () => window.open(document.url, "_blank"),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 mr-2" }),
                        "View Document"
                      ]
                    }
                  ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Document URL not available" }),
                  isRejected && document && document.rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-1", children: "Rejection Reason:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: document.rejection_reason })
                  ] }),
                  document?.reviewed_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                    "Reviewed on ",
                    new Date(document.reviewed_at).toLocaleDateString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        className: "bg-green-600 hover:bg-green-700",
                        onClick: () => handleApproveDocument(docType.key),
                        disabled: approving === docType.key || rejecting === docType.key,
                        children: approving === docType.key ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                          "Approving..."
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-2" }),
                          "Approve"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "destructive",
                        onClick: () => {
                          setSelectedDocForReject(docType.key);
                          setShowRejectDialog(true);
                        },
                        disabled: approving === docType.key || rejecting === docType.key,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
                          "Reject"
                        ]
                      }
                    )
                  ] }),
                  isApproved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      disabled: true,
                      className: "bg-green-50 text-green-700 border-green-200",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-2" }),
                        "Approved"
                      ]
                    }
                  ),
                  isRejected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      disabled: true,
                      className: "bg-red-50 text-red-700 border-red-200",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
                        "Rejected"
                      ]
                    }
                  )
                ] })
              ] })
            },
            docType.key
          );
        }) })
      ] }),
      pendingDocuments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-blue-900", children: [
        pendingDocuments.length,
        " document",
        pendingDocuments.length !== 1 ? "s" : "",
        " pending approval"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showRejectDialog, onOpenChange: setShowRejectDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject Document" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Please provide a reason for rejecting this document. The student will see this reason." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 space-y-4", children: [
        selectedDocForReject && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Document Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: allDocumentTypes.find((d) => d.key === selectedDocForReject)?.label || selectedDocForReject })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rejection-reason", children: [
            "Rejection Reason ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "rejection-reason",
              placeholder: "Enter the reason for rejecting this document. The student will see this message.",
              value: rejectionReason,
              onChange: (e) => setRejectionReason(e.target.value),
              rows: 4,
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This reason will be visible to the student." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => {
              setShowRejectDialog(false);
              setRejectionReason("");
              setSelectedDocForReject(null);
            },
            disabled: rejecting === selectedDocForReject,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            onClick: () => {
              if (selectedDocForReject && rejectionReason.trim()) {
                handleRejectDocument(selectedDocForReject, rejectionReason);
              }
            },
            disabled: rejecting === selectedDocForReject || !rejectionReason.trim(),
            children: rejecting === selectedDocForReject ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
              "Rejecting..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
              "Reject"
            ] })
          }
        )
      ] })
    ] }) })
  ] }) });
}

export { ApproveStudentDocumentsDialog as default };
