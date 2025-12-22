import { a as useAuth, r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, p as SquarePen, X, q as Save, v as Avatar, w as AvatarFallback, S as Shield, x as User, M as Mail, P as Phone, y as Calendar, z as Clock, C as CircleCheck, D as CircleX, i as UserCog, k as BookOpen, F as FileText, H as Settings, s as setUserData } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { a as getAdminProfile, u as updateAdminProfile } from './admin-BVl3HTxX.js';

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    fname: "",
    lname: "",
    mname: "",
    email: "",
    phone: ""
  });
  reactExports.useEffect(() => {
    fetchProfile();
  }, []);
  reactExports.useEffect(() => {
    if (profile) {
      setFormData({
        fname: profile.fname,
        lname: profile.lname,
        mname: profile.mname || "",
        email: profile.email,
        phone: profile.phone
      });
    }
  }, [profile]);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getAdminProfile();
      if (response.success) {
        setProfile(response.data.admin);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        fname: profile.fname,
        lname: profile.lname,
        mname: profile.mname || "",
        email: profile.email,
        phone: profile.phone
      });
    }
  };
  const handleSave = async () => {
    if (!profile) return;
    try {
      setIsSaving(true);
      const updateData = {
        id: profile.id,
        email: formData.email,
        fname: formData.fname,
        lname: formData.lname,
        mname: formData.mname || null,
        role: profile.role,
        phone: formData.phone
      };
      const response = await updateAdminProfile(updateData);
      if (response.success) {
        const updatedProfile = {
          ...profile,
          fname: formData.fname,
          lname: formData.lname,
          mname: formData.mname || null,
          email: formData.email,
          phone: formData.phone
        };
        setProfile(updatedProfile);
        if (user) {
          const updatedUser = {
            ...user,
            name: `${formData.fname} ${formData.mname ? formData.mname + " " : ""}${formData.lname}`,
            email: formData.email
          };
          setUser(updatedUser);
          setUserData(updatedUser);
        }
        toast.success(response.message || "Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const getInitials = (fname, lname) => {
    if (!fname && !lname) return "SA";
    const firstInitial = fname?.[0] || "";
    const lastInitial = lname?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase();
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-96 mt-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 lg:col-span-2" })
      ] })
    ] });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed to load profile" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold", children: "Admin Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground", children: "View and edit your profile information" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleEdit, className: "w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
        "Edit Profile"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleCancel, disabled: isSaving, className: "flex-1 sm:flex-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
          "Cancel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, disabled: isSaving, className: "flex-1 sm:flex-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
          isSaving ? "Saving..." : "Save Changes"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-1 pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Profile Picture" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your account avatar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-32 w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-3xl", children: getInitials(isEditing ? formData.fname : profile.fname, isEditing ? formData.lname : profile.lname) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-lg", children: [
              isEditing ? formData.fname : profile.fname,
              " ",
              (isEditing ? formData.mname : profile.mname) ? (isEditing ? formData.mname : profile.mname) + " " : "",
              isEditing ? formData.lname : profile.lname
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: profile.status === "active" ? "default" : "secondary", className: "mt-2", children: profile.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3 w-3" }),
            profile.role.replace("_", " ").toUpperCase()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Personal Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your account details" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: "First Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.fname,
                    onChange: (e) => handleInputChange("fname", e.target.value),
                    disabled: !isEditing
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: "Last Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.lname,
                    onChange: (e) => handleInputChange("lname", e.target.value),
                    disabled: !isEditing
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: "Middle Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.mname,
                    onChange: (e) => handleInputChange("mname", e.target.value),
                    disabled: !isEditing,
                    placeholder: "Optional"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.email,
                    onChange: (e) => handleInputChange("email", e.target.value),
                    disabled: !isEditing,
                    type: "email"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.phone,
                    onChange: (e) => handleInputChange("phone", e.target.value),
                    disabled: !isEditing,
                    type: "tel"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground", children: "Account ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: `#${profile.id}`, disabled: true })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 space-y-3 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Created:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatDate(profile.created_at) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Last Login:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatDate(profile.last_login) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm", children: profile.two_factor_enabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600 dark:text-green-400", children: "Two-Factor Authentication Enabled" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Two-Factor Authentication Disabled" })
            ] }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Permissions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your access rights and capabilities" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: !profile.permissions ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No permissions data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            "Students"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "View", enabled: profile.permissions.students?.view ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Create", enabled: profile.permissions.students?.create ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Edit", enabled: profile.permissions.students?.edit ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Delete", enabled: profile.permissions.students?.delete ?? false })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-4 w-4" }),
            "Staff"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "View", enabled: profile.permissions.staff?.view ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Create", enabled: profile.permissions.staff?.create ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Edit", enabled: profile.permissions.staff?.edit ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Delete", enabled: profile.permissions.staff?.delete ?? false })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
            "Admins"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "View", enabled: profile.permissions.admins?.view ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Create", enabled: profile.permissions.admins?.create ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Edit", enabled: profile.permissions.admins?.edit ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Delete", enabled: profile.permissions.admins?.delete ?? false })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
            "Courses"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "View", enabled: profile.permissions.courses?.view ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Create", enabled: profile.permissions.courses?.create ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Edit", enabled: profile.permissions.courses?.edit ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Delete", enabled: profile.permissions.courses?.delete ?? false })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
            "Content"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Modules", enabled: profile.permissions.content?.modules ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Units", enabled: profile.permissions.content?.units ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Quizzes", enabled: profile.permissions.content?.quizzes ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Exams", enabled: profile.permissions.content?.exams ?? false })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
            "System"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Settings", enabled: profile.permissions.system?.settings ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Analytics", enabled: profile.permissions.system?.analytics ?? false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionItem, { label: "Logs", enabled: profile.permissions.system?.logs ?? false })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function PermissionItem({ label, enabled }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
    enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: enabled ? "text-foreground" : "text-muted-foreground", children: label })
  ] });
}

export { ProfilePage as default };
