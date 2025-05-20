
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Mail, Save } from "lucide-react";

export function EmailSettings() {
  const [email, setEmail] = useState("");
  const [autoReports, setAutoReports] = useState(true);
  const [dailyReports, setDailyReports] = useState(true);
  const [alertEmails, setAlertEmails] = useState(true);

  const handleSave = () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    toast.success("Email settings saved successfully");
  };

  const handleTest = () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    toast.success("Test email sent successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Email Notifications
        </CardTitle>
        <CardDescription>
          Configure email settings for reports and alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              placeholder="admin@hospital.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-reports" className="block">Automated Reports</Label>
                <span className="text-xs text-muted-foreground">Send detection reports automatically</span>
              </div>
              <Switch 
                id="auto-reports" 
                checked={autoReports} 
                onCheckedChange={setAutoReports} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-reports" className="block">Daily Summary</Label>
                <span className="text-xs text-muted-foreground">Receive end-of-day reports</span>
              </div>
              <Switch 
                id="daily-reports" 
                checked={dailyReports} 
                onCheckedChange={setDailyReports} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alert-emails" className="block">Critical Alerts</Label>
                <span className="text-xs text-muted-foreground">Get notified for urgent issues</span>
              </div>
              <Switch 
                id="alert-emails" 
                checked={alertEmails} 
                onCheckedChange={setAlertEmails} 
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-3">
            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={handleTest}>Test Email</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
