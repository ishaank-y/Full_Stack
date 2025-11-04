import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import ModeratorPage from './pages/ModeratorPage';
import Profile from './pages/Profile';

export default function App(){
  return <div>
    <Navbar />
    <div style={{ padding: '1rem' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={
          <ProtectedRoute roles={['User','Moderator','Admin']}>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute roles={['Admin']}>
            <AdminPage />
          </ProtectedRoute>
        } />

        <Route path="/moderator" element={
          <ProtectedRoute roles={['Moderator','Admin']}>
            <ModeratorPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  </div>
}
