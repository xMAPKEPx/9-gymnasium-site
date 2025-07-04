import Carousel from "../components/Carousel";
import PartnerCard from "../components/PartnerCard";

const donors = [
  'Аноним',
  'Дмитрий Баканёв',
  'Екатерина Попова',
  'Антон Езуб',
  'Александр Василевский',
  '...'
];

const committee = [
  { id: 1, name: 'Дмитрий Баканёв', position: 'Председатель', avatarUrl: '' },
  { id: 2, name: 'Екатерина Попова', position: 'Зам. председателя', avatarUrl: '' },
  { id: 3, name: 'Антон Езуб', position: 'Зам. председателя', avatarUrl: '' },
  { id: 4, name: 'Александр Василевский', position: 'Зам. председателя', avatarUrl: '' },
];

const documents = [
  'Отчёты о деятельности',
  'Реквизиты',
  'Протоколы собраний попсовета Эндаумент фонда',
];

const news = [
  { id: 1, title: 'Новость 1' },
  { id: 2, title: 'Новость 2' },
  { id: 3, title: 'Новость 3' },
];

const AssociationPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      <header className="w-full bg-black text-white py-2 px-4 text-sm text-left">Ассоциация + Эндаумент</header>
      <main className="w-full max-w-3xl flex flex-col items-center px-4">
        <h1 className="text-5xl font-light mt-8 mb-2">4 412 845 ₽</h1>
        <div className="text-xl mb-6">27 дарителей</div>
        <button className="border rounded px-8 py-2 mb-12 hover:bg-gray-100">Сделать взнос</button>

        <h2 className="text-2xl font-bold mb-2 mt-8">Что такое эндаумент</h2>
        <div className="mb-8 text-lg">Эндаумент — это целевой капитал, предназначенный для развития Гимназии №9. Средства идут на помощь талантливым ученикам, поддержку ветеранов-учителей и цифровизацию образования.</div>

        <h2 className="text-xl font-semibold mb-2 mt-8">История создания эндаумента</h2>
        <div className="mb-8">Фонд создан в 2021 году и действует по настоящее время.</div>

        <h2 className="text-xl font-semibold mb-2 mt-8">Список дарителей</h2>
        <ul className="mb-8 list-disc pl-6 max-h-60 overflow-y-auto">
          {donors.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
        <button className="border rounded px-8 py-2 mb-12 hover:bg-gray-100">Сделать взнос</button>

        <h2 className="text-xl font-semibold mb-2 mt-8">Оргкомитет ассоциации и фонда</h2>
        <div className="flex gap-4 mb-4">
          {committee.map((member) => (
            <PartnerCard key={member.id} name={member.name} position={member.position} avatarUrl={member.avatarUrl} />
          ))}
        </div>
        <div className="mb-4">(не путать с попсоветом эндаумента) — команда из 10-15 человек, кто организует всю движуху</div>
        <div className="mb-4 text-sm text-gray-600">Активный с кучей идей? Вступай и помогай, мы тут все на общественных началах</div>
        <button className="border rounded px-8 py-2 mb-12 hover:bg-gray-100">Вступай</button>

        <h2 className="text-xl font-semibold mb-2 mt-8">Официальные документы</h2>
        <ul className="mb-8 list-disc pl-6">
          {documents.map((d, i) => <li key={i}>{d}</li>)}
        </ul>

        <h2 className="text-xl font-semibold mb-2 mt-8">Наши мероприятия и активности (с главной)</h2>
        <div className="flex gap-8 mb-12">
          <Carousel itemsToShow={5}>
            {news.map((n) => (
              <div key={n.id} className="w-40 h-40 border rounded-2xl flex items-end justify-center p-2">
                <span className="mb-2">{n.title}</span>
              </div>
            ))}
          </Carousel>
          
        </div>
      </main>
    </div>
  );
};

export default AssociationPage; 