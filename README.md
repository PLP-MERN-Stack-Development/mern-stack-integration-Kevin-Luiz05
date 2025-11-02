# MERN Blog — PLP Africa Week 4

## Overview
Full MERN blog application with posts, categories, comments, user auth, image uploads, pagination & search.

## Run locally
### Server
1. cd server
2. copy `.env.example` -> `.env` and fill values (MONGO_URI, JWT_SECRET)
3. npm install
4. npm run dev

### Client
1. cd client
2. npm install
3. npm run dev

## API docs (high level)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts (protected, form-data: featuredImage)
- PUT /api/posts/:id (protected)
- DELETE /api/posts/:id (protected)
- GET /api/categories
- POST /api/categories (protected)
- POST /api/posts/:id/comments

## Screenshots
![](./file:///C:/Users/princ/Power%20Learn%20Project%20PLP%20Africa/Full%20Stack%20Development%20MERN%20Specialization/Week4_MERN%20Stack/MERN-blog/Deployment%20Screenshots/Screenshot%202025-11-02%20222331.png)
![](./file:///C:/Users/princ/Power%20Learn%20Project%20PLP%20Africa/Full%20Stack%20Development%20MERN%20Specialization/Week4_MERN%20Stack/MERN-blog/Deployment%20Screenshots/Screenshot%202025-11-02%20222301.png)
![](./file:///C:/Users/princ/Power%20Learn%20Project%20PLP%20Africa/Full%20Stack%20Development%20MERN%20Specialization/Week4_MERN%20Stack/MERN-blog/Deployment%20Screenshots/Screenshot%202025-11-02%20222402.png)
![](./file:///C:/Users/princ/Power%20Learn%20Project%20PLP%20Africa/Full%20Stack%20Development%20MERN%20Specialization/Week4_MERN%20Stack/MERN-blog/Deployment%20Screenshots/Screenshot%202025-11-02%20222541.png)

## Deployment
- Client deployed to: <client-url>
- Server deployed to: <server-url>
