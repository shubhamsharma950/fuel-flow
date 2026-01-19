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
import { Search, Download, Filter, CreditCard, TrendingUp } from "lucide-react";

const payments = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    transporter: "LogiTech Solutions",
    amount: "₹ 45,000",
    method: "Credit",
    status: "pending",
    date: "2025-01-19 10:30",
    dueDate: "2025-02-18"
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    transporter: "Speed Cargo",
    amount: "₹ 67,500",
    method: "UPI",
    status: "completed",
    date: "2025-01-19 09:15",
    completedDate: "2025-01-19 09:16"
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    transporter: "FastTrack Logistics",
    amount: "₹ 31,500",
    method: "Card",
    status: "completed",
    date: "2025-01-18 16:45",
    completedDate: "2025-01-18 16:46"
  },
  {
    id: "PAY-004",
    orderId: "ORD-004",
    transporter: "RoadKing Transport",
    amount: "₹ 54,000",
    method: "Net Banking",
    status: "completed",
    date: "2025-01-18 14:20",
    completedDate: "2025-01-18 14:25"
  },
  {
    id: "PAY-005",
    orderId: "ORD-005",
    transporter: "City Movers",
    amount: "₹ 40,500",
    method: "Credit",
    status: "overdue",
    date: "2024-12-15 11:00",
    dueDate: "2025-01-14"
  },
  {
    id: "PAY-006",
    orderId: "ORD-006",
    transporter: "Express Lines",
    amount: "₹ 23,400",
    method: "Credit",
    status: "pending",
    date: "2025-01-17 14:30",
    dueDate: "2025-02-16"
  },
];

export default function PaymentsPage() {
  const getStatusCount = (status: string) => {
    return payments.filter(p => p.status === status).length;
  };

  const getTotalAmount = (status?: string) => {
    const filtered = status ? payments.filter(p => p.status === status) : payments;
    return filtered.reduce((sum, p) => sum + parseInt(p.amount.replace(/[₹,]/g, '')), 0);
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track and manage payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">₹ {(getTotalAmount('completed') / 1000).toFixed(1)}K</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Payments</CardDescription>
            <CardTitle className="text-3xl">₹ {(getTotalAmount('pending') / 1000).toFixed(1)}K</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{getStatusCount('pending')} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overdue Amount</CardDescription>
            <CardTitle className="text-3xl text-red-600">₹ {(getTotalAmount('overdue') / 1000).toFixed(1)}K</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-red-600">{getStatusCount('overdue')} overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Today</CardDescription>
            <CardTitle className="text-3xl">{getStatusCount('completed')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Successful transactions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {getStatusCount('pending')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="overdue">
            Overdue
            {getStatusCount('overdue') > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {getStatusCount('overdue')}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Payment Transactions</CardTitle>
                  <CardDescription>Complete payment history and status</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search payments..." className="pl-8" />
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
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Transporter</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Transaction Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.orderId}</TableCell>
                      <TableCell>{payment.transporter}</TableCell>
                      <TableCell className="text-right font-semibold">{payment.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>{payment.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{payment.date}</p>
                          {payment.status === 'completed' && payment.completedDate && (
                            <p className="text-xs text-muted-foreground">Completed: {payment.completedDate}</p>
                          )}
                          {payment.status === 'pending' && payment.dueDate && (
                            <p className="text-xs text-muted-foreground">Due: {payment.dueDate}</p>
                          )}
                          {payment.status === 'overdue' && payment.dueDate && (
                            <p className="text-xs text-red-600">Overdue since: {payment.dueDate}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={payment.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === 'pending' && (
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                        )}
                        {payment.status === 'overdue' && (
                          <Button size="sm" variant="destructive">
                            Follow Up
                          </Button>
                        )}
                        {payment.status === 'completed' && (
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {['completed', 'pending', 'overdue'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{status} Payments</CardTitle>
                <CardDescription>
                  Payments with {status} status - Total: ₹ {getTotalAmount(status).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Transporter</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.filter(p => p.status === status).map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.orderId}</TableCell>
                        <TableCell>{payment.transporter}</TableCell>
                        <TableCell className="text-right font-semibold">{payment.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span>{payment.method}</span>
                          </div>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="text-right">
                          {status === 'completed' && (
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {status !== 'completed' && (
                            <Button size="sm" variant="outline">
                              {status === 'overdue' ? 'Follow Up' : 'Remind'}
                            </Button>
                          )}
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
