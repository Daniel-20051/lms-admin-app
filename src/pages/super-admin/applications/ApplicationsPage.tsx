import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { ChevronLeft, ChevronRight, Eye, Check, X } from "lucide-react";
import {
  getPendingKYCDocuments,
  getStudentKYC,
  approveKYCDocument,
  rejectKYCDocument,
  type PendingKYCDocument,
  type StudentKYCData,
} from "@/api/admin";
import { toast } from "sonner";
import ViewKYCDocumentDialog from "@/Components/super-admin/applications/ViewKYCDocumentDialog";
import ApproveRejectDialog from "@/Components/super-admin/applications/ApproveRejectDialog";

export default function ApplicationsPage() {
  const [pendingDocuments, setPendingDocuments] = useState<PendingKYCDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });

  const [selectedDocument, setSelectedDocument] = useState<PendingKYCDocument | null>(null);
  const [studentKYCData, setStudentKYCData] = useState<StudentKYCData | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showApproveRejectDialog, setShowApproveRejectDialog] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingDocuments();
  }, [page]);

  const fetchPendingDocuments = async () => {
    try {
      setLoading(true);
      const response = await getPendingKYCDocuments({ page, limit: 20 });
      if (response.success) {
        setPendingDocuments(response.data.documents);
        setPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching pending documents:", error);
      toast.error(error.response?.data?.message || "Failed to load pending documents");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = async (document: PendingKYCDocument) => {
    try {
      const response = await getStudentKYC(document.student_id);
      if (response.success) {
        setStudentKYCData(response.data);
        setSelectedDocument(document);
        setShowViewDialog(true);
      }
    } catch (error: any) {
      console.error("Error fetching student KYC:", error);
      toast.error(error.response?.data?.message || "Failed to load document details");
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
      console.error(`Error ${actionType}ing document:`, error);
      toast.error(error.response?.data?.message || `Failed to ${actionType} document`);
    } finally {
      setActionLoading(false);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">KYC Applications</h1>
        <p className="text-muted-foreground">Review and manage student KYC document applications</p>
      </div>

      {/* Statistics Card */}
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
          ) : pendingDocuments.length === 0 ? (
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
                      <TableHead>Document Type</TableHead>
                      <TableHead>Uploaded At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingDocuments.map((doc, index) => (
                      <TableRow key={doc.id}>
                        <TableCell>{(page - 1) * pagination.limit + index + 1}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{doc.student_name}</div>
                            <div className="text-sm text-muted-foreground">{doc.student_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{doc.matric_number}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getDocumentTypeLabel(doc.document_type)}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(doc.uploaded_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDocument(doc)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(doc)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleReject(doc)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
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
                    Showing {((page - 1) * pagination.limit) + 1} to {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} results
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

