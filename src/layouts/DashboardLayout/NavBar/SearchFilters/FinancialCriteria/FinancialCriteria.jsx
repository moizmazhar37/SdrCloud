import React from "react";
import styles from "./FinancialCriteria.module.scss";

const FinancialCriteria = ({ values = {}, onChange }) => {
  const defaultValues = {
    netWorth: {
      checked: false,
      minValue: "",
      maxValue: "",
    },
    income: {
      checked: false,
      value: "",
    },
    ownHouse: {
      checked: false,
      value: null,
    },
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

  const handleInputChange = (field, property, value) => {
    const newValues = {
      ...mergedValues,
      [field]: {
        ...mergedValues[field],
        [property]: value,
      },
    };
    onChange(newValues);
  };

  // Format currency with commas
  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-US").format(value);
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
          <div className={styles.rangeWrapper}>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input
                type="number"
                className={styles.input}
                value={mergedValues.netWorth.minValue}
                onChange={(e) =>
                  handleInputChange("netWorth", "minValue", e.target.value)
                }
                placeholder="Min"
                min="0"
              />
            </div>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input
                type="number"
                className={styles.input}
                value={mergedValues.netWorth.maxValue}
                onChange={(e) =>
                  handleInputChange("netWorth", "maxValue", e.target.value)
                }
                placeholder="Max"
                min="0"
              />
            </div>
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
              onChange={(e) =>
                handleInputChange("income", "value", e.target.value)
              }
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
              handleInputChange("ownHouse", "value", e.target.value === "true")
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
