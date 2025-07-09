import type { FC, ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

const SectionTitle: FC<SectionTitleProps> = ({ children, className = '', as = 'h2' }) => {
  const Tag = as;
  return (
    <Tag
      className={`font-heading text-h2 md:text-h1 text-primary mb-6 tracking-tight ${className}`}
    >
      {children}
    </Tag>
  );
};

export default SectionTitle; 