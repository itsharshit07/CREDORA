"use client";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

import { useState, useEffect, useRef } from "react";
import { Send, Loader2, X, Moon, Sun, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import { db, auth } from "../../lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface ChatbotProps {
  onClose: () => void;
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [sttEnabled, setSttEnabled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [language, setLanguage] = useState("en-US");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<null | any>(null);

  // ✅ Request Microphone Access on Load
  useEffect(() => {
    const requestMicrophoneAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted!");
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    };

    requestMicrophoneAccess();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadChatHistory(user.uid);
      } else {
        setUserId(null);
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadChatHistory = async (uid: string) => {
    const messagesRef = collection(db, `users/${uid}/chatHistory`);
    const q = query(messagesRef, orderBy("timestamp", "desc"), limit(10));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const loadedMessages = snapshot.docs.map((doc) => ({
        role: doc.data().role,
        text: doc.data().text,
      }));
      setMessages(loadedMessages.reverse());
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("darkMode", newTheme.toString());
      return newTheme;
    });
  };

  const getVoiceForLanguage = (lang: string) => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find((voice) => voice.lang.startsWith(lang)) || voices[0];
  };

  const speakText = (text: string) => {
    if (!ttsEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.voice = getVoiceForLanguage(language);
    window.speechSynthesis.speak(utterance);
  };

  const toggleTTS = () => {
    setTtsEnabled((prev) => !prev);
  };

  const formatResponse = (text: string) => {
    return text.replace(/^\**\s+/gm, " ").replace(/\n\s*\d+\.\s/g, "\n ");
  };

  const sendMessage = async () => {
    if (!input.trim() || !userId) return;
    const newMessage = { role: "user", text: input };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      await addDoc(collection(db, `users/${userId}/chatHistory`), {
        role: "user",
        text: input,
        timestamp: new Date(),
      });

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, language }),
      });

      const data = await res.json();
      const botMessage = { role: "ai", text: formatResponse(data.response) };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      await addDoc(collection(db, `users/${userId}/chatHistory`), {
        role: "ai",
        text: botMessage.text,
        timestamp: new Date(),
      });

      speakText(botMessage.text);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fix: Speech Recognition (Now Requests Mic Permission Properly)
  const startVoiceRecognition = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true }); // Re-request if blocked
    } catch (error) {
      alert("Microphone access is blocked! Please allow it in your browser settings.");
      return;
    }

    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = language;

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      stopVoiceRecognition(); // Stop after detecting speech
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      stopVoiceRecognition();
    };

    recognitionRef.current.start();
    setSttEnabled(true);
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setSttEnabled(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <div className={`w-[450px] h-[600px] border shadow-xl rounded-lg flex flex-col p-4 transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        
        <div className={`p-3 flex justify-between items-center rounded-t-lg ${darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}>
          <span>💬 AI Loan Advisor</span>
          <div className="flex gap-3">
            <button onClick={toggleTTS}>{ttsEnabled ? <Volume2 className="text-green-400" /> : <VolumeX className="text-gray-400" />}</button>
            <button onClick={toggleDarkMode}>{darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-200" />}</button>
            <button onClick={onClose}><X /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-1 max-w-xs rounded-lg ${msg.role === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-300 text-black"}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 flex">
          <button onClick={startVoiceRecognition}>{sttEnabled ? <Mic className="text-red-500" /> : <MicOff className="text-gray-400" />}</button>
          <input className="flex-1 p-2 border" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>{loading ? <Loader2 className="animate-spin" /> : <Send />}</button>
        </div>
      </div>
    </div>
  );
}
