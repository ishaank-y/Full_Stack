import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <nav style={{ display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd' }}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/moderator">Moderator</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <span style={{ marginLeft:'auto' }}>Hi, {user.name} ({user.role})</span>}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
