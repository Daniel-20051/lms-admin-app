import { useState, useEffect, useCallback } from 'react';
import { getCourses, deleteCourse, type Course, type PaginationData, type GetCoursesParams } from '@/api/courses';
import { toast } from 'sonner';

export const useCoursesManagement = () => {
    // State for courses data
    const [courses, setCourses] = useState<Course[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
    });

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [programFilter, setProgramFilter] = useState<number | null>(null);
    const [facultyFilter, setFacultyFilter] = useState<number | null>(null);
    const [staffFilter, setStaffFilter] = useState<number | null>(null);
    const [levelFilter, setLevelFilter] = useState<number | null>(null);
    const [semesterFilter, setSemesterFilter] = useState<string | null>(null);
    const [academicYearFilter, setAcademicYearFilter] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Loading states
    const [loading, setLoading] = useState(false);

    // Dialog states
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showViewDialog, setShowViewDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // Fetch courses function
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const params: GetCoursesParams = {
                page: currentPage,
                limit: 20,
            };

            if (searchTerm) {
                params.search = searchTerm;
            }

            if (programFilter) {
                params.programId = programFilter;
            }

            if (facultyFilter) {
                params.facultyId = facultyFilter;
            }

            if (staffFilter) {
                params.staffId = staffFilter;
            }

            if (levelFilter) {
                params.level = levelFilter;
            }

            if (semesterFilter) {
                params.semester = semesterFilter;
            }

            if (academicYearFilter) {
                params.academic_year = academicYearFilter;
            }

            const response = await getCourses(params);
            setCourses(response.data.courses);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Error fetching courses:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch courses');
            setCourses([]);
            setPagination({
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
            });
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, programFilter, facultyFilter, staffFilter, levelFilter, semesterFilter, academicYearFilter]);

    // Fetch courses on mount and when filters change
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Reset to page 1 when filters change
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [searchTerm, programFilter, facultyFilter, staffFilter, levelFilter, semesterFilter, academicYearFilter]);

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
    const handleDeleteCourse = async () => {
        if (!selectedCourse) return;

        setActionLoading(true);
        try {
            await deleteCourse(selectedCourse.id);
            toast.success('Course deleted successfully');
            setShowDeleteDialog(false);
            setSelectedCourse(null);
            fetchCourses();
        } catch (error: any) {
            console.error('Error deleting course:', error);
            toast.error(error?.response?.data?.message || 'Failed to delete course');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCourseUpdated = () => {
        toast.success('Course updated successfully');
        setShowEditDialog(false);
        setSelectedCourseId(null);
        fetchCourses();
    };

    return {
        // Data
        courses,
        pagination,
        loading,

        // Filters
        searchTerm,
        setSearchTerm,
        programFilter,
        setProgramFilter,
        facultyFilter,
        setFacultyFilter,
        staffFilter,
        setStaffFilter,
        levelFilter,
        setLevelFilter,
        semesterFilter,
        setSemesterFilter,
        academicYearFilter,
        setAcademicYearFilter,
        currentPage,

        // Selected items
        selectedCourseId,
        setSelectedCourseId,
        selectedCourse,
        setSelectedCourse,

        // Dialog states
        showViewDialog,
        setShowViewDialog,
        showCreateDialog,
        setShowCreateDialog,
        showEditDialog,
        setShowEditDialog,
        showDeleteDialog,
        setShowDeleteDialog,
        actionLoading,

        // Handlers
        handleNextPage,
        handlePreviousPage,
        handleDeleteCourse,
        handleCourseUpdated,
        fetchCourses,
        refetchCourses: fetchCourses, // Alias for clarity
    };
};

