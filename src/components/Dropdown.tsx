import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const Dropdown: FC<DropdownProps> = ({ options, value, onChange, placeholder = 'Выбрать...', className = '', ariaLabel, disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        className={`w-full px-4 py-2 bg-gray-100 rounded-lg border outline-0 border-gray-800 text-left focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {selected ? selected.label : <span className="text-gray-400">{placeholder}</span>}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-lg">▼</span>
      </button>
      {open && !disabled && (
        <ul
          className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-60 overflow-auto text-base font-medium"
          role="listbox"
        >
          {options.map(opt => (
            <li
              key={opt.value}
              className={`px-4 py-3 cursor-pointer transition-all duration-200 select-none ${opt.value === value ? 'bg-[#1E3A8A] text-white' : 'hover:bg-[#F1F5FF] hover:text-[#1E3A8A] text-gray-900'}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown; 