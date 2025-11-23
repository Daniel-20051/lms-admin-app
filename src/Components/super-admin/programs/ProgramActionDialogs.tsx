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
import type { Program } from "@/api/programs";

interface ProgramActionDialogsProps {
    selectedProgram: Program | null;
    actionLoading: boolean;
    showDeleteDialog: boolean;
    onDeleteDialogChange: (open: boolean) => void;
    onConfirmDelete: () => void;
}

export default function ProgramActionDialogs({
    selectedProgram,
    actionLoading,
    showDeleteDialog,
    onDeleteDialogChange,
    onConfirmDelete,
}: ProgramActionDialogsProps) {
    return (
        <>
            {/* Delete Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={onDeleteDialogChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Program</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the program "{selectedProgram?.title}"?
                            This action cannot be undone and will permanently remove the program from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            disabled={actionLoading}
                            onClick={() => onDeleteDialogChange(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onConfirmDelete}
                            disabled={actionLoading}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {actionLoading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
