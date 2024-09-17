import React, { useState, useRef, useContext, useEffect } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";
import ApiConfig from "src/config/APIConfig";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

// Define custom styles
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: "560px",
  },
  loginLayoutForm: {
    display: "flex",
    padding: "210px 0px",
    flexDirection: "column",
    [theme.breakpoints.down("lg")]: {
      padding: "140px 0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "80px 0",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "40px 0",
    },
    "& .innerbox": {
      padding: "44px 44px 44px 44px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "var(--white, #FFF)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    },
  },
  otptextfieldContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  otpform: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop: "48px",
  },
  timerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "10px",
    width: "100%",
  },
  multipleTextfields: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    width: "100%",
    "@media(max-width:650px)": {
      gap: "25px",
    },
    "@media(max-width:450px)": {
      gap: "20px",
    },
  },

  otpTextfields: {
    marginTop: "0",
    "& .MuiInputBase-input": {
      border: "1px solid var(--stroke, #CACACA)",
      borderRadius: "12px",
      width: "87px",
      height: "65px",
      textAlign: "center",
      fontSize: "32px",
      fontWeight: 400,
      color: "#152F40 !important",
      "@media(max-width:650px)": {
        width: "77px",
        height: "55px",
      },
      "@media(max-width:450px)": {
        width: "67px",
        height: "45px",
      },
    },
  },
  timerExpiredContainer: {
    marginTop: "10px",
    "& p": {
      color: "#EA4335",
      fontFamily: "Inter",
      fontSize: "13px",
      fontStyle: "normal",
      fontWeight: "600 !important",
    },
  },

  resendOtpBtn: {
    color: "#0358AC",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
  },
  bottomLink2: {
    fontWeight: "500",
    fontSize: "16px",
    color: "var(--black, #152F40)",
    cursor: "pointer",
    borderRadius: "8px",
    background: "#F4F4F4",
    padding: "9px 30px !important",
  },
  Sendbtn: {
    borderRadius: "8px",
    backgroundColor: "var(--blue, #0358AC) !important",
    color: "#F2F7FF !important",
    fontSize: "16px",
    boxShadow: "none",
    height: "48px",
  },
  disbledbtn: {
    borderRadius: "8px",
    backgroundColor: "var(--stroke, #CACACA) !important",
    color: "var(--light-blue, #F2F7FF) !important",
    fontSize: "16px",
    boxShadow: "none",
  },
}));

// VerifyOTP component
function VerifyOTP(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpFields, setOtpFields] = useState(["", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [paramsEmail, setParamsEmail] = useState("");
  const location = useLocation();
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);
  const [expiredOTP, setExpiredOTP] = useState(false);

  console.log(location?.state?.state?.data);
  const email = location?.state?.state?.data;
  console.log(typeof email);

  const minute = auth.timeLeft?.minutes?.toString();
  const second = auth.timeLeft?.seconds?.toString();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    if (email) {
      setParamsEmail(email);
    }
  }, []);
  console.log("paramsEmail==>", paramsEmail);

  // Handle OTP input change
  const handleOtpInputChange = (index, value) => {
    const newOtpFields = [...otpFields];

    value = value.replace(/\D/g, "");

    newOtpFields[index] = value.slice(0, 1);

    for (let i = index + 1; i < otpFields.length; i++) {
      newOtpFields[i] = value.slice(i - index, i - index + 1);
    }

    setOtpFields(newOtpFields);

    if (value.length === 1 && index < otpFields.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const fieldNames = ["otp1", "otp2", "otp3", "otp4"];
  // Validate OTP input
  const validateInput = (values) => {
    const errors = {};
    const numberRegex = /^[0-9]$/;

    fieldNames.forEach((fieldName) => {
      if (!values[fieldName].match(numberRegex)) {
        errors[fieldName] = "Invalid OTP";
      }
    });

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    validate: validateInput,
    onSubmit: (values) => {},
  });

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.verifyEmail,
        data: {
          otp: otpFields.join(""),
          email: email,
        },
      });

      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        setLoader(false);
        history.push({
          pathname: "/create-password",
          state: {
            email: email,
          },
        });
        auth.setEndtime(res?.data?.otpExpirationInSeconds);
      } else {
        setLoader(false);
        toast.warn(res?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      if (error) {
        toast.error("Invalid OTP");
        setOtpFields(["", "", "", ""]);
      } else {
        setLoader(false);
        toast.error("Something Went Wrong");
      }
    }
  };
  // Handle OTP resend
  const resetotphandle = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get("email");
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.resendOtp,
        params: {
          email: email,
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        setLoading(false);
        setRemainingTime(180);
        setTimerActive(true);

        auth.setEndtime(moment().add(3, "m").unix());
      } else {
        setLoading(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error("Please enter the correct Email.");
      } else {
        setLoading(false);
        toast.error(error.message);
      }
    }
  };
  // Handle backspace press in OTP input
  const handleBackspacePress = (event, index) => {
    if (event?.key === "Backspace" && event?.target?.value === "") {
      event.preventDefault();
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        otpInputRefs.current[prevIndex].focus();
      }
    }
  };

  useEffect(() => {
    const storedRemainingTime = localStorage.getItem("remainingTime");
    if (storedRemainingTime !== null) {
      setRemainingTime(parseInt(storedRemainingTime, 10));
    }
    if (storedRemainingTime > 0) {
      setTimerActive(true);
    }
    if (timerActive && remainingTime > 0) {
      const timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;

          localStorage.setItem("remainingTime", newTime.toString());

          return newTime;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (remainingTime === 0) {
      setTimerActive(false);
      setExpiredOTP(true);
      localStorage.removeItem("remainingTime");
    } else if (remainingTime) {
    }
  }, [remainingTime, timerActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    // return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secondsLeft < 10 ? "0" : ""
    }${secondsLeft}`;
  };

  // useEffect(() => {
  //   auth.setEndtime(moment().add(3, "m").unix());
  // }, []);

  // Handle back to login
  const goToLogin = () => {
    history.push("/");
  };

  if (!auth.timeLeft) {
    return null; // Render nothing until auth.timeLeft is initialized
  }
  return (
    <>
      <Container maxWidth="sm" className={classes.mainContainer}>
        <Box className={classes.loginLayoutForm}>
          <Box className="innerbox">
            <Typography
              variant="h1"
              style={{
                textAlign: "center",
                fontSize: "36px",
                letterSpacing: "normal",
              }}
            >
              Enter 4 Digits Code
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "var(--grey, #858585)",
                textAlign: "center",
                marginTop: "24px",
                fontSize: "16px",
              }}
            >
              Enter the 4 digits code that you received on your email
            </Typography>
            <Box className={classes.otptextfieldContainer}>
              <form onSubmit={formik.handleSubmit} className={classes.otpform}>
                <Box className={classes.multipleTextfields}>
                  {otpFields.map((value, index) => (
                    <TextField
                      className={classes.otpTextfields}
                      style={{ fontFamily: "Inter" }}
                      key={index}
                      value={value}
                      onChange={(event) =>
                        handleOtpInputChange(index, event.target.value)
                      }
                      inputRef={(ref) => (otpInputRefs.current[index] = ref)}
                      onKeyDown={(event) => handleBackspacePress(event, index)}
                    />
                  ))}
                </Box>

                <Box className={classes.timerContainer}>
                  {timerActive && remainingTime > 0 ? (
                    // (auth.timeLeft && auth.timeLeft?.minutes > 0) ||
                    // (auth.timeLeft && auth.timeLeft?.seconds > 0)
                    <>
                      <Box>
                        <Typography
                          variant="body1"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontWeight: "800",
                            fontFamily: "Inter",
                          }}
                        >
                          {formatTime(remainingTime)}
                          {/* {minute.length > 1 ? minute : "0" + minute}:
                          {second.length > 1 ? second : "0" + second} */}
                        </Typography>{" "}
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box className={classes.timerExpiredContainer}>
                        {/* <Typography>OTP expired!</Typography> */}
                      </Box>
                    </>
                  )}
                </Box>

                {timerActive && remainingTime > 0 ? (
                  // (auth.timeLeft && auth.timeLeft?.minutes > 0) ||
                  // (auth.timeLeft && auth.timeLeft?.seconds > 0)
                  <Typography></Typography>
                ) : (
                  <Box style={{ marginTop: "5px" }}>
                    <Typography
                      variant="body1"
                      style={{
                        color: "var(--grey, #858585)",
                        fontSize: "16px",
                      }}
                    >
                      Haven’t received the verification code?
                    </Typography>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "8px",
                        marginBottom: "14px",
                      }}
                    >
                      <Button
                        className={classes.resendOtpBtn}
                        onClick={() => {
                          resetotphandle();
                        }}
                        disabled={timerActive && remainingTime > 0}
                      >
                        {loading ? <ButtonCircularProgress /> : "Resend"}
                      </Button>
                    </div>
                  </Box>
                )}
                <Box width="100%" mt={3} style={{ marginTop: "20px" }}>
                  <Button
                    className={
                      otpFields.every((field) => field !== "")
                        ? classes.Sendbtn
                        : classes.disbledbtn
                    }
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleFormSubmit}
                  >
                    {isLoading === false ? (
                      "Continue"
                    ) : (
                      <ButtonCircularProgress />
                    )}
                  </Button>
                </Box>
                <Box
                  textAlign="center"
                  mt={4}
                  style={{ marginTop: "7px", width: "100%" }}
                >
                  <Typography
                    className={classes.bottomLink2}
                    onClick={goToLogin}
                  >
                    Back To Login
                  </Typography>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default VerifyOTP;
