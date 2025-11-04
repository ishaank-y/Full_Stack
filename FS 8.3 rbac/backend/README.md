# RBAC Backend (Express + SQLite)

## Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev   # or: npm start
```
The server defaults to `http://localhost:4000`.

### Default seeded Admin
- Email: `admin@bytexl.test`
- Password: `Admin@123`

## API
- POST `/api/auth/register` { name, email, password, role? } (role defaults to `User` unless Admin creates)
- POST `/api/auth/login` { email, password } -> { token, user }
- GET  `/api/auth/me` (auth) -> current user
- GET  `/api/users` (Admin only) -> all users
- GET  `/api/mod/tools` (Moderator or Admin) -> demo data
- GET  `/api/profile` (any authenticated) -> demo data
