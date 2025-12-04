
import React, { useState, useCallback, useEffect } from 'react';
import { Theme } from './types';
import { THEMES, REFILL_CODE } from './constants';
import ThemeSelector from './components/ThemeSelector';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { generateThemedImage } from './services/geminiService';
import SparklesIcon from './components/icons/SparklesIcon';

// To use the QR code component, you may need to install the 'qrcode.react' library.
// You can do this by running: npm install qrcode.react @types/qrcode.react
// This component is included in `components/ResultDisplay.tsx`

const MAX_QUOTA = 200;

const App: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [inputImageType, setInputImageType] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Quota state
  const [quota, setQuota] = useState<number>(MAX_QUOTA);
  const [refillCode, setRefillCode] = useState<string>('');
  const [showRefill, setShowRefill] = useState<boolean>(false);

  // Load quota from local storage on mount
  useEffect(() => {
    const savedQuota = localStorage.getItem('enie_quota');
    if (savedQuota) {
      setQuota(parseInt(savedQuota, 10));
    }
  }, []);

  // Update local storage whenever quota changes
  useEffect(() => {
    localStorage.setItem('enie_quota', quota.toString());
  }, [quota]);

  const handleImageSelect = (imageDataUrl: string, imageType: string) => {
    setInputImage(imageDataUrl);
    setInputImageType(imageType);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (quota <= 0) {
      setError('You have run out of credits. Please enter the code to refill.');
      setShowRefill(true);
      return;
    }

    if (!selectedTheme || !inputImage || !inputImageType) {
      setError('Please select a theme and upload an image first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // The base64 string from FileReader includes the data URL prefix,
      // so we need to remove it before sending to the API.
      const base64Data = inputImage.split(',')[1];
      const resultImageUrl = await generateThemedImage(base64Data, inputImageType, selectedTheme.prompt);
      
      setGeneratedImage(resultImageUrl);
      
      // Decrement quota on success
      setQuota(prev => Math.max(0, prev - 1));

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedTheme, inputImage, inputImageType, quota]);

  const handleReset = () => {
    setSelectedTheme(null);
    setInputImage(null);
    setInputImageType(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  }

  const handleRefillSubmit = () => {
    if (refillCode === REFILL_CODE) {
      setQuota(MAX_QUOTA);
      setShowRefill(false);
      setRefillCode('');
      setError(null);
      alert('Credits successfully refilled!');
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-red-500/30">
      {isLoading && <Loader />}
      <div className="relative isolate min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-red-900/50">
        
        {/* Quota Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`
            px-4 py-2 rounded-full font-mono text-sm font-bold shadow-lg border
            ${quota > 0 ? 'bg-gray-800 border-gray-600 text-green-400' : 'bg-red-900/80 border-red-500 text-red-200 animate-pulse'}
          `}>
            Credits: {quota} / {MAX_QUOTA}
          </div>
        </div>

        <main className="container mx-auto px-4 py-8 md:py-16">
          <header className="text-center mb-10 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text">
              ENIE AI Christmas Photo Booth
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your photos into festive masterpieces. Choose a theme, upload your picture, and let our AI work its magic!
            </p>
          </header>

          {!generatedImage ? (
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-center">1. Choose Your Theme</h2>
                <ThemeSelector themes={THEMES} selectedTheme={selectedTheme} onSelectTheme={setSelectedTheme} />
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-center">2. Upload Your Photo</h2>
                <ImageUploader onImageSelect={handleImageSelect} inputImage={inputImage} />
              </section>

              {/* Refill Section */}
              {(showRefill || quota === 0) && (
                <div className="max-w-md mx-auto bg-gray-800/80 p-6 rounded-xl border border-red-500/50 text-center">
                  <h3 className="text-xl font-bold text-red-400 mb-2">Out of Credits!</h3>
                  <p className="mb-4 text-gray-300">Please enter the refill code to continue generating images.</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={refillCode}
                      onChange={(e) => setRefillCode(e.target.value)}
                      placeholder="Enter Code (e.g. ENIE...)"
                      className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500 text-white"
                    />
                    <button 
                      onClick={handleRefillSubmit}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Refill
                    </button>
                  </div>
                </div>
              )}

              {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg max-w-2xl mx-auto">{error}</p>}

              <div className="text-center pt-4">
                <button
                  onClick={handleGenerateClick}
                  disabled={!selectedTheme || !inputImage || isLoading || quota <= 0}
                  className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold text-xl py-4 px-10 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50 shadow-lg shadow-red-900/50"
                >
                  <SparklesIcon className="w-6 h-6" />
                  {quota > 0 ? 'Generate Magic' : 'No Credits Left'}
                </button>
              </div>
            </div>
          ) : (
            <ResultDisplay
              originalImage={inputImage!}
              generatedImage={generatedImage}
              onReset={handleReset}
            />
          )}

        </main>
        <footer className="text-center py-6 text-gray-500">
            <p>&copy; {new Date().getFullYear()} ENIE AI Christmas Photo Booth. Powered by Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
