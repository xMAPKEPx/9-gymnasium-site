FROM node:20-alpine

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV NODE_ENV=production

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN npm run build

RUN mkdir -p public/uploads

EXPOSE 1337

CMD ["npx", "strapi", "start"]