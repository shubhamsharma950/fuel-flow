import { DashboardLayout } from "@/components/dashboard-layout";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Check, X, Eye, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const transporters = [
  { 
    id: "TR-001", 
    company: "LogiTech Solutions", 
    email: "contact@logitech.com",
    phone: "+91 98765 43210",
    vehicles: 45,
    drivers: 52,
    totalOrders: 234,
    creditLimit: "₹ 5,00,000",
    status: "active",
    joinedDate: "2024-03-15"
  },
  { 
    id: "TR-002", 
    company: "Speed Cargo", 
    email: "info@speedcargo.com",
    phone: "+91 98765 43211",
    vehicles: 32,
    drivers: 38,
    totalOrders: 189,
    creditLimit: "₹ 3,50,000",
    status: "active",
    joinedDate: "2024-04-22"
  },
  { 
    id: "TR-003", 
    company: "FastTrack Logistics", 
    email: "support@fasttrack.com",
    phone: "+91 98765 43212",
    vehicles: 28,
    drivers: 31,
    totalOrders: 156,
    creditLimit: "₹ 2,50,000",
    status: "inactive",
    joinedDate: "2024-05-10"
  },
  { 
    id: "TR-004", 
    company: "RoadKing Transport", 
    email: "hello@roadking.com",
    phone: "+91 98765 43213",
    vehicles: 15,
    drivers: 18,
    totalOrders: 78,
    creditLimit: "₹ 1,50,000",
    status: "active",
    joinedDate: "2024-06-05"
  },
];

const pendingApprovals = [
  {
    id: "AP-001",
    company: "Metro Freight Services",
    email: "contact@metrofreight.com",
    phone: "+91 98765 43214",
    vehicles: 12,
    documents: "Complete",
    appliedDate: "2025-01-15"
  },
  {
    id: "AP-002",
    company: "Express Movers",
    email: "info@expressmovers.com",
    phone: "+91 98765 43215",
    vehicles: 8,
    documents: "Pending",
    appliedDate: "2025-01-17"
  },
];

export default function TransportersPage() {
  const [selectedTransporter, setSelectedTransporter] = useState<any>(null);

  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Transporters</h1>
          <p className="text-muted-foreground">Manage transporter accounts and approvals</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Transporter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transporter</DialogTitle>
              <DialogDescription>
                Manually add a new transporter to the platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="company@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Credit Limit</label>
                <Input placeholder="₹ 0" />
              </div>
              <Button className="w-full">Create Account</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Transporters</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Approvals
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {pendingApprovals.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Transporters</CardTitle>
                  <CardDescription>Currently active transporter accounts</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search transporters..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-center">Vehicles</TableHead>
                    <TableHead className="text-center">Drivers</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="text-right">Credit Limit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transporters.filter(t => t.status === "active").map((transporter) => (
                    <TableRow key={transporter.id}>
                      <TableCell className="font-medium">{transporter.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{transporter.company}</p>
                          <p className="text-xs text-muted-foreground">Joined {transporter.joinedDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{transporter.email}</p>
                          <p className="text-muted-foreground">{transporter.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{transporter.vehicles}</TableCell>
                      <TableCell className="text-center">{transporter.drivers}</TableCell>
                      <TableCell className="text-right">{transporter.totalOrders}</TableCell>
                      <TableCell className="text-right font-medium">{transporter.creditLimit}</TableCell>
                      <TableCell>
                        <StatusBadge status={transporter.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedTransporter(transporter)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{transporter.company}</DialogTitle>
                              <DialogDescription>Transporter Details</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Transporter ID</p>
                                  <p className="text-lg font-semibold">{transporter.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  <StatusBadge status={transporter.status} className="mt-1" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                                  <p>{transporter.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                  <p>{transporter.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Total Vehicles</p>
                                  <p className="text-lg font-semibold">{transporter.vehicles}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Total Drivers</p>
                                  <p className="text-lg font-semibold">{transporter.drivers}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                                  <p className="text-lg font-semibold">{transporter.totalOrders}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Credit Limit</p>
                                  <p className="text-lg font-semibold">{transporter.creditLimit}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>New transporter registrations awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-center">Vehicles</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell className="font-medium">{application.company}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{application.email}</p>
                          <p className="text-muted-foreground">{application.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{application.vehicles}</TableCell>
                      <TableCell>
                        <Badge variant={application.documents === "Complete" ? "default" : "secondary"}>
                          {application.documents}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.appliedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Transporters</CardTitle>
              <CardDescription>Suspended or deactivated accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transporters.filter(t => t.status === "inactive").map((transporter) => (
                    <TableRow key={transporter.id}>
                      <TableCell className="font-medium">{transporter.id}</TableCell>
                      <TableCell className="font-medium">{transporter.company}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{transporter.email}</p>
                          <p className="text-muted-foreground">{transporter.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={transporter.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          Reactivate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
