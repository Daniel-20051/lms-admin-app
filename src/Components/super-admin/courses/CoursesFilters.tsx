import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Search } from "lucide-react";

interface CoursesFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    semesterFilter: string | null;
    onSemesterChange: (value: string | null) => void;
    academicYearFilter: string | null;
    onAcademicYearChange: (value: string | null) => void;
}

// Mock data - you may want to fetch these from an API
const SEMESTERS = ['1ST', '2ND'];

// Generate academic years (e.g., 2020/2021, 2021/2022, etc.)
const generateAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    // Generate years from 5 years ago to 2 years ahead
    for (let i = -5; i <= 2; i++) {
        const year = currentYear + i;
        years.push(`${year}/${year + 1}`);
    }
    return years.reverse(); // Most recent first
};

const ACADEMIC_YEARS = generateAcademicYears();

export default function CoursesFilters({
    searchTerm,
    onSearchChange,
    semesterFilter,
    onSemesterChange,
    academicYearFilter,
    onAcademicYearChange,
}: CoursesFiltersProps) {
    return (
        <div className="flex flex-col gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search courses by title or code..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Academic Year Filter */}
                <Select 
                    value={academicYearFilter || 'all'} 
                    onValueChange={(value) => onAcademicYearChange(value === 'all' ? null : value)}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="All Academic Years" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Academic Years</SelectItem>
                        {ACADEMIC_YEARS.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Semester Filter */}
                <Select 
                    value={semesterFilter || 'all'} 
                    onValueChange={(value) => onSemesterChange(value === 'all' ? null : value)}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="All Semesters" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Semesters</SelectItem>
                        {SEMESTERS.map((semester) => (
                            <SelectItem key={semester} value={semester}>
                                {semester} Semester
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

