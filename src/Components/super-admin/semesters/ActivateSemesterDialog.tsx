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
import { AlertTriangle } from "lucide-react";
import { activateSemester } from "@/api/semesters";
import { toast } from "sonner";
import type { Semester } from "@/api/semesters";

interface ActivateSemesterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedSemester: Semester | null;
    onSemesterActivated: () => void;
    actionLoading: boolean;
    setActionLoading: (loading: boolean) => void;
}

export default function ActivateSemesterDialog({
    open,
    onOpenChange,
    selectedSemester,
    onSemesterActivated,
    actionLoading,
    setActionLoading,
}: ActivateSemesterDialogProps) {
    const handleActivate = async () => {
        if (!selectedSemester) return;

        setActionLoading(true);
        try {
            await activateSemester(selectedSemester.id);
            toast.success('Semester activated successfully. All other active semesters have been closed.');
            onSemesterActivated();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error activating semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to activate semester');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Activate Semester
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                        <p>
                            Are you sure you want to activate the semester "{selectedSemester?.academic_year} - {selectedSemester?.semester}"?
                        </p>
                        <p className="font-medium text-yellow-600 dark:text-yellow-500">
                            ⚠️ Warning: This will automatically close all other active semesters in the system.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel 
                        disabled={actionLoading}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleActivate}
                        disabled={actionLoading}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {actionLoading ? "Activating..." : "Activate Semester"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

