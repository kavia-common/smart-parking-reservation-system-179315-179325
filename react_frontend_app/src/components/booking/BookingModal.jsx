import React, { useState } from 'react';
import QRDisplay from './QRDisplay';
import api from '../../api/client';

export default function BookingModal({ lotId, slot, onClose }) {
  const [busy, setBusy] = useState(false);
  const [booking, setBooking] = useState(null);

  const confirm = async () => {
    setBusy(true);
    try {
      // Minimal API integration: fallback to local object if backend not ready
      const payload = { lotId, slotId: slot.id, startsAt: Date.now(), durationMins: 60 };
      try {
        const res = await api.post('/bookings', payload);
        setBooking(res.data);
      } catch {
        setBooking({ id: `local-${Date.now()}`, ...payload, qr: `BOOK|${lotId}|${slot.id}|${Date.now()}` });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>Confirm booking</h3>
        <p>Lot: <strong>{lotId}</strong></p>
        <p>Slot: <strong>{slot.label}</strong></p>
        {!booking ? (
          <div className="modal-actions">
            <button className="btn" onClick={confirm} disabled={busy}>{busy ? 'Booking...' : 'Confirm'}</button>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>Booking created!</p>
            <QRDisplay data={booking.qr || `BOOK|${booking.id}`} />
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
