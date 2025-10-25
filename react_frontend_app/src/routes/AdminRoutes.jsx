import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import LotsCRUD from '../components/admin/LotsCRUD';
import SlotsCRUD from '../components/admin/SlotsCRUD';
import BookingsTable from '../components/admin/BookingsTable';
import UsersTable from '../components/admin/UsersTable';
import { useAuth } from '../hooks/useAuth';

/** PUBLIC_INTERFACE
 * Admin routes. This example treats any logged-in user as admin placeholder.
 * Replace role checks with custom claims or backend check as needed.
 */
export default function AdminRoutes() {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (!isAdmin) return <Navigate to="/book" replace />;

  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="lots" element={<LotsCRUD />} />
      <Route path="slots" element={<SlotsCRUD />} />
      <Route path="bookings" element={<BookingsTable />} />
      <Route path="users" element={<UsersTable />} />
    </Routes>
  );
}
