import { useState } from 'react';

type FeedbackModalProps = {
  open: boolean;
  onClose: () => void;
};

const FeedbackModal = ({ open, onClose }: FeedbackModalProps) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [story, setStory] = useState('');
  const [attachTo, setAttachTo] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-8 w-80 flex flex-col items-center shadow-xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-semibold mb-6 text-center">Поделись своим воспоминанием</h2>
        <form className="flex flex-col gap-4 w-full items-center">
          <input
            type="text"
            placeholder="Имя"
            className="border rounded px-3 py-2 w-full text-center"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Год выпуска"
            className="border rounded px-3 py-2 w-full text-center"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="border rounded px-3 py-2 w-full text-center"
            onChange={e => setPhoto(e.target.files ? e.target.files[0] : null)}
          />
          <textarea
            placeholder="История/текст"
            className="border rounded px-3 py-2 w-full text-center resize-none"
            rows={3}
            value={story}
            onChange={e => setStory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Куда прикрепляем"
            className="border rounded px-3 py-2 w-full text-center"
            value={attachTo}
            onChange={e => setAttachTo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition-colors w-full"
            disabled
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal; 