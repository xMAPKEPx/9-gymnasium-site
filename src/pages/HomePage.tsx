import NewsCard from '../components/NewsCard';
import ProductCard from '../components/ProductCard';
import ResourceLink from '../components/ResourceLink';
import PartnerCard from '../components/PartnerCard';
import ContactForm from '../components/ContactForm';
import Carousel from '../components/Carousel';
import AuthModal from '../components/AuthModal';
import FeedbackModal from '../components/FeedbackModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const navigate = useNavigate();

  // Здесь будет запрос к Strapi, пока используем заглушки
  const news = [
    { id: 1, title: 'Новость 1' },
    { id: 2, title: 'Новость 2' },
    { id: 3, title: 'Новость 3' },
    { id: 4, title: 'Новость 1' },
    { id: 5, title: 'Новость 2' },
    { id: 6, title: 'Новость 3' },
    { id: 7, title: 'Новость 1' },
    { id: 8, title: 'Новость 2' },
    { id: 9, title: 'Новость 3' },
    { id: 10, title: 'Новость 1' },
    { id: 11, title: 'Новость 2' },
    { id: 12, title: 'Новость 3' },
  ];

  const products = [
    { id: 1, title: 'Книга' },
    { id: 2, title: 'Значок' },
  ];

  const partners = [
    { id: 1, name: 'Иванов Иван', position: 'Директор', avatarUrl: '' },
    { id: 2, name: 'Петров Пётр', position: 'Заместитель', avatarUrl: '' },
    { id: 3, name: 'Сидорова Анна', position: 'Куратор', avatarUrl: '' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Навигационные кнопки */}
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="flex gap-4">
          <button className="rounded-lg border px-6 py-4 text-lg font-medium hover:bg-gray-100" onClick={() => navigate('/timeline')}>Лента времени</button>
          <button className="rounded-lg border px-6 py-4 text-lg font-medium hover:bg-gray-100" onClick={() => navigate('/people')}>Люди девятки</button>
        </div>
        <button className="rounded-lg border px-6 py-4 text-lg font-medium w-80 hover:bg-gray-100" onClick={() => navigate('/association')}>Ассоциация выпускников и эндаумент-фонд</button>
        <div className="flex gap-4">
          <button className="rounded-lg border px-6 py-4 text-lg font-medium hover:bg-gray-100" onClick={() => setAuthOpen(true)}>Зайти в Девятку</button>
          <button className="rounded-lg border px-6 py-4 text-lg font-medium hover:bg-gray-100" onClick={() => setFeedbackOpen(true)}>Поделись своим воспоминанием</button>
        </div>
      </div>

      {/* Новости и анонсы */}
      <div className="px-4 md:px-0 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-semibold mb-4">Новости и анонсы мероприятий</h2>
        <Carousel itemsToShow={3}>
          {news.map((item) => (
            <NewsCard key={item.id} title={item.title} />
          ))}
        </Carousel>
      </div>

      {/* Взнос и подарок */}
      <div className="px-4 md:px-0 max-w-2xl mx-auto w-full mb-8">
        <h2 className="text-lg font-semibold mb-2">Сделай взнос в эндаумент и получи подарок</h2>
        <Carousel itemsToShow={5}>
          {products.map((item) => (
            <ProductCard key={item.id} title={item.title} />
          ))}
        </Carousel>
      </div>

      {/* Наши ресурсы */}
      <div className="px-4 md:px-0 max-w-2xl mx-auto w-full mb-8">
        <h2 className="text-lg font-semibold mb-2">Наши ресурсы</h2>
        <div className="flex gap-4 mb-4">
          <ResourceLink href="#">Телеграм</ResourceLink>
          <ResourceLink href="#">Сайт школы</ResourceLink>
          <ResourceLink href="#">Сайт школы</ResourceLink>
        </div>
      </div>

      {/* Партнеры */}
      <div className="px-4 md:px-0 max-w-2xl mx-auto w-full mb-8">
        <h2 className="text-lg font-semibold mb-2">Партнеры</h2>
        <Carousel itemsToShow={5}>
          {partners.map((p) => (
            <PartnerCard key={p.id} name={p.name} position={p.position} avatarUrl={p.avatarUrl} />
          ))}
        </Carousel>
      </div>

      {/* Контакты */}
      <div className="px-4 md:px-0 max-w-2xl mx-auto w-full mb-8 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Контакты</h2>
        <ContactForm />
      </div>

      {/* Подвал */}
      <footer className="w-full border-t py-4 text-center text-sm text-gray-500 mt-auto">
        Подвал сайта<br />
        Политика и страница
      </footer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
};

export default HomePage; 