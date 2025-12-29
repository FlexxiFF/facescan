
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface CameraProps {
  onCapture: (base64Image: string) => void;
  onCancel: () => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64 = dataUrl.split(',')[1];
        onCapture(base64);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl aspect-[3/4] md:aspect-video rounded-3xl overflow-hidden border-4 border-rose-300 shadow-2xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover scale-x-[-1]"
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-80 border-2 border-white/50 rounded-[100%] shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"></div>
          <p className="absolute bottom-12 text-white font-medium text-center px-4 drop-shadow-lg">
            Align your face within the oval
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-6">
        <button 
          onClick={onCancel}
          className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all font-medium backdrop-blur-md"
        >
          Cancel
        </button>
        <button 
          onClick={capture}
          className="w-20 h-20 bg-rose-500 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <div className="w-16 h-16 rounded-full border-2 border-white/20"></div>
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      {error && (
        <div className="mt-4 text-rose-400 bg-rose-900/50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};
