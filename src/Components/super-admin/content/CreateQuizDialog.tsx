import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { CreateQuiz, AddQuizQuestions } from "@/api/quiz";
import { toast } from "sonner";
import { Plus, Trash2, CheckSquare, Square } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";

interface Module {
  id: number;
  title: string;
}

interface CreateQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: number;
  modules: Module[];
  onSuccess: () => void;
}

interface QuizQuestion {
  text: string;
  type: "single_choice" | "multiple_choice";
  points: number;
  options: QuizOption[];
}

interface QuizOption {
  text: string;
  is_correct: boolean;
}

export default function CreateQuizDialog({
  open,
  onOpenChange,
  courseId,
  modules,
  onSuccess,
}: CreateQuizDialogProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"details" | "questions">("details");
  const [quizId, setQuizId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    module_id: "",
    duration_minutes: 20,
    description: "",
    status: "draft",
  });
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      text: "",
      type: "single_choice",
      points: 1,
      options: [
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ],
    },
  ]);

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.module_id || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: formData.title.trim(),
        module_id: parseInt(formData.module_id, 10),
        duration_minutes: formData.duration_minutes,
        description: formData.description.trim(),
        status: formData.status,
      };
      
      const response = await CreateQuiz(payload);
      
      if (response.data?.data?.id) {
        setQuizId(response.data.data.id);
        toast.success("Quiz created successfully");
        setStep("questions");
      } else {
        toast.error("Failed to create quiz - invalid response");
      }
    } catch (error: any) {
      console.error("Error creating quiz:", error);
      toast.error(error.response?.data?.message || "Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizId) return;

    // Validate questions
    for (const q of questions) {
      if (!q.text.trim()) {
        toast.error("Please fill in all question texts");
        return;
      }
      if (q.options.some((opt) => !opt.text.trim())) {
        toast.error("Please fill in all option texts");
        return;
      }
      if (!q.options.some((opt) => opt.is_correct)) {
        toast.error("Each question must have at least one correct answer");
        return;
      }
    }

    try {
      setLoading(true);
      await AddQuizQuestions(quizId, questions);
      toast.success("Questions added successfully");
      handleClose();
      onSuccess();
    } catch (error: any) {
      console.error("Error adding questions:", error);
      toast.error(error.response?.data?.message || "Failed to add questions");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: "",
        module_id: "",
        duration_minutes: 20,
        description: "",
        status: "draft",
      });
      setQuestions([
        {
          text: "",
          type: "single_choice",
          points: 1,
          options: [
            { text: "", is_correct: false },
            { text: "", is_correct: false },
          ],
        },
      ]);
      setStep("details");
      setQuizId(null);
      onOpenChange(false);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: "single_choice",
        points: 1,
        options: [
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const addOption = (questionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].options.push({ text: "", is_correct: false });
    setQuestions(updated);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    if (updated[questionIndex].options.length > 2) {
      updated[questionIndex].options = updated[questionIndex].options.filter(
        (_, i) => i !== optionIndex
      );
      setQuestions(updated);
    }
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    field: string,
    value: any
  ) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = {
      ...updated[questionIndex].options[optionIndex],
      [field]: value,
    };
    // For single choice, uncheck other options
    if (
      field === "is_correct" &&
      value &&
      updated[questionIndex].type === "single_choice"
    ) {
      updated[questionIndex].options.forEach((opt, i) => {
        if (i !== optionIndex) opt.is_correct = false;
      });
    }
    setQuestions(updated);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        {step === "details" ? (
          <form onSubmit={handleSubmitDetails}>
            <DialogHeader>
              <DialogTitle>
                {formData.module_id
                  ? `Create Quiz for ${modules.find((m) => String(m.id) === formData.module_id)?.title || "Module"}`
                  : "Create New Quiz"}
              </DialogTitle>
              <DialogDescription>
                Set up the basic details for your quiz
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Module 1 Assessment"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="module">Module *</Label>
                <Select
                  value={formData.module_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, module_id: value })
                  }
                  disabled={loading}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module.id} value={String(module.id)}>
                        {module.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_minutes: parseInt(e.target.value) || 20,
                      })
                    }
                    disabled={loading}
                    required
                  />
                </div>

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
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the quiz..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={loading}
                  rows={3}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Next: Add Questions"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleSubmitQuestions}>
            <DialogHeader>
              <DialogTitle>Add Quiz Questions</DialogTitle>
              <DialogDescription>
                Create questions for your quiz
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-start justify-between">
                    <Label className="text-base font-semibold">
                      Question {qIndex + 1}
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(qIndex)}
                      disabled={questions.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Input
                    placeholder="Question text"
                    value={question.text}
                    onChange={(e) =>
                      updateQuestion(qIndex, "text", e.target.value)
                    }
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={question.type}
                      onValueChange={(value) =>
                        updateQuestion(qIndex, "type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single_choice">
                          Single Choice
                        </SelectItem>
                        <SelectItem value="multiple_choice">
                          Multiple Choice
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      placeholder="Points"
                      min="1"
                      value={question.points}
                      onChange={(e) =>
                        updateQuestion(
                          qIndex,
                          "points",
                          parseInt(e.target.value) || 1
                        )
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Options</Label>
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <Checkbox
                          checked={option.is_correct}
                          onCheckedChange={(checked) =>
                            updateOption(qIndex, oIndex, "is_correct", checked)
                          }
                        />
                        <Input
                          placeholder={`Option ${oIndex + 1}`}
                          value={option.text}
                          onChange={(e) =>
                            updateOption(qIndex, oIndex, "text", e.target.value)
                          }
                          className="flex-1"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(qIndex, oIndex)}
                          disabled={question.options.length <= 2}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addOption(qIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("details")}
                disabled={loading}
              >
                Back
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Create Quiz"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

