import React, { useState, useEffect } from "react";
import AlertsCard from "./AlertsCard";
import styles from "./Alerts.module.scss";
import useSaveAlerts from "./Hooks/useSaveAlerts";
import useGetAlerts from "./Hooks/useGetAlerts";

const Alerts = () => {
  const { saveAlerts, loading: saving } = useSaveAlerts();
  const { data: fetchedAlerts, loading: fetching, error } = useGetAlerts();

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

  // Populate state when fetched data is available
  useEffect(() => {
    if (fetchedAlerts && Object.keys(fetchedAlerts).length > 0) {
      console.log("Fetched Alerts:", fetchedAlerts); // Debugging fetched data

      // Create a copy of current state
      const updatedAlertsData = { ...alertsData };

      // Update each section with data from the API
      Object.keys(fetchedAlerts).forEach((key) => {
        if (updatedAlertsData[key]) {
          updatedAlertsData[key] = {
            ...updatedAlertsData[key],
            active: fetchedAlerts[key].active,
            emailCount:
              fetchedAlerts[key].emailCount === null
                ? ""
                : fetchedAlerts[key].emailCount,
            receiveAlerts: fetchedAlerts[key].receiveAlerts,
          };
        }
      });

      // Update state with the transformed data
      setAlertsData(updatedAlertsData);
    }
  }, [fetchedAlerts]);

  const handleChange = (section, field, value) => {
    if (field === "emailCount") {
      const numValue = parseInt(value);
      if (value !== "" && (isNaN(numValue) || numValue < 0)) return;
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

  const handleSave = async () => {
    try {
      await saveAlerts(alertsData);
    } catch (err) {
      console.error("Failed to save alerts:", err);
    }
  };

  return (
    <div className={styles.alertsContainer}>
      <div className={styles.header}>
        <h2>Alerts Configuration</h2>
        <button
          onClick={handleSave}
          className={`${styles.saveButton} ${saving ? styles.loading : ""}`}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
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
