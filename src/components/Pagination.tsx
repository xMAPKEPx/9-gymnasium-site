import { FC } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ page, pageCount, onPageChange, className = '' }) => {
  if (pageCount <= 1) return null;
  return (
    <nav className={`flex items-center gap-2 ${className}`} aria-label="Пагинация">
      <button
        className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-40"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
      >
        <FaChevronLeft />
      </button>
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i + 1}
          className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${page === i + 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'}`}
          onClick={() => onPageChange(i + 1)}
          aria-current={page === i + 1 ? 'page' : undefined}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-40"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Следующая страница"
      >
        <FaChevronRight />
      </button>
    </nav>
  );
};

export default Pagination; 