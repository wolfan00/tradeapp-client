import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
      } catch {
        setUser(null);
        api.defaults.headers.common["Authorization"] = "";
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    api.defaults.headers.common["Authorization"] = "";
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook olarak kullanmak için
export function useUser() {
  return useContext(UserContext);
}
