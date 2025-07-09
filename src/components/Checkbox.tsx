import type { FC, InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange, className = '', ...props }) => (
  <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="form-checkbox w-5 h-5 text-primary rounded focus:ring-primary border-gray-300 transition-all duration-200"
      aria-checked={checked}
      {...props}
    />
    <span className="text-gray-700 select-none">{label}</span>
  </label>
);

export default Checkbox; 