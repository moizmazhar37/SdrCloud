import React, { useEffect, useState } from "react";
import styles from "./OAuth.module.scss";
import {
  getConnectedIntegrations,
  initiateGoogleOAuth,
  disconnectGoogleAccount,
  connectCalendlyAccount,
  disconnectCalendlyAccount
} from "./hooks";
import Loader from "src/Common/Loader/Loader";
import { toast } from "react-toastify";

const MeetingIntegrationsConnect = () => {
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState({ google: {}, calendly: {} });
  const [error, setError] = useState(false);
  const [showCalendlyInput, setShowCalendlyInput] = useState(false);
  const [calendlyToken, setCalendlyToken] = useState("");

  const token = localStorage.getItem("token");

  const fetchIntegrations = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getConnectedIntegrations(token);
      setIntegrations(data);
    } catch (err) {
      console.error("Failed to fetch integrations:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, [token]);

  const handleGoogleConnect = async () => {
    try {
      const authUrl = await initiateGoogleOAuth(token);
      if (authUrl) window.location.href = authUrl;
    } catch (error) {
      console.error("OAuth initiation failed:", error);
      toast("Failed to connect Google Calendar.");
    }
  };

  const handleGoogleDisconnect = async () => {
    try {
      await disconnectGoogleAccount(token);
      toast("Disconnected Google Calendar.");
      fetchIntegrations();
    } catch (error) {
      console.error("Failed to disconnect:", error);
      toast("Failed to disconnect Google.");
    }
  };

  const handleCalendlyConnect = async () => {
    try {
      await connectCalendlyAccount(token, calendlyToken);
      toast("Calendly connected successfully.");
      setShowCalendlyInput(false);
      setCalendlyToken("");
      fetchIntegrations();
    } catch (error) {
      console.error("Calendly connection failed:", error);
      toast("Failed to connect Calendly.");
    }
  };

  const handleCalendlyDisconnect = async () => {
    try {
      await disconnectCalendlyAccount(token);
      toast("Calendly disconnected successfully.");
      fetchIntegrations();
    } catch (error) {
      console.error("Calendly disconnection failed:", error);
      toast("Failed to disconnect Calendly.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}> Meeting Integrations </h2>
      <p className={styles.description}>
        Connect your preferred platform to automate meeting scheduling.
      </p>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
          <p>Checking your connections...</p>
        </div>
      ) : error ? (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>Couldn't fetch integrations.</p>
          <button className={styles.retryBtn} onClick={fetchIntegrations}>
            Retry
          </button>
        </div>
      ) : (
        <div className={styles.cardsWrapper}>
          {/* Google Integration Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Google Calendar</h3>
            <p className={styles.cardDescription}>
              Sync meetings directly with your Google Calendar.
            </p>
            {integrations.google.connected ? (
              <>
                <div className={styles.connectedInfo}>
                  Connected as <strong>{integrations.google.email}</strong>
                </div>
                <button className={styles.disconnectBtn} onClick={handleGoogleDisconnect}>
                  Disconnect
                </button>
              </>
            ) : (
              <button className={styles.connectBtn} onClick={handleGoogleConnect}>
                Connect Google Calendar
              </button>
            )}
          </div>

          {/* Calendly Integration Card */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Calendly</h3>
            <p className={styles.cardDescription}>
              Connect your Calendly to automate booking workflows.
            </p>
            {integrations.calendly.connected ? (
              <>
                <div className={styles.connectedInfo}>
                  Connected as{" "}
                  <a
                    href={integrations.calendly.user_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {integrations.calendly.user_link}
                  </a>
                </div>
                <button className={styles.disconnectBtn} onClick={handleCalendlyDisconnect}>
                  Disconnect
                </button>
              </>
            ) : showCalendlyInput ? (
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Enter Calendly API Token"
                  value={calendlyToken}
                  onChange={(e) => setCalendlyToken(e.target.value)}
                  className={styles.tokenInput}
                />
                <button className={styles.connectBtn} onClick={handleCalendlyConnect}>
                  Connect Calendly
                </button>
              </div>
            ) : (
              <button className={styles.connectBtn} onClick={() => setShowCalendlyInput(true)}>
                Connect Calendly
              </button>
            )}
          </div>
        </div>
      )}

      <p className={styles.note}>
        ⚡ We only use your integrations with permission. Your personal events remain untouched.
      </p>
    </div>
  );
};

export default MeetingIntegrationsConnect;
