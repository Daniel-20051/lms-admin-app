import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogBody,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { createSemester, type CreateSemesterData } from "@/api/semesters";
import { toast } from "sonner";

interface CreateSemesterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSemesterCreated: () => void;
}

const SEMESTERS = ['1ST', '2ND'];
const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
];

export default function CreateSemesterDialog({
    open,
    onOpenChange,
    onSemesterCreated,
}: CreateSemesterDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateSemesterData>({
        academic_year: '',
        semester: '1ST',
        start_date: '',
        end_date: '',
        status: 'pending',
    });

    const [errors, setErrors] = useState<{
        academic_year?: string;
        semester?: string;
        start_date?: string;
        end_date?: string;
        status?: string;
    }>({});

    // Reset form when dialog opens/closes
    useEffect(() => {
        if (!open) {
            // Generate default academic year (current year/next year)
            const currentYear = new Date().getFullYear();
            const nextYear = currentYear + 1;
            const defaultAcademicYear = `${currentYear}/${nextYear}`;
            
            setFormData({
                academic_year: defaultAcademicYear,
                semester: '1ST',
                start_date: '',
                end_date: '',
                status: 'pending',
            });
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        // Validate academic year format (YYYY/YYYY)
        const academicYearPattern = /^\d{4}\/\d{4}$/;
        if (!formData.academic_year.trim()) {
            newErrors.academic_year = 'Academic year is required';
        } else if (!academicYearPattern.test(formData.academic_year)) {
            newErrors.academic_year = 'Academic year must be in format YYYY/YYYY (e.g., 2024/2025)';
        }

        if (!formData.semester) {
            newErrors.semester = 'Semester is required';
        }

        if (!formData.start_date) {
            newErrors.start_date = 'Start date is required';
        }

        if (!formData.end_date) {
            newErrors.end_date = 'End date is required';
        }

        // Validate that end date is after start date
        if (formData.start_date && formData.end_date) {
            const startDate = new Date(formData.start_date);
            const endDate = new Date(formData.end_date);
            
            if (endDate <= startDate) {
                newErrors.end_date = 'End date must be after start date';
            }
        }

        if (!formData.status) {
            newErrors.status = 'Status is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Convert semester from "1ST"/"2ND" to "1"/"2" for API
            const semesterValue = formData.semester === '1ST' ? '1' : formData.semester === '2ND' ? '2' : formData.semester;
            const submitData = {
                ...formData,
                semester: semesterValue,
            };
            await createSemester(submitData);
            toast.success('Semester created successfully');
            onSemesterCreated();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error creating semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to create semester');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Semester</DialogTitle>
                    <DialogDescription>
                        Add a new academic semester to the system
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        {/* Academic Year */}
                        <div className="space-y-2">
                            <Label htmlFor="academic_year">
                                Academic Year <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="academic_year"
                                placeholder="e.g., 2024/2025"
                                value={formData.academic_year}
                                onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                                className={errors.academic_year ? 'border-destructive' : ''}
                            />
                            {errors.academic_year && (
                                <p className="text-sm text-destructive">{errors.academic_year}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Format: YYYY/YYYY (e.g., 2024/2025)
                            </p>
                        </div>

                        {/* Grid: Semester and Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Semester */}
                            <div className="space-y-2">
                                <Label htmlFor="semester">
                                    Semester <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.semester}
                                    onValueChange={(value) => setFormData({ ...formData, semester: value })}
                                >
                                    <SelectTrigger className={errors.semester ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SEMESTERS.map((semester) => (
                                            <SelectItem key={semester} value={semester}>
                                                {semester} Semester
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.semester && (
                                    <p className="text-sm text-destructive">{errors.semester}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">
                                    Status <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: 'pending' | 'active' | 'closed') => 
                                        setFormData({ ...formData, status: value })
                                    }
                                >
                                    <SelectTrigger className={errors.status ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUS_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">{errors.status}</p>
                                )}
                            </div>
                        </div>

                        {/* Grid: Start Date and End Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Start Date */}
                            <div className="space-y-2">
                                <Label htmlFor="start_date">
                                    Start Date <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className={errors.start_date ? 'border-destructive' : ''}
                                />
                                {errors.start_date && (
                                    <p className="text-sm text-destructive">{errors.start_date}</p>
                                )}
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <Label htmlFor="end_date">
                                    End Date <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    min={formData.start_date || undefined}
                                    className={errors.end_date ? 'border-destructive' : ''}
                                />
                                {errors.end_date && (
                                    <p className="text-sm text-destructive">{errors.end_date}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Semester'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

