import { useState, useEffect } from "react";
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
import { Card, CardContent } from "@/Components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Checkbox } from "@/Components/ui/checkbox";
import { UpdateQuiz, UpdateQuizQuestions, GetQuizById } from "@/api/quiz";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface QuizOption {
  id?: number;
  text: string;
  is_correct: boolean;
}

interface QuizQuestion {
  id?: number;
  html: string;
  points: number;
  type: "single_choice" | "multiple_choice";
  options: QuizOption[];
}

interface Quiz {
  id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  status: string;
  questions?: Array<{
    id: number;
    question_text: string;
    question_type: string;
    points: number;
    options: Array<{
      id: number;
      text: string;
      is_correct: boolean;
    }>;
  }>;
}

interface EditQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz: Quiz;
  onSuccess: () => void;
}

export default function EditQuizDialog({
  open,
  onOpenChange,
  quiz,
  onSuccess,
}: EditQuizDialogProps) {
  const [loading, setLoading] = useState(false);
  const [fetchingQuiz, setFetchingQuiz] = useState(false);
  const [quizFormData, setQuizFormData] = useState({
    title: quiz.title,
    description: quiz.description || "",
    duration_minutes: quiz.duration_minutes,
    status: quiz.status,
  });
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (open) {
      loadQuizDetails();
    }
  }, [open, quiz.id]);

  const loadQuizDetails = async () => {
    try {
      setFetchingQuiz(true);
      // Fetch full quiz details including questions
      const response = await GetQuizById(quiz.id);
      const data = response.data as any;
      
      if (data?.status || data?.success) {
        const fullQuiz = data.data;
        
        setQuizFormData({
          title: fullQuiz.title || quiz.title,
          description: fullQuiz.description || quiz.description || "",
          duration_minutes: fullQuiz.duration_minutes || quiz.duration_minutes,
          status: fullQuiz.status || quiz.status,
        });
        
        // Convert quiz questions to edit format
        if (fullQuiz.questions && fullQuiz.questions.length > 0) {
          const mappedQuestions = fullQuiz.questions.map((q: any) => {
            const mappedOptions = (q.options || []).map((opt: any) => ({
              id: opt.id,
              text: opt.option_text || opt.text || "",
              is_correct: opt.is_correct || false,
            }));
            
            // Ensure at least 2 options exist
            while (mappedOptions.length < 2) {
              mappedOptions.push({
                text: "",
                is_correct: false,
              });
            }
            
            return {
              id: q.id,
              html: q.question_text || q.html || "",
              points: q.points || 1,
              type: (q.question_type || q.type || "single_choice") as "single_choice" | "multiple_choice",
              options: mappedOptions,
            };
          });
          
          console.log("Loaded questions with options:", mappedQuestions);
          setQuestions(mappedQuestions);
        } else {
          setQuestions([]);
        }
      } else {
        // Fallback to prop data if API fails
        setQuizFormData({
          title: quiz.title,
          description: quiz.description || "",
          duration_minutes: quiz.duration_minutes,
          status: quiz.status,
        });
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error loading quiz details:", error);
      // Fallback to prop data if API fails
      setQuizFormData({
        title: quiz.title,
        description: quiz.description || "",
        duration_minutes: quiz.duration_minutes,
        status: quiz.status,
      });
      setQuestions([]);
    } finally {
      setFetchingQuiz(false);
    }
  };

  const updateQuestion = (
    qIndex: number,
    field: keyof QuizQuestion | "option_text" | "option_correct",
    value: any,
    optIndex?: number
  ) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (field === "option_text" && optIndex !== undefined) {
        updated[qIndex].options[optIndex].text = value;
      } else if (field === "option_correct" && optIndex !== undefined) {
        // For single choice, uncheck others when one is checked
        if (value && updated[qIndex].type === "single_choice") {
          updated[qIndex].options.forEach((opt, idx) => {
            opt.is_correct = idx === optIndex;
          });
        } else {
          updated[qIndex].options[optIndex].is_correct = value;
        }
      } else {
        (updated[qIndex] as any)[field] = value;
      }
      return updated;
    });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        html: "",
        points: 1,
        type: "single_choice",
        options: [
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addOption = (qIndex: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      // Ensure options array exists
      if (!updated[qIndex].options) {
        updated[qIndex].options = [];
      }
      updated[qIndex].options.push({ text: "", is_correct: false });
      return updated;
    });
  };

  const removeOption = (qIndex: number, optIndex: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (updated[qIndex].options.length > 2) {
        updated[qIndex].options.splice(optIndex, 1);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quizFormData.title.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.html.trim()) {
        toast.error(`Question ${i + 1} text is required`);
        return;
      }
      if (q.options.length < 2) {
        toast.error(`Question ${i + 1} must have at least 2 options`);
        return;
      }
      const hasCorrect = q.options.some((opt) => opt.is_correct);
      if (!hasCorrect) {
        toast.error(`Question ${i + 1} must have at least one correct answer`);
        return;
      }
      if (q.type === "single_choice") {
        const correctCount = q.options.filter((opt) => opt.is_correct).length;
        if (correctCount !== 1) {
          toast.error(`Question ${i + 1} (Single Choice) must have exactly one correct answer`);
          return;
        }
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].text.trim()) {
          toast.error(`Question ${i + 1}, Option ${j + 1} text is required`);
          return;
        }
      }
    }

    try {
      setLoading(true);
      
      // Update quiz details
      await UpdateQuiz(quiz.id, quizFormData);
      
      // Update questions if there are any
      if (questions.length > 0) {
        const questionsPayload = questions.map((q) => {
          const questionPayload: any = {
            html: q.html,
            points: q.points,
            type: q.type,
            options: q.options.map((opt) => {
              const optionPayload: any = {
                option_text: opt.text,
                is_correct: opt.is_correct,
              };
              if (opt.id) {
                optionPayload.id = opt.id;
              }
              return optionPayload;
            }),
          };
          if (q.id) {
            questionPayload.id = q.id;
          }
          return questionPayload;
        });
        
        await UpdateQuizQuestions(quiz.id, questionsPayload);
      }
      
      toast.success("Quiz updated successfully");
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error updating quiz:", error);
      toast.error(error.response?.data?.message || "Failed to update quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Edit Quiz</DialogTitle>
          <DialogDescription>
            Update quiz details and questions
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {fetchingQuiz ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-primary"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side: Quiz Details */}
              <div className="space-y-6">
                <Card className="pt-3">
                  <div className="px-6 pt-6 pb-4">
                    <h3 className="text-lg font-semibold mb-4">Quiz Details</h3>
                  </div>
                  <CardContent className="px-6 pb-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Module 1 Assessment"
                        value={quizFormData.title}
                        onChange={(e) =>
                          setQuizFormData({ ...quizFormData, title: e.target.value })
                        }
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the quiz..."
                        value={quizFormData.description}
                        onChange={(e) =>
                          setQuizFormData({ ...quizFormData, description: e.target.value })
                        }
                        disabled={loading}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        value={quizFormData.duration_minutes}
                        onChange={(e) =>
                          setQuizFormData({
                            ...quizFormData,
                            duration_minutes: parseInt(e.target.value) || 1,
                          })
                        }
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={quizFormData.status}
                        onValueChange={(value) =>
                          setQuizFormData({ ...quizFormData, status: value })
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

                    {/* Questions Summary */}
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Questions Summary</h4>
                      <div className="space-y-2">
                        {questions.length > 0 ? (
                          questions.map((q, index) => (
                            <div key={index} className="text-sm">
                              <p className="font-medium">Q{index + 1}: {q.html || "Untitled Question"}</p>
                              <p className="text-xs text-muted-foreground">
                                {q.options.length} options • {q.points} points
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No questions yet</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side: Questions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Questions</h3>
                  <Button
                    type="button"
                    onClick={addQuestion}
                    disabled={loading}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>

                {questions.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No questions added. Click "Add Question" to get started.
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question, qIndex) => (
                      <Card key={qIndex} className="pt-3">
                        <CardContent className="px-6 pb-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold">Question {qIndex + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeQuestion(qIndex)}
                              disabled={loading || questions.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Points:</Label>
                              <Input
                                type="number"
                                min="1"
                                value={question.points}
                                onChange={(e) =>
                                  updateQuestion(qIndex, "points", parseInt(e.target.value) || 1)
                                }
                                disabled={loading}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Question Type</Label>
                              <Select
                                value={question.type}
                                onValueChange={(value) =>
                                  updateQuestion(qIndex, "type", value)
                                }
                                disabled={loading}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="single_choice">Single Choice</SelectItem>
                                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Question Text</Label>
                            <Textarea
                              placeholder="Enter the question..."
                              value={question.html}
                              onChange={(e) =>
                                updateQuestion(qIndex, "html", e.target.value)
                              }
                              disabled={loading}
                              rows={3}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Answer Options</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addOption(qIndex)}
                                disabled={loading}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Option
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {(question.options || []).length > 0 ? (
                                (question.options || []).map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <Checkbox
                                      checked={option.is_correct || false}
                                      onCheckedChange={(checked) =>
                                        updateQuestion(
                                          qIndex,
                                          "option_correct",
                                          checked,
                                          optIndex
                                        )
                                      }
                                      disabled={loading}
                                    />
                                    <Input
                                      placeholder={`Option ${optIndex + 1}`}
                                      value={option.text || ""}
                                      onChange={(e) =>
                                        updateQuestion(
                                          qIndex,
                                          "option_text",
                                          e.target.value,
                                          optIndex
                                        )
                                      }
                                      disabled={loading}
                                      required
                                    />
                                    {(question.options || []).length > 2 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeOption(qIndex, optIndex)}
                                        disabled={loading}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground">No options added. Click "Add Option" to add options.</p>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {question.type === "single_choice"
                                ? "Select exactly one correct option"
                                : "Select one or more correct options"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

              <DialogFooter className="pt-6 border-t mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Quiz"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
