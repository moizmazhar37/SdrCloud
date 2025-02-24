import React from "react";
import styles from "./Alerts.module.scss";

const AlertsCard = ({ title, onChange, data, onToggle }) => {
  // Determine the appropriate label based on the data type
  const getLabelText = () => {
    switch (data.type) {
      case "email":
        return "Number of Emails Received";
      case "budget":
        return "Minimum Budget Figure";
      case "hvo":
        return "Minimum HVOs Viewed";
      case "video":
        return "Minimum Videos Viewed";
      default:
        return "Number of Items";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <div
          className={`${styles.toggle} ${data.active ? styles.active : ""}`}
          onClick={() => onToggle(!data.active)}
        >
          <div className={styles.toggleCircle} />
        </div>
      </div>
      <div
        className={`${styles.cardContent} ${
          !data.active ? styles.disabled : ""
        }`}
      >
        <div className={styles.inputGroup}>
          <label>{getLabelText()}</label>
          <input
            type="number"
            min="0"
            value={data.emailCount || ""}
            onChange={(e) => onChange("emailCount", e.target.value)}
            disabled={!data.active}
          />
        </div>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={data.receiveAlerts || false}
              onChange={(e) => onChange("receiveAlerts", e.target.checked)}
              disabled={!data.active}
            />
            Receive Alerts on Email
          </label>
        </div>
      </div>
    </div>
  );
};

export default AlertsCard;
