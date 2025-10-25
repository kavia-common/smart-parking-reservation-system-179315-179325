import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="card">
      <h2>Profile</h2>
      <div className="grid">
        <div><strong>Email:</strong></div>
        <div>{user?.email}</div>
        <div><strong>UID:</strong></div>
        <div style={{ wordBreak: 'break-all' }}>{user?.uid}</div>
      </div>
    </div>
  );
}
