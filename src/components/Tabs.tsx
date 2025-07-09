import type { FC, ReactNode } from 'react';

interface Tab {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Tabs: FC<TabsProps> = ({ tabs, value, onChange, className = '' }) => (
  <div className={`flex gap-2 ${className}`} role="tablist">
    {tabs.map(tab => (
      <button
        key={tab.value}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${value === tab.value ? 'bg-primary text-white shadow-card' : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'}`}
        role="tab"
        aria-selected={value === tab.value}
        aria-controls={`tab-panel-${tab.value}`}
        tabIndex={value === tab.value ? 0 : -1}
        onClick={() => onChange(tab.value)}
      >
        {tab.icon && <span className="mr-2">{tab.icon}</span>}
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs; 