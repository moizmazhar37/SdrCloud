import React, { useState, useRef, useContext } from "react";
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
import Logo from "src/component/Logo";
import { useFormik } from "formik";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// Define custom styles
const useStyles = makeStyles((theme) => ({
  loginLayoutForm: {
    display: "flex",
    padding: "250px 0px",
    flexDirection: "column",
    [theme.breakpoints.down("lg")]: {
      padding: "150px 0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "90px 0",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0",
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
    marginTop: "1rem",
  },
  timerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  multipleTextfields: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },

  otpTextfields: {
    marginTop: "0",

    "& .MuiInputBase-input": {
      border: "1px solid rgba(113, 113, 113, 0.3)",
      borderRadius: "5px",
      width: "4rem",
      height: "3rem",
      textAlign: "center",
      "@media(max-width:499px)": {
        width: "3rem",
        height: "2rem",
      },
      "@media(max-width:320px)": {
        height: "1rem",
      },
    },

    errorMessage: {
      color: "#EA4335",
    },
  },
  timerExpiredContainer: {
    "& p": {
      color: "#EA4335",
      fontFamily: "Inter",
      fontSize: "13px",
      fontStyle: "normal",
      fontWeight: "600 !important",
    },
  },

  resendOtpBtn: {
    color: "#0075FF",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "underline",
  },
}));

function VerifyOTP(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpFields, setOtpFields] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const handleOtpInputChange = (index, value) => {
    const newOtpFields = [...otpFields];

    // Only allow numeric characters
    value = value.replace(/\D/g, "");

    // Update the current field
    newOtpFields[index] = value.slice(0, 1);

    // Update the remaining fields with the copied characters
    for (let i = index + 1; i < otpFields.length; i++) {
      newOtpFields[i] = value.slice(i - index, i - index + 1);
    }

    setOtpFields(newOtpFields);

    if (value.length === 1 && index < otpFields.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  //This is mine

  const fieldNames = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];

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
      otp5: "",
      otp6: "",
    },
    validate: validateInput,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.verifyEmail,
        data: {
          otp: otpFields.join(""),
          email: window.localStorage.getItem("email"),
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.message);
        setLoader(false);
        history.push("/");
        auth.setEndtime(res.data.otpExpirationInSeconds);
      } else {
        setLoader(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setLoader(false);
      if (error) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const resetotphandle = async () => {
    console.log(window.localStorage.getItem("email"), "fjidfjds");

    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.forgotPassword,
        params: {
          email: window.localStorage.getItem("email"),
        },
      });
      if (res.data.responseCode === 200) {
        toast.success("OTP has been sent to your registered email address.");
        setLoading(false);

        auth.setEndtime(moment().add(3, "m").unix());
      } else {
        setLoading(false);
        toast.warn(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error("Please Enter a valid email address.");
      } else {
        toast.error(error.message);
      }
    }
  };

  const minute = auth.timeLeft?.minutes?.toString();
  const second = auth.timeLeft?.seconds?.toString();

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
                  onClick={handleFormSubmit}
                >
                  {isLoading === false ? "Submit" : <ButtonCircularProgress />}
                </Button>
              </Box>
              <Box className={classes.timerContainer}>
                {auth.timeLeft?.minutes > 0 || auth.timeLeft?.seconds > 0 ? (
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
                        {minute.length > 1 ? minute : "0" + minute}:
                        {second.length > 1 ? second : "0" + second}
                      </Typography>{" "}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box className={classes.timerExpiredContainer}>
                      <Typography>Timer Expired!</Typography>
                    </Box>
                  </>
                )}{" "}
              </Box>

              {auth.timeLeft?.minutes > 0 || auth.timeLeft?.seconds > 0 ? (
                <Typography></Typography>
              ) : (
                <Box>
                  <Button
                    className={classes.resendOtpBtn}
                    onClick={() => {
                      resetotphandle();
                    }}
                    disabled={auth.timeLeft && auth.timeLeft.seconds > 0}
                  >
                    {loading ? <ButtonCircularProgress /> : "Resend OTP"}
                  </Button>
                </Box>
              )}
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default VerifyOTP;
