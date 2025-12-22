import { r as reactExports, t as toast, j as jsxRuntimeExports, G as GraduationCap, ad as Bell } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { a7 as getNoticeById } from './admin-BVl3HTxX.js';

function ViewNoticeDialog({
  open,
  onOpenChange,
  noticeId
}) {
  const [notice, setNotice] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open && noticeId) {
      fetchNotice();
    } else {
      setNotice(null);
    }
  }, [open, noticeId]);
  const fetchNotice = async () => {
    if (!noticeId) return;
    try {
      setLoading(true);
      const response = await getNoticeById(noticeId);
      if (response.success) {
        setNotice(response.data.notice);
      }
    } catch (error) {
      console.error("Error fetching notice:", error);
      toast.error(error.response?.data?.message || "Failed to load notice details");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "-";
    }
  };
  const formatNote = (note) => {
    return note.replace(/\\r\\n/g, "\n");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Notice Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "View detailed information about the notice" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" })
    ] }) : notice ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Notice ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-semibold", children: [
            "#",
            notice.id
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", children: notice.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: notice.course_id === null ? "default" : "secondary", children: notice.course_id === null ? "System-Wide Notice" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3 w-3 mr-1 inline" }),
            notice.course?.title || "Course-Specific"
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Created Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: formatDate(notice.date) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Expires At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: notice.expires_at ? formatDate(notice.expires_at) : "Never (Permanent)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Notice Content" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border rounded-lg bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap font-sans text-sm", children: formatNote(notice.note) }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No notice data available" })
    ] }) })
  ] }) });
}

export { ViewNoticeDialog as default };
