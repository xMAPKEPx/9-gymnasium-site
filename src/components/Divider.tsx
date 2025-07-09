import type { FC } from 'react';

interface DividerProps {
  vertical?: boolean;
  color?: string;
  thickness?: string;
  className?: string;
  ariaLabel?: string;
}

const Divider: FC<DividerProps> = ({ vertical = false, color = 'bg-gray-200', thickness = 'h-px', className = '', ariaLabel }) => (
  vertical ? (
    <div
      className={`w-px ${thickness} ${color} ${className}`}
      role="separator"
      aria-orientation="vertical"
      aria-label={ariaLabel}
    />
  ) : (
    <div
      className={`${thickness} w-full ${color} ${className}`}
      role="separator"
      aria-orientation="horizontal"
      aria-label={ariaLabel}
    />
  )
);

export default Divider; 