import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  BookOpen, 
  FileText, 
  ListChecks,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  Play,
  AlertCircle
} from "lucide-react";
import { GetStaffCoursesbyId, GetCourseModules, DeleteModule, DeleteUnit } from "@/api/courses";
import { GetQuiz, DeleteQuiz } from "@/api/quiz";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import AddModuleDialog from "@/Components/super-admin/content/AddModuleDialog";
import AddUnitDialog from "@/Components/super-admin/content/AddUnitDialog";
import EditUnitDialog from "@/Components/super-admin/content/EditUnitDialog";
import UnitPreviewDialog from "@/Components/super-admin/content/UnitPreviewDialog";
import CreateQuizDialog from "@/Components/super-admin/content/CreateQuizDialog";
import EditQuizDialog from "@/Components/super-admin/content/EditQuizDialog";
import QuizDetailsDialog from "@/Components/super-admin/content/QuizDetailsDialog";
import QuizStatsDialog from "@/Components/super-admin/content/QuizStatsDialog";
import ConfirmDialog from "@/Components/ConfirmDialog";

interface Module {
  id: number;
  title: string;
  description: string;
  status: string;
  units: Unit[];
  created_at: string;
}

interface Unit {
  id: number;
  module_id: number;
  title: string;
  content: string;
  content_type: string;
  video_url?: string;
  order: number;
  status: string;
  created_at: string;
}

interface Quiz {
  id: number;
  module_id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  status: string;
  total_questions?: number;
  total_attempts?: number;
  average_score?: number;
  created_at: string;
}

interface Course {
  id: number;
  title: string;
  course_code: string;
  course_level: number;
  semester: string;
  program?: {
    title: string;
  };
}

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const basePath = isSuperAdmin ? "/super-admin" : "/admin";

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});

  // Dialog states
  const [showAddModuleDialog, setShowAddModuleDialog] = useState(false);
  const [showAddUnitDialog, setShowAddUnitDialog] = useState(false);
  const [showEditUnitDialog, setShowEditUnitDialog] = useState(false);
  const [showUnitPreviewDialog, setShowUnitPreviewDialog] = useState(false);
  const [showCreateQuizDialog, setShowCreateQuizDialog] = useState(false);
  const [showEditQuizDialog, setShowEditQuizDialog] = useState(false);
  const [showQuizDetailsDialog, setShowQuizDetailsDialog] = useState(false);
  const [showQuizStatsDialog, setShowQuizStatsDialog] = useState(false);
  const [showDeleteModuleDialog, setShowDeleteModuleDialog] = useState(false);
  const [showDeleteUnitDialog, setShowDeleteUnitDialog] = useState(false);
  const [showDeleteQuizDialog, setShowDeleteQuizDialog] = useState(false);

  const [deleteUnitLoading, setDeleteUnitLoading] = useState(false);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadModules();
      loadQuizzes();
    }
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      setCourseLoading(true);
      const response = await GetStaffCoursesbyId(courseId!);
      if (response.data.status || response.data.success) {
        setCourse(response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to load course details");
      }
    } catch (error) {
      console.error("Error loading course:", error);
      toast.error("Failed to load course details");
    } finally {
      setCourseLoading(false);
    }
  };

  const loadModules = async () => {
    try {
      setLoading(true);
      const response = await GetCourseModules(courseId!);
      if (response.data.status || response.data.success) {
        setModules(response.data.data || []);
      } else {
        console.error("Unexpected response format:", response.data);
        setModules([]);
      }
    } catch (error) {
      console.error("Error loading modules:", error);
      toast.error("Failed to load modules");
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  const loadQuizzes = async () => {
    try {
      const response = await GetQuiz(Number(courseId));
      if (response.data.status || response.data.success) {
        setQuizzes(response.data.data || []);
      } else {
        setQuizzes([]);
      }
    } catch (error) {
      console.error("Error loading quizzes:", error);
      setQuizzes([]);
    }
  };

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleDeleteModule = async () => {
    if (!selectedModule) return;
    try {
      await DeleteModule(String(selectedModule.id));
      toast.success("Module deleted successfully");
      loadModules();
      setShowDeleteModuleDialog(false);
      setSelectedModule(null);
    } catch (error) {
      console.error("Error deleting module:", error);
      toast.error("Failed to delete module");
    }
  };

  const handleDeleteUnit = async () => {
    if (!selectedUnit) return;
    try {
      setDeleteUnitLoading(true);
      await DeleteUnit(String(selectedUnit.id));
      toast.success("Unit deleted successfully");
      loadModules();
      setShowDeleteUnitDialog(false);
      setSelectedUnit(null);
    } catch (error) {
      console.error("Error deleting unit:", error);
      toast.error("Failed to delete unit");
    } finally {
      setDeleteUnitLoading(false);
    }
  };

  const handleDeleteQuiz = async () => {
    if (!selectedQuiz) return;
    try {
      await DeleteQuiz(selectedQuiz.id);
      toast.success("Quiz deleted successfully");
      loadQuizzes();
      setShowDeleteQuizDialog(false);
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`${basePath}/content/course-content`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          {courseLoading ? (
            <>
              <Skeleton className="h-9 w-64 mb-2" />
              <Skeleton className="h-5 w-48" />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tight">
                {course?.title || "Course Not Found"}
              </h1>
              <p className="text-muted-foreground">
                {course?.course_code && `${course.course_code} • `}Level {course?.course_level}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">
            <BookOpen className="h-4 w-4 mr-2" />
            Modules & Units
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            <ListChecks className="h-4 w-4 mr-2" />
            Quizzes
          </TabsTrigger>
        </TabsList>

        {/* Modules Tab */}
        <TabsContent value="modules" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Course Modules</h2>
            <Button onClick={() => setShowAddModuleDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : modules.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No modules yet. Click "Add Module" to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {modules.map((module, index) => {
                const isExpanded = expandedModules[module.id];
                return (
                  <Card key={module.id} className="pt-3">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base">{module.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="font-semibold text-black">{module.units?.length || 0} units</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleModule(module.id)}
                              className="h-8 transition-transform duration-200"
                            >
                              <ChevronDown 
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  isExpanded ? "rotate-0" : "-rotate-90"
                                }`}
                              />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedModule(module);
                              setShowAddUnitDialog(true);
                            }}
                            className="h-8"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Unit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => {
                              setSelectedModule(module);
                              setShowDeleteModuleDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded 
                          ? "max-h-[2000px] opacity-100 translate-y-0" 
                          : "max-h-0 opacity-0 -translate-y-2"
                      }`}
                    >
                      {module.units && module.units.length > 0 && (
                        <CardContent className="pt-0">
                          <div className={`space-y-2 transition-opacity duration-300 ${
                            isExpanded ? "opacity-100" : "opacity-0"
                          }`}>
                            {module.units.map((unit) => (
                            <div
                              key={unit.id}
                              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
                                  I
                                </div>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium">{unit.title}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setSelectedUnit(unit);
                                    setShowUnitPreviewDialog(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setSelectedUnit(unit);
                                    setShowEditUnitDialog(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => {
                                    setSelectedUnit(unit);
                                    setShowDeleteUnitDialog(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          </div>
                        </CardContent>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Course Quizzes</h2>
            <Button onClick={() => setShowCreateQuizDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </div>

          {quizzes.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No quizzes yet. Click "Create Quiz" to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id}>
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
                        <span className="font-medium">{quiz.total_questions || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Attempts:</span>
                        <span className="font-medium">{quiz.total_attempts || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Score:</span>
                        <span className="font-medium">
                          {quiz.average_score
                            ? `${quiz.average_score.toFixed(1)}%`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setShowQuizDetailsDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setShowEditQuizDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setShowDeleteQuizDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddModuleDialog
        open={showAddModuleDialog}
        onOpenChange={setShowAddModuleDialog}
        courseId={courseId!}
        onSuccess={loadModules}
      />

      {selectedModule && (
        <AddUnitDialog
          open={showAddUnitDialog}
          onOpenChange={setShowAddUnitDialog}
          moduleId={String(selectedModule.id)}
          moduleTitle={selectedModule.title}
          onSuccess={loadModules}
        />
      )}

      {selectedUnit && (
        <>
          <EditUnitDialog
            open={showEditUnitDialog}
            onOpenChange={setShowEditUnitDialog}
            unit={selectedUnit}
            onSuccess={loadModules}
          />
          <UnitPreviewDialog
            open={showUnitPreviewDialog}
            onOpenChange={setShowUnitPreviewDialog}
            unit={selectedUnit}
          />
        </>
      )}

      {courseId && modules.length > 0 && (
        <CreateQuizDialog
          open={showCreateQuizDialog}
          onOpenChange={setShowCreateQuizDialog}
          courseId={Number(courseId)}
          modules={modules}
          onSuccess={loadQuizzes}
        />
      )}

      {selectedQuiz && (
        <>
          <EditQuizDialog
            open={showEditQuizDialog}
            onOpenChange={setShowEditQuizDialog}
            quiz={selectedQuiz}
            onSuccess={loadQuizzes}
          />
          <QuizDetailsDialog
            open={showQuizDetailsDialog}
            onOpenChange={setShowQuizDetailsDialog}
            quizId={selectedQuiz.id}
          />
          <QuizStatsDialog
            open={showQuizStatsDialog}
            onOpenChange={setShowQuizStatsDialog}
            quizId={selectedQuiz.id}
          />
        </>
      )}

      <ConfirmDialog
        open={showDeleteModuleDialog}
        onOpenChange={setShowDeleteModuleDialog}
        onConfirm={handleDeleteModule}
        title="Delete Module"
        description="Are you sure you want to delete this module? This will also delete all units within it. This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />

      <ConfirmDialog
        open={showDeleteUnitDialog}
        onOpenChange={setShowDeleteUnitDialog}
        onConfirm={handleDeleteUnit}
        title="Delete Unit"
        description="Are you sure you want to delete this unit? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        isProcessing={deleteUnitLoading}
      />

      <ConfirmDialog
        open={showDeleteQuizDialog}
        onOpenChange={setShowDeleteQuizDialog}
        onConfirm={handleDeleteQuiz}
        title="Delete Quiz"
        description="Are you sure you want to delete this quiz? This will also delete all questions and student attempts. This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}

