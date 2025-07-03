import { useState } from 'react';
import FeedbackModal from '../components/FeedbackModal';

const decades = [
  '1980-1990е',
  '1990-2000е',
  '2000-2010е',
];
const yearsByDecade: Record<string, string[]> = {
  '1980-1990е': ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989'],
  '1990-2000е': ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999'],
  '2000-2010е': ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'],
};

const people = [
  { id: 1, name: 'Иванов Иван', role: 'выпускник' },
  { id: 2, name: 'Петров Пётр', role: 'учитель' },
];

const PeoplePage = () => {
  const [selectedDecade, setSelectedDecade] = useState('2000-2010е');
  const [selectedYear, setSelectedYear] = useState('2001');
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 py-8">
      <h1 className="text-3xl font-semibold mb-2">Люди Девятки</h1>
      <div className="mb-6 text-center text-lg">Выпускные фотографии со списками выпускников по годам</div>
      {/* Фильтр по десятилетиям */}
      <div className="flex gap-4 mb-2">
        {decades.map((d) => (
          <button
            key={d}
            className={`px-3 py-1 rounded ${selectedDecade === d ? 'font-bold underline' : 'hover:bg-gray-100'}`}
            onClick={() => { setSelectedDecade(d); setSelectedYear(yearsByDecade[d][0]); }}
          >
            {d}
          </button>
        ))}
      </div>
      {/* Фильтр по годам */}
      <div className="flex gap-3 mb-6">
        {yearsByDecade[selectedDecade].map((y) => (
          <button
            key={y}
            className={`px-2 py-1 rounded ${selectedYear === y ? 'font-bold underline' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedYear(y)}
          >
            {y}
          </button>
        ))}
      </div>
      <div className="mb-4 text-lg">Выпуск {selectedYear} г. - 11 Е</div>
      {/* Фото класса */}
      <div className="border rounded-xl w-96 h-56 flex items-center justify-center text-lg mb-4">Фото класса</div>
      {/* Карточки людей */}
      <div className="flex gap-4 mb-4">
        {people.map((p) => (
          <div key={p.id} className="border rounded-lg px-4 py-3 text-center w-40">
            Люди с этого фото,<br />{p.role}
          </div>
        ))}
      </div>
      {/* Кнопка для открытия модального окна */}
      <button
        className="mt-2 text-sm text-gray-700 underline hover:text-blue-600"
        onClick={() => setFeedbackOpen(true)}
      >
        Нашел себя или есть история про выпускника? Нажимай сюда
      </button>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
};

export default PeoplePage; 