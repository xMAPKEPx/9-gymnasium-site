import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import { getAllNews } from '../api/api';
import { getImageUrl } from '../utils';
import type { NewsItem } from '../types/news';

const PAGE_SIZE = 9;

const AllNewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllNews()
      .then((res) => {
        setNews(res || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки новостей');
        setLoading(false);
      });
  }, []);

  const handleNewsClick = useCallback((item: NewsItem) => {
    navigate(`/news/${item.documentId}`);
  }, [navigate]);

  const totalPages = Math.ceil(news.length / PAGE_SIZE);
  const paginatedNews = news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1 w-full mx-auto px-4 md:px-12 py-12 flex flex-col gap-8">
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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto">
              {paginatedNews.map((item) => (
                <NewsCard
                  key={item.id}
                  image={getImageUrl(item.Content_img?.[0]?.formats?.medium?.url || item.Content_img?.[0]?.url || item.Content_img?.[0]?.formats?.thumbnail?.url) || ''}
                  title={item.Title}
                  date={item.Date || item.publishedAt || ''}
                  description={item.Content}
                  onClick={() => handleNewsClick(item)}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Назад
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-4 py-2 rounded font-semibold border ${page === i + 1 ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Вперёд
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AllNewsPage; 