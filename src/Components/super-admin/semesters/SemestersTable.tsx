import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Eye, Edit, XCircle, CalendarPlus, PlayCircle, Trash2, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import type { Semester } from "@/api/semesters";

interface SemestersTableProps {
    loading: boolean;
    semesters: Semester[];
    academicYearFilter: string | null;
    statusFilter: 'active' | 'closed' | 'all';
    onViewSemester: (id: number) => void;
    onEditSemester: (id: number) => void;
    onCloseSemester: (semester: Semester) => void;
    onExtendSemester: (semester: Semester) => void;
    onActivateSemester: (semester: Semester) => void;
    onDeleteSemester: (semester: Semester) => void;
}

export default function SemestersTable({
    loading,
    semesters,
    academicYearFilter,
    statusFilter,
    onViewSemester,
    onEditSemester,
    onCloseSemester,
    onExtendSemester,
    onActivateSemester,
    onDeleteSemester,
}: SemestersTableProps) {
    if (loading) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-2 text-sm text-muted-foreground">Loading semesters...</p>
                </div>
            </div>
        );
    }

    if (semesters.length === 0) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        {academicYearFilter || statusFilter !== 'all'
                            ? 'No semesters found matching your filters.'
                            : 'No semesters found.'}
                    </p>
                </div>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>;
            case 'closed':
                return <Badge variant="secondary" className="bg-gray-500 hover:bg-gray-600 text-white">Closed</Badge>;
            case 'pending':
                return <Badge variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">Pending</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">S/N</TableHead>
                        <TableHead>Academic Year</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Start Date</TableHead>
                        <TableHead className="hidden md:table-cell">End Date</TableHead>
                        <TableHead className="hidden lg:table-cell">Date Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {semesters.filter(semester => semester != null).map((semester, index) => (
                        <TableRow key={semester.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                                <div className="font-medium">{semester.academic_year || 'N/A'}</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{semester.semester || 'N/A'}</div>
                            </TableCell>
                            <TableCell>
                                {getStatusBadge(semester.status)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="text-sm">{formatDate(semester.start_date)}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="text-sm">{formatDate(semester.end_date)}</div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <div className="text-sm text-muted-foreground">
                                    {formatDate(semester.date)}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => onViewSemester(semester.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onEditSemester(semester.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Semester
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        {semester.status.toLowerCase() !== 'active' && (
                                            <DropdownMenuItem 
                                                onClick={() => onActivateSemester(semester)}
                                                className="text-green-600 focus:text-green-600"
                                            >
                                                <PlayCircle className="mr-2 h-4 w-4" />
                                                Activate
                                            </DropdownMenuItem>
                                        )}
                                        {semester.status.toLowerCase() !== 'closed' && (
                                            <DropdownMenuItem 
                                                onClick={() => onCloseSemester(semester)}
                                                className="text-orange-600 focus:text-orange-600"
                                            >
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Close
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem 
                                            onClick={() => onExtendSemester(semester)}
                                        >
                                            <CalendarPlus className="mr-2 h-4 w-4" />
                                            Extend
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => onDeleteSemester(semester)}
                                            disabled={semester.status.toLowerCase() === 'active'}
                                            className="text-red-600 focus:text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Delete Semester</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

