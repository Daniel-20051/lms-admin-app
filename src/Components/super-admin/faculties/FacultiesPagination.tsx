import { Button } from "@/Components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationData } from "@/api/admin";

interface FacultiesPaginationProps {
  currentPage: number;
  pagination: PaginationData;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export default function FacultiesPagination({
  currentPage,
  pagination,
  onPreviousPage,
  onNextPage,
}: FacultiesPaginationProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {((currentPage - 1) * (pagination.limit || 20)) + 1} to{" "}
        {Math.min(
          currentPage * (pagination.limit || 20),
          pagination.total || 0
        )}{" "}
        of {pagination.total || 0} faculties
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <div className="text-sm font-medium px-3">
          Page {currentPage} of {pagination.totalPages || 1}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={currentPage >= (pagination.totalPages || 1)}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

