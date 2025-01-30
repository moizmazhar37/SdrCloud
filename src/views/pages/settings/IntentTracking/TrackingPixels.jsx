import React, { useState } from "react";
import styles from "./tracking-pixels.module.scss";

const TrackingPixels = () => {
  const initialFields = [
    {
      id: "facebook",
      label: ["Facebook"],
      placeholder: "Enter Facebook Tracking Pixels",
      selectedOption: "Facebook",
      value: "",
      editable: false,
    },
    {
      id: "linkedin",
      label: ["LinkedIn"],
      placeholder: "Enter LinkedIn Tracking Pixels",
      selectedOption: "LinkedIn",
      value: "",
      editable: false,
    },
    {
      id: "google",
      label: ["Google"],
      placeholder: "Enter Google Analytics Tracking Pixels",
      selectedOption: "Google",
      value: "",
      editable: false,
    },
    {
      id: "abm",
      label: ["Terminus", "Demand Base", "6Sense", "Other"],
      placeholder: "Enter ABM Tracking Pixels for Terminus",
      selectedOption: "Terminus",
      value: "",
      editable: false,
    },
    {
      id: "crm",
      label: ["Salesforce", "Hubspot", "CRM"],
      placeholder: "Enter CRM Tracking Pixels",
      selectedOption: "Salesforce",
      value: "",
      editable: false,
    },
    {
      id: "outbound",
      label: ["Salesloft", "Outreach"],
      placeholder: "Enter Outbound Cadence Platform Tracking Pixels",
      selectedOption: "Salesloft",
      value: "",
      editable: false,
    },
    {
      id: "experience",
      label: ["Experience.com", "Other"],
      placeholder: "Enter Other Tracking Pixels",
      selectedOption: "Experience.com",
      value: "",
      editable: false,
    },
  ];

  const [fields, setFields] = useState(initialFields);

  const handleInputChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const handleOptionChange = (id, option) => {
    const updatedFields = fields.map((field) =>
      field.id === id
        ? {
          ...field,
          selectedOption: option,
          placeholder: `Enter ${field.label.includes(option) ? option : "Other"} Tracking Pixels`,
        }
        : field
    );
    setFields(updatedFields);
  };

  const toggleEdit = (id) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, editable: !field.editable } : field
    );
    setFields(updatedFields);
  };

  const handleSave = () => {
    const payload = fields.map((field) => ({
      id: field.id,
      selectedOption: field.selectedOption,
      value: field.value,
    }));
    console.log("Payload:", payload);
    alert("Data saved successfully!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.heading}>Tracking Pixels</span>
        <button className={styles.saveButton} onClick={handleSave}>
          Save All
        </button>
      </div>
      <div className={styles.scrollable}>
        <div className={styles.content}>
          {fields.map((field) => (
            <div key={field.id} className={styles.row}>
              <div className={styles.labelGroup}>
                {field.label.map((option, idx) => (
                  <span
                    key={option}
                    className={`${styles.label} ${field.selectedOption === option ? styles.selected : ""
                      }`}
                    onClick={() => handleOptionChange(field.id, option)}
                  >
                    {option}
                    {idx < field.label.length - 1 && " | "}
                  </span>
                ))}
                <button
                  className={styles.editButton}
                  onClick={() => toggleEdit(field.id)}
                >
                  {field.editable ? "Save" : "Edit"}
                </button>
              </div>
              <input
                type="text"
                placeholder={field.placeholder}
                value={field.value}
                className={styles.input}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                disabled={!field.editable}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingPixels;
