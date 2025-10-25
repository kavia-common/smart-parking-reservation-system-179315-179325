import React from 'react';

export default function UsersTable() {
  return (
    <div className="card">
      <h3>Users</h3>
      <table className="table">
        <thead><tr><th>UID</th><th>Email</th></tr></thead>
        <tbody><tr><td colSpan="2" className="muted">No data</td></tr></tbody>
      </table>
    </div>
  );
}
