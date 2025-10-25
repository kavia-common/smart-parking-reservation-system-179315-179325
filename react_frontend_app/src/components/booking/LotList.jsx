import React from 'react';

export default function LotList() {
  // Placeholder list
  const lots = [{ id: 'demo-lot', name: 'Demo Lot', address: '123 Main St' }];
  return (
    <div className="card">
      <h3>Lots</h3>
      <ul className="list">
        {lots.map(l => <li key={l.id}><strong>{l.name}</strong> — {l.address}</li>)}
      </ul>
    </div>
  );
}
