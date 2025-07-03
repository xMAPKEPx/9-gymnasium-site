# 9-gymnasium-site

Веб-проект для сайта выпускников и ассоциации школы №9.

## Основные страницы
- **Главная** — навигация по разделам, новости, ресурсы, партнёры, контакты, модальные окна (авторизация, обратная связь).
- **Лента времени** — интерактивная история школы по эпохам с фото и описаниями, sticky-заголовки, автоматическое определение активной эпохи при скролле.
- **Люди девятки** — фильтры по десятилетиям и годам, выпускные фото, карточки людей, модальное окно для обратной связи.
- **Ассоциация + эндаумент** — (структура подготовлена, наполнение в будущем).

## Компоненты
- Карусели карточек (новости, товары)
- Модальные окна (авторизация, обратная связь)
- Карточки новостей, товаров, партнёров, ресурсов
- Sticky-заголовки и фильтры

## Технологии
- React + TypeScript
- Tailwind CSS (минималистичная адаптивная верстка)
- React Router DOM (роутинг)

## Текущее состояние
- Вся структура страниц и компонентов реализована
- Данные — заглушки, готово к интеграции с Strapi
- Реализованы все основные макеты и интерактивные элементы
- Навигация и модальные окна работают
- Вёрстка адаптирована под макеты, базовая адаптивность

## TODO
- Интеграция с Strapi (API для новостей, товаров, людей, фото)
- Реализация страницы "Ассоциация + эндаумент"
- Улучшение адаптивности и мобильной версии
- Реализация отправки форм

---

Для запуска:
```
npm install
npm run dev
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
