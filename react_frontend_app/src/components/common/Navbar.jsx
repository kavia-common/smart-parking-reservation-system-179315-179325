import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUI } from '../../context/UIContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useUI();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="brand" to="/">SmartParking</Link>
        <NavLink to="/book" className="nav-link">Book</NavLink>
        {user && <NavLink to="/book/history" className="nav-link">History</NavLink>}
        {isAdmin && <NavLink to="/admin" className="nav-link">Admin</NavLink>}
      </div>
      <div className="nav-right">
        <button className="btn btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {!user && (
          <>
            <NavLink className="btn" to="/auth/login">Login</NavLink>
            <NavLink className="btn btn-secondary" to="/auth/register">Sign Up</NavLink>
          </>
        )}
        {user && (
          <div className="user-actions">
            <NavLink className="btn btn-ghost" to="/auth/profile">{user.email || 'Profile'}</NavLink>
            <button
              className="btn btn-danger"
              onClick={async () => { await logout(); navigate('/auth/login'); }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
