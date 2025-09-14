import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const res = await axios.get("/api/auth/me");
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", {
        password: password,
        email: email,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        setUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        toast("You have registered successfully");
        localStorage.setItem("token", res.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        setUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
