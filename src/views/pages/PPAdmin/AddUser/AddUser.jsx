import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./AddUser.module.scss";

const AddUser = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  if (!show) return null;

  const validateForm = () => {
    const { firstName, lastName, email, password } = formData;
    const newErrors = {};

    if (!firstName || firstName.length < 2 || firstName.length > 50 || !/^[a-zA-Z0-9]+$/.test(firstName))
      newErrors.firstName = "Admin first name is required and must be between 2 and 50 characters, containing only alphabetic or alphanumeric characters.";

    if (!lastName || lastName.length < 2 || lastName.length > 50 || !/^[a-zA-Z0-9]+$/.test(lastName))
      newErrors.lastName = "Admin last name is required and must be between 2 and 50 characters, containing only alphabetic or alphanumeric characters.";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "A valid email address is required (e.g., user@example.com).";

    if (!password || password.length < 8 || password.length > 16 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password))
      newErrors.password = "Password must be between 8 and 16 characters, including uppercase, lowercase, numbers, and special characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      onClose();
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <div className={styles.breadcrumb}>
        Account Admin / <span className={styles.blueText}>Create New SDRCloud.ai Admin</span>
        </div>

        <div className={styles.header}>
          <span>Create New SDRCloud.ai Employee Admin</span>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Admin First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter SDRCloud.ai Admin First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Admin Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter SDRCloud.ai Admin Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Admin Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter SDRCloud.ai Admin Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
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

          <div className={styles.formGroup}>
            <label>Admin Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Create & Send Invite</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
