import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Search } from "lucide-react";

interface ProgramsFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: 'Y' | 'N' | 'all';
    onStatusChange: (value: 'Y' | 'N' | 'all') => void;
}

export default function ProgramsFilters({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange,
}: ProgramsFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search programs by title..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Y">Active</SelectItem>
                    <SelectItem value="N">Inactive</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
