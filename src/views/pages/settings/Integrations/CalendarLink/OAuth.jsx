import React, { useEffect, useState } from "react";
import styles from "./OAuth.module.scss";
import { getConnectedGoogleEmail, initiateGoogleOAuth, disconnectGoogleAccount } from "./hooks";
import Loader from "src/Common/Loader/Loader";
import { toast } from "react-toastify";

const GoogleCalendarConnect = () => {
  const [connectedEmail, setConnectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const token = localStorage.getItem("token");

  const fetchConnectedEmail = async () => {
    setLoading(true);
    setError(false);
    try {
      const email = await getConnectedGoogleEmail(token);
      setConnectedEmail(email);
    } catch (err) {
      console.error("Failed to fetch connected email:", err);
      if (err.response?.status === 404) {
        // No account connected, treat as no email connected
        setConnectedEmail(null);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedEmail();
  }, [token]);

  const handleConnect = async () => {
    try {
      const authUrl = await initiateGoogleOAuth(token);
      if (authUrl) window.location.href = authUrl;
    } catch (error) {
      console.error("OAuth initiation failed:", error);
      toast("Failed to connect calendar.");
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectGoogleAccount(token);
      toast("Calendar connection successfully disconnected.");
      setConnectedEmail(null);
    } catch (error) {
      console.error("Failed to disconnect Google account:", error);
      toast("Failed to disconnect calendar.");
    }
  }
    

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}> Google Calendar Integration</h2>
      <p className={styles.description}>
        Connect your Google Calendar to allow automatic meeting scheduling from the platform.
      </p>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
          <p>Checking your calendar connection...</p>
        </div>
      ) : error ? (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>Couldn't fetch your connected account.</p>
          <button className={styles.retryBtn} onClick={fetchConnectedEmail}>
            Retry
          </button>
        </div>
      )
       : connectedEmail ? (
        <div className={styles.connectedInfo}>
          Connected to <strong>{connectedEmail}</strong>
          <button className={styles.disconnectBtn} onClick={() => handleDisconnect()}>
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={handleConnect} className={styles.connectBtn}>
          Sign in with Google to connect your calendar
        </button>
      )}

      <p className={styles.note}>
        ⚠️ We only use your calendar with your permission and never access your personal events.
      </p>
    </div>
  );
};

export default GoogleCalendarConnect;
