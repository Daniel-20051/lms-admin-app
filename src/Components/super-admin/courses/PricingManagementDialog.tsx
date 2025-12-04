import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Copy, Save } from "lucide-react";
import {
    getCourses,
    getCoursePrices,
    bulkSetCoursePrices,
    copyCoursePrices,
    type Course,
} from "@/api/courses";
import { getSemesters, type Semester } from "@/api/semesters";

interface PricingManagementDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PricingManagementDialog({ open, onOpenChange }: PricingManagementDialogProps) {
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<string>("");
    const [courses, setCourses] = useState<Course[]>([]);
    const [prices, setPrices] = useState<Record<number, string>>({});
    const [copyFromSemester, setCopyFromSemester] = useState<string>("");
    const [copyToSemester, setCopyToSemester] = useState<string>("");

    // Fetch semesters
    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const response = await getSemesters({ limit: 100 });
                setSemesters(response.data.semesters);
                // Set active semester as default
                const activeSemester = response.data.semesters.find(s => s.status === 'Active');
                if (activeSemester) {
                    setSelectedSemester(`${activeSemester.academic_year}|${activeSemester.semester}`);
                }
            } catch (error) {
                console.error('Error fetching semesters:', error);
                toast.error('Failed to load semesters');
            }
        };

        if (open) {
            fetchSemesters();
        }
    }, [open]);

    // Fetch courses and prices when semester changes
    useEffect(() => {
        const fetchCoursesAndPrices = async () => {
            if (!selectedSemester) return;

            setLoading(true);
            try {
                const [academicYear, semester] = selectedSemester.split('|');
                
                // Fetch all WPU courses
                const coursesResponse = await getCourses({ limit: 1000 });
                const wpuCourses = coursesResponse.data.courses.filter(c => c.owner_type === 'wpu');
                setCourses(wpuCourses);

                // Fetch existing prices for this semester
                try {
                    const pricesResponse = await getCoursePrices({ academic_year: academicYear, semester });
                    const priceMap: Record<number, string> = {};
                    if (pricesResponse.data?.prices && Array.isArray(pricesResponse.data.prices)) {
                        pricesResponse.data.prices.forEach(p => {
                            priceMap[p.course_id] = p.price.toString();
                        });
                    }
                    setPrices(priceMap);
                } catch (priceError) {
                    // If no prices exist yet, that's okay - just set empty prices
                    console.log('No prices set for this semester yet');
                    setPrices({});
                }
            } catch (error) {
                console.error('Error fetching courses and prices:', error);
                toast.error('Failed to load courses and prices');
            } finally {
                setLoading(false);
            }
        };

        fetchCoursesAndPrices();
    }, [selectedSemester]);

    const handlePriceChange = (courseId: number, price: string) => {
        setPrices(prev => ({ ...prev, [courseId]: price }));
    };

    const handleBulkSave = async () => {
        if (!selectedSemester) {
            toast.error('Please select a semester');
            return;
        }

        const [academicYear, semester] = selectedSemester.split('|');
        const priceArray = Object.entries(prices)
            .filter(([_, price]) => price && parseFloat(price) > 0)
            .map(([courseId, price]) => ({
                course_id: parseInt(courseId),
                price: parseFloat(price),
                currency: 'NGN',
            }));

        if (priceArray.length === 0) {
            toast.error('Please set at least one course price');
            return;
        }

        setActionLoading(true);
        try {
            const response = await bulkSetCoursePrices({
                academic_year: academicYear,
                semester: semester,
                prices: priceArray,
            });
            
            toast.success(
                `Successfully saved ${response.data.total} course prices (${response.data.created} created, ${response.data.updated} updated)`
            );
        } catch (error) {
            console.error('Error saving prices:', error);
            toast.error('Failed to save course prices');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCopyPrices = async () => {
        if (!copyFromSemester || !copyToSemester) {
            toast.error('Please select both semesters');
            return;
        }

        if (copyFromSemester === copyToSemester) {
            toast.error('Source and destination semesters must be different');
            return;
        }

        const [fromYear, fromSem] = copyFromSemester.split('|');
        const [toYear, toSem] = copyToSemester.split('|');

        setActionLoading(true);
        try {
            const response = await copyCoursePrices({
                from_academic_year: fromYear,
                from_semester: fromSem,
                to_academic_year: toYear,
                to_semester: toSem,
            });
            
            toast.success(`Successfully copied ${response.data.copied} course prices`);
            
            // Refresh if copying to the currently selected semester
            if (copyToSemester === selectedSemester) {
                setSelectedSemester('');
                setTimeout(() => setSelectedSemester(copyToSemester), 100);
            }
        } catch (error) {
            console.error('Error copying prices:', error);
            toast.error('Failed to copy course prices');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Course Pricing Management</DialogTitle>
                    <DialogDescription>
                        Set and manage course prices for each semester
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="set-prices" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="set-prices">Set Prices</TabsTrigger>
                        <TabsTrigger value="copy-prices">Copy Prices</TabsTrigger>
                    </TabsList>

                    <TabsContent value="set-prices" className="space-y-4">
                        <div className="space-y-2">
                            <Label>Select Semester</Label>
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

                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : courses.length > 0 ? (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Course Prices</CardTitle>
                                        <CardDescription>
                                            Set prices for each course (in NGN)
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border max-h-[400px] overflow-y-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Course Code</TableHead>
                                                        <TableHead>Course Title</TableHead>
                                                        <TableHead>Units</TableHead>
                                                        <TableHead>Price (₦)</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {courses.map((course) => (
                                                        <TableRow key={course.id}>
                                                            <TableCell className="font-medium">
                                                                {course.course_code}
                                                            </TableCell>
                                                            <TableCell>{course.title}</TableCell>
                                                            <TableCell>{course.course_unit}</TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="0.00"
                                                                    value={prices[course.id] || ''}
                                                                    onChange={(e) =>
                                                                        handlePriceChange(course.id, e.target.value)
                                                                    }
                                                                    className="w-32"
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleBulkSave}
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                                        ) : (
                                            <><Save className="mr-2 h-4 w-4" /> Save All Prices</>
                                        )}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                {selectedSemester ? 'No WPU courses found' : 'Please select a semester'}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="copy-prices" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Copy Prices from Another Semester</CardTitle>
                                <CardDescription>
                                    Quickly duplicate course prices from one semester to another
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Copy From (Source Semester)</Label>
                                    <Select value={copyFromSemester} onValueChange={setCopyFromSemester}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select source semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {semesters.map((sem) => (
                                                <SelectItem 
                                                    key={sem.id} 
                                                    value={`${sem.academic_year}|${sem.semester}`}
                                                >
                                                    {sem.academic_year} - {sem.semester}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Copy To (Destination Semester)</Label>
                                    <Select value={copyToSemester} onValueChange={setCopyToSemester}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select destination semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {semesters.map((sem) => (
                                                <SelectItem 
                                                    key={sem.id} 
                                                    value={`${sem.academic_year}|${sem.semester}`}
                                                >
                                                    {sem.academic_year} - {sem.semester}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCopyPrices}
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Copying...</>
                                        ) : (
                                            <><Copy className="mr-2 h-4 w-4" /> Copy Prices</>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
