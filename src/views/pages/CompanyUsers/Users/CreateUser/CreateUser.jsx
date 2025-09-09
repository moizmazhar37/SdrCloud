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
  const {
    createUser,
    loading: createLoading,
    error: createError,
  } = useCreateUser();
  const {
    updateUser,
    loading: updateLoading,
    error: updateError,
  } = useUpdateUser();
  const { data: userData, loadingUserData, refetch } = useFetchUser(userId);

  const loading = viewState === "edit" ? updateLoading : createLoading;
  const apiError = viewState === "edit" ? updateError : createError;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    linkedinUrl: "",
    meetingLink: "",
    tokens: "",
    permissions: ["VIEW"], // Default to VIEW permission
  });

  const [errors, setErrors] = useState({});

  // Single effect to handle both modal state and form data
  useEffect(() => {
    if (!isOpen) {
      resetForm(setFormData, setErrors);
      setFormData((prev) => ({ ...prev, permissions: ["VIEW"] }));
      return;
    }

    if (viewState === "edit" && userData) {
      setFormData({
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        email: userData.email || "",
        phone: userData.phone_no || "", // Fixed: changed from phoneNo to phone_no
        title: userData.title || "",
        linkedinUrl: userData.linkedin_url || "",
        meetingLink: userData.meetLink || "",
        tokens: userData.tokens || 0,
        permissions: userData.permissions || ["VIEW"],
      });
    } else if (viewState === "create") {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        title: "",
        linkedinUrl: "",
        meetingLink: "",
        tokens: "",
        permissions: ["VIEW"],
      });
      setErrors({});
    }
  }, [isOpen, userData, viewState]);

  const handleClose = () => {
    resetForm(setFormData, setErrors);
    onClose();
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => {
      let newPermissions = [...(prev.permissions || ["VIEW"])];

      if (permission === "CREATE") {
        if (newPermissions.includes("CREATE")) {
          // Remove CREATE permission
          newPermissions = newPermissions.filter((p) => p !== "CREATE");
        } else {
          // Add CREATE permission and ensure VIEW is also included
          newPermissions.push("CREATE");
          if (!newPermissions.includes("VIEW")) {
            newPermissions.push("VIEW");
          }
        }
      } else if (permission === "VIEW") {
        if (
          newPermissions.includes("VIEW") &&
          !newPermissions.includes("CREATE")
        ) {
          // Only allow unchecking VIEW if CREATE is not selected
          newPermissions = newPermissions.filter((p) => p !== "VIEW");
        } else if (!newPermissions.includes("VIEW")) {
          // Add VIEW permission
          newPermissions.push("VIEW");
        }
      }

      return { ...prev, permissions: newPermissions };
    });
  };

  const isTokensDisabled = () => {
    return !(formData.permissions || []).includes("CREATE");
  };

  const handleFormSubmit = async () => {
    const validationErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field === "permissions") return; // Skip permissions validation here
      const error = validateField(field, formData[field]);
      if (error) validationErrors[field] = error;
    });

    // Validate permissions
    if (!formData.permissions || formData.permissions.length === 0) {
      validationErrors.permissions = "At least one permission must be selected";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNo: formData.phone, // This stays as phoneNo for API submission
        title: formData.title,
        linkedinUrl: formData.linkedinUrl,
        meetLink: formData.meetingLink,
        permissions: formData.permissions,
      };

      // Only include tokens if CREATE permission is selected
      if ((formData.permissions || []).includes("CREATE")) {
        submitData.tokens = parseInt(formData.tokens) || 0;
      }

      if (viewState === "edit") {
        await updateUser({ ...submitData, id: userId });
        toast.success("User updated successfully!");
      } else {
        await createUser(submitData);
        toast.success("User created successfully!");
      }

      handleClose();
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to create user");
      console.error("Failed to create user:", error);
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

            {viewState !== "edit" && (
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
            )}

            <div className={styles.formGroup}>
              <label>User Permissions*</label>
              <div className={styles.permissionsGroup}>
                <button
                  type="button"
                  className={`${styles.permissionButton} ${
                    (formData.permissions || []).includes("VIEW")
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => handlePermissionChange("VIEW")}
                  disabled={
                    loading || (formData.permissions || []).includes("CREATE")
                  }
                >
                  VIEW
                </button>
                <button
                  type="button"
                  className={`${styles.permissionButton} ${
                    (formData.permissions || []).includes("CREATE")
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => handlePermissionChange("CREATE")}
                  disabled={loading}
                >
                  CREATE
                </button>
              </div>
              {errors.permissions && (
                <span className={styles.error}>{errors.permissions}</span>
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
                disabled={loading || isTokensDisabled()}
              />
              {errors.tokens && (
                <span className={styles.error}>{errors.tokens}</span>
              )}
              {isTokensDisabled() && (
                <span className={styles.info}>
                  Tokens are only available for users with CREATE permission
                </span>
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
