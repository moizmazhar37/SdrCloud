import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import styles from "./AddUser.module.scss";
import useCreateSdrcAdmin from "../UserManagement/Hooks/useCreateSDRC";

const AddUser = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const {
    createAdmin,
    loading,
    error: apiError,
    success,
  } = useCreateSdrcAdmin();

  useEffect(() => {
    if (success) {
      toast.success("Admin created successfully!");
      onClose();
    }
    if (apiError) {
      toast.error(apiError.message || "Failed to create admin");
    }
  }, [success, apiError, onClose]);

  if (!show) return null;

  const validateForm = () => {
    const { firstName, lastName, email } = formData;
    const nameRegex = /^[a-zA-Z0-9]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(firstName)) {
      toast.error("First name must be 2-50 characters, alphanumeric only");
      return false;
    }
    if (!nameRegex.test(lastName)) {
      toast.error("Last name must be 2-50 characters, alphanumeric only");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await createAdmin(formData);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <div className={styles.breadcrumb}>
          Account Admin /{" "}
          <span className={styles.blueText}>Create New SDRCloud.ai Admin</span>
        </div>

        <div className={styles.header}>
          <span>Create New SDRCloud.ai Employee Admin</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter SDRCloud.ai Admin First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter SDRCloud.ai Admin Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter SDRCloud.ai Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Admin Phone</label>
            <PhoneInput
              country={"us"}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              inputClass={styles.phoneInput}
            />
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create & Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
