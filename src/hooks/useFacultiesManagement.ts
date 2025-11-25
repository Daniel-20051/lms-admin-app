import { useState, useEffect, useCallback } from "react";
import { getFaculties, type Faculty, type GetFacultiesParams } from "@/api/admin";
import { toast } from "sonner";

export function useFacultiesManagement() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const fetchFaculties = useCallback(async () => {
    try {
      setLoading(true);
      const params: GetFacultiesParams = {
        page: currentPage,
        limit: 20,
      };
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await getFaculties(params);
      if (response.success) {
        setFaculties(response.data.faculties);
        setPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching faculties:", error);
      toast.error(error.response?.data?.message || "Failed to load faculties");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

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

  const refetchFaculties = () => {
    fetchFaculties();
  };

  return {
    // State
    faculties,
    loading,
    searchTerm,
    currentPage,
    pagination,

    // Setters
    setSearchTerm,
    setCurrentPage,

    // Handlers
    handlePreviousPage,
    handleNextPage,
    refetchFaculties,
  };
}

