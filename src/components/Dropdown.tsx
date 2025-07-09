import { type FC, useState, useRef, useEffect } from 'react';

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
}

const Dropdown: FC<DropdownProps> = ({ options, value, onChange, placeholder = 'Выбрать...', className = '', ariaLabel }) => {
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
        className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-left focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        {selected ? selected.label : <span className="text-gray-400">{placeholder}</span>}
      </button>
      {open && (
        <ul
          className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-card z-20 max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map(opt => (
            <li
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 ${opt.value === value ? 'bg-primary text-white' : ''}`}
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