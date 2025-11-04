import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Login(){
  const nav = useNavigate();
  const { login } = useAuth();
  const [email,setEmail] = useState('admin@bytexl.test');
  const [password,setPassword] = useState('Admin@123');
  const [err,setErr] = useState('');

  async function onSubmit(e){
    e.preventDefault(); setErr('');
    try { await login(email, password); nav('/'); }
    catch(e){ setErr(e.message); }
  }
  return <form onSubmit={onSubmit} style={{ maxWidth:360, margin:'2rem auto', display:'grid', gap:8 }}>
    <h3>Login</h3>
    {err && <div style={{color:'crimson'}}>{err}</div>}
    <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
    <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
    <button>Login</button>
  </form>;
}
