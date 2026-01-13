import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplet, CheckCircle2, QrCode, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";

// Mock data for the OTP view
const MOCK_OTP_DATA = {
  isValid: true,
  orderId: "ORD-8291",
  vehicle: "MH 12 AB 1234",
  fuelType: "Diesel",
  amount: "50 Liters",
  pumpName: "Hindustan Petroleum",
  location: "Highway 4, Near Toll Plaza",
  otp: "4821",
  status: "Active"
};

export default function DriverOTPPage() {
  const [otpVisible, setOtpVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1); // 1: Input Phone, 2: View OTP

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification
    if (phone.length >= 10) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md mt-8 mb-8 flex items-center justify-center gap-2 text-primary font-heading font-bold text-2xl">
        <Droplet className="fill-current h-6 w-6" />
        <span>FuelConnect Driver</span>
      </div>

      {step === 1 ? (
        <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Driver Verification</CardTitle>
            <CardDescription>Enter your mobile number to view active fuel OTPs assigned to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  className="text-lg h-12"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                View Active Orders
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-lg overflow-hidden">
           <div className="bg-primary p-6 text-primary-foreground text-center">
             <div className="mx-auto bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
               <QrCode className="h-8 w-8" />
             </div>
             <h2 className="text-2xl font-bold font-heading">Fuel Authorization</h2>
             <p className="opacity-80">Show this to the pump attendant</p>
           </div>
           
           <CardContent className="p-6 space-y-6">
             <div className="text-center space-y-1 py-4 border-b border-dashed">
               <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">One Time Password</p>
               <div className="text-5xl font-mono font-bold tracking-widest text-foreground">
                 {MOCK_OTP_DATA.otp.split('').map((d, i) => (
                   <span key={i} className="inline-block mx-1">{d}</span>
                 ))}
               </div>
               <p className="text-xs text-green-600 font-medium flex items-center justify-center gap-1 mt-2">
                 <CheckCircle2 className="h-3 w-3" /> Valid for 15:00 mins
               </p>
             </div>

             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <Label className="text-xs text-muted-foreground uppercase">Vehicle</Label>
                   <p className="font-bold text-lg">{MOCK_OTP_DATA.vehicle}</p>
                 </div>
                 <div className="text-right">
                   <Label className="text-xs text-muted-foreground uppercase">Fuel Type</Label>
                   <div className="flex items-center justify-end gap-1">
                      <span className="font-bold text-lg">{MOCK_OTP_DATA.fuelType}</span>
                   </div>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <Label className="text-xs text-muted-foreground uppercase">Quantity</Label>
                   <p className="font-bold text-lg">{MOCK_OTP_DATA.amount}</p>
                 </div>
                 <div className="text-right">
                   <Label className="text-xs text-muted-foreground uppercase">Order ID</Label>
                   <p className="font-mono text-sm">{MOCK_OTP_DATA.orderId}</p>
                 </div>
               </div>

               <div className="bg-muted p-4 rounded-lg flex items-start gap-3 mt-4">
                 <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                 <div>
                   <p className="font-bold text-sm">{MOCK_OTP_DATA.pumpName}</p>
                   <p className="text-xs text-muted-foreground">{MOCK_OTP_DATA.location}</p>
                   <Button variant="link" className="p-0 h-auto text-xs mt-1">Get Directions</Button>
                 </div>
               </div>
             </div>

             <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => setStep(1)}
              >
               Back to Search
             </Button>
           </CardContent>
        </Card>
      )}
    </div>
  );
}
