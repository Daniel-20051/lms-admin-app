import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Plus, Edit, Power, Loader2 } from "lucide-react";
import {
  getSchoolFeesConfiguration,
  toggleSchoolFeesConfiguration,
  type SchoolFeesConfiguration,
} from "@/api/admin";
import { getPrograms } from "@/api/programs";
import { getFaculties } from "@/api/base";
import { getSemesters, type Semester } from "@/api/semesters";
import { toast } from "sonner";
import SchoolFeesConfigurationDialog from "./SchoolFeesConfigurationDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";

interface SchoolFeesConfigurationProps {
  onRefresh?: () => void;
}

export default function SchoolFeesConfiguration({ onRefresh }: SchoolFeesConfigurationProps) {
  const [loading, setLoading] = useState(false);
  const [configurations, setConfigurations] = useState<SchoolFeesConfiguration[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingConfig, setEditingConfig] = useState<SchoolFeesConfiguration | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // Filters
  const [academicYearFilter, setAcademicYearFilter] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [programFilter, setProgramFilter] = useState<string>("");
  const [facultyFilter, setFacultyFilter] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    fetchPrograms();
    fetchFaculties();
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const response = await getSemesters({ limit: 100 });
      setSemesters(response.data.semesters);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, [academicYearFilter, levelFilter, programFilter, facultyFilter, activeFilter]);

  const fetchPrograms = async () => {
    try {
      const response = await getPrograms({ limit: 1000 });
      setPrograms(response.data.programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await getFaculties({ limit: 1000 });
      setFaculties(response.data.faculties);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const params: any = {};
      
      if (academicYearFilter) params.academic_year = academicYearFilter;
      if (levelFilter) params.level = levelFilter;
      if (programFilter) params.program_id = parseInt(programFilter);
      if (facultyFilter) params.faculty_id = parseInt(facultyFilter);
      if (activeFilter !== "all") params.is_active = activeFilter === "active";

      const response = await getSchoolFeesConfiguration(params);
      if (response.success) {
        setConfigurations(response.data?.configurations || []);
      }
    } catch (error: any) {
      console.error("Error fetching configurations:", error);
      toast.error(error.response?.data?.message || "Failed to load configurations");
      setConfigurations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingConfig(null);
    setShowDialog(true);
  };

  const handleEdit = (config: SchoolFeesConfiguration) => {
    setEditingConfig(config);
    setShowDialog(true);
  };

  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      setTogglingId(id);
      const response = await toggleSchoolFeesConfiguration(id, !currentStatus);
      if (response.success) {
        toast.success(
          `Configuration ${!currentStatus ? "activated" : "deactivated"} successfully`
        );
        fetchConfigurations();
        if (onRefresh) onRefresh();
      }
    } catch (error: any) {
      console.error("Error toggling configuration:", error);
      toast.error(error.response?.data?.message || "Failed to toggle configuration");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDialogClose = (success: boolean) => {
    setShowDialog(false);
    setEditingConfig(null);
    if (success) {
      fetchConfigurations();
      if (onRefresh) onRefresh();
    }
  };

  const getScopeDescription = (config: SchoolFeesConfiguration) => {
    const parts: string[] = [];
    if (config.level) parts.push(`Level ${config.level}`);
    if (config.program) parts.push(config.program.title);
    if (config.faculty) parts.push(config.faculty.name);
    if (parts.length === 0) return "All Students";
    return parts.join(" • ");
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <Select value={academicYearFilter || "all"} onValueChange={(value) => setAcademicYearFilter(value === "all" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {Array.from(new Set(semesters.map(s => s.academic_year))).sort().map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={levelFilter || "all"} onValueChange={(value) => setLevelFilter(value === "all" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {[100, 200, 300, 400, 500, 600, 700].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      {level} Level
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Program</Label>
              <Select value={programFilter || "all"} onValueChange={(value) => setProgramFilter(value === "all" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id.toString()}>
                      {program.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Faculty</Label>
              <Select value={facultyFilter || "all"} onValueChange={(value) => setFacultyFilter(value === "all" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Faculties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Faculties</SelectItem>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id.toString()}>
                      {faculty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={activeFilter} onValueChange={setActiveFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Configuration
        </Button>
      </div>

      {/* Configurations List */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>School Fees Configurations</CardTitle>
          <CardDescription>
            Configure school fees overrides for specific student groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !configurations || configurations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No configurations found. Click "Add Configuration" to create one.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Academic Year</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configurations.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell className="font-medium">
                        {config.academic_year}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{getScopeDescription(config)}</div>
                          {config.description && (
                            <div className="text-xs text-muted-foreground">
                              {config.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>₦{config.amount.toLocaleString()}</TableCell>
                      <TableCell>{config.currency}</TableCell>
                      <TableCell>
                        <Badge
                          variant={config.is_active ? "default" : "secondary"}
                        >
                          {config.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(config)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggle(config.id, config.is_active)}
                            disabled={togglingId === config.id}
                          >
                            {togglingId === config.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Power className={`h-4 w-4 ${config.is_active ? 'text-yellow-600' : 'text-green-600'}`} />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <SchoolFeesConfigurationDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        configuration={editingConfig}
        programs={programs}
        faculties={faculties}
        onSuccess={handleDialogClose}
      />
    </div>
  );
}

