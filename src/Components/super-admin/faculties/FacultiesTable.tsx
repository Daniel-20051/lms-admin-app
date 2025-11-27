import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import {
  MoreVertical,
  Edit,
  Trash,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Building2 } from "lucide-react";
import type { Faculty } from "@/api/admin";

interface FacultiesTableProps {
  loading: boolean;
  faculties: Faculty[];
  searchTerm: string;
  onView?: (faculty: Faculty) => void;
  onEdit?: (faculty: Faculty) => void;
  onDelete?: (faculty: Faculty) => void;
}

export default function FacultiesTable({
  loading,
  faculties,
  searchTerm,
  onView,
  onEdit,
  onDelete,
}: FacultiesTableProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Programs</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))
          ) : faculties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <Building2 className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No faculties found</p>
                  {searchTerm && (
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search
                    </p>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            faculties.map((faculty, index) => (
              <TableRow key={faculty.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{faculty.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {faculty.description}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {faculty.programs.length} {faculty.programs.length === 1 ? 'Program' : 'Programs'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDate(faculty.date)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {onView && (
                        <DropdownMenuItem onClick={() => onView(faculty)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                      )}
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(faculty)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete(faculty)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

