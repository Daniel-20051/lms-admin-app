import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { ArrowLeft, ListChecks, TrendingUp } from "lucide-react";
import { GetStaffCoursesbyId } from "@/api/courses";
import { GetQuiz } from "@/api/quiz";
import QuizStatsDialog from "@/Components/super-admin/content/QuizStatsDialog";
import { toast } from "sonner";

interface Quiz {
  id: number;
  module_id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  status: string;
  attempts_allowed?: number;
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
  created_at: string;
}

interface Course {
  id: number;
  title: string;
  course_code: string;
  course_level: number;
}

export default function CourseQuizzesPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const basePath = isSuperAdmin ? "/super-admin" : "/admin";

  const [course, setCourse] = useState<Course | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showStatsDialog, setShowStatsDialog] = useState(false);

  useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadQuizzes();
    }
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      const response = await GetStaffCoursesbyId(courseId!);
      const data = response.data as any;
      if (data?.success) {
        setCourse(data.data);
      }
    } catch (error) {
      console.error("Error loading course:", error);
      toast.error("Failed to load course details");
    }
  };

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await GetQuiz(Number(courseId));
      const data = response.data as any;
      if (data?.success) {
        setQuizzes(data.data || []);
      }
    } catch (error) {
      console.error("Error loading quizzes:", error);
      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleViewStats = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowStatsDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`${basePath}/content/results`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {course?.title || "Loading..."}
          </h1>
          <p className="text-muted-foreground">
            {course?.course_code} • Quiz Results and Statistics
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      {course && quizzes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Quizzes</CardDescription>
              <CardTitle className="text-3xl">{quizzes.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Questions</CardDescription>
              <CardTitle className="text-3xl">
                {quizzes.reduce((acc, q) => acc + (q.questions?.length || 0), 0)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* Quizzes List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No quizzes found for this course
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {quiz.duration_minutes} minutes
                      </CardDescription>
                    </div>
                    <Badge
                      variant={quiz.status === "published" ? "default" : "secondary"}
                    >
                      {quiz.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Questions:</span>
                      <span className="font-medium">{quiz.questions?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attempts Allowed:</span>
                      <span className="font-medium">{quiz.attempts_allowed || 0}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => handleViewStats(quiz)}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Statistics
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats Dialog */}
      {selectedQuiz && (
        <QuizStatsDialog
          open={showStatsDialog}
          onOpenChange={setShowStatsDialog}
          quizId={selectedQuiz.id}
        />
      )}
    </div>
  );
}

