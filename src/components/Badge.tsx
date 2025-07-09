import { FC, ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'accent' | 'gray' | 'success' | 'danger';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const colorMap = {
  primary: 'bg-primary text-white',
  accent: 'bg-accent text-white',
  gray: 'bg-gray-100 text-gray-700',
  success: 'bg-green-500 text-white',
  danger: 'bg-red-500 text-white',
};

const sizeMap = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

const Badge: FC<BadgeProps> = ({ children, color = 'primary', size = 'md', icon, className = '', ariaLabel }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full font-medium ${colorMap[color]} ${sizeMap[size]} ${className}`}
    aria-label={ariaLabel}
  >
    {icon}
    {children}
  </span>
);

export default Badge; 