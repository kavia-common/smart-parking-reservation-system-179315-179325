import React from 'react';
import Loader from '../common/Loader';

export default function SlotGrid({ slots, loading, onSelect }) {
  if (loading) return <Loader text="Loading availability..." />;
  return (
    <div className="grid slots-grid">
      {slots.map(s => (
        <button
          key={s.id}
          disabled={!s.available}
          className={`slot ${s.available ? 'available' : 'unavailable'}`}
          onClick={() => onSelect(s)}
        >
          {s.label}
        </button>
      ))}
      {slots.length === 0 && <div className="muted" style={{ padding: 16 }}>No slots</div>}
    </div>
  );
}
