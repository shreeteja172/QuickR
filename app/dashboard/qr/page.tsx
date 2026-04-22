"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!text) return;

    try {
      const url = await QRCode.toDataURL(text);
      setQr(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        placeholder="Enter URL or text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded"
      />

      <button onClick={generateQR} className="bg-black text-white p-2 rounded">
        Generate QR
      </button>

      {qr && (
        <div className="mt-4">
          <img src={qr} alt="QR Code" />
        </div>
      )}
      {qr && (
        <a href={qr} download="qrcode.png">
          <button className="mt-2 bg-green-600 text-white p-2 rounded">
            Download QR
          </button>
        </a>
      )}
    </div>
  );
}
