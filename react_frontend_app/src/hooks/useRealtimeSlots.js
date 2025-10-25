import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

/** PUBLIC_INTERFACE
 * Subscribes to real-time slot availability for a given lot.
 * Falls back to mocked data if Firestore subscription fails.
 */
export default function useRealtimeSlots(lotId) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    let unsub = null;
    async function sub() {
      try {
        const q = query(collection(db, 'slots'), where('lotId', '==', lotId));
        unsub = onSnapshot(q, snap => {
          const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setSlots(items.map((it, idx) => ({ id: it.id, label: it.label || `S${idx+1}`, available: it.available ?? true })));
          setLoading(false);
        }, () => {
          // On error, fallback
          setSlots(mockSlots());
          setLoading(false);
        });
      } catch {
        setSlots(mockSlots());
        setLoading(false);
      }
    }
    sub();
    return ()=> { if (unsub) unsub(); };
  }, [lotId]);

  return { slots, loading };
}

function mockSlots() {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: `mock-${i+1}`,
    label: `S${i+1}`,
    available: Math.random() > 0.3
  }));
}
