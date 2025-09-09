import React, { useState, useEffect } from "react";
import styles from "./ViewAdminModal.module.scss";

const ViewAdminModal = ({
  isOpen,
  onClose,
  userData,
  viewMode = "view", // 'view' or 'edit'
  onSave,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    linkedin_url: "",
    phone_no: "",
    title: "",
    tokens: 0,
  });

  const [initialTokens, setInitialTokens] = useState(0);
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState(viewMode);

  useEffect(() => {
    if (userData) {
      const tokens = userData.tokens || 0;
      setFormData({
        email: userData.email || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        linkedin_url: userData.linkedin_url || "",
        phone_no: userData.phone_no || "",
        title: userData.title || "",
        tokens: tokens,
      });
      setInitialTokens(tokens);
    }
    setMode(viewMode);
  }, [userData, viewMode]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tokens") {
      // Prevent tokens from being set to less than initial value
      const parsedValue = parseInt(value) || 0;
      if (parsedValue >= initialTokens) {
        setFormData({
          ...formData,
          [name]: parsedValue,
        });
      } else {
        setFormData({
          ...formData,
          [name]: initialTokens,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const incrementTokens = () => {
    setFormData({
      ...formData,
      tokens: formData.tokens + 1,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (formData.phone_no && !/^\+?[0-9\s\-()]+$/.test(formData.phone_no)) {
      newErrors.phone_no = "Invalid phone number format";
    }

    if (
      formData.linkedin_url &&
      !formData.linkedin_url.startsWith("https://www.linkedin.com/") &&
      !formData.linkedin_url.startsWith("http://www.linkedin.com/") &&
      formData.linkedin_url !== ""
    ) {
      newErrors.linkedin_url = "Invalid LinkedIn URL";
    }

    if (formData.tokens < initialTokens) {
      newErrors.tokens = `Tokens cannot be less than the current amount (${initialTokens})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleSwitchToEdit = () => {
    setMode("edit");
  };

  const renderField = (label, name, type = "text", placeholder = "") => {
    const isEditable = mode === "edit" && name !== "email";
    const fieldValue = formData[name];

    // Special case for tokens field
    if (name === "tokens" && isEditable) {
      return (
        <div className={styles.formGroup}>
          <label className={styles.label}>{label}</label>
          <div className={styles.tokenInputContainer}>
            <input
              type="number"
              name={name}
              value={fieldValue}
              onChange={handleChange}
              className={`${styles.input} ${styles.tokenInput} ${
                errors[name] ? styles.inputError : ""
              }`}
              placeholder={placeholder}
            />
            <button
              type="button"
              className={styles.incrementButton}
              onClick={incrementTokens}
              aria-label="Increment tokens"
            >
              +
            </button>
          </div>
          {errors[name] && (
            <div className={styles.errorText}>{errors[name]}</div>
          )}
        </div>
      );
    }

    return (
      <div className={styles.formGroup}>
        <label className={styles.label}>{label}</label>
        {isEditable ? (
          <>
            <input
              type={type}
              name={name}
              value={fieldValue}
              onChange={handleChange}
              disabled={!isEditable}
              className={`${styles.input} ${
                errors[name] ? styles.inputError : ""
              }`}
              placeholder={placeholder}
            />
            {errors[name] && (
              <div className={styles.errorText}>{errors[name]}</div>
            )}
          </>
        ) : (
          <div className={styles.valueDisplay}>{fieldValue || "-"}</div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{mode === "edit" ? "Edit Admin Details" : "Admin Details"}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {renderField("Email", "email", "email", "email@example.com")}
            {renderField("First Name", "first_name", "text", "First Name")}
            {renderField("Last Name", "last_name", "text", "Last Name")}
            {renderField("Title", "title", "text", "Job Title")}
            {renderField("Phone Number", "phone_no", "tel", "+1234567890")}
            {renderField(
              "LinkedIn URL",
              "linkedin_url",
              "url",
              "https://www.linkedin.com/in/username"
            )}
            {renderField("Tokens", "tokens", "number", "10")}
          </div>

          <div className={styles.buttonGroup}>
            {mode === "view" && (
              <button
                type="button"
                className={styles.editButton}
                onClick={handleSwitchToEdit}
              >
                Edit Details
              </button>
            )}

            {mode === "edit" && (
              <>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  Save Changes
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewAdminModal;
