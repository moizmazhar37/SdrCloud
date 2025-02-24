import React, { useState } from "react";
import AlertsCard from "./AlertsCard";
import styles from "./Alerts.module.scss";

const Alerts = () => {
  const [alertsData, setAlertsData] = useState({
    emails: {
      alertsStatus: false,
      emailCount: "",
      receiveAlerts: false,
    },
    budget: {
      alertsStatus: false,
      emailCount: "",
      receiveAlerts: false,
    },
    hvo: {
      alertsStatus: false,
      emailCount: "",
      receiveAlerts: false,
    },
    video: {
      alertsStatus: false,
      emailCount: "",
      receiveAlerts: false,
    },
  });

  const handleChange = (section, field, value) => {
    setAlertsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleToggle = (section, value) => {
    setAlertsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        alertsStatus: value,
      },
    }));
  };

  const handleSave = () => {
    // Create payload with only necessary data
    const payload = Object.entries(alertsData).reduce((acc, [key, value]) => {
      if (value.alertsStatus) {
        // If alerts are enabled, include all values
        acc[key] = value;
      } else {
        // If alerts are disabled, only include alertsStatus
        acc[key] = { alertsStatus: false };
      }
      return acc;
    }, {});

    console.log("Alerts Data:", payload);
  };

  return (
    <div className={styles.alertsContainer}>
      <div className={styles.header}>
        <h2>Alerts Configuration</h2>
        <button onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
      </div>
      <div className={styles.cardsGrid}>
        <AlertsCard
          title="Emails"
          data={alertsData.emails}
          onChange={(field, value) => handleChange("emails", field, value)}
          onToggle={(value) => handleToggle("emails", value)}
        />
        <AlertsCard
          title="Budget"
          data={alertsData.budget}
          onChange={(field, value) => handleChange("budget", field, value)}
          onToggle={(value) => handleToggle("budget", value)}
        />
        <AlertsCard
          title="HVO"
          data={alertsData.hvo}
          onChange={(field, value) => handleChange("hvo", field, value)}
          onToggle={(value) => handleToggle("hvo", value)}
        />
        <AlertsCard
          title="Video"
          data={alertsData.video}
          onChange={(field, value) => handleChange("video", field, value)}
          onToggle={(value) => handleToggle("video", value)}
        />
      </div>
    </div>
  );
};

export default Alerts;
