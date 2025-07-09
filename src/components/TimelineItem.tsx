import { type FC, type ReactNode } from 'react';

interface TimelineItemProps {
  year: string;
  title: string;
  description?: string;
  active?: boolean;
  icon?: ReactNode;
}

const TimelineItem: FC<TimelineItemProps> = ({ year, title, description, active = false, icon }) => (
  <div className="flex items-start gap-4 relative group">
    <div className="flex flex-col items-center">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${active ? 'bg-primary border-primary' : 'bg-white border-gray-300'} transition-all duration-300`}> 
        {icon || <span className={`block w-2 h-2 rounded-full ${active ? 'bg-white' : 'bg-primary'}`}></span>}
      </div>
      <div className="w-px flex-1 bg-gray-200 mt-1" />
    </div>
    <div className="pb-8">
      <div className="text-xs text-gray-400 mb-1">{year}</div>
      <div className="font-heading text-base text-gray-900 mb-1">{title}</div>
      {description && <div className="prose prose-sm text-gray-700">{description}</div>}
    </div>
  </div>
);

export default TimelineItem; 