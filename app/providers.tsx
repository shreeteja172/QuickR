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
            borderRadius: "14px",
            background: "var(--toast-bg)",
            color: "var(--toast-fg)",
            border: "1px solid var(--border)",
            padding: "12px 16px",
            boxShadow: "0 16px 45px -20px rgba(15, 23, 42, 0.35)",
          },
          success: {
            style: {
              background: "var(--toast-success-bg)",
            },
          },
          error: {
            style: {
              background: "var(--toast-error-bg)",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
