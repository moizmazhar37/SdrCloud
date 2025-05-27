import React, { useState } from "react";
import Dropdown from "../DropDownofEmailConfiguration/DropdownEmailConfiguration";
import styles from "./SetupConfiguration.module.scss";

const SetupConfiguration = () => {
  const [followUps, setFollowUps] = useState([{ type: "", template: "" }]);
  const [triggers, setTriggers] = useState([
    { condition1: "", condition2: "", condition3: "" },
  ]);

  const typeOptions = [
    { label: "Email Template", value: "email" },
    { label: "SMS Template", value: "sms" },
  ];

  const templateOptions = [
    // { label: "Welcome Email", value: "welcomeEmail" },
    // { label: "Reminder Email", value: "reminderEmail" },
  ];

  const   actionOptions = [
    // { label: "Clicked Link", value: "clicked" },
    // { label: "Opened Email", value: "opened" },
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
    setTriggers([...triggers, { condition1: "", condition2: "", condition3: "" }]);
  };

  const removeTrigger = (index) => {
    if (triggers.length > 1) {
      const updated = [...triggers];
      updated.splice(index, 1);
      setTriggers(updated);
    }
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
          {[1, 2, 3].map((num) => (
            <div key={num} className={styles.dropdownWrapper}>
              <Dropdown
                options={actionOptions}
                value={item[`condition${num}`]}
                onChange={(val) =>
                  handleTriggerChange(index, `condition${num}`, val)
                }
                placeholder={`User Action`}
              />
            </div>
          ))}
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
    </div>
  );
};

export default SetupConfiguration;
