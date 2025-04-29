import React, { useState, useEffect, useRef } from "react";
import styles from "./VerifyOTP.module.scss";
import SetPassword from "./SetPassword/SetPassword";
import useAdminApi from "./Hooks/useAdminApi";
import SDRLogo from "src/images/SDR.png";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const { verifyOtp, loading, error: apiError } = useAdminApi();

  useEffect(() => {
    // Extract token from the URL path
    const pathParts = window.location.pathname.split("/");
    const urlToken = pathParts[pathParts.length - 1];

    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Token not found in URL");
    }

    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (apiError) {
      setError(apiError);
    }
  }, [apiError]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1 || !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
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

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      inputRefs.current[5].focus();
    }
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
    setError("");
    console.log("Resending OTP...");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length === 6 && token) {
      try {
        await verifyOtp(otpValue, token);
        setShowSetPassword(true);
      } catch (err) {
        console.error("OTP verification failed:", err.message);
      }
    } else if (!token) {
      setError("Authentication token is missing");
    }
  };

  if (showSetPassword) {
    return <SetPassword token={token} />;
  }

  return (
    <div className={styles.sdrWelcome}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src={SDRLogo} alt="SDRCloud Logo" className={styles.logo} />
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
