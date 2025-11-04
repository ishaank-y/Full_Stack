const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export function setToken(t){ localStorage.setItem('token', t); }
export function getToken(){ return localStorage.getItem('token'); }
export function clearToken(){ localStorage.removeItem('token'); }

async function req(path, options={}){
  const headers = { 'Content-Type': 'application/json', ...(options.headers||{}) };
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(BASE + path, { ...options, headers });
  if (!res.ok){
    const err = await res.json().catch(()=>({error:`HTTP ${res.status}`}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  register: (data) => req('/api/auth/register', { method:'POST', body: JSON.stringify(data) }),
  login:    (data) => req('/api/auth/login', { method:'POST', body: JSON.stringify(data) }),
  me:       () => req('/api/auth/me'),
  users:    () => req('/api/users'),
  modTools: () => req('/api/mod/tools'),
  profile:  () => req('/api/profile')
};
