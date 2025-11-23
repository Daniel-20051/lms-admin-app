import { useState, useEffect } from 'react';
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
import { closeSemester } from "@/api/semesters";
import { toast } from "sonner";
import type { Semester } from "@/api/semesters";

interface CloseSemesterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedSemester: Semester | null;
    onSemesterClosed: () => void;
    actionLoading: boolean;
    setActionLoading: (loading: boolean) => void;
}

export default function CloseSemesterDialog({
    open,
    onOpenChange,
    selectedSemester,
    onSemesterClosed,
    actionLoading,
    setActionLoading,
}: CloseSemesterDialogProps) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!open) {
            setReason('');
            setError('');
        }
    }, [open]);

    const handleClose = async () => {
        if (!selectedSemester) return;

        if (!reason.trim()) {
            setError('Reason is required');
            return;
        }

        setActionLoading(true);
        try {
            await closeSemester(selectedSemester.id, { reason: reason.trim() });
            toast.success('Semester closed successfully');
            onSemesterClosed();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error closing semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to close semester');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Close Semester</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to close the semester "{selectedSemester?.academic_year} - {selectedSemester?.semester}"?
                        Please provide a reason for closing this semester.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="reason">
                            Reason <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="reason"
                            placeholder="e.g., End of academic session"
                            value={reason}
                            onChange={(e) => {
                                setReason(e.target.value);
                                setError('');
                            }}
                            className={error ? 'border-destructive' : ''}
                            rows={3}
                        />
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel 
                        disabled={actionLoading}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClose}
                        disabled={actionLoading}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {actionLoading ? "Closing..." : "Close Semester"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

