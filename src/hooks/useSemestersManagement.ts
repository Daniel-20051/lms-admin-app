import { useState, useEffect, useCallback } from 'react';
import { getSemesters, deleteSemester, type Semester, type PaginationData, type GetSemestersParams } from '@/api/semesters';
import { toast } from 'sonner';

export const useSemestersManagement = () => {
    // State for semesters data
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
    });

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [academicYearFilter, setAcademicYearFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<'active' | 'closed' | 'all'>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Loading states
    const [loading, setLoading] = useState(false);

    // Dialog states
    const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCloseDialog, setShowCloseDialog] = useState(false);
    const [showExtendDialog, setShowExtendDialog] = useState(false);
    const [showActivateDialog, setShowActivateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // Fetch semesters function
    const fetchSemesters = useCallback(async () => {
        setLoading(true);
        try {
            const params: GetSemestersParams = {
                page: currentPage,
                limit: 20,
            };

            if (academicYearFilter) {
                params.academicYear = academicYearFilter;
            }

            if (statusFilter !== 'all') {
                params.status = statusFilter as 'active' | 'closed';
            }

            const response = await getSemesters(params);
            setSemesters(response.data.semesters);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Error fetching semesters:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch semesters');
            setSemesters([]);
            setPagination({
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
            });
        } finally {
            setLoading(false);
        }
    }, [currentPage, academicYearFilter, statusFilter]);

    // Fetch semesters on mount and when filters change
    useEffect(() => {
        fetchSemesters();
    }, [fetchSemesters]);

    // Reset to page 1 when filters change
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [academicYearFilter, statusFilter]);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < pagination.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Action handlers
    const handleDeleteSemester = async () => {
        if (!selectedSemester) return;

        setActionLoading(true);
        try {
            await deleteSemester(selectedSemester.id);
            toast.success('Semester deleted successfully');
            setShowDeleteDialog(false);
            setSelectedSemester(null);
            fetchSemesters();
        } catch (error: any) {
            console.error('Error deleting semester:', error);
            toast.error(error?.response?.data?.message || 'Failed to delete semester');
        } finally {
            setActionLoading(false);
        }
    };

    const handleSemesterUpdated = () => {
        toast.success('Semester updated successfully');
        setShowEditDialog(false);
        setSelectedSemesterId(null);
        fetchSemesters();
    };

    const handleSemesterClosed = () => {
        setShowCloseDialog(false);
        setSelectedSemester(null);
        fetchSemesters();
    };

    const handleSemesterExtended = () => {
        setShowExtendDialog(false);
        setSelectedSemester(null);
        fetchSemesters();
    };

    const handleSemesterActivated = () => {
        setShowActivateDialog(false);
        setSelectedSemester(null);
        fetchSemesters();
    };

    return {
        // Data
        semesters,
        pagination,
        loading,

        // Filters
        searchTerm,
        setSearchTerm,
        academicYearFilter,
        setAcademicYearFilter,
        statusFilter,
        setStatusFilter,
        currentPage,

        // Selected items
        selectedSemesterId,
        setSelectedSemesterId,
        selectedSemester,
        setSelectedSemester,

        // Dialog states
        showViewDialog,
        setShowViewDialog,
        showCreateDialog,
        setShowCreateDialog,
        showEditDialog,
        setShowEditDialog,
        showCloseDialog,
        setShowCloseDialog,
        showExtendDialog,
        setShowExtendDialog,
        showActivateDialog,
        setShowActivateDialog,
        showDeleteDialog,
        setShowDeleteDialog,
        actionLoading,
        setActionLoading,

        // Handlers
        handleNextPage,
        handlePreviousPage,
        handleDeleteSemester,
        handleSemesterUpdated,
        handleSemesterClosed,
        handleSemesterExtended,
        handleSemesterActivated,
        fetchSemesters,
        refetchSemesters: fetchSemesters, // Alias for clarity
    };
};

