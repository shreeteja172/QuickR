"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [result, setResult] = useState<any[]>([]);

  const fetchdata = async () => {
    try {
      const res = await axios.get("/api/qrcodes");
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={fetchdata}>Fetch Data</button>

      <div style={{ marginTop: "20px" }}>
        {result.map((qr) => (
          <div key={qr.id}>
            <Image
              src={qr.image}
              alt={qr.data ? `QR code for ${qr.data}` : "QR code image"}
              width={120}
              height={120}
              unoptimized
            />
            <p>{qr.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
