import EmailSetup from "./EmailSetupSections/CampaignEmail/CampaignEmail";
import React from "react";
import { useState, useEffect } from "react";
import CopyText from "src/Common/CopyText/CopyText";
import styles from "./EmailSettings.module.scss";
import Header from "./Header/Header";
import EmailSidebar from "./EmailSidebar/EmailSidebar";
import ReminderEmail from "./EmailSetupSections/ReminderEmail/ReminderEmail";
import FollowupEmail from "./EmailSetupSections/FollowupEmail/FollowupEmail";
import DeliverySettings from "./EmailSetupSections/DeliverySettings/DeliverySettings";
import SetupConfiguration from "./SetupConfiguration/SetupConfiguration";
import useGetEmailTemplates from "./EmailSetupSections/Hooks/useGetEmailTemplates";

  const getInitialActiveOption = (step) => {
  switch (step) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    default:
      return 0;
  }
};

const EmailSettings = ({ activeStep = 2 }) => {
  const [activeOption, setActiveOption] = useState(getInitialActiveOption(activeStep));
  const [deliveryData, setDeliveryData] = useState({});
  const [campaignEmailData, setCampaignEmailData] = useState({});

  const templateId = "b8e2a652-350b-42d5-b09e-9a0e4d345ccf";
 
  // const templateId = localStorage.getItem("template_id") || "default_template_id";
  const { campaignEmail, reminderEmails, followupEmails, loading, error, refetch } = useGetEmailTemplates(templateId);

  useEffect(() => {}, [campaignEmail, reminderEmails, followupEmails, loading, error]);

  const getOptions = () => {
    if (activeStep === 2) {
      return [
        { label: "Campaign Email", active: activeOption === 0 },
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
  };

  const handleDeliveryDataChange = (data) => {
    setDeliveryData(data);
  };

  const handleCampaignEmailDataChange = (data) => {
    setCampaignEmailData(data);
  };

  const renderContent = () => {
    if (activeStep === 2) {
      switch (activeOption) {
        case 0:
          return <EmailSetup onSave={refetch} onDataChange={handleCampaignEmailDataChange} data={campaignEmail?.[0] || {}} isReadOnly={!!campaignEmail?.[0]} />;
        case 1:
          return (
            <div className={styles.placeholder}>
              <ReminderEmail onSave={refetch} onDataChange={handleCampaignEmailDataChange} data={reminderEmails || []} />
            </div>
          );
        case 2:
          return (
            <div className={styles.placeholder}>
              <FollowupEmail onSave={refetch} onDataChange={handleCampaignEmailDataChange} data={followupEmails || []} isReadOnly={followupEmails && followupEmails.length > 0}/>
            </div>
          );
      }
    } else if (activeStep === 1) {
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
    else if (activeStep === 3){
      return (
        <div>
          {/* <h3>Setup Configuration</h3>
          <p>This is the Setup Configuration Page.</p> */}
          <SetupConfiguration />
        </div>
      );
    }

    else {
      return (
        <div className={styles.placeholder}>
          <h3>Something went wrong</h3>
        </div>
      );
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
        {activeStep !== 3 && (
          <EmailSidebar
            heading={getSidebarHeading()}
            options={options}
            onOptionClick={handleOptionClick}
          />
        )}
        <div className={styles.settingsContent}>{renderContent()}</div>
        <div className={styles.copyTextContainer}>
            <CopyText
              fields={["First name", "Last name", "Link"]}
              onInsert={() => {}}
            />
          </div>
      </div>
    </div>
  </div>
);

          
};

export default EmailSettings;
