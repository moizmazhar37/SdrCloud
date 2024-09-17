import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeLeft } from "src/views/auth/forget-password-link/timer";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("creatturAccessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Creattur ${accessToken}`;
  } else {
    localStorage.removeItem("creatturAccessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());

  const [endTime, setEndtime] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    if (endTime) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = calculateTimeLeft(endTime);
          if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
            clearInterval(timer);
          }
          return newTimeLeft;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft({ minutes: 0, seconds: 0 });
    }
  }, [endTime]);

  let data = {
    userLoggedIn: isLogin,
    setEndtime,
    setTimeLeft,
    isLoading,
    timeLeft,

    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
