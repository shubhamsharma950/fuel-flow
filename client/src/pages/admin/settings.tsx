import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save, Bell, Lock, Database, Mail, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage platform configuration and preferences</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <CardTitle>Platform Settings</CardTitle>
              </div>
              <CardDescription>Configure general platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="FuelConnect" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@fuelconnect.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input id="support-phone" defaultValue="+91 1800 123 4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform-desc">Platform Description</Label>
                <Textarea 
                  id="platform-desc" 
                  rows={4}
                  defaultValue="Smart Fuel Management for Modern Fleets - Streamline your fuel operations, track consumption in real-time, and manage expenses with our comprehensive B2B solution."
                />
              </div>
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable to temporarily disable platform access
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <Label htmlFor="new-registrations">Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new transporters to register on the platform
                  </p>
                </div>
                <Switch id="new-registrations" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Commission</CardTitle>
              <CardDescription>Configure fuel pricing and commission rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diesel-price">Diesel Price (per liter)</Label>
                  <Input id="diesel-price" type="number" defaultValue="90.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petrol-price">Petrol Price (per liter)</Label>
                  <Input id="petrol-price" type="number" defaultValue="105.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-commission">Platform Commission (%)</Label>
                  <Input id="platform-commission" type="number" defaultValue="2.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pump-commission">Default Pump Commission (%)</Label>
                  <Input id="pump-commission" type="number" defaultValue="3.0" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <Label>New Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for new fuel orders
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <Label>Payment Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about payment status changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <Label>New Transporter Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert when new transporters apply
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <Label>Overdue Payment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily reminder for overdue payments
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert when pump fuel levels are low
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly summary via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>Manage password and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Update Password</Button>
              
              <div className="border-t pt-6 mt-6">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Auto-logout after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <CardTitle>Email Configuration</CardTitle>
              </div>
              <CardDescription>Configure SMTP settings for email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" defaultValue="smtp.gmail.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Encryption</Label>
                  <Input id="smtp-encryption" defaultValue="TLS" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input id="smtp-username" type="email" defaultValue="noreply@fuelconnect.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input id="smtp-password" type="password" />
              </div>
              <div className="flex gap-2">
                <Button>Test Connection</Button>
                <Button variant="outline">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>API Keys</CardTitle>
              </div>
              <CardDescription>Manage API keys for third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Production API Key</Label>
                <div className="flex gap-2">
                  <Input value="sk_live_••••••••••••••••" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Test API Key</Label>
                <div className="flex gap-2">
                  <Input value="sk_test_••••••••••••••••" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Endpoints</CardTitle>
              <CardDescription>Configure webhooks for real-time event notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-domain.com/webhook" />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <Label>Enable Webhooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive real-time event notifications
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
