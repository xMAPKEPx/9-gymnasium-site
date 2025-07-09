import { FC, InputHTMLAttributes } from 'react';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Radio: FC<RadioProps> = ({ label, checked, onChange, className = '', ...props }) => (
  <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
    <input
      type="radio"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="form-radio w-5 h-5 text-primary focus:ring-primary border-gray-300 transition-all duration-200"
      aria-checked={checked}
      {...props}
    />
    <span className="text-gray-700 select-none">{label}</span>
  </label>
);

export default Radio; 