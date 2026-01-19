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
import { Search, Filter, Download, Eye, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const orders = [
  {
    id: "ORD-001",
    transporter: "LogiTech Solutions",
    vehicle: "MH-12-AB-1234",
    driver: "Rajesh Kumar",
    fuelType: "Diesel",
    quantity: 500,
    price: "₹ 45,000",
    pump: "HP Petrol Pump, Andheri",
    location: "Mumbai, Maharashtra",
    status: "pending",
    orderDate: "2025-01-19 10:30",
    scheduledTime: "2025-01-19 14:00"
  },
  {
    id: "ORD-002",
    transporter: "Speed Cargo",
    vehicle: "DL-01-XY-5678",
    driver: "Amit Singh",
    fuelType: "Diesel",
    quantity: 750,
    price: "₹ 67,500",
    pump: "Indian Oil Pump, Connaught Place",
    location: "Delhi",
    status: "processing",
    orderDate: "2025-01-19 09:15",
    scheduledTime: "2025-01-19 13:00"
  },
  {
    id: "ORD-003",
    transporter: "FastTrack Logistics",
    vehicle: "KA-03-MN-9012",
    driver: "Suresh Patil",
    fuelType: "Petrol",
    quantity: 300,
    price: "₹ 31,500",
    pump: "Bharat Petroleum, Whitefield",
    location: "Bangalore, Karnataka",
    status: "delivered",
    orderDate: "2025-01-18 16:45",
    deliveredTime: "2025-01-18 18:30",
    otp: "4521"
  },
  {
    id: "ORD-004",
    transporter: "RoadKing Transport",
    vehicle: "GJ-01-PQ-3456",
    driver: "Vikram Patel",
    fuelType: "Diesel",
    quantity: 600,
    price: "₹ 54,000",
    pump: "Reliance Petrol Pump, SG Highway",
    location: "Ahmedabad, Gujarat",
    status: "delivered",
    orderDate: "2025-01-18 14:20",
    deliveredTime: "2025-01-18 17:00",
    otp: "8734"
  },
  {
    id: "ORD-005",
    transporter: "City Movers",
    vehicle: "TN-09-RS-7890",
    driver: "Ganesh Murugan",
    fuelType: "Diesel",
    quantity: 450,
    price: "₹ 40,500",
    pump: "Shell Petrol Pump, Anna Nagar",
    location: "Chennai, Tamil Nadu",
    status: "cancelled",
    orderDate: "2025-01-18 11:00",
    cancelledReason: "Driver unavailable"
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusCount = (status: string) => {
    return orders.filter(o => o.status === status).length;
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Fuel Orders</h1>
          <p className="text-muted-foreground">Track and manage all fuel orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <MapPin className="mr-2 h-4 w-4" />
            Live Tracking
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Orders</CardDescription>
            <CardTitle className="text-3xl">{getStatusCount('pending')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl">{getStatusCount('processing')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Being fulfilled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Today</CardDescription>
            <CardTitle className="text-3xl">{getStatusCount('delivered')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cancelled</CardDescription>
            <CardTitle className="text-3xl">{getStatusCount('cancelled')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Order cancellations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {getStatusCount('pending')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="processing">In Progress</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Fuel Orders</CardTitle>
                  <CardDescription>Complete list of fuel orders across all statuses</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search orders..." className="pl-8" />
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
                    <TableHead>Order ID</TableHead>
                    <TableHead>Transporter</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Fuel Type</TableHead>
                    <TableHead className="text-right">Quantity (L)</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Pump Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.transporter}</TableCell>
                      <TableCell className="font-mono text-sm">{order.vehicle}</TableCell>
                      <TableCell>{order.driver}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.fuelType}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{order.quantity} L</TableCell>
                      <TableCell className="text-right font-semibold">{order.price}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{order.pump}</p>
                          <p className="text-xs text-muted-foreground">{order.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                              <DialogDescription>Complete order information</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                                  <p className="text-lg font-semibold">{order.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  <StatusBadge status={order.status} className="mt-1" />
                                </div>
                              </div>
                              
                              <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Transporter Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                                    <p>{order.transporter}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Driver</p>
                                    <p>{order.driver}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Vehicle Number</p>
                                    <p className="font-mono">{order.vehicle}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Fuel Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Fuel Type</p>
                                    <p>{order.fuelType}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                                    <p className="text-lg font-semibold">{order.quantity} Liters</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                                    <p className="text-lg font-semibold">{order.price}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Price per Liter</p>
                                    <p>₹ {(parseInt(order.price.replace(/[₹,]/g, '')) / order.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Pump Information</h4>
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pump Name</p>
                                    <p>{order.pump}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                                    <p>{order.location}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Timeline</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Order Placed</p>
                                    <p>{order.orderDate}</p>
                                  </div>
                                  {order.scheduledTime && (
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Scheduled Time</p>
                                      <p>{order.scheduledTime}</p>
                                    </div>
                                  )}
                                  {order.deliveredTime && (
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Delivered At</p>
                                      <p>{order.deliveredTime}</p>
                                    </div>
                                  )}
                                  {order.otp && (
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Verification OTP</p>
                                      <p className="text-lg font-mono font-bold">{order.otp}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {order.status === 'pending' && (
                                <div className="flex gap-2 pt-4">
                                  <Button className="flex-1">Approve Order</Button>
                                  <Button variant="outline" className="flex-1">Cancel Order</Button>
                                </div>
                              )}
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

        {['pending', 'processing', 'delivered', 'cancelled'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{status} Orders</CardTitle>
                <CardDescription>
                  Orders with {status} status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Transporter</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead className="text-right">Quantity (L)</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Pump Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.filter(o => o.status === status).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.transporter}</TableCell>
                        <TableCell className="font-mono text-sm">{order.vehicle}</TableCell>
                        <TableCell className="text-right font-medium">{order.quantity} L</TableCell>
                        <TableCell className="text-right font-semibold">{order.price}</TableCell>
                        <TableCell>
                          <p className="text-sm">{order.pump}</p>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
}
