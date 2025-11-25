import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Shield,
  User,
  LogOut,
  ChevronRight,
  BookOpen,
  FileText,
  GraduationCap,
  Calendar,
  Building2,
  Settings,
  Bell,
  CreditCard,
  School,
  TrendingUp
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetContent,
} from "@/Components/ui/sheet";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/super-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    href: "/super-admin/students",
    icon: Users,
  },
  {
    title: "Staff",
    href: "/super-admin/staff",
    icon: UserCog,
  },
  {
    title: "Admins",
    href: "/super-admin/admins",
    icon: Shield,
  },
  {
    title: "Faculties",
    href: "/super-admin/faculties",
    icon: Building2,
  },
  {
    title: "Programs",
    href: "/super-admin/programs",
    icon: GraduationCap,
  },
  {
    title: "Courses",
    href: "/super-admin/courses",
    icon: BookOpen,
  },
  {
    title: "Semesters",
    href: "/super-admin/semesters",
    icon: Calendar,
  },
  {
    title: "Exams",
    href: "/super-admin/exams",
    icon: FileText,
  },
  {
    title: "Notices",
    href: "/super-admin/notices",
    icon: Bell,
  },
  {
    title: "Payments",
    href: "/super-admin/payments",
    icon: CreditCard,
  },
  {
    title: "Tutor Management",
    href: "/super-admin/tutors",
    icon: School,
  },
  {
    title: "Revenue Management",
    href: "/super-admin/revenue",
    icon: TrendingUp,
  },
];

interface AdminSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function AdminSidebar({
  isMobile = false,
  isOpen = false,
  onClose,
  className
}: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleNavigation = (href: string) => {
    if (isMobile && onClose) {
      onClose();
    }
    navigate(href);
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-55 h-15 cursor-pointer"
          onClick={() => {
            navigate("/");
            if (isMobile && onClose) onClose();
          }}
        />
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.href);

          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                isActive && "bg-primary/10 text-primary hover:bg-primary/20"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <Icon className="h-5 w-5" />
              {item.title}
              {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant={location.pathname === "/super-admin/settings" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-3",
            location.pathname === "/super-admin/settings" && "bg-primary/10 text-primary hover:bg-primary/20"
          )}
          onClick={() => handleNavigation("/super-admin/settings")}
        >
          <Settings className="h-5 w-5" />
          System Settings
          {location.pathname === "/super-admin/settings" && <ChevronRight className="ml-auto h-4 w-4" />}
        </Button>
        <Button
          variant={location.pathname === "/super-admin/profile" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-3",
            location.pathname === "/super-admin/profile" && "bg-primary/10 text-primary hover:bg-primary/20"
          )}
          onClick={() => handleNavigation("/super-admin/profile")}
        >
          <User className="h-5 w-5" />
          Profile
          {location.pathname === "/super-admin/profile" && <ChevronRight className="ml-auto h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0 flex flex-col">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className={cn("w-64 bg-card border-r border-border flex flex-col", className)}>
      <SidebarContent />
    </aside>
  );
}

