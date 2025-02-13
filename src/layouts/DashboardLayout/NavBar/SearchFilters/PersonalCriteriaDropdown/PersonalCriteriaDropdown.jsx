import React from "react";
import PropTypes from "prop-types";
import styles from "./PersonalCriteriaDropdown.module.scss";

const PersonalCriteriaDropdown = ({ values = {}, onChange }) => {
  const defaultValues = {
    name: { checked: false, value: { first: "", last: "" } },
    email: { checked: false, value: "" },
    gender: { checked: false, value: "" },
    ageRange: { checked: false, value: "" },
    married: { checked: false, value: false },
    hasChildren: { checked: false, value: false },
  };

  const mergedValues = {
    ...defaultValues,
    ...values,
    name: {
      ...defaultValues.name,
      ...values.name,
      value: {
        ...defaultValues.name.value,
        ...(values.name?.value || {}),
      },
    },
  };

  const handleCheckboxChange = (field) => {
    onChange?.({
      ...mergedValues,
      [field]: {
        ...mergedValues[field],
        checked: !mergedValues[field].checked,
      },
    });
  };

  const handleInputChange = (field, value) => {
    onChange?.({
      ...mergedValues,
      [field]: {
        ...mergedValues[field],
        value,
      },
    });
  };

  return (
    <div className={styles.criteriaContent}>
      {/* Rest of the JSX remains exactly the same as your original code */}
      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={mergedValues.name.checked}
            onChange={() => handleCheckboxChange("name")}
          />
          <span>Name</span>
        </label>
        {mergedValues.name.checked && (
          <div className={styles.nameInputs}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter first name"
              value={mergedValues.name.value.first}
              onChange={(e) =>
                handleInputChange("name", {
                  ...mergedValues.name.value,
                  first: e.target.value,
                })
              }
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Enter last name"
              value={mergedValues.name.value.last}
              onChange={(e) =>
                handleInputChange("name", {
                  ...mergedValues.name.value,
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
            checked={mergedValues.email.checked}
            onChange={() => handleCheckboxChange("email")}
          />
          <span>Email address</span>
        </label>
        {mergedValues.email.checked && (
          <input
            type="email"
            className={styles.input}
            placeholder="Type Email address"
            value={mergedValues.email.value}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={mergedValues.gender.checked}
            onChange={() => handleCheckboxChange("gender")}
          />
          <span>Gender</span>
        </label>
        {mergedValues.gender.checked && (
          <select
            className={styles.select}
            value={mergedValues.gender.value}
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
            checked={mergedValues.ageRange.checked}
            onChange={() => handleCheckboxChange("ageRange")}
          />
          <span>Age Range</span>
        </label>
        {mergedValues.ageRange.checked && (
          <select
            className={styles.select}
            value={mergedValues.ageRange.value}
            onChange={(e) => handleInputChange("ageRange", e.target.value)}
          >
            <option value="">Select age range</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-64">55-64</option>
            <option value="65 and Older">65-Older</option>
          </select>
        )}
      </div>

      <div className={styles.criteriaField}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={mergedValues.married.checked}
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
            checked={mergedValues.hasChildren.checked}
            onChange={() => handleCheckboxChange("hasChildren")}
          />
          <span>Has Children</span>
        </label>
      </div>
    </div>
  );
};

PersonalCriteriaDropdown.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.shape({
      checked: PropTypes.bool,
      value: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string,
      }),
    }),
    email: PropTypes.shape({
      checked: PropTypes.bool,
      value: PropTypes.string,
    }),
    gender: PropTypes.shape({
      checked: PropTypes.bool,
      value: PropTypes.string,
    }),
    ageRange: PropTypes.shape({
      checked: PropTypes.bool,
      value: PropTypes.string,
    }),
    married: PropTypes.shape({
      checked: PropTypes.bool,
      value: PropTypes.bool,
    }),
    hasChildren: PropTypes.shape({
      checked: PropTypes.bool,
      value: PropTypes.bool,
    }),
  }),
  onChange: PropTypes.func,
};

export default PersonalCriteriaDropdown;
