
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar currentSection={currentSection} onNavigate={setCurrentSection} />
      
      <main className="flex-1">
        <Dashboard section={currentSection} />
      </main>
      
      <footer className="border-t border-border py-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 SanitTrack AI - Hospital Sanitization Monitoring System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
