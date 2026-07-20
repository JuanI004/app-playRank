import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../utils/authHeader";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchMe(token);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchMe(token) {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        throw new Error(data.message || "Error al obtener datos del usuario");
      }
    } catch {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  function login(token, userData) {
    localStorage.setItem("token", token);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
