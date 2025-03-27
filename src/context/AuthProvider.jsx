import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config/config";

const AuthContext = createContext();
const URL = config.BACKEND_URL;

export default function AuthProvider({ children }) {
  const [islogin, setIslogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    console.log("Auth Provider");
    Islogin();
  }, []);

  const Islogin = async () => {
    const token = Cookies.get("token"); // No need to await here

    if (token) {
      try {
        const res = await axios.get(`${URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.status === "success") {
          setIslogin(true);
          // ✅ Only navigate if NOT on signin or signup page
          if (location.pathname !== "/signin" && location.pathname !== "/signup") {
            navigate("/chat");
          }
        }
      } catch {
        // If verification fails, clear login state
        setIslogin(false);
        if (location.pathname !== "/signin" && location.pathname !== "/signup") {
          navigate("/");
        }
      }
    } else {
      setIslogin(false);
      if (location.pathname !== "/signin" && location.pathname !== "/signup") {
        navigate("/");
      }
    }
  };

  return <AuthContext.Provider value={{ islogin }}>{children}</AuthContext.Provider>;
}
