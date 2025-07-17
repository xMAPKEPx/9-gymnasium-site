import type { FC } from 'react';

interface NewsModalProps {
  open: boolean;
  onClose: () => void;
  news: {
    title: string;
    date: string;
    description: string;
    image?: string;
  } | null;
}

const NewsModal: FC<NewsModalProps> = ({ open, onClose, news }) => {
  if (!open || !news) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[95vh] overflow-y-auto shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Закрыть новость"
        >
          ×
        </button>
        {news.image && (
          <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-xl mb-4" />
        )}
        <h2 className="font-heading text-h2 mb-2">{news.title}</h2>
        <div className="text-gray-400 text-sm mb-4">{news.date}</div>
        <div className="prose text-gray-700 whitespace-pre-line">{news.description}</div>
      </div>
    </div>
  );
};

export default NewsModal; 