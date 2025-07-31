# 9-гимназия - Общий Docker контейнер

Этот проект содержит общий Dockerfile для запуска Strapi CMS и React frontend в одном контейнере.

## Структура проекта

- `CMS/` - Strapi CMS приложение
- `Front/` - React frontend приложение
- `Dockerfile` - Общий Dockerfile для сборки
- `nginx.conf` - Конфигурация nginx для проксирования
- `docker-compose.yml` - Docker Compose конфигурация

## Быстрый запуск

### Подготовка

1. Создайте файл `.env` в корне проекта с переменными окружения:

```bash
# Strapi Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
DATABASE_SSL=false

# Strapi Security
JWT_SECRET=your-jwt-secret-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here

# Environment
NODE_ENV=production
```

### С использованием Docker Compose

```bash
# Сборка и запуск
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d --build
```

### С использованием Docker

```bash
# Сборка образа
docker build -t 9-gymnasium-app .

# Запуск контейнера
docker run -p 80:80 -p 1337:1337 9-gymnasium-app
```

## Доступные сервисы

После запуска будут доступны:

- **Frontend**: http://localhost:80
- **Strapi API**: http://localhost:80/api
- **Strapi Admin**: http://localhost:80/admin
- **Strapi напрямую**: http://localhost:1337
- **PostgreSQL**: localhost:5432

## Конфигурация

### Переменные окружения

Все переменные окружения настраиваются в файле `.env`. Основные переменные:

- `NODE_ENV` - Окружение (production/development)
- `DATABASE_CLIENT` - Тип базы данных (postgres)
- `DATABASE_HOST` - Хост базы данных (postgres)
- `DATABASE_PORT` - Порт базы данных (5432)
- `DATABASE_NAME` - Имя базы данных (strapi)
- `DATABASE_USERNAME` - Пользователь базы данных (strapi)
- `DATABASE_PASSWORD` - Пароль базы данных (strapi_password)
- `DATABASE_SSL` - Использование SSL (false)
- `JWT_SECRET` - Секрет для JWT токенов
- `ADMIN_JWT_SECRET` - Секрет для админ JWT токенов
- `APP_KEYS` - Ключи приложения
- `API_TOKEN_SALT` - Соль для API токенов
- `TRANSFER_TOKEN_SALT` - Соль для transfer токенов

### Volumes

- `./uploads:/app/public/uploads` - Загрузки Strapi
- `postgres_data` - Данные PostgreSQL

## Архитектура

Общий Dockerfile использует многоэтапную сборку:

1. **strapi-builder** - Сборка Strapi CMS
2. **frontend-builder** - Сборка React frontend
3. **production** - Финальный образ с nginx

Nginx настроен для:
- Проксирования API запросов к Strapi
- Обслуживания статических файлов frontend
- Обработки SPA роутинга

## Разработка

Для разработки с hot reload используйте:

```bash
# Запуск в режиме разработки
docker-compose -f docker-compose.dev.yml up --build

# Или запуск отдельных сервисов
docker-compose -f docker-compose.dev.yml up strapi
docker-compose -f docker-compose.dev.yml up frontend
```

В режиме разработки:
- Strapi будет доступен на http://localhost:1337
- Frontend будет доступен на http://localhost:3000
- Изменения в коде будут автоматически перезагружаться

## Troubleshooting

### Проблемы с портами

Если порты 80 или 1337 заняты, измените маппинг в `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Frontend на порту 8080
  - "1338:1337"  # Strapi на порту 1338
```

### Проблемы с правами доступа

Для Linux систем может потребоваться изменить права на volumes:

```bash
sudo chown -R 1000:1000 ./uploads
```

### Проблемы с PostgreSQL

Если возникают проблемы с подключением к базе данных:

```bash
# Проверка статуса PostgreSQL
docker-compose logs postgres

# Подключение к базе данных
docker-compose exec postgres psql -U strapi -d strapi

# Сброс базы данных (осторожно!)
docker-compose down -v
docker-compose up --build
```

### Проблемы с памятью при сборке

Если Strapi падает с ошибкой "JavaScript heap out of memory":

```bash
# Увеличьте память для Docker Desktop (Windows/Mac)
# В настройках Docker Desktop увеличьте Memory до 4-8 GB

# Или используйте режим разработки без сборки
docker-compose -f docker-compose.dev.yml up --build

# Если проблема остается, попробуйте очистить кэш
docker system prune -a
docker volume prune
```

### Логи

Просмотр логов:

```bash
# Все логи
docker-compose logs

# Логи конкретного сервиса
docker-compose logs app

# Логи в реальном времени
docker-compose logs -f app
``` 