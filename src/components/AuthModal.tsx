import { useState } from 'react';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [fio, setFio] = useState('');
  const [year, setYear] = useState('');
  const [day, setDay] = useState('Четверг');
  const [time, setTime] = useState('10:00');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-8 w-80 flex flex-col items-center shadow-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-semibold mb-6 text-center">Форма входа в Девятку</h2>
        <form className="flex flex-col gap-4 w-full items-center">
          <input
            type="text"
            placeholder="ФИО"
            className="border rounded px-3 py-2 w-full text-center"
            value={fio}
            onChange={e => setFio(e.target.value)}
          />
          <input
            type="number"
            placeholder="Год выпуска"
            className="border rounded px-3 py-2 w-full text-center"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 w-full text-center"
            value={day}
            onChange={e => setDay(e.target.value)}
            disabled
          >
            <option value="Четверг">Четверг</option>
          </select>
          <select
            className="border rounded px-3 py-2 w-full text-center"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            {['10:00','11:00','12:00','13:00','14:00','15:00'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition-colors w-full"
            disabled
          >
            Отправить
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">Заявка уходит на почту xxx</div>
      </div>
    </div>
  );
};

export default AuthModal; 