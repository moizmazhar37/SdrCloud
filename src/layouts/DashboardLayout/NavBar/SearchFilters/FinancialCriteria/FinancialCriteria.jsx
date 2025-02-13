import React from "react";
import styles from "./FinancialCriteria.module.scss";

const FinancialCriteria = ({ values, onChange }) => {
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
            checked={values.netWorth.checked}
            onChange={() => handleCheckboxChange("netWorth")}
          />
          <span>Net Worth</span>
        </label>
        {values.netWorth.checked && (
          <div className={styles.inputWrapper}>
            <span className={styles.currencySymbol}>$</span>
            <input
              type="number"
              className={styles.input}
              value={values.netWorth.value}
              onChange={(e) => handleInputChange("netWorth", e.target.value)}
              placeholder="Enter net worth"
              min="0"
            />
          </div>
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.income.checked}
            onChange={() => handleCheckboxChange("income")}
          />
          <span>Annual Income</span>
        </label>
        {values.income.checked && (
          <div className={styles.inputWrapper}>
            <span className={styles.currencySymbol}>$</span>
            <input
              type="number"
              className={styles.input}
              value={values.income.value}
              onChange={(e) => handleInputChange("income", e.target.value)}
              placeholder="Enter annual income"
              min="0"
            />
          </div>
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.ownHouse.checked}
            onChange={() => handleCheckboxChange("ownHouse")}
          />
          <span>Own House</span>
        </label>
      </div>
    </div>
  );
};

export default FinancialCriteria;
