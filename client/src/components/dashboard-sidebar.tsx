import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Truck, 
  Droplet, 
  Settings, 
  FileText, 
  Users, 
  LogOut, 
  MapPin, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role: "admin" | "transporter";
}

export function DashboardSidebar({ className, role }: SidebarProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/transporters", label: "Transporters", icon: Truck },
    { href: "/admin/orders", label: "Fuel Orders", icon: Droplet },
    { href: "/admin/pumps", label: "Pump Partners", icon: MapPin },
    { href: "/admin/payments", label: "Payments", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const transporterLinks = [
    { href: "/transporter", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transporter/order", label: "Order Fuel", icon: Droplet },
    { href: "/transporter/vehicles", label: "Vehicles", icon: Truck },
    { href: "/transporter/drivers", label: "Drivers", icon: Users },
    { href: "/transporter/history", label: "Order History", icon: FileText },
  ];

  const links = role === "admin" ? adminLinks : transporterLinks;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tight text-sidebar-primary">
          <Droplet className="h-8 w-8 fill-current" />
          <span>FuelConnect</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide uppercase">
          {role === "admin" ? "Administration" : "Fleet Management"}
        </p>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start gap-2 border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden md:block w-64 h-screen fixed left-0 top-0", className)}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-3 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-r border-sidebar-border">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
