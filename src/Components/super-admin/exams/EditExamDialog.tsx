import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { UpdateExam, GetExamById } from "@/api/exams";
import { toast } from "sonner";

interface EditExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: number | null;
  onExamUpdated: () => void;
}

const EXAM_TYPES = [
  { value: "objective-only", label: "Objective Only" },
  { value: "theory-only", label: "Theory Only" },
  { value: "mixed", label: "Mixed" },
];
const SELECTION_MODES = [
  { value: "manual", label: "Manual Selection" },
  { value: "random", label: "Random Selection" },
];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export default function EditExamDialog({
  open,
  onOpenChange,
  examId,
  onExamUpdated,
}: EditExamDialogProps) {
  const [loading, setLoading] = useState(false);
  const [loadingExam, setLoadingExam] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    duration_minutes: 60,
    instructions: "",
    start_at: "",
    end_at: "",
    exam_type: "mixed",
    selection_mode: "manual",
    status: "draft",
    randomize: false,
    objective_count: 0,
    theory_count: 0,
  });

  useEffect(() => {
    if (open && examId) {
      loadExamData();
    } else if (!open) {
      // Only reset form when dialog closes (not when it opens)
      setFormData({
        title: "",
        duration_minutes: 60,
        instructions: "",
        start_at: "",
        end_at: "",
        exam_type: "mixed",
        selection_mode: "manual",
        status: "draft",
        randomize: false,
        objective_count: 0,
        theory_count: 0,
      });
    }
  }, [open, examId]);

  const loadExamData = async () => {
    if (!examId) return;

    try {
      setLoadingExam(true);
      const response = await GetExamById(examId);
      const data = response?.data as any;

      if (data?.status || data?.success || response?.status === 200) {
        // Handle different response structures
        const exam = data?.data?.exam || data?.data || data;

        // Debug: Log the exam data to verify visibility field
        console.log('Exam data loaded:', { 
          visibility: exam.visibility, 
          status: exam.status,
          responseData: data,
          exam: exam
        });

        // Format dates for datetime-local input
        const formatDateForInput = (dateString: string | null) => {
          if (!dateString) return "";
          try {
            const date = new Date(dateString);
            // Convert to local datetime string format (YYYY-MM-DDTHH:mm)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          } catch {
            return "";
          }
        };

        // Get status - prioritize visibility field (which is what we send to API)
        // Handle empty strings, null, undefined, and ensure we get the correct value
        let examStatus = "draft";
        if (exam.visibility !== undefined && exam.visibility !== null && exam.visibility !== "") {
          examStatus = exam.visibility;
        } else if (exam.status !== undefined && exam.status !== null && exam.status !== "") {
          examStatus = exam.status;
        }
        
        // Ensure status is one of the valid values
        if (examStatus !== "draft" && examStatus !== "published") {
          examStatus = "draft";
        }

        setFormData({
          title: exam.title || "",
          duration_minutes: exam.duration_minutes || 60,
          instructions: exam.instructions || "",
          start_at: formatDateForInput(exam.start_at),
          end_at: formatDateForInput(exam.end_at),
          exam_type: exam.exam_type || "mixed",
          selection_mode: exam.selection_mode || "manual",
          status: examStatus,
          randomize: exam.randomize || false,
          objective_count: exam.objective_count || 0,
          theory_count: exam.theory_count || 0,
        });
      } else {
        toast.error(data?.message || "Failed to load exam details");
      }
    } catch (error: any) {
      console.error("Error loading exam:", error);
      toast.error("Failed to load exam details");
    } finally {
      setLoadingExam(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examId) return;

    if (!formData.title.trim()) {
      toast.error("Please enter an exam title");
      return;
    }

    try {
      setLoading(true);

      // Format dates for API (convert datetime-local to ISO format)
      const startAt = formData.start_at
        ? new Date(formData.start_at).toISOString()
        : null;
      const endAt = formData.end_at
        ? new Date(formData.end_at).toISOString()
        : null;

      const payload: any = {
        title: formData.title.trim(),
        duration_minutes: formData.duration_minutes,
        instructions: formData.instructions.trim() || undefined,
        start_at: startAt,
        end_at: endAt,
        exam_type: formData.exam_type,
        selection_mode: formData.selection_mode,
        visibility: formData.status,
        randomize: formData.randomize,
      };

      // Only include counts if relevant
      if (
        formData.exam_type === "mixed" ||
        formData.exam_type === "objective-only"
      ) {
        payload.objective_count = formData.objective_count;
      }

      if (
        formData.exam_type === "mixed" ||
        formData.exam_type === "theory-only"
      ) {
        payload.theory_count = formData.theory_count;
      }

      const response = await UpdateExam(examId, payload);
      const data = response?.data as any;

      if (data?.status || data?.success || response?.status === 200) {
        toast.success("Exam updated successfully");
        onExamUpdated();
        handleClose();
      } else {
        toast.error(data?.message || "Failed to update exam");
      }
    } catch (error: any) {
      console.error("Error updating exam:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update exam"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading && !loadingExam) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader>
          <DialogTitle>Edit Exam</DialogTitle>
        </DialogHeader>

        {loadingExam ? (
          <DialogBody className="px-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </DialogBody>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogBody className="px-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Title <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter exam title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        disabled={loading}
                        required
                      />
                    </div>

                    {/* Instructions */}
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Enter exam instructions for students"
                        value={formData.instructions}
                        onChange={(e) =>
                          setFormData({ ...formData, instructions: e.target.value })
                        }
                        disabled={loading}
                        rows={3}
                      />
                    </div>

                    {/* Start Date & Time */}
                    <div className="space-y-2">
                      <Label htmlFor="start_at">Start Date & Time</Label>
                      <Input
                        id="start_at"
                        type="datetime-local"
                        value={formData.start_at}
                        onChange={(e) =>
                          setFormData({ ...formData, start_at: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>

                    {/* Exam Type */}
                    <div className="space-y-2">
                      <Label htmlFor="exam_type">Exam Type</Label>
                      <Select
                        value={formData.exam_type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, exam_type: value })
                        }
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                        <SelectContent>
                          {EXAM_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Objective Questions Count */}
                    {(formData.exam_type === "mixed" ||
                      formData.exam_type === "objective-only") && (
                      <div className="space-y-2">
                        <Label htmlFor="objective_count">
                          Objective Questions Count
                        </Label>
                        <Input
                          id="objective_count"
                          type="number"
                          min="0"
                          value={formData.objective_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              objective_count: parseInt(e.target.value) || 0,
                            })
                          }
                          disabled={loading}
                        />
                      </div>
                    )}

                    {/* Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData({ ...formData, status: value })
                        }
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Duration */}
                    <div className="space-y-2">
                      <Label htmlFor="duration">
                        Duration (minutes) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        value={formData.duration_minutes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration_minutes: parseInt(e.target.value) || 60,
                          })
                        }
                        disabled={loading}
                        required
                      />
                    </div>

                    {/* End Date & Time */}
                    <div className="space-y-2">
                      <Label htmlFor="end_at">End Date & Time</Label>
                      <Input
                        id="end_at"
                        type="datetime-local"
                        value={formData.end_at}
                        onChange={(e) =>
                          setFormData({ ...formData, end_at: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>

                    {/* Selection Mode */}
                    <div className="space-y-2">
                      <Label htmlFor="selection_mode">Selection Mode</Label>
                      <Select
                        value={formData.selection_mode}
                        onValueChange={(value) =>
                          setFormData({ ...formData, selection_mode: value })
                        }
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {SELECTION_MODES.map((mode) => (
                            <SelectItem key={mode.value} value={mode.value}>
                              {mode.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Theory Questions Count */}
                    {(formData.exam_type === "mixed" ||
                      formData.exam_type === "theory-only") && (
                      <div className="space-y-2">
                        <Label htmlFor="theory_count">Theory Questions Count</Label>
                        <Input
                          id="theory_count"
                          type="number"
                          min="0"
                          value={formData.theory_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              theory_count: parseInt(e.target.value) || 0,
                            })
                          }
                          disabled={loading}
                        />
                      </div>
                    )}

                    {/* Randomize Questions */}
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="randomize" className="flex-1">
                        Randomize Questions
                      </Label>
                      <Switch
                        id="randomize"
                        checked={formData.randomize}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, randomize: checked })
                        }
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogBody>

            <DialogFooter className="px-6 pb-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Exam"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

