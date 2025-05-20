
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Detection {
  id: string;
  timestamp: Date;
  object: string;
  severity: "low" | "medium" | "high";
  location: string;
}

interface DetectionListProps {
  detections: Detection[];
}

export function DetectionList({ detections }: DetectionListProps) {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-900/30 text-red-300";
      case "medium": return "bg-yellow-900/30 text-yellow-300";
      case "low": return "bg-green-900/30 text-green-300";
      default: return "bg-blue-900/30 text-blue-300";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Recent Detections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          {detections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No detections yet</p>
              <p className="text-xs">Start monitoring to detect objects</p>
            </div>
          ) : (
            <div className="space-y-3">
              {detections.map((detection) => (
                <div key={detection.id} className="bg-secondary rounded-md p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium">{detection.object}</div>
                    <span className={`status-badge ${getSeverityClass(detection.severity)}`}>
                      {detection.severity.charAt(0).toUpperCase() + detection.severity.slice(1)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {detection.timestamp.toLocaleTimeString()} - {detection.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
