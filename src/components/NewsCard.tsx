import Card from './Card';
import { useRef, useState } from 'react';

interface NewsCardProps {
  image?: string;
  title: string;
  date: string;
  description: string;
  onClick?: () => void;
}

const COLLAPSED = 'max-h-[400px]';
const EXPANDED = 'max-h-[900px]';

const NewsCard = ({ image, title, date, description, onClick }: NewsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setExpanded(false);
    }, 500);
  };

  return (
    <Card
      className="w-full max-w-[480px] min-h-[400px] p-0 rounded-2xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
      onClick={onClick}
      ariaLabel={`Открыть новость: ${title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-40 md:h-44 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="bg-primary h-40 md:h-44 w-full" />
      )}
      <div
        className={`p-6 flex flex-col overflow-hidden transition-[max-height] duration-700 ${expanded ? EXPANDED : COLLAPSED}`}
        style={{ minHeight: 0 }}
      >
        <div className="text-gray-400 text-sm mb-2">{date}</div>
        <div className={`font-bold text-primary text-lg mb-1 ${expanded ? '' : 'line-clamp-2'}`}>{title}</div>
        <div className={`text-gray-700 text-base flex-1 ${expanded ? '' : 'line-clamp-3'}`}>{description}</div>
      </div>
    </Card>
  );
};

export default NewsCard; 