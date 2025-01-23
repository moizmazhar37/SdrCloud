import React from "react";
import styles from "./ConfirmationModal.module.scss";

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  infoItems = [],
  confirmationText = "",
  noteText = "",
  cancelButtonText = "Cancel",
  actionButtonText = "Proceed",
  onAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}

        <div className={styles.modalBody}>
          {infoItems.length > 0 && (
            <div className={styles.infoSection}>
              {infoItems.map((item, index) => (
                <p key={index} className={styles.infoItem}>
                  {item.label && (
                    <span className={styles.label}>{item.label}: </span>
                  )}
                  <span className={styles.value}>{item.value}</span>
                </p>
              ))}
            </div>
          )}

          {confirmationText && (
            <p className={styles.confirmText}>{confirmationText}</p>
          )}

          {noteText && <p className={styles.noteText}>{noteText}</p>}
        </div>

        <div className={styles.modalFooter}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}
          >
            {cancelButtonText}
          </button>
          {actionButtonText && (
            <button
              className={`${styles.button} ${styles.actionButton}`}
              onClick={onAction}
            >
              {actionButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
