import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./CreateUser.module.scss";
import { useCreateUser } from "../Hooks/useCreateUser";
import { toast } from 'react-toastify';
import { resetForm, validateField, handleChange, handleBlur, handleSubmit } from "./helpers";

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

  const handleClose = () => {
    resetForm(setFormData, setErrors, setShowPassword);
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
                onChange={(e) => handleChange(e, setFormData, setErrors)}
                onBlur={(e) => handleBlur(e, setErrors)}
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
                onChange={(e) => handleChange(e, setFormData, setErrors)}
                onBlur={(e) => handleBlur(e, setErrors)}
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
                onChange={(e) => handleChange(e, setFormData, setErrors)}
                onBlur={(e) => handleBlur(e, setErrors)}
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
                  onChange={(e) => handleChange(e, setFormData, setErrors)}
                  onBlur={(e) => handleBlur(e, setErrors)}
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
                onChange={(e) => handleChange(e, setFormData, setErrors)}
                onBlur={(e) => handleBlur(e, setErrors)}
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
                onChange={(e) => handleChange(e, setFormData, setErrors)}
                onBlur={(e) => handleBlur(e, setErrors)}
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
                onChange={(e) => handleChange(e, setFormData, setErrors)}
                onBlur={(e) => handleBlur(e, setErrors)}
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
                onChange={(e) => handleChange(e, setFormData, setErrors)}
                onBlur={(e) => handleBlur(e, setErrors)}
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
                onClick={() => handleSubmit(
                  formData,
                  validateField,
                  setErrors,
                  createUser,
                  toast,
                  () => resetForm(setFormData, setErrors, setShowPassword),
                  onSuccess
                )}
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
