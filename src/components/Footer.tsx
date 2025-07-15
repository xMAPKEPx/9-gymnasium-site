import { type FC } from 'react';
import { TelegramIcon } from '../icons/AllIcons';
import { FaVk } from 'react-icons/fa';

const Footer: FC = () => (
  <footer className="w-full bg-[#20409A] pt-8 pb-4 text-white">
    <div className="flex flex-col gap-4 px-4 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* Логотип и название */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img src="/img/logo.svg" alt="Логотип" className="w-12 h-12" />
          <span className="text-2xl font-bold text-white">Гимназия №9</span>
        </div>
        {/* Меню */}
        <nav className="flex gap-8 text-base font-normal">
          <a href="#news" className="hover:underline">Новости</a>
          <a href="#about" className="hover:underline">О школе</a>
          <a href="#alumni" className="hover:underline">Выпускники</a>
          <a href="#fund" className="hover:underline">Фонд</a>
          <a href="#contacts" className="hover:underline">Контакты</a>
        </nav>
        {/* Соцсети */}
        <div className="flex gap-4">
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="bg-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
            <TelegramIcon className="w-5 h-5" />
          </a>
          <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" aria-label="VK" className="bg-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
            <FaVk className="w-5 h-5 text-[#20409A]" />
          </a>
        </div>
      </div>
      {/* Линия-разделитель */}
      <div className="border-t border-white/20 my-2" />
      {/* Копирайт */}
      <div className="flex justify-end">
        <span className="text-white/80 text-sm">© Гимназия №9, 2025</span>
      </div>
    </div>
  </footer>
);

export default Footer; 