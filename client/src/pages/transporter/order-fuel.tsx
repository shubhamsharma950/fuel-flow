import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Droplet, IndianRupee, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function OrderFuelPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [amount, setAmount] = useState<number[]>([5000]);
  const [fuelType, setFuelType] = useState("diesel");
  
  // Mock price
  const price = fuelType === "diesel" ? 94.50 : 101.20;
  const liters = (amount[0] / price).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed Successfully!",
      description: `Order for ${liters}L of ${fuelType} has been initiated.`,
    });
    setTimeout(() => {
      setLocation("/transporter");
    }, 1500);
  };

  return (
    <DashboardLayout role="transporter">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">New Fuel Order</h1>
          <p className="text-muted-foreground">Select vehicle and authorize fuel for your driver.</p>
        </div>

        <Card className="border-t-4 border-t-secondary">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Fill in the details to generate OTP for the driver.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Select Vehicle</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MH12AB1234">MH 12 AB 1234 (Tata Ace)</SelectItem>
                      <SelectItem value="MH14CD5678">MH 14 CD 5678 (Eicher Pro)</SelectItem>
                      <SelectItem value="MH02XY9999">MH 02 XY 9999 (Mahindra Bolero)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select Driver</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="d1">Ramesh Kumar</SelectItem>
                      <SelectItem value="d2">Suresh Singh</SelectItem>
                      <SelectItem value="d3">Vikram Malhotra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Fuel Type</Label>
                <RadioGroup defaultValue="diesel" onValueChange={setFuelType} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="diesel" id="diesel" className="peer sr-only" />
                    <Label
                      htmlFor="diesel"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                    >
                      <Truck className="mb-2 h-6 w-6" />
                      <span className="font-bold">Diesel</span>
                      <span className="text-xs text-muted-foreground">₹ 94.50 / L</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="petrol" id="petrol" className="peer sr-only" />
                    <Label
                      htmlFor="petrol"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary peer-data-[state=checked]:text-secondary-foreground cursor-pointer transition-all"
                    >
                      <Droplet className="mb-2 h-6 w-6" />
                      <span className="font-bold">Petrol</span>
                      <span className="text-xs text-muted-foreground">₹ 101.20 / L</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Amount: ₹ {amount[0].toLocaleString()}</Label>
                  <span className="text-2xl font-bold font-heading text-primary">
                    {liters} <span className="text-sm font-normal text-muted-foreground">Liters (approx)</span>
                  </span>
                </div>
                <Slider
                  value={amount}
                  onValueChange={setAmount}
                  max={20000}
                  step={100}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹ 100</span>
                  <span>₹ 20,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fuel Brand Preference</Label>
                 <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Partner Pump (Fastest)</SelectItem>
                      <SelectItem value="hp">HP (Hindustan Petroleum)</SelectItem>
                      <SelectItem value="bp">BP (Bharat Petroleum)</SelectItem>
                      <SelectItem value="iocl">IOCL (Indian Oil)</SelectItem>
                      <SelectItem value="reliance">Reliance / Jio-bp</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">"Any Partner Pump" gives access to the widest network.</p>
              </div>

              <Button type="submit" className="w-full h-12 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-6 shadow-lg shadow-secondary/20">
                Pay & Generate OTP <IndianRupee className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
