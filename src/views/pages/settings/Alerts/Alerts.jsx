import React, { useState } from "react";
import AlertsCard from "./AlertsCard";
import styles from "./Alerts.module.scss";

const Alerts = () => {
  const [alertsData, setAlertsData] = useState({
    emails: {
      active: false,
      type: "email",
      emailCount: "",
      receiveAlerts: false,
    },
    budget: {
      active: false,
      type: "budget",
      emailCount: "",
      receiveAlerts: false,
    },
    hvo: {
      active: false,
      type: "hvo",
      emailCount: "",
      receiveAlerts: false,
    },
    video: {
      active: false,
      type: "video",
      emailCount: "",
      receiveAlerts: false,
    },
  });

  const handleChange = (section, field, value) => {
    // If the field is emailCount, ensure it's a positive number
    if (field === "emailCount") {
      const numValue = parseInt(value);
      if (value !== "" && (isNaN(numValue) || numValue < 0)) {
        return;
      }
    }

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
        active: value,
      },
    }));
  };

  const handleSave = () => {
    // Create payload with only necessary data
    const payload = Object.entries(alertsData).reduce((acc, [key, value]) => {
      if (value.active) {
        // If alerts are enabled, include all values
        acc[key] = {
          active: value.active,
          type: value.type,
          emailCount: parseInt(value.emailCount) || 0,
          receiveAlerts: value.receiveAlerts,
        };
      } else {
        // If alerts are disabled, only include active and type
        acc[key] = {
          active: false,
          type: value.type,
        };
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
