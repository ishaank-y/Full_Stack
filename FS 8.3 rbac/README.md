# ByteXL RBAC (Admin/User/Moderator)

Full‑stack demo with:
- Backend: Node.js + Express + SQLite + JWT
- Frontend: Vite + React + React Router

## Quick Start

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev   # starts on http://localhost:4000
```
A default Admin user is seeded:
- Email: `admin@bytexl.test`
- Password: `Admin@123`

### 2) Frontend
```bash
cd ../frontend
npm install
npm run dev   # opens http://localhost:5173
```

### 3) Test Roles
- Login with the seeded Admin to view `/admin` and `/moderator` pages.
- Register a normal user via **Register** page (role defaults to `User`).
- To create a **Moderator**, call register API with an Admin token (or modify code to promote). Example with `curl`:
```bash
curl -X POST http://localhost:4000/api/auth/register   -H "Authorization: Bearer <ADMIN_JWT>"   -H "Content-Type: application/json"   -d '{"name":"Mod","email":"mod@bytexl.test","password":"Mod@123","role":"Moderator"}'
```

### GitHub Submission
Initialize Git and push:
```bash
git init
git add .
git commit -m "ByteXL RBAC (Admin/User/Moderator)"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
