import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: ORIGIN, credentials: true }));

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// --- SQLite setup ---
const dbPath = path.join(__dirname, 'rbac.db');
const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql')).toString();
db.exec(schema, (err) => {
  if (err) console.error('Schema error:', err);
  else seedAdmin();
});

function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@bytexl.test';
  const password = process.env.SEED_ADMIN_PASSWORD || 'Admin@123';
  const name = process.env.SEED_ADMIN_NAME || 'Super Admin';

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return console.error(err);
    if (row) return; // already seeded
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)',
      [name, email, hash, 'Admin'],
      (e) => e && console.error('Seed admin failed:', e)
    );
  });
}

// --- Helpers ---
function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

// --- Routes ---
app.get('/', (_req, res) => res.json({ ok: true, service: 'RBAC API' }));

// Auth
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });
  const targetRole = role || 'User';

  // Only Admin can create non-User roles
  if (targetRole !== 'User') {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    try {
      const me = token ? jwt.verify(token, JWT_SECRET) : null;
      if (!me || me.role !== 'Admin') return res.status(403).json({ error: 'Only Admin can create elevated roles' });
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (row) return res.status(409).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)',
      [name, email, hash, targetRole],
      function (e) {
        if (e) return res.status(500).json({ error: 'Insert failed' });
        const user = { id: this.lastID, name, email, role: targetRole };
        return res.json({ user, token: signToken(user) });
      });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email, password required' });
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const publicUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    res.json({ user: publicUser, token: signToken(publicUser) });
  });
});

app.get('/api/auth/me', authRequired, (req, res) => {
  db.get('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ user: row });
  });
});

// Admin-only
app.get('/api/users', authRequired, allowRoles('Admin'), (_req, res) => {
  db.all('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ users: rows });
  });
});

// Moderator or Admin
app.get('/api/mod/tools', authRequired, allowRoles('Admin', 'Moderator'), (_req, res) => {
  res.json({
    tools: [
      { id: 1, name: 'Content Review Queue', status: 'OK' },
      { id: 2, name: 'Report Dashboard', status: 'OK' }
    ]
  });
});

// Any authenticated
app.get('/api/profile', authRequired, (req, res) => {
  res.json({ profile: { id: req.user.id, email: req.user.email, role: req.user.role } });
});

app.listen(PORT, () => console.log(`RBAC API listening on http://localhost:${PORT}`));
