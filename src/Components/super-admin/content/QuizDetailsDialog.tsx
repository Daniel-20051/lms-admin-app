import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { CheckCircle, Circle } from "lucide-react";
import { GetQuizById } from "@/api/quiz";
import { toast } from "sonner";

interface QuizDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: number;
}

interface QuizOption {
  id: number;
  text: string;
  is_correct: boolean;
}

interface QuizQuestion {
  id: number;
  text: string;
  type: string;
  points: number;
  options: QuizOption[];
}

interface Quiz {
  id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  status: string;
  questions: QuizQuestion[];
}

export default function QuizDetailsDialog({
  open,
  onOpenChange,
  quizId,
}: QuizDetailsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (open) {
      loadQuizDetails();
    }
  }, [open, quizId]);

  const loadQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await GetQuizById(quizId);
      const data = response.data as any;
      if (data?.success) {
        setQuiz(data.data);
      }
    } catch (error) {
      console.error("Error loading quiz details:", error);
      toast.error("Failed to load quiz details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl">
              {quiz?.title || "Loading..."}
            </DialogTitle>
            {quiz && (
              <Badge variant={quiz.status === "published" ? "default" : "secondary"}>
                {quiz.status}
              </Badge>
            )}
          </div>
          {quiz && (
            <div className="flex gap-4 text-sm text-muted-foreground pt-2">
              <span>Duration: {quiz.duration_minutes} minutes</span>
              <span>•</span>
              <span>Questions: {quiz.questions?.length || 0}</span>
            </div>
          )}
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : quiz ? (
          <div className="space-y-6">
            {quiz.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{quiz.description}</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Questions</h3>
              {quiz.questions && quiz.questions.length > 0 ? (
                quiz.questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">
                          {index + 1}. {question.text}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="capitalize">
                            {question.type.replace("_", " ")}
                          </Badge>
                          <Badge variant="secondary">{question.points} pts</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2 p-2 rounded border"
                          >
                            {option.is_correct ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={option.is_correct ? "font-medium" : ""}>
                              {option.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No questions added yet
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Failed to load quiz details
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}

