import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'gray';
  ariaLabel: string;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-lg',
  lg: 'w-12 h-12 text-xl',
};

const colorMap = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  accent: 'bg-accent text-white hover:bg-accent/90',
  gray: 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white',
};

const IconButton: FC<IconButtonProps> = ({ icon, size = 'md', color = 'gray', ariaLabel, className = '', ...props }) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center rounded-full shadow-card transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${sizeMap[size]} ${colorMap[color]} ${className}`}
    aria-label={ariaLabel}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton; 