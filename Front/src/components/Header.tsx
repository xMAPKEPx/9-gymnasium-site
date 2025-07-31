const Header = () => {
  // Замените на свою логику авторизации

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Логотип */}
        <a href="/" className="flex items-center gap-2" aria-label="На главную">
          <img src="/img/logo-header.svg" alt="Логотип" className="w-10 h-10" />
          <span className="font-bold text-xl text-[#455A54]">Гимназия <span className="font-extrabold">№9</span></span>
        </a>
        {/* Меню */}
        <nav className="flex-1 flex justify-center gap-8 text-[#455A54] font-medium text-base">
          <a href="/timeline" className="hover:text-blue-900 transition-colors">Лента Времени</a>
          <a href="/people" className="hover:text-blue-900 transition-colors">Люди</a>
          <a href="/news" className="hover:text-blue-900 transition-colors">Новости</a>
          <a href="/association" className="hover:text-blue-900 transition-colors">Фонд</a>
          <a href="/contacts" className="hover:text-blue-900 transition-colors">Контакты</a>
        </nav>
        {/* Справа: кнопка 'Личный кабинет' */}
        <div>
          <a
            href="/profile"
            className="flex items-center gap-2 bg-[#5B7B70] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors"
            aria-label="Личный кабинет"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.125A2.625 2.625 0 017.125 16.5h9.75a2.625 2.625 0 012.625 2.625v1.125" />
            </svg>
            Личный кабинет
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 