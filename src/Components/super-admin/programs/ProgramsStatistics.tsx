import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { GraduationCap, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import type { Program, PaginationData } from "@/api/programs";

interface ProgramsStatisticsProps {
    loading: boolean;
    programs: Program[];
    pagination: PaginationData;
    currentPage: number;
}

export default function ProgramsStatistics({
    loading,
    programs,
    pagination,
}: ProgramsStatisticsProps) {
    // Calculate statistics
    const activePrograms = programs.filter((p) => p.status === 'Y').length;
    const inactivePrograms = programs.filter((p) => p.status === 'N').length;

    // Get unique faculties count
    const uniqueFaculties = new Set(programs.map((p) => p.faculty_id)).size;

    const stats = [
        {
            title: "Total Programs",
            value: loading ? "..." : pagination.total,
            icon: GraduationCap,
            description: "All programs in the system",
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-950/30",
        },
        {
            title: "Active Programs",
            value: loading ? "..." : activePrograms,
            icon: CheckCircle2,
            description: "Currently active programs",
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-950/30",
        },
        {
            title: "Inactive Programs",
            value: loading ? "..." : inactivePrograms,
            icon: XCircle,
            description: "Deactivated programs",
            color: "text-red-600",
            bgColor: "bg-red-50 dark:bg-red-950/30",
        },
        {
            title: "Faculties",
            value: loading ? "..." : uniqueFaculties,
            icon: BookOpen,
            description: "Unique faculties on this page",
            color: "text-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-950/30",
        },
    ];

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
