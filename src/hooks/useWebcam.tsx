
import { useState, useRef, useCallback, useEffect } from "react";

interface UseWebcamOptions {
  onFrame?: (canvas: HTMLCanvasElement, video: HTMLVideoElement) => void;
  frameRate?: number;
}

export function useWebcam({ onFrame, frameRate = 1000 / 30 }: UseWebcamOptions = {}) {
  const [isActive, setIsActive] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);

  const startWebcam = useCallback(async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
      }

      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsActive(true);
        setIsPermissionGranted(true);
      }

    } catch (err) {
      let message = "Failed to start webcam";
      if (err instanceof Error) {
        message = err.message;
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setIsPermissionGranted(false);
          message = "Camera access denied. Please grant permission and try again.";
        }
      }
      setError(message);
      setIsActive(false);
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    setIsActive(false);
  }, []);

  const processFrame = useCallback((timestamp: number) => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;

    const elapsed = timestamp - lastFrameTime.current;
    if (elapsed >= frameRate) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (onFrame) {
          onFrame(canvas, video);
        }
      }
      
      lastFrameTime.current = timestamp;
    }

    animationRef.current = requestAnimationFrame(processFrame);
  }, [isActive, frameRate, onFrame]);

  useEffect(() => {
    if (isActive && onFrame) {
      animationRef.current = requestAnimationFrame(processFrame);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isActive, processFrame, onFrame]);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  return {
    isActive,
    isPermissionGranted,
    error,
    videoRef,
    canvasRef,
    startWebcam,
    stopWebcam
  };
}
