import { useEffect } from "react";
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
import type { Faculty } from "@/api/admin";

interface FacultyActionDialogsProps {
  selectedFaculty: Faculty | null;
  actionLoading: boolean;
  showDeleteDialog: boolean;
  onDeleteDialogChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export default function FacultyActionDialogs({
  selectedFaculty,
  actionLoading,
  showDeleteDialog,
  onDeleteDialogChange,
  onConfirmDelete,
}: FacultyActionDialogsProps) {
  const facultyName = selectedFaculty?.name || "this faculty";
  const hasPrograms = selectedFaculty?.programs && selectedFaculty.programs.length > 0;

  // Cleanup effect to restore body styles when dialog closes
  useEffect(() => {
    if (!showDeleteDialog) {
      const timer = setTimeout(() => {
        if (document.body.style.pointerEvents === 'none') {
          document.body.style.pointerEvents = '';
        }
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = '';
        }
        const overlays = document.querySelectorAll('[data-radix-dialog-overlay]');
        overlays.forEach(overlay => {
          if (overlay instanceof HTMLElement) {
            overlay.style.pointerEvents = '';
          }
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showDeleteDialog]);

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={onDeleteDialogChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Faculty</AlertDialogTitle>
            <AlertDialogDescription>
              {hasPrograms ? (
                <span className="text-destructive font-medium">
                  Cannot delete this faculty. It has {selectedFaculty?.programs.length} program(s) associated with it. 
                  Please remove all programs before deleting the faculty.
                </span>
              ) : (
                <>
                  Are you sure you want to delete <strong>{facultyName}</strong>? This action cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>
              Cancel
            </AlertDialogCancel>
            {!hasPrograms && (
              <AlertDialogAction
                onClick={onConfirmDelete}
                disabled={actionLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

