import React, { useState, useEffect } from 'react';
import AlertToast from '../AlertToast';
import styles from './ToastManager.module.scss';
import useMarkAlertViewed from '../useMarkAlertAsViewed';

const ToastManager = ({ toastMessages = [], duration = 5000, staggerDelay = 300 }) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const warningText = "You can change the alert configurations from settings.";
  const { markAlertViewed, loading } = useMarkAlertViewed();

  useEffect(() => {
    const newAlerts = toastMessages.filter(
      alert => !visibleAlerts.some(visible => visible.id === alert.id)
    );

    if (newAlerts.length > 0) {
      newAlerts.forEach((alert, index) => {
        setTimeout(() => {
          setVisibleAlerts(prev => [...prev, alert]);
        }, index * staggerDelay);
      });
    }
    
    setVisibleAlerts(prev => 
      prev.filter(visible => toastMessages.some(alert => alert.id === visible.id))
    );
  }, [toastMessages, staggerDelay]);

  const handleDismiss = async (id) => {
    try {
      // Call the API to mark the alert as viewed
      await markAlertViewed(id);
      
      // Remove the alert from visible alerts after API call succeeds
      setVisibleAlerts(prev => prev.filter(alert => alert.id !== id));
    } catch (error) {
      // Even if the API fails, remove the alert from UI for better UX
      // The error is already being handled in the hook with toast.error
      setVisibleAlerts(prev => prev.filter(alert => alert.id !== id));
    }
  };

  return (
    <div className={styles.toastManager}>
      {visibleAlerts.map((alert) => (
        <AlertToast
          key={alert.id}
          message={alert.text}
          isVisible={true}
          onDismiss={() => handleDismiss(alert.id)}
          warningText={warningText}
        />
      ))}
    </div>
  );
};

export default ToastManager;