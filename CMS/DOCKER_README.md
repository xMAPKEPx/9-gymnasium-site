# Docker для Strapi проекта

## Описание

Этот проект настроен для работы с Docker и включает в себя:
- Многоэтапный Dockerfile для оптимизации размера образа
- Docker Compose для запуска с PostgreSQL базой данных
- Настройки безопасности и производительности

## Быстрый старт

### 1. Сборка и запуск с Docker Compose

```bash
# Собрать и запустить все сервисы
docker-compose up -d

# Посмотреть логи
docker-compose logs -f strapi

# Остановить сервисы
docker-compose down
```

### 2. Только сборка образа

```bash
# Собрать Docker образ
docker build -t strapi-app .

# Запустить контейнер
docker run -p 1337:1337 --env-file .env strapi-app
```

## Переменные окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```env
# База данных
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
DATABASE_SSL=false

# Strapi
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Безопасность (замените на свои значения)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
```

## Структура Dockerfile

### Этапы сборки:

1. **base** - Базовый образ с Node.js 18 Alpine
2. **deps** - Установка production зависимостей
3. **builder** - Сборка приложения
4. **production** - Финальный образ с собранным приложением

### Особенности:

- Многоэтапная сборка для уменьшения размера образа
- Безопасность: приложение запускается от непривилегированного пользователя
- Оптимизация: удаление ненужных зависимостей после сборки
- Кэширование слоев Docker для ускорения повторных сборок

## Полезные команды

```bash
# Пересобрать образ
docker-compose build --no-cache

# Запустить только базу данных
docker-compose up postgres

# Подключиться к контейнеру
docker-compose exec strapi sh

# Посмотреть использование ресурсов
docker stats

# Очистить неиспользуемые образы
docker system prune -a
```

## Проблемы и решения

### Проблема: Ошибка подключения к базе данных
**Решение:** Убедитесь, что PostgreSQL контейнер запущен и переменные окружения корректны.

### Проблема: Ошибки прав доступа к uploads
**Решение:** Проверьте права доступа к папке `./public/uploads` на хосте.

### Проблема: Медленная сборка
**Решение:** Используйте Docker BuildKit: `DOCKER_BUILDKIT=1 docker-compose build`

## Продакшн рекомендации

1. **Безопасность:**
   - Измените все секретные ключи в переменных окружения
   - Используйте внешнюю базу данных
   - Настройте SSL/TLS

2. **Производительность:**
   - Используйте reverse proxy (nginx)
   - Настройте кэширование
   - Мониторьте ресурсы

3. **Мониторинг:**
   - Настройте логирование
   - Добавьте health checks
   - Используйте Docker Swarm или Kubernetes для оркестрации 