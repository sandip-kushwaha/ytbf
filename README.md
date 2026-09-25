
# 📰 Youth Brain News

**Youth Brain News (युथ ब्रेन न्युज)** is a modern digital news platform built to deliver timely, reliable, and relevant news to readers in Nepal and beyond.

The platform covers **politics, society, business, technology, sports, entertainment, and other topics of public interest**, with a focus on clear, responsible, and accessible journalism.

> **सधैं सत्य • सधैं अगाडि**

---

## 🌐 Official Website

**Youth Brain News:**  
https://youthbrain.vercel.app

Visit the website to read the latest news, explore categories, discover trending stories, and stay updated with current events.

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
```
---
# 📄 License

 This project is developed and maintained for **Youth Brain News**.

 All rights reserved.

 Unauthorized copying, modification, distribution, or commercial use of this project or its source code is not permitted without prior permission from **Youth Brain News**.