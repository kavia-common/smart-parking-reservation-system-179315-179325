import React from 'react';

export default function BookingHistory() {
  // Placeholder local history
  const history = [];
  return (
    <div className="card">
      <h3>Booking History</h3>
      {history.length === 0 ? <p className="muted">No bookings yet.</p> : (
        <ul className="list">{history.map(b => <li key={b.id}>{b.id}</li>)}</ul>
      )}
    </div>
  );
}
