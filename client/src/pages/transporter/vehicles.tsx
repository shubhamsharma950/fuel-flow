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
import { Search, Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const vehicles = [
  {
    id: "VEH-001",
    number: "MH-12-AB-1234",
    type: "Truck",
    model: "Tata LPT 1918",
    capacity: "18 Ton",
    fuelType: "Diesel",
    lastService: "2025-01-10",
    nextService: "2025-04-10",
    mileage: "45,230 km",
    avgConsumption: "6.5 km/L",
    status: "active"
  },
  {
    id: "VEH-002",
    number: "MH-12-CD-5678",
    type: "Truck",
    model: "Ashok Leyland 2518",
    capacity: "25 Ton",
    fuelType: "Diesel",
    lastService: "2025-01-05",
    nextService: "2025-04-05",
    mileage: "67,890 km",
    avgConsumption: "5.8 km/L",
    status: "active"
  },
  {
    id: "VEH-003",
    number: "MH-12-EF-9012",
    type: "Van",
    model: "Mahindra Supro",
    capacity: "1 Ton",
    fuelType: "Diesel",
    lastService: "2024-12-20",
    nextService: "2025-03-20",
    mileage: "23,450 km",
    avgConsumption: "12.5 km/L",
    status: "active"
  },
  {
    id: "VEH-004",
    number: "MH-12-GH-3456",
    type: "Truck",
    model: "Tata Prima 2830",
    capacity: "28 Ton",
    fuelType: "Diesel",
    lastService: "2025-01-15",
    nextService: "2025-04-15",
    mileage: "92,340 km",
    avgConsumption: "5.2 km/L",
    status: "maintenance"
  },
  {
    id: "VEH-005",
    number: "MH-12-IJ-7890",
    type: "Pickup",
    model: "Isuzu D-Max",
    capacity: "1.5 Ton",
    fuelType: "Diesel",
    lastService: "2025-01-08",
    nextService: "2025-04-08",
    mileage: "34,560 km",
    avgConsumption: "10.5 km/L",
    status: "active"
  },
];

export default function VehiclesPage() {
  const getStatusCount = (status: string) => {
    return vehicles.filter(v => v.status === status).length;
  };

  return (
    <DashboardLayout role="transporter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Vehicles</h1>
          <p className="text-muted-foreground">Manage your fleet vehicles and maintenance</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Register a new vehicle to your fleet</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Number</label>
                  <Input placeholder="MH-12-XX-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vehicle Type</label>
                  <Input placeholder="Truck, Van, Pickup" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Make & Model</label>
                  <Input placeholder="Tata LPT 1918" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Capacity</label>
                  <Input placeholder="18 Ton" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fuel Type</label>
                  <Input placeholder="Diesel / Petrol" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Mileage</label>
                  <Input placeholder="0 km" />
                </div>
              </div>
              <Button className="w-full">Add Vehicle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Vehicles</CardDescription>
            <CardTitle className="text-3xl">{vehicles.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">In your fleet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Vehicles</CardDescription>
            <CardTitle className="text-3xl text-green-600">{getStatusCount('active')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Maintenance</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{getStatusCount('maintenance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Under service</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Fuel Efficiency</CardDescription>
            <CardTitle className="text-3xl">7.5 km/L</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Fleet average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fleet Vehicles</CardTitle>
              <CardDescription>All registered vehicles in your fleet</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vehicles..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle ID</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Type & Model</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Fuel Type</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead>Avg. Consumption</TableHead>
                <TableHead>Service Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.id}</TableCell>
                  <TableCell className="font-mono font-semibold">{vehicle.number}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{vehicle.type}</p>
                      <p className="text-xs text-muted-foreground">{vehicle.model}</p>
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.capacity}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vehicle.fuelType}</Badge>
                  </TableCell>
                  <TableCell>{vehicle.mileage}</TableCell>
                  <TableCell className="font-medium">{vehicle.avgConsumption}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{vehicle.nextService}</p>
                      <p className="text-xs text-muted-foreground">Last: {vehicle.lastService}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Vehicle - {vehicle.number}</DialogTitle>
                            <DialogDescription>Update vehicle information</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Vehicle Number</p>
                                <Input defaultValue={vehicle.number} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Type</p>
                                <Input defaultValue={vehicle.type} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Model</p>
                                <Input defaultValue={vehicle.model} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Capacity</p>
                                <Input defaultValue={vehicle.capacity} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Current Mileage</p>
                                <Input defaultValue={vehicle.mileage} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                                <Input defaultValue={vehicle.status} />
                              </div>
                            </div>
                            <Button className="w-full">Update Vehicle</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
