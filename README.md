# CifraReactPractice

Итоговая работа

# CifraReactPractice

Итоговая работа
📌 Оглавление
Функциональность
Технологии
Запуск проекта
Тестирование
Демо
Лицензия

✨ Функциональность
✅ Бесконечная лента – загрузка новостей при скролле
✅ Категории – бизнес, технологии, спорт и др.
✅ Кеширование – TanStack Query для хранения данных
✅ Фейковые данные – показ при ошибках API
✅ Адаптивный UI – PandaCSS для стилей
✅ Оптимизация – виртуальный скролл (если подключен)

🛠 Технологии
Категория: Технологии
Фронтенд: React 18, TypeScript, Vite
Стили: PandaCSS (CSS-in-JS)
Состояние: Zustand (UI) + TanStack Query (API)
API: Axios + MSW (моки)
Тесты: Jest, Cypress, MSW

🚀 Запуск проекта

1. Клонирование репозитория
   git clone https://github.com/tauren81/CifraReactPractice.git
   cd newsfeed-app

2. Установка зависимостей
   npm install

# или

yarn install

2. Установка зависимостей
   npm run dev

# или

yarn dev

3. Запуск в режиме разработки
   npm run dev

# или

yarn dev

Откройте http://localhost:3000 в браузере

4. Сборка для production
   npm run build

# или

yarn build

5. Запуск сервера для production-сборки
   npm run preview

# или

yarn preview

🧪 Тестирование

1. Юнит-тесты (Jest)
   npm test

# или

yarn test

2. E2E-тесты (Cypress)
   bash
   npm run cypress:open # GUI-режим
   npm run cypress:run # CLI-режим

3. Компонентные тесты
   bash
   npm run cypress:ct # Тестирование React-компонентов

🎥 Демо
Demo GIF (замените на реальное демо, если есть)

👉 Live-демо: https://deploy-preview-5--shiny-starlight-625b64.netlify.app
https://tauren81.github.io/CifraReactPractice/

📜 Лицензия
MIT License.

📌 Дополнительно
🔹 Используйте .env для API-ключа:
VITE_NEWS_API_KEY=your_api_key_here

🔹 Фичи в разработке:
Офлайн-режим (Service Workers)
Персонализация новостей
Темная тема
