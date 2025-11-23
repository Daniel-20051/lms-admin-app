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
import { getSemester, type Semester } from "@/api/semesters";
import { toast } from "sonner";

interface ViewSemesterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    semesterId: number | null;
}

export default function ViewSemesterDialog({
    open,
    onOpenChange,
    semesterId,
}: ViewSemesterDialogProps) {
    const [semester, setSemester] = useState<Semester | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && semesterId) {
            fetchSemester();
        } else {
            setSemester(null);
        }
    }, [open, semesterId]);

    const fetchSemester = async () => {
        if (!semesterId) return;

        setLoading(true);
        try {
            const response = await getSemester(semesterId);
            setSemester(response.data.semester);
        } catch (error: any) {
            console.error('Error fetching semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch semester details');
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return <Badge variant="default" className="bg-green-500">Active</Badge>;
            case 'closed':
                return <Badge variant="secondary" className="bg-gray-500 text-white">Closed</Badge>;
            case 'pending':
                return <Badge variant="outline" className="bg-yellow-500 text-white">Pending</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    const formatDateFull = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Semester Details</DialogTitle>
                    <DialogDescription>
                        View detailed information about this semester
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        <p className="mt-2 text-sm text-muted-foreground">Loading semester details...</p>
                    </div>
                ) : semester ? (
                    <div className="space-y-6">
                        {/* Semester Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Semester Information</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">ID:</div>
                                    <div className="col-span-2 text-sm">{semester.id}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Academic Year:</div>
                                    <div className="col-span-2 text-sm font-medium">{semester.academic_year}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Semester:</div>
                                    <div className="col-span-2 text-sm font-medium">{semester.semester}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Status:</div>
                                    <div className="col-span-2">
                                        {getStatusBadge(semester.status)}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Start Date:</div>
                                    <div className="col-span-2 text-sm">{formatDate(semester.start_date)}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">End Date:</div>
                                    <div className="col-span-2 text-sm">{formatDate(semester.end_date)}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Date Created:</div>
                                    <div className="col-span-2 text-sm">
                                        {formatDateFull(semester.date)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-sm text-muted-foreground">No semester data available</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

