import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { useProgramsManagement } from "@/hooks/useProgramsManagement";
import ProgramsStatistics from "@/Components/super-admin/programs/ProgramsStatistics";
import ProgramsFilters from "@/Components/super-admin/programs/ProgramsFilters";
import ProgramsTable from "@/Components/super-admin/programs/ProgramsTable";
import ProgramsPagination from "@/Components/super-admin/programs/ProgramsPagination";
import ProgramActionDialogs from "@/Components/super-admin/programs/ProgramActionDialogs";
import ViewProgramDialog from "@/Components/super-admin/programs/ViewProgramDialog";
import CreateProgramDialog from "@/Components/super-admin/programs/CreateProgramDialog";
import EditProgramDialog from "@/Components/super-admin/programs/EditProgramDialog";

export default function ProgramsPage() {
    const {
        programs,
        pagination,
        loading,
        searchTerm,
        statusFilter,
        facultyFilter,
        currentPage,
        selectedProgram,
        selectedProgramId,
        actionLoading,
        showViewDialog,
        showEditDialog,
        showDeleteDialog,
        showCreateDialog,
        setSearchTerm,
        setStatusFilter,
        setFacultyFilter,
        setSelectedProgram,
        setSelectedProgramId,
        setShowViewDialog,
        setShowEditDialog,
        setShowDeleteDialog,
        setShowCreateDialog,
        handlePreviousPage,
        handleNextPage,
        handleDeleteProgram,
        handleProgramUpdated,
        refetchPrograms,
    } = useProgramsManagement();

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Programs Management</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Manage all academic programs in the system</p>
                </div>
                <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Program
                </Button>
            </div>

            {/* Statistics Cards */}
            <ProgramsStatistics
                loading={loading}
                programs={programs}
                pagination={pagination}
                currentPage={currentPage}
            />

            {/* Main Content Card */}
            <Card className="pt-3">
                <CardHeader>
                    <CardTitle>All Programs</CardTitle>
                    <CardDescription>A list of all academic programs with their details</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <ProgramsFilters
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        facultyFilter={facultyFilter}
                        onFacultyChange={setFacultyFilter}
                    />

                    {/* Table */}
                    <ProgramsTable
                        loading={loading}
                        programs={programs}
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        onViewProgram={(id) => {
                            setSelectedProgramId(id);
                            setShowViewDialog(true);
                        }}
                        onEditProgram={(id) => {
                            setSelectedProgramId(id);
                            setShowEditDialog(true);
                        }}
                        onDeleteProgram={(program) => {
                            setSelectedProgram(program);
                            setShowDeleteDialog(true);
                        }}
                    />

                    {/* Pagination */}
                    {!loading && programs.length > 0 && (
                        <ProgramsPagination
                            currentPage={currentPage}
                            pagination={pagination}
                            onPreviousPage={handlePreviousPage}
                            onNextPage={handleNextPage}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Action Dialogs */}
            <ProgramActionDialogs
                selectedProgram={selectedProgram}
                actionLoading={actionLoading}
                showDeleteDialog={showDeleteDialog}
                onDeleteDialogChange={(open) => {
                    setShowDeleteDialog(open);
                    if (!open) {
                        setSelectedProgram(null);
                    }
                }}
                onConfirmDelete={handleDeleteProgram}
            />

            {/* View Program Dialog */}
            <ViewProgramDialog
                key={`view-${selectedProgramId}-${showViewDialog ? 'open' : 'closed'}`}
                open={showViewDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowViewDialog(false);
                        setSelectedProgramId(null);
                    }
                }}
                programId={selectedProgramId}
            />

            {/* Create Program Dialog */}
            <CreateProgramDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onProgramCreated={refetchPrograms}
            />

            {/* Edit Program Dialog */}
            <EditProgramDialog
                open={showEditDialog}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowEditDialog(false);
                        setSelectedProgramId(null);
                    }
                }}
                programId={selectedProgramId}
                onProgramUpdated={handleProgramUpdated}
            />
        </div>
    );
}
