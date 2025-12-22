const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ViewKYCDocumentDialog-CXTwref5.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/ApproveRejectDialog-DlSe1ihq.js","assets/textarea-LWcfCAwC.js","assets/label-UX76_odr.js","assets/ApproveStudentDocumentsDialog-DH8uLVVn.js","assets/admin-BVl3HTxX.js","assets/skeleton-Bd8cuwAJ.js","assets/ViewApprovedDocumentsDialog-Dt8_soY3.js"])))=>i.map(i=>d[i]);
import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, H as Settings, $ as ChevronLeft, a0 as ChevronRight, J as Search, X, C as CircleCheck, c as LoaderCircle, I as UserCheck, F as FileText, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { Q as getPendingKYCDocuments, R as getApprovedKYCStudents, S as approveKYCDocument, T as rejectKYCDocument, c as activateStudent } from './admin-BVl3HTxX.js';

const ViewKYCDocumentDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewKYCDocumentDialog-CXTwref5.js'),true              ?__vite__mapDeps([0,1,2,3,4]):void 0));
const ApproveRejectDialog = reactExports.lazy(() => __vitePreload(() => import('./ApproveRejectDialog-DlSe1ihq.js'),true              ?__vite__mapDeps([5,1,2,3,6,7]):void 0));
const ApproveStudentDocumentsDialog = reactExports.lazy(() => __vitePreload(() => import('./ApproveStudentDocumentsDialog-DH8uLVVn.js'),true              ?__vite__mapDeps([8,1,2,3,4,9,10,6,7]):void 0));
const ViewApprovedDocumentsDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewApprovedDocumentsDialog-Dt8_soY3.js'),true              ?__vite__mapDeps([11,1,2,3,4]):void 0));
function ApplicationsPage() {
  const [pendingStudents, setPendingStudents] = reactExports.useState([]);
  const [approvedStudents, setApprovedStudents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingApproved, setLoadingApproved] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [approvedPage, setApprovedPage] = reactExports.useState(1);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [approvedPagination, setApprovedPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [selectedDocument, setSelectedDocument] = reactExports.useState(null);
  const [studentKYCData] = reactExports.useState(null);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showApproveRejectDialog, setShowApproveRejectDialog] = reactExports.useState(false);
  const [showApproveStudentDialog, setShowApproveStudentDialog] = reactExports.useState(false);
  const [selectedStudent, setSelectedStudent] = reactExports.useState(null);
  const [actionType, setActionType] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [activatingStudentId, setActivatingStudentId] = reactExports.useState(null);
  const [showViewApprovedDialog, setShowViewApprovedDialog] = reactExports.useState(false);
  const [selectedApprovedStudent, setSelectedApprovedStudent] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchPendingDocuments();
  }, [page]);
  reactExports.useEffect(() => {
    fetchApprovedStudents();
  }, [approvedPage]);
  const fetchPendingDocuments = async () => {
    try {
      setLoading(true);
      const response = await getPendingKYCDocuments({ page, limit: 20 });
      if (response.success && response.data) {
        setPendingStudents(response.data.students || []);
        setPagination(response.data.pagination || {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0
        });
      } else {
        setPendingStudents([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load pending documents");
      setPendingStudents([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchApprovedStudents = async () => {
    try {
      setLoadingApproved(true);
      const response = await getApprovedKYCStudents({ page: approvedPage, limit: 20 });
      if (response.success && response.data) {
        setApprovedStudents(response.data.students || []);
        setApprovedPagination(response.data.pagination || {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0
        });
      } else {
        setApprovedStudents([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load approved students");
      setApprovedStudents([]);
    } finally {
      setLoadingApproved(false);
    }
  };
  const handleApproveStudent = (student) => {
    setSelectedStudent({
      id: student.student_id,
      name: student.student_name,
      email: student.student_email,
      matric_number: student.matric_number
    });
    setShowApproveStudentDialog(true);
  };
  const handleConfirmAction = async (rejectionReason) => {
    if (!selectedDocument) return;
    try {
      setActionLoading(true);
      if (actionType === "approve") {
        const response = await approveKYCDocument(
          selectedDocument.student_id,
          selectedDocument.document_type
        );
        if (response.success) {
          toast.success(response.message || "Document approved successfully");
          setShowApproveRejectDialog(false);
          setSelectedDocument(null);
          fetchPendingDocuments();
          fetchApprovedStudents();
        }
      } else if (actionType === "reject" && rejectionReason) {
        const response = await rejectKYCDocument(
          selectedDocument.student_id,
          selectedDocument.document_type,
          { rejection_reason: rejectionReason }
        );
        if (response.success) {
          toast.success(response.message || "Document rejected successfully");
          setShowApproveRejectDialog(false);
          setSelectedDocument(null);
          fetchPendingDocuments();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${actionType} document`);
    } finally {
      setActionLoading(false);
    }
  };
  const handleApprove = (document) => {
    setSelectedDocument(document);
    setActionType("approve");
    setShowApproveRejectDialog(true);
  };
  const handleReject = (document) => {
    setSelectedDocument(document);
    setActionType("reject");
    setShowApproveRejectDialog(true);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const studentsWithPendingCount = reactExports.useMemo(() => {
    return pendingStudents.map((student) => {
      const pendingCount = Object.values(student.documents || {}).filter(
        (doc) => doc && doc.status === "pending"
      ).length;
      return {
        ...student,
        pendingCount
      };
    }).filter((student) => student.pendingCount > 0);
  }, [pendingStudents]);
  const filteredApprovedStudents = reactExports.useMemo(() => {
    if (!searchTerm.trim()) {
      return approvedStudents;
    }
    const search = searchTerm.toLowerCase();
    return approvedStudents.filter(
      (student) => student.name.toLowerCase().includes(search) || student.email.toLowerCase().includes(search) || student.matric_number.toLowerCase().includes(search) || student.program?.title.toLowerCase().includes(search)
    );
  }, [approvedStudents, searchTerm]);
  const handleActivateStudent = async (studentId) => {
    try {
      setActivatingStudentId(studentId);
      const response = await activateStudent(studentId);
      if (response.success) {
        toast.success(response.message || "Student activated successfully");
        setApprovedStudents(
          (prev) => prev.map(
            (student) => student.student_id === studentId ? { ...student, admin_status: "active" } : student
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to activate student");
    } finally {
      setActivatingStudentId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "KYC Applications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Review and manage student KYC document applications" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "pending", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pending", children: "Pending Documents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "approved", children: "Approved Students" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Pending Documents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Documents awaiting admin review and approval" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : !pendingStudents || studentsWithPendingCount.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No pending documents to review." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Matric Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pending Documents" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: studentsWithPendingCount.map((student, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: index + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: student.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: student.email })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: student.matric_number }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-yellow-50 text-yellow-700 border-yellow-200", children: [
                student.pendingCount,
                " ",
                student.pendingCount === 1 ? "Document" : "Documents"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "default",
                  size: "sm",
                  onClick: () => handleApproveStudent({
                    student_id: student.student_id,
                    student_name: student.name,
                    student_email: student.email,
                    matric_number: student.matric_number
                  }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 mr-1" }),
                    "Manage Documents"
                  ]
                }
              ) })
            ] }, student.student_id)) })
          ] }) }),
          pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              "Showing ",
              (page - 1) * pagination.limit + 1,
              " to ",
              Math.min(page * pagination.limit, pagination.total),
              " of ",
              pagination.total,
              " students (",
              studentsWithPendingCount.length,
              " with pending documents)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setPage((p) => Math.max(1, p - 1)),
                  disabled: page === 1 || loading,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                    "Previous"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                "Page ",
                page,
                " of ",
                pagination.totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setPage((p) => Math.min(pagination.totalPages, p + 1)),
                  disabled: page === pagination.totalPages || loading,
                  children: [
                    "Next",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "approved", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Approved Students" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Students with approved KYC documents" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by name, email, matric number, or program...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-10"
              }
            ),
            searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSearchTerm(""),
                className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }) }),
          loadingApproved ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : !approvedStudents || approvedStudents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 mx-auto mb-2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No approved students found." })
          ] }) : filteredApprovedStudents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-12 w-12 mx-auto mb-2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No students found matching your search." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Matric Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Program" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Documents Count" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Approved At" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredApprovedStudents.map((student, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: searchTerm ? index + 1 : (approvedPage - 1) * approvedPagination.limit + index + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: student.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: student.email })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-2 py-1 rounded", children: student.matric_number }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: student.program ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: student.program.title }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "-" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: [
                  student.documents_count,
                  " ",
                  student.documents_count === 1 ? "Document" : "Documents"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: formatDate(student.approved_at) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  student.admin_status !== "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "default",
                      onClick: () => handleActivateStudent(student.student_id),
                      disabled: activatingStudentId === student.student_id,
                      children: activatingStudentId === student.student_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                        "Activating..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 mr-2" }),
                        "Activate"
                      ] })
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3 w-3 mr-1" }),
                    "Active"
                  ] }),
                  student.approved_documents && Object.keys(student.approved_documents).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => {
                        setSelectedApprovedStudent(student);
                        setShowViewApprovedDialog(true);
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
                        "View Documents"
                      ]
                    }
                  )
                ] }) })
              ] }, student.student_id)) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: searchTerm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Showing ",
                filteredApprovedStudents.length,
                " of ",
                approvedStudents.length,
                " results"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Showing ",
                (approvedPage - 1) * approvedPagination.limit + 1,
                " to ",
                Math.min(approvedPage * approvedPagination.limit, approvedPagination.total),
                " of ",
                approvedPagination.total,
                " results"
              ] }) }),
              !searchTerm && approvedPagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setApprovedPage((p) => Math.max(1, p - 1)),
                    disabled: approvedPage === 1 || loadingApproved,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                      "Previous"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                  "Page ",
                  approvedPage,
                  " of ",
                  approvedPagination.totalPages
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setApprovedPage((p) => Math.min(approvedPagination.totalPages, p + 1)),
                    disabled: approvedPage === approvedPagination.totalPages || loadingApproved,
                    children: [
                      "Next",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    selectedStudent && showApproveStudentDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ApproveStudentDocumentsDialog,
      {
        open: showApproveStudentDialog,
        onOpenChange: setShowApproveStudentDialog,
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        studentEmail: selectedStudent.email,
        matricNumber: selectedStudent.matric_number,
        onSuccess: () => {
          fetchPendingDocuments();
          setSelectedStudent(null);
        }
      }
    ) }) : null,
    showViewApprovedDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewApprovedDocumentsDialog,
      {
        open: showViewApprovedDialog,
        onOpenChange: setShowViewApprovedDialog,
        student: selectedApprovedStudent
      }
    ) }) : null,
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewKYCDocumentDialog,
      {
        open: showViewDialog,
        onOpenChange: setShowViewDialog,
        document: selectedDocument,
        studentKYCData,
        onApprove: () => {
          setShowViewDialog(false);
          if (selectedDocument) handleApprove(selectedDocument);
        },
        onReject: () => {
          setShowViewDialog(false);
          if (selectedDocument) handleReject(selectedDocument);
        }
      }
    ) }) : null,
    showApproveRejectDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ApproveRejectDialog,
      {
        open: showApproveRejectDialog,
        onOpenChange: setShowApproveRejectDialog,
        actionType,
        document: selectedDocument,
        loading: actionLoading,
        onConfirm: handleConfirmAction
      }
    ) }) : null
  ] });
}

export { ApplicationsPage as default };
