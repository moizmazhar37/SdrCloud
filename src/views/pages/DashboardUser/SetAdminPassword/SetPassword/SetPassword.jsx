import React, { useState, useEffect, useRef } from "react";
import styles from "./SetPassword.module.scss";
import {
  PasswordField,
  ValidationItem,
  validatePassword,
  isPasswordValid,
} from "../Helpers";
const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    capital: false,
    match: false,
  });
  const passwordRef = useRef(null);

  useEffect(() => {
    // Focus on password input on component mount
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Validate password as user types
    setValidations(validatePassword(password, confirmPassword));
  }, [password, confirmPassword]);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid(validations)) {
      // Here you would send the password to your backend
      console.log("Password set successfully:", password);
    }
  };

  return (
    <div className={styles.sdrWelcome}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img
            src="images/template/SDR.png"
            alt="SDRCloud Logo"
            className={styles.logo}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Welcome to SDRCloud</h1>

          <div className={styles.passwordContainer}>
            <h2>Set Your Password</h2>
            <p>Create a strong password to secure your account</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <PasswordField
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  showPassword={showPassword}
                  toggleVisibility={togglePasswordVisibility}
                  placeholder="Enter your password"
                  inputRef={passwordRef}
                  styles={styles}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <PasswordField
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  showPassword={showConfirmPassword}
                  toggleVisibility={toggleConfirmPasswordVisibility}
                  placeholder="Confirm your password"
                  styles={styles}
                />
              </div>

              <div className={styles.validationContainer}>
                <h3>Password Requirements</h3>
                <ul className={styles.validationList}>
                  <ValidationItem
                    isValid={validations.length}
                    text="Between 8-15 characters"
                    styles={styles}
                  />
                  <ValidationItem
                    isValid={validations.number}
                    text="Contains at least one number"
                    styles={styles}
                  />
                  <ValidationItem
                    isValid={validations.capital}
                    text="Contains at least one capital letter"
                    styles={styles}
                  />
                  <ValidationItem
                    isValid={validations.match}
                    text="Passwords match"
                    styles={styles}
                  />
                </ul>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!isPasswordValid(validations)}
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
