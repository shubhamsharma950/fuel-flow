import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import AdminDashboard from "@/pages/admin/dashboard";
import TransporterDashboard from "@/pages/transporter/dashboard";
import OrderFuelPage from "@/pages/transporter/order-fuel";
import DriverOTPPage from "@/pages/driver/otp-view";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/transporters" component={AdminDashboard} /> {/* Placeholder */}
      <Route path="/admin/orders" component={AdminDashboard} /> {/* Placeholder */}
      
      {/* Transporter Routes */}
      <Route path="/transporter" component={TransporterDashboard} />
      <Route path="/transporter/order" component={OrderFuelPage} />
      
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
