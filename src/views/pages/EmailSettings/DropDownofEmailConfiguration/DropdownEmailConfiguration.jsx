import React, { useState, useRef } from "react";
import styles from "./DropdownEmailConfiguration.module.scss";

const DropdownEmailConfiguration = ({
  options = [
    { value: "asas", label: "asas" },
    { value: "asasasasasas", label: "asasasasasas" },
    { value: "kjnsefjkfa", label: "kjnsefjkfa" },
    { value: "asjklfaefjksbjkanald", label: "asjklfaefjksbjkanald" },
  ],
  value,
  onChange,
  placeholder = "Select option",
  className = "",
  maxHeight = 200, // Configurable max height, default 200px
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.button} ${
          !selectedOption ? styles.placeholder : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.text}>{displayText}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={styles.menu}
          role="listbox"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`${styles.item} ${
                option.value === value ? styles.itemSelected : ""
              } ${index === 0 ? styles.itemFirst : ""} ${
                index === options.length - 1 ? styles.itemLast : ""
              }`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOptionClick(option.value);
                }
              }}
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownEmailConfiguration;
