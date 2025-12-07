import React, { createContext, useContext, useState, useEffect } from "react";
import API from "./api";

interface AuthContextType {
  token: string | null;
  user: { id: string; email: string; role?: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("cs_token"));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("cs_token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      API.get("/auth/me")
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      localStorage.removeItem("cs_token");
      delete API.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await API.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const register = async (email: string, password: string) => {
    const res = await API.post("/auth/register", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
