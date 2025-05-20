
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Monitor, Settings } from "lucide-react";

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ currentSection, onNavigate }: NavbarProps) {
  const [unreadNotifications] = useState(2); // This would be connected to your notifications system
  
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-primary">
            SanitTrack<span className="text-accent">AI</span>
          </h1>
          
          <nav className="hidden sm:flex items-center space-x-1">
            <Button 
              variant={currentSection === "dashboard" ? "secondary" : "ghost"} 
              onClick={() => onNavigate("dashboard")}
              className="h-9 px-3"
            >
              <Monitor className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={currentSection === "settings" ? "secondary" : "ghost"} 
              onClick={() => onNavigate("settings")}
              className="h-9 px-3"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-xs flex items-center justify-center rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium">AI</span>
            </div>
            <span className="hidden sm:inline-block text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
