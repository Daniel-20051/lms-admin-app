import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { updateCoursePrice, getCourse, type UpdateCoursePriceData } from "@/api/courses";
import { toast } from "sonner";
import { Loader2, DollarSign } from "lucide-react";

interface UpdateCoursePriceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courseId: number | null;
    onPriceUpdated: () => void;
}

const CURRENCIES = ['NGN', 'USD', 'EUR', 'GBP'];

export default function UpdateCoursePriceDialog({
    open,
    onOpenChange,
    courseId,
    onPriceUpdated,
}: UpdateCoursePriceDialogProps) {
    const [loading, setLoading] = useState(false);
    const [fetchingCourse, setFetchingCourse] = useState(false);
    const [price, setPrice] = useState<string>('');
    const [currency, setCurrency] = useState<string>('NGN');
    const [courseTitle, setCourseTitle] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Fetch course details when dialog opens
    useEffect(() => {
        const fetchCourse = async () => {
            if (open && courseId) {
                setFetchingCourse(true);
                try {
                    const response = await getCourse(courseId);
                    if (response.success && response.data.course) {
                        const course = response.data.course;
                        setCourseTitle(course.title);
                        setCourseCode(course.course_code);
                        setPrice(course.price || '0');
                        setCurrency(course.currency || 'NGN');
                        setError('');
                    }
                } catch (error: any) {
                    console.error('Error fetching course:', error);
                    toast.error('Failed to load course details');
                    onOpenChange(false);
                } finally {
                    setFetchingCourse(false);
                }
            }
        };

        fetchCourse();
    }, [open, courseId, onOpenChange]);

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setPrice('');
            setCurrency('NGN');
            setError('');
            setCourseTitle('');
            setCourseCode('');
        }
    }, [open]);

    const validateForm = (): boolean => {
        setError('');
        
        if (!price || price.trim() === '') {
            setError('Price is required');
            return false;
        }

        const priceNum = parseFloat(price);
        if (isNaN(priceNum)) {
            setError('Price must be a valid number');
            return false;
        }

        if (priceNum < 0) {
            setError('Price must be a positive number');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!courseId || !validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const priceNum = parseFloat(price);
            const updateData: UpdateCoursePriceData = {
                price: priceNum,
                currency: currency,
            };

            const response = await updateCoursePrice(courseId, updateData);
            
            if (response.success) {
                toast.success('Course price updated successfully');
                onPriceUpdated();
                onOpenChange(false);
            }
        } catch (error: any) {
            console.error('Error updating course price:', error);
            const errorMessage = error?.response?.data?.message || 'Failed to update course price';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const isLoading = fetchingCourse || loading;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Update Course Price
                    </DialogTitle>
                    <DialogDescription>
                        Update the price for this course. The price will be used for all future registrations.
                    </DialogDescription>
                </DialogHeader>

                {fetchingCourse ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Loading course details...</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            {/* Course Info Display */}
                            <div className="rounded-lg bg-muted p-4 space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">Course</div>
                                <div className="text-base font-semibold">
                                    {courseCode} - {courseTitle}
                                </div>
                            </div>

                            {/* Price Input */}
                            <div className="space-y-2">
                                <Label htmlFor="price">
                                    Price <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        setError('');
                                    }}
                                    className={error ? 'border-destructive' : ''}
                                    disabled={isLoading}
                                />
                                {error && (
                                    <p className="text-sm text-destructive">{error}</p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Enter the price for this course. Use 0 for free courses.
                                </p>
                            </div>

                            {/* Currency Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Select
                                    value={currency}
                                    onValueChange={setCurrency}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger id="currency">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CURRENCIES.map((curr) => (
                                            <SelectItem key={curr} value={curr}>
                                                {curr}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <DollarSign className="mr-2 h-4 w-4" />
                                        Update Price
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

