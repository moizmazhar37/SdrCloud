import React, { useState } from "react";
import styles from "./GenaralSettings.module.scss";

const GeneralSettings = ({ onNext, onDataChange }) => {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [maxSmsPerDay, setMaxSmsPerDay] = useState("5");
  const [maxEmailPerDay, setMaxEmailPerDay] = useState("5");

  const handleDataChange = (newData) => {
    const allData = {
      smsEnabled,
      emailEnabled,
      maxSmsPerDay,
      maxEmailPerDay,
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

  const handleSave = () => {
    console.log("Logging dAta=:", {
      smsEnabled,
      emailEnabled,
      maxSmsPerDay,
      maxEmailPerDay,
    });
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
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.buttonSection}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;
