import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SetPassword.module.scss";
import {
  PasswordField,
  ValidationItem,
  validatePassword,
  isPasswordValid,
} from "../Helpers";
import useSetPassword from "../Hooks/useSetPassword";

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
  const history = useHistory();

  // Use our custom hook
  const {
    setPassword: submitPassword,
    loading,
    success,
    error,
  } = useSetPassword();

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

  // Redirect after successful password setup
  useEffect(() => {
    if (success) {
      // Redirect to root route after successful password setup
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [success, history]);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordValid(validations)) {
      const result = await submitPassword(password);
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

            {error && <div className={styles.errorMessage}>{error}</div>}

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
                  disabled={loading || success}
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
                  disabled={loading || success}
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
                disabled={!isPasswordValid(validations) || loading || success}
              >
                {loading ? "Setting Password..." : "Set Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
