import React from 'react';
import { useUI } from '../../context/UIContext';

export default function Toast() {
  const { toasts, removeToast } = useUI();
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type || 'info'}`} onClick={() => removeToast(t.id)}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
