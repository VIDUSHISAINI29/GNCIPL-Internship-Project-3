import React, { useEffect, useState } from "react";

export default function TicketQRCode({ bookingId }) {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    async function fetchQRCode() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/qr/${bookingId}`);
        const data = await res.json();
        setQrCode(data.qrCode);
      } catch (err) {
        console.error("Failed to load QR code", err);
      }
    }

    fetchQRCode();
  }, [bookingId]);

  if (!qrCode) return <p>Loading QR code...</p>;

  return <img src={qrCode} alt="Your Ticket QR Code" />;
}
