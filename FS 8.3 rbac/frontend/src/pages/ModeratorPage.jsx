import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function ModeratorPage(){
  const [tools,setTools] = useState([]);
  const [err,setErr] = useState('');
  useEffect(()=>{
    api.modTools().then(d=>setTools(d.tools)).catch(e=>setErr(e.message));
  },[]);
  return <div style={{padding:'1rem'}}>
    <h3>Moderator Tools</h3>
    {err && <div style={{color:'crimson'}}>{err}</div>}
    <ul>
      {tools.map(t => <li key={t.id}>{t.name} — {t.status}</li>)}
    </ul>
  </div>;
}
