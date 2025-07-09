import type { FC, ReactNode } from 'react';
import Button from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const EmptyState: FC<EmptyStateProps> = ({ icon, title, description, buttonText, onButtonClick, className = '' }) => (
  <div className={`flex flex-col items-center justify-center text-center py-12 ${className}`} role="status" aria-label={title}>
    {icon && <div className="mb-4 text-5xl text-gray-300">{icon}</div>}
    <div className="font-heading text-lg text-gray-900 mb-2">{title}</div>
    {description && <div className="text-gray-500 mb-4">{description}</div>}
    {buttonText && <Button variant="primary" onClick={onButtonClick}>{buttonText}</Button>}
  </div>
);

export default EmptyState; 