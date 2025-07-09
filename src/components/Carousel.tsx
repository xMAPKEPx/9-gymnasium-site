import { type FC, type ReactNode, useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
  children: ReactNode[];
  itemsToShow?: number;
  gap?: number; // gap в px
  className?: string;
}

const Carousel: FC<CarouselProps> = ({ children, itemsToShow = 3, gap = 16, className = '' }) => {
  const total = children.length;
  const [index, setIndex] = useState(itemsToShow); // начинаем с первого "реального" элемента
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Если элементов мало — не делаем бесконечную прокрутку и не показываем кнопки
  const isInfinite = total > itemsToShow;

  // Дублируем элементы для бесконечной прокрутки
  const extendedChildren = isInfinite
    ? [
        ...children.slice(-itemsToShow),
        ...children,
        ...children.slice(0, itemsToShow),
      ]
    : children;

  // Обработка перехода к клонам
  useEffect(() => {
    if (!isInfinite || !isTransitioning) return;
    if (index === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(total);
      }, 300);
    } else if (index === total + itemsToShow) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(itemsToShow);
      }, 300);
    }
  }, [index, isTransitioning, total, itemsToShow, isInfinite]);

  // Управление переходом
  const goTo = (newIndex: number) => {
    setIsTransitioning(true);
    setIndex(newIndex);
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      goTo(index - 1);
    }
  };
  const handleNext = () => {
    if (!isTransitioning) {
      goTo(index + 1);
    }
  };

  // Сброс transition после "телепортации"
  useEffect(() => {
    if (!isInfinite) return;
    if (!isTransitioning && (index === itemsToShow || index === total)) {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        void trackRef.current.offsetWidth;
        trackRef.current.style.transition = '';
      }
    }
  }, [isTransitioning, index, itemsToShow, total, isInfinite]);

  // Вычисляем transform
  const translate = isInfinite
    ? -(100 / itemsToShow) * index
    : 0;

  // Ширина карточки с учётом gap
  const cardWidth = `calc((100% - ${(itemsToShow - 1) * gap}px) / ${itemsToShow})`;

  return (
    <div className={`relative w-full ${className}`} aria-label="Карусель">
      {isInfinite && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 text-primary border border-primary hover:bg-white hover:text-primary transition-colors duration-200 disabled:opacity-40"
          onClick={handlePrev}
          aria-label="Предыдущий"
          disabled={isTransitioning}
          type="button"
        >
          <FaChevronLeft size={22} />
        </button>
      )}
      <div className="flex overflow-hidden w-full justify-center">
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            transform: `translateX(${translate}%)`,
            transition: isInfinite && isTransitioning ? 'transform 0.3s' : 'none',
            width: '100%',
          }}
          onTransitionEnd={() => {
            if (!isInfinite) return;
            setIsTransitioning(false);
            if (index === 0) {
              setIndex(total);
            } else if (index === total + itemsToShow) {
              setIndex(itemsToShow);
            }
          }}
        >
          {extendedChildren.map((child, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                maxWidth: cardWidth,
                flexBasis: cardWidth,
              }}
              aria-hidden={isInfinite ? (i < index || i >= index + itemsToShow) : false}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {isInfinite && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 text-primary border border-primary hover:bg-white hover:text-primary transition-colors duration-200 disabled:opacity-40"
          onClick={handleNext}
          aria-label="Следующий"
          disabled={isTransitioning}
          type="button"
        >
          <FaChevronRight size={22} />
        </button>
      )}
    </div>
  );
};

export default Carousel; 