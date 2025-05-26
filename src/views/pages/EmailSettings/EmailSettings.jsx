import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./EmailSettings.module.scss";
import Header from "./Header/Header";
import EmailSidebar from "./EmailSidebar/EmailSidebar";
import DeliverySettings from "./DeliverySettings/DeliverySettings";

const EmailSettings = () => {
  const [activeOption, setActiveOption] = useState(1);
  const [deliveryData, setDeliveryData] = useState({});

  const options = [
    { label: "General Setting", active: activeOption === 0 },
    { label: "Delivery Settings", active: activeOption === 1 },
    { label: "Review Settings", active: activeOption === 2 },
  ];

  const handleOptionClick = (option, index) => {
    setActiveOption(index);
    console.log("Clicked:", option.label);
  };

  const handleDeliveryDataChange = (data) => {
    setDeliveryData(data);
    console.log("Delivery Settings Data:", data);
  };

  return (
    <div className={styles.emailSettingsContainer}>
      {" "}
      <div className={styles.emailSettings}>
        <Header activeStep={1} />
        <div className={styles.contentContainer}>
          <EmailSidebar
            heading="Email Setup"
            options={options}
            onOptionClick={handleOptionClick}
          />
          <div className={styles.settingsContent}>
            {activeOption === 1 && (
              <DeliverySettings onDataChange={handleDeliveryDataChange} />
            )}
            {activeOption === 0 && (
              <div className={styles.placeholder}>
                <h3>General Settings</h3>
                <p>General settings content will go here.</p>
              </div>
            )}
            {activeOption === 2 && (
              <div className={styles.placeholder}>
                <h3>Review Settings</h3>
                <p>Review settings content will go here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
