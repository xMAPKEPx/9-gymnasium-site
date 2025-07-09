import { FC } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
  status?: 'online' | 'offline';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-base',
  md: 'w-12 h-12 text-lg',
  lg: 'w-20 h-20 text-2xl',
};

const Avatar: FC<AvatarProps> = ({ src, alt, size = 'md', fallback, status, className = '' }) => (
  <div className={`relative inline-block rounded-full bg-gray-100 overflow-hidden ${sizeMap[size]} ${className}`}
    aria-label={alt}
    role="img"
  >
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    ) : (
      <span className="flex items-center justify-center w-full h-full text-gray-400 font-bold uppercase">{fallback || alt[0]}</span>
    )}
    {status && (
      <span className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
    )}
  </div>
);

export default Avatar; 