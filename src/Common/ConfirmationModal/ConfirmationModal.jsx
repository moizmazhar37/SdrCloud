import React, { useState, useEffect } from "react";
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
  totalRecords,
  pricePerSecond,
  totalDuration,
  balance,
}) => {
  const [rowsToCreate, setRowsToCreate] = useState(totalRecords);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    const price = rowsToCreate * totalDuration * pricePerSecond;
    setCalculatedPrice(parseFloat(price.toFixed(2))); // Round to 2 decimal places
  }, [rowsToCreate, totalDuration, pricePerSecond]);

  const roundedBalance = parseFloat((balance || 0).toFixed(2)); // Round balance to 2 decimal places
  const isProceedDisabled = calculatedPrice > roundedBalance; // Disable button if price exceeds balance

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
                  <span className={styles.value}>{parseFloat(item.value).toFixed(2)}</span>
                </p>
              ))}
            </div>
          )}

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
              Enter the number of rows to process. Default is {totalRecords}.
            </small>
          </div>

          {/* Balance and Price Details */}
          {/* <p className={styles.infoItem}>
            <span className={styles.label}>Your Balance: </span>
            <span className={styles.value}>{roundedBalance}</span>
          </p> */}

          <p className={styles.infoItem}>
            <span className={styles.label}>Total Price: </span>
            <span className={styles.value}>{calculatedPrice}</span>
          </p>

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
              // disabled={isProceedDisabled}
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
