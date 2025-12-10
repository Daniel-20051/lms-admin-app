import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Shield,
  User,
  LogOut,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileText,
  GraduationCap,
  Calendar,
  Building2,
  Settings,
  Bell,
  CreditCard,
  School,
  TrendingUp,
  UsersRound,
  Wallet,
  ClipboardList,
  FolderOpen,
  BookMarked,
  ListChecks,
  BarChart3
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetContent,
} from "@/Components/ui/sheet";

interface NavigationItem {
  title: string;
  href: string;
  icon: any;
}

interface NavigationCategory {
  title: string;
  icon: any;
  items: NavigationItem[];
}

const navigationCategories: NavigationCategory[] = [
  {
    title: "Personnel",
    icon: UsersRound,
    items: [
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
    ],
  },
  {
    title: "Academic",
    icon: GraduationCap,
    items: [
      {
        title: "Faculties",
        href: "/super-admin/faculties",
        icon: Building2,
      },
      {
        title: "Programs",
        href: "/super-admin/programs",
        icon: School,
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
    ],
  },
  {
    title: "Content Management",
    icon: FolderOpen,
    items: [
      {
        title: "Course Content",
        href: "/super-admin/content/course-content",
        icon: BookMarked,
      },
      {
        title: "Quizzes",
        href: "/super-admin/content/quizzes",
        icon: ListChecks,
      },
      {
        title: "Results",
        href: "/super-admin/content/results",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Assessment",
    icon: ClipboardList,
    items: [
      {
        title: "Exams",
        href: "/super-admin/exams",
        icon: FileText,
      },
      {
        title: "Question Bank",
        href: "/super-admin/exams/question-bank",
        icon: BookOpen,
      },
      {
        title: "Notices",
        href: "/super-admin/notices",
        icon: Bell,
      },
    ],
  },
  {
    title: "Financial",
    icon: Wallet,
    items: [
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
        title: "Revenue",
        href: "/super-admin/revenue",
        icon: TrendingUp,
      },
    ],
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
  
  // State for collapsed/expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Personnel: false,
    Academic: false,
    "Content Management": false,
    Assessment: false,
    Financial: false,
  });

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

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

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Dashboard - Standalone */}
        <Button
          variant={location.pathname === "/super-admin/dashboard" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-3",
            location.pathname === "/super-admin/dashboard" && "bg-primary/10 text-primary hover:bg-primary/20"
          )}
          onClick={() => handleNavigation("/super-admin/dashboard")}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
          {location.pathname === "/super-admin/dashboard" && <ChevronRight className="ml-auto h-4 w-4" />}
        </Button>

        {/* Categories */}
        {navigationCategories.map((category) => {
          const CategoryIcon = category.icon;
          const isExpanded = expandedCategories[category.title];
          const hasActiveItem = category.items.some(item => location.pathname.startsWith(item.href));

          return (
            <div key={category.title} className="space-y-1">
              {/* Category Header */}
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground",
                  hasActiveItem && "text-primary"
                )}
                onClick={() => toggleCategory(category.title)}
              >
                <CategoryIcon className="h-4 w-4" />
                {category.title}
                {isExpanded ? (
                  <ChevronDown className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Button>

              {/* Category Items */}
              {isExpanded && (
                <div className="ml-4 space-y-1 border-l-2 border-border pl-2">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.href);

                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 text-sm",
                          isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                        {isActive && <ChevronRight className="ml-auto h-3 w-3" />}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
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

