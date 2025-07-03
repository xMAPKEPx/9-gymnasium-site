import { useRef } from 'react';

type CarouselProps = {
  children: React.ReactNode;
  itemsToShow?: number;
};

const Carousel = ({ children, itemsToShow = 3 }: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const childrenArray = Array.isArray(children) ? children : [children];
  const isActive = childrenArray.length > itemsToShow;

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current && isActive) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.8;
      containerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // gap-1 = 0.25rem, учитываем это в расчёте ширины
  const gapRem = 0.25;
  const itemWidth = itemsToShow > 0 ? `calc((100% - ${(itemsToShow - 1) * gapRem}rem) / ${itemsToShow})` : 'auto';

  const childrenWithWidth = childrenArray.map((child, idx) => (
    <div key={idx} style={{ minWidth: itemWidth, maxWidth: itemWidth }}>
      {child}
    </div>
  ));

  if (!isActive) {
    // Просто ряд карточек без скролла и стрелок
    return (
      <div className="flex gap-1 py-2 px-10 justify-center">
        {childrenWithWidth}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"
        onClick={() => scroll('left')}
        aria-label="Прокрутить влево"
      >
        &#8592;
      </button>
      <div
        ref={containerRef}
        className="flex gap-1 overflow-x-auto scrollbar-hide py-2 px-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {childrenWithWidth}
      </div>
      <button
        type="button"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"
        onClick={() => scroll('right')}
        aria-label="Прокрутить вправо"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel; 