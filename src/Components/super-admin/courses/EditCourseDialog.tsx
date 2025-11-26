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
import { updateCourse, getCourse, type UpdateCourseData } from "@/api/courses";
import { getPrograms } from "@/api/programs";
import { getStaff } from "@/api/admin";
import { toast } from "sonner";

interface EditCourseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courseId: number | null;
    onCourseUpdated: () => void;
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

const COURSE_TYPES = ['Core', 'Elective', 'General'];
const LEVELS = [100, 200, 300, 400, 500];
const SEMESTERS = ['1ST', '2ND'];
const CURRENCIES = ['NGN', 'USD', 'EUR', 'GBP'];
const OWNER_TYPES = [
    { value: 'wpu', label: 'WPU' },
    { value: 'sole_tutor', label: 'Sole Tutor' },
    { value: 'organization', label: 'Organization' },
];

export default function EditCourseDialog({
    open,
    onOpenChange,
    courseId,
    onCourseUpdated,
}: EditCourseDialogProps) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [fetchingCourse, setFetchingCourse] = useState(false);
    const [programs, setPrograms] = useState<Array<{ id: number; title: string }>>([]);
    const [staff, setStaff] = useState<Array<{ id: number; full_name: string }>>([]);
    
    const [formData, setFormData] = useState<UpdateCourseData>({
        title: '',
        course_code: '',
        course_unit: 0,
        price: '0',
        course_type: 'Core',
        course_level: 100,
        semester: '1ST',
        staff_id: 0,
        program_id: 0,
        faculty_id: 0,
        currency: 'NGN',
        owner_type: 'wpu',
        is_marketplace: false,
        owner_id: null,
    });

    const [errors, setErrors] = useState<{
        title?: string;
        course_code?: string;
        course_unit?: string;
        price?: string;
        course_type?: string;
        course_level?: string;
        semester?: string;
        staff_id?: string;
        program_id?: string;
        faculty_id?: string;
        currency?: string;
        owner_type?: string;
        owner_id?: string;
    }>({});

    // Fetch programs and staff when dialog opens
    useEffect(() => {
        if (open) {
            fetchProgramsAndStaff();
        }
    }, [open]);

    // Fetch course data when dialog opens
    useEffect(() => {
        if (open && courseId) {
            fetchCourse();
        }
    }, [open, courseId]);

    const fetchProgramsAndStaff = async () => {
        setFetching(true);
        try {
            // Fetch programs
            const programsResponse = await getPrograms({ limit: 1000 });
            setPrograms(programsResponse.data.programs.map(p => ({ id: p.id, title: p.title })));

            // Fetch staff
            const staffResponse = await getStaff({ limit: 1000 });
            setStaff(staffResponse.data.staff.map(s => ({ id: s.id, full_name: s.full_name })));
        } catch (error: any) {
            console.error('Error fetching programs/staff:', error);
            toast.error('Failed to load programs and staff');
        } finally {
            setFetching(false);
        }
    };

    const fetchCourse = async () => {
        if (!courseId) return;

        setFetchingCourse(true);
        try {
            const response = await getCourse(courseId);
            const course = response.data.course;
            setFormData({
                title: course.title,
                course_code: course.course_code,
                course_unit: course.course_unit,
                price: course.price,
                course_type: course.course_type,
                course_level: course.course_level,
                semester: course.semester,
                staff_id: course.staff_id,
                program_id: course.program_id,
                faculty_id: course.faculty_id,
                currency: course.currency,
                owner_type: course.owner_type as 'wpu' | 'sole_tutor' | 'organization',
                is_marketplace: course.is_marketplace,
                owner_id: course.owner_id,
            });
        } catch (error: any) {
            console.error('Error fetching course:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch course details');
            onOpenChange(false);
        } finally {
            setFetchingCourse(false);
        }
    };

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setFormData({
                title: '',
                course_code: '',
                course_unit: 0,
                price: '0',
                course_type: 'Core',
                course_level: 100,
                semester: '1ST',
                staff_id: 0,
                program_id: 0,
                faculty_id: 0,
                currency: 'NGN',
                owner_type: 'wpu',
                is_marketplace: false,
                owner_id: null,
            });
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (formData.title !== undefined && !formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (formData.course_code !== undefined && !formData.course_code.trim()) {
            newErrors.course_code = 'Course code is required';
        }

        if (formData.course_unit !== undefined && formData.course_unit <= 0) {
            newErrors.course_unit = 'Course unit must be greater than 0';
        }

        if (formData.price !== undefined && parseFloat(formData.price) < 0) {
            newErrors.price = 'Price must be 0 or greater';
        }

        if (formData.staff_id !== undefined && (!formData.staff_id || formData.staff_id === 0)) {
            newErrors.staff_id = 'Please select an instructor';
        }

        if (formData.program_id !== undefined && (!formData.program_id || formData.program_id === 0)) {
            newErrors.program_id = 'Please select a program';
        }

        if (formData.faculty_id !== undefined && (!formData.faculty_id || formData.faculty_id === 0)) {
            newErrors.faculty_id = 'Please select a faculty';
        }

        // If marketplace, require owner_id
        if (formData.is_marketplace && !formData.owner_id) {
            newErrors.owner_id = 'Owner ID is required for marketplace courses';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!courseId || !validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const submitData: UpdateCourseData = {
                ...formData,
                owner_id: formData.is_marketplace ? formData.owner_id : null,
            };
            await updateCourse(courseId, submitData);
            toast.success('Course updated successfully');
            onCourseUpdated();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error updating course:', error);
            toast.error(error?.response?.data?.message || 'Failed to update course');
        } finally {
            setLoading(false);
        }
    };

    const isLoading = fetching || fetchingCourse;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                    <DialogDescription>
                        Update course information
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            {fetchingCourse ? 'Loading course details...' : 'Loading programs and staff...'}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Course Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Introduction to Programming"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={errors.title ? 'border-destructive' : ''}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            {/* Course Code */}
                            <div className="space-y-2">
                                <Label htmlFor="course_code">
                                    Course Code <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="course_code"
                                    placeholder="e.g., CSC101"
                                    value={formData.course_code || ''}
                                    onChange={(e) => setFormData({ ...formData, course_code: e.target.value.toUpperCase() })}
                                    className={errors.course_code ? 'border-destructive' : ''}
                                />
                                {errors.course_code && (
                                    <p className="text-sm text-destructive">{errors.course_code}</p>
                                )}
                            </div>

                            {/* Grid: Course Unit, Level, Semester */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Course Unit */}
                                <div className="space-y-2">
                                    <Label htmlFor="course_unit">
                                        Course Unit <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="course_unit"
                                        type="number"
                                        min="1"
                                        placeholder="e.g., 3"
                                        value={formData.course_unit || ''}
                                        onChange={(e) => setFormData({ ...formData, course_unit: parseInt(e.target.value) || 0 })}
                                        className={errors.course_unit ? 'border-destructive' : ''}
                                    />
                                    {errors.course_unit && (
                                        <p className="text-sm text-destructive">{errors.course_unit}</p>
                                    )}
                                </div>

                                {/* Course Level */}
                                <div className="space-y-2">
                                    <Label htmlFor="course_level">
                                        Course Level <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.course_level?.toString() || ''}
                                        onValueChange={(value) => setFormData({ ...formData, course_level: parseInt(value) })}
                                    >
                                        <SelectTrigger className={errors.course_level ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {LEVELS.map((level) => (
                                                <SelectItem key={level} value={level.toString()}>
                                                    Level {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.course_level && (
                                        <p className="text-sm text-destructive">{errors.course_level}</p>
                                    )}
                                </div>

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
                            </div>

                            {/* Grid: Program, Faculty, Instructor */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Program */}
                                <div className="space-y-2">
                                    <Label htmlFor="program">
                                        Program <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.program_id?.toString() || ''}
                                        onValueChange={(value) => setFormData({ ...formData, program_id: parseInt(value) })}
                                    >
                                        <SelectTrigger className={errors.program_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {programs.map((program) => (
                                                <SelectItem key={program.id} value={program.id.toString()}>
                                                    {program.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.program_id && (
                                        <p className="text-sm text-destructive">{errors.program_id}</p>
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
                                            <SelectValue placeholder="Select faculty" />
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

                                {/* Instructor (Staff) */}
                                <div className="space-y-2">
                                    <Label htmlFor="staff">
                                        Instructor <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.staff_id?.toString() || ''}
                                        onValueChange={(value) => setFormData({ ...formData, staff_id: parseInt(value) })}
                                    >
                                        <SelectTrigger className={errors.staff_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select instructor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {staff.map((s) => (
                                                <SelectItem key={s.id} value={s.id.toString()}>
                                                    {s.full_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.staff_id && (
                                        <p className="text-sm text-destructive">{errors.staff_id}</p>
                                    )}
                                </div>
                            </div>

                            {/* Grid: Course Type, Price, Currency */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Course Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="course_type">
                                        Course Type <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.course_type || ''}
                                        onValueChange={(value) => setFormData({ ...formData, course_type: value })}
                                    >
                                        <SelectTrigger className={errors.course_type ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {COURSE_TYPES.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.course_type && (
                                        <p className="text-sm text-destructive">{errors.course_type}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <Label htmlFor="price">
                                        Price <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={formData.price || ''}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className={errors.price ? 'border-destructive' : ''}
                                    />
                                    {errors.price && (
                                        <p className="text-sm text-destructive">{errors.price}</p>
                                    )}
                                </div>

                                {/* Currency */}
                                <div className="space-y-2">
                                    <Label htmlFor="currency">
                                        Currency <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.currency || ''}
                                        onValueChange={(value) => setFormData({ ...formData, currency: value })}
                                    >
                                        <SelectTrigger className={errors.currency ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CURRENCIES.map((currency) => (
                                                <SelectItem key={currency} value={currency}>
                                                    {currency}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.currency && (
                                        <p className="text-sm text-destructive">{errors.currency}</p>
                                    )}
                                </div>
                            </div>

                            {/* Owner Type and Marketplace */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Owner Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="owner_type">
                                        Owner Type <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.owner_type || ''}
                                        onValueChange={(value: 'wpu' | 'sole_tutor' | 'organization') => 
                                            setFormData({ ...formData, owner_type: value })
                                        }
                                    >
                                        <SelectTrigger className={errors.owner_type ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select owner type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {OWNER_TYPES.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.owner_type && (
                                        <p className="text-sm text-destructive">{errors.owner_type}</p>
                                    )}
                                </div>

                                {/* Is Marketplace */}
                                <div className="space-y-2">
                                    <Label htmlFor="is_marketplace">Marketplace</Label>
                                    <Select
                                        value={formData.is_marketplace ? 'true' : 'false'}
                                        onValueChange={(value) => 
                                            setFormData({ 
                                                ...formData, 
                                                is_marketplace: value === 'true',
                                                owner_id: value === 'true' ? formData.owner_id : null
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="false">No</SelectItem>
                                            <SelectItem value="true">Yes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Owner ID (only if marketplace) */}
                            {formData.is_marketplace && (
                                <div className="space-y-2">
                                    <Label htmlFor="owner_id">
                                        Owner ID <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="owner_id"
                                        type="number"
                                        min="1"
                                        placeholder="Enter owner ID"
                                        value={formData.owner_id || ''}
                                        onChange={(e) => setFormData({ ...formData, owner_id: parseInt(e.target.value) || null })}
                                        className={errors.owner_id ? 'border-destructive' : ''}
                                    />
                                    {errors.owner_id && (
                                        <p className="text-sm text-destructive">{errors.owner_id}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Required when course is in marketplace
                                    </p>
                                </div>
                            )}
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
                                {loading ? 'Updating...' : 'Update Course'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

