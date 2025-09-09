import React from "react";
import styles from "./SheetDropdown.module.scss";

const SheetDropdown = ({
  options,
  selectedValue,
  onSelect,
  label,
  disabled = false,
}) => {
  return (
    <div className={styles.dropdownContainer}>
      {label && <div className={styles.label}>{label}</div>}
      <select
        className={styles.dropdown}
        value={selectedValue}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "N/A"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SheetDropdown;
