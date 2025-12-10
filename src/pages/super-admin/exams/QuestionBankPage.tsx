import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { 
  BookOpen, 
  Plus, 
  FileQuestion, 
  ListChecks
} from "lucide-react";
import { GetBankQuestions, AddObjectiveQuestion, AddTheoryQuestion } from "@/api/exams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { toast } from "sonner";
import { useCoursesManagement } from "@/hooks/useCoursesManagement";
import CoursesFilters from "@/Components/super-admin/courses/CoursesFilters";

interface Course {
  id: number;
  title: string;
  course_code: string;
}

interface BankQuestion {
  id: number;
  question_type: "objective" | "theory";
  objective?: {
    question_text: string;
    marks: number;
    options: Array<{ id: string; text: string; is_correct?: boolean }>;
  };
  theory?: Array<{
    question_text: string;
    max_marks: number;
  }>;
}

export default function QuestionBankPage() {
  const location = useLocation();

  const {
    courses,
    loading: coursesLoading,
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

  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCourse) {
      loadQuestions();
    }
  }, [selectedCourse]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await GetBankQuestions(Number(selectedCourse));
      if (response.data.success) {
        setQuestions(response.data.data || []);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const objectiveQuestions = questions.filter((q) => q.question_type === "objective");
  const theoryQuestions = questions.filter((q) => q.question_type === "theory");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground">
            Manage reusable exam questions
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="pt-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filter Courses</CardTitle>
          <CardDescription className="text-sm">
            Use filters to find courses for question bank management
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

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Course</CardTitle>
          <CardDescription>
            Choose a course to manage its question bank
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={String(course.id)}>
                  {course.course_code} - {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedCourse && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Questions</CardDescription>
                <CardTitle className="text-3xl">{questions.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Objective Questions</CardDescription>
                <CardTitle className="text-3xl">{objectiveQuestions.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Theory Questions</CardDescription>
                <CardTitle className="text-3xl">{theoryQuestions.length}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Questions Tabs */}
          <Tabs defaultValue="objective" className="space-y-4">
            <TabsList>
              <TabsTrigger value="objective">
                <ListChecks className="h-4 w-4 mr-2" />
                Objective Questions ({objectiveQuestions.length})
              </TabsTrigger>
              <TabsTrigger value="theory">
                <FileQuestion className="h-4 w-4 mr-2" />
                Theory Questions ({theoryQuestions.length})
              </TabsTrigger>
            </TabsList>

            {/* Objective Questions Tab */}
            <TabsContent value="objective" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Objective Questions</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Objective Question
                </Button>
              </div>

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
              ) : objectiveQuestions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      No objective questions yet. Click "Add Objective Question" to create one.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {objectiveQuestions.map((question, index) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {index + 1}. {question.objective?.question_text}
                            </CardTitle>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">
                                {question.objective?.marks} marks
                              </Badge>
                              <Badge variant="secondary">
                                {question.objective?.options.length} options
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {question.objective?.options.map((option, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded border ${
                                option.is_correct
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : ""
                              }`}
                            >
                              <span className="font-medium">{String.fromCharCode(65 + idx)}. </span>
                              {option.text}
                              {option.is_correct && (
                                <Badge variant="default" className="ml-2">
                                  Correct
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Theory Questions Tab */}
            <TabsContent value="theory" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Theory Questions</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Theory Question
                </Button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : theoryQuestions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileQuestion className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      No theory questions yet. Click "Add Theory Question" to create one.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {theoryQuestions.map((question, index) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {index + 1}. {question.theory?.[0]?.question_text}
                            </CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {question.theory?.[0]?.max_marks} marks
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

