import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import App from "./App";

export default function ({ children }) {
  const history = useHistory();
  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    console.log("last active", getLastActiveTime());
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("creatturAccessToken");
    toast.error("Session has been expired.")
    Redirect("/login");
  };

  const handleOnActive = (event) => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const handleOnAction = (event) => {};
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 30,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return <div>{children}</div>;
}
