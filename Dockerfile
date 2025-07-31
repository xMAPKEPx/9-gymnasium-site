# Простой Dockerfile для продакшена (без сборки Strapi)
FROM node:20-alpine

WORKDIR /app

# Увеличиваем память для Node.js
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Устанавливаем зависимости
RUN apk add --no-cache python3 make g++ postgresql-client

# Копируем package.json для установки зависимостей
COPY CMS/package*.json ./cms/
COPY Front/package*.json ./frontend/

# Устанавливаем зависимости
WORKDIR /app/cms
RUN npm install

WORKDIR /app/frontend
RUN npm install

# Копируем исходный код
WORKDIR /app
COPY CMS/ ./cms/
COPY Front/ ./frontend/

# Копируем скрипт запуска
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Устанавливаем serve для frontend
WORKDIR /app/frontend
RUN npm install -g serve
RUN npm run build

# Создаем директории
WORKDIR /app
RUN mkdir -p public/uploads

# Открываем порты
EXPOSE 3000 1337

# Запускаем скрипт
CMD ["/app/start.sh"] 