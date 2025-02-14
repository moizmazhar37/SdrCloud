import React from "react";
import styles from "./FinancialCriteria.module.scss";

const FinancialCriteria = ({ values = {}, onChange }) => {
  const defaultValues = {
    netWorth: { checked: false, value: "" },
    income: { checked: false, value: "" },
    ownHouse: { checked: false, value: null },
  };

  const mergedValues = {
    ...defaultValues,
    ...values,
  };

  const handleCheckboxChange = (field) => {
    const newValues = {
      ...mergedValues,
      [field]: {
        ...mergedValues[field],
        checked: !mergedValues[field].checked,
      },
    };
    onChange(newValues);
  };

  const handleInputChange = (field, value) => {
    const newValues = {
      ...mergedValues,
      [field]: {
        ...mergedValues[field],
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
            checked={mergedValues.netWorth.checked}
            onChange={() => handleCheckboxChange("netWorth")}
          />
          <span>Net Worth</span>
        </label>
        {mergedValues.netWorth.checked && (
          <div className={styles.inputWrapper}>
            <span className={styles.currencySymbol}>$</span>
            <input
              type="number"
              className={styles.input}
              value={mergedValues.netWorth.value}
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
            checked={mergedValues.income.checked}
            onChange={() => handleCheckboxChange("income")}
          />
          <span>Annual Income</span>
        </label>
        {mergedValues.income.checked && (
          <div className={styles.inputWrapper}>
            <span className={styles.currencySymbol}>$</span>
            <input
              type="number"
              className={styles.input}
              value={mergedValues.income.value}
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
            checked={mergedValues.ownHouse.checked}
            onChange={() => handleCheckboxChange("ownHouse")}
          />
          <span>Own House</span>
        </label>
        {mergedValues.ownHouse.checked && (
          <select
            className={`${styles.select} ${
              !mergedValues.ownHouse.value && styles.placeholder
            }`}
            value={mergedValues.ownHouse.value ?? ""}
            onChange={(e) =>
              handleInputChange("ownHouse", e.target.value === "true")
            }
          >
            <option value="" disabled hidden>
              Home Ownership Status
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default FinancialCriteria;
