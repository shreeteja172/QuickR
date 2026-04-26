"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  const [resu, setResu] = useState<any[]>([]);
  const fetchqr = async () => {
    const res = await axios.get("/api/qrcodes");
    setResu(res.data);
  };

  const { data } = useQuery({
    queryKey: ["qr"],
    queryFn: fetchqr,
  });
  return (
    <div>
      <div>
        {resu.map((qr) => (
          <Link key={qr.id} href={`/dashboard/history/${qr.id}`}>
            <div className="border p-3 cursor-pointer">
              <Image
                src={qr.image}
                alt={qr.data ? `QR code for ${qr.data}` : "QR code image"}
                width={120}
                height={120}
                unoptimized
              />
              <p>{qr.data}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
