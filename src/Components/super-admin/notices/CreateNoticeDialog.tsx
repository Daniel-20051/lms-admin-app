import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogBody,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import {
  createNotice,
  type CreateNoticeData,
} from "@/api/admin";
import { toast } from "sonner";

interface CreateNoticeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNoticeCreated?: () => void;
}

export default function CreateNoticeDialog({
  open,
  onOpenChange,
  onNoticeCreated,
}: CreateNoticeDialogProps) {
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<CreateNoticeData>({
    title: "",
    note: "",
    course_id: null,
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        note: "",
        course_id: null,
      });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a notice title");
      return;
    }

    if (!formData.note.trim()) {
      toast.error("Please enter notice content");
      return;
    }

    try {
      setCreating(true);
      const response = await createNotice(formData);
      if (response.success) {
        toast.success(response.message || "Notice created successfully");
        setFormData({
          title: "",
          note: "",
          course_id: null,
        });
        onNoticeCreated?.();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error creating notice:", error);
      toast.error(error.response?.data?.message || "Failed to create notice");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Notice</DialogTitle>
          <DialogDescription>
            Add a new notice to the system. Leave course selection as "System-Wide" for all users.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Notice Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Important Announcement"
                required
                disabled={creating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Notice Content *</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                placeholder="Enter the notice content..."
                rows={6}
                required
                disabled={creating}
              />
              <p className="text-xs text-muted-foreground">
                This notice will be visible to all users (system-wide notice)
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creating}>
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Notice
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

