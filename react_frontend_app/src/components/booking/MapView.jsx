import React, { useState } from 'react';
import SlotGrid from './SlotGrid';
import BookingModal from './BookingModal';
import useRealtimeSlots from '../../hooks/useRealtimeSlots';

export default function MapView() {
  const [selectedLotId, setSelectedLotId] = useState('demo-lot');
  const { slots, loading } = useRealtimeSlots(selectedLotId);
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Find a parking slot</h2>
        <select value={selectedLotId} onChange={e=>setSelectedLotId(e.target.value)}>
          <option value="demo-lot">Demo Lot</option>
        </select>
      </div>
      <SlotGrid slots={slots} loading={loading} onSelect={setSelectedSlot} />
      {selectedSlot && (
        <BookingModal lotId={selectedLotId} slot={selectedSlot} onClose={()=>setSelectedSlot(null)} />
      )}
    </div>
  );
}
