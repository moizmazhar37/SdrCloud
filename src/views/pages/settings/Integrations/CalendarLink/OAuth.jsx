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
  const [loadingState, setLoadingState] = useState({
    google: false,
    calendly: false,
  });

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
      setLoadingState({ ...loadingState, google: true });
      const authUrl = await initiateGoogleOAuth(token);
      if (authUrl) window.location.href = authUrl;
    } catch (error) {
      console.error("OAuth initiation failed:", error);
      toast.error("Failed to connect Google Calendar.");
    } finally {
      setLoadingState({ ...loadingState, google: false });
    }
  };

  const handleGoogleDisconnect = async () => {
    try {
      setLoadingState({ ...loadingState, google: true });
      const response = await disconnectGoogleAccount(token);
      toast.success(response.message || "Disconnected Google Calendar.");
      fetchIntegrations();
    } catch (error) {
      console.error("Failed to disconnect:", error);
      toast.error(error.message || "Failed to disconnect Google.");
    } finally {
      setLoadingState({ ...loadingState, google: false });
    }
  };

  const handleCalendlyConnect = async () => {
    try {
      setLoadingState({ ...loadingState, calendly: true });
      const response = await connectCalendlyAccount(token, calendlyToken);
      toast.success(response.message || "Calendly connected successfully.");
      setShowCalendlyInput(false);
      setCalendlyToken("");
      fetchIntegrations();
    } catch (error) {
      console.error("Calendly connection failed:", error);
      toast.error(error.message || "Failed to connect Calendly.");
    } finally {
      setLoadingState({ ...loadingState, calendly: false });
    }
  };

  const handleCalendlyDisconnect = async () => {
    try {
      setLoadingState({ ...loadingState, calendly: true });
      const response = await disconnectCalendlyAccount(token);
      toast.success(response.message || "Calendly disconnected successfully.");
      fetchIntegrations();
    } catch (error) {
      console.error("Calendly disconnection failed:", error);
      toast.error(error.message || "Failed to disconnect Calendly.");
    } finally {
      setLoadingState({ ...loadingState, calendly: false });
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
          {/* <div className={styles.card}>
            <h3 className={styles.cardTitle}>Google Calendar</h3>
            <p className={styles.cardDescription}>
              Sync meetings directly with your Google Calendar.
            </p>
            {integrations.google.connected ? (
              <>
                <div className={styles.connectedInfo}>
                  Connected as <strong>{integrations.google.email}</strong>
                </div>
                <button
                  className={styles.disconnectBtn}
                  onClick={handleGoogleDisconnect}
                  disabled={loadingState.google}
                >
                  {loadingState.google ? "Disconnecting..." : "Disconnect"}
                </button>
              </>
            ) : (
              <button
                onClick={handleGoogleConnect}
                className={styles.connectBtn}
                disabled={loadingState.google}
              >
                {loadingState.google ? "Connecting..." : "Connect Google Calendar"}
              </button>
            )}
          </div> */}

<div className={styles.integrationSection}>
          {!integrations.calendly.connected && (
          <div className={`${styles.banner} ${styles.warning}`}>
            Configure your Calendly integration to allow us to show stats from calendly.
            Get your Auth Token from{" "}
            <a href="https://calendly.com/integrations/api_webhooks" target="_blank" rel="noopener noreferrer">
              Calendly API Integration Page
            </a> and paste it here and click the connect button.
          </div>
          )}
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
                <button
                  className={styles.disconnectBtn}
                  onClick={handleCalendlyDisconnect}
                  disabled={loadingState.calendly}
                >
                  {loadingState.calendly ? "Disconnecting..." : "Disconnect"}
                </button>
              </>
            ) : showCalendlyInput ? (
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  placeholder="Enter your Calendly Access Token"
                  value={calendlyToken}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 5000) {
                      setCalendlyToken(newValue);
                    }
                  }}
                  maxLength={5000}
                  className={styles.tokenInput}
                />
                <button
                  className={styles.connectBtn}
                  onClick={handleCalendlyConnect}
                  disabled={loadingState.calendly}
                >
                  {loadingState.calendly ? "Connecting..." : "Connect Calendly"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCalendlyInput(true)}
                className={styles.connectBtn}
                disabled={loadingState.calendly}
              >
                {loadingState.calendly ? "Connecting..." : "Connect Calendly"}
              </button>
            )}
          </div>
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
