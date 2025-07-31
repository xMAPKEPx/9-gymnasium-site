import type { FC } from 'react';

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
  ariaLabel?: string;
}

const Loader: FC<LoaderProps> = ({ size = 32, color = '#1A56DB', className = '', ariaLabel = 'Загрузка...' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    className={`animate-spin ${className}`}
    aria-label={ariaLabel}
    role="status"
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke={color}
      strokeWidth="5"
      strokeDasharray="31.4 31.4"
      strokeLinecap="round"
    />
  </svg>
);

export default Loader; 