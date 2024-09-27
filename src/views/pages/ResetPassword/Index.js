import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "src/scss/main.css";
import { toast, ToastContainer } from "react-toastify";
// import { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  FormHelperText,
  FormControl,
  InputAdornment,
  IconButton,
  Container,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yep from "yup";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Page from "src/component/Page";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: "595px",
  },
  loginLayoutForm: {
    display: "flex",
    padding: "180px 0px",
    flexDirection: "column",
    [theme.breakpoints.down("lg")]: {
      padding: "120px 0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "60px 0",
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
      "& .createpasswd": {
        textAlign: "center",
        fontSize: "36px",
        color: "#152F40 !important",
      },
    },
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
  eyeIcon: {
    "& .MuiIconButton-root": {
      width: "50px",
      color: "#858585 !important",
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPassword, setShowIsPassword] = useState(false);
  const location = useLocation();
  const emailId = location?.state?.email;
  console.log("emailId-=-=-", emailId);

  // Function to toggle the visibility of the password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle the state indicating if the password is being shown
  const handlePassword = () => {
    setShowIsPassword(!isPassword);
  };

  const history = useHistory();

  // Function to handle the password reset process
  const handleResetPassword = async (values) => {
    try {
      setLoader(true);
      const response = await axios({
        method: "POST",
        url: ApiConfig.resetPassword,
        params: {
          email: emailId,
          loginUrl: `${window.location.origin}/otpverify?email=${values.email}`,
        },
        data: {
          email: emailId, // include email in the payload
          newPassword: values.password,
          confirmPassword: values.confirmpassword,
        },
      });
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        setLoader(false);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    // Block the browser's back button
    const handlePopState = (e) => {
      history.go(1); // Forces forward navigation (disabling the back button)
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  // Function to navigate back to the login page
  const goToLogin = () => {
    history.push("/");
  };

  return (
    <>
      <Page title="Login">
        <ToastContainer />
        <Container maxWidth="sm" className={classes.mainContainer}>
          <Box className={classes.loginLayoutForm}>
            <Box className="innerbox">
              <Typography
                variant="h1"
                className="createpasswd"
                style={{ letterSpacing: "normal" }}
              >
                Create New Password
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: "var(--grey, #858585)",
                  fontSize: "16px",
                  marginTop: "24px",
                }}
              >
                Your new password must be different from previously used
                password
              </Typography>
              {/* // Handles the form submission for resetting the password */}
              <Box mt={4}>
                <Formik
                  onSubmit={(values) => handleResetPassword(values)}
                  initialValues={{
                    password: "",
                    confirmpassword: "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    password: yep
                      .string()
                      .required(
                        "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
                      )
                      .matches(
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\s\S])[A-Za-z\d\s\S]{8,16}$/,
                        "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
                      ),
                    confirmpassword: yep
                      .string()
                      .required("Please enter Confirm Password.")
                      .oneOf(
                        [yep.ref("password"), null],
                        "Confirm Password must match with New Password."
                      ),
                  })}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                  }) => (
                    <Form>
                      <input type="hidden" name="email" value={emailId} />{" "}
                      {/* Add hidden input for email */}
                      <Typography
                        variant="body1"
                        style={{ marginTop: "48px", color: "#152F40" }}
                      >
                        New Password
                      </Typography>
                      <TextField
                        placeholder="Enter Your Password"
                        size="small"
                        variant="outlined"
                        inputProps={{ minLength: 8, maxLength: 16 }}
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className={classes.eyeIcon}
                            >
                              <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                              >
                                {showPassword ? <VscEye /> : <VscEyeClosed />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error>
                        {touched.password && errors.password}
                      </FormHelperText>
                      <Box mt={3} style={{ marginTop: "24px" }}>
                        <FormControl fullWidth>
                          <Box>
                            <Typography
                              variant="body1"
                              style={{ color: "#152F40" }}
                            >
                              Confirm New Password
                            </Typography>
                            <TextField
                              placeholder="Enter Your Password"
                              size="small"
                              inputProps={{ minLength: 8, maxLength: 16 }}
                              variant="outlined"
                              fullWidth
                              type={isPassword ? "text" : "password"}
                              value={values.confirmpassword}
                              name="confirmpassword"
                              error={Boolean(
                                touched.confirmpassword &&
                                  errors.confirmpassword
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              onPaste={(e) => e.preventDefault()}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    className={classes.eyeIcon}
                                  >
                                    <IconButton
                                      onClick={handlePassword}
                                      edge="end"
                                    >
                                      {isPassword ? (
                                        <VscEye />
                                      ) : (
                                        <VscEyeClosed />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <FormHelperText error>
                              {touched.confirmpassword &&
                                errors.confirmpassword}
                            </FormHelperText>
                          </Box>
                        </FormControl>
                      </Box>
                      <Box mt={5} style={{ marginTop: "46px" }}>
                        <Button
                          fullWidth
                          className={
                            values.password && values.confirmpassword
                              ? classes.Sendbtn
                              : classes.disbledbtn
                          }
                          variant="contained"
                          color="primary"
                          disabled={isLoading}
                          type="submit"
                        >
                          {isLoading === false ? (
                            "Continue"
                          ) : (
                            <ButtonCircularProgress />
                          )}
                        </Button>
                      </Box>
                      <Box textAlign="center" style={{ marginTop: "16px" }}>
                        <Typography
                          className={classes.bottomLink2}
                          onClick={goToLogin}
                        >
                          Back To Login
                        </Typography>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Container>
      </Page>
    </>
  );
}

export default Login;
