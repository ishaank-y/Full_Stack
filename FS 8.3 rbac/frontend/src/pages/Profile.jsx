import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Profile(){
  const [profile,setProfile] = useState(null);
  const [err,setErr] = useState('');
  useEffect(()=>{
    api.profile().then(d=>setProfile(d.profile)).catch(e=>setErr(e.message));
  },[]);
  return <div style={{padding:'1rem'}}>
    <h3>My Profile</h3>
    {err && <div style={{color:'crimson'}}>{err}</div>}
    {profile && <pre>{JSON.stringify(profile,null,2)}</pre>}
  </div>;
}
