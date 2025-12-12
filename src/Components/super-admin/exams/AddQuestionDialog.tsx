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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { AddObjectiveQuestion, AddTheoryQuestion } from "@/api/exams";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: number;
  onQuestionAdded: () => void;
}

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const QUESTION_TYPES = [
  { value: "objective", label: "Objective" },
  { value: "theory", label: "Theory" },
];

export default function AddQuestionDialog({
  open,
  onOpenChange,
  courseId,
  onQuestionAdded,
}: AddQuestionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState<"objective" | "theory">("objective");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<Array<{ id: string; text: string }>>([
    { id: "A", text: "" },
    { id: "B", text: "" },
  ]);
  const [correctOption, setCorrectOption] = useState("");
  const [marks, setMarks] = useState("");
  const [maxMarks, setMaxMarks] = useState("1");
  const [difficulty, setDifficulty] = useState("medium");
  const [topic, setTopic] = useState("");

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      // Reset form
      setQuestionType("objective");
      setQuestionText("");
      setOptions([
        { id: "A", text: "" },
        { id: "B", text: "" },
      ]);
      setCorrectOption("");
      setMarks("");
      setMaxMarks("1");
      setDifficulty("medium");
      setTopic("");
    }
  }, [open]);

  // Update correct option options when options change
  useEffect(() => {
    if (questionType === "objective" && options.length > 0) {
      const optionIds = options.map((opt) => opt.id);
      if (!optionIds.includes(correctOption)) {
        setCorrectOption("");
      }
    }
  }, [options, questionType, correctOption]);

  const addOption = () => {
    const nextId = String.fromCharCode(65 + options.length); // A, B, C, D, etc.
    setOptions([...options, { id: nextId, text: "" }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      // Reassign IDs
      const updatedOptions = newOptions.map((_, i) => ({
        id: String.fromCharCode(65 + i),
        text: newOptions[i].text,
      }));
      setOptions(updatedOptions);
      // Clear correct option if it was the removed one
      if (correctOption === options[index].id) {
        setCorrectOption("");
      }
    } else {
      toast.error("At least 2 options are required");
    }
  };

  const updateOption = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) {
      toast.error("Question text is required");
      return;
    }

    if (questionType === "objective") {
      // Validate objective question
      if (options.length < 2) {
        toast.error("At least 2 options are required");
        return;
      }

      const emptyOptions = options.filter((opt) => !opt.text.trim());
      if (emptyOptions.length > 0) {
        toast.error("All options must have text");
        return;
      }

      if (!correctOption) {
        toast.error("Please select the correct option");
        return;
      }

      if (!marks || parseFloat(marks) <= 0) {
        toast.error("Please enter valid marks");
        return;
      }

      try {
        setLoading(true);
        await AddObjectiveQuestion({
          course_id: courseId,
          question_text: questionText,
          options: options.map((opt) => ({ id: opt.id, text: opt.text.trim() })),
          correct_option: correctOption,
          marks: parseFloat(marks),
        });
        toast.success("Objective question added successfully");
        onQuestionAdded();
        onOpenChange(false);
      } catch (error: any) {
        console.error("Error adding objective question:", error);
        toast.error(
          error?.response?.data?.message || "Failed to add objective question"
        );
      } finally {
        setLoading(false);
      }
    } else {
      // Validate theory question
      if (!maxMarks || parseFloat(maxMarks) <= 0) {
        toast.error("Please enter valid max marks");
        return;
      }

      try {
        setLoading(true);
        await AddTheoryQuestion({
          course_id: courseId,
          question_text: questionText,
          max_marks: parseFloat(maxMarks),
          difficulty: difficulty || undefined,
          topic: topic.trim() || undefined,
        });
        toast.success("Theory question added successfully");
        onQuestionAdded();
        onOpenChange(false);
      } catch (error: any) {
        console.error("Error adding theory question:", error);
        toast.error(
          error?.response?.data?.message || "Failed to add theory question"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-4 pb-6">
          {/* Question Type */}
          <div className="space-y-2">
            <Label htmlFor="questionType">
              Question Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={questionType}
              onValueChange={(value) => setQuestionType(value as "objective" | "theory")}
            >
              <SelectTrigger id="questionType">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                {QUESTION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="questionText">
              Question Text <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="questionText"
              placeholder="Enter your question here..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Objective Question Fields */}
          {questionType === "objective" && (
            <>
              {/* Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>
                    Options <span className="text-red-500">*</span>
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Option
                  </Button>
                </div>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Option ${option.id}`}
                        value={option.text}
                        onChange={(e) => updateOption(index, e.target.value)}
                        required
                        className="flex-1"
                      />
                      {options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                          className="h-9 w-9"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Correct Option */}
              <div className="space-y-2">
                <Label htmlFor="correctOption">
                  Correct Option <span className="text-red-500">*</span>
                </Label>
                <Select value={correctOption} onValueChange={setCorrectOption}>
                  <SelectTrigger id="correctOption">
                    <SelectValue placeholder="Select correct option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Marks */}
              <div className="space-y-2">
                <Label htmlFor="marks">
                  Marks <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="marks"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Enter marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Theory Question Fields */}
          {questionType === "theory" && (
            <>
              {/* Max Marks */}
              <div className="space-y-2">
                <Label htmlFor="maxMarks">
                  Max Marks <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="maxMarks"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Enter max marks"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(e.target.value)}
                  required
                />
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_OPTIONS.map((diff) => (
                      <SelectItem key={diff.value} value={diff.value}>
                        {diff.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Biology"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </>
          )}
          </DialogBody>
          <DialogFooter className="pb-6 pr-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Question"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

