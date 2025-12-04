import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
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
import { toast } from "sonner";
import { Loader2, Trash2, Search, Plus } from "lucide-react";
import {
    getAllocations,
    removeAllocation,
    type CourseAllocation,
} from "@/api/courses";
import { getSemesters, type Semester } from "@/api/semesters";

interface AllocationsViewProps {
    onAddAllocation: () => void;
    refreshKey?: number;
}

export default function AllocationsView({ onAddAllocation, refreshKey }: AllocationsViewProps) {
    const [loading, setLoading] = useState(false);
    const [allocations, setAllocations] = useState<CourseAllocation[]>([]);
    const [semesters, setSemesters] = useState<Semester[]>([]);
    
    // Filters
    const [selectedSemester, setSelectedSemester] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    
    // Delete state
    const [allocationToDelete, setAllocationToDelete] = useState<CourseAllocation | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Fetch semesters
    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const response = await getSemesters({ limit: 100 });
                setSemesters(response.data.semesters);
                
                // Set active semester as default
                const activeSemester = response.data.semesters.find(s => s.status === 'Active');
                if (activeSemester) {
                    setSelectedSemester(`${activeSemester.academic_year}|${activeSemester.semester}`);
                }
            } catch (error) {
                console.error('Error fetching semesters:', error);
                toast.error('Failed to load semesters');
            }
        };

        fetchSemesters();
    }, []);

    // Fetch allocations
    useEffect(() => {
        const fetchAllocations = async () => {
            if (!selectedSemester) return;

            setLoading(true);
            try {
                const [academicYear, semester] = selectedSemester.split('|');
                
                const params: any = {
                    academic_year: academicYear,
                    semester: semester,
                    page: currentPage,
                    limit: 20,
                };

                if (statusFilter) {
                    params.registration_status = statusFilter;
                }

                const response = await getAllocations(params);
                setAllocations(response.data.allocations);
                setTotalPages(response.data.pagination.totalPages);
                setTotal(response.data.pagination.total);
            } catch (error) {
                console.error('Error fetching allocations:', error);
                toast.error('Failed to load allocations');
            } finally {
                setLoading(false);
            }
        };

        fetchAllocations();
    }, [selectedSemester, statusFilter, currentPage, refreshKey]);

    const handleDeleteAllocation = async () => {
        if (!allocationToDelete) return;

        setDeleteLoading(true);
        try {
            await removeAllocation(allocationToDelete.id);
            toast.success('Allocation removed successfully');
            setAllocationToDelete(null);
            
            // Refresh allocations
            const [academicYear, semester] = selectedSemester.split('|');
            const response = await getAllocations({
                academic_year: academicYear,
                semester: semester,
                registration_status: statusFilter as any,
                page: currentPage,
                limit: 20,
            });
            setAllocations(response.data.allocations);
            setTotal(response.data.pagination.total);
        } catch (error: any) {
            console.error('Error removing allocation:', error);
            toast.error(error?.response?.data?.error || 'Failed to remove allocation');
        } finally {
            setDeleteLoading(false);
        }
    };

    const filteredAllocations = allocations.filter(allocation => {
        if (!searchTerm) return true;
        
        const search = searchTerm.toLowerCase();
        return (
            allocation.student.name.toLowerCase().includes(search) ||
            allocation.student.matric_number.toLowerCase().includes(search) ||
            allocation.course.course_code.toLowerCase().includes(search) ||
            allocation.course.title.toLowerCase().includes(search)
        );
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'allocated':
                return <Badge variant="secondary">Allocated</Badge>;
            case 'registered':
                return <Badge variant="default">Registered</Badge>;
            case 'cancelled':
                return <Badge variant="destructive">Cancelled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <>
            <div className="space-y-4">
                {/* Header with Add Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Course Allocations</h2>
                        <p className="text-sm text-muted-foreground">
                            View and manage all course allocations
                        </p>
                    </div>
                    <Button onClick={onAddAllocation}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Allocation
                    </Button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Semester</Label>
                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {semesters.map((sem) => (
                                    <SelectItem 
                                        key={sem.id} 
                                        value={`${sem.academic_year}|${sem.semester}`}
                                    >
                                        {sem.academic_year} - {sem.semester} {sem.status === 'Active' && '(Active)'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={statusFilter || "all"} onValueChange={(val) => setStatusFilter(val === "all" ? "" : val)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="allocated">Allocated</SelectItem>
                                <SelectItem value="registered">Registered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Search</Label>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search student or course..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <Card className="pt-3">
                    <CardHeader>
                        <CardTitle>Allocations Summary</CardTitle>
                        <CardDescription>
                            Total: {total} allocation{total !== 1 ? 's' : ''}
                            {filteredAllocations.length > 0 && (
                                <>
                                    {' • '}
                                    Without price: {filteredAllocations.filter(a => !a.allocated_price).length}
                                </>
                            )}
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Warning for missing prices */}
                {filteredAllocations.length > 0 && filteredAllocations.some(a => !a.allocated_price) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <div className="flex items-start gap-2">
                            <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h3 className="font-medium text-yellow-800">Missing Course Prices</h3>
                                <p className="text-sm text-yellow-700 mt-1">
                                    Some allocations don't have prices set. Please set course prices in the <strong>Pricing</strong> tab before students can register.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : filteredAllocations.length > 0 ? (
                    <>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Matric Number</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Allocated Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAllocations.map((allocation) => (
                                        <TableRow key={allocation.id}>
                                            <TableCell className="font-medium">
                                                {allocation.student.name}
                                            </TableCell>
                                            <TableCell>{allocation.student.matric_number}</TableCell>
                                            <TableCell>{allocation.student.level}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{allocation.course.course_code}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {allocation.course.title}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {allocation.allocated_price ? (
                                                    <span>₦{allocation.allocated_price.toLocaleString()}</span>
                                                ) : (
                                                    <span className="text-muted-foreground italic">Not set</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(allocation.registration_status)}
                                            </TableCell>
                                            <TableCell>
                                                {allocation.allocated_at ? (
                                                    new Date(allocation.allocated_at).toLocaleDateString()
                                                ) : (
                                                    <span className="text-muted-foreground italic">N/A</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {allocation.registration_status === 'allocated' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setAllocationToDelete(allocation)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-8 text-muted-foreground border rounded-md">
                        {selectedSemester ? 'No allocations found' : 'Please select a semester'}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog 
                open={!!allocationToDelete} 
                onOpenChange={(open) => !open && setAllocationToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove Allocation</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this course allocation?
                            {allocationToDelete && (
                                <div className="mt-4 space-y-1 text-sm">
                                    <div><strong>Student:</strong> {allocationToDelete.student.name}</div>
                                    <div><strong>Course:</strong> {allocationToDelete.course.course_code} - {allocationToDelete.course.title}</div>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteAllocation}
                            disabled={deleteLoading}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {deleteLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Removing...</>
                            ) : (
                                'Remove'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

