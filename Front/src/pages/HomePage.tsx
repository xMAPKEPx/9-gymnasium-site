import Header from '../components/Header';
import Carousel from '../components/Carousel';
import PartnerCard from '../components/PartnerCard';
import ContactForm from '../components/ContactForm';
import FeedbackModal from '../components/FeedbackModal';
import Footer from '../components/Footer';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import NewsCard from '../components/NewsCard';
import {
  TimelineIcon,
  GiftIcon,
  PeopleIcon,
  SiteIcon,
  DonateIcon,
  MapIcon,
  TelegramIcon
} from '../icons/AllIcons';
import GiftCard from '../components/GiftCard';
import VisitForm from '../components/VisitForm';
import { getHomePage, getAllNews } from '../api/api';
import { getImageUrl } from '../utils';
import type { HomePageData } from '../types/homepage';
import type { NewsItem } from '../types/news';

const HomePage = () => {
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [data, setData] = useState<HomePageData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeData, newsData] = await Promise.all([
          getHomePage(),
          getAllNews()
        ]);
        setData(homeData);
        setNews(newsData || []); // Показываем только первые 3 новости
        setLoading(false);
      } catch {
        setError('Ошибка загрузки данных');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const partners = useMemo(() => data?.Partners || [], [data]);
  const gifts = useMemo(() => data?.Gifts || [], [data]);
  const resources = useMemo(() => data?.Resources || [], [data]);

  const handleNewsClick = useCallback((item: NewsItem) => {
    navigate(`/news/${item.documentId}`);
  }, [navigate]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full mx-auto px-4 md:px-12 py-12 flex flex-col">
        {/* Верхний блок: Лента времени, Люди Девятки, Баннер */}
        <section className="flex flex-col gap-8 pb-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Лента времени */}
            <div style={{ background: 'var(--gradient-primary)' }}
              className="rounded-2xl shadow flex 
              flex-col min-h-[220px] h-full px-10 py-10 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => {navigate('/timeline')}}
            >
              {/* Верхняя часть */}
              <div className="flex items-center justify-between">
                <div className="flex-2 flex flex-col items-start justify-center">
                  <div className="font-bold text-3xl md:text-4xl text-white mb-4">Лента Времени</div>
                  <div className="text-white text-lg mb-8">100 лет традиций и достижений</div>
                </div>
                <div className="flex-1 flex items-center justify-end h-full opacity-20">
                  {/* Иконка timeline */}
                  <TimelineIcon className='w-24 h-24' />
                </div>
              </div>
            </div>
            {/* Люди Девятки */}
            <div style={{ background: 'var(--gradient-accent)' }}
              className="rounded-2xl shadow flex 
              flex-col min-h-[220px] px-10 py-10 h-full overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => {navigate('/people')}}
            >
              {/* Верхняя часть */}
              <div className="flex items-center justify-between">
                <div className="flex-2 flex flex-col items-start justify-center">
                  <div className="font-bold text-3xl md:text-4xl text-white mb-4">Люди Девятки</div>
                  <div className="text-white text-lg mb-8">Наше дружное сообщество</div>
                </div>
                <div className="flex-1 flex items-center justify-end h-full opacity-20">
                  {/* Иконка люди */}
                  <PeopleIcon className='w-24 h-24' />
                </div>
              </div>
            </div>
          </div>
          {/* Баннер */}
          <div style={{ background: 'var(--gradient-primary)' }}
            className="rounded-2xl px-10 py-10 flex 
            flex-col md:flex-row items-center justify-between min-h-[220px] cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => {navigate('/association')}}
          >
            {/* Левая часть: текст и кнопка */}
            <div className="flex-1 flex flex-col items-start justify-center">
              <div className="font-bold text-3xl md:text-4xl text-white mb-4">Эндаумент-фонд гимназии</div>
              <div className="text-white text-lg mb-8">Поддержи будущее гимназии! 15+ проектов реализовано</div>
            </div>
            {/* Правая часть: иконка */}
            <div className="flex-1 flex items-center justify-end h-full">
              <DonateIcon className='w-24 h-24' />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Карточка 1 */}
            <div style={{ background: 'var(--gradient-primary)' }}
                className="rounded-2xl px-10 py-10 flex 
                flex-col md:flex-row items-center justify-between min-h-[220px] cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setVisitModalOpen(true)}>
              <div className="flex-2 flex flex-col items-start justify-center text-start">
                <div className="font-bold text-3xl md:text-4xl text-white mb-4">Зайти Девятку</div>
                <div className="text-white text-lg mb-8">Экскурсии для выпускников по предварительной записи</div>
              </div>
              <div className="flex-1 flex items-center justify-end h-full opacity-20">
                <img src="/img/icons/icon-openDoor.svg" alt="Открытая дверь" className="w-20 h-20" />
              </div>
            </div>
            {/* Карточка 2 */}
            <div style={{ background: 'var(--gradient-accent)' }}
                className="rounded-2xl px-10 py-10 flex 
                flex-col md:flex-row items-center justify-between min-h-[220px] cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setFeedbackModalOpen(true)}>
              <div className="flex-2 flex flex-col items-start justify-center text-start">
                <div className="font-bold text-3xl md:text-4xl text-white mb-4">Поделись воспоминанием</div>
                <div className="text-white text-lg mb-8">Пришли фото и историю из школьного архива!</div>
              </div>
              <div className="flex-1 flex items-center justify-end h-full opacity-20">
                <img src="/img/icons/icon-camera.svg" alt="Камера" className="w-20 h-20" />
              </div>
            </div>
          </div>
        </section>
        {/* Новости */}
        <section className="mb-8">
          <div className="w-full bg-white rounded-3xl shadow-lg px-4 md:px-12 py-10 flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6">
              <h2 className="text-3xl md:text-4xl font-bold heading-gradient text-center w-full">Новости и анонсы мероприятий</h2>
              
            </div>
            <Carousel itemsToShow={3}>
              {news.map((item) => (
                <NewsCard
                  key={item.id}
                  image={getImageUrl(item.Content_img?.[0]?.formats?.medium?.url || item.Content_img?.[0]?.url || item.Content_img?.[0]?.formats?.thumbnail?.url) || ''}
                  title={item.Title}
                  date={item.Date || item.publishedAt || ''}
                  description={item.Content}
                  onClick={() => handleNewsClick(item)}
                />
              ))}
            </Carousel>
          </div>
        </section>
        {/* Подарки */}
        <section className="flex flex-col items-center mb-8">
          <div className="w-full bg-white rounded-3xl shadow-lg px-4 md:px-12 py-10 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-10">
              <span className="font-bold text-2xl md:text-4xl heading-gradient">Сделай взнос в Эндаумент и получи подарок</span>
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
          </div>
        </section>
        {/* Ресурсы */}
        <section className="mb-8">
          <div className="w-full bg-white rounded-3xl shadow-lg px-4 md:px-12 py-10 flex flex-col items-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-10 text-center heading-gradient">Наши ресурсы</h2>
            {resources.length <= 5 ? (
              <div className="flex flex-row justify-center items-center gap-8 w-full">
                {resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group bg-white rounded-2xl p-4"
                    tabIndex={0}
                    style={{ flex: `1 1 ${100 / resources.length}%`, maxWidth: 180 }}
                  >
                    <div className="w-20 h-20 rounded-2xl shadow-2xl bg-[#E6F6F1] flex items-center justify-center mb-2 transition-transform group-hover:scale-105">
                      {res.Title.includes('Telegram')? (
                        <TelegramIcon className="w-10 h-10" />
                      ): 
                      (<SiteIcon className="w-10 h-10" />)}
                    </div>
                    <div className="text-[var(--color-text)] text-lg font-medium text-center group-hover:underline">{res.Title}</div>
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
                    <div className="w-20 h-20 rounded-2xl bg-[#E6F6F1] flex items-center justify-center mb-2 transition-transform group-hover:scale-105">
                      {res.Title.includes('Telegram')? (
                        <TelegramIcon className="w-10 h-10" />
                      ): 
                      (<SiteIcon className="w-10 h-10" />)}
                      
                    </div>
                    <div className="text-[var(--color-text)] text-lg font-medium text-center group-hover:underline">{res.Title}</div>
                  </a>
                ))}
              </Carousel>
            )}
          </div>
        </section>
        {/* Партнеры */}
        <section className="mb-8">
          <div className="w-full bg-white rounded-3xl shadow-lg px-4 md:px-12 py-10 flex flex-col items-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-10 text-center heading-gradient">Партнеры</h2>
            
            {partners.length <= 5 ? (
              <div className="flex flex-row justify-center items-center gap-8 w-full">
                {partners.map(partner => (
                  <PartnerCard
                  key={partner.id}
                  logo={getImageUrl(partner.Logo?.formats?.thumbnail?.url || partner.Logo?.url || '') || ''}
                  name={partner.Name}
                  description={partner.Description}
                  link={partner.Link}
                />
                ))}
              </div>
            ) : (
              <Carousel itemsToShow={5} gap={32} className="flex flex-row justify-center items-center w-full max-w-7xl p-8">
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
            )}
          </div>
        </section>
        
        {/* Контакты */}
        <section className="w-full bg-[#F2F7FF] py-12 px-[13rem] shadow-2xl rounded-3xl">
          <h2 className="text-3xl font-bold text-center heading-gradient mb-10">Контакты</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {/* Левая карточка */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[var(--color-border)] p-8 flex flex-col">
              <div className="text-2xl font-bold text-[var(--color-text)] mb-6">Гимназия <span className='font-extrabold'>№9</span></div>
              <ul className="mb-8 space-y-4">
                <li className="flex items-center text-base text-[var(--color-text)] gap-3">
                  <FaMapMarkerAlt className="text-[#F59E1B]" />
                  ул. Академическая, 9
                </li>
                <li className="flex items-center text-base text-[var(--color-text)] gap-3">
                  <FaPhoneAlt className="text-[#F59E1B]" />
                  +7 (XXX) XXX-XX-XX
                </li>
                <li className="flex items-center text-base text-[var(--color-text)] gap-3">
                  <FaEnvelope className="text-[#F59E1B]" />
                  gym9@edu.ru
                </li>
                <li className="flex items-center text-base text-[var(--color-text)] gap-3">
                  <FaClock className="text-[#F59E1B]" />
                  Пн-Пт 8:00-18:00
                </li>
              </ul>
              <div className="bg-[#F6F8FB] rounded-xl p-5 mt-auto">
                <div className="font-bold heading-gradient mb-3">Схема проезда</div>
                <div style={{ background: 'var(--gradient-accent)' }}
                    className="flex items-center justify-center rounded-xl h-48 md:h-56">
                  {/* Здесь может быть карта или иконка */}
                  <MapIcon className="w-12 h-12" />
                </div>
              </div>
            </div>
            {/* Правая карточка */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[var(--color-border)] p-8 flex flex-col">
              <div className="text-2xl font-bold text-[var(--color-text)] mb-6">Напишите нам</div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
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