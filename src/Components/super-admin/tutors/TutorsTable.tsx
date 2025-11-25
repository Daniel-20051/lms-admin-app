import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  User,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Power,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import type { SoleTutor } from "@/api/admin";

interface TutorsTableProps {
  loading: boolean;
  tutors: SoleTutor[];
  onViewTutor: (tutorId: number) => void;
  onApproveTutor: (tutor: SoleTutor) => void;
  onRejectTutor: (tutor: SoleTutor) => void;
  onUpdateStatus: (tutor: SoleTutor) => void;
}

export default function TutorsTable({
  loading,
  tutors,
  onViewTutor,
  onApproveTutor,
  onRejectTutor,
  onUpdateStatus,
}: TutorsTableProps) {
  const getStatusBadge = (status: string) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;
    
    const statusLower = status.toLowerCase();
    if (statusLower === "active" || statusLower === "approved") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="h-3 w-3 mr-1" />
        Active
      </Badge>;
    } else if (statusLower === "suspended") {
      return <Badge variant="secondary">Suspended</Badge>;
    } else if (statusLower === "pending" || statusLower === "pending_approval") {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        Pending
      </Badge>;
    } else if (statusLower === "rejected") {
      return <Badge variant="destructive">
        <XCircle className="h-3 w-3 mr-1" />
        Rejected
      </Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  // Get common fields to display
  const getDisplayFields = (tutor: SoleTutor) => {
    const fields: { label: string; value: any }[] = [];
    
    // Try to find common fields
    if (tutor.email) fields.push({ label: "Email", value: tutor.email });
    if (tutor.name) fields.push({ label: "Name", value: tutor.name });
    if (tutor.full_name) fields.push({ label: "Name", value: tutor.full_name });
    if (tutor.fname && tutor.lname) fields.push({ label: "Name", value: `${tutor.fname} ${tutor.lname}` });
    if (tutor.phone) fields.push({ label: "Phone", value: tutor.phone });
    if (tutor.status) fields.push({ label: "Status", value: tutor.status });
    
    return fields;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
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
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))
          ) : tutors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <User className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No tutors found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            tutors.map((tutor) => {
              const displayFields = getDisplayFields(tutor);
              const name = displayFields.find(f => f.label === "Name")?.value || `Tutor #${tutor.id}`;
              const email = displayFields.find(f => f.label === "Email")?.value || "N/A";
              const phone = displayFields.find(f => f.label === "Phone")?.value || "N/A";
              const status = tutor.status || "unknown";

              return (
                <TableRow key={tutor.id}>
                  <TableCell className="font-medium">{tutor.id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell className="text-muted-foreground">{email}</TableCell>
                  <TableCell className="text-muted-foreground">{phone}</TableCell>
                  <TableCell>{getStatusBadge(status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onViewTutor(tutor.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {status.toLowerCase() === "pending" || status.toLowerCase() === "pending_approval" ? (
                          <>
                            <DropdownMenuItem 
                              onClick={() => onApproveTutor(tutor)}
                              className="text-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onRejectTutor(tutor)}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        ) : null}
                        <DropdownMenuItem onClick={() => onUpdateStatus(tutor)}>
                          <Power className="h-4 w-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

