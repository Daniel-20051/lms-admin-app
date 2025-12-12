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
import { createCourse, type CreateCourseData } from "@/api/courses";
import { getPrograms } from "@/api/programs";
import { getStaff } from "@/api/admin";
import { getFaculties, type Faculty } from "@/api/base";
import { Api } from "@/api";
import { toast } from "sonner";

interface CreateCourseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCourseCreated: () => void;
}


const COURSE_TYPES = ['Core', 'Elective', 'General'];
const LEVELS = [100, 200, 300, 400, 500, 600, 700];
const SEMESTERS = ['1ST', '2ND'];
const CURRENCIES = ['NGN', 'USD', 'EUR', 'GBP'];
const OWNER_TYPES = [
    { value: 'wpu', label: 'WPU' },
    { value: 'sole_tutor', label: 'Sole Tutor' },
    { value: 'organization', label: 'Organization' },
];

const MARKETPLACE_STATUSES = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
];

export default function CreateCourseDialog({
    open,
    onOpenChange,
    onCourseCreated,
}: CreateCourseDialogProps) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [programs, setPrograms] = useState<Array<{ id: number; title: string }>>([]);
    const [staff, setStaff] = useState<Array<{ id: number; full_name: string }>>([]);
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    
    const [formData, setFormData] = useState<CreateCourseData>({
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
        marketplace_status: null,
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

    // Fetch programs, staff, and faculties when dialog opens
    useEffect(() => {
        if (open) {
            fetchProgramsStaffAndFaculties();
            loadActiveSemester();
        }
    }, [open]);

    const fetchProgramsStaffAndFaculties = async () => {
        setFetching(true);
        try {
            // Fetch programs, staff, and faculties in parallel
            const [programsResponse, staffResponse, facultiesResponse] = await Promise.all([
                getPrograms({ limit: 1000 }),
                getStaff({ limit: 1000 }),
                getFaculties({ limit: 1000 }),
            ]);

            setPrograms(programsResponse.data.programs.map(p => ({ id: p.id, title: p.title })));
            setStaff(staffResponse.data.staff.map(s => ({ id: s.id, full_name: s.full_name })));
            setFaculties(facultiesResponse.data.faculties);
        } catch (error: any) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load programs, staff, and faculties');
        } finally {
            setFetching(false);
        }
    };

    const loadActiveSemester = async () => {
        try {
            const api = new Api();
            const response = await api.Getsessions();
            const items = response?.data?.data ?? response?.data ?? [];

            if (Array.isArray(items) && items.length > 0) {
                // Find active semester
                const active = items.find((it: any) => it.status === "Active");
                
                if (active?.semester) {
                    setFormData((prev) => ({
                        ...prev,
                        semester: active.semester,
                    }));
                }
            }
        } catch (error) {
            // Silently fail - will default to '1ST' if active semester not found
            console.error('Error loading active semester:', error);
        }
    };

    // Reset form when dialog opens/closes
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
                marketplace_status: null,
                owner_id: null,
            });
            setErrors({});
        }
    }, [open]);

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.course_code.trim()) {
            newErrors.course_code = 'Course code is required';
        }

        if (!formData.course_unit || formData.course_unit <= 0) {
            newErrors.course_unit = 'Course unit must be greater than 0';
        }

        if (!formData.price || parseFloat(formData.price) < 0) {
            newErrors.price = 'Price must be 0 or greater';
        }

        if (!formData.course_type) {
            newErrors.course_type = 'Course type is required';
        }

        if (!formData.course_level) {
            newErrors.course_level = 'Course level is required';
        }

        if (!formData.semester) {
            newErrors.semester = 'Semester is required';
        }

        if (!formData.staff_id || formData.staff_id === 0) {
            newErrors.staff_id = 'Please select an instructor';
        }

        if (!formData.program_id || formData.program_id === 0) {
            newErrors.program_id = 'Please select a program';
        }

        if (!formData.faculty_id || formData.faculty_id === 0) {
            newErrors.faculty_id = 'Please select a faculty';
        }

        if (!formData.currency) {
            newErrors.currency = 'Currency is required';
        }

        if (!formData.owner_type) {
            newErrors.owner_type = 'Owner type is required';
        }

        // Marketplace validation
        if (formData.is_marketplace) {
            // If publishing, require price > 0
            if (formData.marketplace_status === 'published') {
                if (!formData.price || parseFloat(formData.price) <= 0) {
                    newErrors.price = 'Price must be greater than 0 for published marketplace courses';
                }
            }
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
            const submitData: CreateCourseData = {
                ...formData,
                owner_id: formData.is_marketplace ? formData.owner_id : null,
            };
            await createCourse(submitData);
            toast.success('Course created successfully');
            onCourseCreated();
            onOpenChange(false);
        } catch (error: any) {
            console.error('Error creating course:', error);
            toast.error(error?.response?.data?.message || 'Failed to create course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                        Add a new course to the system
                    </DialogDescription>
                </DialogHeader>

                <DialogBody>
                {fetching ? (
                    <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                        <p className="mt-2 text-sm text-muted-foreground">Loading programs, staff, and faculties...</p>
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
                                    value={formData.title}
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
                                    value={formData.course_code}
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
                                        value={formData.course_level.toString()}
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
                            </div>

                            {/* Grid: Program, Faculty, Instructor */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Program */}
                                <div className="space-y-2">
                                    <Label htmlFor="program">
                                        Program <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.program_id.toString()}
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
                                        value={formData.faculty_id.toString()}
                                        onValueChange={(value) => setFormData({ ...formData, faculty_id: parseInt(value) })}
                                    >
                                        <SelectTrigger className={errors.faculty_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select faculty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {faculties.length === 0 ? (
                                                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                                    No faculties available
                                                </div>
                                            ) : (
                                                faculties.map((faculty) => (
                                                    <SelectItem key={faculty.id} value={faculty.id.toString()}>
                                                        {faculty.name}
                                                    </SelectItem>
                                                ))
                                            )}
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
                                        value={formData.staff_id.toString()}
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
                                        value={formData.course_type}
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
                                        value={formData.price}
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
                                        value={formData.currency}
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
                                        value={formData.owner_type}
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
                                    <Label htmlFor="is_marketplace">List on Marketplace</Label>
                                    <Select
                                        value={formData.is_marketplace ? 'true' : 'false'}
                                        onValueChange={(value) => {
                                            const isMarketplace = value === 'true';
                                            setFormData({ 
                                                ...formData, 
                                                is_marketplace: isMarketplace,
                                                marketplace_status: isMarketplace ? (formData.marketplace_status || 'draft') : null,
                                                owner_id: isMarketplace ? formData.owner_id : null
                                            });
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="false">No</SelectItem>
                                            <SelectItem value="true">Yes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formData.is_marketplace && (
                                        <p className="text-xs text-amber-600">
                                            Marketplace courses require payment from all students
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Marketplace Status (only if marketplace) */}
                            {formData.is_marketplace && (
                                <div className="space-y-2">
                                    <Label htmlFor="marketplace_status">
                                        Marketplace Status
                                    </Label>
                                    <Select
                                        value={formData.marketplace_status || 'draft'}
                                        onValueChange={(value) => {
                                            const status = value === 'draft' ? 'draft' : value === 'published' ? 'published' : null;
                                            setFormData({ 
                                                ...formData, 
                                                marketplace_status: status as 'draft' | 'published' | null
                                            });
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {MARKETPLACE_STATUSES.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {formData.marketplace_status === 'published' && (
                                        <p className="text-xs text-amber-600">
                                            Published courses require price &gt; 0
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Owner ID (only if marketplace and not WPU) */}
                            {formData.is_marketplace && formData.owner_type !== 'wpu' && (
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
                                        Required when course is in marketplace (non-WPU)
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
                                {loading ? 'Creating...' : 'Create Course'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}

