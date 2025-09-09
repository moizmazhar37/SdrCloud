import React, { useState, useEffect } from "react";
import styles from "./DuplicateAgentModal.module.scss";

const DuplicateAgentModal = ({
  isOpen,
  onClose,
  onDuplicate,
  agent,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    agentName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or agent changes
  useEffect(() => {
    if (isOpen && agent) {
      setFormData({
        agentName: `${agent.name} (Copy)`,
        email: agent.email,
      });
      setErrors({});
    } else if (!isOpen) {
      setFormData({
        agentName: "",
        email: "",
      });
      setErrors({});
    }
  }, [isOpen, agent]);

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.agentName.trim()) {
      newErrors.agentName = "Agent name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onDuplicate(agent.id, formData.agentName, formData.email);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>✨ Duplicate Agent</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Agent Name:</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={`${styles.input} ${
                errors.agentName ? styles.error : ""
              }`}
              placeholder="Enter agent name"
              autoFocus
            />
            {errors.agentName && (
              <span className={styles.errorMessage}>{errors.agentName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.duplicateButton}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Duplicating..." : "Duplicate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuplicateAgentModal;
