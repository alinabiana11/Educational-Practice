# Telran Garden Shop

Полноценное приложение интернет-магазина для садоводов.

---

## Структура проекта

.
├── backend # Серверная часть (Node.js, Express, API, БД)
├── frontend
│ └── terlan-front
│ └── src
│ ├── App.jsx
│ ├── app
│ ├── assets # Изображения (лого, иконки, товары и др.)
│ ├── components # Переиспользуемые React-компоненты (Header, ContactSection, CartButton и др.)
│ ├── index.css # Глобальные стили
│ ├── index.js # Точка входа фронта
│ ├── pages # Страницы (Home, CategoryPage, ProductPage, CartPage, NotFound и др.)
│ ├── store # Redux Toolkit (cartSlice.js и т.п.)
│ └── style.css # (если используешь, дополнительные стили)
├── README.md # Описание проекта



---

## Как запустить

### 1. **Бэкенд**

```bash
cd backend
npm install
npm run dev
```
Сервер поднимется на http://localhost:3333


2. Фронтенд
```bash
cd frontend/terlan-front
npm install
npm start
```
React-приложение будет доступно на http://localhost:3000