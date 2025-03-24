"use client";

import { useState } from "react";
import { useAuth } from "../context/authContext";

interface LoginModalProps {
  onClose: () => void; // Explicitly define the type for onClose
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth(); // ✅ Use login instead of signIn


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email);
      onClose(); // Close modal after successful login
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
        
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4">
            Login
          </button>
        </form>

        <button onClick={onClose} className="mt-4 w-full bg-gray-400 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
