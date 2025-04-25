import React, { useState, useEffect, useRef } from "react";
import styles from "./VerifyOTP.module.scss";
import SetPassword from "./SetPassword/SetPassword";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const inputRefs = useRef([]);

  // Hardcoded OTP for verification
  const hardcodedOTP = "123456";

  useEffect(() => {
    // Focus on first input on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow one digit
    if (value.length > 1 || !/^\d*$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input and clear it
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();

      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // If pasted data matches expected format
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      // Focus the last input
      inputRefs.current[5].focus();
    }
  };

  const handleResendOtp = () => {
    // Reset OTP
    setOtp(["", "", "", "", "", ""]);

    // Focus first input
    inputRefs.current[0].focus();

    // Here you would call your API to resend OTP
    console.log("Resending OTP...");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      // Check if entered OTP matches hardcoded OTP
      if (otpValue === hardcodedOTP) {
        // Show SetPassword component if OTP is correct
        setShowSetPassword(true);
      } else {
        // Handle incorrect OTP (you might want to add error message display)
        console.log("Incorrect OTP");
        // Optional: add visual feedback for incorrect OTP
      }
    }
  };

  // If verification is successful, show SetPassword component
  if (showSetPassword) {
    return <SetPassword />;
  }

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

          <div className={styles.otpContainer}>
            <h2>One Time Password</h2>
            <p>Enter One Time Password sent to your registered email address</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.otpInputs}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    pattern="\d*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : null}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className={styles.otpInput}
                  />
                ))}
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={otp.join("").length !== 6}
              >
                Submit
              </button>
            </form>

            <div className={styles.resendContainer}>
              <button onClick={handleResendOtp} className={styles.resendBtn}>
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
