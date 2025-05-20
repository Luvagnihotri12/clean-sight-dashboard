
import { useEffect, useState } from "react";
import { CleanlinessMetrics } from "./CleanlinessMetrics";
import { WebcamMonitor } from "./WebcamMonitor";
import { Detection, DetectionList } from "./DetectionList";
import { EmailSettings } from "./EmailSettings";

interface DashboardProps {
  section: string;
}

export function Dashboard({ section }: DashboardProps) {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [metrics, setMetrics] = useState({
    overallScore: 78,
    surfaceCleaniness: 82,
    sanitization: 75,
    compliance: 89
  });

  // Add mock detection
  const addDetection = (data: any) => {
    const mockObjects = [
      "Unlabeled waste bin", 
      "Personal items", 
      "Uncleaned surface",
      "Food container",
      "Non-medical equipment",
      "Unorganized supplies"
    ];
    
    const mockLocations = [
      "Room 301", 
      "Main Corridor", 
      "Nurse Station",
      "Procedure Area",
      "Patient Room",
      "Staff Area"
    ];
    
    const severity = data.cleanlinessScore > 75 ? "low" : 
                    data.cleanlinessScore > 50 ? "medium" : "high";
    
    const detection: Detection = {
      id: Date.now().toString(),
      timestamp: new Date(),
      object: data.detectedObjects.length > 0 ? 
        data.detectedObjects[0] : 
        mockObjects[Math.floor(Math.random() * mockObjects.length)],
      severity,
      location: mockLocations[Math.floor(Math.random() * mockLocations.length)]
    };
    
    setDetections(prev => [detection, ...prev].slice(0, 20));
    
    // Update metrics based on new detection
    setMetrics(prev => ({
      ...prev,
      overallScore: Math.max(40, Math.min(95, prev.overallScore + (Math.random() * 10 - 5))),
      surfaceCleaniness: Math.max(40, Math.min(95, prev.surfaceCleaniness + (Math.random() * 10 - 5))),
      sanitization: Math.max(40, Math.min(95, prev.sanitization + (Math.random() * 10 - 5))),
      compliance: Math.max(40, Math.min(95, prev.compliance + (Math.random() * 10 - 5)))
    }));
  };

  // Initialize with some mock detections
  useEffect(() => {
    const mockDetections: Detection[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        object: "Unlabeled waste bin",
        severity: "high",
        location: "Room 301"
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        object: "Personal items",
        severity: "medium",
        location: "Main Corridor"
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        object: "Uncleaned surface",
        severity: "medium",
        location: "Nurse Station"
      }
    ];
    
    setDetections(mockDetections);
  }, []);
  
  if (section === "settings") {
    return (
      <div className="container py-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmailSettings />
          <div className="space-y-6">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-lg">System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model Version:</span>
                    <span>SanitTrack v1.2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Update:</span>
                    <span>May 20, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Detection Engine:</span>
                    <span>AI Sanitization v2.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-6">
      <h2 className="text-2xl font-bold mb-6">Sanitization Monitoring Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WebcamMonitor onDetection={addDetection} />
        </div>
        
        <div>
          <DetectionList detections={detections} />
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Cleanliness Metrics</h3>
        <CleanlinessMetrics metrics={metrics} />
      </div>
    </div>
  );
}

// This component is needed for the CardHeader, CardContent, and CardTitle in the Settings section
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
