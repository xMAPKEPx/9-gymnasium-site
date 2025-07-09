import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import TimelineItem from '../components/TimelineItem';
import Tabs from '../components/Tabs';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import { useState } from 'react';

const timelineEvents = [
  { year: '2024', title: 'Юбилей школы', description: 'Проведён большой праздник, посвящённый 50-летию гимназии.' },
  { year: '2022', title: 'Открытие нового корпуса', description: 'Запущен современный учебный корпус с лабораториями.' },
  { year: '2020', title: 'Победа на олимпиаде', description: 'Команда школы заняла 1 место на городской олимпиаде.' },
  { year: '2018', title: 'Запуск эндаумент-фонда', description: 'Создан фонд поддержки талантливых учеников.' },
  { year: '2015', title: 'Выпуск первого набора', description: 'Выпущен первый набор профильных классов.' },
];

const tabs = [
  { label: 'Все события', value: 'all' },
  { label: 'Юбилеи', value: 'jubilee' },
  { label: 'Победы', value: 'victory' },
];

const TimelinePage = () => {
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const filtered = timelineEvents.filter(e => tab === 'all' || e.title.includes(tabs.find(t => t.value === tab)?.label || ''));
  const pageCount = Math.ceil(filtered.length / pageSize);
  const eventsToShow = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-gray-900">
      <Header />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
        <SectionTitle as="h1" className="mb-8">Лента времени</SectionTitle>
        <Tabs tabs={tabs} value={tab} onChange={setTab} className="mb-8" />
        <div className="relative pl-8 border-l-2 border-gray-200">
          {eventsToShow.map((event, i) => (
            <TimelineItem
              key={event.year + event.title}
              year={event.year}
              title={event.title}
              description={event.description}
              active={i === 0 && page === 1}
            />
          ))}
        </div>
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} className="mt-8" />
      </main>
      <Footer />
    </div>
  );
};

export default TimelinePage; 