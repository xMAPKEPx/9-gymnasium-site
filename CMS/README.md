# 9-gymnasium-strapi

## Описание

Это backend-проект на [Strapi](https://strapi.io/) для сайта "Девятка" (9-й гимназии), с поддержкой:
- Кастомных API для воспоминаний, посещений, новостей, годов и эпох
- Email-уведомлений через Unisender
- Обязательной загрузки фото для воспоминаний
- Русской локализации админ-панели

---

## Быстрый старт

### Установка зависимостей

```bash
npm install
# или
yarn install
```

### Запуск в режиме разработки

```bash
npm run develop
# или
yarn develop
```

### Сборка админ-панели

```bash
npm run build
# или
yarn build
```

### Запуск в production

```bash
npm run start
# или
yarn start
```

---

## Переменные окружения

Для корректной работы email-уведомлений и формирования ссылок на файлы, настройте переменные в `.env`:

```
HOST=localhost
PORT=1337
PROTOCOL=http
UNISENDER_API_KEY=...           # API-ключ Unisender
UNISENDER_ADMIN_EMAIL=...       # Email администратора
UNISENDER_SENDER_NAME=...       # Имя отправителя
UNISENDER_SENDER_EMAIL=...      # Email отправителя
UNISENDER_LIST_ID=...           # ID списка Unisender
```

---

## Структура проекта

- `src/api/` — кастомные API (memory, visit, news, timeline, year, home-page, endowment)
- `src/components/` — компоненты для контента
- `src/utils/` — шаблоны email и интеграция с Unisender
- `config/` — настройки Strapi
- `public/uploads/` — загруженные файлы

---

## Email-уведомления

- Для новых воспоминаний и посещений отправляются письма админу через Unisender.
- В письмах ссылки на файлы формируются с абсолютным адресом (HOST:PORT).
- Для воспоминаний фото обязательно!

---

## Локализация

- Админ-панель Strapi настроена на русский язык (`src/admin/app.tsx`).

---

## Полезные ссылки

- [Документация Strapi](https://docs.strapi.io/)
- [Unisender API](https://www.unisender.com/ru/support/api/)
- [Strapi Community](https://forum.strapi.io/)

---

<sub>Проект поддерживается для нужд сайта "Девятка". Все вопросы — к разработчику.</sub>
