import React, { useState, useEffect, useRef } from "react";
import styles from "./VerifyOTP.module.scss";
import SetPassword from "./SetPassword/SetPassword";
import useAdminApi from "./Hooks/useAdminApi";
const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Use the custom hook
  const { verifyOtp, loading, error: apiError } = useAdminApi();

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Token not found in URL");
    }

    // Focus on first input on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Update error state when API error changes
  useEffect(() => {
    if (apiError) {
      setError(apiError);
    }
  }, [apiError]);

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

    // Reset error if any
    setError("");

    // Here you would call your API to resend OTP
    console.log("Resending OTP...");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length === 6 && token) {
      try {
        // Call the API to verify OTP
        await verifyOtp(otpValue, token);

        // If verification is successful, show SetPassword component
        setShowSetPassword(true);
      } catch (err) {
        // Error is already handled by the hook and will be displayed
        console.error("OTP verification failed:", err.message);
      }
    } else if (!token) {
      setError("Authentication token is missing");
    }
  };

  // If verification is successful, show SetPassword component
  if (showSetPassword) {
    return <SetPassword token={token} />;
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

            {error && <div className={styles.error}>{error}</div>}

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
                disabled={otp.join("").length !== 6 || loading || !token}
              >
                {loading ? "Verifying..." : "Submit"}
              </button>
            </form>

            <div className={styles.resendContainer}>
              <button
                onClick={handleResendOtp}
                className={styles.resendBtn}
                disabled={loading}
              >
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
