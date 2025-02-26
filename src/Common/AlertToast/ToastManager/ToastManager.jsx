import React, { useState, useEffect } from 'react';
import AlertToast from '../AlertToast';
import styles from './ToastManager.module.scss';

// Unique ID generator for toasts
const generateId = () => `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const ToastManager = ({ 
  toastMessages = [], 
  duration = 5000,
  warningTexts = {}
}) => {
  const [toasts, setToasts] = useState([]);
  const warningText="You can change the alert configurations from settings."
  useEffect(() => {
    const newToasts = toastMessages.map(message => {
      // Check if this message already exists in our toasts
      const existingToast = toasts.find(toast => toast.message === message);
      
      if (existingToast) {
        return existingToast;
      }
      
      return {
        id: generateId(),
        message,
        isVisible: true,
        warningText: warningTexts[message] || ''
      };
    });
    
    setToasts(newToasts);
  }, [toastMessages]);
  
  const handleDismiss = (id) => {
    setToasts(prevToasts => 
      prevToasts.map(toast => 
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );
    
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 400); 
  };
  
  if (toasts.length === 0) return null;
  
  return (
    <div className={styles.toastManagerWrapper}>
      {toasts.map((toast) => (
        <div 
          className={styles.toastManagerItem} 
          key={toast.id}
        >
          <AlertToast
            message={toast.message}
            warningText={warningText}
            isVisible={toast.isVisible}
            onDismiss={() => handleDismiss(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastManager;