import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminTransporters from "@/pages/admin/transporters";
import AdminOrders from "@/pages/admin/orders";
import AdminPumps from "@/pages/admin/pumps";
import AdminPayments from "@/pages/admin/payments";
import AdminSettings from "@/pages/admin/settings";
import TransporterDashboard from "@/pages/transporter/dashboard";
import OrderFuelPage from "@/pages/transporter/order-fuel";
import TransporterVehicles from "@/pages/transporter/vehicles";
import TransporterDrivers from "@/pages/transporter/drivers";
import TransporterHistory from "@/pages/transporter/history";
import DriverOTPPage from "@/pages/driver/otp-view";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/transporters" component={AdminTransporters} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/pumps" component={AdminPumps} />
      <Route path="/admin/payments" component={AdminPayments} />
      <Route path="/admin/settings" component={AdminSettings} />
      
      {/* Transporter Routes */}
      <Route path="/transporter" component={TransporterDashboard} />
      <Route path="/transporter/order" component={OrderFuelPage} />
      <Route path="/transporter/vehicles" component={TransporterVehicles} />
      <Route path="/transporter/drivers" component={TransporterDrivers} />
      <Route path="/transporter/history" component={TransporterHistory} />
      
      {/* Driver Routes */}
      <Route path="/driver/otp" component={DriverOTPPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
