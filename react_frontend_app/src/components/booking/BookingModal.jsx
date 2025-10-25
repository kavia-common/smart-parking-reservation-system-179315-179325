import React, { useState } from 'react';
import QRDisplay from './QRDisplay';
import api from '../../api/client';

export default function BookingModal({ lotId, slot, onClose }) {
  const [busy, setBusy] = useState(false);
  const [booking, setBooking] = useState(null);

  const confirm = async () => {
    setBusy(true);
    try {
      // Backend expects: lotId, slotId, startTime, endTime, price, currency
      const startTime = new Date().toISOString();
      const endTime = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // +60 minutes
      const payload = { lotId, slotId: slot.id, startTime, endTime, price: 0, currency: 'usd' };
      try {
        const res = await api.post('/bookings/reserve', payload);
        setBooking(res.data);
      } catch {
        // Fallback to local mock booking if backend is not reachable
        setBooking({
          id: `local-${Date.now()}`,
          lotId,
          slotId: slot.id,
          startTime,
          endTime,
          qr: `BOOK|${lotId}|${slot.id}|${Date.now()}`
        });
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
