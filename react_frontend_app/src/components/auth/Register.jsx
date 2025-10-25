import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { emailValidator, passwordValidator } from '../../utils/validators';
import Loader from '../common/Loader';

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!emailValidator(email) || !passwordValidator(password)) return;
    setBusy(true);
    try {
      await register(email, password);
      navigate('/book');
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create your account</h2>
      <p className="muted">Start reserving parking slots</p>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Creating...' : 'Sign Up'}</button>
      </form>
      <div className="auth-links">
        <Link to="/auth/login">Already have an account? Login</Link>
      </div>
      {busy && <Loader />}
    </div>
  );
}
