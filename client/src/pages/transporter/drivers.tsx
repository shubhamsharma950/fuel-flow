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
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Edit, Phone, Mail, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const drivers = [
  {
    id: "DRV-001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    licenseNumber: "MH-1234567890",
    licenseExpiry: "2026-08-15",
    assignedVehicle: "MH-12-AB-1234",
    totalTrips: 234,
    experience: "8 years",
    rating: 4.7,
    status: "active"
  },
  {
    id: "DRV-002",
    name: "Amit Singh",
    phone: "+91 98765 43211",
    email: "amit.singh@email.com",
    licenseNumber: "DL-9876543210",
    licenseExpiry: "2027-03-20",
    assignedVehicle: "MH-12-CD-5678",
    totalTrips: 189,
    experience: "6 years",
    rating: 4.5,
    status: "active"
  },
  {
    id: "DRV-003",
    name: "Suresh Patil",
    phone: "+91 98765 43212",
    email: "suresh.patil@email.com",
    licenseNumber: "KA-5678901234",
    licenseExpiry: "2025-11-10",
    assignedVehicle: "MH-12-EF-9012",
    totalTrips: 312,
    experience: "12 years",
    rating: 4.9,
    status: "active"
  },
  {
    id: "DRV-004",
    name: "Vikram Patel",
    phone: "+91 98765 43213",
    email: "vikram.patel@email.com",
    licenseNumber: "GJ-3456789012",
    licenseExpiry: "2026-05-25",
    assignedVehicle: "Unassigned",
    totalTrips: 145,
    experience: "5 years",
    rating: 4.3,
    status: "inactive"
  },
  {
    id: "DRV-005",
    name: "Ganesh Murugan",
    phone: "+91 98765 43214",
    email: "ganesh.m@email.com",
    licenseNumber: "TN-7890123456",
    licenseExpiry: "2028-01-30",
    assignedVehicle: "MH-12-GH-3456",
    totalTrips: 201,
    experience: "7 years",
    rating: 4.6,
    status: "active"
  },
];

export default function DriversPage() {
  const getStatusCount = (status: string) => {
    return drivers.filter(d => d.status === status).length;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DashboardLayout role="transporter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Drivers</h1>
          <p className="text-muted-foreground">Manage your driver team and assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>Register a new driver to your fleet</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="driver@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">License Number</label>
                  <Input placeholder="XX-0000000000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">License Expiry</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience (years)</label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign Vehicle</label>
                  <Input placeholder="Vehicle number" />
                </div>
              </div>
              <Button className="w-full">Add Driver</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Drivers</CardDescription>
            <CardTitle className="text-3xl">{drivers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">In your team</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Drivers</CardDescription>
            <CardTitle className="text-3xl text-green-600">{getStatusCount('active')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-600">Currently available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Trips</CardDescription>
            <CardTitle className="text-3xl">
              {drivers.reduce((sum, d) => sum + d.totalTrips, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Completed trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Rating</CardDescription>
            <CardTitle className="text-3xl">4.6 ⭐</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Team performance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Driver Team</CardTitle>
              <CardDescription>All registered drivers in your fleet</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search drivers..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {drivers.map((driver) => (
              <Card key={driver.id} className="border-l-4 border-l-secondary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                          {getInitials(driver.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{driver.name}</h3>
                          <Badge variant="outline">{driver.id}</Badge>
                          <StatusBadge status={driver.status} />
                          <Badge variant="secondary" className="ml-auto">
                            ⭐ {driver.rating}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Contact</p>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{driver.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span>{driver.email}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">License Details</p>
                            <p className="text-sm font-mono">{driver.licenseNumber}</p>
                            <p className="text-xs text-muted-foreground">Expires: {driver.licenseExpiry}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Assignment</p>
                            <p className="text-sm font-semibold">{driver.assignedVehicle}</p>
                            <p className="text-xs text-muted-foreground">Experience: {driver.experience}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Trips</p>
                            <p className="text-lg font-semibold">{driver.totalTrips}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Experience</p>
                            <p className="text-lg font-semibold">{driver.experience}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Rating</p>
                            <p className="text-lg font-semibold">⭐ {driver.rating}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Driver - {driver.name}</DialogTitle>
                            <DialogDescription>Update driver information</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Full Name</p>
                                <Input defaultValue={driver.name} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Phone</p>
                                <Input defaultValue={driver.phone} />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Email</p>
                              <Input defaultValue={driver.email} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">License Number</p>
                                <Input defaultValue={driver.licenseNumber} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">License Expiry</p>
                                <Input type="date" defaultValue={driver.licenseExpiry} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Assigned Vehicle</p>
                                <Input defaultValue={driver.assignedVehicle} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                                <Input defaultValue={driver.status} />
                              </div>
                            </div>
                            <Button className="w-full">Update Driver</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
