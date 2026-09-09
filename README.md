
# 📰 Youth Brain News

**Youth Brain News (युथ ब्रेन न्युज)** is a modern news portal built with the **MERN stack**.  
It provides a clean, responsive platform for publishing, managing, and reading news articles.

> **सधैं सत्य • सधैं अगाडि**

---

## 🚀 Features

### 🌐 Public Website

- 🏠 Modern homepage
- 📰 Latest published news
- 🔥 Trending news
- ⭐ Featured news
- 📂 News categories
- 🔎 News search
- 📄 News details page
- 🔗 SEO-friendly news URLs using slugs
- 👁️ News view counter
- 📱 Fully responsive design
- 📅 Nepali date formatting
- 🕐 Live time display
- 🚨 Breaking news ticker
- 📤 Social sharing
- 🔗 Social media links

### 🔐 Authentication

- User login
- JWT authentication
- Access token
- Refresh token
- HTTP-only cookies
- Protected routes
- Logout
- Current user authentication
- Role-based access control

### 🛠️ Admin Features

- Dashboard
- Create news
- Edit news
- Delete news
- Publish / draft news
- Feature / unfeature news
- News management
- Category management
- User management
- Search and filtering
- Pagination
- Account status management

### 📂 Category Management

- Create categories
- Update categories
- Delete categories
- Activate / deactivate categories
- Category descriptions
- Category images
- Automatic category slugs
- Nepali category names supported

### 🖼️ Image Management

- Cloudinary image upload
- News thumbnails
- Category images
- Image preview
- Image replacement during update

---

# 🧑‍💻 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React
- React Icons
- Nepali Date Converter

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS
- Multer
- Cloudinary

---

 -PORT=8000

 -MONGODB_URI=your_mongodb_connection_string
 -DB_NAME=your_database_name

 -CORS_ORIGIN=http://localhost:5173

 -ACCESS_TOKEN_SECRET=your_access_token_secret
 -ACCESS_TOKEN_EXPIRY=1d

 -REFRESH_TOKEN_SECRET=your_refresh_token_secret
 -REFRESH_TOKEN_EXPIRY=10d

 -CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
 -CLOUDINARY_API_KEY=your_cloudinary_api_key
 -CLOUDINARY_API_SECRET=your_cloudinary_api_secret

---

# 📁 Project Structure

```text
Youth-Brain-News/
│
├── backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── db/
│   │   └── app.js
│   │
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md

 ## ---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.