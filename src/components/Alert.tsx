import { FC, ReactNode } from 'react';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const typeMap = {
  info: {
    icon: <FaInfoCircle className="text-blue-500" />,
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  success: {
    icon: <FaCheckCircle className="text-green-500" />,
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  warning: {
    icon: <FaExclamationTriangle className="text-yellow-500" />,
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
  },
  error: {
    icon: <FaTimesCircle className="text-red-500" />,
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
  },
};

const Alert: FC<AlertProps> = ({ type = 'info', children, className = '', ariaLabel }) => {
  const t = typeMap[type];
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${t.bg} ${t.text} ${t.border} ${className}`} role="alert" aria-label={ariaLabel}>
      {t.icon}
      <div>{children}</div>
    </div>
  );
};

export default Alert; 