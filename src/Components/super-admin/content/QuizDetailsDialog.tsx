import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { CheckCircle2, XCircle, Clock, FileText, Users, Calendar } from "lucide-react";
import { GetQuizById } from "@/api/quiz";
import { toast } from "sonner";

interface QuizDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: number;
  quiz?: Quiz | null; // Optional: pass quiz data directly to avoid API call
}

interface QuizOption {
  id: number;
  text: string;
  is_correct: boolean;
}

interface QuizQuestion {
  id: number;
  question_text: string;
  question_type: string;
  points: number;
  options: QuizOption[];
}

interface Quiz {
  id: number;
  title: string;
  description?: string;
  module_id?: number;
  module_title?: string;
  course_id?: number;
  duration_minutes: number;
  attempts_allowed?: number;
  status: string;
  created_at?: string;
  questions: QuizQuestion[];
}

export default function QuizDetailsDialog({
  open,
  onOpenChange,
  quizId,
  quiz: quizProp,
}: QuizDetailsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(quizProp || null);

  useEffect(() => {
    if (open) {
      // If quiz data is passed as prop, use it directly
      if (quizProp) {
        setQuiz(quizProp);
      } else {
        // Otherwise, fetch from API
        loadQuizDetails();
      }
    }
  }, [open, quizId, quizProp]);

  const loadQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await GetQuizById(quizId);
      const data = response.data as any;
      if (data?.status || data?.success) {
        setQuiz(data.data);
      }
    } catch (error) {
      console.error("Error loading quiz details:", error);
      toast.error("Failed to load quiz details");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl">
            {quiz?.title || "Loading..."}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-4 text-sm text-muted-foreground">Loading quiz details...</p>
            </div>
          ) : quiz ? (
            <div className="space-y-6">
              {/* Quiz Information Section */}
              <Card className="pt-3">
                <CardHeader className="pb-4 px-6 pt-6">
                  <CardTitle className="text-lg">Quiz Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  {quiz.description && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p className="text-sm">{quiz.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-medium">{quiz.duration_minutes} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Total Questions</p>
                        <p className="text-sm font-medium">{quiz.questions?.length || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={quiz.status === "published" ? "default" : "secondary"}>
                        {quiz.status}
                      </Badge>
                    </div>
                    {quiz.attempts_allowed !== undefined && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Attempts Allowed</p>
                          <p className="text-sm font-medium">{quiz.attempts_allowed}</p>
                        </div>
                      </div>
                    )}
                    {quiz.created_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Created</p>
                          <p className="text-sm font-medium">{formatDate(quiz.created_at)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Questions Section */}
              <Card className="pt-3">
                <CardHeader className="pb-4 px-6 pt-6">
                  <CardTitle className="text-lg">Questions</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  {quiz.questions && quiz.questions.length > 0 ? (
                    <div className="space-y-4">
                      {quiz.questions.map((question, index) => (
                        <div key={question.id} className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-muted-foreground mb-1">
                                Question {index + 1}
                              </p>
                              <p className="text-base font-medium">{question.question_text}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Badge variant="outline" className="capitalize text-xs">
                                {question.question_type.replace("_", " ")}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {question.points} points
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground font-medium">Options:</p>
                            {question.options && question.options.length > 0 ? (
                              question.options.map((option) => (
                                <div
                                  key={option.id}
                                  className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                                    option.is_correct
                                      ? "bg-green-50 border-green-200"
                                      : "bg-muted/30 border-muted"
                                  }`}
                                >
                                  {option.is_correct ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                  )}
                                  <span className={`text-sm ${option.is_correct ? "font-medium text-green-900" : "text-muted-foreground"}`}>
                                    {option.text}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No options available</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No questions added yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Failed to load quiz details
              </CardContent>
            </Card>
          )}
        </div>

        <div className="px-6 pb-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

