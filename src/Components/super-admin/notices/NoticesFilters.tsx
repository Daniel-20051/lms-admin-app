import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

interface NoticesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  courseFilter: string;
  onCourseFilterChange: (value: string) => void;
}

export default function NoticesFilters({
  searchTerm,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
}: NoticesFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notices..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={courseFilter} onValueChange={onCourseFilterChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Filter by course" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Notices</SelectItem>
          <SelectItem value="system">System-Wide</SelectItem>
          {/* Course-specific filters can be added here if needed */}
        </SelectContent>
      </Select>
    </div>
  );
}

