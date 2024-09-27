import React, { useState } from "react";
import "src/scss/main.css";
import {
  useHistory,
  Link as RouterComponent,
  useLocation,
} from "react-router-dom";
import * as yep from "yup";
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  IconButton,
  FormControl,
  makeStyles,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import ApiConfig from "../../../config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Page from "src/component/Page";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  loginLayoutForm: {
    display: "flex",
    padding: "167px 0",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      padding: "90px 0",
    },
    "& .googleButon": {
      width: "100%",
      border: "1px solid rgba(113, 113, 113, 0.30)",
      height: "49px",
      backgroundColor: "transparent",
      borderRadius: "5px",
    },
    "& label": {
      color: "#181818",
    },
    "& h1": {
      marginBottom: "30px",
    },
  },
  buttonbox: {
    background: "#004AAD",
    borderRadius: "16px",
    width: "100%",

    height: "57px",
    marginTop: "46px",
    marginBottom: "20px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "22px",
    letterSpacing: "0.2px",
    color: "#FFFFFF",

    [theme.breakpoints.only("sm")]: {
      maxWidth: "112px",
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "112px",
      fontSize: "18px",
    },
    "@media (max-width: 959px)": {
      maxWidth: "100%",
      // borderRadius: "10px",
    },
  },

  TextBox: {
    fontFamily: "Poppins",
    borderRadius: "10px",
    background: theme.palette.background.taf,
    height: "55px",
  },
  logosec: {
    textAlign: "center",
    paddingTop: "26px",
    "@media(min-width:1280px)": {
      // display: "none",
    },
  },
  Title: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "40px",
    lineHeight: "60px",
    /* identical to box height */

    color: "#000000",
  },
  subTitle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",
    /* identical to box height */

    color: "#000000",
  },
  TopText: {
    fontFamily: "Poppins",
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  submitDiv: {
    textAlign: "center",
  },
  label: {
    marginTop: "19px",
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
}));
function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // const otp = location.state?.otp;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [open, setOpen] = React.useState(false);

  const [isLoading, setLoader] = useState(false); // Handles password reset by sending a POST request to the server with the new password data

  const resetPaswordHandler = async (values) => {
    try {
      setLoader(true);

      const res = await axios({
        method: "POST",
        url: ApiConfig.resetPassword,
        headers: {
          token: localStorage.getItem("token"),
        },

        data: {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.message);
        setLoader(false);
        setOpen(true);
        history.push("/login");
      } else if (res.responseCode === 500) {
        toast.error("Invalid user.");
      }
    } catch (err) {
      // toast.error(err.message)
      toast.error("Invalid user.");
      console.log(err);
      setLoader(false);
    }
  };

  return (
    <Page title="Reset password">
      <Container maxWidth="sm">
        <Box className={classes.loginLayoutForm}>
          <Grid item className={classes.TopText}>
            <Typography variant="h3" className={classes.Title}>
              Reset Password
            </Typography>
          </Grid>
          <Formik
            onSubmit={(values) => resetPaswordHandler(values)}
            initialValues={{
              password: "",
              confirmPassword: "",
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
              confirmPassword: yep
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
                <Grid item style={{ marginBottom: "10px", marginTop: ".5rem" }}>
                  <Box>
                    <label className={classes.label}>
                      New Password&nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      placeholder="Min. 8 Character"
                      size="small"
                      variant="outlined"
                      fullWidth
                      className="textFeilds"
                      disabled={isLoading}
                      inputProps={{ minLength: 8, maxLength: 16 }}
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      // placeholder="Enter your password"
                      error={Boolean(touched.password && errors.password)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        className: classes.TextBox,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              <Box className={classes.passsec}>
                                {showPassword ? (
                                  <img
                                    src="/images/Eye.png"
                                    alt="img"
                                    style={{
                                      fontSize: "20px",
                                      display: "flex",
                                      justifyContent: "center",
                                      // color: "#1069C2",
                                      alignItems: "center",
                                    }}
                                  />
                                ) : (
                                  <img
                                    src="/images/Hide.png"
                                    alt="img"
                                    style={{
                                      fontSize: "20px",
                                      display: "flex",
                                      justifyContent: "center",
                                      // color: "#1069C2",
                                      alignItems: "center",
                                    }}
                                  />
                                )}
                              </Box>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText
                      error
                      style={{ fontSize: "12px", marginTop: ".3px" }}
                    >
                      {touched.password && errors.password}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item style={{ marginBottom: "10px", marginTop: "-17px" }}>
                  <FormControl fullWidth>
                    <Box
                      style={{ width: "100%" }}
                      className={classes.loginForm1}
                    >
                      <label className={classes.label}>
                        Confirm Password&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <TextField
                        placeholder="Min. 8 Character"
                        size="small"
                        variant="outlined"
                        fullWidth
                        disabled={isLoading}
                        inputProps={{ minLength: 8, maxLength: 16 }}
                        type={showPassword1 ? "text" : "password"}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        // placeholder="Confirm your password"
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        onBlur={handleBlur}
                        className="textFeilds"
                        onChange={handleChange}
                        InputProps={{
                          className: classes.TextBox,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword1(!showPassword1)}
                                edge="end"
                              >
                                <Box className={classes.passsec}>
                                  {showPassword1 ? (
                                    <img
                                      alt="img"
                                      src="/images/Eye.png"
                                      style={{
                                        fontSize: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        // color: "#1069C2",
                                        alignItems: "center",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      alt="img"
                                      src="/images/Hide.png"
                                      style={{
                                        fontSize: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        // color: "#1069C2",
                                        alignItems: "center",
                                      }}
                                    />
                                  )}
                                </Box>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </Box>
                  </FormControl>
                </Grid>

                <Box className={classes.submitDiv}>
                  <Button className={classes.buttonbox} type="submit">
                    Submit {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Page>
  );
}

export default Login;
