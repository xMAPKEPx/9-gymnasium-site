# Гимназия №9 - Сайт

Сайт гимназии №9 с информацией о школе, новостях, людях и эндаумент-фонде.

## Технологии

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Разработка

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
```

### Предварительный просмотр сборки
```bash
npm run preview
```

## Docker

### Вариант 1: Nginx (рекомендуется для продакшена)

#### Сборка образа
```bash
docker build -t gymnasium-site .
```

#### Запуск контейнера
```bash
docker run -p 3000:80 gymnasium-site
```

#### Использование Docker Compose
```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f
```

### Вариант 2: Vite Preview (для разработки и тестирования)

#### Сборка образа
```bash
docker build -f Dockerfile.preview -t gymnasium-site-preview .
```

#### Запуск контейнера
```bash
docker run -p 4173:4173 gymnasium-site-preview
```

#### Использование Docker Compose
```bash
# Запуск
docker-compose -f docker-compose.preview.yml up -d

# Остановка
docker-compose -f docker-compose.preview.yml down

# Просмотр логов
docker-compose -f docker-compose.preview.yml logs -f
```

## Структура проекта

```
src/
├── components/     # React компоненты
├── pages/         # Страницы приложения
├── types/         # TypeScript типы
├── api/           # API функции
├── icons/         # SVG иконки
└── utils.ts       # Утилиты
```

## API

Приложение использует Strapi CMS для получения данных:
- Новости
- Люди гимназии
- Эндаумент-фонд
- Лента времени

## Роутинг

- `/` - Главная страница
- `/timeline` - Лента времени
- `/people` - Люди гимназии
- `/news` - Все новости
- `/news/:id` - Отдельная новость
- `/association` - Эндаумент-фонд
