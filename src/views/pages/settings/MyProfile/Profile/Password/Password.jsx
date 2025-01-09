import React, { useState } from 'react';
import styles from './Password.module.scss';

const Password = ({ onClose }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'currentPassword':
        return value ? '' : 'Password is required';
      case 'newPassword':
        if (!value) return 'Password is required';
        if (!passwordRegex.test(value)) {
          return 'Password must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters.';
        }
        return '';
      case 'confirmPassword':
        if (!value) return 'Password is required';
        if (value !== passwordData.newPassword) {
          return 'Confirm Password must match with New Password.';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = () => {
    const newErrors = {
      currentPassword: validateField('currentPassword', passwordData.currentPassword),
      newPassword: validateField('newPassword', passwordData.newPassword),
      confirmPassword: validateField('confirmPassword', passwordData.confirmPassword)
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      console.log('Current Password:', passwordData.currentPassword);
      console.log('New Password:', passwordData.newPassword);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Change Password</h2>
        <p className={styles.subtitle}>
          Your new password must be different from previously used password
        </p>

        <div className={styles.inputGroup}>
          <label>Current Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPasswords.currentPassword ? 'text' : 'password'}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('currentPassword')}
              className={styles.toggleButton}
            >
              {showPasswords.currentPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.currentPassword && <span className={styles.error}>{errors.currentPassword}</span>}
          <a href="#" className={styles.forgotLink}>Forgot Password?</a>
        </div>

        <div className={styles.inputGroup}>
          <label>New Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPasswords.newPassword ? 'text' : 'password'}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('newPassword')}
              className={styles.toggleButton}
            >
              {showPasswords.newPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.newPassword && <span className={styles.error}>{errors.newPassword}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Confirm New Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPasswords.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className={styles.toggleButton}
            >
              {showPasswords.confirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>

        <button className={styles.continueButton} onClick={handleSubmit}>
          Continue
        </button>
        <button className={styles.backButton} onClick={onClose}>
          Back to Settings
        </button>
      </div>
    </div>
  );
};

export default Password;
