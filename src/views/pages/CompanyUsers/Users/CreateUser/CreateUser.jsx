import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./CreateUser.module.scss";
import { useCreateUser } from "../Hooks/useCreateUser";
import { toast } from 'react-toastify';

const CreateUser = ({ isOpen, onClose, onSuccess }) => {
  const { createUser, loading, error: apiError } = useCreateUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    title: "",
    linkedinUrl: "",
    meetingLink: "",
    tokens: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      title: "",
      linkedinUrl: "",
      meetingLink: "",
      tokens: ""
    });
    setErrors({});
    setShowPassword(false);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value || value.trim() === "") {
          return "First name is required.";
        }
        if (!/^[^\d\W]/.test(value) || value.length < 2 || value.length > 50 || !/^[a-zA-Z0-9\s-_]+$/.test(value)) {
          return "First name must start with a letter, be between 2 and 50 characters, and contain only alphanumeric or special characters.";
        }
        break;
      case "lastName":
        if (!value || value.trim() === "") {
          return "Last name is required.";
        }
        if (!/^[^\d\W]/.test(value) || value.length < 2 || value.length > 50 || !/^[a-zA-Z0-9\s-_]+$/.test(value)) {
          return "Last name must start with a letter, be between 2 and 50 characters, and contain only alphanumeric or special characters.";
        }
        break;
      case "email":
        if (!value || value.trim() === "") {
          return "Email is required.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "A valid email address is required (e.g., user@example.com).";
        }
        break;
      case "phone":
        if (!value || value.trim() === "") {
          return "Phone number is required.";
        }
        if (value.length < 10) {
          return "Please enter a valid phone number.";
        }
        break;
      case "linkedinUrl":
        if (value && !value.startsWith("https://www.linkedin.com/")) {
          return "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username).";
        }
        break;
      case "meetingLink":
        if (value && !value.startsWith("http")) {
          return "Please enter a valid meeting link URL.";
        }
        break;
      case "password":
        if (!value || value.trim() === "") {
          return "Password is required.";
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(value)) {
          return "Password must be between 8 and 20 characters, including a mix of uppercase, lowercase, numbers, and special characters.";
        }
        break;
      case "title":
        if (!value || value.trim() === "") {
          return "Title is required.";
        }
        break;
      case "tokens":
        if (!value || value.trim() === "") {
          return "Tokens are required.";
        }
        if (isNaN(value) || parseInt(value) < 0) {
          return "Please enter a valid number of tokens.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async () => {
    const validationErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) validationErrors[field] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createUser(formData);
      toast.success('User created successfully');
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to create user');
      console.error('Failed to create user:', err);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Add New User</h2>
          </div>

          {apiError && (
            <div className={styles.apiError}>
              {apiError}
            </div>
          )}

          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label>User First Name*</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter User First Name"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>User Last Name*</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter User Last Name"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Enter User Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            <div className={styles.phoneBox}>
              <label>Phone*</label>
              <div>
                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData((prev) => ({ ...prev, phone }))
                  }
                  containerClass={styles.phoneInputContainer}
                  inputClass={styles.phoneInputField}
                  disabled={loading}
                  onBlur={() => {
                    const error = validateField("phone", formData.phone);
                    setErrors((prev) => ({ ...prev, phone: error }));
                  }}
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Password*</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter User Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Title*</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {errors.title && (
                <span className={styles.error}>{errors.title}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>LinkedIn URL</label>
              <input
                type="text"
                name="linkedinUrl"
                placeholder="Enter User LinkedIn URL"
                value={formData.linkedinUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {errors.linkedinUrl && (
                <span className={styles.error}>{errors.linkedinUrl}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Meeting Link</label>
              <input
                type="text"
                name="meetingLink"
                placeholder="Enter Meeting Link"
                value={formData.meetingLink}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {errors.meetingLink && (
                <span className={styles.error}>{errors.meetingLink}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Tokens*</label>
              <input
                type="number"
                name="tokens"
                placeholder="Enter Tokens"
                value={formData.tokens}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {errors.tokens && (
                <span className={styles.error}>{errors.tokens}</span>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button 
                className={styles.cancelButton} 
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Add & Send Invite'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default CreateUser;