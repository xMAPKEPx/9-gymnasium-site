import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import Tabs from '../components/Tabs';
import PersonCard from '../components/PersonCard';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import SocialIcons from '../components/SocialIcons';
import { useState } from 'react';

const people = [
  {
    id: 1,
    avatarUrl: '/img/ivanov.jpg',
    name: 'Иванов Иван',
    role: 'Директор',
    description: 'Руководит школой с 2010 года. Инициатор многих проектов.',
    social: { telegram: '#', vk: '#', email: 'ivanov@gymnasium.ru' },
  },
  {
    id: 2,
    avatarUrl: '/img/petrov.jpg',
    name: 'Петров Пётр',
    role: 'Заместитель',
    description: 'Отвечает за учебный процесс и инновации.',
    social: { telegram: '#', vk: '#', email: 'petrov@gymnasium.ru' },
  },
  {
    id: 3,
    avatarUrl: '/img/sidorova.jpg',
    name: 'Сидорова Анна',
    role: 'Куратор',
    description: 'Куратор выпускников и координатор ассоциации.',
    social: { telegram: '#', vk: '#', email: 'sidorova@gymnasium.ru' },
  },
  // ...
];

const tabs = [
  { label: 'Все', value: 'all' },
  { label: 'Директора', value: 'director' },
  { label: 'Кураторы', value: 'curator' },
  { label: 'Выпускники', value: 'alumni' },
];

const PeoplePage = () => {
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filtered = people.filter(p => tab === 'all' || p.role.toLowerCase().includes(tab));
  const pageCount = Math.ceil(filtered.length / pageSize);
  const peopleToShow = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-gray-900">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <SectionTitle as="h1" className="mb-8">Люди девятки</SectionTitle>
        <Tabs tabs={tabs} value={tab} onChange={setTab} className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {peopleToShow.map(person => (
            <PersonCard
              key={person.id}
              avatarUrl={person.avatarUrl}
              name={person.name}
              role={person.role}
              description={person.description}
              social={<SocialIcons {...person.social} />}
            />
          ))}
        </div>
        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} className="mt-8" />
      </main>
      <Footer />
    </div>
  );
};

export default PeoplePage; 