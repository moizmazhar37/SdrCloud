import React from "react";
import styles from "./PersonalCriteriaDropdown.module.scss";

const PersonalCriteriaDropdown = ({ values, onChange }) => {
  const handleCheckboxChange = (field) => {
    onChange({
      ...values,
      [field]: {
        ...values[field],
        checked: !values[field].checked,
      },
    });
  };

  const handleInputChange = (field, value) => {
    onChange({
      ...values,
      [field]: {
        ...values[field],
        value,
      },
    });
  };

  return (
    <div className={styles.criteriaContent}>
      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.name.checked}
            onChange={() => handleCheckboxChange("name")}
          />
          <span>Name</span>
        </label>
        {values.name.checked && (
          <div className={styles.nameInputs}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter first name"
              value={values.name.value.first}
              onChange={(e) =>
                handleInputChange("name", {
                  ...values.name.value,
                  first: e.target.value,
                })
              }
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Enter last name"
              value={values.name.value.last}
              onChange={(e) =>
                handleInputChange("name", {
                  ...values.name.value,
                  last: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.email.checked}
            onChange={() => handleCheckboxChange("email")}
          />
          <span>Email address</span>
        </label>
        {values.email.checked && (
          <input
            type="email"
            className={styles.input}
            placeholder="Type Email address"
            value={values.email.value}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.gender.checked}
            onChange={() => handleCheckboxChange("gender")}
          />
          <span>Gender</span>
        </label>
        {values.gender.checked && (
          <select
            className={styles.select}
            value={values.gender.value}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.ageRange.checked}
            onChange={() => handleCheckboxChange("ageRange")}
          />
          <span>Age Range</span>
        </label>
        {values.ageRange.checked && (
          <select
            className={styles.select}
            value={values.ageRange.value}
            onChange={(e) => handleInputChange("ageRange", e.target.value)}
          >
            <option value="">Select age range</option>
            <option value="1-25">1-25</option>
            <option value="25-35">25-35</option>
            <option value="35-45">35-45</option>
            <option value="45-55">45-55</option>
            <option value="55-65">55-65</option>
            <option value="65+">65-Older</option>
          </select>
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.married.checked}
            onChange={() => handleCheckboxChange("married")}
          />
          <span>Married</span>
        </label>
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={values.hasChildren.checked}
            onChange={() => handleCheckboxChange("hasChildren")}
          />
          <span>Has Children</span>
        </label>
      </div>
    </div>
  );
};

export default PersonalCriteriaDropdown;
