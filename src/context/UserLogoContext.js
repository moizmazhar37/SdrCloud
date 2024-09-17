// src/context/UserLogoContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

export const UserLogoContext = createContext();

export const UserLogoProvider = ({ children }) => {
  const [userLogo, setUserLogo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserLogo = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getuserlogo,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setUserLogo(res?.data?.data?.accountLogo);
      } else if (res?.data?.status === 205) {
        // Handle status 205 if necessary
      }
    } catch (error) {
      console.error("Error fetching user logo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLogo();
  }, []);

  return (
    <UserLogoContext.Provider value={{ userLogo, fetchUserLogo, loading }}>
      {children}
    </UserLogoContext.Provider>
  );
};
