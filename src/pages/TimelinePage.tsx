import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import Footer from '../components/Footer';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { getTimelines } from '../api/api';
import Loader from '../components/Loader';
import type { ContentImage } from '../types/NewsTypes';
import { getImageUrl } from '../utils';

interface TimelineEvent {
  id: string;
  Title: string;
  Type?: string;
  Content?: string | null;
  Caption?: string | null;
  Image?: ContentImage | null;
  Gallery?: ContentImage[] | null
  // Image, Gallery, Video — если появятся, добавить сюда
}

interface Timeline {
  id: string;
  Title: string;
  Description?: string;
  Start_year?: number;
  End_year?: number;
  Events?: TimelineEvent[];
}

const TimelinePage = () => {
  const [epoch, setEpoch] = useState<string>('');
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  // Загрузка эпох с сервера
  useEffect(() => {
    getTimelines().then((data) => {
      setTimelines(data || []);
      setEpoch((data && data[0]?.id) || '');
      setLoading(false);
    });
  }, []);

  // Мемоизация id эпох для быстрого поиска
  const timelineIds = useMemo(() => timelines.map(e => e.id), [timelines]);

  // Скролл к эпохе
  const handleMenuClick = useCallback((value: string) => {
    setEpoch(value);
    const el = document.getElementById(value);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Подсветка активной эпохи при скролле
  useEffect(() => {
    if (!timelines.length) return;
    const handleScroll = () => {
      const offsets = timelineIds.map(id => {
        const el = document.getElementById(id);
        return {
          key: id,
          top: el ? el.getBoundingClientRect().top : Infinity
        };
      });
      const visible = offsets.filter(o => o.top < window.innerHeight / 2 && o.top > 80);
      if (visible.length > 0) {
        setEpoch(visible[visible.length - 1].key);
      } else {
        const above = offsets.filter(o => o.top <= 80);
        if (above.length > 0) setEpoch(above[above.length - 1].key);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [timelineIds]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-gray-900">
      <Header />
      <main ref={mainRef} className="flex-1 w-full grid grid-cols-[220px_1fr] gap-8 px-[13rem] py-12">
        {/* Левое меню */}
        <aside className="col-span-1">
          <nav className="sticky top-24 flex flex-col gap-2 bg-white rounded-xl border border-blue-100 p-4">
            {timelines.map(e => (
              <button
                key={e.id}
                className={`px-4 py-2 rounded-lg font-semibold text-base text-left transition-all duration-200 ${epoch === e.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-blue-50 text-blue-800'}`}
                onClick={() => handleMenuClick(e.id)}
              >
                {e.Title || 'Без названия'}
              </button>
            ))}
          </nav>
        </aside>
        {/* Контент всех эпох */}
        <section className="col-span-1 flex flex-col gap-16">
          {timelines.map(epoch => (
            <div key={epoch.id} id={epoch.id} className="flex gap-8">
              {/* Sticky заголовок и описание только в рамках эпохи */}
              <div className="w-[320px] flex-shrink-0">
                <div className="sticky top-24 z-10 bg-white pb-4">
                  <SectionTitle as="h2" className="mb-2 text-2xl md:text-3xl text-left font-bold text-blue-900">{epoch.Title || 'Без названия'}</SectionTitle>
                  {epoch.Description && (
                    <div className="text-gray-600 mb-4 max-w-2xl leading-relaxed">{epoch.Description}</div>
                  )}
                </div>
              </div>
              {/* Карточки событий */}
              <div className="flex-1 flex flex-col gap-8">
                {(epoch.Events || []).map(ev => {
                  return (
                    <div key={ev.id} className="bg-yellow-50 rounded-xl shadow p-6 flex flex-col items-center">
                      {ev.Type !== 'Article' ? (
                        <>
                          {ev.Image?.url && (
                            <img
                              src={getImageUrl(ev.Image.url) || undefined}
                              alt={ev.Title || 'Изображение'}
                              className="rounded-lg mb-4 max-w-full h-auto"
                            />
                          )}
                          <div className="font-bold text-lg text-gray-900 mb-1">{ev.Title}</div>
                          {ev.Caption && <div className="text-gray-500 text-sm text-center mt-2">{ev.Caption}</div>}
                        </>
                      ) : (
                        <>
                          <div className="font-bold text-lg text-gray-900 mb-1">{ev.Title}</div>
                          {ev.Content && <div className="text-gray-700 text-base text-center max-w-2xl">{ev.Content}</div>}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TimelinePage; 