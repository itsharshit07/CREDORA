"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the AuthContext type
interface AuthContextType {
    user: string | null;
    login: (username: string) => void; // ✅ Rename this to signIn if needed
    logout: () => void;
  }
  

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Correctly export useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
