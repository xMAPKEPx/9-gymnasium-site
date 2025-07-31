import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import NewsCard from '../components/NewsCard';
import { getEndowment } from '../api/api';
import type { EndowmentData, EndowmentDonor, EndowmentDocument, EndowmentNews, EndowmentTeamMember } from '../types/endowment';
import { formatNumberWithSpaces, getImageUrl, countUniqueDonors } from '../utils';

const fundGoals: string[] = [
  'Помощь талантливым ученикам: участие в олимпиадах, выезды на конкурсы, возможно покупка техники',
  'Поддержка ветеранов - учителей, которые большую часть жизни отдали работе в Гимназии',
  'Цифровизация процесса образования, переход учебного процесса на новый, современный уровень.',
];

const howItWorks: string[] = [
  'Вы делаете пожертвование в фонд',
  'Капитал инвестируется в надёжные активы',
  'Доходы от инвестиций ежегодно направляются на развитие гимназии',
];

const history: { year: string; text: string }[] = [
  { year: '2021', text: 'Инициатива создания эндаумент-фонда от выпускников 2005 года. Первые обсуждения с администрацией гимназии.' },
  { year: 'Январь 2022', text: 'Сформирован попечительский совет фонда. Разработана стратегия развития и юридические документы.' },
  { year: 'Март 2022', text: 'Официальная регистрация эндаумент-фонда Гимназии №9. Первые пожертвования от выпускников.' },
  { year: 'Сентябрь 2022', text: 'Первые проекты, профинансированные из доходов фонда: обновление компьютерного класса и программа поддержки олимпиадников.' },
  { year: '2023', text: 'Расширение деятельности фонда. Запуск программы корпоративного партнёрства. Превышение отметки в 3 млн рублей.' },
  { year: '2024', text: 'Установлена новая цель - 5 млн рублей. Запуск программы именных стипендий и грантов для преподавателей.' },
];

const AssociationPage = () => {
  const [data, setData] = useState<EndowmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEndowment()
      .then((res) => setData(res?.attributes ? res.attributes : res))
      .catch(() => setError('Ошибка загрузки данных'))
      .finally(() => setLoading(false));
  }, []);

  const handleNewsClick = (news: EndowmentNews) => {
    navigate(`/news/${news.documentId}`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!data) return null;

  // Выводим данные из API
  return (
    <div className="min-h-screen flex flex-col bg-bg text-gray-900">
      <Header />
      <main className="flex-1 w-full mx-auto px-4 md:px-12 py-12 flex flex-col gap-16">
        {/* Сбор средств */}
        <section style={{ background: 'var(--gradient-primary)' }}
            className="rounded-2xl p-12 flex flex-col items-center text-white gap-4">
          <h1 className="text-3xl md:text-4xl font-medium text-center">Целевой капитал «Гимназия №9»</h1>
          <div className="text-4xl md:text-5xl font-extrabold italic">{formatNumberWithSpaces(data.total_amount)} ₽</div>
          <div className="text-lg font-medium">Кол-во дарителей: <span className="font-bold">{countUniqueDonors(data.donors)}</span></div>
          <Button style={{ background: 'linear-gradient(94.11deg, #779C8E -13.51%, #A6C6BA 108.05%)' }}
              variant="accent" size="lg" className="mt-4 rounded-sm" onClick={() => {/* navigate-заглушка */}}>
            Сделать взнос
          </Button>
        </section>

        {/* Что такое эндаумент */}
        <section className="flex flex-col items-center gap-8">
          <SectionTitle>Что такое эндаумент</SectionTitle>
          <div className="max-w-2xl text-center text-gray-700 text-lg">Эндаумент-фонд Гимназии №9 — это неприкосновенный капитал, созданный для долгосрочной поддержки развития гимназии</div>
          <div className="w-full bg-[var(--color-section)] rounded-xl py-8 px-[32rem] flex flex-col md:flex-row gap-8 text-start">
            {/* Цели фонда */}
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-xl font-extrabold italic text-[var(--color-text)] mb-2">Цель фонда</h3>
              <div className="text-gray-700 mb-2">Целевой капитал предназначен для развития Гимназии и предполагает финансирование следующих проектов:</div>
              <ul className="list-none flex flex-col gap-2">
                {fundGoals.map((goal: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-10 h-10 aspect-square flex items-center justify-center bg-[#EAB308] rounded-full text-white text-2xl font-bold">✓</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Как это работает */}
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="italic text-xl font-extrabold text-[var(--color-text)] mb-2">Как это работает</h3>
              <ol className="flex flex-col gap-4">
                {howItWorks.map((step: string, i: number) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-10 h-10 aspect-square flex items-center justify-center bg-[var(--color-text)] text-white font-bold rounded-full text-lg">{i+1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* История создания эндаумента */}
        <section className="w-full bg-[var(--color-section)] py-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-gradient italic text-center mb-14">История создания эндаумента</h2>
          <div className="relative w-full max-w-3xl mx-auto flex flex-col items-start">
            {/* Вертикальная линия */}
            <div className="absolute left-[0.95rem] top-0 bottom-0 w-0.5 bg-[#455A54]/30 z-0" style={{minHeight: '100%'}} />
            <ul className="relative z-10 w-full flex flex-col gap-12 text-start">
              {history.map((item: { year: string; text: string }, i: number) => (
                <li key={i} className="flex items-start relative">
                  {/* Точка */}
                  <div className="flex flex-col items-center mr-8 min-w-[32px]">
                    <div className="w-6 h-6 rounded-full border-4 border-[#455A54] bg-white flex items-center justify-center z-10">
                      
                    </div>
                  </div>
                  {/* Контент */}
                  <div>
                    <div className="font-extrabold italic text-[var(--color-text)] text-lg md:text-xl mb-1">{item.year}</div>
                    <div className="text-[#1E293B] text-base md:text-lg max-w-2xl">{item.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Список дарителей */}
        <section className="w-full py-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-gradient text-center mb-2">Список дарителей</h2>
          <div className="text-gray-400 text-lg text-center mb-8">Благодарим всех, кто уже сделал свой вклад в развитие гимназии</div>
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-[#20409A] scrollbar-track-[#F3F7FD]">
              <table className="w-full text-base">
                <tbody>
                  {data.donors.map((d: EndowmentDonor) => (
                    <tr key={d.id} className="border-b">
                      <td className="py-6 px-4 text-center font-bold text-[var(--color-text)] w-1/4">{d.date}</td>
                      <td className="py-6 px-4 text-center text-black w-2/4">{d.name}</td>
                      <td className="py-6 px-4 text-center text-black font-medium w-1/4">{d.amount.toLocaleString()} ₽</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Линии между строками */}
            <style>{`
              .scrollbar-thin::-webkit-scrollbar {
                width: 8px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: #455A54;
                border-radius: 4px;
              }
              .scrollbar-thin::-webkit-scrollbar-track {
                background: #F3F7FD;
                border-radius: 4px;
              }
            `}</style>
          </div>
          <Button 
            variant="secondary" 
            size="lg" 
            className="mt-8 border-2 bg-[#ECEEF1] rounded-2xl transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] focus:bg-[#E9EBEF] focus:text-[var(--color-accent)] focus:border-[var(--color-accent)] px-10"
          >
            Стать дарителем
          </Button>
        </section>

        {/* Оргкомитет */}
        <section className="w-full bg-[#F3F7FD] py-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-gradient text-center mb-2">Оргкомитет ассоциации и фонда</h2>
          <div className="text-gray-500 text-lg text-center mb-12 max-w-5xl">Наша команда состоит из активных выпускников, педагогов и партнёров, которые работают над развитием гимназии и эффективным управлением фондом</div>
          {data.team.length <= 5 ? (
            <div className="flex flex-row flex-wrap gap-8 justify-center w-full mb-8">
              {data.team.map((person: EndowmentTeamMember) => (
                <div key={person.id} className="flex flex-col items-center bg-white rounded-2xl shadow p-8 w-64 min-w-[240px] min-h-[320px] h-full justify-start">
                  <div className="flex items-end justify-center min-h-[112px] w-full">
                    {person.Photo ? (
                      <img src={getImageUrl(person.Photo.formats?.thumbnail?.url || person.Photo.url) || undefined} alt={person.Name} className="w-28 h-28 rounded-full object-cover" />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-col items-center w-full pt-8">
                    <div className="font-bold text-xl text-[var(--color-text)] mb-1 text-center">{person.Name}</div>
                    <div className="text-gray-500 text-base text-center">{person.Position}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full mb-8">
              <Carousel itemsToShow={4} gap={32} className="w-full">
                {data.team.map((person: EndowmentTeamMember) => (
                  <div key={person.id} className="flex flex-col items-center bg-white rounded-2xl shadow p-8 w-64 min-w-[240px] min-h-[320px] h-full justify-start">
                    <div className="flex items-end justify-center min-h-[112px] w-full">
                      {person.Photo ? (
                        <img src={getImageUrl(person.Photo.formats?.thumbnail?.url || person.Photo.url) || undefined} alt={person.Name} className="w-28 h-28 rounded-full object-cover" />
                      ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-300" />
                      )}
                    </div>
                    <div className="flex flex-col items-center w-full pt-8">
                      <div className="font-bold text-xl text-[var(--color-text)] mb-1 text-center">{person.Name}</div>
                      <div className="text-gray-500 text-base text-center">{person.Position}</div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          <Button variant="accent" size="lg" className="mt-2 transition-colors duration-200 hover:bg-[var(--color-primary)] hover:text-white">Вступай в оргкомитет</Button>
        </section>

        {/* Документы */}
        <section className="flex flex-col items-center gap-8">
          <SectionTitle className=''>Официальные документы</SectionTitle>
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-[#20409A] scrollbar-track-[#F3F7FD]">
            {data.documents.map((doc: EndowmentDocument) => (
              <div key={doc.id} className="flex items-center gap-4 py-2 px-2 rounded-xl transition">
                <div className="w-16 h-16 flex items-center justify-center bg-[#DBEAFE] rounded-full text-[var(--color-text)] font-extrabold text-lg">
                  {doc.ext === '.pdf' ? (
                    <img src="/img/icons/icon-pdf.svg" alt="PDF" className="w-8 h-8 object-contain" />
                  ) : (
                    doc.ext.replace('.', '').toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold italic text-[var(--color-text)] truncate">{doc.name}</div>
                  <div className="text-xs text-gray-400">{doc.ext.replace('.', '').toUpperCase()}, {doc.size} МБ</div>
                </div>
                <Button
                  variant="secondary"
                  size=''
                  className="border-none hover:bg-transparent p-3"
                  onClick={() => window.open(getImageUrl(doc.url) || undefined, '_blank')}
                >
                  <img src="/img/icons/icon-download.svg" alt="" className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <style>{`
              .scrollbar-thin::-webkit-scrollbar {
                width: 8px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: #455A54;
                border-radius: 4px;
              }
              .scrollbar-thin::-webkit-scrollbar-track {
                background: #F3F7FD;
                border-radius: 4px;
              }
            `}</style>
          </div>
        </section>

        {/* Новости */}
        <section className="bg-[#EFF6FF] rounded-2xl p-12 flex flex-col gap-8">
          <SectionTitle className="mb-0">Новости и анонсы мероприятий</SectionTitle>
          <div className="flex flex-wrap gap-8 justify-center">
            <Carousel itemsToShow={3}>
              {data.news.map((event: EndowmentNews) => (
                <NewsCard
                  key={event.id}
                  image={getImageUrl(event.Content_img[0]?.formats?.thumbnail?.url || event.Content_img[0]?.url) || undefined}
                  title={event.Title}
                  date={event.Date || ''}
                  description={event.Content}
                  onClick={() => handleNewsClick(event)}
                />
              ))}
            </Carousel>
          </div>
          <div className='w-full flex items-center justify-center'>
            <Button variant="accent" size="md" className='hover:bg-[var(--color-primary)]' onClick={() => {/* navigate-заглушка */}}>
              Все новости <img src='/img/icons/icon-rightArrow.svg' /> 
            </Button>
          </div>
        </section>

        {/* Поддержите будущее */}
        <section style={{ background: 'linear-gradient(90deg, #FFEECB 0%, #DCC494 100%)'}}
          className="rounded-3xl py-12 px-56 flex flex-col items-center gap-4 shadow">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-2 text-center text-[var(--color-text)]">Поддержите будущее гимназии</h2>
          <div className="text-lg text-center text-[var(--color-text)] mb-4">Ваше пожертвование позволяет сохранять традиции и развивать образование для новых поколений</div>
          <Button variant="primary" size="lg" className='border-2 border-[var(--color-primary)] hover:bg-transparent hover:border-[var(--color-secondary)] hover:text-[var(--color-text)] transition-colors'
          onClick={() => {/* navigate-заглушка */}}>
            Сделать взнос в фонд
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AssociationPage; 