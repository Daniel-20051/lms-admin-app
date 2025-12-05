import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Building2, GraduationCap } from "lucide-react";
import { getFacultyById, type Faculty } from "@/api/admin";
import { toast } from "sonner";

interface ViewFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facultyId: number | null;
}

export default function ViewFacultyDialog({
  open,
  onOpenChange,
  facultyId,
}: ViewFacultyDialogProps) {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && facultyId) {
      fetchFaculty();
    } else {
      setFaculty(null);
    }
  }, [open, facultyId]);

  const fetchFaculty = async () => {
    if (!facultyId) return;
    
    try {
      setLoading(true);
      const response = await getFacultyById(facultyId);
      if (response.success) {
        setFaculty(response.data.faculty);
      }
    } catch (error: any) {
      console.error("Error fetching faculty:", error);
      toast.error(error.response?.data?.message || "Failed to load faculty details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Faculty Details</DialogTitle>
          <DialogDescription>View detailed information about the faculty</DialogDescription>
        </DialogHeader>

        <DialogBody>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : faculty ? (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Faculty ID</label>
                <p className="text-lg font-semibold">#{faculty.id}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg">{faculty.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-base">{faculty.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                <p className="text-base">{formatDate(faculty.date)}</p>
              </div>
            </div>

            {/* Programs Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">
                  Programs ({faculty.programs.length})
                </h3>
              </div>
              
              {faculty.programs.length > 0 ? (
                <div className="space-y-2">
                  {faculty.programs.map((program) => (
                    <div
                      key={program.id}
                      className="p-3 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{program.title}</p>
                          <p className="text-sm text-muted-foreground">ID: #{program.id}</p>
                        </div>
                        <Badge variant="outline">Program</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 border rounded-lg text-center">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No programs assigned to this faculty</p>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Programs</p>
                <p className="text-2xl font-bold">{faculty.programs.length}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Faculty ID</p>
                <p className="text-2xl font-bold">#{faculty.id}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No faculty data available</p>
          </div>
        )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

