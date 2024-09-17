import React, { useState, useContext, useRef } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  Grid,
  makeStyles,
  Button,
  FormHelperText,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import moment from "moment";
import { AuthContext } from "src/context/Auth";
import Page from "src/component/Page";
import Logo from "src/component/Logo";
import { useFormik } from "formik";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  loginLayoutForm: {
    display: "flex",
    padding: "250px 0px",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      padding: "90px 0",
    },
  },
  logosec: {
    textAlign: "left",
    paddingTop: "26px",
    paddingLeft: "15px",
    "@media(min-width:1280px)": {
    },
  },
  TextBox: {
    borderRadius: "10px",
    background: theme.palette.background.taf,
    fontFamily: "Poppins",
    height: "57px",
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  Title: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "40px",

    lineHeight: "60px",

    color: "#000000",
  },
  subTitle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",

    color: "#000000",
  },
  verify: {
    width: "100%",
    height: 57,

    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    fontFamily: "Poppins",
    lineHeight: "22px",
    textAlign: "center",
    letterSpacing: "0.2px",
    color: "#FFFFFF",
    marginTop: "40px",
    background: "#004AAD",
    borderRadius: "20px",
  },
  label: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#1E1E1E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },

  //My Styles
  otpLogoContainer: {
    paddingLeft: "80px",
    paddingTop: "48px",

    "@media(max-width:650px)": {
      paddingLeft: "30px",
      paddingTop: "62px",
    },
  },

  otpmiddleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },

  otpfirstInput: {
    width: "29vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    "@media(max-width:959px)": {
      width: "50%",
    },

    "@media(max-width:650px)": {
      width: "75%",
    },
  },

  otpVerifyTextContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: "2rem",
    "@media(max-width:650px)": {
      marginTop: "2rem",
    },

    "& .MuiTypography-h2": {
      "@media(max-width:650px)": {
        fontSize: "24px",
      },
    },
  },

  otptextfieldContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  otpVerifyText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "31px",
    lineHeight: "38px",
    color: "#0075FF",

    "@media(max-width:650px)": {
      fontSize: "24px !important",
    },

    "@media(max-width:402px)": {
      fontSize: "20px !important",
    },
  },
  otpVerifysubText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
    "@media(max-width:650px)": {
      fontSize: "12px",
    },
  },
  otpform: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop: "1rem",
  },

  otpTextfiels: {
    border: "1px solid rgba(113, 113, 113, 0.3)",
    borderRadius: "5px",

    "& .MuiInputBase-input": {
      height: "100% ",
      padding: "10px 15px ",
    },
  },

  submitbtnContainer: {
    display: "flex",
    width: "100%",
  },

  otpSubmitBtn: {
    width: "100%",
    background: "#0075FF",
    borderRadius: "5px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "19px",
    padding: "15px 50px",
  },

  bottomTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3rem",
  },

  bottomBlackText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#181818",
  },
  blueText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#0075FF",
    cursor: "pointer",
  },

  timerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
    width: "100%",
  },
  timerCountdown: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#EA4335",
    marginLeft: "auto",
  },

  timerCountdown2: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#EA4335",
    marginLeft: "auto",
    cursor: "pointer",
  },

  multipleTextfields: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },

  otpTextfields: {
    marginTop: "0",

    "& .MuiInputBase-input": {
      width: "100%",
      height: "100%",
      border: "1px solid rgba(113, 113, 113, 0.3)",
      padding: "15px 10px",
      borderRadius: "5px",
    },

    errorMessage: {
      color: "#EA4335",
    },
  },
}));

function Login(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const [otpFields, setOtpFields] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);

  const handleOtpInputChange = (index, value) => {
    const newOtpFields = [...otpFields];
    newOtpFields[index] = value;
    setOtpFields(newOtpFields);

    if (value.length === 1 && index < otpFields.length - 1) {
      // Focus on the next input field
      otpInputRefs.current[index + 1].focus();
    }
  };


  const fieldNames = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];

  const validateInput = (values) => {
    const errors = {};
    const numberRegex = /^[0-9]$/;

    fieldNames.forEach((fieldName) => {
      if (!values[fieldName].match(numberRegex)) {
        errors[fieldName] = "Invalid OTP.";
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
      otp5: "",
      otp6: "",
    },
    validate: validateInput,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //setting the timer for otp
  const [timer, setTimer] = useState(180);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          setTimerExpired(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const HelperText = ({ error }) => {
    return error ? (
      <Typography variant="body2" className={classes.errorMessage}>
        {error}
      </Typography>
    ) : null;
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box className={classes.loginLayoutForm}>
          <Typography variant="h1">One Time Password</Typography>
          <Typography
            variant="h6"
            style={{ color: "#717171", marginTop: "6px" }}
          >
            Enter One Time Password sent to your registered <br></br> email
            address
          </Typography>

          <Box className={classes.otptextfieldContainer}>
            <form onSubmit={formik.handleSubmit} className={classes.otpform}>
              <Box className={classes.multipleTextfields}>
                {otpFields.map((value, index) => (
                  <TextField
                    className={classes.otpTextfields}
                    key={index}
                    value={value}
                    onChange={(event) =>
                      handleOtpInputChange(index, event.target.value)
                    }
                    inputRef={(ref) => (otpInputRefs.current[index] = ref)}
                  />
                ))}
              </Box>

             
              <Box width="100%" mt={3}>
                <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                >
                  Submit
                </Button>
              </Box>
              <Box className={classes.timerContainer}>
                {(formik.submitCount > 0 ||
                  fieldNames.some((fieldName) => formik.touched[fieldName])) &&
                  fieldNames.some((fieldName) => formik.errors[fieldName]) && (
                    <Typography
                    variant="body1"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "800",
                      fontFamily: "Inter",
                    }}
                    >
                      {formik.errors[fieldNames[0]]}
                    </Typography>
                  )}

                {timerExpired ? (
                  <Typography
                  variant="body1"
                    className={classes.timerCountdown2}
                  >
                    Timer Expired! Resend OTP
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    className={classes.timerCountdown}
                  >
                    {formatTime(timer)}
                  </Typography>
                )}
              </Box>
            </form>
          </Box>

          <Box className={classes.bottomTextContainer}>
            <Typography className={classes.bottomBlackText}>
              Didn’t receive an OTP?{" "}
              <span className={classes.blueText}>Try Again</span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
