import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Check, X } from "lucide-react";
import type { PendingKYCDocument } from "@/api/admin";

interface ApproveRejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: "approve" | "reject" | null;
  document: PendingKYCDocument | null;
  loading: boolean;
  onConfirm: (rejectionReason?: string) => void;
}

export default function ApproveRejectDialog({
  open,
  onOpenChange,
  actionType,
  document,
  loading,
  onConfirm,
}: ApproveRejectDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleConfirm = () => {
    if (actionType === "reject" && !rejectionReason.trim()) {
      return;
    }
    onConfirm(actionType === "reject" ? rejectionReason : undefined);
    if (actionType === "approve") {
      setRejectionReason("");
    }
  };

  const handleClose = () => {
    setRejectionReason("");
    onOpenChange(false);
  };

  const getDocumentTypeLabel = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "approve" ? "Approve Document" : "Reject Document"}
          </DialogTitle>
          <DialogDescription>
            {actionType === "approve"
              ? "Are you sure you want to approve this document? The student will be able to see the approved status."
              : "Please provide a reason for rejecting this document. The student will see this reason."}
          </DialogDescription>
        </DialogHeader>

        {document && (
          <div className="px-6 pt-6 space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Student</p>
              <p className="font-medium">{document.student_name}</p>
              <p className="text-sm text-muted-foreground mt-1">{document.student_email}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Document Type</p>
              <p className="font-medium">{getDocumentTypeLabel(document.document_type)}</p>
            </div>

            {actionType === "reject" && (
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">
                  Rejection Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter the reason for rejecting this document. The student will see this message."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This reason will be visible to the student.
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="px-6 pb-6 pt-6">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={actionType === "approve" ? "default" : "destructive"}
            onClick={handleConfirm}
            disabled={loading || (actionType === "reject" && !rejectionReason.trim())}
            className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                {actionType === "approve" ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </>
                )}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

