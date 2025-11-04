# ByteXL: Dockerize a React Application (Multi-Stage Build)

A super-simple React app built with Vite and dockerized using a **multi‑stage** Dockerfile:
- **Stage 1 (builder):** Uses `node:18-alpine` to install dependencies and run `vite build`.
- **Stage 2 (runtime):** Uses `nginx:alpine` to serve the static files from `dist/`.

## Project Structure
```
bytexl-react-docker/
├─ Dockerfile
├─ nginx.conf
├─ .dockerignore
├─ .gitignore
├─ package.json
├─ vite.config.js
├─ index.html
└─ src/
   ├─ App.jsx
   └─ main.jsx
```

## Local Development (Optional)
If you want to run it locally (without Docker):
```bash
npm install
npm run dev
```
Then open the printed URL (usually `http://localhost:5173`).

## Build & Run with Docker
Build the image:
```bash
docker build -t bytexl-react .
```

Run the container (serve on port 8080):
```bash
docker run --rm -p 8080:80 bytexl-react
```
Open `http://localhost:8080` to see the app.

## Why Multi-Stage?
- Smaller final image (only Nginx + static assets).
- Faster, cleaner deploys.

## Notes for Submission
- Push this folder to your GitHub repository.
- Include this `README.md` so reviewers can run your app quickly.
- The app is intentionally minimal for an “Easy” task.