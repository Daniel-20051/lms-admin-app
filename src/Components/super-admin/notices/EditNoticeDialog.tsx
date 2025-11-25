import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import {
  updateNotice,
  type Notice,
  type UpdateNoticeData,
} from "@/api/admin";
import { toast } from "sonner";

interface EditNoticeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notice: Notice | null;
  onNoticeUpdated?: () => void;
}

export default function EditNoticeDialog({
  open,
  onOpenChange,
  notice,
  onNoticeUpdated,
}: EditNoticeDialogProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateNoticeData>({
    title: "",
    note: "",
    course_id: null,
  });

  useEffect(() => {
    if (open && notice) {
      setFormData({
        title: notice.title || "",
        note: notice.note || "",
        course_id: notice.course_id,
      });
    }
  }, [open, notice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notice) return;

    // Validation
    if (!formData.title?.trim()) {
      toast.error("Please enter a notice title");
      return;
    }

    if (!formData.note?.trim()) {
      toast.error("Please enter notice content");
      return;
    }

    try {
      setSaving(true);
      const response = await updateNotice(notice.id, formData);
      if (response.success) {
        toast.success(response.message || "Notice updated successfully");
        onNoticeUpdated?.();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error updating notice:", error);
      toast.error(error.response?.data?.message || "Failed to update notice");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Notice</DialogTitle>
          <DialogDescription>
            Update the notice information below
          </DialogDescription>
        </DialogHeader>

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
                placeholder="Enter notice title"
                required
                disabled={saving}
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
                disabled={saving}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

