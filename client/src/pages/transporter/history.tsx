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
import { Search, Download, Filter, Calendar, Receipt } from "lucide-react";

const orderHistory = [
  {
    id: "ORD-089",
    date: "2025-01-19 10:30",
    vehicle: "MH-12-AB-1234",
    driver: "Rajesh Kumar",
    fuelType: "Diesel",
    quantity: 500,
    pricePerLiter: "₹ 90.00",
    totalAmount: "₹ 45,000",
    pump: "HP Petrol Pump, Andheri",
    location: "Mumbai",
    paymentMethod: "Credit",
    status: "delivered",
    otp: "4521",
    deliveryTime: "2025-01-19 14:30"
  },
  {
    id: "ORD-088",
    date: "2025-01-18 16:45",
    vehicle: "MH-12-CD-5678",
    driver: "Amit Singh",
    fuelType: "Diesel",
    quantity: 750,
    pricePerLiter: "₹ 90.00",
    totalAmount: "₹ 67,500",
    pump: "Indian Oil, Andheri",
    location: "Mumbai",
    paymentMethod: "UPI",
    status: "delivered",
    otp: "7832",
    deliveryTime: "2025-01-18 18:00"
  },
  {
    id: "ORD-087",
    date: "2025-01-18 09:20",
    vehicle: "MH-12-EF-9012",
    driver: "Suresh Patil",
    fuelType: "Petrol",
    quantity: 300,
    pricePerLiter: "₹ 105.00",
    totalAmount: "₹ 31,500",
    pump: "Bharat Petroleum, Kurla",
    location: "Mumbai",
    paymentMethod: "Card",
    status: "delivered",
    otp: "9156",
    deliveryTime: "2025-01-18 11:45"
  },
  {
    id: "ORD-086",
    date: "2025-01-17 14:15",
    vehicle: "MH-12-GH-3456",
    driver: "Ganesh Murugan",
    fuelType: "Diesel",
    quantity: 600,
    pricePerLiter: "₹ 90.00",
    totalAmount: "₹ 54,000",
    pump: "Shell, Powai",
    location: "Mumbai",
    paymentMethod: "Credit",
    status: "delivered",
    otp: "2847",
    deliveryTime: "2025-01-17 16:30"
  },
  {
    id: "ORD-085",
    date: "2025-01-16 11:00",
    vehicle: "MH-12-AB-1234",
    driver: "Rajesh Kumar",
    fuelType: "Diesel",
    quantity: 450,
    pricePerLiter: "₹ 89.50",
    totalAmount: "₹ 40,275",
    pump: "HP Petrol Pump, Goregaon",
    location: "Mumbai",
    paymentMethod: "Net Banking",
    status: "delivered",
    otp: "5621",
    deliveryTime: "2025-01-16 13:20"
  },
  {
    id: "ORD-084",
    date: "2025-01-15 08:30",
    vehicle: "MH-12-IJ-7890",
    driver: "Vikram Patel",
    fuelType: "Diesel",
    quantity: 200,
    pricePerLiter: "₹ 89.50",
    totalAmount: "₹ 17,900",
    pump: "Reliance, Bandra",
    location: "Mumbai",
    paymentMethod: "Credit",
    status: "cancelled",
    cancelReason: "Vehicle breakdown"
  },
  {
    id: "ORD-083",
    date: "2025-01-14 15:45",
    vehicle: "MH-12-CD-5678",
    driver: "Amit Singh",
    fuelType: "Diesel",
    quantity: 550,
    pricePerLiter: "₹ 89.00",
    totalAmount: "₹ 48,950",
    pump: "Indian Oil, Malad",
    location: "Mumbai",
    paymentMethod: "UPI",
    status: "delivered",
    otp: "3914",
    deliveryTime: "2025-01-14 17:15"
  },
];

export default function OrderHistoryPage() {
  const getStatusCount = (status: string) => {
    return orderHistory.filter(o => o.status === status).length;
  };

  const getTotalSpent = () => {
    return orderHistory
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + parseInt(o.totalAmount.replace(/[₹,]/g, '')), 0);
  };

  const getTotalQuantity = () => {
    return orderHistory
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.quantity, 0);
  };

  return (
    <DashboardLayout role="transporter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Order History</h1>
          <p className="text-muted-foreground">View and track all your fuel orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by Date
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-3xl">{orderHistory.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Orders</CardDescription>
            <CardTitle className="text-3xl text-green-600">{getStatusCount('delivered')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-600">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Fuel Purchased</CardDescription>
            <CardTitle className="text-3xl">{getTotalQuantity().toLocaleString()} L</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Cumulative volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spent</CardDescription>
            <CardTitle className="text-3xl">₹ {(getTotalSpent() / 100000).toFixed(2)}L</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">All transactions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Complete Order History</CardTitle>
                  <CardDescription>All fuel orders across all statuses</CardDescription>
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
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Fuel Type</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Pump</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{order.date}</p>
                          {order.deliveryTime && (
                            <p className="text-xs text-muted-foreground">
                              Delivered: {order.deliveryTime}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{order.vehicle}</TableCell>
                      <TableCell>{order.driver}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.fuelType}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{order.quantity} L</TableCell>
                      <TableCell className="text-right font-semibold">{order.totalAmount}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{order.pump}</p>
                          <p className="text-xs text-muted-foreground">{order.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Receipt className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>
                Successfully completed orders - Total: ₹ {getTotalSpent().toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>OTP</TableHead>
                    <TableHead className="text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.filter(o => o.status === 'delivered').map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="font-mono text-sm">{order.vehicle}</TableCell>
                      <TableCell>{order.driver}</TableCell>
                      <TableCell className="text-right font-medium">{order.quantity} L</TableCell>
                      <TableCell className="text-right font-semibold">{order.totalAmount}</TableCell>
                      <TableCell>
                        <Badge className="font-mono">{order.otp}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Orders</CardTitle>
              <CardDescription>Orders that were cancelled or failed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.filter(o => o.status === 'cancelled').map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="font-mono text-sm">{order.vehicle}</TableCell>
                      <TableCell>{order.driver}</TableCell>
                      <TableCell className="text-right font-medium">{order.quantity} L</TableCell>
                      <TableCell className="text-right font-semibold">{order.totalAmount}</TableCell>
                      <TableCell className="text-red-600">{order.cancelReason}</TableCell>
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
