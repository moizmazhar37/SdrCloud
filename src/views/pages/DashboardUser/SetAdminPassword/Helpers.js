import React from "react";

// Icon components for cleaner code
export const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyeSlashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 3L21 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Password field component to avoid repetition
export const PasswordField = ({
  id,
  value,
  onChange,
  showPassword,
  toggleVisibility,
  placeholder,
  inputRef,
  styles,
}) => (
  <div className={styles.passwordField}>
    <input
      id={id}
      ref={inputRef}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      maxLength={15}
      placeholder={placeholder}
      className={styles.passwordInput}
    />
    <button
      type="button"
      onClick={toggleVisibility}
      className={styles.eyeButton}
      aria-label={`Toggle ${id} visibility`}
    >
      <i className={styles.eyeIcon}>
        {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
      </i>
    </button>
  </div>
);

// Validation item component
export const ValidationItem = ({ isValid, text, styles }) => (
  <li className={isValid ? styles.valid : styles.invalid}>
    <span className={styles.validationIcon}>{isValid ? "✓" : "✗"}</span>
    {text}
  </li>
);

// Password validation function
export const validatePassword = (password, confirmPassword) => {
  return {
    length: password.length >= 8 && password.length <= 15,
    number: /\d/.test(password),
    capital: /[A-Z]/.test(password),
    match: password === confirmPassword && password.length > 0,
  };
};

// Check if all password validations pass
export const isPasswordValid = (validations) => {
  return (
    validations.length &&
    validations.number &&
    validations.capital &&
    validations.match
  );
};
