import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/auth/users/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("UserContext fetch response:", res.data);
          setUser({
            role: res.data.role,
            name: res.data.name,
            userId: res.data.userId,
          });
        } catch (err) {
          console.error("UserContext error:", err.response || err);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
