import React from 'react';

export default function BookingsTable() {
  return (
    <div className="card">
      <h3>Bookings</h3>
      <table className="table">
        <thead><tr><th>ID</th><th>Lot</th><th>Slot</th><th>Start</th></tr></thead>
        <tbody><tr><td colSpan="4" className="muted">No data</td></tr></tbody>
      </table>
    </div>
  );
}
