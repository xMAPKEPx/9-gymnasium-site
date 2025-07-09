import { FC } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  className?: string;
  ariaLabel?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, max = 100, color = 'bg-primary', height = 'h-2', className = '', ariaLabel = 'Прогресс' }) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`w-full bg-gray-100 rounded-full ${height} ${className}`} role="progressbar" aria-valuenow={value} aria-valuemax={max} aria-label={ariaLabel}>
      <div className={`rounded-full ${color} ${height} transition-all duration-300`} style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar; 