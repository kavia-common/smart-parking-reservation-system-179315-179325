import React, { createContext, useContext, useMemo, useState } from 'react';

const UICtx = createContext(null);

// PUBLIC_INTERFACE
export function UIProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [toasts, setToasts] = useState([]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const addToast = (message, type='info') => {
    const id = Date.now() + Math.random();
    setToasts(arr => [...arr, { id, message, type }]);
    setTimeout(()=> removeToast(id), 3500);
  };
  const removeToast = (id) => setToasts(arr => arr.filter(t => t.id !== id));

  const value = useMemo(()=>({ theme, toggleTheme, toasts, addToast, removeToast }), [theme, toasts]);

  return <UICtx.Provider value={value}>{children}</UICtx.Provider>;
}

// PUBLIC_INTERFACE
export function useUI() {
  /** Access UI context for theming and toasts */
  return useContext(UICtx);
}
