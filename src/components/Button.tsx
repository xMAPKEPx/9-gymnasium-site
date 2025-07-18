import type { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'md' | 'lg' | '';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaLabel?: string;
}

const Button: FC<ButtonProps> = ({
  children, variant = 'primary', size = 'md', leftIcon, rightIcon, ariaLabel, className, ...props
}) => {
  let variantClass = '';
  if (variant === 'primary') variantClass = 'border-2 border-[var(--color-primary)] bg-[var(--color-primary)] text-white font-medium text-lg rounded-lg px-8 py-3 hover:bg-transparent hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition-colors';
  if (variant === 'accent') variantClass = 'bg-[var(--color-accent)] text-white font-medium text-lg rounded-lg px-8 py-3 transition-colors hover:bg-[var(--color-primary)]';
  if (variant === 'secondary') variantClass = 'border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] bg-transparent rounded-lg px-8 py-3 text-lg font-medium transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white';

  let sizeClass = '';
  if (size === 'md') sizeClass = 'px-6 py-3 text-base';
  if (size === 'lg') sizeClass = 'px-8 py-4 text-lg';

  return (
    <button
      className={clsx(
        'rounded-xl font-heading transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary',
        variantClass,
        sizeClass,
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button; 