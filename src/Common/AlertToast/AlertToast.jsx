import React, { useState, useEffect } from 'react';
import styles from './AlertToast.module.scss';

const AlertToast = ({
  message,
  isVisible,
  onDismiss,
  duration = null, 
  warningText = '',
}) => {
  const [isShowing, setIsShowing] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
    }
  }, [isVisible]);

  useEffect(() => {
    // Only auto-dismiss if duration is provided
    if (duration && isShowing) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isShowing, duration]);

  const handleDismiss = () => {
    setIsShowing(false);
    
    // Execute the onDismiss function if provided
    if (onDismiss && typeof onDismiss === 'function') {
      onDismiss();
    }
  };

  if (!isVisible && !isShowing) return null;
  
  return (
    <div className={`${styles.toastContainer} ${isShowing ? styles.show : styles.hide}`}>
      <div className={styles.toast}>
        <div className={styles.iconContainer}>
          <svg
            className={styles.warningIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          {warningText && <p className={styles.warningText}>{warningText}</p>}
        </div>
        <button
          className={styles.dismissButton}
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlertToast;