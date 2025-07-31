import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState, useMemo } from 'react';
import { getDecades, getYearsByDecade, getYearById } from '../api/api';
import type { SchoolClass } from '../types/people';
import { getImageUrl } from '../utils';
import FeedbackModal from '../components/FeedbackModal';
import PersonCard from '../components/PersonCard';

const PeoplePage = () => {
  const [decade, setDecade] = useState('');
  const [years, setYears] = useState<{ Year: number; documentId: string }[]>([]);
  const [year, setYear] = useState('');
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [loadingYears, setLoadingYears] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Мемоизация десятилетий
  const decades = useMemo(() => getDecades().map((v: number) => ({ label: `${v}-${v+9}`, value: String(v) })), []);

  // Загрузка годов при выборе десятилетия
  useEffect(() => {
    if (!decade) return;
    setLoadingYears(true);
    setYear('');
    setClasses([]);
    getYearsByDecade(Number(decade))
      .then((res) => {
        setYears(res.map((y: { Year: number; documentId: string }) => ({ Year: y.Year, documentId: y.documentId })));
        setLoadingYears(false);
      })
      .catch(() => {
        setYears([]);
        setLoadingYears(false);
      });
  }, [decade]);

  // Загрузка всех классов и их контента при выборе года
  useEffect(() => {
    if (!year) return;
    setClasses([]);
    getYearById(year)
      .then((res) => {
        setClasses((res?.Classes || []) as SchoolClass[]);
      })
      .catch(() => {
        setClasses([]);
      });
  }, [year]);

  // Найти выбранный год (мемоизация)
  const yearObj = useMemo(() => years.find((y) => y.documentId === year), [years, year]);

  // Мемоизация опций для фильтров
  const yearOptions = useMemo(() => years.map((y) => ({ label: y.Year?.toString() || '', value: y.documentId })), [years]);

  // Удалены renderDecadeButtons и renderYearButtons

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1 w-full bg-white">
        <div className="flex-1 w-full mx-auto px-4 md:px-12 py-12 flex flex-col">
          {/* Заголовок */}
          <div className="w-full flex flex-col items-center justify-center mt-10 mb-6">
            <h1
              className="font-extrabold text-[30px] leading-[40px] mb-1"
              style={{
                background: 'var(--gradient-heading)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Люди Девятки
            </h1>
            <div className="text-[14px] leading-[24px] font-normal text-[var(--color-text)]">
              Выпускники и учителя Гимназии №9
            </div>
          </div>
          {/* Фильтр десятилетий */}
          <div className="w-full bg-white rounded-xl shadow py-8 px-28 mb-4">
            <div className="font-normal text-[20px] leading-[24px] text-[var(--color-text)] mb-2">Выберите десятилетие</div>
            <div className="flex flex-wrap gap-3 mt-2 mb-6 justify-center">
              {decades.map((d) => (
                <button
                  key={d.value}
                  className={`px-4 py-2 rounded-lg border text-[15px] leading-[24px] font-normal transition-all outline-none
                    ${decade === d.value
                      ? 'bg-[var(--color-accent)] text-white border-[var(--color-secondary)]'
                      : 'bg-white text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-section)]'}
                  `}
                  onClick={() => setDecade(d.value)}
                  type="button"
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="font-normal text-[20px] leading-[24px] text-[var(--color-text)] mt-4 mb-2">Выберите год выпуска</div>
            <div className="flex flex-wrap gap-3 mt-2 mb-8 justify-center">
              {loadingYears ? (
                <div className="text-[var(--color-muted)] text-base">Загрузка...</div>
              ) : (
                yearOptions.map((y) => (
                  <button
                    key={y.value}
                    className={`px-4 py-2 rounded-lg border text-[15px] leading-[24px] font-normal transition-all outline-none
                      ${year === y.value
                        ? 'bg-[var(--color-accent)] text-white border-[var(--color-secondary)]'
                        : 'bg-white text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-section)]'}
                    `}
                    onClick={() => setYear(y.value)}
                    type="button"
                  >
                    {y.label}
                  </button>
                ))
              )}
            </div>
          </div>
          {/* Блоки по всем классам выбранного года */}
          {classes.length > 0 && classes.map((classItem, idx) => (
            <div
              key={classItem.id || idx}
              className="w-full rounded-xl shadow flex flex-col md:flex-row gap-8 items-start justify-center mb-12 p-8 bg-transparent"
            >
              {/* Левая колонка: подпись и фото класса */}
              <div className="flex flex-col items-center w-full md:w-[640px]">
                <div className="heading-gradient font-extrabold italic text-[24px] leading-[24px] rounded-[10px] px-6 py-2 mb-4 w-full text-left h-[40px] flex items-center">
                  {yearObj ? `Выпуск ${yearObj.Year}г. – 11${classItem.Literal}` : `Класс ${classItem.Literal}`}
                </div>
                {classItem.Class_photo?.url ? (
                  <img
                    src={getImageUrl(classItem.Class_photo.url) || ''}
                    alt={`Фото класса 11${classItem.Literal}`}
                    className="bg-[var(--color-section)] rounded-[20px] shadow-xl object-cover w-full h-[360px]"
                    style={{ maxWidth: 640, maxHeight: 360 }}
                  />
                ) : (
                  <div className="w-full h-[360px] rounded-[20px] bg-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] text-xl font-bold" style={{ maxWidth: 640 }}>
                    Нет фото класса
                  </div>
                )}
                <button
                  className="bg-transparent hover:opacity-90 text-start text-[var(--color-text)] font-bold rounded-lg px-8 py-3 text-[16px] mt-3 transition"
                  onClick={() => setFeedbackOpen(true)}
                >
                  Нашел себя или есть история про выпускника? Поделитесь своими воспоминаниями, фотографиями и историями о людях Девятки!
                </button>
              </div>
              {/* Правая колонка: люди на фото */}
              <div className="flex-1 flex flex-col pl-0 md:pl-8">
                <div className="font-bold text-[20px] mb-4 text-left text-[var(--color-text)]">Люди на фото</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {classItem.Class_persons && classItem.Class_persons.length > 0 ? (
                    classItem.Class_persons.map((person, pidx) => (
                      <PersonCard
                        key={person.Full_name + pidx}
                        avatarUrl={getImageUrl(person.Photo?.url) || null}
                        name={person.Full_name}
                        role={person.Description}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-[var(--color-muted)] text-center py-8">Нет людей</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Блок "Нашёл себя..." */}
          <div className="rounded-2xl shadow px-12 py-10 max-w-6xl mx-auto mb-12 text-center bg-[var(--color-section)]">
            <div className="text-[32px] md:text-[36px] font-bold mb-4 leading-[1.1] heading-gradient">Нашел себя или есть история про выпускника?</div>
            <div className="text-[16px] leading-[30px] font-normal mb-6 text-[var(--color-text)]">Поделитесь своими воспоминаниями, фотографиями и историями о людях Девятки!</div>
            <button
              className="bg-[var(--color-accent)] hover:opacity-90 text-white font-bold rounded-lg px-8 py-3 text-[16px] mt-6 transition"
              onClick={() => setFeedbackOpen(true)}
            >
              Поделиться
            </button>
          </div>
          <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} defaultYear={yearObj?.Year || ''} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PeoplePage; 