import Header from '../components/Header';
import Carousel from '../components/Carousel';
import PartnerCard from '../components/PartnerCard';
import ContactForm from '../components/ContactForm';
import FeedbackModal from '../components/FeedbackModal';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import Button from '../components/Button';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import Avatar from '../components/Avatar';
import Divider from '../components/Divider';
import {
  TimelineIcon,
  GiftIcon,
  PeopleIcon,
  SiteIcon,
  DonateIcon,
  OpenDoorIcon,
  CameraIcon,
  MapIcon,
  TelegramIcon
} from '../icons/AllIcons';
import GiftCard from '../components/GiftCard';
import VisitForm from '../components/VisitForm';
import { getHomePage } from '../api/api';
import { getImageUrl } from '../utils';
import type { HomePageData, NewsItem } from '../types/homepage';

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getHomePage()
      .then((res) => {
        setData(res as HomePageData);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!data) return null;

  const partners = data.Partners || [];
  const gifts = data.Gifts || [];
  const resources = data.Resources || [];
  const news = [
    { id: 1, image: '', title: 'Олимпиада по математике – 5 призеров!', date: '4 июня 2025', description: 'Наши ученики заняли призовые места на городской олимпиаде.' },
    { id: 2, image: '', title: 'Выпускной 2024 – фототчет', date: '4 июня 2025', description: 'Яркие моменты торжественного выпускного вечера.' },
    { id: 3, image: '', title: 'Набор в театральную студию', date: '4 июня 2025', description: 'Приглашаем учеников 5–11 классов в новую театральную студию.' },
    { id: 1, image: '', title: 'Олимпиада по математике – 5 призеров!', date: '4 июня 2025', description: 'Наши ученики заняли призовые места на городской олимпиаде.' },
    { id: 2, image: '', title: 'Выпускной 2024 – фототчет', date: '4 июня 2025', description: 'Яркие моменты торжественного выпускного вечера.' },
    { id: 3, image: '', title: 'Набор в театральную студию', date: '4 июня 2025', description: 'Приглашаем учеников 5–11 классов в новую театральную студию.вввввввввв ы  вы выывввввввы вывыыыыыыыыы вывввввввввввввввввввввл д лл д лл лвлвддвд дж ж жжэ эвэ ввы овылл овылво  вдывлд ылвж дыж двыжэдв эыждв эыжв эыжв эыжвэ жывэ жыэвжэ' },
  ];
  const timelineEvents = [
    { year: '1990', text: 'Основание гимназии' },
    { year: '2000', text: 'Первые медалисты' },
    { year: '2010', text: 'Новый корпус' },
    { year: '2020', text: 'Онлайн обучение' },
  ];

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full px-[13rem]">
        {/* Верхний блок: Лента времени, Фото, Люди Девятки */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          {/* Лента времени */}
          <div className="bg-white rounded-2xl shadow flex flex-col min-h-[348px] h-full overflow-hidden">
            {/* Верхняя часть */}
            <div className="bg-gradient-to-r from-[#1A56DB] to-[#4F8DFD] p-6 flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-2xl mb-1">Лента Времени</div>
                <div className="text-white/90 text-base font-normal">100 лет традиций и достижений</div>
              </div>
              <div className="opacity-20">
                {/* Иконка timeline */}
                <TimelineIcon />
              </div>
            </div>
            {/* Разделитель */}
            <Divider color="bg-white" thickness="h-1" className="!m-0" />
            {/* Таймлайн */}
            <div className="flex-1 p-6 pt-4 flex flex-col justify-between">
              <ol className="relative border-l-2 border-[#1A3E8A]/20 pl-6 mb-4">
                {timelineEvents.slice(0,2).map(item => (
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
              <Button 
                variant="primary"
                size="md"
                className="w-full rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#4F8DFD] border-0 shadow-none"
                type="button"
                onClick={() => {navigate('/timeline')}}
              >
                Все события
              </Button>
            </div>
          </div>
          {/* Люди Девятки */}
          <div className="bg-white rounded-2xl shadow flex flex-col min-h-[348px] h-full overflow-hidden">
            {/* Верхняя часть */}
            <div className="bg-gradient-to-r from-[#FFD600] to-[#FFB800] p-6 flex items-center justify-between">
              <div>
                <div className="text-[#1A3E8A] font-bold text-2xl mb-1">Люди Девятки</div>
                <div className="text-[#1A3E8A]/80 text-base font-normal">Наше дружное сообщество</div>
              </div>
              <div className="opacity-20">
                {/* Иконка люди */}
                <PeopleIcon />
              </div>
            </div>
            {/* Разделитель */}
            <Divider color="bg-white" thickness="h-1" className="!m-0" />
            {/* Аватары */}
            <div className="flex-1 p-6 pt-4 flex flex-col justify-between">
              <div className="flex justify-around items-end mb-6 gap-2">
                <div className="flex flex-col items-center">
                  <Avatar size="lg" alt="Ирина Петровна" className="bg-[#1A3E8A]" />
                  <div className="font-bold text-[#1A3E8A] mt-2">Ирина Петровна</div>
                  <div className="text-gray-500 text-sm">Учитель математики</div>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar size="lg" alt="Алексей Смирнов" className="bg-[#1A3E8A]" />
                  <div className="font-bold text-[#1A3E8A] mt-2">Алексей Смирнов</div>
                  <div className="text-gray-500 text-sm">Ученик 11А класса</div>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar size="lg" alt="Мария Иванова" className="bg-[#1A3E8A]" />
                  <div className="font-bold text-[#1A3E8A] mt-2">Мария Иванова</div>
                  <div className="text-gray-500 text-sm">Выпуск 2015</div>
                </div>
              </div>
              <Button 
                variant="accent"
                size="md"
                className="w-full rounded-xl bg-gradient-to-r from-[#FFD600] to-[#FFB800] text-[#1A3E8A] border-0 shadow-none"
                type="button"
                onClick={() => {navigate('/people')}}
              >
                Подробнее
              </Button>
            </div>
          </div>
        </section>
        {/* Баннер */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-[#1A56DB] to-[#223F93] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between min-h-[220px]">
            {/* Левая часть: текст и кнопка */}
            <div className="flex-1 flex flex-col items-start justify-center">
              <div className="font-bold text-3xl md:text-4xl text-white mb-4">Эндаумент-фонд гимназии</div>
              <div className="text-white text-lg mb-8">Поддержи будущее гимназии! 15+ проектов реализовано</div>
              <Button
                variant="accent"
                size="md"
                className="rounded-xl font-bold px-8 py-3 text-lg mt-2"
                onClick={() => {navigate('/association')}}
                type="button"
              >
                Узнать больше
              </Button>
            </div>
            {/* Правая часть: иконка */}
            <div className="flex-1 flex items-center justify-end h-full">
              <DonateIcon className='w-24 h-24' />
            </div>
          </div>
        </section>
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Карточка 1 */}
            <div className="bg-[#F2F7FF] rounded-2xl p-8 flex flex-col items-center text-center shadow">
              <OpenDoorIcon className="w-20 h-20" />
              <div className="font-bold text-xl text-[#223F93] mb-2">Зайти Девятку</div>
              <div className="text-gray-500 mb-6">Экскурсии для выпускников по предварительной записи</div>
              <Button
                variant="primary"
                size="lg"
                className="w-full rounded-xl text-base font-medium"
                type="button"
                onClick={() => setVisitModalOpen(true)}
              >
                Записаться на визит
              </Button>
            </div>
            {/* Карточка 2 */}
            <div className="bg-[#FFFBE7] rounded-2xl p-8 flex flex-col items-center text-center shadow">
              <CameraIcon className="w-20 h-20" />
              <div className="font-bold text-xl text-[#223F93] mb-2">Поделись воспоминанием</div>
              <div className="text-gray-500 mb-6">Пришли фото и историю из школьного архива!</div>
              <Button
                variant="accent"
                size="lg"
                className="w-full rounded-xl text-base font-medium text-[#1A3E8A]"
                type="button"
                onClick={() => setFeedbackModalOpen(true)}
              >
                Отправить
              </Button>
            </div>
          </div>
        </section>
        {/* Новости */}
        <section className="mb-8">
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
                onClick={() => { setSelectedNews(item as NewsItem); setModalOpen(true); }}
              />
          ))}
        </Carousel>
        </section>
        {/* Подарки */}
        <section className="flex flex-col items-center mb-8">
          <div className="w-full bg-white rounded-3xl shadow-lg px-4 md:px-12 py-10 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-10">
              <span className="font-bold text-2xl md:text-4xl text-[#1A3E8A]">Сделай взнос в Эндаумент и получи подарок</span>
              <GiftIcon className="w-8 h-8 text-[#EAB308]" />
            </div>
            <Carousel itemsToShow={2} gap={32} className="flex flex-row justify-center items-center w-full max-w-3xl">
              {gifts.map(gift => (
                <GiftCard
                  key={gift.id}
                  image={getImageUrl(gift.Photo?.formats?.thumbnail?.url || gift.Photo?.url || '') || ''}
                  title={gift.Name}
                  description=""
                />
              ))}
            </Carousel>
            <div className="text-gray-400 text-lg mt-8 text-center">При взносе от 5000₽</div>
          </div>
        </section>
        {/* Партнеры */}
        <section className="mb-8">
          <div className="w-full bg-white rounded-3xl shadow-lg px-4 md:px-12 py-10 flex flex-col items-center">
            <h2 className="font-bold text-3xl md:text-4xl text-[#1A3E8A] mb-10 text-center">Партнеры</h2>
            <Carousel itemsToShow={5} gap={32} className="flex flex-row justify-center items-center w-full max-w-7xl">
              {partners.map(partner => (
                <PartnerCard
                  key={partner.id}
                  logo={getImageUrl(partner.Logo?.formats?.thumbnail?.url || partner.Logo?.url || '') || ''}
                  name={partner.Name}
                  description={partner.Description}
                  link={partner.Link}
                />
              ))}
            </Carousel>
          </div>
        </section>
        {/* Ресурсы */}
        <section className="mb-8">
          <h2 className="font-bold text-3xl md:text-4xl text-[#1A3E8A] mb-10 text-center">Наши ресурсы</h2>
          {resources.length <= 5 ? (
            <div className="flex flex-row justify-center items-center gap-8 w-full">
              {resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                  tabIndex={0}
                  style={{ flex: `1 1 ${100 / resources.length}%`, maxWidth: 180 }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-[#DBEAFE] flex items-center justify-center mb-2 transition-transform group-hover:scale-105">
                    {res.Title.includes('Telegram')? (
                      <TelegramIcon className="w-10 h-10" />
                    ): 
                    (<SiteIcon className="w-10 h-10" />)}
                  </div>
                  <div className="text-[#1E3A8A] text-lg font-medium text-center group-hover:underline">{res.Title}</div>
                </a>
              ))}
            </div>
          ) : (
            <Carousel itemsToShow={5} gap={32} className="flex flex-row justify-center items-center w-full max-w-7xl">
              {resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                  tabIndex={0}
                >
                  <div className="w-20 h-20 rounded-2xl bg-[#DBEAFE] flex items-center justify-center mb-2 transition-transform group-hover:scale-105">
                    {res.Title.includes('Telegram')? (
                      <TelegramIcon className="w-10 h-10" />
                    ): 
                    (<SiteIcon className="w-10 h-10" />)}
                    
                  </div>
                  <div className="text-[#1E3A8A] text-lg font-medium text-center group-hover:underline">{res.Title}</div>
                </a>
              ))}
            </Carousel>
          )}
        </section>
        {/* Контакты */}
        <section className="w-full bg-[#F2F7FF] py-12 px-[13rem]">
          <h2 className="text-3xl font-bold text-center text-[#1A3E8A] mb-10">Контакты</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {/* Левая карточка */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">
              <div className="text-2xl font-bold text-[#1A3E8A] mb-6">Гимназия <span className='font-extrabold'>№9</span></div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-center text-base text-gray-900 gap-3">
                  <FaMapMarkerAlt className="text-[#F59E1B] text-xl" />
                  ул. Академическая, 9
                </li>
                <li className="flex items-center text-base text-gray-900 gap-3">
                  <FaPhoneAlt className="text-[#F59E1B] text-xl" />
                  +7 (XXX) XXX-XX-XX
                </li>
                <li className="flex items-center text-base text-gray-900 gap-3">
                  <FaEnvelope className="text-[#F59E1B] text-xl" />
                  gym9@edu.ru
                </li>
                <li className="flex items-center text-base text-gray-900 gap-3">
                  <FaClock className="text-[#F59E1B] text-xl" />
                  Пн-Пт 8:00-18:00
                </li>
              </ul>
              <div className="bg-[#F6F8FB] rounded-xl p-5 mt-auto">
                <div className="font-bold text-[#1A3E8A] mb-3">Схема проезда</div>
                <div className="flex items-center justify-center bg-[#1A3E8A] rounded-xl h-48 md:h-56">
                  {/* Здесь может быть карта или иконка */}
                  <MapIcon className="w-12 h-12" />
                </div>
              </div>
            </div>
            {/* Правая карточка */}
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">
              <div className="text-2xl font-bold text-[#1A3E8A] mb-6">Напишите нам</div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {/* Модальное окно новости */}
      <NewsModal open={modalOpen} onClose={() => setModalOpen(false)} news={selectedNews} />

      {/* Модальные окна */}
      {visitModalOpen && (
        <VisitForm open={visitModalOpen} onClose={() => setVisitModalOpen(false)} />
      )}
      {feedbackModalOpen && (
        <FeedbackModal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage; 