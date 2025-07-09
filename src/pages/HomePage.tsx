import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import GiftCard from '../components/GiftCard';
import ResourceLink from '../components/ResourceLink';
// import PartnerCard from '../components/PartnerCard'; // Удалено как неиспользуемый импорт
import ContactForm from '../components/ContactForm';
import FeedbackModal from '../components/FeedbackModal';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDoorOpen, FaCamera, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaMap } from 'react-icons/fa';
import Button from '../components/Button';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';

const news = [
  { id: 1, image: '', title: 'Олимпиада по математике – 5 призеров!', date: '4 июня 2025', description: 'Наши ученики заняли призовые места на городской олимпиаде.' },
  { id: 2, image: '', title: 'Выпускной 2024 – фототчет', date: '4 июня 2025', description: 'Яркие моменты торжественного выпускного вечера.' },
  { id: 3, image: '', title: 'Набор в театральную студию', date: '4 июня 2025', description: 'Приглашаем учеников 5–11 классов в новую театральную студию.' },
  { id: 1, image: '', title: 'Олимпиада по математике – 5 призеров!', date: '4 июня 2025', description: 'Наши ученики заняли призовые места на городской олимпиаде.' },
  { id: 2, image: '', title: 'Выпускной 2024 – фототчет', date: '4 июня 2025', description: 'Яркие моменты торжественного выпускного вечера.' },
  { id: 3, image: '', title: 'Набор в театральную студию', date: '4 июня 2025', description: 'Приглашаем учеников 5–11 классов в новую театральную студию.вввввввввв ы  вы выывввввввы вывыыыыыыыыыы вывввввввввввввввввввввл д лл д лл лвлвддвд дж ж жжэ эвэ ввы овылл овылво  вдывлд ылвж дыж двыжэдв эыждв эыжв эыжв эыжвэ жывэ жыэвжэ' },
];
const products = [
  { id: 1, image: '/img/book.png', title: 'Издание "История гимназии"', price: '', description: 'Эксклюзивное издание к 30-летию гимназии' },
  { id: 2, image: '/img/badge.png', title: 'Фирменный значок выпускника', price: '', description: 'Эксклюзивный дизайн для участников программы' },
];
const partners = [
  { id: 1, name: 'Книжное издательство', logo: '/img/partner1.svg' },
  { id: 2, name: 'Музей истории города', logo: '/img/partner2.svg' },
  { id: 1, name: 'Книжное издательство', logo: '/img/partner1.svg' },
  { id: 2, name: 'Музей истории города', logo: '/img/partner2.svg' },
  { id: 1, name: 'Книжное издательство', logo: '/img/partner1.svg' },
  { id: 2, name: 'Музей истории города', logo: '/img/partner2.svg' },
  { id: 1, name: 'Книжное издательство', logo: '/img/partner1.svg' },
  { id: 2, name: 'Музей истории города', logo: '/img/partner2.svg' },
  { id: 1, name: 'Книжное издательство', logo: '/img/partner1.svg' },
  { id: 2, name: 'Музей истории города', logo: '/img/partner2.svg' },
  { id: 1, name: 'Книжное издательство', logo: '/img/partner1.svg' },
  { id: 2, name: 'Музей истории города', logo: '/img/partner2.svg' },
];

const timelineEvents = [
  { year: '1990', text: 'Основание гимназии' },
  { year: '2000', text: 'Первые медалисты' },
  { year: '2010', text: 'Новый корпус' },
  { year: '2020', text: 'Онлайн обучение' },
];

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<typeof news[0] | null>(null);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        {/* Верхний блок: Лента времени, Фото, Люди Девятки */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8">
          {/* Лента времени */}
          <div className="bg-white rounded-2xl shadow p-8 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="text-[#1A3E8A] font-bold text-2xl mb-6">Лента Времени</div>
              <ol className="relative border-l-2 border-[#1A3E8A]/20 pl-6">
                {timelineEvents.map(item => (
                  <li key={item.year} className="mb-8 last:mb-0 flex items-start relative">
                    <span className="absolute -left-4 flex items-center justify-center w-6 h-6">
                      <span className="w-6 h-6 rounded-full border-4 border-[#FFD600] bg-white flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1A3E8A]" />
                      </span>
                    </span>
                    <div>
                      <div className="font-bold text-[#1A3E8A] text-lg leading-tight">{item.year}</div>
                      <div className="text-gray-600 text-base">{item.text}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <Button 
            variant="primary" 
            size="md" 
            className="mt-6 w-full" 
            type="button"
            onClick={() => {navigate('/timeline')}}>
              Все события
            </Button>
          </div>
          {/* Фото школы */}
          <div className="flex items-center justify-center">
            <img
              src="/img/school-main.png"
              alt="Здание школы"
              className="rounded-2xl object-cover w-full h-[420px] max-h-[420px]"
              style={{ objectPosition: 'center' }}
            />
          </div>
          {/* Люди Девятки */}
          <div className="bg-[#FFFDEB] rounded-2xl shadow p-8 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="text-[#1A3E8A] font-bold text-2xl mb-6">Люди Девятки</div>
              {/* Здесь могут быть аватары/список людей */}
            </div>
            <Button variant="accent" 
            size="md" 
            className="mt-6 w-full text-[#1A3E8A]" 
            type="button"
            onClick={() => {navigate('/people')}}>
              Подробнее
            </Button>
          </div>
        </section>
        {/* Баннер */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <div className="bg-[#223F93] rounded-2xl px-6 py-12 flex flex-col items-center text-center">
            <div className="font-bold text-3xl md:text-4xl text-white mb-4">Ассоциация выпускников и эндаумент-фонд</div>
            <div className="text-lg md:text-2xl text-white mb-8">Поддержи будущее гимназии!</div>
            <div className="w-full max-w-2xl mx-auto mb-8">
              <div className="flex justify-between text-white text-base mb-1">
                <span>Собрано: 3.6 млн ₽</span>
                <span>Цель: 5 млн ₽</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/40 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#1A56DB] to-[#4F8DFD]" style={{ width: '72%' }} />
              </div>
            </div>
            <Button
              variant="accent"
              size="lg"
              className="mt-2 text-[#1A3E8A] font-bold px-10 py-3 shadow"
              onClick={() => {navigate('/association')}}
              type="button"
            >
              Узнать больше
            </Button>
          </div>
        </section>
        {/* Быстрые действия */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Карточка 1 */}
            <div className="bg-[#F2F7FF] rounded-2xl p-8 flex flex-col items-center text-center shadow">
              <FaDoorOpen className="text-[#223F93] text-4xl mb-4" aria-hidden="true" />
              <div className="font-bold text-xl text-[#223F93] mb-2">Посетить Девятку</div>
              <div className="text-gray-500 mb-6">Для выпускников по предварительной записи</div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="button"
                onClick={() => setVisitModalOpen(true)}
              >
                Записаться на визит
              </Button>
        </div>
            {/* Карточка 2 */}
            <div className="bg-[#FFFBE7] rounded-2xl p-8 flex flex-col items-center text-center shadow">
              <FaCamera className="text-[#223F93] text-4xl mb-4" aria-hidden="true" />
              <div className="font-bold text-xl text-[#223F93] mb-2">Поделись своим воспоминанием</div>
              <div className="text-gray-500 mb-6">Пришли фото из школьного архива!</div>
              <Button
                variant="accent"
                size="lg"
                className="w-full text-[#1A3E8A]"
                type="button"
                onClick={() => setFeedbackModalOpen(true)}
              >
                Отправить
              </Button>
        </div>
      </div>
        </section>
        {/* Новости */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Новости и анонсы мероприятий</h2>
            <button
              className="text-primary text-base font-medium flex items-center gap-1 hover:underline"
              onClick={() => navigate('/news')}
              type="button"
            >
              Все новости <span aria-hidden="true">→</span>
            </button>
          </div>
        <Carousel itemsToShow={3}>
            {news.map(item => (
              <NewsCard
                key={item.id}
                image={item.image}
                title={item.title}
                date={item.date}
                description={item.description}
                onClick={() => { setSelectedNews(item); setModalOpen(true); }}
              />
          ))}
        </Carousel>
        </section>
        {/* Подарки */}
        <section className="flex flex-col items-center max-w-7xl mx-auto px-4 mb-8">
          <SectionTitle>Сделай взнос в Эндаумент и получи подарок</SectionTitle>
          <Carousel itemsToShow={2} gap={16} className="flex flex-row justify-center items-center max-w-[650px]">
            {products.map(item => (
              <GiftCard key={item.id} image={item.image} title={item.title} price={item.price} />
            ))}
          </Carousel>
        </section>
        {/* Ресурсы */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <SectionTitle>Наши ресурсы</SectionTitle>
          <div className="flex gap-4 justify-center">
            <ResourceLink href="#" icon={<img src="/img/icon-telegram.svg" alt="Telegram" className="w-6 h-6" />}>Telegram</ResourceLink>
            <ResourceLink href="#" icon={<img src="/img/icon-site.svg" alt="Сайт школы" className="w-6 h-6" />}>Сайт школы</ResourceLink>
          </div>
        </section>
        {/* Партнеры */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <SectionTitle>Партнеры</SectionTitle>
          <Carousel itemsToShow={5} gap={2} className="flex">
            {partners.map((p, idx) => (
              <Card key={idx} className="flex justify-center p-4 text-primary font-medium text-base text-center">
                {p.name}
              </Card>
            ))}
          </Carousel>
        </section>
      {/* Контакты */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-8 mt-4">Контакты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="text-2xl font-bold text-primary mb-4">Гимназия №9</div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-base text-gray-800">
                  <FaMapMarkerAlt className="text-yellow-500 mr-3" />
                  ул. Академическая, 9
                </li>
                <li className="flex items-center text-base text-gray-800">
                  <FaPhoneAlt className="text-yellow-500 mr-3" />
                  +7 (XXX) XXX-XX-XX
                </li>
                <li className="flex items-center text-base text-gray-800">
                  <FaEnvelope className="text-yellow-500 mr-3" />
                  gym9@edu.ru
                </li>
                <li className="flex items-center text-base text-gray-800">
                  <FaClock className="text-yellow-500 mr-3" />
                  Пн-Пт 8:00-18:00
                </li>
              </ul>
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="font-bold text-primary mb-2">Схема проезда</div>
                <div className="flex items-center justify-center bg-primary rounded-lg h-64">
                  <FaMap className="text-white text-4xl" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-2xl font-bold text-primary mb-4">Напишите нам</div>
              <ContactForm />
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      {/* Модальное окно новости */}
      <NewsModal open={modalOpen} onClose={() => setModalOpen(false)} news={selectedNews} />

      {/* Модальные окна */}
      {visitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setVisitModalOpen(false)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-xl relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-2xl" onClick={() => setVisitModalOpen(false)}>&times;</button>
        <ContactForm />
      </div>
        </div>
      )}
      {feedbackModalOpen && (
        <FeedbackModal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage; 