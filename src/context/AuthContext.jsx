import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "https://personalized-portfolio-generator.onrender.com/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  /* ==============================
     SET AUTH HEADER
  ============================== */
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  /* ==============================
     REGISTER
  ============================== */
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData);

      // store both token + user
      setToken(res.data.token);
      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed"
      };
    }
  };

  /* ==============================
     LOGIN
  ============================== */
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);

      // store both token + user
      setToken(res.data.token);
      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed"
      };
    }
  };

  /* ==============================
     LOGOUT
  ============================== */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ==============================
   CUSTOM HOOK
============================== */
export const useAuth = () => {
  return useContext(AuthContext);
};
