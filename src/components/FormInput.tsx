import { FC, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

const FormInput: FC<FormInputProps> = ({ label, error, className = '', id, ...props }) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={inputId} className="font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        className={`rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${error ? 'border-red-500' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && <span id={`${inputId}-error`} className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default FormInput; 