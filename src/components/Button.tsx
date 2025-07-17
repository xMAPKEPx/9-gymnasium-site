import type { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ariaLabel?: string;
}

const Button: FC<ButtonProps> = ({
  children, variant = 'primary', size = 'md', leftIcon, rightIcon, ariaLabel, className, ...props
}) => {
  let variantClass = '';
  if (variant === 'primary') variantClass = 'bg-primary text-white font-medium text-lg rounded-lg px-8 py-3 transition-colors';
  if (variant === 'accent') variantClass = 'bg-accent text-[#20409A] font-medium text-lg rounded-lg px-8 py-3 transition-colors';
  if (variant === 'secondary') variantClass = 'bg-gray-100 text-gray-900';

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