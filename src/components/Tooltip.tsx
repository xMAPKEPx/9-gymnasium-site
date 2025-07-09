import { type FC, type ReactNode, useState } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const posMap = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const Tooltip: FC<TooltipProps> = ({ content, children, position = 'top', className = '' }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span
          className={`absolute z-20 px-3 py-1 rounded-lg bg-gray-900 text-white text-xs shadow-card pointer-events-none whitespace-nowrap ${posMap[position]} ${className}`}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip; 