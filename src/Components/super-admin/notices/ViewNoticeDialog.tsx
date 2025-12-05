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
import { Bell, GraduationCap } from "lucide-react";
import { getNoticeById, type Notice } from "@/api/admin";
import { toast } from "sonner";

interface ViewNoticeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noticeId: number | null;
}

export default function ViewNoticeDialog({
  open,
  onOpenChange,
  noticeId,
}: ViewNoticeDialogProps) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && noticeId) {
      fetchNotice();
    } else {
      setNotice(null);
    }
  }, [open, noticeId]);

  const fetchNotice = async () => {
    if (!noticeId) return;
    
    try {
      setLoading(true);
      const response = await getNoticeById(noticeId);
      if (response.success) {
        setNotice(response.data.notice);
      }
    } catch (error: any) {
      console.error("Error fetching notice:", error);
      toast.error(error.response?.data?.message || "Failed to load notice details");
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
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  const formatNote = (note: string) => {
    return note.replace(/\\r\\n/g, "\n");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Notice Details</DialogTitle>
          <DialogDescription>View detailed information about the notice</DialogDescription>
        </DialogHeader>

        <DialogBody>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : notice ? (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Notice ID</label>
                <p className="text-lg font-semibold">#{notice.id}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Title</label>
                <p className="text-lg">{notice.title}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <div className="mt-1">
                  <Badge variant={notice.course_id === null ? "default" : "secondary"}>
                    {notice.course_id === null ? (
                      "System-Wide Notice"
                    ) : (
                      <>
                        <GraduationCap className="h-3 w-3 mr-1 inline" />
                        {notice.course?.title || "Course-Specific"}
                      </>
                    )}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                <p className="text-base">{formatDate(notice.date)}</p>
              </div>
            </div>

            {/* Notice Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Notice Content</h3>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/50">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {formatNote(notice.note)}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No notice data available</p>
          </div>
        )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

