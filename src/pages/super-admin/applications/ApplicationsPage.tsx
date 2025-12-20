import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { ChevronLeft, ChevronRight, X, CheckCircle2, Search, Settings, UserCheck, Loader2, FileText } from "lucide-react";
import {
  getPendingKYCDocuments,
  approveKYCDocument,
  rejectKYCDocument,
  getApprovedKYCStudents,
  activateStudent,
  type PendingKYCDocument,
  type PendingKYCStudent,
  type StudentKYCData,
  type ApprovedKYCStudent,
} from "@/api/admin";
import { toast } from "sonner";
import ViewKYCDocumentDialog from "@/Components/super-admin/applications/ViewKYCDocumentDialog";
import ApproveRejectDialog from "@/Components/super-admin/applications/ApproveRejectDialog";
import ApproveStudentDocumentsDialog from "@/Components/super-admin/applications/ApproveStudentDocumentsDialog";
import ViewApprovedDocumentsDialog from "@/Components/super-admin/applications/ViewApprovedDocumentsDialog";

export default function ApplicationsPage() {
  const [pendingStudents, setPendingStudents] = useState<PendingKYCStudent[]>([]);
  const [approvedStudents, setApprovedStudents] = useState<ApprovedKYCStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingApproved, setLoadingApproved] = useState(false);
  const [page, setPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [approvedPagination, setApprovedPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });

  const [selectedDocument, setSelectedDocument] = useState<PendingKYCDocument | null>(null);
  const [studentKYCData] = useState<StudentKYCData | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showApproveRejectDialog, setShowApproveRejectDialog] = useState(false);
  const [showApproveStudentDialog, setShowApproveStudentDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    name: string;
    email: string;
    matric_number: string;
  } | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activatingStudentId, setActivatingStudentId] = useState<number | null>(null);
  const [showViewApprovedDialog, setShowViewApprovedDialog] = useState(false);
  const [selectedApprovedStudent, setSelectedApprovedStudent] = useState<ApprovedKYCStudent | null>(null);

  useEffect(() => {
    fetchPendingDocuments();
  }, [page]);

  useEffect(() => {
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
          totalPages: 0,
        });
      } else {
        setPendingStudents([]);
      }
    } catch (error: any) {
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
          totalPages: 0,
        });
      } else {
        setApprovedStudents([]);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load approved students");
      setApprovedStudents([]);
    } finally {
      setLoadingApproved(false);
    }
  };

  const handleApproveStudent = (student: {
    student_id: number;
    student_name: string;
    student_email: string;
    matric_number: string;
  }) => {
    setSelectedStudent({
      id: student.student_id,
      name: student.student_name,
      email: student.student_email,
      matric_number: student.matric_number,
    });
    setShowApproveStudentDialog(true);
  };

  const handleConfirmAction = async (rejectionReason?: string) => {
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
          fetchApprovedStudents(); // Refresh approved list
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
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to ${actionType} document`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleApprove = (document: PendingKYCDocument) => {
    setSelectedDocument(document);
    setActionType("approve");
    setShowApproveRejectDialog(true);
  };

  const handleReject = (document: PendingKYCDocument) => {
    setSelectedDocument(document);
    setActionType("reject");
    setShowApproveRejectDialog(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate pending documents count for each student
  const studentsWithPendingCount = useMemo(() => {
    return pendingStudents.map((student) => {
      const pendingCount = Object.values(student.documents || {}).filter(
        (doc) => doc && doc.status === "pending"
      ).length;
      return {
        ...student,
        pendingCount,
      };
    }).filter((student) => student.pendingCount > 0); // Only show students with pending documents
  }, [pendingStudents]);

  // Filter approved students based on search term
  const filteredApprovedStudents = useMemo(() => {
    if (!searchTerm.trim()) {
      return approvedStudents;
    }
    const search = searchTerm.toLowerCase();
    return approvedStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search) ||
        student.matric_number.toLowerCase().includes(search) ||
        student.program?.title.toLowerCase().includes(search)
    );
  }, [approvedStudents, searchTerm]);

  const handleActivateStudent = async (studentId: number) => {
    try {
      setActivatingStudentId(studentId);
      const response = await activateStudent(studentId);
      if (response.success) {
        toast.success(response.message || "Student activated successfully");
        // Update local state - change admin_status to "active"
        setApprovedStudents((prev) =>
          prev.map((student) =>
            student.student_id === studentId
              ? { ...student, admin_status: "active" }
              : student
          )
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to activate student");
    } finally {
      setActivatingStudentId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">KYC Applications</h1>
        <p className="text-muted-foreground">Review and manage student KYC document applications</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Documents</TabsTrigger>
          <TabsTrigger value="approved">Approved Students</TabsTrigger>
        </TabsList>

        {/* Pending Documents Tab */}
        <TabsContent value="pending" className="space-y-4">
          <Card className="pt-3">
            <CardHeader>
              <CardTitle>Pending Documents</CardTitle>
              <CardDescription>
                Documents awaiting admin review and approval
              </CardDescription>
            </CardHeader>
            <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !pendingStudents || studentsWithPendingCount.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No pending documents to review.</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S/N</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Pending Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsWithPendingCount.map((student, index) => (
                      <TableRow key={student.student_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {student.matric_number}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            {student.pendingCount} {student.pendingCount === 1 ? 'Document' : 'Documents'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApproveStudent({
                              student_id: student.student_id,
                              student_name: student.name,
                              student_email: student.email,
                              matric_number: student.matric_number,
                            })}
                          >
                            <Settings className="h-4 w-4 mr-1" />
                            Manage Documents
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((page - 1) * pagination.limit) + 1} to {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} students ({studentsWithPendingCount.length} with pending documents)
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1 || loading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-sm">
                      Page {page} of {pagination.totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                      disabled={page === pagination.totalPages || loading}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      </TabsContent>

      {/* Approved Students Tab */}
      <TabsContent value="approved" className="space-y-4">
        <Card className="pt-3">
          <CardHeader>
            <CardTitle>Approved Students</CardTitle>
            <CardDescription>
              Students with approved KYC documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search Filter */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, matric number, or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            {loadingApproved ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : !approvedStudents || approvedStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p>No approved students found.</p>
              </div>
            ) : filteredApprovedStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p>No students found matching your search.</p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>S/N</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Matric Number</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Documents Count</TableHead>
                        <TableHead>Approved At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApprovedStudents.map((student, index) => (
                        <TableRow key={student.student_id}>
                          <TableCell>
                            {searchTerm 
                              ? index + 1 
                              : (approvedPage - 1) * approvedPagination.limit + index + 1}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">{student.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {student.matric_number}
                            </code>
                          </TableCell>
                          <TableCell>
                            {student.program ? (
                              <div className="text-sm">
                                <div className="font-medium">{student.program.title}</div>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {student.documents_count} {student.documents_count === 1 ? 'Document' : 'Documents'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(student.approved_at)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {student.admin_status !== "active" ? (
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleActivateStudent(student.student_id)}
                                  disabled={activatingStudentId === student.student_id}
                                >
                                  {activatingStudentId === student.student_id ? (
                                    <>
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      Activating...
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </Button>
                              ) : (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <UserCheck className="h-3 w-3 mr-1" />
                                  Active
                                </Badge>
                              )}
                              {student.approved_documents && Object.keys(student.approved_documents).length > 0 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedApprovedStudent(student);
                                    setShowViewApprovedDialog(true);
                                  }}
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Documents
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    {searchTerm ? (
                      <>Showing {filteredApprovedStudents.length} of {approvedStudents.length} results</>
                    ) : (
                      <>Showing {((approvedPage - 1) * approvedPagination.limit) + 1} to {Math.min(approvedPage * approvedPagination.limit, approvedPagination.total)} of {approvedPagination.total} results</>
                    )}
                  </div>
                  {!searchTerm && approvedPagination.totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setApprovedPage(p => Math.max(1, p - 1))}
                        disabled={approvedPage === 1 || loadingApproved}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <div className="text-sm">
                        Page {approvedPage} of {approvedPagination.totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setApprovedPage(p => Math.min(approvedPagination.totalPages, p + 1))}
                        disabled={approvedPage === approvedPagination.totalPages || loadingApproved}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>

      {/* Approve Student Documents Dialog */}
      {selectedStudent && (
        <ApproveStudentDocumentsDialog
          open={showApproveStudentDialog}
          onOpenChange={setShowApproveStudentDialog}
          studentId={selectedStudent.id}
          studentName={selectedStudent.name}
          studentEmail={selectedStudent.email}
          matricNumber={selectedStudent.matric_number}
          onSuccess={() => {
            fetchPendingDocuments();
            setSelectedStudent(null);
          }}
        />
      )}

      {/* View Approved Documents Dialog */}
      <ViewApprovedDocumentsDialog
        open={showViewApprovedDialog}
        onOpenChange={setShowViewApprovedDialog}
        student={selectedApprovedStudent}
      />

      {/* View Document Dialog */}
      <ViewKYCDocumentDialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        document={selectedDocument}
        studentKYCData={studentKYCData}
        onApprove={() => {
          setShowViewDialog(false);
          if (selectedDocument) handleApprove(selectedDocument);
        }}
        onReject={() => {
          setShowViewDialog(false);
          if (selectedDocument) handleReject(selectedDocument);
        }}
      />

      {/* Approve/Reject Dialog */}
      <ApproveRejectDialog
        open={showApproveRejectDialog}
        onOpenChange={setShowApproveRejectDialog}
        actionType={actionType}
        document={selectedDocument}
        loading={actionLoading}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

