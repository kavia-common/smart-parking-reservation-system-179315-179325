import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} SmartParking</div>
      <div className="footer-links">
        <a href="#" rel="noreferrer">Privacy</a>
        <a href="#" rel="noreferrer">Terms</a>
      </div>
    </footer>
  );
}
