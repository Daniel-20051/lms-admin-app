import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useState } from "react";
import type { Organization } from "@/api/admin";

interface OrganizationActionDialogsProps {
  selectedOrganization: Organization | null;
  actionLoading: boolean;
  showApproveDialog: boolean;
  showRejectDialog: boolean;
  showStatusDialog: boolean;
  onApproveDialogChange: (open: boolean) => void;
  onRejectDialogChange: (open: boolean) => void;
  onStatusDialogChange: (open: boolean) => void;
  onConfirmApprove: () => void;
  onConfirmReject: (reason: string) => void;
  onConfirmStatusUpdate: (status: "active" | "suspended") => void;
}

export default function OrganizationActionDialogs({
  selectedOrganization,
  actionLoading,
  showApproveDialog,
  showRejectDialog,
  showStatusDialog,
  onApproveDialogChange,
  onRejectDialogChange,
  onStatusDialogChange,
  onConfirmApprove,
  onConfirmReject,
  onConfirmStatusUpdate,
}: OrganizationActionDialogsProps) {
  const [rejectReason, setRejectReason] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"active" | "suspended">("active");

  const handleRejectConfirm = () => {
    if (rejectReason.trim()) {
      onConfirmReject(rejectReason);
      setRejectReason("");
    }
  };

  const handleStatusConfirm = () => {
    onConfirmStatusUpdate(selectedStatus);
  };

  return (
    <>
      {/* Approve Confirmation Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={onApproveDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this organization? An email notification will be sent automatically.
              {selectedOrganization && (
                <div className="mt-2 p-2 bg-muted rounded">
                  <p className="text-sm font-medium">
                    Organization ID: {selectedOrganization.id}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmApprove}
              disabled={actionLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {actionLoading ? "Approving..." : "Approve"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={(open) => {
        onRejectDialogChange(open);
        if (!open) setRejectReason("");
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this organization. An email notification will be sent automatically.
              {selectedOrganization && (
                <div className="mt-2 p-2 bg-muted rounded">
                  <p className="text-sm font-medium">
                    Organization ID: {selectedOrganization.id}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="reject-reason">Rejection Reason</Label>
            <Textarea
              id="reject-reason"
              placeholder="e.g., Invalid registration documents, Missing qualifications..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="mt-2"
              rows={4}
              disabled={actionLoading}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectConfirm}
              disabled={actionLoading || !rejectReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {actionLoading ? "Rejecting..." : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update Status Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={(open) => {
        onStatusDialogChange(open);
        if (!open) setSelectedStatus("active");
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Organization Status</AlertDialogTitle>
            <AlertDialogDescription>
              Select the new status for this organization.
              {selectedOrganization && (
                <div className="mt-2 p-2 bg-muted rounded">
                  <p className="text-sm font-medium">
                    Organization ID: {selectedOrganization.id}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="status-select">Status</Label>
            <select
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as "active" | "suspended")}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={actionLoading}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusConfirm}
              disabled={actionLoading}
              className={selectedStatus === "suspended" ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"}
            >
              {actionLoading ? "Updating..." : "Update Status"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

