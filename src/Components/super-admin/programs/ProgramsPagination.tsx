import { Button } from "@/Components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationData } from "@/api/programs";

interface ProgramsPaginationProps {
    currentPage: number;
    pagination: PaginationData;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

export default function ProgramsPagination({
    currentPage,
    pagination,
    onPreviousPage,
    onNextPage,
}: ProgramsPaginationProps) {
    const startIndex = (currentPage - 1) * pagination.limit + 1;
    const endIndex = Math.min(currentPage * pagination.limit, pagination.total);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{startIndex}</span> to{" "}
                <span className="font-medium">{endIndex}</span> of{" "}
                <span className="font-medium">{pagination.total}</span> programs
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
                <div className="text-sm">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{pagination.totalPages}</span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onNextPage}
                    disabled={currentPage === pagination.totalPages}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}
