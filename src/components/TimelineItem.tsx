import { type FC } from 'react';

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  active?: boolean;
  icon?: React.ReactNode;
}

const TimelineItem: FC<TimelineItemProps> = ({ year, title, subtitle, description, image, active = false, icon }) => (
  <div className="flex items-start gap-6 relative group">
    <div className="flex flex-col items-center">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${active ? 'bg-primary border-primary' : 'bg-white border-gray-300'} transition-all duration-300`}>
        {icon || <span className={`block w-2 h-2 rounded-full ${active ? 'bg-white' : 'bg-primary'}`}></span>}
      </div>
      <div className="w-px flex-1 bg-gray-200 mt-1" />
    </div>
    <div className="pb-8 w-full">
      <div className="text-xs text-gray-400 mb-1">{year}</div>
      <div className="font-heading text-lg text-gray-900 mb-1 font-bold">{title}</div>
      {subtitle && <div className="text-sm text-primary font-semibold mb-1">{subtitle}</div>}
      {image && (
        <div className="my-3">
          <img src={image} alt={title} className="rounded-lg shadow-md max-w-full h-auto" />
        </div>
      )}
      {description && <div className="prose prose-sm text-gray-700 bg-yellow-50 rounded-lg p-4 shadow-sm mt-2">{description}</div>}
    </div>
  </div>
);

export default TimelineItem; 