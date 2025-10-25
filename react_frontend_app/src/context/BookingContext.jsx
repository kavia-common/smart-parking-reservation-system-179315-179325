import React, { createContext, useContext, useState } from 'react';

const BookingCtx = createContext(null);

// PUBLIC_INTERFACE
export function BookingProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);

  const addToHistory = (b) => setHistory((h)=>[b, ...h]);

  return (
    <BookingCtx.Provider value={{ current, setCurrent, history, addToHistory }}>
      {children}
    </BookingCtx.Provider>
  );
}

// PUBLIC_INTERFACE
export function useBooking() {
  return useContext(BookingCtx);
}
