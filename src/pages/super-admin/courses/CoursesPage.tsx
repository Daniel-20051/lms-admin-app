import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Plus, DollarSign, Users, List } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCoursesManagement } from "@/hooks/useCoursesManagement";
import CoursesFilters from "@/Components/super-admin/courses/CoursesFilters";
import CoursesTable from "@/Components/super-admin/courses/CoursesTable";
import CoursesPagination from "@/Components/super-admin/courses/CoursesPagination";
import ViewCourseDialog from "@/Components/super-admin/courses/ViewCourseDialog";
import CreateCourseDialog from "@/Components/super-admin/courses/CreateCourseDialog";
import EditCourseDialog from "@/Components/super-admin/courses/EditCourseDialog";
import CourseActionDialogs from "@/Components/super-admin/courses/CourseActionDialogs";
import PricingManagementDialog from "@/Components/super-admin/courses/PricingManagementDialog";
import CourseAllocationDialog from "@/Components/super-admin/courses/CourseAllocationDialog";
import AllocationsView from "@/Components/super-admin/courses/AllocationsView";

export default function CoursesPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        courses,
        pagination,
        loading,
        searchTerm,
        semesterFilter,
        academicYearFilter,
        programFilter,
        currentPage,
        selectedCourseId,
        selectedCourse,
        showViewDialog,
        showCreateDialog,
        showEditDialog,
        showDeleteDialog,
        actionLoading,
        setSearchTerm,
        setSemesterFilter,
        setAcademicYearFilter,
        setProgramFilter,
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

    // State for management dialogs
    const [showPricingDialog, setShowPricingDialog] = useState(false);
    const [showAllocationDialog, setShowAllocationDialog] = useState(false);
    const [allocationsRefreshKey, setAllocationsRefreshKey] = useState(0);

    // Initialize program filter from URL on mount
    useEffect(() => {
        const programIdFromUrl = searchParams.get('program');
        if (programIdFromUrl) {
            setProgramFilter(parseInt(programIdFromUrl));
        }
    }, []);

    // Update URL when program filter changes
    useEffect(() => {
        if (programFilter) {
            setSearchParams({ program: programFilter.toString() });
        } else {
            setSearchParams({});
        }
    }, [programFilter]);

    const handleProgramChange = (programId: number | null) => {
        setProgramFilter(programId);
    };

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

            {/* Main Content with Tabs */}
            <Tabs defaultValue="courses" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="courses">
                        <List className="h-4 w-4 mr-2" />
                        Courses
                    </TabsTrigger>
                    <TabsTrigger value="pricing">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Pricing
                    </TabsTrigger>
                    <TabsTrigger value="allocation">
                        <Users className="h-4 w-4 mr-2" />
                        Allocations
                    </TabsTrigger>
                </TabsList>

                {/* Courses Tab */}
                <TabsContent value="courses">
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
                                semesterFilter={semesterFilter}
                                onSemesterChange={setSemesterFilter}
                                academicYearFilter={academicYearFilter}
                                onAcademicYearChange={setAcademicYearFilter}
                                programFilter={programFilter}
                                onProgramChange={handleProgramChange}
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
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing">
                    <Card className="pt-3">
                        <CardHeader>
                            <CardTitle>Course Pricing Management</CardTitle>
                            <CardDescription>
                                Set and manage course prices for each semester
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => setShowPricingDialog(true)}>
                                <DollarSign className="h-4 w-4 mr-2" />
                                Manage Course Prices
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Allocation Tab */}
                <TabsContent value="allocation">
                    <Card className="pt-3">
                        <CardContent>
                            <AllocationsView 
                                onAddAllocation={() => setShowAllocationDialog(true)}
                                refreshKey={allocationsRefreshKey}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

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

            {/* Pricing Management Dialog */}
            <PricingManagementDialog
                open={showPricingDialog}
                onOpenChange={setShowPricingDialog}
            />

            {/* Course Allocation Dialog */}
            <CourseAllocationDialog
                open={showAllocationDialog}
                onOpenChange={setShowAllocationDialog}
                onAllocationSuccess={() => {
                    // Refresh allocations list
                    setAllocationsRefreshKey(prev => prev + 1);
                }}
            />
        </div>
    );
}

