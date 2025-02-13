import React from "react";
import styles from "./LocationCriteria.module.scss";

const LocationCriteria = ({ values, onChange }) => {
  const handleCheckboxChange = (field) => {
    const newValues = {
      ...values,
      [field]: {
        ...values[field],
        checked: !values[field].checked,
      },
    };
    onChange(newValues);
  };

  const handleInputChange = (field, value) => {
    const newValues = {
      ...values,
      [field]: {
        ...values[field],
        value: value,
      },
    };
    onChange(newValues);
  };

  return (
    <div className={styles.criteriaContent}>
      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.state.checked}
            onChange={() => handleCheckboxChange("state")}
          />
          <span>State</span>
        </label>
        {values.state.checked && (
          <input
            type="text"
            className={styles.input}
            value={values.state.value}
            onChange={(e) => handleInputChange("state", e.target.value)}
            placeholder="Enter state"
          />
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.city.checked}
            onChange={() => handleCheckboxChange("city")}
          />
          <span>City</span>
        </label>
        {values.city.checked && (
          <input
            type="text"
            className={styles.input}
            value={values.city.value}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter city"
          />
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.zipCode.checked}
            onChange={() => handleCheckboxChange("zipCode")}
          />
          <span>ZIP Code</span>
        </label>
        {values.zipCode.checked && (
          <input
            type="text"
            className={styles.input}
            value={values.zipCode.value}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            placeholder="Enter ZIP code"
          />
        )}
      </div>
    </div>
  );
};

export default LocationCriteria;
