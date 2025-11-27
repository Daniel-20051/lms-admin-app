import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
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
import type { Program } from "@/api/programs";

interface ProgramsTableProps {
    loading: boolean;
    programs: Program[];
    searchTerm: string;
    statusFilter: 'Y' | 'N' | 'all';
    onViewProgram: (id: number) => void;
    onEditProgram: (id: number) => void;
    onDeleteProgram: (program: Program) => void;
}

export default function ProgramsTable({
    loading,
    programs,
    searchTerm,
    statusFilter,
    onViewProgram,
    onEditProgram,
    onDeleteProgram,
}: ProgramsTableProps) {
    if (loading) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-2 text-sm text-muted-foreground">Loading programs...</p>
                </div>
            </div>
        );
    }

    if (programs.length === 0) {
        return (
            <div className="rounded-md border">
                <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        {searchTerm || statusFilter !== 'all'
                            ? 'No programs found matching your filters.'
                            : 'No programs found.'}
                    </p>
                </div>
            </div>
        );
    }

    const truncateText = (text: string, maxLength: number = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">S/N</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Date Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {programs.map((program, index) => (
                        <TableRow key={program.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                                <div className="font-medium">{program.title}</div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm">{program.faculty.name}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="text-sm text-muted-foreground max-w-xs">
                                    {truncateText(program.description, 50)}
                                </div>
                            </TableCell>
                            <TableCell>
                                {program.status === 'Y' ? (
                                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                        Active
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-gray-500 hover:bg-gray-600 text-white">
                                        Inactive
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <div className="text-sm text-muted-foreground">
                                    {new Date(program.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
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
                                        <DropdownMenuItem onClick={() => onViewProgram(program.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onEditProgram(program.id)}
                                        >
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Program
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => onDeleteProgram(program)}
                                            className="text-red-600 focus:text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Delete Program</span>
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
