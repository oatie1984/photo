
import React from 'react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: Theme | null;
  onSelectTheme: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, onSelectTheme }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {themes.map((theme) => (
        <div
          key={theme.id}
          onClick={() => onSelectTheme(theme)}
          className={`
            cursor-pointer bg-gray-800/50 rounded-xl overflow-hidden
            border-2 transition-all duration-300 ease-in-out group
            transform hover:-translate-y-2
            ${selectedTheme?.id === theme.id ? 'border-red-500 scale-105 shadow-2xl shadow-red-900/50' : 'border-gray-700 hover:border-red-600'}
          `}
        >
          <img src={theme.imageUrl} alt={theme.title} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
          <div className="p-5">
            <h3 className="text-xl font-bold text-white">{theme.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{theme.description}</p>
          </div>
           {selectedTheme?.id === theme.id && (
            <div className="absolute inset-0 bg-red-500/20 mix-blend-color-dodge rounded-xl"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThemeSelector;
