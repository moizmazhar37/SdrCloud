// Dropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./dorpdown.module.scss";

const Dropdown = ({ options = [], buttonText = "View", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
        {buttonText}
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className={styles.option}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
