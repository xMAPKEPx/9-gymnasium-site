import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getNews } from '../api/api';
import { formatDate, getImageUrl } from '../utils';
import type { NewsItem } from '../types/news';
import Button from '../components/Button';

const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getNews(id)
      .then((res) => {
        setNews(res || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки новости');
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1 w-full mx-auto px-4 md:px-12 py-12 flex flex-col items-center">
        <div className="w-full flex flex-col items-center justify-center mt-10 mb-6">
            <h1
                className="font-extrabold text-[30px] leading-[40px] mb-1 heading-gradient text-center"
                style={{
                background: 'var(--gradient-heading)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                }}
            >
                Все новости
            </h1>
            <div className="text-[14px] leading-[24px] font-normal text-[var(--color-text)] text-center">
                Актуальные события и анонсы мероприятий гимназии
            </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">Загрузка...</div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[300px] text-red-500">{error}</div>
        ) : news ? (
            <div className="w-full bg-white rounded-3xl p-0 flex flex-col items-center">
                <div className="w-full flex flex-col items-start px-8 py-8">
                    <div className="text-gray-400 text-sm mb-2">
                        {news.Date || news.publishedAt ? formatDate(news.Date || news.publishedAt || '') : ''}
                    </div>
                    <h1 className="font-bold text-3xl md:text-4xl mb-6 heading-gradient">{news.Title}</h1>
                </div>
                <div className="w-full px-8 pb-8">
                    {news.Content_img && news.Content_img[0] && (
                        <img
                        src={getImageUrl(news.Content_img[0]?.formats?.medium?.url || news.Content_img[0]?.url || news.Content_img[0]?.formats?.thumbnail?.url) || ''}
                        alt={news.Title}
                        className="float-right ml-6 mb-4 w-2/5 h-auto object-cover rounded-lg"
                        />
                    )}
                    <div className="prose text-gray-800 whitespace-pre-line text-lg leading-relaxed">
                        {news.Content}
                    </div>
                    <div className="clear-both"></div>
                </div>
                <Button variant='accent' onClick={() => navigate(-1)}>
                    Назад
                </Button>
            </div>
        ) : (
          <div className="flex justify-center items-center min-h-[300px] text-gray-500">Новость не найдена</div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage; 