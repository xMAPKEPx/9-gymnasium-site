import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/Carousel';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { getEndowment } from '../api/api';
import type { EndowmentData, EndowmentDonor, EndowmentDocument, EndowmentNews, EndowmentTeamMember } from '../types/endowment';
import { getImageUrl } from '../utils';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<EndowmentNews | null>(null);

  useEffect(() => {
    getEndowment()
      .then((res) => setData(res?.attributes ? res.attributes : res))
      .catch(() => setError('Ошибка загрузки данных'))
      .finally(() => setLoading(false));
  }, []);

  const handleNewsClick = (news: EndowmentNews) => {
    setSelectedNews(news);
    setModalOpen(true);
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
        <section className="bg-gradient-to-r from-[#1E3A8A] to-[#1D4ED8] rounded-2xl p-12 flex flex-col items-center text-white gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Целевой капитал «Гимназия №9»</h1>
          <div className="text-4xl md:text-5xl font-extrabold">{data.total_amount} ₽</div>
          <div className="text-lg">Кол-во дарителей: <span className="font-bold">{data.donors_count}</span></div>
          <Button variant="accent" size="lg" className="mt-4" onClick={() => {/* navigate-заглушка */}}>Сделать взнос</Button>
        </section>

        {/* Что такое эндаумент */}
        <section className="flex flex-col items-center gap-8">
          <SectionTitle>Что такое эндаумент</SectionTitle>
          <div className="max-w-2xl text-center text-gray-700 text-lg">Эндаумент-фонд Гимназии №9 — это неприкосновенный капитал, созданный для долгосрочной поддержки развития гимназии</div>
          <div className="w-full bg-[#EFF6FF] rounded-xl py-8 px-[32rem] flex flex-col md:flex-row gap-8">
            {/* Цели фонда */}
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Цель фонда</h3>
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
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Как это работает</h3>
              <ol className="flex flex-col gap-4">
                {howItWorks.map((step: string, i: number) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-10 h-10 aspect-square flex items-center justify-center bg-[#1E3A8A] text-white font-bold rounded-full text-lg">{i+1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* История создания эндаумента */}
        <section className="w-full bg-[#F3F7FD] py-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#20409A] text-center mb-14">История создания эндаумента</h2>
          <div className="relative w-full max-w-3xl mx-auto flex flex-col items-start">
            {/* Вертикальная линия */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#20409A]/30 z-0" style={{minHeight: '100%'}} />
            <ul className="relative z-10 w-full flex flex-col gap-12">
              {history.map((item: { year: string; text: string }, i: number) => (
                <li key={i} className="flex items-start relative">
                  {/* Точка */}
                  <div className="flex flex-col items-center mr-8 min-w-[32px]">
                    <div className="w-6 h-6 rounded-full border-2 border-[#20409A] bg-white flex items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-[#20409A]" />
                    </div>
                  </div>
                  {/* Контент */}
                  <div>
                    <div className="font-bold text-[#20409A] text-lg md:text-xl mb-1">{item.year}</div>
                    <div className="text-[#1E293B] text-base md:text-lg max-w-2xl">{item.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Список дарителей */}
        <section className="w-full py-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#20409A] text-center mb-2">Список дарителей</h2>
          <div className="text-gray-400 text-lg text-center mb-8">Благодарим всех, кто уже сделал свой вклад в развитие гимназии</div>
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-[#20409A] scrollbar-track-[#F3F7FD]">
              <table className="w-full text-base">
                <tbody>
                  {data.donors.map((d: EndowmentDonor) => (
                    <tr key={d.id} className="">
                      <td className="py-6 px-4 text-center text-[#20409A] font-medium w-1/4">{d.date}</td>
                      <td className="py-6 px-4 text-center text-black w-2/4">{d.name}</td>
                      <td className="py-6 px-4 text-center text-black font-medium w-1/4">{d.amount.toLocaleString()} ₽</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Линии между строками */}
            <style>{`
              .donors-table tr:not(:last-child) td {
                border-bottom: 1px solid #20409A22;
              }
              .scrollbar-thin::-webkit-scrollbar {
                width: 8px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: #20409A;
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
            className="mt-8 border-2 border-[#20409A] text-[#20409A] bg-[#ECEEF1] rounded-2xl transition-colors duration-200 hover:bg-[#1E3A8A] hover:text-white hover:border-[#20409A] focus:bg-[#E9EBEF] focus:text-[#20409A] focus:border-[#20409A] px-10"
          >
            Стать дарителем
          </Button>
        </section>

        {/* Оргкомитет */}
        <section className="w-full bg-[#F3F7FD] py-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#20409A] text-center mb-2">Оргкомитет ассоциации и фонда</h2>
          <div className="text-gray-500 text-lg text-center mb-12 max-w-2xl">Наша команда состоит из активных выпускников, педагогов и партнёров, которые работают над развитием гимназии и эффективным управлением фондом</div>
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
                    <div className="font-bold text-xl text-[#20409A] mb-1 text-center">{person.Name}</div>
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
                      <div className="font-bold text-xl text-[#20409A] mb-1 text-center">{person.Name}</div>
                      <div className="text-gray-500 text-base text-center">{person.Position}</div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          <Button variant="accent" size="lg" className="mt-2 hover:bg-primary hover:text-white">Вступай в оргкомитет</Button>
        </section>

        {/* Документы */}
        <section className="flex flex-col items-center gap-8">
          <SectionTitle>Официальные документы</SectionTitle>
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-[#20409A] scrollbar-track-[#F3F7FD]">
            {data.documents.map((doc: EndowmentDocument) => (
              <div key={doc.id} className="flex items-center gap-4 py-2 px-2 rounded-xl hover:bg-[#F3F7FD] transition">
                <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full border border-[#20409A] text-[#20409A] font-bold text-lg">
                  {doc.ext === '.pdf' ? (
                    <img src="/img/icons/icon-pdf.svg" alt="PDF" className="w-8 h-8 object-contain" />
                  ) : (
                    doc.ext.replace('.', '').toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#1E3A8A] truncate">{doc.name}</div>
                  <div className="text-xs text-gray-400">{doc.ext.replace('.', '').toUpperCase()}, {doc.size} МБ</div>
                </div>
                <Button
                  variant="secondary"
                  size="md"
                  className="flex items-center gap-2 border border-[#20409A] text-[#20409A] bg-white rounded-xl px-4 py-2 hover:bg-[#F3F7FD] transition"
                  onClick={() => window.open(doc.url, '_blank')}
                >
                  <img src="/img/icons/icon-download.svg" alt="" className="w-4 h-4" />
                  Скачать
                </Button>
              </div>
            ))}
            <style>{`
              .scrollbar-thin::-webkit-scrollbar {
                width: 8px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: #20409A;
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
            className="flex items-center gap-2 border-2 border-[#20409A] text-[#20409A] bg-white rounded-2xl px-8 py-3 hover:bg-[#ECEEF1] hover:text-[#20409A] transition"
            onClick={() => {/* navigate-заглушка */}}
          >
            <img src="/img/icons/icon-downloadAll.svg" alt="" className="w-6 h-6" />
            Скачать одним архивом
          </Button>
        </section>

        {/* Новости */}
        <section className="bg-[#EFF6FF] rounded-2xl p-12 flex flex-col gap-8">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle className="mb-0">Новости и анонсы мероприятий</SectionTitle>
            <Button variant="secondary" size="md" onClick={() => {/* navigate-заглушка */}}>
              Все новости <img src='/img/icons/icon-rightArrow.svg' /> 
            </Button>
          </div>
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
        </section>

        {/* Поддержите будущее */}
        <section className="bg-[#FFFBE9] border border-[#FFD700] rounded-3xl py-12 px-56 flex flex-col items-center gap-4 shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] text-center mb-2">Поддержите будущее гимназии</h2>
          <div className="text-lg text-center text-[#1E40AF] mb-4">Ваше пожертвование позволяет сохранять традиции и развивать образование для новых поколений</div>
          <Button variant="accent" size="lg" className='hover:bg-primary hover:text-white'
          onClick={() => {/* navigate-заглушка */}}>
            Сделать взнос в фонд
          </Button>
        </section>
      </main>
      <Footer />
      <NewsModal open={modalOpen} onClose={() => setModalOpen(false)} news={selectedNews ? { title: selectedNews.Title, date: selectedNews.Date || '', description: selectedNews.Content, image: getImageUrl(selectedNews.Content_img[0]?.formats?.thumbnail?.url || selectedNews.Content_img[0]?.url) || undefined } : null} />
    </div>
  );
};

export default AssociationPage; 