import React from 'react';
import './App.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/admin.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { UIProvider, useUI } from './context/UIContext';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';

// Simple wrapper that applies theme attribute to document
function ThemeApplier({ children }) {
  const { theme } = useUI();
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return children;
}

// PUBLIC_INTERFACE
function App() {
  /** Root app component establishing providers, router, and theme.
   * - Provides Auth and Booking contexts
   * - Defines routes for auth, user, admin
   * - Applies theme via UIContext
   */
  return (
    <UIProvider>
      <ThemeApplier>
        <AuthProvider>
          <BookingProvider>
            <BrowserRouter>
              <div className="app-root">
                <Navbar />
                <main className="container">
                  <Routes>
                    <Route path="/" element={<Navigate to="/book" replace />} />
                    <Route path="/auth/*" element={<AuthRoutes />} />
                    <Route path="/book/*" element={<UserRoutes />} />
                    <Route path="/admin/*" element={<AdminRoutes />} />
                    <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
                  </Routes>
                </main>
                <Footer />
                <Toast />
              </div>
            </BrowserRouter>
          </BookingProvider>
        </AuthProvider>
      </ThemeApplier>
    </UIProvider>
  );
}

export default App;
