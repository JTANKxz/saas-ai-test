
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, Home, Book, Tag, 
  ShoppingBag, Users, BarChart, Settings, CreditCard, FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Produtos",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Categorias",
    href: "/categories",
    icon: Tag,
  },
  {
    title: "Cardápio",
    href: "/menu",
    icon: Book,
  },
  {
    title: "Pedidos",
    href: "/orders",
    icon: FileText,
  },
  {
    title: "Equipe",
    href: "/team",
    icon: Users,
  },
  {
    title: "Relatórios",
    href: "/reports",
    icon: BarChart,
  },
  {
    title: "Financeiro",
    href: "/finances",
    icon: CreditCard,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "min-h-screen bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 border-b border-gray-100 flex items-center px-4">
          {!collapsed ? (
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-gastronomy-600">EFS</span>
              <span className="ml-1 text-base font-medium text-gray-600">Gastronomy</span>
            </Link>
          ) : (
            <Link to="/dashboard" className="mx-auto">
              <span className="text-xl font-bold text-gastronomy-600">E</span>
            </Link>
          )}
        </div>
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center py-2 px-3 rounded-md text-sm font-medium",
                  location.pathname === item.href
                    ? "bg-gastronomy-50 text-gastronomy-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gastronomy-500",
                  collapsed && "justify-center"
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0 h-5 w-5",
                    location.pathname === item.href
                      ? "text-gastronomy-500"
                      : "text-gray-400 group-hover:text-gastronomy-500"
                  )}
                />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
