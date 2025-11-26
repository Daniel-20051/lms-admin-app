import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { getCourse, type Course } from "@/api/courses";
import { toast } from "sonner";

interface ViewCourseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courseId: number | null;
}

export default function ViewCourseDialog({
    open,
    onOpenChange,
    courseId,
}: ViewCourseDialogProps) {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && courseId) {
            fetchCourse();
        } else {
            setCourse(null);
        }
    }, [open, courseId]);

    const fetchCourse = async () => {
        if (!courseId) return;

        setLoading(true);
        try {
            const response = await getCourse(courseId);
            setCourse(response.data.course);
        } catch (error: any) {
            console.error('Error fetching course:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch course details');
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: string | number, currency: string = 'NGN') => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
        }).format(numAmount);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Course Details</DialogTitle>
                    <DialogDescription>
                        View detailed information about this course
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        <p className="mt-2 text-sm text-muted-foreground">Loading course details...</p>
                    </div>
                ) : course ? (
                    <div className="space-y-6">
                        {/* Course Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Course Information</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">ID:</div>
                                    <div className="col-span-2 text-sm">{course.id}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Course Code:</div>
                                    <div className="col-span-2 text-sm font-medium">{course.course_code}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Title:</div>
                                    <div className="col-span-2 text-sm font-medium">{course.title}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Program:</div>
                                    <div className="col-span-2 text-sm">{course.program.title}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Faculty:</div>
                                    <div className="col-span-2 text-sm">{course.faculty.name}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Instructor:</div>
                                    <div className="col-span-2 text-sm">
                                        {course.instructor ? (
                                            <div>
                                                <div className="font-medium">{course.instructor.full_name}</div>
                                                <div className="text-xs text-muted-foreground">{course.instructor.email}</div>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">Not assigned</span>
                                        )}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Level:</div>
                                    <div className="col-span-2">
                                        <Badge variant="outline">Level {course.course_level}</Badge>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Semester:</div>
                                    <div className="col-span-2 text-sm">{course.semester}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Course Units:</div>
                                    <div className="col-span-2 text-sm">{course.course_unit}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Course Type:</div>
                                    <div className="col-span-2 text-sm">{course.course_type}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Price:</div>
                                    <div className="col-span-2 text-sm font-medium">
                                        {formatCurrency(course.price, course.currency)}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Exam Fee:</div>
                                    <div className="col-span-2 text-sm font-medium">
                                        {formatCurrency(course.exam_fee, course.currency)}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Owner Type:</div>
                                    <div className="col-span-2">
                                        <Badge 
                                            variant={course.owner_type === 'wpu' ? 'default' : 'secondary'}
                                            className={course.owner_type === 'wpu' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'}
                                        >
                                            {course.owner_type === 'wpu' ? 'WPU' : 'Marketplace'}
                                        </Badge>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Marketplace Status:</div>
                                    <div className="col-span-2 text-sm">
                                        {course.is_marketplace ? (
                                            <Badge variant="outline">{course.marketplace_status || 'Active'}</Badge>
                                        ) : (
                                            <span className="text-muted-foreground">Not in marketplace</span>
                                        )}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Date Created:</div>
                                    <div className="col-span-2 text-sm">
                                        {new Date(course.date).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Token:</div>
                                    <div className="col-span-2 text-sm font-mono break-all">{course.token}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-sm text-muted-foreground">No course data available</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

