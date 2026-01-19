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
import { Search, MapPin, Plus, Edit, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pumps = [
  {
    id: "PMP-001",
    name: "HP Petrol Pump",
    brand: "Hindustan Petroleum",
    location: "Andheri, Mumbai",
    address: "Shop No. 12, Andheri-Kurla Road, Mumbai - 400069",
    contact: "+91 98765 43210",
    email: "andheri@hp.com",
    fuelTypes: ["Diesel", "Petrol"],
    commission: "3%",
    totalOrders: 1234,
    revenue: "₹ 12,45,000",
    rating: 4.5,
    status: "active"
  },
  {
    id: "PMP-002",
    name: "Indian Oil Pump",
    brand: "Indian Oil",
    location: "Connaught Place, Delhi",
    address: "CP Block, Connaught Place, New Delhi - 110001",
    contact: "+91 98765 43211",
    email: "cp@indianoil.com",
    fuelTypes: ["Diesel", "Petrol", "CNG"],
    commission: "2.5%",
    totalOrders: 2145,
    revenue: "₹ 21,50,000",
    rating: 4.8,
    status: "active"
  },
  {
    id: "PMP-003",
    name: "Bharat Petroleum",
    brand: "Bharat Petroleum",
    location: "Whitefield, Bangalore",
    address: "ITPL Main Road, Whitefield, Bangalore - 560066",
    contact: "+91 98765 43212",
    email: "whitefield@bpcl.com",
    fuelTypes: ["Diesel", "Petrol"],
    commission: "3.5%",
    totalOrders: 987,
    revenue: "₹ 9,87,000",
    rating: 4.3,
    status: "active"
  },
  {
    id: "PMP-004",
    name: "Reliance Petrol Pump",
    brand: "Reliance",
    location: "SG Highway, Ahmedabad",
    address: "SG Highway, Near ISCON Circle, Ahmedabad - 380015",
    contact: "+91 98765 43213",
    email: "sghighway@reliance.com",
    fuelTypes: ["Diesel", "Petrol"],
    commission: "2.8%",
    totalOrders: 1567,
    revenue: "₹ 15,67,000",
    rating: 4.6,
    status: "inactive"
  },
  {
    id: "PMP-005",
    name: "Shell Petrol Pump",
    brand: "Shell",
    location: "Anna Nagar, Chennai",
    address: "2nd Avenue, Anna Nagar, Chennai - 600040",
    contact: "+91 98765 43214",
    email: "annanagar@shell.com",
    fuelTypes: ["Diesel", "Petrol", "Premium"],
    commission: "3.2%",
    totalOrders: 1789,
    revenue: "₹ 17,89,000",
    rating: 4.7,
    status: "active"
  },
];

export default function PumpsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Pump Partners</h1>
          <p className="text-muted-foreground">Manage fuel pump partnerships and locations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Pump Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Pump Partner</DialogTitle>
              <DialogDescription>Register a new fuel pump to the network</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pump Name</label>
                  <Input placeholder="Enter pump name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand</label>
                  <Input placeholder="HP, Indian Oil, etc." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Address</label>
                <Input placeholder="Complete address with pincode" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="pump@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Commission Rate (%)</label>
                <Input type="number" placeholder="3.0" />
              </div>
              <Button className="w-full">Register Pump Partner</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Pumps</CardDescription>
            <CardTitle className="text-3xl">{pumps.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {pumps.filter(p => p.status === 'active').length} active partners
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-3xl">
              {pumps.reduce((sum, p) => sum + p.totalOrders, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Across all pumps</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">₹ 77.38L</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Cumulative earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Rating</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              4.6 <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Network quality</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Pumps</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Pump Partners</CardTitle>
                  <CardDescription>Complete network of fuel stations</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search pumps..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pumps.map((pump) => (
                  <Card key={pump.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{pump.name}</h3>
                            <Badge variant="outline">{pump.brand}</Badge>
                            <StatusBadge status={pump.status} />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-6 mt-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">{pump.location}</p>
                                  <p className="text-xs text-muted-foreground">{pump.address}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Contact</p>
                              <p className="text-sm">{pump.contact}</p>
                              <p className="text-xs text-muted-foreground">{pump.email}</p>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Fuel Types</p>
                              <div className="flex flex-wrap gap-1">
                                {pump.fuelTypes.map((fuel) => (
                                  <Badge key={fuel} variant="secondary" className="text-xs">
                                    {fuel}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                            <div>
                              <p className="text-xs text-muted-foreground">Commission</p>
                              <p className="text-lg font-semibold">{pump.commission}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total Orders</p>
                              <p className="text-lg font-semibold">{pump.totalOrders.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Revenue</p>
                              <p className="text-lg font-semibold">{pump.revenue}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Rating</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <p className="text-lg font-semibold">{pump.rating}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            Map
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Pump Partners</CardTitle>
              <CardDescription>Currently operational fuel stations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pumps.filter(p => p.status === 'active').map((pump) => (
                    <TableRow key={pump.id}>
                      <TableCell className="font-medium">{pump.id}</TableCell>
                      <TableCell className="font-medium">{pump.name}</TableCell>
                      <TableCell>{pump.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{pump.brand}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{pump.totalOrders}</TableCell>
                      <TableCell className="text-right font-semibold">{pump.revenue}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{pump.rating}</span>
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
              <CardTitle>Inactive Pump Partners</CardTitle>
              <CardDescription>Temporarily suspended or offline stations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pumps.filter(p => p.status === 'inactive').map((pump) => (
                    <TableRow key={pump.id}>
                      <TableCell className="font-medium">{pump.id}</TableCell>
                      <TableCell className="font-medium">{pump.name}</TableCell>
                      <TableCell>{pump.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{pump.brand}</Badge>
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
