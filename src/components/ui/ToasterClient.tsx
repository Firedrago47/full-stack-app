// components/ui/ToasterClient.tsx
"use client";

import React from "react";
import { Toaster } from "sonner";

/**
 * Small client wrapper so we can render the Toaster inside app/layout.tsx
 * (app/layout.tsx is a server component by default).
 */
export default function ToasterClient() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
      }}
    />
  );
}
