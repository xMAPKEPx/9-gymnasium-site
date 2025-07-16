import type { FC, ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ children, className, ariaLabel, onClick, ...props }) => (
  <div
    className={clsx('bg-white rounded-2xl shadow-lg border border-gray-200', className)}
    aria-label={ariaLabel}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

export default Card; 