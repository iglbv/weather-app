FROM node:18-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Копирование исходного кода
COPY src ./src

# Сборка приложения
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]