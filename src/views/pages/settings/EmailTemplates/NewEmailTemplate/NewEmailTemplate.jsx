import React, { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./NewEmailTemplate.module.scss";
import { useDataTypes, useSaveEmailTemplate } from "./hooks";
import CopyText from "../CopyText/CopyText";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import Loader from "src/Common/Loader/Loader";

const NewEmailTemplate = () => {
  const location = useLocation();
  const templateId = location.state?.templateId;
  const emailTemplate = location.state?.emailTemplate || null; // Get template if editing

  const { dataTypes, loading, error } = useDataTypes(templateId);
  const { saveTemplate, saving } = useSaveEmailTemplate();

  // State with pre-filled values if editing
  const [name, setName] = useState(emailTemplate?.name || "");
  const [subject, setSubject] = useState(emailTemplate?.subject || "");
  const [body, setBody] = useState(emailTemplate?.body || "");
  const activeInputRef = useRef(null);
  const history = useHistory();

  const isEditing = !!emailTemplate; // True if editing

  useEffect(() => {
    if (emailTemplate) {
      setName(emailTemplate.name);
      setSubject(emailTemplate.subject);
      setBody(emailTemplate.body);
    }
  }, [emailTemplate]);

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

      if (input.name === "subject") {
        setSubject(newText);
      } else {
        setBody(newText);
      }
      input.focus();
    }
  };

  // Field validation
  const validateFields = () => {
    if (!name.trim() || !subject.trim() || !body.trim()) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  // Handle save or update
  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      await saveTemplate({
        name,
        subject,
        body,
        template_id: templateId,
        emailTemplate_id: emailTemplate?.id,
        isUpdate: isEditing,
      });

      toast.success(`Template ${isEditing ? "updated" : "saved"} successfully!`);
      history.push('/email-templates')
    } catch {
      toast.error("Failed to save template. Try again.");
    }
  };

  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Email Templates", route: "/email-templates" },
    { text: isEditing ? "Edit Template" : "Create Template", route: "/create-email-template" },
  ];

  return (
    <div className={styles.container}>
      <DynamicNavigator items={navigationItems} />
      <h2 className={styles.heading}>{isEditing ? "Edit Email Template" : "New Email Template"}</h2>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader size={160} />
        </div>
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
              name="name"
              placeholder="Template Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              placeholder="Hi [Recipient’s Name],\n\nI came across your profile and was impressed by..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onFocus={(e) => (activeInputRef.current = e.target)}
            ></textarea>

            <div className={styles.bottomBar}>
              <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewEmailTemplate;
