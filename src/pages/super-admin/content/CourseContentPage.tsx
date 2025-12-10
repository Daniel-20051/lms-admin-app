import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { BookOpen, FolderOpen, Users } from "lucide-react";
import { useCoursesManagement } from "@/hooks/useCoursesManagement";
import CoursesFilters from "@/Components/super-admin/courses/CoursesFilters";
import CoursesPagination from "@/Components/super-admin/courses/CoursesPagination";

export default function CourseContentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const basePath = isSuperAdmin ? "/super-admin" : "/admin";

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
    currentPage,
    setSearchTerm,
    setSemesterFilter,
    setAcademicYearFilter,
    setProgramFilter,
    setFacultyFilter,
    setStaffFilter,
    setLevelFilter,
    handlePreviousPage,
    handleNextPage,
  } = useCoursesManagement();

  const handleCourseClick = (courseId: number) => {
    navigate(`${basePath}/content/course-content/${courseId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Content Management</h1>
          <p className="text-muted-foreground">
            Manage course modules, units, and learning materials
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="pt-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filter Courses</CardTitle>
          <CardDescription className="text-sm">
            Use filters to find courses to manage their content
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

      {/* Courses Grid */}
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
      ) : courses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No courses found. Try adjusting your filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
            <Card
              key={course.id}
              className="pt-3 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {course.course_code}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    Level {course.course_level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {course.program && (
                  <div className="text-sm text-muted-foreground">
                    {course.program.title}
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{course.modules_count || 0} Modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students_count || 0} Students</span>
                  </div>
                </div>
                <Button className="w-full" variant="secondary">
                  Manage Content
                </Button>
              </CardContent>
            </Card>
            ))}
          </div>

          {/* Pagination */}
          {!loading && courses.length > 0 && (
            <CoursesPagination
              currentPage={currentPage}
              pagination={pagination}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          )}
        </>
      )}
    </div>
  );
}

