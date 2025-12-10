import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { BookOpen } from "lucide-react";
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

      {/* Courses Table */}
      <Card className="pt-3">
        <CardContent>
          {loading ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-9 w-32 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No courses found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S/N</TableHead>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course, index) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * (pagination?.limit || 20) + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{course.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {course.course_code}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            Level {course.course_level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {course.program?.title || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="secondary"
                            onClick={() => handleCourseClick(course.id)}
                          >
                            Manage Content
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {!loading && courses.length > 0 && (
                <div className="mt-6">
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

