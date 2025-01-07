import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./CreateUser.module.scss";
import { useCreateUser } from "../Hooks/useCreateUser";
import useUpdateUser from "../Hooks/useUpdateUser";
import useFetchUser from "../Hooks/useFetchUser";
import { toast } from "react-toastify";
import {
  resetForm,
  validateField,
  handleChange,
  handleBlur,
  handleSubmit,
} from "./helpers";

const CreateUser = ({ isOpen, onClose, onSuccess, userId, viewState }) => {
  const { createUser, loading: createLoading, error: createError } = useCreateUser();
  const { updateUser, loading: updateLoading, error: updateError } = useUpdateUser();
  const { data: userData, loadingUserData, refetch } = useFetchUser(userId);
  
  const loading = viewState === "edit" ? updateLoading : createLoading;
  const apiError = viewState === "edit" ? updateError : createError;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    title: "",
    linkedinUrl: "",
    meetingLink: "",
    tokens: "",
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Single effect to handle both modal state and form data
  useEffect(() => {
    if (!isOpen) {
      resetForm(setFormData, setErrors, setShowPassword);
      return;
    }

    if (viewState === "edit" && userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phoneNo || "",
        password: userData.password || "",
        title: userData.title || "",
        linkedinUrl: userData.linkedinUrl || "",
        meetingLink: userData.meetLink || "",
        tokens: userData.tokens || 0,
      });
    } else if (viewState === "create") {
      resetForm(setFormData, setErrors, setShowPassword);
    }
  }, [isOpen, userData, viewState]);

  const handleClose = () => {
    resetForm(setFormData, setErrors, setShowPassword);
    onClose();
  };
  const handleFormSubmit = async () => {
    const validationErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) validationErrors[field] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (viewState === "edit") {
        await updateUser({ ...formData, id: userId });
        toast.success("User updated successfully!");
      } else {
        await createUser(formData);
        toast.success("User created successfully!");
      }
      
      handleClose();
      onSuccess();
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  if (!isOpen) return null;

  if (viewState === "edit" && loadingUserData) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Loading user data...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>{viewState === "edit" ? "Edit User" : "Add New User"}</h2>
          </div>

          {apiError && <div className={styles.apiError}>{apiError}</div>}

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
                disabled={loading }
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
                onClick={handleFormSubmit}
                disabled={loading}
              >
                {loading
                  ? viewState === "edit"
                    ? "Updating..."
                    : "Creating..."
                  : viewState === "edit"
                  ? "Update & Save"
                  : "Add & Send Invite"}
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
  onSuccess: PropTypes.func.isRequired,
  userId: PropTypes.string,
  viewState: PropTypes.oneOf(["edit", "create"]).isRequired,
};

export default CreateUser;