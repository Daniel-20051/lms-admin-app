import { useState, useEffect, useCallback } from 'react';
import { getPrograms, deleteProgram, type Program, type PaginationData } from '@/api/programs';
import { toast } from 'sonner';

export const useProgramsManagement = () => {
    // State for programs data
    const [programs, setPrograms] = useState<Program[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
    });

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [facultyFilter, setFacultyFilter] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState<'Y' | 'N' | 'all'>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Dialog states
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Loading states
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // Fetch programs function
    const fetchPrograms = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = {
                page: currentPage,
                limit: 20,
            };

            if (searchTerm) {
                params.search = searchTerm;
            }

            if (facultyFilter) {
                params.facultyId = facultyFilter;
            }

            if (statusFilter !== 'all') {
                params.status = statusFilter;
            }

            const response = await getPrograms(params);
            setPrograms(response.data.programs);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Error fetching programs:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch programs');
            setPrograms([]);
            setPagination({
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
            });
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, facultyFilter, statusFilter]);

    // Fetch programs on mount and when filters change
    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    // Reset to page 1 when filters change
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [searchTerm, facultyFilter, statusFilter]);

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
    const handleDeleteProgram = async () => {
        if (!selectedProgram) return;

        setActionLoading(true);
        try {
            await deleteProgram(selectedProgram.id);
            toast.success('Program deleted successfully');
            setShowDeleteDialog(false);
            setSelectedProgram(null);
            fetchPrograms();
        } catch (error: any) {
            console.error('Error deleting program:', error);
            toast.error(error?.response?.data?.message || 'Failed to delete program');
        } finally {
            setActionLoading(false);
        }
    };

    const handleProgramUpdated = () => {
        toast.success('Program updated successfully');
        setShowEditDialog(false);
        setSelectedProgramId(null);
        fetchPrograms();
    };

    const handleProgramCreated = () => {
        toast.success('Program created successfully');
        setShowCreateDialog(false);
        fetchPrograms();
    };

    return {
        // Data
        programs,
        pagination,
        loading,
        actionLoading,

        // Filters
        searchTerm,
        setSearchTerm,
        facultyFilter,
        setFacultyFilter,
        statusFilter,
        setStatusFilter,
        currentPage,

        // Selected items
        selectedProgram,
        setSelectedProgram,
        selectedProgramId,
        setSelectedProgramId,

        // Dialog states
        showViewDialog,
        setShowViewDialog,
        showEditDialog,
        setShowEditDialog,
        showCreateDialog,
        setShowCreateDialog,
        showDeleteDialog,
        setShowDeleteDialog,

        // Handlers
        handleNextPage,
        handlePreviousPage,
        handleDeleteProgram,
        handleProgramUpdated,
        handleProgramCreated,
        fetchPrograms,
        refetchPrograms: fetchPrograms, // Alias for clarity
    };
};
