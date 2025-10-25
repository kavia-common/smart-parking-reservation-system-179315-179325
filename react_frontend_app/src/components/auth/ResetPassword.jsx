import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { emailValidator } from '../../utils/validators';

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!emailValidator(email)) return;
    await resetPassword(email);
    setSent(true);
  };

  return (
    <div className="auth-card">
      <h2>Reset password</h2>
      {!sent ? (
        <form onSubmit={handleSubmit} className="form">
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <button className="btn btn-primary" type="submit">Send reset link</button>
        </form>
      ) : (
        <p>Reset email sent if an account exists for {email}.</p>
      )}
      <div className="auth-links">
        <Link to="/auth/login">Back to login</Link>
      </div>
    </div>
  );
}
