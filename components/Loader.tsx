
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col justify-center items-center z-50 text-white">
      <div className="animate-pulse">
        <SparklesIcon className="w-24 h-24 text-red-500" />
      </div>
      <p className="mt-6 text-2xl font-semibold animate-pulse">
        AI is working its magic...
      </p>
      <p className="mt-2 text-gray-400">Please wait, this may take a moment.</p>
    </div>
  );
};

export default Loader;
