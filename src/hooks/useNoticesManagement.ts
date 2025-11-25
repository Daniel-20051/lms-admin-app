import { useState, useEffect, useCallback } from "react";
import { getNotices, type Notice, type GetNoticesParams } from "@/api/admin";
import { toast } from "sonner";

export function useNoticesManagement() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const params: GetNoticesParams = {
        page: currentPage,
        limit: 20,
      };
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      if (courseFilter !== "all") {
        if (courseFilter === "system") {
          params.course_id = null; // System-wide notices
        } else {
          params.course_id = parseInt(courseFilter);
        }
      }

      const response = await getNotices(params);
      if (response.success) {
        setNotices(response.data.notices);
        setPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching notices:", error);
      toast.error(error.response?.data?.message || "Failed to load notices");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, courseFilter]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // Reset to page 1 when search term or filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, courseFilter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const refetchNotices = () => {
    fetchNotices();
  };

  return {
    // State
    notices,
    loading,
    searchTerm,
    courseFilter,
    currentPage,
    pagination,

    // Setters
    setSearchTerm,
    setCourseFilter,
    setCurrentPage,

    // Handlers
    handlePreviousPage,
    handleNextPage,
    refetchNotices,
  };
}

