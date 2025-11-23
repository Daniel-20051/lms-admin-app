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
import { getProgram, type Program } from "@/api/programs";
import { toast } from "sonner";

interface ViewProgramDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    programId: number | null;
}

export default function ViewProgramDialog({
    open,
    onOpenChange,
    programId,
}: ViewProgramDialogProps) {
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && programId) {
            fetchProgram();
        }
    }, [open, programId]);

    const fetchProgram = async () => {
        if (!programId) return;

        setLoading(true);
        try {
            const response = await getProgram(programId);
            setProgram(response.data.program);
        } catch (error: any) {
            console.error('Error fetching program:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch program details');
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Program Details</DialogTitle>
                    <DialogDescription>
                        View detailed information about this program
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                        <p className="mt-2 text-sm text-muted-foreground">Loading program details...</p>
                    </div>
                ) : program ? (
                    <div className="space-y-6">
                        {/* Program Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Program Information</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">ID:</div>
                                    <div className="col-span-2 text-sm">{program.id}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Title:</div>
                                    <div className="col-span-2 text-sm font-medium">{program.title}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Description:</div>
                                    <div className="col-span-2 text-sm">{program.description}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Faculty:</div>
                                    <div className="col-span-2 text-sm">{program.faculty.name}</div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Status:</div>
                                    <div className="col-span-2">
                                        {program.status === 'Y' ? (
                                            <Badge variant="default" className="bg-green-500">Active</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-gray-500 text-white">Inactive</Badge>
                                        )}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-sm font-medium text-muted-foreground">Date Created:</div>
                                    <div className="col-span-2 text-sm">
                                        {new Date(program.date).toLocaleString('en-US', {
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
                                    <div className="col-span-2 text-sm font-mono text-xs break-all">{program.token}</div>
                                </div>
                            </div>
                        </div>

                        {/* Courses Section */}
                        {program.courses && program.courses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Courses in Program</h3>
                                <div className="space-y-2">
                                    {program.courses.map((course) => (
                                        <div key={course.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                                            <div>
                                                <div className="font-medium text-sm">{course.title}</div>
                                                <div className="text-xs text-muted-foreground">{course.course_code}</div>
                                            </div>
                                            <Badge variant="outline" className="text-xs">ID: {course.id}</Badge>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground mt-3">
                                    Total: {program.courses.length} course{program.courses.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-sm text-muted-foreground">No program data available</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
