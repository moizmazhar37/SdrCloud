import EmailSetup from "./EmailSetup/EmailSetup";

import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./EmailSettings.module.scss";
import Header from "./Header/Header";
import EmailSidebar from "./EmailSidebar/EmailSidebar";
import DeliverySettings from "./DeliverySettings/DeliverySettings";

const EmailSettings = ({ activeStep = 2 }) => {
  const [activeOption, setActiveOption] = useState(activeStep === 2 ? 0 : 1);
  const [deliveryData, setDeliveryData] = useState({});

  // Define options based on activeStep
  const getOptions = () => {
    if (activeStep === 2) {
      return [
        { label: "Campaign Email 1", active: activeOption === 0 },
        { label: "Reminder Email", active: activeOption === 1 },
        { label: "Followup Email", active: activeOption === 2 },
      ];
    } else {
      return [
        { label: "General Setting", active: activeOption === 0 },
        { label: "Delivery Settings", active: activeOption === 1 },
        { label: "Review Settings", active: activeOption === 2 },
      ];
    }
  };

  const options = getOptions();

  const handleOptionClick = (option, index) => {
    setActiveOption(index);
    console.log("Clicked:", option.label);
  };

  const handleDeliveryDataChange = (data) => {
    setDeliveryData(data);
    console.log("Delivery Settings Data:", data);
  };

  const renderContent = () => {
    if (activeStep === 2) {
      switch (activeOption) {
        case 0:
          return <EmailSetup />;
        case 1:
          return (
            <div className={styles.placeholder}>
              <h3>Reminder Email</h3>
              <p>Reminder email setup content will go here.</p>
            </div>
          );
        case 2:
          return (
            <div className={styles.placeholder}>
              <h3>Followup Email</h3>
              <p>Followup email setup content will go here.</p>
            </div>
          );
        default:
          return <EmailSetup />;
      }
    } else {
      switch (activeOption) {
        case 0:
          return (
            <div className={styles.placeholder}>
              <h3>General Settings</h3>
              <p>General settings content will go here.</p>
            </div>
          );
        case 1:
          return <DeliverySettings onDataChange={handleDeliveryDataChange} />;
        case 2:
          return (
            <div className={styles.placeholder}>
              <h3>Review Settings</h3>
              <p>Review settings content will go here.</p>
            </div>
          );
        default:
          return <DeliverySettings onDataChange={handleDeliveryDataChange} />;
      }
    }
  };

  const getSidebarHeading = () => {
    return activeStep === 2 ? "Email Setup" : "Email Settings";
  };

  return (
    <div className={styles.emailSettingsContainer}>
      <div className={styles.emailSettings}>
        <Header activeStep={activeStep} />
        <div className={styles.contentContainer}>
          <EmailSidebar
            heading={getSidebarHeading()}
            options={options}
            onOptionClick={handleOptionClick}
          />
          <div className={styles.settingsContent}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
