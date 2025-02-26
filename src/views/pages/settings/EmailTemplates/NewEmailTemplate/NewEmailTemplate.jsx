import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./NewEmailTemplate.module.scss";
import { useDataTypes } from "./hooks";
import CopyText from "../CopyText/CopyText";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";

const NewEmailTemplate = () => {
  const location = useLocation();
  const templateId = location.state?.templateId;
  const { dataTypes, loading, error } = useDataTypes(templateId);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const activeInputRef = useRef(null);

  // Filter fields with required data types
  const allowedDataTypes = ["Text", "First name", "Last name", "Customer organization"];
  const filteredFields = dataTypes
    ? dataTypes.filter((item) => allowedDataTypes.includes(item.dataType)).map((item) => item.value)
    : [];

  // Inserts text at cursor position
  const handleInsert = (text) => {
    if (activeInputRef.current) {
      const input = activeInputRef.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newText = input.value.substring(0, start) + text + input.value.substring(end);
      input.value = newText;
      input.setSelectionRange(start + text.length, start + text.length);

      // Update state based on which input is active
      if (input.name === "subject") {
        setSubject(newText);
      } else {
        setBody(newText);
      }
      input.focus();
    }
  };

  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Email Templates", route: "/email-templates" },
    { text: "Create Template", route: "/create-email-template" },
  ];

  return (
    <div className={styles.container}>
      <DynamicNavigator items={navigationItems} />
      <h2 className={styles.heading}>New Email Template</h2>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>Failed to load template</div>
      ) : (
        <div className={styles.content}>
          {/* Left Section - CopyText Fields */}
          <div className={styles.copySection}>
            <h3 className={styles.sectionTitle}>Available Fields</h3>
            <CopyText fields={filteredFields} onInsert={handleInsert} />
          </div>

          {/* Right Section - Email Editor */}
          <div className={`${styles.emailEditor}`}>
            <div className={styles.header}>
              <span>New Message</span>
            </div>

            <input
              className={styles.input}
              type="text"
              name="subject"
              placeholder="[Subject]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onFocus={(e) => (activeInputRef.current = e.target)}
            />

            <textarea
              className={styles.textarea}
              name="body"
              placeholder="Hi [Recipient’s Name],&#10;&#10;I came across your profile and was impressed by..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onFocus={(e) => (activeInputRef.current = e.target)}
            ></textarea>

            <div className={styles.bottomBar}>
              <button className={styles.saveButton}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewEmailTemplate;
