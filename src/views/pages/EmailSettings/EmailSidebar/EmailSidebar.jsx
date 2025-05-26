import React from "react";
import styles from "./EmailSidebar.module.scss";

const EmailSidebar = ({ heading, options, onOptionClick }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.optionsList}>
        {options.map((option, index) => (
          <div
            key={index}
            className={`${styles.option} ${option.active ? styles.active : ""}`}
            onClick={() => onOptionClick && onOptionClick(option, index)}
          >
            <span className={styles.optionText}>{option.label}</span>
            <span className={styles.arrow}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailSidebar;
