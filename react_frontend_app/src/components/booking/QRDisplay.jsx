import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRDisplay({ data }) {
  return (
    <div className="qr-wrapper">
      <QRCodeCanvas value={data} size={180} includeMargin />
      <div className="muted small" style={{ marginTop: 8, wordBreak: 'break-all' }}>{data}</div>
    </div>
  );
}
