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

interface CourseAllocationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAllocationSuccess?: () => void;
}

const ALLOCATION_TYPES = [
    { value: 'program', label: 'By Program' },
    { value: 'level', label: 'By Level' },
    { value: 'faculty', label: 'By Faculty' },
];

const LEVELS = ['100', '200', '300', '400', '500', '600'];

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
    
    const [selectedSemester, setSelectedSemester] = useState<string>("");
    const [allocationType, setAllocationType] = useState<string>("program");
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [selectedFaculty, setSelectedFaculty] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [courseSearchTerm, setCourseSearchTerm] = useState<string>("");

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [semestersRes, programsRes, facultiesRes] = await Promise.all([
                    getSemesters({ limit: 100 }),
                    getPrograms({ limit: 100 }),
                    getFaculties({ limit: 100 }),
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
                const wpuCourses = coursesResponse.data.courses.filter(c => c.owner_type === 'wpu');
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

    // Filter courses based on search term
    const filteredCourses = courses.filter(course => {
        if (!courseSearchTerm) return true;
        
        const searchLower = courseSearchTerm.toLowerCase();
        return (
            course.course_code.toLowerCase().includes(searchLower) ||
            course.title.toLowerCase().includes(searchLower)
        );
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
            setSelectedProgram("");
            setSelectedFaculty("");
            setSelectedLevel("");
            setCourseSearchTerm("");
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
                        Allocate courses to students by program, level, or faculty
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
                            <SelectContent>
                                {semesters.map((sem) => (
                                    <SelectItem 
                                        key={sem.id} 
                                        value={`${sem.academic_year}|${sem.semester}`}
                                    >
                                        {sem.academic_year} - {sem.semester} {sem.status === 'Active' && '(Active)'}
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
                            <SelectContent>
                                {ALLOCATION_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Dynamic Fields Based on Allocation Type */}
                    {allocationType === 'program' && (
                        <>
                            <div className="space-y-2">
                                <Label>Program *</Label>
                                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {programs.map((program) => (
                                            <SelectItem key={program.id} value={program.id.toString()}>
                                                {program.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Level (Optional)</Label>
                                <Select value={selectedLevel || "all"} onValueChange={(val) => setSelectedLevel(val === "all" ? "" : val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All levels" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All levels</SelectItem>
                                        {LEVELS.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level} Level
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
                                    <SelectContent>
                                        {faculties.map((faculty) => (
                                            <SelectItem key={faculty.id} value={faculty.id.toString()}>
                                                {faculty.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Level (Optional)</Label>
                                <Select value={selectedLevel || "all"} onValueChange={(val) => setSelectedLevel(val === "all" ? "" : val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All levels" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All levels</SelectItem>
                                        {LEVELS.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level} Level
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
                                <SelectContent>
                                    {LEVELS.map((level) => (
                                        <SelectItem key={level} value={level}>
                                            {level} Level
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Course Selection */}
                    <Card className="pt-3">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Select Courses</CardTitle>
                                    <CardDescription>
                                        Choose courses to allocate ({selectedCourses.length} selected)
                                        {courseSearchTerm && ` • Showing ${filteredCourses.length} of ${courses.length} courses`}
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
                            disabled={actionLoading || selectedCourses.length === 0}
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

