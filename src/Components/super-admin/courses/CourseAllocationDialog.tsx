import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogBody } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Users, Search, X } from "lucide-react";
import {
    getCourses,
    allocateCourses,
    type Course,
} from "@/api/courses";
import { getSemesters, type Semester } from "@/api/semesters";
import { getPrograms, type Program } from "@/api/programs";
import { getFaculties, type Faculty } from "@/api/base";
import { getStudents, type Student } from "@/api/admin";

interface CourseAllocationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAllocationSuccess?: () => void;
}

const ALLOCATION_TYPES = [
    { value: 'program', label: 'By Program' },
    { value: 'level', label: 'By Level' },
    { value: 'faculty', label: 'By Faculty' },
    { value: 'individual', label: 'Individual' },
];

const LEVELS = ['100', '200', '300', '400', '500', '600', '700'];

export default function CourseAllocationDialog({ 
    open, 
    onOpenChange, 
    onAllocationSuccess 
}: CourseAllocationDialogProps) {
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    
    const [selectedSemester, setSelectedSemester] = useState<string>("");
    const [allocationType, setAllocationType] = useState<string>("program");
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [selectedFaculty, setSelectedFaculty] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [courseSearchTerm, setCourseSearchTerm] = useState<string>("");
    const [studentSearchTerm, setStudentSearchTerm] = useState<string>("");
    const [studentsLoading, setStudentsLoading] = useState(false);

    // Watch programs state changes
    useEffect(() => {
        // Programs state tracking
    }, [programs]);

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [semestersRes, programsRes, facultiesRes] = await Promise.all([
                    getSemesters({ limit: 1000 }),
                    getPrograms({ limit: 1000 }),
                    getFaculties({ limit: 1000 }),
                ]);

                setSemesters(semestersRes.data.semesters);
                setPrograms(programsRes.data.programs);
                setFaculties(facultiesRes.data.faculties);

                // Set active semester as default
                const activeSemester = semestersRes.data.semesters.find(s => s.status === 'Active');
                if (activeSemester) {
                    setSelectedSemester(`${activeSemester.academic_year}|${activeSemester.semester}`);
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
                toast.error('Failed to load data');
            }
        };

        if (open) {
            fetchInitialData();
        }
    }, [open]);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const coursesResponse = await getCourses({ limit: 1000 });
                // Filter: Only WPU courses that are NOT marketplace (marketplace courses cannot be allocated)
                const wpuCourses = coursesResponse.data.courses.filter(c => 
                    c.owner_type === 'wpu' && 
                    !(c.is_marketplace && c.marketplace_status === 'published')
                );
                setCourses(wpuCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('Failed to load courses');
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchCourses();
        }
    }, [open]);

    // Fetch students when allocation type is 'individual'
    useEffect(() => {
        const fetchStudents = async () => {
            if (allocationType === 'individual' && open) {
                setStudentsLoading(true);
                try {
                    const response = await getStudents({ limit: 1000, search: studentSearchTerm || undefined });
                    if (response.success) {
                        setStudents(response.data.students);
                    }
                } catch (error) {
                    console.error('Error fetching students:', error);
                    toast.error('Failed to load students');
                } finally {
                    setStudentsLoading(false);
                }
            } else {
                setStudents([]);
            }
        };

        const timer = setTimeout(() => {
            fetchStudents();
        }, studentSearchTerm ? 300 : 0); // Debounce search

        return () => clearTimeout(timer);
    }, [allocationType, open, studentSearchTerm]);

    // Clear selected courses when allocation type, program, or faculty changes
    useEffect(() => {
        setSelectedCourses([]);
        setSelectedStudents([]);
    }, [allocationType, selectedProgram, selectedFaculty]);

    // Filter courses based on search term and selected program/faculty
    const filteredCourses = courses.filter(course => {
        // Filter by program if allocation type is "program" and a program is selected
        if (allocationType === 'program' && selectedProgram) {
            if (course.program_id !== parseInt(selectedProgram)) {
                return false;
            }
        }

        // Filter by faculty if allocation type is "faculty" and a faculty is selected
        if (allocationType === 'faculty' && selectedFaculty) {
            if (course.faculty_id !== parseInt(selectedFaculty)) {
                return false;
            }
        }

        // Filter by search term
        if (courseSearchTerm) {
            const searchLower = courseSearchTerm.toLowerCase();
            return (
                course.course_code.toLowerCase().includes(searchLower) ||
                course.title.toLowerCase().includes(searchLower)
            );
        }
        
        return true;
    });

    const handleCourseToggle = (courseId: number) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const handleSelectAllCourses = () => {
        const filteredIds = filteredCourses.map(c => c.id);
        const allFilteredSelected = filteredIds.every(id => selectedCourses.includes(id));
        
        if (allFilteredSelected) {
            // Deselect all filtered courses
            setSelectedCourses(prev => prev.filter(id => !filteredIds.includes(id)));
        } else {
            // Select all filtered courses
            setSelectedCourses(prev => [...new Set([...prev, ...filteredIds])]);
        }
    };

    const handleClearSearch = () => {
        setCourseSearchTerm("");
    };

    const handleStudentToggle = (studentId: number) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSelectAllStudents = () => {
        const filteredStudentIds = filteredStudents.map(s => s.id);
        const allFilteredSelected = filteredStudentIds.every(id => selectedStudents.includes(id));
        
        if (allFilteredSelected) {
            setSelectedStudents(prev => prev.filter(id => !filteredStudentIds.includes(id)));
        } else {
            setSelectedStudents(prev => [...new Set([...prev, ...filteredStudentIds])]);
        }
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student => {
        if (studentSearchTerm) {
            const searchLower = studentSearchTerm.toLowerCase();
            return (
                student.matric_number.toLowerCase().includes(searchLower) ||
                student.email.toLowerCase().includes(searchLower) ||
                `${student.fname} ${student.lname}`.toLowerCase().includes(searchLower)
            );
        }
        return true;
    });

    const handleAllocate = async () => {
        if (!selectedSemester) {
            toast.error('Please select a semester');
            return;
        }

        if (selectedCourses.length === 0) {
            toast.error('Please select at least one course');
            return;
        }

        const [academicYear, semester] = selectedSemester.split('|');
        
        const allocationData: any = {
            allocation_type: allocationType,
            course_ids: selectedCourses,
            academic_year: academicYear,
            semester: semester,
        };

        // Add type-specific fields
        if (allocationType === 'program') {
            if (!selectedProgram) {
                toast.error('Please select a program');
                return;
            }
            allocationData.program_id = parseInt(selectedProgram);
            if (selectedLevel) {
                allocationData.level = selectedLevel;
            }
        } else if (allocationType === 'faculty') {
            if (!selectedFaculty) {
                toast.error('Please select a faculty');
                return;
            }
            allocationData.faculty_id = parseInt(selectedFaculty);
            if (selectedLevel) {
                allocationData.level = selectedLevel;
            }
        } else if (allocationType === 'level') {
            if (!selectedLevel) {
                toast.error('Please select a level');
                return;
            }
            allocationData.level = selectedLevel;
        } else if (allocationType === 'individual') {
            if (selectedStudents.length === 0) {
                toast.error('Please select at least one student');
                return;
            }
            allocationData.student_ids = selectedStudents;
        }

        setActionLoading(true);
        try {
            const response = await allocateCourses(allocationData);
            
            toast.success(
                `Successfully allocated ${response.data.summary.allocated} courses to ${response.data.summary.students_count} students${response.data.summary.skipped > 0 ? ` (${response.data.summary.skipped} skipped)` : ''}`
            );
            
            onAllocationSuccess?.();
            onOpenChange(false);
            
            // Reset form
            setSelectedCourses([]);
            setSelectedStudents([]);
            setSelectedProgram("");
            setSelectedFaculty("");
            setSelectedLevel("");
            setCourseSearchTerm("");
            setStudentSearchTerm("");
        } catch (error) {
            console.error('Error allocating courses:', error);
            toast.error('Failed to allocate courses');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Allocate Courses to Students</DialogTitle>
                    <DialogDescription>
                        Allocate courses to students by program, level, faculty, or individual selection
                    </DialogDescription>
                </DialogHeader>

                <DialogBody>
                    <div className="space-y-6">
                    {/* Semester Selection */}
                    <div className="space-y-2">
                        <Label>Semester</Label>
                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100">
                                {semesters.map((sem) => (
                                    <SelectItem 
                                        key={sem.id} 
                                        value={`${sem.academic_year}|${sem.semester}`}
                                        className="text-gray-900 dark:text-gray-100"
                                    >
                                        <span className="text-foreground">
                                            {sem.academic_year} - {sem.semester} {sem.status === 'Active' && '(Active)'}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Allocation Type Selection */}
                    <div className="space-y-2">
                        <Label>Allocation Type</Label>
                        <Select value={allocationType} onValueChange={setAllocationType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100">
                                {ALLOCATION_TYPES.map((type) => (
                                    <SelectItem 
                                        key={type.value} 
                                        value={type.value}
                                        className="text-gray-900 dark:text-gray-100"
                                    >
                                        <span className="text-foreground">{type.label}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Dynamic Fields Based on Allocation Type */}
                    {allocationType === 'program' && (
                        <>
                            <div className="space-y-2">
                                <Label>
                                    Program *
                                </Label>
                                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={programs.length > 0 ? "Select program" : "Loading programs..."} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100">
                                        {programs.length === 0 ? (
                                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                                No programs available
                                            </div>
                                        ) : (
                                            programs.map((program) => (
                                                <SelectItem 
                                                    key={program.id} 
                                                    value={program.id.toString()}
                                                    className="text-gray-900 dark:text-gray-100"
                                                >
                                                    <span className="text-foreground">{program.title}</span>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Level (Optional)</Label>
                                <Select value={selectedLevel || "all"} onValueChange={(val) => setSelectedLevel(val === "all" ? "" : val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All levels" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100">
                                        <SelectItem value="all" className="text-gray-900 dark:text-gray-100">
                                            <span className="text-foreground">All levels</span>
                                        </SelectItem>
                                        {LEVELS.map((level) => (
                                            <SelectItem 
                                                key={level} 
                                                value={level}
                                                className="text-gray-900 dark:text-gray-100"
                                            >
                                                <span className="text-foreground">{level} Level</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}

                    {allocationType === 'faculty' && (
                        <>
                            <div className="space-y-2">
                                <Label>Faculty *</Label>
                                <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select faculty" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100">
                                        {faculties.length === 0 ? (
                                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                                No faculties available
                                            </div>
                                        ) : (
                                            faculties.map((faculty) => (
                                                <SelectItem 
                                                    key={faculty.id} 
                                                    value={faculty.id.toString()}
                                                    className="text-gray-900 dark:text-gray-100"
                                                >
                                                    <span className="text-foreground">{faculty.name}</span>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Level (Optional)</Label>
                                <Select value={selectedLevel || "all"} onValueChange={(val) => setSelectedLevel(val === "all" ? "" : val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All levels" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100">
                                        <SelectItem value="all" className="text-gray-900 dark:text-gray-100">
                                            <span className="text-foreground">All levels</span>
                                        </SelectItem>
                                        {LEVELS.map((level) => (
                                            <SelectItem 
                                                key={level} 
                                                value={level}
                                                className="text-gray-900 dark:text-gray-100"
                                            >
                                                <span className="text-foreground">{level} Level</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}

                    {allocationType === 'level' && (
                        <div className="space-y-2">
                            <Label>Level *</Label>
                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100">
                                    {LEVELS.map((level) => (
                                        <SelectItem 
                                            key={level} 
                                            value={level}
                                            className="text-gray-900 dark:text-gray-100"
                                        >
                                            <span className="text-foreground">{level} Level</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {allocationType === 'individual' && (
                        <Card className="pt-3">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Select Students</CardTitle>
                                        <CardDescription>
                                            Choose students to allocate courses ({selectedStudents.length} selected)
                                            {studentSearchTerm && ` • Showing ${filteredStudents.length} of ${students.length} students`}
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSelectAllStudents}
                                        disabled={filteredStudents.length === 0}
                                    >
                                        {filteredStudents.every(s => selectedStudents.includes(s.id)) && filteredStudents.length > 0
                                            ? 'Deselect All'
                                            : 'Select All'}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Student Search Input */}
                                <div className="mb-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by matric number, name, or email..."
                                            value={studentSearchTerm}
                                            onChange={(e) => setStudentSearchTerm(e.target.value)}
                                            className="pl-9 pr-9"
                                        />
                                        {studentSearchTerm && (
                                            <button
                                                onClick={() => setStudentSearchTerm("")}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {studentsLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                    </div>
                                ) : filteredStudents.length > 0 ? (
                                    <div className="max-h-[300px] overflow-y-auto space-y-2 border rounded-md p-4">
                                        {filteredStudents.map((student) => (
                                            <div key={student.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`student-${student.id}`}
                                                    checked={selectedStudents.includes(student.id)}
                                                    onCheckedChange={() => handleStudentToggle(student.id)}
                                                />
                                                <Label
                                                    htmlFor={`student-${student.id}`}
                                                    className="flex-1 cursor-pointer"
                                                >
                                                    <span className="font-medium">{student.matric_number}</span> -{' '}
                                                    {student.fname} {student.lname} ({student.email})
                                                    {student.program && ` • ${student.program.title}`}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                ) : studentSearchTerm ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No students found matching "{studentSearchTerm}"
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No students available
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Course Selection */}
                    <Card className="pt-3">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Select Courses</CardTitle>
                                    <CardDescription>
                                        Choose courses to allocate ({selectedCourses.length} selected)
                                        {(courseSearchTerm || selectedProgram || selectedFaculty) && ` • Showing ${filteredCourses.length} of ${courses.length} courses`}
                                        <br />
                                        <span className="text-amber-600 text-xs">
                                            Note: Marketplace courses cannot be allocated - students must purchase them
                                        </span>
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectAllCourses}
                                    disabled={filteredCourses.length === 0}
                                >
                                    {filteredCourses.every(c => selectedCourses.includes(c.id)) && filteredCourses.length > 0
                                        ? 'Deselect All'
                                        : 'Select All'}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Search Input */}
                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by course code or title..."
                                        value={courseSearchTerm}
                                        onChange={(e) => setCourseSearchTerm(e.target.value)}
                                        className="pl-9 pr-9"
                                    />
                                    {courseSearchTerm && (
                                        <button
                                            onClick={handleClearSearch}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : filteredCourses.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto space-y-2 border rounded-md p-4">
                                    {filteredCourses.map((course) => (
                                        <div key={course.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`course-${course.id}`}
                                                checked={selectedCourses.includes(course.id)}
                                                onCheckedChange={() => handleCourseToggle(course.id)}
                                            />
                                            <Label
                                                htmlFor={`course-${course.id}`}
                                                className="flex-1 cursor-pointer"
                                            >
                                                <span className="font-medium">{course.course_code}</span> -{' '}
                                                {course.title} ({course.course_unit} units)
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            ) : courseSearchTerm ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No courses found matching "{courseSearchTerm}"
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No courses available
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={actionLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAllocate}
                            disabled={actionLoading || selectedCourses.length === 0 || (allocationType === 'individual' && selectedStudents.length === 0)}
                        >
                            {actionLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Allocating...</>
                            ) : (
                                <><Users className="mr-2 h-4 w-4" /> Allocate Courses</>
                            )}
                        </Button>
                    </div>
                </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
}

