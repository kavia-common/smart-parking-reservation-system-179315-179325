import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ResetPassword from '../components/auth/ResetPassword';
import Profile from '../components/auth/Profile';
import { useAuth } from '../hooks/useAuth';

/** PUBLIC_INTERFACE
 * AuthRoutes manages guest vs authenticated paths for auth flows.
 */
export default function AuthRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  return (
    <Routes>
      <Route path="" element={user ? <Navigate to="/book" replace /> : <Login />} />
      <Route path="login" element={user ? <Navigate to="/book" replace /> : <Login />} />
      <Route path="register" element={user ? <Navigate to="/book" replace /> : <Register />} />
      <Route path="reset" element={user ? <Navigate to="/book" replace /> : <ResetPassword />} />
      <Route path="profile" element={user ? <Profile /> : <Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
