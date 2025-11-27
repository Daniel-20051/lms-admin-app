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
  Building2,
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
import type { Organization } from "@/api/admin";

interface OrganizationsTableProps {
  loading: boolean;
  organizations: Organization[];
  onViewOrganization: (organizationId: number) => void;
  onApproveOrganization: (organization: Organization) => void;
  onRejectOrganization: (organization: Organization) => void;
  onUpdateStatus: (organization: Organization) => void;
}

export default function OrganizationsTable({
  loading,
  organizations,
  onViewOrganization,
  onApproveOrganization,
  onRejectOrganization,
  onUpdateStatus,
}: OrganizationsTableProps) {
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
  const getDisplayFields = (organization: Organization) => {
    const fields: { label: string; value: any }[] = [];
    
    // Try to find common fields
    if (organization.email) fields.push({ label: "Email", value: organization.email });
    if (organization.name) fields.push({ label: "Name", value: organization.name });
    if (organization.organization_name) fields.push({ label: "Name", value: organization.organization_name });
    if (organization.phone) fields.push({ label: "Phone", value: organization.phone });
    if (organization.status) fields.push({ label: "Status", value: organization.status });
    
    return fields;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
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
          ) : organizations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <Building2 className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">No organizations found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            organizations.map((organization, index) => {
              const displayFields = getDisplayFields(organization);
              const name = displayFields.find(f => f.label === "Name")?.value || `Organization #${organization.id}`;
              const email = displayFields.find(f => f.label === "Email")?.value || "N/A";
              const phone = displayFields.find(f => f.label === "Phone")?.value || "N/A";
              const status = organization.status || "unknown";

              return (
                <TableRow key={organization.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
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
                        <DropdownMenuItem onClick={() => onViewOrganization(organization.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {status.toLowerCase() === "pending" || status.toLowerCase() === "pending_approval" ? (
                          <>
                            <DropdownMenuItem 
                              onClick={() => onApproveOrganization(organization)}
                              className="text-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onRejectOrganization(organization)}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        ) : null}
                        <DropdownMenuItem onClick={() => onUpdateStatus(organization)}>
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

