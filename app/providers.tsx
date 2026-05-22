"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "16px",
            background: "#0f172a",
            color: "#f8fafc",
            padding: "12px 16px",
            boxShadow: "0 16px 45px -20px rgba(15, 23, 42, 0.65)",
          },
          success: {
            style: {
              background: "#052e16",
            },
          },
          error: {
            style: {
              background: "#450a0a",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
