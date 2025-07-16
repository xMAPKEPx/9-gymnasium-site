import Header from '../components/Header';
import PersonCard from '../components/PersonCard';
import Footer from '../components/Footer';
import Dropdown from '../components/Dropdown';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { getDecades, getYearsByDecade, getYearById } from '../api/api';
import type { Person, SchoolClass } from '../types/people';
import { getImageUrl } from '../utils';
import FeedbackModal from '../components/FeedbackModal';

const PeoplePage = () => {
  const [decade, setDecade] = useState('');
  const [years, setYears] = useState<{ Year: number; documentId: string }[]>([]);
  const [year, setYear] = useState('');
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [classId, setClassId] = useState<number | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Мемоизация десятилетий
  const decades = useMemo(() => getDecades().map((v: number) => ({ label: `${v}-${v+9}`, value: String(v) })), []);

  // Загрузка годов при выборе десятилетия
  useEffect(() => {
    if (!decade) return;
    setLoadingYears(true);
    setYear('');
    setClassId(null);
    setClasses([]);
    setPeople([]);
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
    setLoadingClasses(true);
    setClassId(null);
    setClasses([]);
    setPeople([]);
    getYearById(year)
      .then((res) => {
        setClasses((res?.Classes || []) as SchoolClass[]);
        setLoadingClasses(false);
      })
      .catch(() => {
        setClasses([]);
        setLoadingClasses(false);
      });
  }, [year]);

  // Фильтрация людей по выбранному классу
  useEffect(() => {
    if (!classId || !classes.length) return setPeople([]);
    const selectedClass = classes.find((c) => typeof c.id === 'number' && c.id === classId);
    setPeople(selectedClass?.Class_persons || []);
  }, [classId, classes]);

  // Найти выбранный класс и год (мемоизация)
  const selectedClass = useMemo(() => classId ? classes.find((c) => typeof c.id === 'number' && c.id === classId) : null, [classId, classes]);
  const yearObj = useMemo(() => years.find((y) => y.documentId === year), [years, year]);

  // Мемоизация опций для фильтров
  const yearOptions = useMemo(() => years.map((y) => ({ label: y.Year?.toString() || '', value: y.documentId })), [years]);
  const classOptions = useMemo(() => classes.filter(c => typeof c.id === 'number').map((c) => ({ label: c.Literal, value: String(c.id) })), [classes]);

  const handleClassChange = useCallback((v: string) => setClassId(Number(v)), []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1 w-full">
        <div className="flex flex-col items-center justify-center mx-auto px-4 md:px-0">
          <div className="mt-10 mb-6">
            <h1 className="text-[#1E3A8A] font-bold text-2xl mb-1">Люди Девятки</h1>
            <div className="text-gray-500 text-base mb-6">Выпускники и учителя Гимназии №9</div>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-wrap gap-6 items-center mb-8 max-w-6xl">
            <span className="font-bold text-base text-[#1E3A8A] mr-4">Фильтры</span>
            <Dropdown
              options={decades}
              value={decade}
              onChange={setDecade}
              placeholder="Десятилетие"
              className="min-w-[160px] h-10 rounded-lg font-medium text-base"
            />
            <Dropdown
              options={yearOptions}
              value={year}
              onChange={setYear}
              placeholder={loadingYears ? 'Загрузка...' : 'Год'}
              className="min-w-[160px] h-10 rounded-lg font-medium text-base"
            />
            <Dropdown
              options={classOptions}
              value={classId ? String(classId) : ''}
              onChange={handleClassChange}
              placeholder={loadingClasses ? 'Загрузка...' : 'Класс'}
              className="min-w-[160px] h-10 rounded-lg font-medium text-base"
              disabled={!classes.length}
            />
          </div>
          {/* Блок с фото класса и людьми на фото */}
          {selectedClass && (
            <div className="bg-white rounded-xl shadow p-8 mb-12 mx-36 flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* Левая колонка: подпись и фото класса */}
              <div className="flex flex-col items-center w-full md:w-[640px]">
                {/* Синяя подпись */}
                <div className="bg-[#1E3A8A] text-white font-bold text-[17px] rounded-[10px] px-6 py-2 mb-4 w-full text-left h-[40px] flex items-center" style={{paddingLeft:24, paddingRight:24}}>
                  {yearObj ? `Выпуск ${yearObj.Year}г. – 11${selectedClass.Literal}` : `Класс ${selectedClass.Literal}`}
                </div>
                {/* Фото класса или плейсхолдер */}
                {selectedClass.Class_photo?.url ? (
                  <img
                    src={getImageUrl(selectedClass.Class_photo.url) || ''}
                    alt={`Фото класса 11${selectedClass.Literal}`}
                    className="bg-gray-100 rounded-[20px] shadow-xl object-cover w-full h-[360px]"
                    style={{ maxWidth: 640, maxHeight: 360 }}
                  />
                ) : (
                  <div className="w-full h-[360px] rounded-[20px] bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold" style={{ maxWidth: 640 }}>
                    Нет фото класса
                  </div>
                )}
              </div>
              {/* Правая колонка: люди на фото */}
              <div className="flex-1 flex flex-col pl-0 md:pl-8">
                <div className="text-[#1E3A8A] font-bold text-base mb-4 text-left">Люди на этом фото</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {people.length > 0 ? (
                    people.map((person, idx) => (
                      <PersonCard
                        key={person.Full_name + idx}
                        avatarUrl={getImageUrl(person.Photo?.url) || null}
                        name={person.Full_name}
                        role={person.Description}
                      />
                    ))
                  ) : (
                    <div className="col-span-5 text-gray-400 text-center py-8">Нет людей</div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Блок "Нашёл себя..." */}
          <div className="bg-[#1E3A8A] rounded-2xl shadow px-12 py-10 max-w-6xl mx-auto mb-12 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-4">Нашел себя или есть история про выпускника?</div>
            <div className="text-white text-base mb-6">Поделитесь своими воспоминаниями, фотографиями и историями о людях Девятки!</div>
            <button
              className="bg-[#FFD600] hover:bg-[#FFEB3B] text-[#1E3A8A] font-bold rounded-lg px-8 py-3 text-base mt-6 transition"
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