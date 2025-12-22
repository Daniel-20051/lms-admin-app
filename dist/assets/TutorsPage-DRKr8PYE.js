const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ViewTutorDialog-bYXd3E6F.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/skeleton-Bd8cuwAJ.js","assets/card-DKXLAlrm.js","assets/tabs-CdamqglU.js","assets/admin-BVl3HTxX.js","assets/TutorActionDialogs-uusE3tbT.js","assets/alert-dialog-B-eBACCp.js","assets/label-UX76_odr.js","assets/textarea-LWcfCAwC.js","assets/ViewOrganizationDialog-CzeTlJ50.js","assets/OrganizationActionDialogs-vFm-PEPl.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, x as User, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, b as Eye, aC as CircleCheckBig, D as CircleX, Y as Power, l as Building2, k as BookOpen, r as reactExports, t as toast, $ as ChevronLeft, a0 as ChevronRight, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-DKXLAlrm.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { H as getTutorStatistics, I as getSoleTutors, J as getOrganizations, K as approveSoleTutor, L as rejectSoleTutor, M as updateSoleTutorStatus, N as approveOrganization, O as rejectOrganization, P as updateOrganizationStatus } from './admin-BVl3HTxX.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { L as Label } from './label-UX76_odr.js';
import './index-BHy36ITo.js';

function TutorsTable({
  loading,
  tutors,
  onViewTutor,
  onApproveTutor,
  onRejectTutor,
  onUpdateStatus
}) {
  const getStatusBadge = (status) => {
    if (!status) return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Unknown" });
    const statusLower = status.toLowerCase();
    if (statusLower === "active" || statusLower === "approved") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3 mr-1" }),
        "Active"
      ] });
    } else if (statusLower === "suspended") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Suspended" });
    } else if (statusLower === "pending" || statusLower === "pending_approval") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", children: "Pending" });
    } else if (statusLower === "rejected") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3 mr-1" }),
        "Rejected"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
  };
  const getDisplayFields = (tutor) => {
    const fields = [];
    if (tutor.email) fields.push({ label: "Email", value: tutor.email });
    if (tutor.name) fields.push({ label: "Name", value: tutor.name });
    if (tutor.full_name) fields.push({ label: "Name", value: tutor.full_name });
    if (tutor.fname && tutor.lname) fields.push({ label: "Name", value: `${tutor.fname} ${tutor.lname}` });
    if (tutor.phone) fields.push({ label: "Phone", value: tutor.phone });
    if (tutor.status) fields.push({ label: "Status", value: tutor.status });
    return fields;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[50px]", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8" }) })
    ] }, index)) : tutors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No tutors found" })
    ] }) }) }) : tutors.map((tutor, index) => {
      const displayFields = getDisplayFields(tutor);
      const name = displayFields.find((f) => f.label === "Name")?.value || `Tutor #${tutor.id}`;
      const email = displayFields.find((f) => f.label === "Email")?.value || "N/A";
      const phone = displayFields.find((f) => f.label === "Phone")?.value || "N/A";
      const status = tutor.status || "unknown";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Open menu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onViewTutor(tutor.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-2" }),
              "View Details"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            status.toLowerCase() === "pending" || status.toLowerCase() === "pending_approval" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => onApproveTutor(tutor),
                  className: "text-green-600",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-2" }),
                    "Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => onRejectTutor(tutor),
                  className: "text-red-600",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-2" }),
                    "Reject"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onUpdateStatus(tutor), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-4 w-4 mr-2" }),
              "Update Status"
            ] })
          ] })
        ] }) })
      ] }, tutor.id);
    }) })
  ] }) });
}

function OrganizationsTable({
  loading,
  organizations,
  onViewOrganization,
  onApproveOrganization,
  onRejectOrganization,
  onUpdateStatus
}) {
  const getStatusBadge = (status) => {
    if (!status) return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Unknown" });
    const statusLower = status.toLowerCase();
    if (statusLower === "active" || statusLower === "approved") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3 mr-1" }),
        "Active"
      ] });
    } else if (statusLower === "suspended") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Suspended" });
    } else if (statusLower === "pending" || statusLower === "pending_approval") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", children: "Pending" });
    } else if (statusLower === "rejected") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3 mr-1" }),
        "Rejected"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
  };
  const getDisplayFields = (organization) => {
    const fields = [];
    if (organization.email) fields.push({ label: "Email", value: organization.email });
    if (organization.name) fields.push({ label: "Name", value: organization.name });
    if (organization.organization_name) fields.push({ label: "Name", value: organization.organization_name });
    if (organization.phone) fields.push({ label: "Phone", value: organization.phone });
    if (organization.status) fields.push({ label: "Status", value: organization.status });
    return fields;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[50px]", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8" }) })
    ] }, index)) : organizations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No organizations found" })
    ] }) }) }) : organizations.map((organization, index) => {
      const displayFields = getDisplayFields(organization);
      const name = displayFields.find((f) => f.label === "Name")?.value || `Organization #${organization.id}`;
      const email = displayFields.find((f) => f.label === "Email")?.value || "N/A";
      const phone = displayFields.find((f) => f.label === "Phone")?.value || "N/A";
      const status = organization.status || "unknown";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Open menu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onViewOrganization(organization.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-2" }),
              "View Details"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            status.toLowerCase() === "pending" || status.toLowerCase() === "pending_approval" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => onApproveOrganization(organization),
                  className: "text-green-600",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-2" }),
                    "Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => onRejectOrganization(organization),
                  className: "text-red-600",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-2" }),
                    "Reject"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onUpdateStatus(organization), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-4 w-4 mr-2" }),
              "Update Status"
            ] })
          ] })
        ] }) })
      ] }, organization.id);
    }) })
  ] }) });
}

function TutorsStatistics({
  loading,
  statistics
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium truncate", children: "Sole Tutors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground shrink-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold truncate", children: statistics?.soleTutors.total || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: statistics ? `${statistics.soleTutors.active} active, ${statistics.soleTutors.pending} pending` : "Loading..." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium truncate", children: "Organizations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-muted-foreground shrink-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold truncate", children: statistics?.organizations.total || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: statistics ? `${statistics.organizations.active} active, ${statistics.organizations.pending} pending` : "Loading..." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium truncate", children: "Total Creators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground shrink-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold truncate", children: (statistics?.soleTutors.total || 0) + (statistics?.organizations.total || 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: "All creator types" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium truncate", children: "Creator Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-muted-foreground shrink-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold truncate", children: statistics?.tutorCourses || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 truncate", children: "Total courses" })
      ] })
    ] })
  ] });
}

function OrganizationsFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  verificationStatusFilter,
  onVerificationStatusChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "search", className: "sr-only", children: "Search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "search",
          placeholder: "Search organizations...",
          value: searchTerm,
          onChange: (e) => onSearchChange(e.target.value),
          className: "w-full"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-[180px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status-filter", className: "sr-only", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: onStatusChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "status-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "suspended", children: "Suspended" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rejected", children: "Rejected" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-[200px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "verification-filter", className: "sr-only", children: "Verification Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: verificationStatusFilter, onValueChange: onVerificationStatusChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "verification-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Verification" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Verification" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "verified", children: "Verified" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "unverified", children: "Unverified" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending Verification" })
        ] })
      ] })
    ] })
  ] });
}

const ViewTutorDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewTutorDialog-bYXd3E6F.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7,8]):void 0));
const TutorActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./TutorActionDialogs-uusE3tbT.js'),true              ?__vite__mapDeps([9,1,2,10,11,12]):void 0));
const ViewOrganizationDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewOrganizationDialog-CzeTlJ50.js'),true              ?__vite__mapDeps([13,1,2,3,4,5,6,7,8]):void 0));
const OrganizationActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./OrganizationActionDialogs-vFm-PEPl.js'),true              ?__vite__mapDeps([14,1,2,10,11,12]):void 0));
function TutorsPage() {
  const [statistics, setStatistics] = reactExports.useState(null);
  const [statisticsLoading, setStatisticsLoading] = reactExports.useState(true);
  const [soleTutors, setSoleTutors] = reactExports.useState([]);
  const [soleTutorsLoading, setSoleTutorsLoading] = reactExports.useState(false);
  const [soleTutorsPage, setSoleTutorsPage] = reactExports.useState(1);
  const [soleTutorsPagination, setSoleTutorsPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [organizations, setOrganizations] = reactExports.useState([]);
  const [organizationsLoading, setOrganizationsLoading] = reactExports.useState(false);
  const [organizationsPage, setOrganizationsPage] = reactExports.useState(1);
  const [organizationsPagination, setOrganizationsPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [organizationsSearch, setOrganizationsSearch] = reactExports.useState("");
  const [organizationsStatusFilter, setOrganizationsStatusFilter] = reactExports.useState("all");
  const [organizationsVerificationFilter, setOrganizationsVerificationFilter] = reactExports.useState("all");
  const [activeTab, setActiveTab] = reactExports.useState("sole-tutors");
  const [selectedTutorId, setSelectedTutorId] = reactExports.useState(null);
  const [selectedTutor, setSelectedTutor] = reactExports.useState(null);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showApproveDialog, setShowApproveDialog] = reactExports.useState(false);
  const [showRejectDialog, setShowRejectDialog] = reactExports.useState(false);
  const [showStatusDialog, setShowStatusDialog] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [selectedOrganizationId, setSelectedOrganizationId] = reactExports.useState(null);
  const [selectedOrganization, setSelectedOrganization] = reactExports.useState(null);
  const [showOrgViewDialog, setShowOrgViewDialog] = reactExports.useState(false);
  const [showOrgApproveDialog, setShowOrgApproveDialog] = reactExports.useState(false);
  const [showOrgRejectDialog, setShowOrgRejectDialog] = reactExports.useState(false);
  const [showOrgStatusDialog, setShowOrgStatusDialog] = reactExports.useState(false);
  const [orgActionLoading, setOrgActionLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchStatistics();
  }, []);
  reactExports.useEffect(() => {
    if (activeTab === "sole-tutors") {
      fetchSoleTutors();
    } else if (activeTab === "organizations") {
      fetchOrganizations();
    }
  }, [activeTab, soleTutorsPage, organizationsPage, organizationsSearch, organizationsStatusFilter, organizationsVerificationFilter]);
  const fetchStatistics = async () => {
    try {
      setStatisticsLoading(true);
      const response = await getTutorStatistics();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error("Error fetching tutor statistics:", error);
      toast.error(error.response?.data?.message || "Failed to load tutor statistics");
    } finally {
      setStatisticsLoading(false);
    }
  };
  const fetchSoleTutors = async () => {
    try {
      setSoleTutorsLoading(true);
      const response = await getSoleTutors({ page: soleTutorsPage, limit: 20 });
      if (response.success) {
        setSoleTutors(response.data.tutors);
        setSoleTutorsPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching sole tutors:", error);
      toast.error(error.response?.data?.message || "Failed to load sole tutors");
    } finally {
      setSoleTutorsLoading(false);
    }
  };
  const handleApproveTutor = async () => {
    if (!selectedTutor) return;
    try {
      setActionLoading(true);
      const response = await approveSoleTutor(selectedTutor.id);
      if (response.success) {
        toast.success(response.message || "Tutor approved successfully");
        setShowApproveDialog(false);
        setSelectedTutor(null);
        fetchSoleTutors();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error approving tutor:", error);
      toast.error(error.response?.data?.message || "Failed to approve tutor");
    } finally {
      setActionLoading(false);
    }
  };
  const handleRejectTutor = async (reason) => {
    if (!selectedTutor) return;
    try {
      setActionLoading(true);
      const response = await rejectSoleTutor(selectedTutor.id, { reason });
      if (response.success) {
        toast.success(response.message || "Tutor rejected successfully");
        setShowRejectDialog(false);
        setSelectedTutor(null);
        fetchSoleTutors();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error rejecting tutor:", error);
      toast.error(error.response?.data?.message || "Failed to reject tutor");
    } finally {
      setActionLoading(false);
    }
  };
  const handleUpdateStatus = async (status) => {
    if (!selectedTutor) return;
    try {
      setActionLoading(true);
      const response = await updateSoleTutorStatus(selectedTutor.id, { status });
      if (response.success) {
        toast.success(response.message || "Tutor status updated successfully");
        setShowStatusDialog(false);
        setSelectedTutor(null);
        fetchSoleTutors();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error updating tutor status:", error);
      toast.error(error.response?.data?.message || "Failed to update tutor status");
    } finally {
      setActionLoading(false);
    }
  };
  const fetchOrganizations = async () => {
    try {
      setOrganizationsLoading(true);
      const params = {
        page: organizationsPage,
        limit: 20
      };
      if (organizationsStatusFilter !== "all") {
        params.status = organizationsStatusFilter;
      }
      if (organizationsVerificationFilter !== "all") {
        params.verification_status = organizationsVerificationFilter;
      }
      if (organizationsSearch) {
        params.search = organizationsSearch;
      }
      const response = await getOrganizations(params);
      if (response.success) {
        setOrganizations(response.data.organizations);
        setOrganizationsPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
      toast.error(error.response?.data?.message || "Failed to load organizations");
    } finally {
      setOrganizationsLoading(false);
    }
  };
  const handleApproveOrganization = async () => {
    if (!selectedOrganization) return;
    try {
      setOrgActionLoading(true);
      const response = await approveOrganization(selectedOrganization.id);
      if (response.success) {
        toast.success(response.message || "Organization approved successfully");
        setShowOrgApproveDialog(false);
        setSelectedOrganization(null);
        fetchOrganizations();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error approving organization:", error);
      toast.error(error.response?.data?.message || "Failed to approve organization");
    } finally {
      setOrgActionLoading(false);
    }
  };
  const handleRejectOrganization = async (reason) => {
    if (!selectedOrganization) return;
    try {
      setOrgActionLoading(true);
      const response = await rejectOrganization(selectedOrganization.id, { reason });
      if (response.success) {
        toast.success(response.message || "Organization rejected successfully");
        setShowOrgRejectDialog(false);
        setSelectedOrganization(null);
        fetchOrganizations();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error rejecting organization:", error);
      toast.error(error.response?.data?.message || "Failed to reject organization");
    } finally {
      setOrgActionLoading(false);
    }
  };
  const handleUpdateOrganizationStatus = async (status) => {
    if (!selectedOrganization) return;
    try {
      setOrgActionLoading(true);
      const response = await updateOrganizationStatus(selectedOrganization.id, { status });
      if (response.success) {
        toast.success(response.message || "Organization status updated successfully");
        setShowOrgStatusDialog(false);
        setSelectedOrganization(null);
        fetchOrganizations();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error updating organization status:", error);
      toast.error(error.response?.data?.message || "Failed to update organization status");
    } finally {
      setOrgActionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Creators" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage creators and organizations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TutorsStatistics, { loading: statisticsLoading, statistics }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Creators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View and manage creators by type" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "sole-tutors", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            "Sole Tutors"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "organizations", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
            "Organizations"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "sole-tutors", className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TutorsTable,
            {
              loading: soleTutorsLoading,
              tutors: soleTutors,
              onViewTutor: (id) => {
                setSelectedTutorId(id);
                setShowViewDialog(true);
              },
              onApproveTutor: (tutor) => {
                setSelectedTutor(tutor);
                setShowApproveDialog(true);
              },
              onRejectTutor: (tutor) => {
                setSelectedTutor(tutor);
                setShowRejectDialog(true);
              },
              onUpdateStatus: (tutor) => {
                setSelectedTutor(tutor);
                setShowStatusDialog(true);
              }
            }
          ),
          !soleTutorsLoading && soleTutors.length > 0 && soleTutorsPagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              "Showing ",
              (soleTutorsPage - 1) * soleTutorsPagination.limit + 1,
              " to ",
              Math.min(soleTutorsPage * soleTutorsPagination.limit, soleTutorsPagination.total),
              " of ",
              soleTutorsPagination.total,
              " results"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setSoleTutorsPage((p) => Math.max(1, p - 1)),
                  disabled: soleTutorsPage === 1 || soleTutorsLoading,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                    "Previous"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                "Page ",
                soleTutorsPage,
                " of ",
                soleTutorsPagination.totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setSoleTutorsPage((p) => Math.min(soleTutorsPagination.totalPages, p + 1)),
                  disabled: soleTutorsPage === soleTutorsPagination.totalPages || soleTutorsLoading,
                  children: [
                    "Next",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "organizations", className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OrganizationsFilters,
            {
              searchTerm: organizationsSearch,
              onSearchChange: setOrganizationsSearch,
              statusFilter: organizationsStatusFilter,
              onStatusChange: setOrganizationsStatusFilter,
              verificationStatusFilter: organizationsVerificationFilter,
              onVerificationStatusChange: setOrganizationsVerificationFilter
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OrganizationsTable,
            {
              loading: organizationsLoading,
              organizations,
              onViewOrganization: (id) => {
                setSelectedOrganizationId(id);
                setShowOrgViewDialog(true);
              },
              onApproveOrganization: (org) => {
                setSelectedOrganization(org);
                setShowOrgApproveDialog(true);
              },
              onRejectOrganization: (org) => {
                setSelectedOrganization(org);
                setShowOrgRejectDialog(true);
              },
              onUpdateStatus: (org) => {
                setSelectedOrganization(org);
                setShowOrgStatusDialog(true);
              }
            }
          ),
          !organizationsLoading && organizations.length > 0 && organizationsPagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              "Showing ",
              (organizationsPage - 1) * organizationsPagination.limit + 1,
              " to ",
              Math.min(organizationsPage * organizationsPagination.limit, organizationsPagination.total),
              " of ",
              organizationsPagination.total,
              " results"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setOrganizationsPage((p) => Math.max(1, p - 1)),
                  disabled: organizationsPage === 1 || organizationsLoading,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                    "Previous"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                "Page ",
                organizationsPage,
                " of ",
                organizationsPagination.totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setOrganizationsPage((p) => Math.min(organizationsPagination.totalPages, p + 1)),
                  disabled: organizationsPage === organizationsPagination.totalPages || organizationsLoading,
                  children: [
                    "Next",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewTutorDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedTutorId(null);
          }
        },
        tutorId: selectedTutorId
      },
      `view-${selectedTutorId}-${showViewDialog ? "open" : "closed"}`
    ) }) : null,
    showApproveDialog || showRejectDialog || showStatusDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TutorActionDialogs,
      {
        selectedTutor,
        actionLoading,
        showApproveDialog,
        showRejectDialog,
        showStatusDialog,
        onApproveDialogChange: setShowApproveDialog,
        onRejectDialogChange: setShowRejectDialog,
        onStatusDialogChange: setShowStatusDialog,
        onConfirmApprove: handleApproveTutor,
        onConfirmReject: handleRejectTutor,
        onConfirmStatusUpdate: handleUpdateStatus
      }
    ) }) : null,
    showOrgViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewOrganizationDialog,
      {
        open: showOrgViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowOrgViewDialog(false);
            setSelectedOrganizationId(null);
          }
        },
        organizationId: selectedOrganizationId
      },
      `view-org-${selectedOrganizationId}-${showOrgViewDialog ? "open" : "closed"}`
    ) }) : null,
    showOrgApproveDialog || showOrgRejectDialog || showOrgStatusDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrganizationActionDialogs,
      {
        selectedOrganization,
        actionLoading: orgActionLoading,
        showApproveDialog: showOrgApproveDialog,
        showRejectDialog: showOrgRejectDialog,
        showStatusDialog: showOrgStatusDialog,
        onApproveDialogChange: setShowOrgApproveDialog,
        onRejectDialogChange: setShowOrgRejectDialog,
        onStatusDialogChange: setShowOrgStatusDialog,
        onConfirmApprove: handleApproveOrganization,
        onConfirmReject: handleRejectOrganization,
        onConfirmStatusUpdate: handleUpdateOrganizationStatus
      }
    ) }) : null
  ] });
}

export { TutorsPage as default };
