"use client";

import { useState } from "react";
import { useAuth } from "../context/authContext"; // ✅ Use correct import path
import LoginModal from "./LoginModal";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const auth = useAuth(); // ✅ Get authentication context

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-Green-800">CREDORA</h1>

      <div>
        {auth.user ? (
          <button onClick={auth.logout} className="px-4 py-2 bg-red-500 text-white rounded-md">
            Logout
          </button>
        ) : (
          <button onClick={() => setIsLoginOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Logout
          </button>
        )}
      </div>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </header>
  );
}
