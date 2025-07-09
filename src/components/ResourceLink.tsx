import type { FC, ReactNode } from 'react';

interface ResourceLinkProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
}

const ResourceLink: FC<ResourceLinkProps> = ({ href, children, icon, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300 font-medium shadow-card"
    aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
  >
    {icon}
    {children}
  </a>
);

export default ResourceLink; 