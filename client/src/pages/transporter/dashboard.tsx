import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Truck, CreditCard, Calendar } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function TransporterDashboard() {
  return (
    <DashboardLayout role="transporter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">My Fleet</h1>
          <p className="text-muted-foreground">Manage your vehicles and fuel consumption.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/transporter/order">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md">
              <Droplet className="mr-2 h-4 w-4" /> New Fuel Order
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Monthly Fuel Spend" 
          value="₹ 152,000" 
          icon={CreditCard}
          trend="up"
          trendValue="5%"
          description="vs last month"
          className="border-l-primary"
        />
        <StatCard 
          title="Fuel Consumed" 
          value="1,450 L" 
          icon={Droplet}
          description="Diesel: 1,200L | Petrol: 250L"
          className="border-l-secondary"
        />
        <StatCard 
          title="Active Vehicles" 
          value="12 / 15" 
          icon={Truck}
          description="3 vehicles idle"
          className="border-l-chart-3"
        />
        <StatCard 
          title="Active Orders" 
          value="2" 
          icon={Calendar}
          description="Waiting for delivery"
          className="border-l-chart-5"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
            <CardDescription>Track your current fuel deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "#8291", vehicle: "MH 12 AB 1234", driver: "Ramesh Kumar", amount: "50 L", status: "pending", location: "HP Pump, Highway 4" },
                { id: "#8295", vehicle: "MH 14 CD 5678", driver: "Suresh Singh", amount: "100 L", status: "processing", location: "IOCL, Industrial Area" },
              ].map((order, i) => (
                <div key={i} className="border rounded-lg p-4 bg-card/50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{order.vehicle}</h4>
                      <p className="text-sm text-muted-foreground">{order.driver}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Location: <span className="text-foreground font-medium">{order.location}</span></p>
                      <p className="text-muted-foreground">Volume: <span className="text-foreground font-medium">{order.amount}</span></p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
              
              {/* If no orders */}
              {/* <div className="text-center py-8 text-muted-foreground">No active orders</div> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest fuel fills and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-border before:h-full">
              {[
                { title: "Fuel Delivered", desc: "150L Diesel to MH 02 XY 9999", time: "2 hours ago", active: true },
                { title: "Payment Successful", desc: "₹ 15,000 paid for Order #8280", time: "5 hours ago", active: false },
                { title: "New Driver Added", desc: "Vikram Malhotra added to fleet", time: "Yesterday", active: false },
                { title: "Order Cancelled", desc: "Order #8275 cancelled by user", time: "2 days ago", active: false },
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-4 pl-10">
                  <div className={cn(
                    "absolute left-0 top-1 h-2.5 w-2.5 rounded-full border ring-4 ring-background ml-5 -translate-x-1/2",
                    item.active ? "bg-primary border-primary" : "bg-muted-foreground/30 border-muted-foreground/30"
                  )} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <p className="text-xs text-muted-foreground/70">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
