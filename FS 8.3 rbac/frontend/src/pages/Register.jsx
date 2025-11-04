import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Register(){
  const nav = useNavigate();
  const { register } = useAuth();
  const [name,setName] = useState('New User');
  const [email,setEmail] = useState('user@example.com');
  const [password,setPassword] = useState('User@123');
  const [err,setErr] = useState('');

  async function onSubmit(e){
    e.preventDefault(); setErr('');
    try { await register(name, email, password); nav('/'); }
    catch(e){ setErr(e.message); }
  }
  return <form onSubmit={onSubmit} style={{ maxWidth:360, margin:'2rem auto', display:'grid', gap:8 }}>
    <h3>Register</h3>
    {err && <div style={{color:'crimson'}}>{err}</div>}
    <input placeholder="name" value={name} onChange={e=>setName(e.target.value)} />
    <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
    <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
    <button>Create account</button>
  </form>;
}
