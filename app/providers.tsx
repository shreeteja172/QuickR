"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "8px",
            background: "#1f1f1f",
            color: "#ffffff",
            padding: "12px 16px",
            fontSize: "14px",
            boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.25)",
          },
          success: {
            style: {
              background: "#1f1f1f",
              borderLeft: "3px solid #fa520f",
            },
          },
          error: {
            style: {
              background: "#1f1f1f",
              borderLeft: "3px solid #dc2626",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
