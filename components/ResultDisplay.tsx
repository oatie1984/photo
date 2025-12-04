import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, onReset }) => {
  const currentPageUrl = window.location.href; // Get the current page URL to encode

  return (
    <div className="animate-fade-in text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text">
        Your Masterpiece is Ready!
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-300">Original</h3>
          <img src={originalImage} alt="Original" className="rounded-xl shadow-lg w-full object-contain" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-300">Generated</h3>
          <img src={generatedImage} alt="Generated" className="rounded-xl shadow-2xl shadow-red-900/50 w-full object-contain" />
        </div>
      </div>

      <div className="mt-12 p-8 bg-gray-800/50 rounded-xl max-w-lg mx-auto flex flex-col items-center gap-6">
        <h3 className="text-2xl font-semibold mb-2">Download & Share Your Creation!</h3>
        <p className="text-gray-400 mb-4 text-center">Save your new image or share this page with others.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
           <a
            href={generatedImage}
            download="enie-christmas-image.png"
            className="w-full sm:w-auto flex-grow text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors text-lg"
          >
            Download Image
          </a>
           <button
            onClick={onReset}
            className="w-full sm:w-auto flex-grow text-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full transition-colors text-lg"
          >
            Create Another
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-700/50 rounded-lg flex flex-col items-center gap-3 w-full">
          <h4 className="text-xl font-semibold text-gray-200">Share This Page</h4>
          <p className="text-sm text-gray-400 text-center">Scan this QR code with another device to open this page in a browser.</p>
          <div className="bg-white p-2 rounded-lg shadow-md">
            <QRCodeSVG 
              value={currentPageUrl} 
              size={128} 
              level="H" 
              includeMargin={false} 
              fgColor="#dc2626" // Tailwind red-600
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;