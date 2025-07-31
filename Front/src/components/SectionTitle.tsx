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
      className={`heading-gradient font-bold text-3xl md:text-4xl text-center ${className}`}
    >
      {children}
    </Tag>
  );
};

export default SectionTitle; 