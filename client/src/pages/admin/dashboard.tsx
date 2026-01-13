import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Droplet, Truck, Users, ArrowUpRight, DollarSign } from "lucide-react";

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Super Admin.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Live Map</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Total Revenue" 
          value="₹ 45,231.89" 
          icon={DollarSign}
          trend="up"
          trendValue="+20.1%"
          description="from last month"
          className="border-l-primary"
        />
        <StatCard 
          title="Active Transporters" 
          value="124" 
          icon={Truck}
          trend="up"
          trendValue="+4"
          description="new approvals pending"
          className="border-l-secondary"
        />
        <StatCard 
          title="Fuel Dispensed" 
          value="12,234 L" 
          icon={Droplet}
          trend="up"
          trendValue="+12%"
          description="total volume this week"
          className="border-l-chart-3"
        />
        <StatCard 
          title="Pending Orders" 
          value="24" 
          icon={Users}
          trend="down"
          trendValue="3"
          description="requiring attention"
          className="border-l-chart-5"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Fuel Sales</CardTitle>
            <CardDescription>Volume in liters across all pumps</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}L`}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="sales" fill="hsl(215 28% 17%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest fuel requests from transporters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ORD-001", company: "LogiTech Solutions", amount: "₹ 5,000", status: "pending" },
                { id: "ORD-002", company: "Speed Cargo", amount: "₹ 12,400", status: "delivered" },
                { id: "ORD-003", company: "FastTrack Logistics", amount: "₹ 2,300", status: "processing" },
                { id: "ORD-004", company: "RoadKing Transport", amount: "₹ 8,900", status: "delivered" },
                { id: "ORD-005", company: "City Movers", amount: "₹ 4,500", status: "pending" },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.company}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{order.amount}</span>
                    <StatusBadge status={order.status} className="text-[10px] px-1.5 py-0 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transporter Approvals</CardTitle>
            <CardDescription>New registrations waiting for verification</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>GST Number</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Apex Carriers Ltd.</TableCell>
                <TableCell>27ABCDE1234F1Z5</TableCell>
                <TableCell>Mumbai</TableCell>
                <TableCell>Jan 12, 2026</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" className="h-8 mr-2">Reject</Button>
                  <Button size="sm" className="h-8">Approve</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Star Fleet Services</TableCell>
                <TableCell>09FGHIJ5678K1Z2</TableCell>
                <TableCell>Delhi</TableCell>
                <TableCell>Jan 11, 2026</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" className="h-8 mr-2">Reject</Button>
                  <Button size="sm" className="h-8">Approve</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
