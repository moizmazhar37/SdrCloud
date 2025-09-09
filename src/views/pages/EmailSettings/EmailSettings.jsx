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

// Initial state for general settings
const initialGeneralState = {
  smsEnabled: false,
  emailEnabled: true,
  maxSmsPerDay: "5",
  maxEmailPerDay: "5",
  fromEmail: "",
  fromName: "",
  replyToEmail: "",
};

// Initial state for delivery settings
const initialDeliveryState = {
  deliveryTypes: ["Email"],
  maxReminders: "5",
  scheduleType: "Recurring",
  scheduledDate: "",
  scheduledTime: "08:00",
  weekdaysEnabled: false,
  weekendsEnabled: true,
  weekdaysTimes: { start: "08:00", end: "08:00" },
  weekendsTimes: { start: "08:00", end: "08:00" },
};

const EmailSettings = ({ activeStep: initialStep = 1 }) => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(initialStep);
  const [activeOption, setActiveOption] = useState(
    getInitialActiveOption(initialStep)
  );

  // Lifted state for settings
  const [generalData, setGeneralData] = useState(initialGeneralState);
  const [deliveryData, setDeliveryData] = useState(initialDeliveryState);
  const [campaignEmailData, setCampaignEmailData] = useState({});

  // Track if data has been loaded from API to prevent overwriting saved state
  const [isGeneralDataLoaded, setIsGeneralDataLoaded] = useState(false);
  const [isDeliveryDataLoaded, setIsDeliveryDataLoaded] = useState(false);

  const {
    data: domainStatus,
    loading: loadingDomain,
    error: domainError,
  } = useGetStatus();

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

  // Initialize data from API only once
  useEffect(() => {
    if (campaignData && !isGeneralDataLoaded && !isDeliveryDataLoaded) {
      // Initialize general settings from API data
      const generalFromAPI = {
        smsEnabled: campaignData.sms_enabled || false,
        emailEnabled: campaignData.email_enabled !== false, // default to true
        maxSmsPerDay: String(campaignData.max_sms_per_day || 5),
        maxEmailPerDay: String(campaignData.max_emails_per_day || 5),
        fromEmail: campaignData.from_email
          ? campaignData.from_email.split("@")[0]
          : "",
        fromName: campaignData.from_name || "",
        replyToEmail: campaignData.reply_to || "",
      };

      // Initialize delivery settings from API data
      const deliveryFromAPI = {
        deliveryTypes: ["Email"], // You might need to extract this from API
        maxReminders: String(campaignData.max_reminders || 5),
        scheduleType: campaignData.schedule_type || "Recurring",
        scheduledDate: campaignData.scheduled_date
          ? campaignData.scheduled_date.split("T")[0]
          : "",
        scheduledTime: campaignData.scheduled_time || "08:00",
        weekdaysEnabled: campaignData.weekdays_enabled || false,
        weekendsEnabled: campaignData.weekends_enabled !== false, // default to true
        weekdaysTimes: campaignData.weekdays_times || {
          start: "08:00",
          end: "08:00",
        },
        weekendsTimes: campaignData.weekends_times || {
          start: "08:00",
          end: "08:00",
        },
      };

      setGeneralData(generalFromAPI);
      setDeliveryData(deliveryFromAPI);
      setIsGeneralDataLoaded(true);
      setIsDeliveryDataLoaded(true);
    }
  }, [campaignData, isGeneralDataLoaded, isDeliveryDataLoaded]);

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
    setDeliveryData((prevData) => ({ ...prevData, ...data }));
  };

  const handleGeneralDataChange = (data) => {
    setGeneralData((prevData) => ({ ...prevData, ...data }));
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
              initialData={generalData} // Pass the lifted state instead of campaignData
              currentData={generalData} // Pass current state to prevent reinitialization
            />
          );
        case 1:
          return (
            <DeliverySettings
              onNext={handleNextStep}
              onDataChange={handleDeliveryDataChange}
              initialData={deliveryData} // Pass the lifted state instead of campaignData
              currentData={deliveryData} // Pass current state to prevent reinitialization
            />
          );
        default:
          return (
            <GeneralSettings
              onNext={handleGeneralSettingsNext}
              onDataChange={handleGeneralDataChange}
              initialData={generalData}
              currentData={generalData}
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
