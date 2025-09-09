import React from "react";
import styles from "./SupportContactLabel.module.scss";

const SupportContactLabel = ({ manager, phone, email }) => {
  return (
    <div className={styles.supportContact}>
      <h2 className={styles.title}>Support Contact</h2>
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <span className={styles.label}>Manager : </span>
          <span className={styles.value}>{manager}</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.label}>Phone : </span>
          <span className={styles.value}>{phone}</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.label}>Email : </span>
          <span className={styles.value}>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default SupportContactLabel;
