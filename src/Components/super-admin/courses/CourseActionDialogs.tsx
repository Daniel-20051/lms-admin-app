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
import type { Course } from "@/api/courses";

interface CourseActionDialogsProps {
    selectedCourse: Course | null;
    actionLoading: boolean;
    showDeleteDialog: boolean;
    onDeleteDialogChange: (open: boolean) => void;
    onConfirmDelete: () => void;
}

export default function CourseActionDialogs({
    selectedCourse,
    actionLoading,
    showDeleteDialog,
    onDeleteDialogChange,
    onConfirmDelete,
}: CourseActionDialogsProps) {
    return (
        <>
            {/* Delete Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={onDeleteDialogChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Course</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the course "{selectedCourse?.title}" ({selectedCourse?.course_code})?
                            This action cannot be undone and will permanently remove the course from the system.
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

