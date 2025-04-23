import React, { useState, useEffect } from "react";
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
  totalRecords,
}) => {
  const [rowsToCreate, setRowsToCreate] = useState(totalRecords);
  const [calculatedPrice, setCalculatedPrice] = useState(0);



  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}

        <div className={styles.modalBody}>
          {/* Input field for number of records */}
          <div className={styles.inputSection}>
            <label htmlFor="recordsInput" className={styles.inputLabel}>
              Number of Videos (Max: {totalRecords} rows in the sheet):
            </label>
            <input
              id="recordsInput"
              type="number"
              // min="1"
              max={totalRecords}
              value={rowsToCreate}
              onChange={(e) => {
                const value = Math.min(totalRecords, Math.max(0, Number(e.target.value)));
                setRowsToCreate(value);
              }}
              className={styles.inputField}
            />
            <small className={styles.helperText}>
              Enter the number of rows to process. Max is {totalRecords}.
            </small>
          </div>



          {confirmationText && <p className={styles.confirmText}>{confirmationText}</p>}
          {noteText && <p className={styles.noteText}>{noteText}</p>}
        </div>

        <div className={styles.modalFooter}>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>
            {cancelButtonText}
          </button>
          {actionButtonText && (
            <button
              className={`${styles.button} ${styles.actionButton}`}
              onClick={() => onAction(rowsToCreate)}
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
