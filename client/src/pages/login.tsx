import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, ShieldCheck, ArrowRight, Droplet } from "lucide-react";
import generatedImage from "@assets/generated_images/industrial_modern_logistics_login_background.png";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: string) => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      if (role === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/transporter");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 md:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-heading font-bold text-3xl tracking-tight text-primary">
              <Droplet className="h-8 w-8 fill-current" />
              <span>FuelConnect</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to manage your fleet fuel.</p>
          </div>

          <Tabs defaultValue="transporter" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="transporter">Transporter</TabsTrigger>
              <TabsTrigger value="admin">Super Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transporter">
              <Card className="border-0 shadow-none p-0">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin("transporter"); }}>
                  <CardContent className="space-y-4 p-0">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input id="mobile" placeholder="+91 98765 43210" required />
                    </div>
                    <Button className="w-full h-11 text-base bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={loading}>
                      {loading ? "Sending OTP..." : "Get OTP"}
                    </Button>
                  </CardContent>
                </form>
                <div className="mt-6 text-center text-sm">
                   <p className="text-muted-foreground">
                     Don't have an account? <span className="text-primary font-medium hover:underline cursor-pointer">Register Company</span>
                   </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="border-0 shadow-none p-0">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin("admin"); }}>
                  <CardContent className="space-y-4 p-0">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="admin@fuelconnect.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full h-11 text-base" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardContent>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="pt-6 border-t">
            <Link href="/driver/otp">
              <div className="flex items-center justify-between p-4 rounded-lg border border-dashed hover:bg-muted/50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Are you a driver?</h3>
                    <p className="text-sm text-muted-foreground">Access fuel OTP without login</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative bg-primary">
        <div className="absolute inset-0 bg-primary/20 z-10" />
        <img 
          src={generatedImage} 
          alt="Logistics Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-12 z-20 text-white">
          <div className="flex items-center gap-2 font-heading font-bold text-xl opacity-80">
            <ShieldCheck className="h-5 w-5" />
            <span>Secure Enterprise Platform</span>
          </div>
          <div className="max-w-md space-y-4">
            <h2 className="text-4xl font-heading font-bold leading-tight">Smart Fuel Management for Modern Fleets</h2>
            <p className="text-lg text-white/80">Streamline your fuel operations, track consumption in real-time, and manage expenses with our comprehensive B2B solution.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
