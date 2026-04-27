"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function QRDetail() {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string;
  const [newlink, setNewlink] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["qr", id],
    queryFn: async () => {
      const res = await axios.get(`/api/qrcodes/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (newlink: string) => {
      const res = await axios.put(`/api/qrcodes/${id}`, {
        link: newlink,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qr", id] });
    },
  });
  const updateData = () => {
    mutation.mutate(newlink);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>QR not found</p>;
  const isValid = newlink.trim() !== "";
  return (
    <div className="p-6">
      <Image src={data.image} width={200} height={200} alt={"QR"} />
      <p className="mt-4">{data.data}</p>
      <a href={data.data} target="_blank" className="text-blue-500 underline">
        Open Link
      </a>
      <input
        type="text"
        value={newlink}
        onChange={(e) => setNewlink(e.target.value)}
        placeholder="Enter new link"
        className="border p-2 mt-4"
        required
      />
      <button
        onClick={updateData}
        disabled={!isValid || mutation.isPending}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update
      </button>
    </div>
  );
}
