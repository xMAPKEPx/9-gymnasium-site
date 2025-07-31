import { type FC } from 'react';
import { FaTelegram, FaVk } from 'react-icons/fa';

const Footer: FC = () => (
  <footer className="w-full bg-[var(--color-footer)] border-t border-[var(--color-border)] text-white pr-[8.25rem]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-3 gap-4 md:gap-0">
      {/* Логотип и название */}
      <a href="/" className="flex items-center gap-2" aria-label="На главную">
        <img src="/img/logo-footer.svg" alt="Логотип" className="w-10 h-10" />
        <span className="font-bold text-xl text-white">Гимназия <span className="font-extrabold">№9</span></span>
      </a>
      {/* Меню */}
      <nav className="flex gap-8 text-base font-normal">
        <a href="/timeline" className="hover:underline">Лента Времени</a>
        <a href="/people" className="hover:underline">Люди</a>
        <a href="/news" className="hover:text-blue-900 transition-colors">Новости</a>
        <a href="/fund" className="hover:underline">Фонд</a>
        <a href="/contacts" className="hover:underline">Контакты</a>
      </nav>
      {/* Соцсети */}
      <div className="flex gap-4">
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="bg-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
          <FaTelegram className="w-5 h-5 text-[#20409A]" />
        </a>
        <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" aria-label="VK" className="bg-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
          <FaVk className="w-5 h-5 text-[#20409A]" />
        </a>
      </div>
    </div>
    {/* Линия-разделитель */}
    <div className="border-t border-white/20 my-2" />
    {/* Копирайт */}
    <div className="max-w-7xl mx-auto flex justify-end px-6 pb-2">
      <span className="text-white/80 text-sm">© Гимназия №9, 2025</span>
    </div>
  </footer>
);

export default Footer; 