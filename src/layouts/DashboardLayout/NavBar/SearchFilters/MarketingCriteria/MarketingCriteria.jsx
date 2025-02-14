import React from "react";
import styles from "./MarketingCriteria.module.scss";

const MarketingCriteria = ({ values = {}, onChange }) => {
  // Default structure for each field if not provided
  const getFieldValue = (fieldName) => {
    return values[fieldName] || { checked: false, value: "" };
  };

  const handleCheckboxChange = (field) => {
    const currentField = getFieldValue(field);
    const newValues = {
      ...values,
      [field]: {
        ...currentField,
        checked: !currentField.checked,
      },
    };
    onChange(newValues);
  };

  const handleInputChange = (field, value) => {
    const currentField = getFieldValue(field);
    const newValues = {
      ...values,
      [field]: {
        ...currentField,
        value: value,
      },
    };
    onChange(newValues);
  };

  const fields = ["domains", "referralSource", "keyword", "pageViewed"];

  return (
    <div className={styles.criteriaContent}>
      {fields.map((field) => (
        <div key={field} className={styles.criteriaField}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={getFieldValue(field).checked}
              onChange={() => handleCheckboxChange(field)}
            />
            <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
          </label>
          {getFieldValue(field).checked && (
            <input
              type="text"
              className={styles.input}
              value={getFieldValue(field).value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Type ${field} here`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MarketingCriteria;
