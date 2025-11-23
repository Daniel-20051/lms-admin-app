import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import type { Course } from "@/api/courses";

interface CoursesTableProps {
    loading: boolean;
    courses: Course[];
    searchTerm: string;
    onViewCourse: (id: number) => void;
    onEditCourse: (id: number) => void;
    onDeleteCourse: (course: Course) => void;
}

export default function CoursesTable({
    loading,
    courses,
    searchTerm,
    onViewCourse,
    onEditCourse,
    onDeleteCourse,
}: CoursesTableProps) {
    if (loading) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-2 text-sm text-muted-foreground">Loading courses...</p>
                </div>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        {searchTerm
                            ? 'No courses found matching your filters.'
                            : 'No courses found.'}
                    </p>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount: string | number, currency: string = 'NGN') => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
        }).format(numAmount);
    };

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Program</TableHead>
                        <TableHead className="hidden lg:table-cell">Faculty</TableHead>
                        <TableHead className="hidden md:table-cell">Instructor</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead className="hidden lg:table-cell">Semester</TableHead>
                        <TableHead className="hidden md:table-cell">Units</TableHead>
                        <TableHead className="hidden lg:table-cell">Price</TableHead>
                        <TableHead>Owner Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.filter(course => course != null).map((course) => (
                        <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.id}</TableCell>
                            <TableCell>
                                <div className="font-medium">{course.course_code || 'N/A'}</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium max-w-xs">{course.title || 'N/A'}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="text-sm">{course.program?.title || 'N/A'}</div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <div className="text-sm">{course.faculty?.name || 'N/A'}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="text-sm">
                                    {course.instructor ? course.instructor.full_name : 'N/A'}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Level {course.course_level}</Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <div className="text-sm">{course.semester}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="text-sm">{course.course_unit}</div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <div className="text-sm">{formatCurrency(course.price, course.currency)}</div>
                            </TableCell>
                            <TableCell>
                                <Badge 
                                    variant={course.owner_type === 'wsp' ? 'default' : 'secondary'}
                                    className={course.owner_type === 'wsp' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'}
                                >
                                    {course.owner_type === 'wsp' ? 'WSP' : course.owner_type === 'sole_tutor' ? 'Sole Tutor' : course.owner_type === 'organization' ? 'Organization' : 'Marketplace'}
                                </Badge>
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
                                        <DropdownMenuItem onClick={() => onViewCourse(course.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onEditCourse(course.id)}
                                        >
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Course
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => onDeleteCourse(course)}
                                            className="text-red-600 focus:text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Delete Course</span>
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

