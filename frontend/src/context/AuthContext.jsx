import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const refetchUser = async () => {
    if (!getToken()) return setUser(null);
    const { data } = await api.get("/api/usuarios/me");
    setUser(data); // { id, username, rol, activo }
  };

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
