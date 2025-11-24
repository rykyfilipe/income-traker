import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ColorPicker.css';

function ColorPicker() {
  const { colors, currency, updateColor, updateCurrency } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { symbol: '$', name: 'USD' },
    { symbol: '€', name: 'EUR' },
    { symbol: '£', name: 'GBP' },
    { symbol: '¥', name: 'JPY' },
    { symbol: '₹', name: 'INR' },
    { symbol: 'R$', name: 'BRL' },
    { symbol: 'lei', name: 'RON' },
    { symbol: 'CHF', name: 'CHF' },
    { symbol: 'kr', name: 'SEK' },
  ];

  return (
    <div className="color-picker-container">
      <button 
        className="color-picker-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme & Currency"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="color-picker-panel">
          <h3>Settings</h3>
          
          <div className="settings-section">
            <h4>Currency</h4>
            <div className="currency-selector">
              <select 
                value={currency} 
                onChange={(e) => updateCurrency(e.target.value)}
                className="currency-select"
              >
                {currencies.map((curr) => (
                  <option key={curr.symbol} value={curr.symbol}>
                    {curr.symbol} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h4>Theme Colors</h4>
            
            <div className="color-option">
              <label>Primary:</label>
              <input
                type="color"
                value={colors.primary}
                onChange={(e) => updateColor('primary', e.target.value)}
              />
              <span>{colors.primary}</span>
            </div>

            <div className="color-option">
              <label>Secondary:</label>
              <input
                type="color"
                value={colors.secondary}
                onChange={(e) => updateColor('secondary', e.target.value)}
              />
              <span>{colors.secondary}</span>
            </div>

            <div className="color-option">
              <label>Accent:</label>
              <input
                type="color"
                value={colors.accent}
                onChange={(e) => updateColor('accent', e.target.value)}
              />
              <span>{colors.accent}</span>
            </div>
          </div>

          <button 
            className="reset-button"
            onClick={() => {
              updateColor('primary', '#9370DB');
              updateColor('secondary', '#BA55D3');
              updateColor('accent', '#8B7BA8');
              updateCurrency('$');
            }}
          >
            Reset to Default
          </button>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
