
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWebcam } from "@/hooks/useWebcam";
import { Camera, CameraOff, Play, Stop } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WebcamMonitorProps {
  onDetection?: (data: any) => void;
}

export function WebcamMonitor({ onDetection }: WebcamMonitorProps) {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { isActive, isPermissionGranted, error, videoRef, canvasRef, startWebcam, stopWebcam } = useWebcam({
    onFrame: (canvas) => {
      if (isMonitoring) {
        // This is where you would implement your AI detection logic
        // For demo purposes, we'll just simulate a detection
        if (Math.random() > 0.95) {
          const mockDetection = {
            timestamp: new Date(),
            cleanlinessScore: Math.floor(Math.random() * 100),
            detectedObjects: ['Trash bin', 'Uncleaned surface'].filter(() => Math.random() > 0.5)
          };
          
          if (onDetection) {
            onDetection(mockDetection);
          }
        }
      }
    }
  });

  const handleStartMonitoring = async () => {
    if (!isActive) {
      await startWebcam();
    }
    setIsMonitoring(true);
  };

  const handleStopMonitoring = () => {
    setIsMonitoring(false);
    stopWebcam();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            Live Monitoring
          </CardTitle>
          <div className="flex items-center">
            <span className={`status-badge ${isActive ? "status-online" : "status-offline"} mr-2`}>
              {isActive ? "Camera Active" : "Camera Off"}
            </span>
            <span className={`status-badge ${isMonitoring ? "status-online" : "status-offline"}`}>
              {isMonitoring ? "Monitoring" : "Idle"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="webcam-container">
          {isActive ? (
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              autoPlay 
              playsInline 
              muted
            />
          ) : (
            <div className="webcam-placeholder">
              <div className="text-center">
                <CameraOff className="mx-auto h-10 w-10 opacity-30 mb-2" />
                <p>Camera is currently inactive</p>
                <p className="text-xs opacity-70">Press start monitoring to activate</p>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isPermissionGranted === false && (
          <Alert className="mt-4">
            <AlertTitle>Permission Required</AlertTitle>
            <AlertDescription>
              Camera access is required for monitoring. Please allow access in your browser settings.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-center mt-4 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleStartMonitoring}
                  disabled={isMonitoring}
                  variant="default" 
                  className={`${isMonitoring ? '' : 'glow-accent'}`}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Monitoring
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start AI-powered sanitization monitoring</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleStopMonitoring} 
                  disabled={!isMonitoring && !isActive}
                  variant="outline"
                >
                  <Stop className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stop monitoring and turn off camera</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
