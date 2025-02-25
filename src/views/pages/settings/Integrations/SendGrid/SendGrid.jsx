import React from "react";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import { useTenantEmail } from "./hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "src/Common/Loader/Loader";  // Import Loader
import styles from "./sendgrid.module.scss";

const SendGrid = () => {
    const {
        email,
        setEmail,
        apiKey,
        setApiKey,
        isDisabled,
        loading,
        saveTenantEmail,
        deleteTenantEmail
    } = useTenantEmail();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveTenantEmail();
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <DynamicNavigator items={[
                { text: "Settings", route: "/settings" },
                { text: "Integration", route: "/integrations" },
                { text: "SendGrid", route: "/sendgrid" }
            ]} />

            {/* Full-screen Loader */}
            {loading ? (
                <div className={styles.loaderWrapper}>
                    <Loader size={160} />
                </div>
            ) : (
                <div className={styles.container}>
                    {isDisabled && (
                        <div className={`${styles.banner} ${styles.success}`}>
                            API key for <strong>{email}</strong> configured and active.
                        </div>
                    )}
                    {!isDisabled && (
                        <div className={`${styles.banner} ${styles.warning}`}>
                            Configure your SendGrid integration to send transactional emails.
                            Ensure that your API key has the correct permissions.
                            For more details, visit the{" "}
                            <a href="https://app.sendgrid.com/settings/api_keys" target="_blank" rel="noopener noreferrer">
                                SendGrid API Documentation
                            </a>.
                        </div>
                    )}
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Verification Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isDisabled}
                                autoComplete="off"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>API Key</label>
                            <input
                                type="password"
                                placeholder="********"
                                className={styles.input}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                disabled={isDisabled}
                                autoComplete="new-password"
                            />
                        </div>

                        {!isDisabled ? (
                            <button type="submit" className={styles.submitButton}>
                                Save
                            </button>
                        ) : (
                            <button type="button" className={styles.deleteButton} onClick={deleteTenantEmail}>
                                Delete
                            </button>
                        )}
                    </form>
                </div>
            )}
        </>
    );
};

export default SendGrid;
