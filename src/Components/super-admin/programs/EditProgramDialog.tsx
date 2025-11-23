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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { updateProgram, getProgram, type UpdateProgramData } from "@/api/programs";
import { toast } from "sonner";

interface EditProgramDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    programId: number | null;
    onProgramUpdated: () => void;
}

// Mock faculties data - you may want to fetch this from an API
const FACULTIES = [
    { id: 2, name: "Economics & Management" },
    { id: 6, name: "Environmental Science" },
    { id: 8, name: "Science & Technology" },
    { id: 10, name: "Law & Political Science" },
    { id: 12, name: "Communications" },
    { id: 14, name: "College of Education" },
];

export default function EditProgramDialog({
    open,
    onOpenChange,
    programId,
    onProgramUpdated,
}: EditProgramDialogProps) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [formData, setFormData] = useState<UpdateProgramData>({
        title: '',
        description: '',
        faculty_id: 0,
    });

    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        faculty_id?: string;
    }>({});

    // Fetch program data when dialog opens
    useEffect(() => {
        if (open && programId) {
            setFetching(true);
            getProgram(programId)
                .then((response) => {
                    const program = response.data.program;
                    setFormData({
                        title: program.title,
                        description: program.description,
                        faculty_id: program.faculty_id,
                    });
                })
                .catch((error: any) => {
                    console.error('Error fetching program:', error);
                    toast.error(error?.response?.data?.message || 'Failed to fetch program details');
                    onOpenChange(false);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [open, programId, onOpenChange]);

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setFormData({
                title: '',
                description: '',
                faculty_id: 0,
            });
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.title?.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description?.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.faculty_id || formData.faculty_id === 0) {
            newErrors.faculty_id = 'Please select a faculty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!programId || !validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await updateProgram(programId, formData);
            toast.success('Program updated successfully');
            onProgramUpdated();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error updating program:', error);
            toast.error(error?.response?.data?.message || 'Failed to update program');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Program</DialogTitle>
                    <DialogDescription>
                        Update program information
                    </DialogDescription>
                </DialogHeader>

                {fetching ? (
                    <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                        <p className="mt-2 text-sm text-muted-foreground">Loading program details...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Program Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., BSc Computer Science"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={errors.title ? 'border-destructive' : ''}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Description <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter program description..."
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className={errors.description ? 'border-destructive' : ''}
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            {/* Faculty */}
                            <div className="space-y-2">
                                <Label htmlFor="faculty">
                                    Faculty <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.faculty_id?.toString() || ''}
                                    onValueChange={(value) => setFormData({ ...formData, faculty_id: parseInt(value) })}
                                >
                                    <SelectTrigger className={errors.faculty_id ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Select a faculty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FACULTIES.map((faculty) => (
                                            <SelectItem key={faculty.id} value={faculty.id.toString()}>
                                                {faculty.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.faculty_id && (
                                    <p className="text-sm text-destructive">{errors.faculty_id}</p>
                                )}
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
                                {loading ? 'Updating...' : 'Update Program'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

