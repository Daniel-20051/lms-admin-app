import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Search } from "lucide-react";

interface CoursesFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    programFilter: number | null;
    onProgramChange: (value: number | null) => void;
    facultyFilter: number | null;
    onFacultyChange: (value: number | null) => void;
    levelFilter: number | null;
    onLevelChange: (value: number | null) => void;
    semesterFilter: string | null;
    onSemesterChange: (value: string | null) => void;
}

// Mock data - you may want to fetch these from an API
const LEVELS = [100, 200, 300, 400, 500];
const SEMESTERS = ['1ST', '2ND'];

export default function CoursesFilters({
    searchTerm,
    onSearchChange,
    programFilter,
    onProgramChange,
    facultyFilter,
    onFacultyChange,
    levelFilter,
    onLevelChange,
    semesterFilter,
    onSemesterChange,
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
                {/* Program Filter - will be populated dynamically */}
                <Select 
                    value={programFilter?.toString() || 'all'} 
                    onValueChange={(value) => onProgramChange(value === 'all' ? null : parseInt(value))}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="All Programs" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Programs</SelectItem>
                        {/* Programs will be populated from API */}
                    </SelectContent>
                </Select>

                {/* Faculty Filter - will be populated dynamically */}
                <Select 
                    value={facultyFilter?.toString() || 'all'} 
                    onValueChange={(value) => onFacultyChange(value === 'all' ? null : parseInt(value))}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="All Faculties" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Faculties</SelectItem>
                        {/* Faculties will be populated from API */}
                    </SelectContent>
                </Select>

                {/* Level Filter */}
                <Select 
                    value={levelFilter?.toString() || 'all'} 
                    onValueChange={(value) => onLevelChange(value === 'all' ? null : parseInt(value))}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {LEVELS.map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                                Level {level}
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

