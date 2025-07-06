import React, { useState } from "react";
import EmailSettings from "../EmailSettings/EmailSettings";
import AgentPopUp from "../EmailSettings/AgentPopUp/AgentPopUp";

const EmailSettingsContainer = ({ activeStep = 1 }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [showEmailSettings, setShowEmailSettings] = useState(false);

  const handlePopupSave = async (agentData) => {
    console.log("Agent data saved:", agentData);
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
