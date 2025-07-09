import { useState } from 'react';

const Header = () => {
  // Замените на свою логику авторизации
  const [isLoggedIn] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Логотип */}
        <a href="/" className="flex items-center gap-2" aria-label="На главную">
          <img src="/img/logo.svg" alt="Логотип" className="w-10 h-10" />
          <span className="font-bold text-xl text-[#1A3E8A]">Гимназия <span className="font-extrabold">№9</span></span>
        </a>
        {/* Меню */}
        <nav className="flex-1 flex justify-center gap-8 text-[#1A3E8A] font-medium text-base">
          <a href="/news" className="hover:text-blue-900 transition-colors">Новости</a>
          <a href="/about" className="hover:text-blue-900 transition-colors">О школе</a>
          <a href="/people" className="hover:text-blue-900 transition-colors">Выпускники</a>
          <a href="/fund" className="hover:text-blue-900 transition-colors">Фонд</a>
          <a href="/contacts" className="hover:text-blue-900 transition-colors">Контакты</a>
        </nav>
        {/* Справа: кнопка или иконка */}
        <div>
          {isLoggedIn ? (
            <a href="/profile" aria-label="Профиль">
              <img
                src="/img/icon-people.svg"
                alt="Профиль"
                className="w-10 h-10 rounded-full bg-[#1A3E8A] p-2 hover:bg-blue-900 transition-colors"
              />
            </a>
          ) : (
            <a
              href="/login"
              className="flex items-center gap-2 bg-[#1A3E8A] text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-blue-900 transition-colors"
              aria-label="Войти"
            >
              Войти
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 