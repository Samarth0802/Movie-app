# 🎬 CineScope Backend

Backend API for **CineScope – Movie Discovery Platform**.
This service powers authentication, movie discovery using **TMDB**, admin movie management, favorites, and watch history.

The backend is built using **Node.js, Express, MongoDB, JWT authentication, and Redis**.

---

# 🚀 Features

## 🔐 Authentication

* User registration
* User login
* Logout with Redis token blacklist
* JWT authentication via cookies
* Get current logged-in user

## 👨‍💼 Admin Panel

Admin-only APIs for:

* View all users
* Ban users
* Delete users
* Add movies
* Edit movie details
* Delete movies

## 🎬 Movie Discovery (TMDB Integration)

The backend fetches movie data dynamically from **TMDB API**.

Available endpoints:

* Trending Movies
* Popular Movies
* Upcoming Movies
* TV Shows
* Actors / People
* Search Movies
* Search TV Shows
* Movie Details
* Movie Trailer

## ❤️ Favorites System

Users can save movies to their favorites.

* Add to favorites
* Remove from favorites
* View favorite movies

## ⏱ Watch History

The system tracks movies a user has watched.

* Add movie to history
* Get watch history

---

# 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Redis
* Multer (image upload)
* Axios (TMDB API requests)
* Express Validator

---

# 📁 Project Structure

```
Backend
│
├── src
│
│   ├── config
│   │     db.js                # MongoDB connection
│   │     cache.js             # Redis connection
│
│   ├── controllers
│   │     auth.controller.js
│   │     admin.controller.js
│   │     movie.controller.js
│   │     favorite.controller.js
│   │     history.controller.js
│
│   ├── middleware
│   │     auth.middleware.js
│   │     admin.middleware.js
│   │     error.middleware.js
│   │     multer.middleware.js
│
│   ├── models
│   │     auth.model.js
│   │     admin.movie.model.js
│   │     favorite.model.js
│   │     history.model.js
│
│   ├── routes
│   │     auth.routes.js
│   │     admin.routes.js
│   │     movie.routes.js
│   │     favorite.routes.js
│   │     history.routes.js
│
│   ├── services
│   │     tmdb.service.js      # TMDB API configuration
│
│   └── validators
│         auth.validator.js
│
├── server.js                  # Entry point
├── app.js                     # Express configuration
├── .env                       # Environment variables
└── package.json
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```
PORT=3000
NODE_ENV = developement
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

REDIS_HOST=YOUR_REDIS_HOST
REDIS_PORT=YOUR_REDIS_PORT
REDIS_PASSWORD=YOUR_REDIS PASSWORD

TMDB_TOKEN=your_tmdb_read_access_token
IMAGE_SERVICE_TOKEN = IMAGE_TOKEN
```

---

# ▶️ Installation

Clone the repository:

```
git clone https://github.com/Samarth0802/Movie-app.git
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

# 🔑 Authentication Routes

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/user
```

---

# 🎬 Movie Routes

```
GET /api/movies/getAll
GET /api/movies/getmovie
GET /api/movies/trending
GET /api/movies/popular
GET /api/movies/upcoming
GET /api/movies/tvShows
GET /api/movies/popular/person
GET /api/movies/:id
GET /api/movies/:id/video
GET /api/movies/search/tvShows
```

---

# 👨‍💼 Admin Routes

```
GET    /admin/users
DELETE /admin/user/:id
PUT    /admin/ban/:id

POST   /admin/movie
PUT    /admin/movie/:id
DELETE /admin/movie/:id
```

---

# ❤️ Favorites Routes

```
POST   /api/favorites/:movieId
GET   /api/favorites
DELETE /api/favorites/:movieId
```

---

# ⏱ History Routes

```
POST /api/history
GET  /api/history
```

---

# 🔐 Security Features

* Password hashing with **bcrypt**
* **JWT authentication**
* **Redis token blacklist**
* Role-based authorization
* Centralized error handling

---
