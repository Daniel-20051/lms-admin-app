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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { updateSemester, getSemester, type UpdateSemesterData } from "@/api/semesters";
import { toast } from "sonner";

interface EditSemesterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    semesterId: number | null;
    onSemesterUpdated: () => void;
}

const SEMESTERS = ['1ST', '2ND'];
const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
];

export default function EditSemesterDialog({
    open,
    onOpenChange,
    semesterId,
    onSemesterUpdated,
}: EditSemesterDialogProps) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [formData, setFormData] = useState<UpdateSemesterData>({
        academic_year: '',
        semester: '',
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

    // Fetch semester data when dialog opens
    useEffect(() => {
        if (open && semesterId) {
            fetchSemester();
        }
    }, [open, semesterId]);

    const fetchSemester = async () => {
        if (!semesterId) return;

        setFetching(true);
        try {
            const response = await getSemester(semesterId);
            const semester = response.data.semester;
            // Convert semester from "1"/"2" to "1ST"/"2ND" for form
            const semesterValue = semester.semester === '1' ? '1ST' : semester.semester === '2' ? '2ND' : semester.semester;
            setFormData({
                academic_year: semester.academic_year,
                semester: semesterValue,
                start_date: semester.start_date,
                end_date: semester.end_date,
                status: semester.status.toLowerCase() as 'pending' | 'active' | 'closed',
            });
        } catch (error: any) {
            console.error('Error fetching semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch semester details');
            onOpenChange(false);
        } finally {
            setFetching(false);
        }
    };

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setFormData({
                academic_year: '',
                semester: '',
                start_date: '',
                end_date: '',
                status: 'pending',
            });
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (formData.academic_year !== undefined) {
            const academicYearPattern = /^\d{4}\/\d{4}$/;
            if (!formData.academic_year.trim()) {
                newErrors.academic_year = 'Academic year is required';
            } else if (!academicYearPattern.test(formData.academic_year)) {
                newErrors.academic_year = 'Academic year must be in format YYYY/YYYY (e.g., 2024/2025)';
            }
        }

        if (formData.start_date && formData.end_date) {
            const startDate = new Date(formData.start_date);
            const endDate = new Date(formData.end_date);
            
            if (endDate <= startDate) {
                newErrors.end_date = 'End date must be after start date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!semesterId || !validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Convert semester from "1ST"/"2ND" to "1"/"2" for API if needed
            const updateData: UpdateSemesterData = { ...formData };
            if (updateData.semester) {
                updateData.semester = updateData.semester === '1ST' ? '1' : updateData.semester === '2ND' ? '2' : updateData.semester;
            }
            await updateSemester(semesterId, updateData);
            toast.success('Semester updated successfully');
            onSemesterUpdated();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error updating semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to update semester');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Semester</DialogTitle>
                    <DialogDescription>
                        Update semester information
                    </DialogDescription>
                </DialogHeader>

                {fetching ? (
                    <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                        <p className="mt-2 text-sm text-muted-foreground">Loading semester details...</p>
                    </div>
                ) : (
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
                                    value={formData.academic_year || ''}
                                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                                    className={errors.academic_year ? 'border-destructive' : ''}
                                />
                                {errors.academic_year && (
                                    <p className="text-sm text-destructive">{errors.academic_year}</p>
                                )}
                            </div>

                            {/* Grid: Semester and Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Semester */}
                                <div className="space-y-2">
                                    <Label htmlFor="semester">
                                        Semester <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.semester || ''}
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
                                        value={formData.status || ''}
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
                                        value={formData.start_date || ''}
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
                                        value={formData.end_date || ''}
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
                                {loading ? 'Updating...' : 'Update Semester'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

