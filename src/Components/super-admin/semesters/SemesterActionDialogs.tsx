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
import { deleteSemester } from "@/api/semesters";
import { toast } from "sonner";
import type { Semester } from "@/api/semesters";

interface SemesterActionDialogsProps {
    selectedSemester: Semester | null;
    actionLoading: boolean;
    showDeleteDialog: boolean;
    onDeleteDialogChange: (open: boolean) => void;
    onConfirmDelete: () => void;
}

export default function SemesterActionDialogs({
    selectedSemester,
    actionLoading,
    showDeleteDialog,
    onDeleteDialogChange,
    onConfirmDelete,
}: SemesterActionDialogsProps) {
    return (
        <>
            {/* Delete Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={onDeleteDialogChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Semester</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            <p>
                                Are you sure you want to delete the semester "{selectedSemester?.academic_year} - {selectedSemester?.semester}"?
                                This action cannot be undone and will permanently remove the semester from the system.
                            </p>
                            {selectedSemester?.status === 'Active' && (
                                <p className="font-medium text-destructive">
                                    ⚠️ Note: You cannot delete an active semester. Please close it first.
                                </p>
                            )}
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
                            disabled={actionLoading || selectedSemester?.status === 'Active'}
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

