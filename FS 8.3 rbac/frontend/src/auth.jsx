import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, setToken, clearToken, getToken } from './api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getToken();
    if (!t){ setLoading(false); return; }
    api.me().then(d => setUser(d.user)).catch(()=>clearToken()).finally(()=>setLoading(false));
  }, []);

  async function login(email, password){
    const d = await api.login({ email, password });
    setToken(d.token); setUser(d.user);
  }
  async function register(name, email, password){
    const d = await api.register({ name, email, password });
    setToken(d.token); setUser(d.user);
  }
  function logout(){ clearToken(); setUser(null); }

  return <AuthCtx.Provider value={{ user, loading, login, register, logout }}>
    {children}
  </AuthCtx.Provider>
}
