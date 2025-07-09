import type { FC } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  ariaLabel?: string;
}

const Switch: FC<SwitchProps> = ({ checked, onChange, className = '', ariaLabel }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    className={`relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${checked ? 'bg-primary' : 'bg-gray-200'} ${className}`}
    onClick={() => onChange(!checked)}
  >
    <span
      className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-card transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`}
    />
  </button>
);

export default Switch; 