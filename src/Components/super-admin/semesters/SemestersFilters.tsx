import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";

interface SemestersFiltersProps {
    academicYearFilter: string | null;
    onAcademicYearChange: (value: string | null) => void;
    statusFilter: 'active' | 'closed' | 'all';
    onStatusChange: (value: 'active' | 'closed' | 'all') => void;
    availableAcademicYears: string[];
}

export default function SemestersFilters({
    academicYearFilter,
    onAcademicYearChange,
    statusFilter,
    onStatusChange,
    availableAcademicYears,
}: SemestersFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Academic Year Filter */}
            <div className="space-y-2 flex-1">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Select 
                    value={academicYearFilter || 'all'} 
                    onValueChange={(value) => onAcademicYearChange(value === 'all' ? null : value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Academic Years" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Academic Years</SelectItem>
                        {availableAcademicYears.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

