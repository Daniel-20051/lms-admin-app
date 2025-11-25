import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { useFacultiesManagement } from "@/hooks/useFacultiesManagement";
import FacultiesFilters from "@/Components/super-admin/faculties/FacultiesFilters";
import FacultiesTable from "@/Components/super-admin/faculties/FacultiesTable";
import FacultiesPagination from "@/Components/super-admin/faculties/FacultiesPagination";
import ViewFacultyDialog from "@/Components/super-admin/faculties/ViewFacultyDialog";
import EditFacultyDialog from "@/Components/super-admin/faculties/EditFacultyDialog";
import CreateFacultyDialog from "@/Components/super-admin/faculties/CreateFacultyDialog";
import FacultyActionDialogs from "@/Components/super-admin/faculties/FacultyActionDialogs";
import { Skeleton } from "@/Components/ui/skeleton";
import { Plus } from "lucide-react";
import { deleteFaculty, type Faculty } from "@/api/admin";
import { toast } from "sonner";

export default function FacultiesPage() {
  const {
    faculties,
    loading,
    searchTerm,
    currentPage,
    pagination,
    setSearchTerm,
    handlePreviousPage,
    handleNextPage,
    refetchFaculties,
  } = useFacultiesManagement();

  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Faculties Management</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage all faculties in the system</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      {/* Statistics Card */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Faculty Statistics</CardTitle>
          <CardDescription>Overview of faculty data</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Faculties</p>
                <p className="text-2xl font-bold">{pagination.total}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Programs</p>
                <p className="text-2xl font-bold text-blue-500">
                  {faculties.reduce((sum, faculty) => sum + faculty.programs.length, 0)}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Showing</p>
                <p className="text-2xl font-bold text-green-500">
                  {faculties.length} of {pagination.total}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Card */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>All Faculties</CardTitle>
          <CardDescription>A list of all faculties with their details</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <FacultiesFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Table */}
          <FacultiesTable
            loading={loading}
            faculties={faculties}
            searchTerm={searchTerm}
            onView={(faculty) => {
              setSelectedFacultyId(faculty.id);
              setShowViewDialog(true);
            }}
            onEdit={(faculty) => {
              setSelectedFaculty(faculty);
              setShowEditDialog(true);
            }}
            onDelete={(faculty) => {
              setSelectedFaculty(faculty);
              setShowDeleteDialog(true);
            }}
          />

          {/* Pagination */}
          {!loading && faculties.length > 0 && (
            <FacultiesPagination
              currentPage={currentPage}
              pagination={pagination}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          )}
        </CardContent>
      </Card>

      {/* Create Faculty Dialog */}
      <CreateFacultyDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onFacultyCreated={() => {
          refetchFaculties();
        }}
      />

      {/* View Faculty Dialog */}
      <ViewFacultyDialog
        key={`view-${selectedFacultyId}-${showViewDialog ? 'open' : 'closed'}`}
        open={showViewDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedFacultyId(null);
          }
        }}
        facultyId={selectedFacultyId}
      />

      {/* Edit Faculty Dialog */}
      <EditFacultyDialog
        open={showEditDialog}
        onOpenChange={(open) => {
          setShowEditDialog(open);
          if (!open) {
            setSelectedFaculty(null);
          }
        }}
        faculty={selectedFaculty}
        onFacultyUpdated={() => {
          refetchFaculties();
          setSelectedFaculty(null);
        }}
      />

      {/* Delete Faculty Dialog */}
      <FacultyActionDialogs
        selectedFaculty={selectedFaculty}
        actionLoading={actionLoading}
        showDeleteDialog={showDeleteDialog}
        onDeleteDialogChange={(open) => {
          setShowDeleteDialog(open);
          if (!open) {
            setSelectedFaculty(null);
          }
        }}
        onConfirmDelete={async () => {
          if (!selectedFaculty) return;

          try {
            setActionLoading(true);
            const response = await deleteFaculty(selectedFaculty.id);
            if (response.success) {
              toast.success(response.message || "Faculty deleted successfully");
              refetchFaculties();
              setShowDeleteDialog(false);
              setSelectedFaculty(null);
            }
          } catch (error: any) {
            console.error("Error deleting faculty:", error);
            toast.error(error.response?.data?.message || "Failed to delete faculty");
          } finally {
            setActionLoading(false);
          }
        }}
      />
    </div>
  );
}

