type ResourceLinkProps = {
  href: string;
  children: React.ReactNode;
};

const ResourceLink = ({ href, children }: ResourceLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-24 h-12 border rounded-full flex items-center justify-center transition-transform shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer text-inherit no-underline"
    >
      {children}
    </a>
  );
};

export default ResourceLink; 