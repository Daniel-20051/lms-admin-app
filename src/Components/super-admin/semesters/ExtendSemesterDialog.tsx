import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { extendSemester } from "@/api/semesters";
import { toast } from "sonner";
import type { Semester } from "@/api/semesters";

interface ExtendSemesterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedSemester: Semester | null;
    onSemesterExtended: () => void;
    actionLoading: boolean;
    setActionLoading: (loading: boolean) => void;
}

export default function ExtendSemesterDialog({
    open,
    onOpenChange,
    selectedSemester,
    onSemesterExtended,
    actionLoading,
    setActionLoading,
}: ExtendSemesterDialogProps) {
    const [newEndDate, setNewEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [errors, setErrors] = useState<{
        new_end_date?: string;
        reason?: string;
    }>({});

    useEffect(() => {
        if (open && selectedSemester) {
            setNewEndDate('');
            setReason('');
            setErrors({});
        }
    }, [open, selectedSemester]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!newEndDate) {
            newErrors.new_end_date = 'New end date is required';
        } else if (selectedSemester) {
            const currentEndDate = new Date(selectedSemester.end_date);
            const newEnd = new Date(newEndDate);
            
            if (newEnd <= currentEndDate) {
                newErrors.new_end_date = 'New end date must be after current end date';
            }
        }

        if (!reason.trim()) {
            newErrors.reason = 'Reason is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedSemester || !validateForm()) {
            return;
        }

        setActionLoading(true);
        try {
            await extendSemester(selectedSemester.id, {
                new_end_date: newEndDate,
                reason: reason.trim(),
            });
            toast.success('Semester extended successfully');
            onSemesterExtended();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error extending semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to extend semester');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Extend Semester</DialogTitle>
                    <DialogDescription>
                        Extend the end date for "{selectedSemester?.academic_year} - {selectedSemester?.semester}"
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        {/* Current End Date Info */}
                        {selectedSemester && (
                            <div className="p-3 bg-muted rounded-md">
                                <p className="text-sm text-muted-foreground">
                                    Current end date: <span className="font-medium">{new Date(selectedSemester.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </p>
                            </div>
                        )}

                        {/* New End Date */}
                        <div className="space-y-2">
                            <Label htmlFor="new_end_date">
                                New End Date <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="new_end_date"
                                type="date"
                                value={newEndDate}
                                onChange={(e) => {
                                    setNewEndDate(e.target.value);
                                    setErrors({ ...errors, new_end_date: undefined });
                                }}
                                min={selectedSemester ? selectedSemester.end_date : undefined}
                                className={errors.new_end_date ? 'border-destructive' : ''}
                            />
                            {errors.new_end_date && (
                                <p className="text-sm text-destructive">{errors.new_end_date}</p>
                            )}
                        </div>

                        {/* Reason */}
                        <div className="space-y-2">
                            <Label htmlFor="reason">
                                Reason <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="reason"
                                placeholder="e.g., Extended due to holidays"
                                value={reason}
                                onChange={(e) => {
                                    setReason(e.target.value);
                                    setErrors({ ...errors, reason: undefined });
                                }}
                                className={errors.reason ? 'border-destructive' : ''}
                                rows={3}
                            />
                            {errors.reason && (
                                <p className="text-sm text-destructive">{errors.reason}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={actionLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={actionLoading}>
                            {actionLoading ? 'Extending...' : 'Extend Semester'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

