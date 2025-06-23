import React, { useState, useEffect, useRef } from "react";
import styles from "./GenaralSettings.module.scss";
import useSaveGeneralSettings from "../Hooks/useSaveGeneralSettings";

const GeneralSettings = ({ onNext, onDataChange, initialData }) => {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [maxSmsPerDay, setMaxSmsPerDay] = useState("5");
  const [maxEmailPerDay, setMaxEmailPerDay] = useState("5");
  const isInitialized = useRef(false);
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");
  const [replyToEmail, setReplyToEmail] = useState("");


  const TEMPLATE_ID = localStorage.getItem("template_id");
  const { saveGeneralSettings, loading, error } = useSaveGeneralSettings();

  // Populate initial data from API - only once when data first arrives
  useEffect(() => {
    if (initialData && !isInitialized.current) {
      setSmsEnabled(initialData.sms_enabled || false);
      setEmailEnabled(initialData.email_enabled || true);
      setMaxSmsPerDay(String(initialData.max_sms_per_day || 5));
      setMaxEmailPerDay(String(initialData.max_emails_per_day || 5));
      setFromEmail(initialData.from_email || "");
      setFromName(initialData.from_name || "");
      setReplyToEmail(initialData.reply_to || "");


      isInitialized.current = true;

      // Update parent component with initial data
      const allData = {
        smsEnabled: initialData.sms_enabled || false,
        emailEnabled: initialData.email_enabled || true,
        maxSmsPerDay: String(initialData.max_sms_per_day || 5),
        maxEmailPerDay: String(initialData.max_emails_per_day || 5),
        fromEmail: initialData.from_email || "",
        fromName: initialData.from_name || "",
        replyToEmail: initialData.reply_to || "",
      };
      onDataChange && onDataChange(allData);
    }
  }, [initialData, onDataChange]);

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

  const handleSave = async () => {
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
          <input
            type="email"
            value={fromEmail}
            onChange={(e) => {
              setFromEmail(e.target.value);
              handleDataChange({ fromEmail: e.target.value });
            }}
            className={styles.textInput}
            placeholder="e.g. example@domain.com"
          />
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
          disabled={loading}
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
