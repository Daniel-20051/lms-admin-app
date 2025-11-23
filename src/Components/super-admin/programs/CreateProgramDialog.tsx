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
import { createProgram, type CreateProgramData } from "@/api/programs";
import { toast } from "sonner";

interface CreateProgramDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onProgramCreated: () => void;
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

export default function CreateProgramDialog({
    open,
    onOpenChange,
    onProgramCreated,
}: CreateProgramDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateProgramData>({
        title: '',
        description: '',
        faculty_id: 0,
        status: 'Y',
    });

    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        faculty_id?: string;
    }>({});

    // Reset form when dialog opens/closes
    useEffect(() => {
        if (!open) {
            setFormData({
                title: '',
                description: '',
                faculty_id: 0,
                status: 'Y',
            });
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
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

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await createProgram(formData);
            toast.success('Program created successfully');
            onProgramCreated();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error creating program:', error);
            toast.error(error?.response?.data?.message || 'Failed to create program');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Program</DialogTitle>
                    <DialogDescription>
                        Add a new academic program to the system
                    </DialogDescription>
                </DialogHeader>

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
                                value={formData.title}
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
                                value={formData.description}
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
                                value={formData.faculty_id.toString()}
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

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: 'Y' | 'N') => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Y">Active</SelectItem>
                                    <SelectItem value="N">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Set to Active to make this program available immediately
                            </p>
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
                            {loading ? 'Creating...' : 'Create Program'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
