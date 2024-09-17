import React, { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import SessionTimeoutDialog from "./SessionTimeoutDialog";

let countdownInterval;
let timeout;
// SessionTimeoutLogin component to manage user session timeout and logout
const SessionTimeoutLogin = ({ isAuthenticated, logOut }) => {
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const idleTimer = useRef(null);

  // Function to clear the session timeout
  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };
  // Function to clear the session interval
  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
  };

  // Function to handle user logout
  const handleLogout = async (isTimedOut = false) => {
    try {
      setTimeoutModalOpen(false);
      clearSessionInterval();
      clearSessionTimeout();
      logOut();
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle session continuation
  const handleContinue = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
  };
 // Function to handle user activity
  const onActive = () => {
    if (!timeoutModalOpen) {
      clearSessionInterval();
      clearSessionTimeout();
    }
  };
 // Function to handle user inactivity
  const onIdle = () => {
    const delay = 1000 * 1;
    if (isAuthenticated && !timeoutModalOpen) {
      timeout = setTimeout(() => {
        let countDown = 10;
        setTimeoutModalOpen(true);
        setTimeoutCountdown(countDown);
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            setTimeoutCountdown(--countDown);
          } else {
            handleLogout(true);
          }
        }, 1000);
      }, delay);
    }
  };

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={5000}
      />
      <SessionTimeoutDialog
        countdown={timeoutCountdown}
        onContinue={handleContinue}
        onLogout={() => handleLogout(false)}
        open={timeoutModalOpen}
      />
    </>
  );
};

export default SessionTimeout;
