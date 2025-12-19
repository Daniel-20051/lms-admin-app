import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Check, X, ExternalLink } from "lucide-react";
import type { PendingKYCDocument, StudentKYCData } from "@/api/admin";

interface ViewKYCDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: PendingKYCDocument | null;
  studentKYCData: StudentKYCData | null;
  onApprove: () => void;
  onReject: () => void;
}

export default function ViewKYCDocumentDialog({
  open,
  onOpenChange,
  document,
  studentKYCData,
  onApprove,
  onReject,
}: ViewKYCDocumentDialogProps) {
  if (!document || !studentKYCData) return null;

  const getDocumentTypeLabel = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const currentDocument = document.document_type === "profile_image"
    ? studentKYCData.profile_image
    : studentKYCData.documents[document.document_type];

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View KYC Document</DialogTitle>
          <DialogDescription>
            Review student document before approval or rejection
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pt-6 space-y-6">
          {/* Student Information */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Student Name</p>
              <p className="font-medium">{studentKYCData.student.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{studentKYCData.student.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Matric Number</p>
              <p className="font-medium">{studentKYCData.student.matric_number}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Document Type</p>
              <Badge variant="outline">{getDocumentTypeLabel(document.document_type)}</Badge>
            </div>
          </div>

          {/* Document Preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Document Preview</p>
            <div className="border rounded-lg p-4 bg-muted/50">
              {currentDocument?.url ? (
                <div className="space-y-4">
                  {isImage(currentDocument.url) ? (
                    <img
                      src={currentDocument.url}
                      alt={getDocumentTypeLabel(document.document_type)}
                      className="max-w-full h-auto rounded-lg border"
                    />
                  ) : (
                    <div className="flex items-center justify-center p-8 border rounded-lg">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-2">Document file</p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => window.open(currentDocument.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No document available</p>
              )}
            </div>
          </div>

          {/* Document Status */}
          {currentDocument && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    currentDocument.status === "approved"
                      ? "default"
                      : currentDocument.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {currentDocument.status.toUpperCase()}
                </Badge>
                {currentDocument.reviewed_at && (
                  <span className="text-sm text-muted-foreground">
                    Reviewed on {new Date(currentDocument.reviewed_at).toLocaleDateString()}
                  </span>
                )}
              </div>
              {currentDocument.rejection_reason && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm font-medium text-destructive mb-1">Rejection Reason:</p>
                  <p className="text-sm">{currentDocument.rejection_reason}</p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-6 mt-6 border-t pb-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={onReject}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={onApprove}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

