import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  currency: string;
  updateColor: (key: keyof ThemeColors, value: string) => void;
  updateCurrency: (currency: string) => void;
}

const defaultColors: ThemeColors = {
  primary: '#9370DB',    // Medium Purple
  secondary: '#BA55D3',  // Medium Orchid
  accent: '#8B7BA8',     // Muted Purple
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [currency, setCurrency] = useState<string>('$');

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  return (
    <ThemeContext.Provider value={{ colors, currency, updateColor, updateCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
