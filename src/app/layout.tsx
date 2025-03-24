"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./context/authContext"; // ✅ Import AuthProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SessionProvider>
          <AuthProvider> {/* ✅ Wrap everything with AuthProvider */}
            {children}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
