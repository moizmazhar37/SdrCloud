import React, { useState, useEffect } from "react";
import EmailSettings from "../EmailSettings/EmailSettings";
import AgentPopUp from "../EmailSettings/AgentPopUp/AgentPopUp";
import useGetStatus from "../settings/Integrations/Domains/Hooks/useGetDomainStatus";

const EmailSettingsContainer = ({ activeStep = 1 }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEmailSettings, setShowEmailSettings] = useState(false);
  const { data, loading, error } = useGetStatus();

  useEffect(() => {
    if (!loading && data) {
      if (data.is_authenticated) {
        setShowPopup(false);
        setShowEmailSettings(true);
      } else {
        setShowPopup(true);
        setShowEmailSettings(false);
      }
    }
  }, [data, loading]);

  const handlePopupSave = async (agentData) => {
    setShowPopup(false);
    setShowEmailSettings(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <AgentPopUp
          isOpen={showPopup}
          onClose={handlePopupClose}
          onSave={handlePopupSave}
          title="Setup Agent Information"
        />
      )}

      {showEmailSettings && <EmailSettings activeStep={activeStep} />}
    </div>
  );
};

export default EmailSettingsContainer;
