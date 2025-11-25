import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import { ChevronLeft, ChevronRight, User, Building2 } from "lucide-react";
import { 
  getSoleTutors, 
  approveSoleTutor, 
  rejectSoleTutor, 
  updateSoleTutorStatus,
  getOrganizations,
  approveOrganization,
  rejectOrganization,
  updateOrganizationStatus,
  getTutorStatistics,
  type SoleTutor,
  type Organization,
  type PaginationData,
  type TutorStatistics
} from "@/api/admin";
import { toast } from "sonner";
import TutorsTable from "@/Components/super-admin/tutors/TutorsTable";
import ViewTutorDialog from "@/Components/super-admin/tutors/ViewTutorDialog";
import TutorActionDialogs from "@/Components/super-admin/tutors/TutorActionDialogs";
import OrganizationsTable from "@/Components/super-admin/tutors/OrganizationsTable";
import ViewOrganizationDialog from "@/Components/super-admin/tutors/ViewOrganizationDialog";
import OrganizationActionDialogs from "@/Components/super-admin/tutors/OrganizationActionDialogs";
import TutorsStatistics from "@/Components/super-admin/tutors/TutorsStatistics";
import OrganizationsFilters from "@/Components/super-admin/tutors/OrganizationsFilters";

export default function TutorsPage() {
  // Statistics
  const [statistics, setStatistics] = useState<TutorStatistics | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState(true);

  // Sole Tutors state
  const [soleTutors, setSoleTutors] = useState<SoleTutor[]>([]);
  const [soleTutorsLoading, setSoleTutorsLoading] = useState(false);
  const [soleTutorsPage, setSoleTutorsPage] = useState(1);
  const [soleTutorsPagination, setSoleTutorsPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });

  // Organizations state
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(false);
  const [organizationsPage, setOrganizationsPage] = useState(1);
  const [organizationsPagination, setOrganizationsPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [organizationsSearch, setOrganizationsSearch] = useState("");
  const [organizationsStatusFilter, setOrganizationsStatusFilter] = useState("all");
  const [organizationsVerificationFilter, setOrganizationsVerificationFilter] = useState("all");

  const [activeTab, setActiveTab] = useState("sole-tutors");
  
  // Sole Tutor Dialog states
  const [selectedTutorId, setSelectedTutorId] = useState<number | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<SoleTutor | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Organization Dialog states
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<number | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [showOrgViewDialog, setShowOrgViewDialog] = useState(false);
  const [showOrgApproveDialog, setShowOrgApproveDialog] = useState(false);
  const [showOrgRejectDialog, setShowOrgRejectDialog] = useState(false);
  const [showOrgStatusDialog, setShowOrgStatusDialog] = useState(false);
  const [orgActionLoading, setOrgActionLoading] = useState(false);

  // Fetch statistics on mount
  useEffect(() => {
    fetchStatistics();
  }, []);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "sole-tutors") {
      fetchSoleTutors();
    } else if (activeTab === "organizations") {
      fetchOrganizations();
    }
  }, [activeTab, soleTutorsPage, organizationsPage, organizationsSearch, organizationsStatusFilter, organizationsVerificationFilter]);

  const fetchStatistics = async () => {
    try {
      setStatisticsLoading(true);
      const response = await getTutorStatistics();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching tutor statistics:", error);
      toast.error(error.response?.data?.message || "Failed to load tutor statistics");
    } finally {
      setStatisticsLoading(false);
    }
  };

  const fetchSoleTutors = async () => {
    try {
      setSoleTutorsLoading(true);
      const response = await getSoleTutors({ page: soleTutorsPage, limit: 20 });
      if (response.success) {
        setSoleTutors(response.data.tutors);
        setSoleTutorsPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching sole tutors:", error);
      toast.error(error.response?.data?.message || "Failed to load sole tutors");
    } finally {
      setSoleTutorsLoading(false);
    }
  };

  const handleApproveTutor = async () => {
    if (!selectedTutor) return;

    try {
      setActionLoading(true);
      const response = await approveSoleTutor(selectedTutor.id);
      if (response.success) {
        toast.success(response.message || "Tutor approved successfully");
        setShowApproveDialog(false);
        setSelectedTutor(null);
        fetchSoleTutors(); // Refresh the list
        fetchStatistics(); // Refresh statistics
      }
    } catch (error: any) {
      console.error("Error approving tutor:", error);
      toast.error(error.response?.data?.message || "Failed to approve tutor");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectTutor = async (reason: string) => {
    if (!selectedTutor) return;

    try {
      setActionLoading(true);
      const response = await rejectSoleTutor(selectedTutor.id, { reason });
      if (response.success) {
        toast.success(response.message || "Tutor rejected successfully");
        setShowRejectDialog(false);
        setSelectedTutor(null);
        fetchSoleTutors(); // Refresh the list
        fetchStatistics(); // Refresh statistics
      }
    } catch (error: any) {
      console.error("Error rejecting tutor:", error);
      toast.error(error.response?.data?.message || "Failed to reject tutor");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStatus = async (status: "active" | "suspended") => {
    if (!selectedTutor) return;

    try {
      setActionLoading(true);
      const response = await updateSoleTutorStatus(selectedTutor.id, { status });
      if (response.success) {
        toast.success(response.message || "Tutor status updated successfully");
        setShowStatusDialog(false);
        setSelectedTutor(null);
        fetchSoleTutors(); // Refresh the list
        fetchStatistics(); // Refresh statistics
      }
    } catch (error: any) {
      console.error("Error updating tutor status:", error);
      toast.error(error.response?.data?.message || "Failed to update tutor status");
    } finally {
      setActionLoading(false);
    }
  };

  // Organizations functions
  const fetchOrganizations = async () => {
    try {
      setOrganizationsLoading(true);
      const params: any = {
        page: organizationsPage,
        limit: 20,
      };
      if (organizationsStatusFilter !== "all") {
        params.status = organizationsStatusFilter;
      }
      if (organizationsVerificationFilter !== "all") {
        params.verification_status = organizationsVerificationFilter;
      }
      if (organizationsSearch) {
        params.search = organizationsSearch;
      }
      const response = await getOrganizations(params);
      if (response.success) {
        setOrganizations(response.data.organizations);
        setOrganizationsPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching organizations:", error);
      toast.error(error.response?.data?.message || "Failed to load organizations");
    } finally {
      setOrganizationsLoading(false);
    }
  };

  const handleApproveOrganization = async () => {
    if (!selectedOrganization) return;

    try {
      setOrgActionLoading(true);
      const response = await approveOrganization(selectedOrganization.id);
      if (response.success) {
        toast.success(response.message || "Organization approved successfully");
        setShowOrgApproveDialog(false);
        setSelectedOrganization(null);
        fetchOrganizations(); // Refresh the list
        fetchStatistics(); // Refresh statistics
      }
    } catch (error: any) {
      console.error("Error approving organization:", error);
      toast.error(error.response?.data?.message || "Failed to approve organization");
    } finally {
      setOrgActionLoading(false);
    }
  };

  const handleRejectOrganization = async (reason: string) => {
    if (!selectedOrganization) return;

    try {
      setOrgActionLoading(true);
      const response = await rejectOrganization(selectedOrganization.id, { reason });
      if (response.success) {
        toast.success(response.message || "Organization rejected successfully");
        setShowOrgRejectDialog(false);
        setSelectedOrganization(null);
        fetchOrganizations(); // Refresh the list
        fetchStatistics(); // Refresh statistics
      }
    } catch (error: any) {
      console.error("Error rejecting organization:", error);
      toast.error(error.response?.data?.message || "Failed to reject organization");
    } finally {
      setOrgActionLoading(false);
    }
  };

  const handleUpdateOrganizationStatus = async (status: "active" | "suspended") => {
    if (!selectedOrganization) return;

    try {
      setOrgActionLoading(true);
      const response = await updateOrganizationStatus(selectedOrganization.id, { status });
      if (response.success) {
        toast.success(response.message || "Organization status updated successfully");
        setShowOrgStatusDialog(false);
        setSelectedOrganization(null);
        fetchOrganizations(); // Refresh the list
        fetchStatistics(); // Refresh statistics
      }
    } catch (error: any) {
      console.error("Error updating organization status:", error);
      toast.error(error.response?.data?.message || "Failed to update organization status");
    } finally {
      setOrgActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tutor Management</h1>
        <p className="text-muted-foreground">Manage sole tutors and organizations</p>
      </div>

      {/* Statistics Cards */}
      <TutorsStatistics loading={statisticsLoading} statistics={statistics} />

      {/* Tabs Section */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Tutors</CardTitle>
          <CardDescription>
            View and manage tutors by type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sole-tutors" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Sole Tutors
              </TabsTrigger>
              <TabsTrigger value="organizations" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Organizations
              </TabsTrigger>
            </TabsList>

            {/* Sole Tutors Tab */}
            <TabsContent value="sole-tutors" className="mt-4">
              <TutorsTable
                loading={soleTutorsLoading}
                tutors={soleTutors}
                onViewTutor={(id) => {
                  setSelectedTutorId(id);
                  setShowViewDialog(true);
                }}
                onApproveTutor={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowApproveDialog(true);
                }}
                onRejectTutor={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowRejectDialog(true);
                }}
                onUpdateStatus={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowStatusDialog(true);
                }}
              />

              {/* Pagination */}
              {!soleTutorsLoading && soleTutors.length > 0 && soleTutorsPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((soleTutorsPage - 1) * soleTutorsPagination.limit) + 1} to {Math.min(soleTutorsPage * soleTutorsPagination.limit, soleTutorsPagination.total)} of {soleTutorsPagination.total} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSoleTutorsPage(p => Math.max(1, p - 1))}
                      disabled={soleTutorsPage === 1 || soleTutorsLoading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-sm">
                      Page {soleTutorsPage} of {soleTutorsPagination.totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSoleTutorsPage(p => Math.min(soleTutorsPagination.totalPages, p + 1))}
                      disabled={soleTutorsPage === soleTutorsPagination.totalPages || soleTutorsLoading}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Organizations Tab */}
            <TabsContent value="organizations" className="mt-4">
              {/* Filters */}
              <OrganizationsFilters
                searchTerm={organizationsSearch}
                onSearchChange={setOrganizationsSearch}
                statusFilter={organizationsStatusFilter}
                onStatusChange={setOrganizationsStatusFilter}
                verificationStatusFilter={organizationsVerificationFilter}
                onVerificationStatusChange={setOrganizationsVerificationFilter}
              />

              {/* Table */}
              <OrganizationsTable
                loading={organizationsLoading}
                organizations={organizations}
                onViewOrganization={(id) => {
                  setSelectedOrganizationId(id);
                  setShowOrgViewDialog(true);
                }}
                onApproveOrganization={(org) => {
                  setSelectedOrganization(org);
                  setShowOrgApproveDialog(true);
                }}
                onRejectOrganization={(org) => {
                  setSelectedOrganization(org);
                  setShowOrgRejectDialog(true);
                }}
                onUpdateStatus={(org) => {
                  setSelectedOrganization(org);
                  setShowOrgStatusDialog(true);
                }}
              />

              {/* Pagination */}
              {!organizationsLoading && organizations.length > 0 && organizationsPagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((organizationsPage - 1) * organizationsPagination.limit) + 1} to {Math.min(organizationsPage * organizationsPagination.limit, organizationsPagination.total)} of {organizationsPagination.total} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOrganizationsPage(p => Math.max(1, p - 1))}
                      disabled={organizationsPage === 1 || organizationsLoading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-sm">
                      Page {organizationsPage} of {organizationsPagination.totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOrganizationsPage(p => Math.min(organizationsPagination.totalPages, p + 1))}
                      disabled={organizationsPage === organizationsPagination.totalPages || organizationsLoading}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Tutor Dialog */}
      <ViewTutorDialog
        key={`view-${selectedTutorId}-${showViewDialog ? 'open' : 'closed'}`}
        open={showViewDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedTutorId(null);
          }
        }}
        tutorId={selectedTutorId}
      />

      {/* Sole Tutor Action Dialogs */}
      <TutorActionDialogs
        selectedTutor={selectedTutor}
        actionLoading={actionLoading}
        showApproveDialog={showApproveDialog}
        showRejectDialog={showRejectDialog}
        showStatusDialog={showStatusDialog}
        onApproveDialogChange={setShowApproveDialog}
        onRejectDialogChange={setShowRejectDialog}
        onStatusDialogChange={setShowStatusDialog}
        onConfirmApprove={handleApproveTutor}
        onConfirmReject={handleRejectTutor}
        onConfirmStatusUpdate={handleUpdateStatus}
      />

      {/* View Organization Dialog */}
      <ViewOrganizationDialog
        key={`view-org-${selectedOrganizationId}-${showOrgViewDialog ? 'open' : 'closed'}`}
        open={showOrgViewDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowOrgViewDialog(false);
            setSelectedOrganizationId(null);
          }
        }}
        organizationId={selectedOrganizationId}
      />

      {/* Organization Action Dialogs */}
      <OrganizationActionDialogs
        selectedOrganization={selectedOrganization}
        actionLoading={orgActionLoading}
        showApproveDialog={showOrgApproveDialog}
        showRejectDialog={showOrgRejectDialog}
        showStatusDialog={showOrgStatusDialog}
        onApproveDialogChange={setShowOrgApproveDialog}
        onRejectDialogChange={setShowOrgRejectDialog}
        onStatusDialogChange={setShowOrgStatusDialog}
        onConfirmApprove={handleApproveOrganization}
        onConfirmReject={handleRejectOrganization}
        onConfirmStatusUpdate={handleUpdateOrganizationStatus}
      />
    </div>
  );
}

