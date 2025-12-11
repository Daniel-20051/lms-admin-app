import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { BookOpen, FileText } from "lucide-react";
import { hasValidSession } from "@/lib/cookies";
import { Api } from "@/api";
import { useCoursesManagement } from "@/hooks/useCoursesManagement";
import CoursesPagination from "@/Components/super-admin/courses/CoursesPagination";
import CoursesFilters from "@/Components/super-admin/courses/CoursesFilters";
import { toast } from "sonner";

// Get current academic year
const getCurrentAcademicYear = () => {
  const currentYear = new Date().getFullYear();
  return `${currentYear}/${currentYear + 1}`;
};

const CURRENT_YEAR = getCurrentAcademicYear();

export default function ExamsPage() {
  const navigate = useNavigate();
  const {
    courses,
    pagination,
    loading,
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
    currentPage,
    handlePreviousPage,
    handleNextPage,
  } = useCoursesManagement();

  // Session checker
  useEffect(() => {
    if (!hasValidSession()) {
      toast.error("Your session has expired. Please login again.");
      navigate("/admin-login");
      return;
    }
  }, [navigate]);

  // Set current year as default, then try to load active session
  useEffect(() => {
    // Set current year immediately as default
    if (!academicYearFilter) {
      setAcademicYearFilter(CURRENT_YEAR);
    }

    // Then try to load active session and override if found
    const loadActiveSession = async () => {
      try {
        const api = new Api();
        const response = await api.Getsessions();
        const items = response?.data?.data ?? response?.data ?? [];

        if (Array.isArray(items) && items.length > 0) {
          // Find active semester
          const active = items.find((it: any) => it.status === "Active");

          if (active?.academic_year) {
            setAcademicYearFilter(active.academic_year);
          }
        }
      } catch (error) {
        console.error("Error loading active session:", error);
        // Keep current year if error occurs
      }
    };

    loadActiveSession();
  }, [academicYearFilter, setAcademicYearFilter]);

  const handleQuestionBank = (courseId: number) => {
    navigate(`/super-admin/exams/question-bank?courseId=${courseId}`);
  };

  const handleManageExams = (courseId: number) => {
    navigate(`/super-admin/exams/course/${courseId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exams</h1>
          <p className="text-muted-foreground">
            Pick a course to manage its exams.
          </p>
        </div>
      </div>

      {/* Courses Table */}
      <Card>
        <CardContent className="p-6 pb-0">
          {/* Filters */}
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
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No courses found for the selected year.
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">#</TableHead>
                    <TableHead>Course title</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course, index) => {
                    const rowNumber = (currentPage - 1) * pagination.limit + index + 1;
                    return (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{rowNumber}</TableCell>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.course_code}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuestionBank(course.id)}
                              className="gap-2"
                            >
                              <BookOpen className="h-4 w-4" />
                              Question Bank
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleManageExams(course.id)}
                            >
                              Manage exams
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {!loading && courses.length > 0 && (
                <div className="p-4 border-t">
                  <CoursesPagination
                    currentPage={currentPage}
                    pagination={pagination}
                    onPreviousPage={handlePreviousPage}
                    onNextPage={handleNextPage}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

