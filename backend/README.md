# Shree Library Backend

Backend API for Shree Library.

## Features
- Student registration and login
- Admin login
- JWT authentication
- MongoDB database
- 125 seat management
- Book search and book management
- Fee status
- UPI payment screenshot verification
- Library Guru AI basic chat API

## Local Setup

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Render Deployment

1. Upload this backend folder to GitHub.
2. Go to Render → New Web Service.
3. Connect GitHub repository.
4. Build Command:

```bash
npm install
```

5. Start Command:

```bash
npm start
```

6. Add environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_secret_key
FRONTEND_URL=https://shree-library.vercel.app
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@shreelibrary.in
ADMIN_PASSWORD=admin123
```

7. Deploy.

## Important API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/students/dashboard`
- `GET /api/books?q=python`
- `GET /api/seats`
- `POST /api/seats/book/:seatNumber`
- `GET /api/fees/my`
- `POST /api/payments/upi`
- `POST /api/ai/chat`

## Default Admin after seed

Email: `admin@shreelibrary.in`

Password: `admin123`

Change this in production.
