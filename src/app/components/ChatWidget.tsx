"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Chatbot from "./Chatbot"; // Ensure correct import

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4">
          {/* ✅ Pass the onClose prop */}
          <Chatbot onClose={() => setIsOpen(false)} />
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
