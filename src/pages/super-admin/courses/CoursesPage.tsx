import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { useCoursesManagement } from "@/hooks/useCoursesManagement";
import CoursesFilters from "@/Components/super-admin/courses/CoursesFilters";
import CoursesTable from "@/Components/super-admin/courses/CoursesTable";
import CoursesPagination from "@/Components/super-admin/courses/CoursesPagination";
import ViewCourseDialog from "@/Components/super-admin/courses/ViewCourseDialog";
import CreateCourseDialog from "@/Components/super-admin/courses/CreateCourseDialog";
import EditCourseDialog from "@/Components/super-admin/courses/EditCourseDialog";
import CourseActionDialogs from "@/Components/super-admin/courses/CourseActionDialogs";

export default function CoursesPage() {
    const {
        courses,
        pagination,
        loading,
        searchTerm,
        programFilter,
        facultyFilter,
        levelFilter,
        semesterFilter,
        currentPage,
        selectedCourseId,
        selectedCourse,
        showViewDialog,
        showCreateDialog,
        showEditDialog,
        showDeleteDialog,
        actionLoading,
        setSearchTerm,
        setProgramFilter,
        setFacultyFilter,
        setLevelFilter,
        setSemesterFilter,
        setSelectedCourseId,
        setSelectedCourse,
        setShowViewDialog,
        setShowCreateDialog,
        setShowEditDialog,
        setShowDeleteDialog,
        handlePreviousPage,
        handleNextPage,
        handleDeleteCourse,
        handleCourseUpdated,
        refetchCourses,
    } = useCoursesManagement();

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Courses Management</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Manage all courses in the system</p>
                </div>
                <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                </Button>
            </div>

            {/* Main Content Card */}
            <Card className="pt-3">
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                    <CardDescription>A list of all courses with their details</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <CoursesFilters
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        programFilter={programFilter}
                        onProgramChange={setProgramFilter}
                        facultyFilter={facultyFilter}
                        onFacultyChange={setFacultyFilter}
                        levelFilter={levelFilter}
                        onLevelChange={setLevelFilter}
                        semesterFilter={semesterFilter}
                        onSemesterChange={setSemesterFilter}
                    />

                    {/* Table */}
                    <CoursesTable
                        loading={loading}
                        courses={courses}
                        searchTerm={searchTerm}
                        onViewCourse={(id) => {
                            setSelectedCourseId(id);
                            setShowViewDialog(true);
                        }}
                        onEditCourse={(id) => {
                            setSelectedCourseId(id);
                            setShowEditDialog(true);
                        }}
                        onDeleteCourse={(course) => {
                            setSelectedCourse(course);
                            setShowDeleteDialog(true);
                        }}
                    />

                    {/* Pagination */}
                    {!loading && courses.length > 0 && (
                        <CoursesPagination
                            currentPage={currentPage}
                            pagination={pagination}
                            onPreviousPage={handlePreviousPage}
                            onNextPage={handleNextPage}
                        />
                    )}
                </CardContent>
            </Card>

            {/* View Course Dialog */}
            <ViewCourseDialog
                key={`view-${selectedCourseId}-${showViewDialog ? 'open' : 'closed'}`}
                open={showViewDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowViewDialog(false);
                        setSelectedCourseId(null);
                    }
                }}
                courseId={selectedCourseId}
            />

            {/* Create Course Dialog */}
            <CreateCourseDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onCourseCreated={refetchCourses}
            />

            {/* Edit Course Dialog */}
            <EditCourseDialog
                open={showEditDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowEditDialog(false);
                        setSelectedCourseId(null);
                    }
                }}
                courseId={selectedCourseId}
                onCourseUpdated={handleCourseUpdated}
            />

            {/* Action Dialogs */}
            <CourseActionDialogs
                selectedCourse={selectedCourse}
                actionLoading={actionLoading}
                showDeleteDialog={showDeleteDialog}
                onDeleteDialogChange={(open) => {
                    setShowDeleteDialog(open);
                    if (!open) {
                        setSelectedCourse(null);
                    }
                }}
                onConfirmDelete={handleDeleteCourse}
            />
        </div>
    );
}

