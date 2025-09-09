import React, { useState } from "react";
import styles from "./AgentPopUp.module.scss";
import usePostAgent from "./Hooks/usePostAgent";

const AgentPopUp = ({ isOpen, onClose, onSave, title = "Add Agent" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const {
    loading: isSubmitting,
    error: submitError,
    postAgent,
  } = usePostAgent();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Agent name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await postAgent(formData.name, formData.email);
      await onSave(formData);
      setFormData({ name: "", email: "" });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error saving agent:", error);
      setErrors({ general: "Failed to save agent. Please try again." });
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close popup"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.subtitle}>
            Please provide your agent information to get started with email
            setup
          </p>
          {errors.general && (
            <div
              className={styles.errorMessage}
              style={{ marginBottom: "1rem" }}
            >
              {errors.general}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="agentName">
              Agent Name
            </label>
            <div className={styles.inputContainer}>
              <input
                id="agentName"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.input} ${
                  errors.name ? styles.inputError : ""
                }`}
                placeholder="Enter your full name"
              />
              <div className={styles.inputLine}></div>
            </div>
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="agentEmail">
              Email Address
            </label>
            <div className={styles.inputContainer}>
              <input
                id="agentEmail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} ${
                  errors.email ? styles.inputError : ""
                }`}
                placeholder="Enter your email address"
              />
              <div className={styles.inputLine}></div>
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentPopUp;
