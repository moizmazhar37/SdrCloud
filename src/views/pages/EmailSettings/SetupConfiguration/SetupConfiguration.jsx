import React, { useState } from "react";
import Dropdown from "../DropDownofEmailConfiguration/DropdownEmailConfiguration";
import styles from "./SetupConfiguration.module.scss";
import useGetTriggerFields from "./Hooks/useGetTriggerFields";
import useSaveConfigurations from "./Hooks/useSaveConfigurations";

const SetupConfiguration = ({ tempalteId }) => {
  const { date, loading, error } = useGetTriggerFields(tempalteId);
  const {
    saveConfigurations,
    loading: saveLoading,
    error: saveError,
    response,
  } = useSaveConfigurations();

  const [followUps, setFollowUps] = useState([{ type: "", template: "" }]);
  const [triggers, setTriggers] = useState([
    { field: "", condition: "", value: "" },
  ]);

  const typeOptions = [
    { label: "Email Template", value: "email" },
    { label: "SMS Template", value: "sms" },
  ];

  const templateOptions = [
    { label: "Welcome Email", value: "welcomeEmail" },
    { label: "Reminder Email", value: "reminderEmail" },
  ];

  const fieldOptions = [
    { label: "Clicked Link", value: "clicked" },
    { label: "Opened Email", value: "opened" },
  ];

  const conditionOptions = [
    { label: "INCLUDE", value: "INCLUDE" },
    { label: "EXCLUDE", value: "EXCLUDE" },
  ];

  const handleFollowUpChange = (index, field, value) => {
    const updated = [...followUps];
    updated[index][field] = value;
    setFollowUps(updated);
  };

  const handleTriggerChange = (index, field, value) => {
    const updated = [...triggers];
    updated[index][field] = value;
    setTriggers(updated);
  };

  const addFollowUp = () => {
    setFollowUps([...followUps, { type: "", template: "" }]);
  };

  const removeFollowUp = (index) => {
    if (followUps.length > 1) {
      const updated = [...followUps];
      updated.splice(index, 1);
      setFollowUps(updated);
    }
  };

  const addTrigger = () => {
    setTriggers([...triggers, { field: "", condition: "", value: "" }]);
  };

  const removeTrigger = (index) => {
    if (triggers.length > 1) {
      const updated = [...triggers];
      updated.splice(index, 1);
      setTriggers(updated);
    }
  };

  // Function to generate the payload in the required format
  const generatePayload = () => {
    return triggers.map((trigger) => ({
      template_id: tempalteId || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      field: trigger.field,
      condition: trigger.condition,
      value: trigger.value,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    const payload = generatePayload();
    await saveConfigurations(payload);
  };

  return (
    <div className={styles.setupContainer}>
      <div className={styles.header}>
        <h3>Follow Up Configuration</h3>
        {followUps.map((item, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                options={typeOptions}
                value={item.type}
                onChange={(val) => handleFollowUpChange(index, "type", val)}
                placeholder="User Action"
              />
            </div>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                options={templateOptions}
                value={item.template}
                onChange={(val) => handleFollowUpChange(index, "template", val)}
                placeholder="Follow Up Email Template"
              />
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.addBtn} onClick={addFollowUp}>
                + Add
              </button>
              <button
                className={styles.removeBtn}
                onClick={() => removeFollowUp(index)}
                disabled={followUps.length === 1}
              >
                &minus;
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3>Trigger Conditions</h3>
        {triggers.map((item, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                options={fieldOptions}
                value={item.field}
                onChange={(val) => handleTriggerChange(index, "field", val)}
                placeholder="Field"
              />
            </div>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                options={conditionOptions}
                value={item.condition}
                onChange={(val) => handleTriggerChange(index, "condition", val)}
                placeholder="Condition"
              />
            </div>
            <div className={styles.dropdownWrapper}>
              <input
                type="text"
                className={styles.textInput}
                value={item.value}
                onChange={(e) =>
                  handleTriggerChange(index, "value", e.target.value)
                }
                placeholder="Enter value"
              />
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.addBtn} onClick={addTrigger}>
                + Add
              </button>
              <button
                className={styles.removeBtn}
                onClick={() => removeTrigger(index)}
                disabled={triggers.length === 1}
              >
                &minus;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button Section */}
      <div className={styles.saveSection}>
        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={saveLoading}
        >
          {saveLoading ? "Saving..." : "Save Configuration"}
        </button>

        {response && (
          <div className={styles.successMessage}>
            Configuration saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupConfiguration;
