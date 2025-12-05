import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getPrograms, type Program } from "@/api/programs";
import { getFaculties, type Faculty } from "@/api/base";
import { getStaff, type Staff } from "@/api/admin";

interface CoursesFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    semesterFilter: string | null;
    onSemesterChange: (value: string | null) => void;
    academicYearFilter: string | null;
    onAcademicYearChange: (value: string | null) => void;
    programFilter: number | null;
    onProgramChange: (value: number | null) => void;
    facultyFilter: number | null;
    onFacultyChange: (value: number | null) => void;
    staffFilter: number | null;
    onStaffChange: (value: number | null) => void;
    levelFilter: number | null;
    onLevelChange: (value: number | null) => void;
}

// Mock data - you may want to fetch these from an API
const SEMESTERS = ['1ST', '2ND'];
const LEVELS = [100, 200, 300, 400, 500, 600, 700];

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
    programFilter,
    onProgramChange,
    facultyFilter,
    onFacultyChange,
    staffFilter,
    onStaffChange,
    levelFilter,
    onLevelChange,
}: CoursesFiltersProps) {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loadingPrograms, setLoadingPrograms] = useState(false);
    const [loadingFaculties, setLoadingFaculties] = useState(false);
    const [loadingStaff, setLoadingStaff] = useState(false);

    // Fetch all data on mount
    useEffect(() => {
        const fetchData = async () => {
            // Fetch programs
            setLoadingPrograms(true);
            try {
                const response = await getPrograms({ limit: 1000 });
                setPrograms(response.data.programs);
            } catch (error) {
                console.error('Error fetching programs:', error);
            } finally {
                setLoadingPrograms(false);
            }

            // Fetch faculties
            setLoadingFaculties(true);
            try {
                const response = await getFaculties({ limit: 1000 });
                setFaculties(response.data.faculties);
            } catch (error) {
                console.error('Error fetching faculties:', error);
            } finally {
                setLoadingFaculties(false);
            }

            // Fetch staff
            setLoadingStaff(true);
            try {
                const response = await getStaff({ limit: 1000 });
                setStaff(response.data.staff);
            } catch (error) {
                console.error('Error fetching staff:', error);
            } finally {
                setLoadingStaff(false);
            }
        };

        fetchData();
    }, []);

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

            {/* Filters Row 1 */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Program Filter */}
                <Select 
                    value={programFilter ? programFilter.toString() : 'all'} 
                    onValueChange={(value) => onProgramChange(value === 'all' ? null : parseInt(value))}
                    disabled={loadingPrograms}
                >
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="All Programs" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        <SelectItem value="all">All Programs</SelectItem>
                        {programs.map((program) => (
                            <SelectItem key={program.id} value={program.id.toString()}>
                                {program.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Faculty Filter */}
                <Select 
                    value={facultyFilter ? facultyFilter.toString() : 'all'} 
                    onValueChange={(value) => onFacultyChange(value === 'all' ? null : parseInt(value))}
                    disabled={loadingFaculties}
                >
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="All Faculties" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        <SelectItem value="all">All Faculties</SelectItem>
                        {faculties.map((faculty) => (
                            <SelectItem key={faculty.id} value={faculty.id.toString()}>
                                {faculty.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Staff/Instructor Filter */}
                <Select 
                    value={staffFilter ? staffFilter.toString() : 'all'} 
                    onValueChange={(value) => onStaffChange(value === 'all' ? null : parseInt(value))}
                    disabled={loadingStaff}
                >
                    <SelectTrigger className="w-full sm:w-[220px]">
                        <SelectValue placeholder="All Instructors" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        <SelectItem value="all">All Instructors</SelectItem>
                        {staff.map((instructor) => (
                            <SelectItem key={instructor.id} value={instructor.id.toString()}>
                                {instructor.full_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Level Filter */}
                <Select 
                    value={levelFilter ? levelFilter.toString() : 'all'} 
                    onValueChange={(value) => onLevelChange(value === 'all' ? null : parseInt(value))}
                >
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {LEVELS.map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                                {level} Level
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Filters Row 2 */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Academic Year Filter */}
                <Select 
                    value={academicYearFilter || 'all'} 
                    onValueChange={(value) => onAcademicYearChange(value === 'all' ? null : value)}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="All Academic Years" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
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

