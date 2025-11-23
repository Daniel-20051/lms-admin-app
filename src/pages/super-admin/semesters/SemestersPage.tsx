import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { useSemestersManagement } from "@/hooks/useSemestersManagement";
import SemestersFilters from "@/Components/super-admin/semesters/SemestersFilters";
import SemestersTable from "@/Components/super-admin/semesters/SemestersTable";
import SemestersPagination from "@/Components/super-admin/semesters/SemestersPagination";
import ViewSemesterDialog from "@/Components/super-admin/semesters/ViewSemesterDialog";
import CreateSemesterDialog from "@/Components/super-admin/semesters/CreateSemesterDialog";
import EditSemesterDialog from "@/Components/super-admin/semesters/EditSemesterDialog";
import CloseSemesterDialog from "@/Components/super-admin/semesters/CloseSemesterDialog";
import ExtendSemesterDialog from "@/Components/super-admin/semesters/ExtendSemesterDialog";
import ActivateSemesterDialog from "@/Components/super-admin/semesters/ActivateSemesterDialog";
import SemesterActionDialogs from "@/Components/super-admin/semesters/SemesterActionDialogs";
import { useMemo } from "react";

export default function SemestersPage() {
    const {
        semesters,
        pagination,
        loading,
        academicYearFilter,
        statusFilter,
        currentPage,
        selectedSemesterId,
        selectedSemester,
        showViewDialog,
        showCreateDialog,
        showEditDialog,
        showCloseDialog,
        showExtendDialog,
        showActivateDialog,
        showDeleteDialog,
        actionLoading,
        setAcademicYearFilter,
        setStatusFilter,
        setSelectedSemesterId,
        setSelectedSemester,
        setShowViewDialog,
        setShowCreateDialog,
        setShowEditDialog,
        setShowCloseDialog,
        setShowExtendDialog,
        setShowActivateDialog,
        setShowDeleteDialog,
        setActionLoading,
        handlePreviousPage,
        handleNextPage,
        handleDeleteSemester,
        handleSemesterUpdated,
        handleSemesterClosed,
        handleSemesterExtended,
        handleSemesterActivated,
        refetchSemesters,
    } = useSemestersManagement();

    // Extract unique academic years from semesters
    const availableAcademicYears = useMemo(() => {
        const years = new Set<string>();
        semesters.forEach(semester => {
            if (semester.academic_year) {
                years.add(semester.academic_year);
            }
        });
        return Array.from(years).sort().reverse(); // Sort descending (newest first)
    }, [semesters]);

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Semesters Management</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Manage all academic semesters in the system</p>
                </div>
                <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Semester
                </Button>
            </div>

            {/* Main Content Card */}
            <Card className="pt-3">
                <CardHeader>
                    <CardTitle>All Semesters</CardTitle>
                    <CardDescription>A list of all academic semesters with their details</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <SemestersFilters
                        academicYearFilter={academicYearFilter}
                        onAcademicYearChange={setAcademicYearFilter}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        availableAcademicYears={availableAcademicYears}
                    />

                    {/* Table */}
                    <SemestersTable
                        loading={loading}
                        semesters={semesters}
                        academicYearFilter={academicYearFilter}
                        statusFilter={statusFilter}
                        onViewSemester={(id) => {
                            setSelectedSemesterId(id);
                            setShowViewDialog(true);
                        }}
                        onEditSemester={(id) => {
                            setSelectedSemesterId(id);
                            setShowEditDialog(true);
                        }}
                        onCloseSemester={(semester) => {
                            setSelectedSemester(semester);
                            setShowCloseDialog(true);
                        }}
                        onExtendSemester={(semester) => {
                            setSelectedSemester(semester);
                            setShowExtendDialog(true);
                        }}
                        onActivateSemester={(semester) => {
                            setSelectedSemester(semester);
                            setShowActivateDialog(true);
                        }}
                        onDeleteSemester={(semester) => {
                            setSelectedSemester(semester);
                            setShowDeleteDialog(true);
                        }}
                    />

                    {/* Pagination */}
                    {!loading && semesters.length > 0 && (
                        <SemestersPagination
                            currentPage={currentPage}
                            pagination={pagination}
                            onPreviousPage={handlePreviousPage}
                            onNextPage={handleNextPage}
                        />
                    )}
                </CardContent>
            </Card>

            {/* View Semester Dialog */}
            <ViewSemesterDialog
                key={`view-${selectedSemesterId}-${showViewDialog ? 'open' : 'closed'}`}
                open={showViewDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowViewDialog(false);
                        setSelectedSemesterId(null);
                    }
                }}
                semesterId={selectedSemesterId}
            />

            {/* Create Semester Dialog */}
            <CreateSemesterDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSemesterCreated={refetchSemesters}
            />

            {/* Edit Semester Dialog */}
            <EditSemesterDialog
                open={showEditDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowEditDialog(false);
                        setSelectedSemesterId(null);
                    }
                }}
                semesterId={selectedSemesterId}
                onSemesterUpdated={handleSemesterUpdated}
            />

            {/* Close Semester Dialog */}
            <CloseSemesterDialog
                open={showCloseDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowCloseDialog(false);
                        setSelectedSemester(null);
                    }
                }}
                selectedSemester={selectedSemester}
                onSemesterClosed={handleSemesterClosed}
                actionLoading={actionLoading}
                setActionLoading={setActionLoading}
            />

            {/* Extend Semester Dialog */}
            <ExtendSemesterDialog
                open={showExtendDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowExtendDialog(false);
                        setSelectedSemester(null);
                    }
                }}
                selectedSemester={selectedSemester}
                onSemesterExtended={handleSemesterExtended}
                actionLoading={actionLoading}
                setActionLoading={setActionLoading}
            />

            {/* Activate Semester Dialog */}
            <ActivateSemesterDialog
                open={showActivateDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowActivateDialog(false);
                        setSelectedSemester(null);
                    }
                }}
                selectedSemester={selectedSemester}
                onSemesterActivated={handleSemesterActivated}
                actionLoading={actionLoading}
                setActionLoading={setActionLoading}
            />

            {/* Action Dialogs */}
            <SemesterActionDialogs
                selectedSemester={selectedSemester}
                actionLoading={actionLoading}
                showDeleteDialog={showDeleteDialog}
                onDeleteDialogChange={(open) => {
                    setShowDeleteDialog(open);
                    if (!open) {
                        setSelectedSemester(null);
                    }
                }}
                onConfirmDelete={handleDeleteSemester}
            />
        </div>
    );
}

