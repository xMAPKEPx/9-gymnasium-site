import { type FC } from 'react';
import { FaTelegramPlane, FaVk } from 'react-icons/fa';
import { HiOutlineBuildingLibrary } from 'react-icons/hi2';

const Footer: FC = () => (
  <footer className="w-full bg-primary pt-8 pb-4 text-white">
    <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* Логотип и название */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span className="bg-white rounded-full flex items-center justify-center w-14 h-14">
            <HiOutlineBuildingLibrary className="text-primary text-3xl" />
          </span>
          <span className="text-2xl font-bold text-white">Гимназия №9</span>
        </div>
        {/* Меню */}
        <nav className="flex gap-6 text-base font-normal">
          <a href="#news" className="hover:underline">Новости</a>
          <a href="#about" className="hover:underline">О школе</a>
          <a href="#alumni" className="hover:underline">Выпускники</a>
          <a href="#fund" className="hover:underline">Фонд</a>
          <a href="#contacts" className="hover:underline">Контакты</a>
        </nav>
        {/* Соцсети */}
        <div className="flex gap-4">
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="bg-white/20 hover:bg-white/40 rounded-full w-9 h-9 flex items-center justify-center transition-colors">
            <FaTelegramPlane className="text-white text-xl" />
          </a>
          <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" aria-label="VK" className="bg-white/20 hover:bg-white/40 rounded-full w-9 h-9 flex items-center justify-center transition-colors">
            <FaVk className="text-white text-xl" />
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