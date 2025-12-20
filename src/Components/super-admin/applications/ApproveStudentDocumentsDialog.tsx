import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Check, X, ExternalLink, Loader2, FileText, Image as ImageIcon } from "lucide-react";
import { getStudentKYC, approveKYCDocument, rejectKYCDocument, type StudentKYCData } from "@/api/admin";
import { toast } from "sonner";
import { Skeleton } from "@/Components/ui/skeleton";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";

interface ApproveStudentDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: number;
  studentName: string;
  studentEmail: string;
  matricNumber: string;
  onSuccess: () => void;
}


export default function ApproveStudentDocumentsDialog({
  open,
  onOpenChange,
  studentId,
  studentName,
  studentEmail,
  matricNumber,
  onSuccess,
}: ApproveStudentDocumentsDialogProps) {
  const [studentKYCData, setStudentKYCData] = useState<StudentKYCData | null>(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedDocForReject, setSelectedDocForReject] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (open && studentId) {
      fetchStudentKYC();
      setHasChanges(false);
    } else {
      // When modal closes, refresh pending documents if changes were made
      if (hasChanges) {
        onSuccess();
      }
      setStudentKYCData(null);
      setHasChanges(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, studentId]);

  const fetchStudentKYC = async () => {
    try {
      setLoading(true);
      const response = await getStudentKYC(studentId);
      if (response.success) {
        setStudentKYCData(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load student documents");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDocument = async (documentType: string) => {
    try {
      setApproving(documentType);
      const response = await approveKYCDocument(studentId, documentType);
        if (response.success) {
        toast.success(response.message || "Document approved successfully");
        // Update local state - only the button will change, no reload
        if (studentKYCData) {
          const updatedData = { ...studentKYCData };
          if (documentType === "profile_image") {
            updatedData.profile_image = {
              ...updatedData.profile_image,
              status: "approved" as const,
              reviewed_at: new Date().toISOString(),
            };
          } else if (updatedData.documents[documentType]) {
            updatedData.documents[documentType] = {
              ...updatedData.documents[documentType],
              status: "approved" as const,
              reviewed_at: new Date().toISOString(),
            };
          }
          setStudentKYCData(updatedData);
          setHasChanges(true); // Mark that changes were made
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to approve document");
    } finally {
      setApproving(null);
    }
  };

  const handleRejectDocument = async (documentType: string, reason: string) => {
    try {
      setRejecting(documentType);
      const response = await rejectKYCDocument(studentId, documentType, {
        rejection_reason: reason,
      });
      if (response.success) {
        toast.success(response.message || "Document rejected successfully");
        // Update local state instead of refetching
        if (studentKYCData) {
          const updatedData = { ...studentKYCData };
          if (documentType === "profile_image") {
            updatedData.profile_image = {
              ...updatedData.profile_image,
              status: "rejected" as const,
              rejection_reason: reason,
              reviewed_at: new Date().toISOString(),
            };
          } else if (updatedData.documents[documentType]) {
            updatedData.documents[documentType] = {
              ...updatedData.documents[documentType],
              status: "rejected" as const,
              rejection_reason: reason,
              reviewed_at: new Date().toISOString(),
            };
          }
          setStudentKYCData(updatedData);
          setHasChanges(true); // Mark that changes were made
        }
        setShowRejectDialog(false);
        setSelectedDocForReject(null);
        setRejectionReason("");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reject document");
    } finally {
      setRejecting(null);
    }
  };

  const getDocumentStatus = (documentType: string) => {
    if (documentType === "profile_image") {
      return studentKYCData?.profile_image || null;
    }
    return studentKYCData?.documents?.[documentType] || null;
  };

  // Get all document types from the student's documents (only show what exists)
  const allDocumentTypes = useMemo(() => {
    const allDocs: Array<{ key: string; label: string }> = [];
    
    // Add profile_image if it exists
    if (studentKYCData?.profile_image) {
      allDocs.push({ key: "profile_image", label: "Profile Image" });
    }
    
    // Add all documents from the documents object (only if they exist)
    if (studentKYCData?.documents) {
      Object.keys(studentKYCData.documents).forEach((key) => {
        // Skip if already added (profile_image) or if the value is null
        if (key === "profile_image" || !studentKYCData.documents[key]) return;
        
        // Format the key as a label
        const label = key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        
        allDocs.push({ key, label });
      });
    }
    
    return allDocs;
  }, [studentKYCData]);

  const getStatusBadge = (status: string | null) => {
    if (!status) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-600">Not Uploaded</Badge>;
    }
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isImage = (url: string) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes('storage.supabase.co');
  };

  const pendingDocuments = useMemo(() => {
    if (!studentKYCData) return [];
    return allDocumentTypes.filter(doc => {
      const document = getDocumentStatus(doc.key);
      return document?.status === "pending";
    });
  }, [studentKYCData, allDocumentTypes]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Approve Student Documents</DialogTitle>
          <DialogDescription>
            Review and approve all KYC documents for {studentName}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
            {/* Student Information */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Student Name</p>
                <p className="font-medium">{studentName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{studentEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Matric Number</p>
                <p className="font-medium">{matricNumber}</p>
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Documents</h3>
              <div className="space-y-3">
                {allDocumentTypes.map((docType) => {
                  const document = getDocumentStatus(docType.key);
                  const status = document?.status || null;
                  const isPending = status === "pending";
                  const isApproved = status === "approved";
                  const isRejected = status === "rejected";
                  const notUploaded = !document;

                  return (
                    <div
                      key={docType.key}
                      className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {document?.url && isImage(document.url) ? (
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            )}
                            <h4 className="font-medium">{docType.label}</h4>
                            {getStatusBadge(status)}
                          </div>

                          {/* Document Preview or Not Uploaded Message */}
                          {notUploaded ? (
                            <p className="text-sm text-muted-foreground italic">
                              No document has been uploaded
                            </p>
                          ) : document?.url ? (
                            <div className="space-y-2">
                              {isImage(document.url) ? (
                                <div className="space-y-2">
                                  <img
                                    src={document.url}
                                    alt={docType.label}
                                    className="max-w-xs h-auto rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => window.open(document.url, "_blank")}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(document.url, "_blank")}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open in New Tab
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(document.url, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Document
                                </Button>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Document URL not available</p>
                          )}

                          {/* Rejection Reason */}
                          {isRejected && document && document.rejection_reason && (
                            <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                              <p className="text-sm font-medium text-destructive mb-1">Rejection Reason:</p>
                              <p className="text-sm">{document.rejection_reason}</p>
                            </div>
                          )}

                          {/* Reviewed Info */}
                          {document?.reviewed_at && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Reviewed on {new Date(document.reviewed_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {isPending && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveDocument(docType.key)}
                                disabled={approving === docType.key || rejecting === docType.key}
                              >
                                {approving === docType.key ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Approving...
                                  </>
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedDocForReject(docType.key);
                                  setShowRejectDialog(true);
                                }}
                                disabled={approving === docType.key || rejecting === docType.key}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                          {isApproved && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approved
                            </Button>
                          )}
                          {isRejected && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Rejected
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            {pendingDocuments.length > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  {pendingDocuments.length} document{pendingDocuments.length !== 1 ? "s" : ""} pending approval
                </p>
              </div>
            )}
            </div>
          )}
        </div>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Document</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this document. The student will see this reason.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pt-6 space-y-4">
              {selectedDocForReject && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Document Type</p>
                  <p className="font-medium">
                    {allDocumentTypes.find(d => d.key === selectedDocForReject)?.label || selectedDocForReject}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">
                  Rejection Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter the reason for rejecting this document. The student will see this message."
                  value={rejectionReason}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRejectionReason(e.target.value)}
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This reason will be visible to the student.
                </p>
              </div>
            </div>
            <DialogFooter className="px-6 pb-6 pt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason("");
                  setSelectedDocForReject(null);
                }}
                disabled={rejecting === selectedDocForReject}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedDocForReject && rejectionReason.trim()) {
                    handleRejectDocument(selectedDocForReject, rejectionReason);
                  }
                }}
                disabled={rejecting === selectedDocForReject || !rejectionReason.trim()}
              >
                {rejecting === selectedDocForReject ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}

