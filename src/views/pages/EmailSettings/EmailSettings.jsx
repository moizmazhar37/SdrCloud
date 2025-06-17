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
import GeneralSettings from "./EmailSetupSections/GenaralSettings/GenaralSettings";
import SetupConfiguration from "./SetupConfiguration/SetupConfiguration";
import useGetEmailTemplates from "./EmailSetupSections/Hooks/useGetEmailTemplates";
import useGetCampaignData from "./EmailSetupSections/Hooks/useGetCampaignData";

const getInitialActiveOption = (step) => {
  switch (step) {
    case 1:
      return 0;
    case 2:
      return 0;
    case 3:
      return 0;
    default:
      return 0;
  }
};
const EmailSettings = ({ activeStep = 1 }) => {
  const [activeOption, setActiveOption] = useState(
    getInitialActiveOption(activeStep)
  );
  const [deliveryData, setDeliveryData] = useState({});
  const [generalData, setGeneralData] = useState({});
  const [campaignEmailData, setCampaignEmailData] = useState({});
  const {
    data: campaignData,
    loading: loadingCampaignData,
    error: errorLoadingCampaignData,
  } = useGetCampaignData();

  const templateId = localStorage.getItem("template_id");
  const {
    campaignEmail,
    reminderEmails,
    followupEmails,
    loading,
    error,
    refetch,
  } = useGetEmailTemplates(templateId);

  useEffect(() => {}, [
    campaignEmail,
    reminderEmails,
    followupEmails,
    loading,
    error,
  ]);

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

  const handleGeneralDataChange = (data) => {
    setGeneralData(data);
  };

  const handleCampaignEmailDataChange = (data) => {
    setCampaignEmailData(data);
  };

  const handleGeneralSettingsNext = () => {
    setActiveOption(1);
  };

  const handleGeneralSettingsNext2 = () => {
    setActiveOption(2);
  };
  const renderContent = () => {
    if (activeStep === 2) {
      switch (activeOption) {
        case 0:
          return (
            <EmailSetup
              onSave={refetch}
              onDataChange={handleCampaignEmailDataChange}
              data={campaignEmail?.[0] || {}}
              isReadOnly={!!campaignEmail?.[0]}
            />
          );
        case 1:
          return (
            <div className={styles.placeholder}>
              <ReminderEmail
                onSave={refetch}
                onDataChange={handleCampaignEmailDataChange}
                data={reminderEmails || []}
              />
            </div>
          );
        case 2:
          return (
            <div className={styles.placeholder}>
              <FollowupEmail
                onSave={refetch}
                onDataChange={handleCampaignEmailDataChange}
                data={followupEmails || []}
                isReadOnly={followupEmails && followupEmails.length > 0}
              />
            </div>
          );
        default:
          return (
            <EmailSetup
              onSave={refetch}
              onDataChange={handleCampaignEmailDataChange}
              data={campaignEmail?.[0] || {}}
              isReadOnly={!!campaignEmail?.[0]}
            />
          );
      }
    } else if (activeStep === 1) {
      switch (activeOption) {
        case 0:
          return (
            <GeneralSettings
              onNext={handleGeneralSettingsNext}
              onDataChange={handleGeneralDataChange}
              initialData={campaignData}
            />
          );
        case 1:
          return (
            <DeliverySettings
              onNext={handleGeneralSettingsNext2}
              onDataChange={handleDeliveryDataChange}
              initialData={campaignData}
            />
          );
        case 2:
          return (
            <div className={styles.placeholder}>
              <h3>Review Settings</h3>
              <p>Review settings content will go here.</p>
              <div className={styles.reviewData}>
                <h4>General Settings:</h4>
                <pre>{JSON.stringify(generalData, null, 2)}</pre>
                <h4>Delivery Settings:</h4>
                <pre>{JSON.stringify(deliveryData, null, 2)}</pre>
              </div>
            </div>
          );
        default:
          return (
            <GeneralSettings
              onNext={handleGeneralSettingsNext}
              onDataChange={handleGeneralDataChange}
              initialData={campaignData} // Pass campaign data
            />
          );
      }
    } else if (activeStep === 3) {
      return (
        <div>
          <SetupConfiguration />
        </div>
      );
    } else {
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
