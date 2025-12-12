import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { ListChecks, Search, BookOpen, TrendingUp, Edit, Eye, Trash2 } from "lucide-react";
import { GetQuiz, DeleteQuiz } from "@/api/quiz";
import QuizDetailsDialog from "@/Components/super-admin/content/QuizDetailsDialog";
import QuizStatsDialog from "@/Components/super-admin/content/QuizStatsDialog";
import EditQuizDialog from "@/Components/super-admin/content/EditQuizDialog";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { toast } from "sonner";
import { useCoursesManagement } from "@/hooks/useCoursesManagement";
import CoursesFilters from "@/Components/super-admin/courses/CoursesFilters";

interface Course {
  id: number;
  title: string;
  course_code: string;
}

interface Quiz {
  id: number;
  module_id: number;
  course_id: number;
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
  course?: Course;
}

export default function QuizzesPage() {
  const {
    courses,
    searchTerm,
    semesterFilter,
    academicYearFilter,
    programFilter,
    facultyFilter,
    staffFilter,
    levelFilter,
    setSearchTerm,
    setSemesterFilter,
    setAcademicYearFilter,
    setProgramFilter,
    setFacultyFilter,
    setStaffFilter,
    setLevelFilter,
  } = useCoursesManagement();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (courses.length > 0) {
      loadAllQuizzes();
    }
  }, [courses]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = quizzes.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.course?.course_code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    } else {
      setFilteredQuizzes(quizzes);
    }
  }, [searchQuery, quizzes]);

  const loadAllQuizzes = async () => {
    try {
      setLoading(true);
      // Load quizzes for each course
      const allQuizzes: Quiz[] = [];
      for (const course of courses) {
        try {
          const quizzesResponse = await GetQuiz(course.id);
          const data = quizzesResponse.data as any;
          if (data?.success) {
            const courseQuizzes = (data.data || []).map((quiz: Quiz) => ({
              ...quiz,
              course: {
                id: course.id,
                title: course.title,
                course_code: course.course_code,
              },
            }));
            allQuizzes.push(...courseQuizzes);
          }
        } catch (error) {
          console.error(`Error loading quizzes for course ${course.id}:`, error);
        }
      }
      
      setQuizzes(allQuizzes);
      setFilteredQuizzes(allQuizzes);
    } catch (error: any) {
      console.error("Error loading quizzes:", error);
      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async () => {
    if (!selectedQuiz) return;
    try {
      await DeleteQuiz(selectedQuiz.id);
      toast.success("Quiz deleted successfully");
      loadAllQuizzes();
      setShowDeleteDialog(false);
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Quizzes</h1>
          <p className="text-muted-foreground">
            Manage all quizzes across courses
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="pt-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filter Courses</CardTitle>
          <CardDescription className="text-sm">
            Use filters to find quizzes from specific courses
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <CoursesFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            semesterFilter={semesterFilter}
            onSemesterChange={setSemesterFilter}
            academicYearFilter={academicYearFilter}
            onAcademicYearChange={setAcademicYearFilter}
            programFilter={programFilter}
            onProgramChange={setProgramFilter}
            facultyFilter={facultyFilter}
            onFacultyChange={setFacultyFilter}
            staffFilter={staffFilter}
            onStaffChange={setStaffFilter}
            levelFilter={levelFilter}
            onLevelChange={setLevelFilter}
          />
        </CardContent>
      </Card>

      {/* Stats Summary */}
      {quizzes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Quizzes</CardDescription>
              <CardTitle className="text-3xl">{quizzes.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Published</CardDescription>
              <CardTitle className="text-3xl">
                {quizzes.filter((q) => q.status === "published").length}
              </CardTitle>
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

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Quizzes</CardTitle>
          <CardDescription>
            Find quizzes by title or course code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by quiz title or course code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quizzes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
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
      ) : filteredQuizzes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              {searchQuery
                ? "No quizzes found matching your search"
                : "No quizzes available for this session"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {quiz.course?.course_code} • {quiz.duration_minutes} min
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{quiz.course?.title}</span>
                </div>
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
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setShowDetailsDialog(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setShowStatsDialog(true);
                    }}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Stats
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setShowEditDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      {selectedQuiz && (
        <>
          <QuizDetailsDialog
            open={showDetailsDialog}
            onOpenChange={setShowDetailsDialog}
            quizId={selectedQuiz.id}
          />
          <QuizStatsDialog
            open={showStatsDialog}
            onOpenChange={setShowStatsDialog}
            quizId={selectedQuiz.id}
          />
          <EditQuizDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            quiz={selectedQuiz}
            onSuccess={loadAllQuizzes}
          />
        </>
      )}

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteQuiz}
        title="Delete Quiz"
        description="Are you sure you want to delete this quiz? This will also delete all questions and student attempts. This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}

