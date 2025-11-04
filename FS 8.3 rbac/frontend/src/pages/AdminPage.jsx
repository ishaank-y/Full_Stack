import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function AdminPage(){
  const [users,setUsers] = useState([]);
  const [err,setErr] = useState('');
  useEffect(()=>{
    api.users().then(d=>setUsers(d.users)).catch(e=>setErr(e.message));
  },[]);
  return <div style={{padding:'1rem'}}>
    <h3>Admin Panel</h3>
    {err && <div style={{color:'crimson'}}>{err}</div>}
    <table border="1" cellPadding="6">
      <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Created</th></tr></thead>
      <tbody>
        {users.map(u => <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.created_at}</td></tr>)}
      </tbody>
    </table>
  </div>;
}
