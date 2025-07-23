import React, { useState, useEffect, useRef } from "react";
import styles from "./GenaralSettings.module.scss";
import useSaveGeneralSettings from "../Hooks/useSaveGeneralSettings";
import useGetStatus from "src/views/pages/settings/Integrations/Domains/Hooks/useGetDomainStatus";

const GeneralSettings = ({
  onNext,
  onDataChange,
  initialData,
  currentData,
}) => {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [maxSmsPerDay, setMaxSmsPerDay] = useState("5");
  const [maxEmailPerDay, setMaxEmailPerDay] = useState("5");
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");
  const [replyToEmail, setReplyToEmail] = useState("");
  const [fromEmailError, setFromEmailError] = useState("");
  const isInitialized = useRef(false);

  const {
    data: domainStatus,
    loading: loadingDomain,
    error: domainError,
  } = useGetStatus();

  const TEMPLATE_ID = localStorage.getItem("selectedTemplateId");
  const { saveGeneralSettings, loading, error } = useSaveGeneralSettings();

  // Use currentData (from parent state) instead of initialData for state initialization
  useEffect(() => {
    const dataToUse = currentData || initialData;

    if (dataToUse && !isInitialized.current) {
      setSmsEnabled(dataToUse.smsEnabled || false);
      setEmailEnabled(dataToUse.emailEnabled !== false); // default to true
      setMaxSmsPerDay(String(dataToUse.maxSmsPerDay || 5));
      setMaxEmailPerDay(String(dataToUse.maxEmailPerDay || 5));
      setFromEmail(dataToUse.fromEmail || "");
      setFromName(dataToUse.fromName || "");
      setReplyToEmail(dataToUse.replyToEmail || "");

      isInitialized.current = true;

      // Only call onDataChange if this is the initial load
      if (!currentData) {
        const allData = {
          smsEnabled: dataToUse.smsEnabled || false,
          emailEnabled: dataToUse.emailEnabled !== false,
          maxSmsPerDay: String(dataToUse.maxSmsPerDay || 5),
          maxEmailPerDay: String(dataToUse.maxEmailPerDay || 5),
          fromEmail: dataToUse.fromEmail || "",
          fromName: dataToUse.fromName || "",
          replyToEmail: dataToUse.replyToEmail || "",
        };
        onDataChange && onDataChange(allData);
      }
    }
  }, [currentData, initialData, onDataChange]);

  // Update local state when currentData changes (when switching between tabs)
  useEffect(() => {
    if (currentData && isInitialized.current) {
      setSmsEnabled(currentData.smsEnabled);
      setEmailEnabled(currentData.emailEnabled);
      setMaxSmsPerDay(currentData.maxSmsPerDay);
      setMaxEmailPerDay(currentData.maxEmailPerDay);
      setFromEmail(currentData.fromEmail);
      setFromName(currentData.fromName);
      setReplyToEmail(currentData.replyToEmail);
    }
  }, [currentData]);

  const handleDataChange = (newData) => {
    const allData = {
      smsEnabled,
      emailEnabled,
      maxSmsPerDay,
      maxEmailPerDay,
      fromEmail,
      fromName,
      replyToEmail,
      ...newData,
    };
    onDataChange && onDataChange(allData);
  };

  const validateFromEmail = (value) => {
    if (value.includes("@")) {
      const domain = domainStatus?.domain || "domain.com";
      setFromEmailError(
        `Your email is ${value}@${domain}. Please enter a valid email.`
      );
      return false;
    } else {
      setFromEmailError("");
      return true;
    }
  };

  const handleSmsToggle = () => {
    const newValue = !smsEnabled;
    setSmsEnabled(newValue);
    handleDataChange({ smsEnabled: newValue });
  };

  const handleEmailToggle = () => {
    const newValue = !emailEnabled;
    setEmailEnabled(newValue);
    handleDataChange({ emailEnabled: newValue });
  };

  const handleMaxSmsChange = (value) => {
    setMaxSmsPerDay(value);
    handleDataChange({ maxSmsPerDay: value });
  };

  const handleMaxEmailChange = (value) => {
    setMaxEmailPerDay(value);
    handleDataChange({ maxEmailPerDay: value });
  };

  const handleFromEmailChange = (value) => {
    setFromEmail(value);
    validateFromEmail(value);
    handleDataChange({ fromEmail: value });
  };

  const handleSave = async () => {
    // Validate before saving
    if (!validateFromEmail(fromEmail)) {
      console.error("Cannot save: Invalid from email format");
      return;
    }

    const settings = {
      smsEnabled,
      emailEnabled,
      maxSmsPerDay,
      maxEmailPerDay,
      fromEmail,
      fromName,
      replyToEmail,
    };

    console.log("Saving settings:", settings);

    try {
      console.log("Template ID:", TEMPLATE_ID);
      const result = await saveGeneralSettings(TEMPLATE_ID, settings);
      console.log("Template ID:", TEMPLATE_ID);
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  const handleNext = () => {
    onNext && onNext();
  };

  return (
    <div className={styles.generalSettings}>
      <div className={styles.section}>
        <div className={styles.toggleContainer}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={handleSmsToggle}
              className={styles.toggleInput}
            />
            <span className={styles.toggleSwitch}></span>
            <span className={styles.toggleText}>Enable SMS</span>
          </label>
        </div>

        {smsEnabled && (
          <div className={styles.maxInputContainer}>
            <label className={styles.inputLabel}>Max SMS per day:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={maxSmsPerDay}
              onChange={(e) => handleMaxSmsChange(e.target.value)}
              className={styles.numberInput}
            />
          </div>
        )}
      </div>

      {/* Email Toggle Section */}
      <div className={styles.section}>
        <div className={styles.toggleContainer}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={handleEmailToggle}
              className={styles.toggleInput}
            />
            <span className={styles.toggleSwitch}></span>
            <span className={styles.toggleText}>Enable Email</span>
          </label>
        </div>

        {emailEnabled && (
          <>
            <div className={styles.maxInputContainer}>
              <label className={styles.inputLabel}>Max Email per day:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={maxEmailPerDay}
                onChange={(e) => handleMaxEmailChange(e.target.value)}
                className={styles.numberInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>From Email:</label>
              <div className={styles.emailInputContainer}>
                <input
                  type="text"
                  value={fromEmail}
                  onChange={(e) => handleFromEmailChange(e.target.value)}
                  className={`${styles.textInput} ${
                    fromEmailError ? styles.errorInput : ""
                  }`}
                  placeholder="e.g. example"
                />
                <span className={styles.domainSuffix}>
                  @{domainStatus?.domain || "domain.com"}
                </span>
              </div>
              {fromEmailError && (
                <div className={styles.errorMessage}>{fromEmailError}</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>From Name:</label>
              <input
                type="text"
                value={fromName}
                onChange={(e) => {
                  setFromName(e.target.value);
                  handleDataChange({ fromName: e.target.value });
                }}
                className={styles.textInput}
                placeholder="e.g. John Doe"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Reply To Email:</label>
              <input
                type="email"
                value={replyToEmail}
                onChange={(e) => {
                  setReplyToEmail(e.target.value);
                  handleDataChange({ replyToEmail: e.target.value });
                }}
                className={styles.textInput}
                placeholder="e.g. reply@domain.com"
              />
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.buttonSection}>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={loading || fromEmailError}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;
