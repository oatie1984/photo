
import React, { useRef, useState, useEffect } from 'react';
import PhotoIcon from './icons/PhotoIcon';
import CameraIcon from './icons/CameraIcon';

interface ImageUploaderProps {
  onImageSelect: (imageDataUrl: string, imageType: string) => void;
  inputImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, inputImage }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
        event.target.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
     if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
      // Wait for state update and render
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      console.error("Camera error:", err);
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
         setCameraError("Camera access was denied. Please allow camera access in your browser's site settings.");
      } else {
         setCameraError("Unable to access camera. Please make sure your device has a camera and it is not in use.");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw the current frame from the video onto the canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onImageSelect(dataUrl, 'image/jpeg');
        stopCamera();
      }
    }
  };

  if (inputImage) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <img src={inputImage} alt="Selected preview" className="max-w-full max-h-[50vh] mx-auto rounded-lg shadow-lg" />
          <div className="flex justify-center gap-4 mt-4">
             <button
              onClick={() => onImageSelect('', '')} 
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Choose different photo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Camera View
  if (isCameraOpen) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-auto max-h-[70vh] object-cover"
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8">
             <button 
              onClick={stopCamera}
              className="bg-gray-800/80 hover:bg-gray-700 text-white px-6 py-2 rounded-full backdrop-blur-sm transition-colors"
             >
               Cancel
             </button>
             <button 
              onClick={capturePhoto}
              className="bg-white p-1 rounded-full border-4 border-gray-300 shadow-lg hover:scale-105 transition-transform"
             >
               <div className="w-16 h-16 bg-red-600 rounded-full border-4 border-white"></div>
             </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Upload View
  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="w-full border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-red-500 hover:bg-gray-800/20 transition-all min-h-[250px] flex flex-col items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full">
            {/* Upload Option */}
            <div 
                onClick={triggerFileInput}
                className="group cursor-pointer flex flex-col items-center p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/80 transition-all border border-transparent hover:border-red-500/50 w-full md:w-48"
            >
                <PhotoIcon className="w-16 h-16 mb-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                <span className="font-semibold text-lg text-gray-200">Upload Photo</span>
                <p className="text-xs text-gray-500 mt-2">From Gallery</p>
            </div>

            <div className="hidden md:block text-gray-500 font-bold">OR</div>

            {/* Camera Option */}
            <div 
                onClick={startCamera}
                className="group cursor-pointer flex flex-col items-center p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/80 transition-all border border-transparent hover:border-red-500/50 w-full md:w-48"
            >
                <CameraIcon className="w-16 h-16 mb-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                <span className="font-semibold text-lg text-gray-200">Take Photo</span>
                <p className="text-xs text-gray-500 mt-2">Open Camera</p>
            </div>
        </div>
        
        {cameraError && (
          <div className="mt-6 p-4 bg-red-900/40 text-red-200 rounded-lg max-w-lg">
            <p className="font-medium">Camera Error</p>
            <p className="text-sm mt-1">{cameraError}</p>
          </div>
        )}
        
        <p className="text-sm text-gray-500 mt-8">Drag & drop image here</p>
      </div>
    </div>
  );
};

export default ImageUploader;
