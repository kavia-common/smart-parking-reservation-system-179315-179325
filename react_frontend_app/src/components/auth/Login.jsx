import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { emailValidator, passwordValidator } from '../../utils/validators';
import Loader from '../common/Loader';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!emailValidator(email) || !passwordValidator(password)) return;
    setBusy(true);
    try {
      await login(email, password);
      navigate('/book');
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome back</h2>
      <p className="muted">Login to reserve your spot</p>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Signing in...' : 'Login'}</button>
      </form>
      <button className="btn btn-ghost" onClick={async ()=>{ setBusy(true); try { await loginWithGoogle(); navigate('/book'); } catch(e){ alert(e.message);} finally{ setBusy(false);} }}>
        Continue with Google
      </button>
      <div className="auth-links">
        <Link to="/auth/register">Create account</Link>
        <Link to="/auth/reset">Forgot password?</Link>
      </div>
      {busy && <Loader />}
    </div>
  );
}
