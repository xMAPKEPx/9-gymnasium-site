#!/bin/sh
set -e

# Функция для ожидания готовности PostgreSQL
wait_for_postgres() {
    echo "Ожидание готовности PostgreSQL..."
    for i in $(seq 1 30); do
        if pg_isready -h postgres -U strapi -d strapi > /dev/null 2>&1; then
            echo "PostgreSQL готов!"
            return 0
        fi
        echo "Попытка $i/30..."
        sleep 2
    done
    echo "Ошибка: PostgreSQL не готов за 60 секунд"
    return 1
}

# Ждем готовности PostgreSQL
wait_for_postgres

# Запускаем Strapi в development режиме на порту 1337
echo "Запуск Strapi на порту 1337..."
cd /app/cms && HOST=0.0.0.0 npm run develop &
STRAPI_PID=$!

# Ждем немного для запуска Strapi
sleep 15

# Запускаем frontend на порту 3000
echo "Запуск frontend на порту 3000..."
cd /app/frontend && serve -s dist -l 3000 &
FRONTEND_PID=$!

# Ждем завершения процессов
wait $STRAPI_PID $FRONTEND_PID 