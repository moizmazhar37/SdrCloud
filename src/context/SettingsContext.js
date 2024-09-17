import React, { createContext, useEffect, useState } from "react";
import _ from "lodash";
// settings for the application
const defaultSettings = {
  direction: "ltr",
  responsiveFontSizes: true,
  theme: "LIGHT",
};
// Function to restore settings from localStorage
export const restoreSettings = () => {
  let settings = null;

  try {
    // Try to get the settings from localStorage
    const storedData = window.localStorage.getItem("settings");
 // Parse and return the settings if they exist
    if (storedData) {
      settings = JSON.parse(storedData);
    }
        // Log any errors that occur during parsing
  } catch (err) {
    console.error(err);

  }
 // Return the restored settings or null if not found
  return settings;
};

export const storeSettings = (settings) => {
  window.localStorage.setItem("settings", JSON.stringify(settings));
};

const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings: () => { },
});

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || defaultSettings
  );

  const handleSaveSettings = (update = {}) => {
    const mergedSettings = _.merge({}, currentSettings, update);

    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
  };

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setCurrentSettings(restoredSettings);
    }
  }, []);
// Effect to update the document's text direction based on settings
  useEffect(() => {
    document.dir = currentSettings.direction;
  }, [currentSettings]);

  return (
    <SettingsContext.Provider
      value={{
        themekey: currentSettings,
        settings: currentSettings,
        saveSettings: handleSaveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
