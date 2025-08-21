import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ConfirmationModal.module.scss";

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  confirmationText = "",
  noteText = "",
  cancelButtonText = "Cancel",
  actionButtonText = "Proceed",
  onAction,
  totalRecords = 0,
  showInputField = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    const clamped = Math.max(0, Math.min(totalRecords, value));
    setInputValue(clamped === 0 ? "" : clamped);
  };

  const handleAction = () => {
    onAction(showInputField ? Number(inputValue) || 0 : totalRecords);
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}

        <div className={styles.modalBody}>
          {showInputField ? (
            <div className={styles.inputSection}>
              <label htmlFor="recordsInput" className={styles.inputLabel}>
                Number of Videos (Max: {totalRecords} rows in the sheet):
              </label>
              <input
                id="recordsInput"
                type="number"
                max={totalRecords}
                value={inputValue}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder={`Enter up to ${totalRecords}`}
              />
              <small className={styles.helperText}>
                Enter the number of rows to process. Max is {totalRecords}.
              </small>
            </div>
          ) : (
            <div className={styles.inputSection}>
              <p className={styles.allRowsMessage}>
                This will create videos for all {totalRecords} rows in the sheet.
              </p>
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
              onClick={handleAction}
            >
              {actionButtonText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;
