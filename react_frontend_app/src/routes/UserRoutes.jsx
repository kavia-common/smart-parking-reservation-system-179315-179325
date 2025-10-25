import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MapView from '../components/booking/MapView';
import LotList from '../components/booking/LotList';
import BookingHistory from '../components/booking/BookingHistory';
import { useAuth } from '../hooks/useAuth';

/** PUBLIC_INTERFACE
 * Routes accessible by authenticated end users.
 */
export default function UserRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  return (
    <Routes>
      <Route path="" element={<MapView />} />
      <Route path="history" element={<BookingHistory />} />
      <Route path="lots" element={<LotList />} />
    </Routes>
  );
}
