import { useState, useEffect } from 'react';
import './Slider.css';

interface SliderProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  required?: boolean;
  onChange: (name: string, value: number) => void;
  placeholder?: string;
}

const Slider = ({
  label,
  name,
  value,
  min,
  max,
  step,
  unit = '',
  required = false,
  onChange,
  placeholder
}: SliderProps) => {
  const [inputValue, setInputValue] = useState<string>(value > 0 ? value.toString() : '');

  useEffect(() => {
    setInputValue(value > 0 ? value.toString() : '');
  }, [value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInputValue(newValue.toString());
    onChange(name, newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);
    
    // Permite números decimais e vazios (sem limitação de range no input)
    if (rawValue === '' || /^\d*\.?\d*$/.test(rawValue)) {
      const numValue = rawValue === '' ? 0 : parseFloat(rawValue);
      if (!isNaN(numValue)) {
        onChange(name, numValue);
      }
    }
  };

  const handleInputBlur = () => {
    // Apenas valida se é um número válido, sem forçar limites
    if (inputValue !== '') {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        setInputValue(numValue.toString());
        onChange(name, numValue);
      }
    }
  };

  // Clampa a porcentagem para o slider visual, mas permite valores livres no input
  const clampedValue = Math.max(min, Math.min(max, value));
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  return (
    <div className="slider-container">
      <label htmlFor={name} className="slider-label">
        {label}{required && <span className="required">*</span>}
      </label>
      
      <div className="slider-input-group">
        <input
          type="number"
          id={name}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          step={step}
          required={required}
          className={`slider-number-input ${
            value > max || value < min ? 'out-of-range' : ''
          }`}
        />
        <span className="slider-unit">{unit}</span>
      </div>

      <div className="slider-track-container">
        <input
          type="range"
          id={`${name}-slider`}
          name={`${name}-slider`}
          min={min}
          max={max}
          step={step}
          value={clampedValue || min}
          onChange={handleSliderChange}
          className="slider-track"
          style={{
            background: `linear-gradient(to right, #10b981 0%, #10b981 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />
        <div className="slider-labels">
          <span className="slider-min">{min}{unit}</span>
          <span className="slider-max">{max}{unit}</span>
        </div>
      </div>
      
      {(value > max || value < min) && (
        <div className="range-warning">
          ⚠️ Valor fora do range sugerido ({min}-{max}{unit})
        </div>
      )}
    </div>
  );
};

export default Slider;