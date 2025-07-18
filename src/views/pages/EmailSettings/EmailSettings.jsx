import EmailSetup from "./EmailSetupSections/CampaignEmail/CampaignEmail";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import useGetStatus from "../settings/Integrations/Domains/Hooks/useGetDomainStatus";
import Loader from "src/Common/Loader/Loader";

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

const EmailSettings = ({ activeStep: initialStep = 1 }) => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(initialStep);
  const [activeOption, setActiveOption] = useState(
    getInitialActiveOption(initialStep)
  );

  const {
    data: domainStatus,
    loading: loadingDomain,
    error: domainError,
  } = useGetStatus();

  const [deliveryData, setDeliveryData] = useState({});
  const [generalData, setGeneralData] = useState({});
  const [campaignEmailData, setCampaignEmailData] = useState({});
  const {
    data: campaignData,
    loading: loadingCampaignData,
    error: errorLoadingCampaignData,
  } = useGetCampaignData();

  const templateId = localStorage.getItem("selectedTemplateId");
  const {
    campaignEmail,
    reminderEmails,
    followupEmails,
    loading,
    error,
    refetch,
  } = useGetEmailTemplates(templateId);

  useEffect(() => {
    const verifyAuthentication = async () => {
      if (loadingDomain) {
        return;
      }

      if (domainError) {
        console.error("Error loading domain status:", domainError);
        history.push("/domains");
        return;
      }
      if (!domainStatus || !domainStatus.is_authenticated) {
        history.push("/domains");
      }
    };

    verifyAuthentication();
  }, [domainStatus, loadingDomain, domainError, history]);

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

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
    setActiveOption(0);
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
      setActiveOption(0);
    }
  };

  const handleForwardStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
      setActiveOption(0);
    }
  };

  const renderContent = () => {
    if (activeStep === 2) {
      switch (activeOption) {
        case 0:
          return (
            <EmailSetup
              templateId={templateId}
              onSave={refetch}
              onNext={() => setActiveOption(1)}
              onDataChange={handleCampaignEmailDataChange}
              data={campaignEmail?.[0] || {}}
              isReadOnly={!!campaignEmail?.[0]}
            />
          );
        case 1:
          return (
            <div className={styles.placeholder}>
              <ReminderEmail
                templateId={templateId}
                onSave={refetch}
                onNext={() => setActiveOption(2)}
                onDataChange={handleCampaignEmailDataChange}
                data={reminderEmails || []}
              />
            </div>
          );
        case 2:
          return (
            <div className={styles.placeholder}>
              <FollowupEmail
                templateId={templateId}
                onSave={refetch}
                onNext={handleNextStep}
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
              onNext={handleNextStep}
              onDataChange={handleDeliveryDataChange}
              initialData={campaignData}
            />
          );
        default:
          return (
            <GeneralSettings
              onNext={handleGeneralSettingsNext}
              onDataChange={handleGeneralDataChange}
              initialData={campaignData}
            />
          );
      }
    } else if (activeStep === 3) {
      return (
        <div>
          <SetupConfiguration tempalteId={templateId} />
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

  if (loadingDomain) {
    return (
      <div className={styles.emailSettingsContainer}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.emailSettingsContainer}>
      <div className={styles.emailSettings} data-active-step={activeStep}>
        <div className={styles.headerNavigation}>
          <button
            className={`${styles.navArrow} ${styles.backArrow}`}
            onClick={handlePreviousStep}
            disabled={activeStep === 1}
            aria-label="Previous step"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Header activeStep={activeStep} />

          <button
            className={`${styles.navArrow} ${styles.forwardArrow}`}
            onClick={handleForwardStep}
            disabled={activeStep === 3}
            aria-label="Next step"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.contentContainer}>
          {activeStep !== 3 && (
            <EmailSidebar
              heading={getSidebarHeading()}
              options={options}
              onOptionClick={handleOptionClick}
            />
          )}
          <div className={styles.settingsContent}>{renderContent()}</div>
          {activeStep == 2 && (
            <div className={styles.copyTextContainer}>
              <CopyText
                fields={["First name", "Last name", "Link"]}
                onInsert={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
