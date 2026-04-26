"use client";

import axios from "axios";
import { useState } from "react";

type QRResponse = {
  message: string; 
};

const Page = () => {
  const [result, setResult] = useState<string>("");

  const fetchdata = async () => {
    try {
      const res = await axios.get<QRResponse>("/api/qrcodes");

      console.log(res.data); 

      setResult(res.data.message); 
    } catch (err) {
      console.error(err);
      setResult("Error fetching data");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={fetchdata}>Fetch Data</button>

      <div style={{ marginTop: "20px" }}>
        {result}
      </div>
    </div>
  );
};

export default Page;