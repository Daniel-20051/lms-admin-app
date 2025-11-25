import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { useNoticesManagement } from "@/hooks/useNoticesManagement";
import NoticesFilters from "@/Components/super-admin/notices/NoticesFilters";
import NoticesTable from "@/Components/super-admin/notices/NoticesTable";
import NoticesPagination from "@/Components/super-admin/notices/NoticesPagination";
import ViewNoticeDialog from "@/Components/super-admin/notices/ViewNoticeDialog";
import EditNoticeDialog from "@/Components/super-admin/notices/EditNoticeDialog";
import CreateNoticeDialog from "@/Components/super-admin/notices/CreateNoticeDialog";
import NoticeActionDialogs from "@/Components/super-admin/notices/NoticeActionDialogs";
import { Skeleton } from "@/Components/ui/skeleton";
import { Plus } from "lucide-react";
import { deleteNotice, type Notice } from "@/api/admin";
import { toast } from "sonner";

export default function NoticesPage() {
  const {
    notices,
    loading,
    searchTerm,
    courseFilter,
    currentPage,
    pagination,
    setSearchTerm,
    setCourseFilter,
    handlePreviousPage,
    handleNextPage,
    refetchNotices,
  } = useNoticesManagement();

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
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
          <h1 className="text-2xl md:text-3xl font-bold">Notices Management</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage all system notices and announcements</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Notice
        </Button>
      </div>

      {/* Statistics Card */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Notice Statistics</CardTitle>
          <CardDescription>Overview of notice data</CardDescription>
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
                <p className="text-sm text-muted-foreground">Total Notices</p>
                <p className="text-2xl font-bold">{pagination.total}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">System-Wide</p>
                <p className="text-2xl font-bold text-blue-500">
                  {notices.filter(n => n.course_id === null).length}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Showing</p>
                <p className="text-2xl font-bold text-green-500">
                  {notices.length} of {pagination.total}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Card */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>All Notices</CardTitle>
          <CardDescription>A list of all notices with their details</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <NoticesFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            courseFilter={courseFilter}
            onCourseFilterChange={setCourseFilter}
          />

          {/* Table */}
          <NoticesTable
            loading={loading}
            notices={notices}
            searchTerm={searchTerm}
            onView={(notice) => {
              setSelectedNoticeId(notice.id);
              setShowViewDialog(true);
            }}
            onEdit={(notice) => {
              setSelectedNotice(notice);
              setShowEditDialog(true);
            }}
            onDelete={(notice) => {
              setSelectedNotice(notice);
              setShowDeleteDialog(true);
            }}
          />

          {/* Pagination */}
          {!loading && notices.length > 0 && (
            <NoticesPagination
              currentPage={currentPage}
              pagination={pagination}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          )}
        </CardContent>
      </Card>

      {/* Create Notice Dialog */}
      <CreateNoticeDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onNoticeCreated={() => {
          refetchNotices();
        }}
      />

      {/* View Notice Dialog */}
      <ViewNoticeDialog
        key={`view-${selectedNoticeId}-${showViewDialog ? 'open' : 'closed'}`}
        open={showViewDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedNoticeId(null);
          }
        }}
        noticeId={selectedNoticeId}
      />

      {/* Edit Notice Dialog */}
      <EditNoticeDialog
        open={showEditDialog}
        onOpenChange={(open) => {
          setShowEditDialog(open);
          if (!open) {
            setSelectedNotice(null);
          }
        }}
        notice={selectedNotice}
        onNoticeUpdated={() => {
          refetchNotices();
          setSelectedNotice(null);
        }}
      />

      {/* Delete Notice Dialog */}
      <NoticeActionDialogs
        selectedNotice={selectedNotice}
        actionLoading={actionLoading}
        showDeleteDialog={showDeleteDialog}
        onDeleteDialogChange={(open) => {
          setShowDeleteDialog(open);
          if (!open) {
            setSelectedNotice(null);
          }
        }}
        onConfirmDelete={async () => {
          if (!selectedNotice) return;

          try {
            setActionLoading(true);
            const response = await deleteNotice(selectedNotice.id);
            if (response.success) {
              toast.success(response.message || "Notice deleted successfully");
              refetchNotices();
              setShowDeleteDialog(false);
              setSelectedNotice(null);
            }
          } catch (error: any) {
            console.error("Error deleting notice:", error);
            toast.error(error.response?.data?.message || "Failed to delete notice");
          } finally {
            setActionLoading(false);
          }
        }}
      />
    </div>
  );
}

