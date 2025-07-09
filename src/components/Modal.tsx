import { FC, ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

const Modal: FC<ModalProps> = ({ open, onClose, children, ariaLabel }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-card-lg max-w-lg w-full mx-4 p-6 relative animate-fadeIn"
        ref={ref}
        tabIndex={0}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
          aria-label="Закрыть модальное окно"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 