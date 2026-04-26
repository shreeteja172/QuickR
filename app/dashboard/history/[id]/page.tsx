"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function QRDetail() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["qr", id],
    queryFn: async () => {
      const res = await axios.get(`/api/qrcodes/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>QR not found</p>;

  return (
    <div className="p-6">
      <Image src={data.image} width={200} alt={"QR"} />
      <p className="mt-4">{data.data}</p>
      <a href={data.data} target="_blank" className="text-blue-500 underline">
        Open Link
      </a>
    </div>
  );
}
