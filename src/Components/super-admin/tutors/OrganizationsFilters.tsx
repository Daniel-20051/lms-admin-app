import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";

interface OrganizationsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  verificationStatusFilter: string;
  onVerificationStatusChange: (value: string) => void;
}

export default function OrganizationsFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  verificationStatusFilter,
  onVerificationStatusChange,
}: OrganizationsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Search */}
      <div className="flex-1">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-[180px]">
        <Label htmlFor="status-filter" className="sr-only">
          Status
        </Label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger id="status-filter">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Verification Status Filter */}
      <div className="w-full sm:w-[200px]">
        <Label htmlFor="verification-filter" className="sr-only">
          Verification Status
        </Label>
        <Select value={verificationStatusFilter} onValueChange={onVerificationStatusChange}>
          <SelectTrigger id="verification-filter">
            <SelectValue placeholder="All Verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Verification</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
            <SelectItem value="pending">Pending Verification</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

