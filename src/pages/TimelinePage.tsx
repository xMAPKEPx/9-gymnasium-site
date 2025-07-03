import { useState, useRef, useEffect } from 'react';

const epochs = [
  { key: '1930', label: '1930-е года' },
  { key: '1960', label: '60-е года' },
  { key: '1970', label: '70-е года' },
  { key: '2010', label: '2010-й' },
];

const timelineData: Record<string, { title: string; description: string; photos: { id: number; size: 'sm' | 'lg'; label: string }[] }> = {
  '1930': {
    title: '1930-е года',
    description: 'Описание периода Описание периода Описание периода Описание периода Описание периода Описание периода Описание периода Описание периода',
    photos: [
      { id: 1, size: 'sm', label: 'Подпись 1' },
      { id: 2, size: 'sm', label: 'Подпись 2' },
      { id: 3, size: 'lg', label: 'Подпись 1' },
      { id: 4, size: 'sm', label: 'Подпись 1' },
      { id: 5, size: 'sm', label: 'Подпись 1' },
    ],
  },
  '1960': {
    title: '60-е года',
    description: 'Описание периода 60-х годов...',
    photos: [
      { id: 1, size: 'sm', label: 'Подпись 1' },
      { id: 2, size: 'sm', label: 'Подпись 2' },
      { id: 4, size: 'sm', label: 'Подпись 1' },
      { id: 5, size: 'sm', label: 'Подпись 1' },
      { id: 3, size: 'lg', label: 'Подпись 1' },
    ],
  },
  '1970': {
    title: '70-е года',
    description: 'Описание периода 70-х годов...',
    photos: [
      { id: 3, size: 'lg', label: 'Подпись 1' }, 
      { id: 4, size: 'sm', label: 'Подпись 1' }, 
      { id: 5, size: 'sm', label: 'Подпись 1' },
      { id: 1, size: 'sm', label: 'Подпись 1' },
      { id: 2, size: 'sm', label: 'Подпись 2' },
    ],
  },
  '2010': {
    title: '2010-й',
    description: 'Описание периода 2010-х годов...',
    photos: [
      { id: 1, size: 'sm', label: 'Подпись 1' },
      { id: 2, size: 'sm', label: 'Подпись 2' }, 
      { id: 4, size: 'sm', label: 'Подпись 1' }, 
      { id: 3, size: 'lg', label: 'Подпись 1' },
      { id: 5, size: 'sm', label: 'Подпись 1' },
    ],
  },
};

const TimelinePage = () => {
  const [selectedEpoch, setSelectedEpoch] = useState('1930');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        // Берём ближайший к верху
        const topMost = visible.reduce((prev, curr) =>
          (prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr)
        );
        setSelectedEpoch(topMost.target.getAttribute('data-epoch') || '1930');
      }
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.1,
    });
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      {/* Левое меню */}
      <aside className="w-56 flex-shrink-0 border-r h-screen sticky top-0 flex flex-col pt-16 pl-6">
        <div className="font-bold text-lg mb-6">Эпохи</div>
        <nav className="flex flex-col gap-3">
          {epochs.map((e) => (
            <button
              key={e.key}
              className={`text-left px-0 py-1 text-base ${selectedEpoch === e.key ? 'font-bold' : 'hover:underline'}`}
              onClick={() => {
                setSelectedEpoch(e.key);
                sectionRefs.current[e.key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {e.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Контент */}
      <main className="flex-1 flex flex-col items-center pt-16 px-8">
        <h1 className="text-4xl font-semibold mb-8">Лента времени</h1>
        <div className="flex gap-12 w-full max-w-5xl flex-col">
          {epochs.map((e) => {
            const data = timelineData[e.key];
            return (
              <section
                key={e.key}
                ref={(el: HTMLDivElement | null) => { sectionRefs.current[e.key] = el; }}
                data-epoch={e.key}
                className="mb-24"
              >
                <div className="sticky top-0 bg-white z-10 pb-2">
                  <div className={`text-2xl font-bold mb-4 ${selectedEpoch === e.key ? '' : 'text-gray-500'}`}>{data.title}</div>
                  <div className="mb-6 max-w-xl">{data.description}</div>
                </div>
                <div className="grid grid-cols-2 gap-6 items-start w-full">
                  {data.photos.map((p) => (
                    <div
                      key={p.id}
                      className={`border rounded-xl flex flex-col items-center justify-center ${p.size === 'lg' ? 'col-span-2 w-full h-80' : 'w-full h-80'}`}
                    >
                      <div className="flex-1 flex items-center justify-center">&nbsp;</div>
                      <div className="text-xs mt-2 mb-2">{p.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TimelinePage; 