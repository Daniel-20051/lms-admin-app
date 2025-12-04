import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { toast } from "sonner";
import { Loader2, AlertTriangle, CheckCircle, Calendar, DollarSign } from "lucide-react";
import {
    getMyAllocatedCourses,
    registerAllocatedCourses,
    type AllocatedCourse,
} from "@/api/courses";

export default function AllocatedCoursesView() {
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [data, setData] = useState<any>(null);

    // Fetch allocated courses
    useEffect(() => {
        fetchAllocatedCourses();
    }, []);

    const fetchAllocatedCourses = async () => {
        setLoading(true);
        try {
            const response = await getMyAllocatedCourses();
            setData(response.data);
        } catch (error: any) {
            console.error('Error fetching allocated courses:', error);
            if (error?.response?.status !== 404) {
                toast.error('Failed to load allocated courses');
            } else {
                // No allocated courses found
                setData({
                    allocated_courses: [],
                    total_amount: 0,
                    course_count: 0,
                    can_register: false,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setRegistering(true);
        try {
            const response = await registerAllocatedCourses();
            
            toast.success(
                `Successfully registered for ${response.data.registered_count} courses!`,
                {
                    description: `Amount paid: ₦${response.data.payment.amount_debited.toLocaleString()}`,
                    duration: 5000,
                }
            );

            // Show receipt details
            console.log('Registration Receipt:', response.data);

            // Refresh data
            await fetchAllocatedCourses();
            setShowConfirmDialog(false);
        } catch (error: any) {
            console.error('Error registering courses:', error);
            const errorMessage = error?.response?.data?.error || 'Failed to register for courses';
            toast.error(errorMessage);
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!data || data.allocated_courses.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Allocated Courses</CardTitle>
                    <CardDescription>
                        View and register for courses allocated to you
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Courses Allocated</h3>
                        <p className="text-muted-foreground">
                            You don't have any courses allocated for the current semester.
                            Please contact your administrator.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const { semester, allocated_courses, total_amount, course_count, can_register } = data;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Allocated Courses</h1>
                <p className="text-muted-foreground">
                    {semester.academic_year} - {semester.semester} Semester
                </p>
            </div>

            {/* Deadline Warning */}
            {semester.deadline_passed && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Registration Deadline Passed</AlertTitle>
                    <AlertDescription>
                        The registration deadline for this semester has passed. Please contact your
                        administrator to extend the deadline if needed.
                    </AlertDescription>
                </Alert>
            )}

            {/* Semester Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Semester Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Registration Deadline</p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(semester.registration_deadline).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Total Amount</p>
                            <p className="text-sm text-muted-foreground">
                                ₦{total_amount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Total Courses</p>
                            <p className="text-sm text-muted-foreground">
                                {course_count} course{course_count !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Courses Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Allocated Courses</CardTitle>
                    <CardDescription>
                        These courses have been allocated to you for registration
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Course Title</TableHead>
                                    <TableHead>Units</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Allocated Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allocated_courses.map((allocation: AllocatedCourse) => (
                                    <TableRow key={allocation.allocation_id}>
                                        <TableCell className="font-medium">
                                            {allocation.course.course_code}
                                        </TableCell>
                                        <TableCell>{allocation.course.title}</TableCell>
                                        <TableCell>{allocation.course.course_unit}</TableCell>
                                        <TableCell>₦{allocation.price.toLocaleString()}</TableCell>
                                        <TableCell>
                                            {new Date(allocation.allocated_at).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Registration Summary */}
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Registration Summary</h3>
                                <p className="text-sm text-muted-foreground">
                                    You must register for all {course_count} courses at once
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">
                                    ₦{total_amount.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">Total Amount</p>
                            </div>
                        </div>
                    </div>

                    {/* Registration Button */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            size="lg"
                            onClick={() => setShowConfirmDialog(true)}
                            disabled={!can_register}
                        >
                            {can_register ? (
                                <>Register for All Courses</>
                            ) : (
                                <>Registration Not Available</>
                            )}
                        </Button>
                    </div>

                    {/* Info Alert */}
                    <Alert className="mt-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                                <li>You must register for all allocated courses at once</li>
                                <li>The total amount will be deducted from your wallet balance</li>
                                <li>Ensure you have sufficient wallet balance before registering</li>
                                <li>Registration is final and cannot be undone</li>
                            </ul>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Registration</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to register for all {course_count} allocated courses?
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Number of Courses:</span>
                                    <span className="font-semibold">{course_count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Amount:</span>
                                    <span className="font-semibold">
                                        ₦{total_amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-muted-foreground">
                                This amount will be deducted from your wallet balance immediately.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={registering}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRegister}
                            disabled={registering}
                        >
                            {registering ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</>
                            ) : (
                                'Confirm Registration'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

