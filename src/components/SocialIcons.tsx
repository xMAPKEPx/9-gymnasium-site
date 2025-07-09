import type { FC } from 'react';
import { FaTelegram, FaVk, FaEnvelope } from 'react-icons/fa';

interface SocialIconsProps {
  telegram?: string;
  vk?: string;
  email?: string;
  className?: string;
  size?: number;
}

const SocialIcons: FC<SocialIconsProps> = ({ telegram, vk, email, className = '', size = 24 }) => (
  <div className={`flex gap-3 ${className}`} aria-label="Социальные сети">
    {telegram && (
      <a href={telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-primary hover:text-accent transition-colors">
        <FaTelegram size={size} />
      </a>
    )}
    {vk && (
      <a href={vk} target="_blank" rel="noopener noreferrer" aria-label="VK" className="text-primary hover:text-accent transition-colors">
        <FaVk size={size} />
      </a>
    )}
    {email && (
      <a href={`mailto:${email}`} aria-label="Email" className="text-primary hover:text-accent transition-colors">
        <FaEnvelope size={size} />
      </a>
    )}
  </div>
);

export default SocialIcons; 