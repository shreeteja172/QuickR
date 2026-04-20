"use client";

import { useState } from "react";
// import router from "next/router";
const Authbtn = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if (isAuthenticated) {
    return (
      <div>
        <button
          className="px-4 py-2 text-gray-400 hover:text-white transition"
          onClick={() => {
            setIsAuthenticated(false);
          }}
        >
          Sign Out
        </button>
        <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
          Dashboard
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        className="px-4 py-2 text-gray-400 hover:text-white transition"
        onClick={() => {
          setIsAuthenticated(true);
          // router.push("/signin");
          // router.push("/api/auth/login/google");
        }}
      >
        Sign In
      </button>
      <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
        Get Started
      </button>
    </div>
  );
};
export default Authbtn;
