import React from 'react';
import styles from './modal.module.scss';

const WarningModal = ({ 
  isOpen, 
  onCancel, 
  onDelete, 
  title = "Warning: Permanent Deletion",
  message = "Please be aware that this action is irreversible. By clicking the 'Delete' button below, you will permanently delete this Sheet and all the tempelates linked to it from the system. This means you will not be able to retrieve or restore it in the future."
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;