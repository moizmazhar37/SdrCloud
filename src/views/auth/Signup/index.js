import React, { useState, useContext, useEffect } from "react";
import "src/scss/main.css";
import Logo from "src/component/Logo";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
  Link,
  FormHelperText,
  FormControl,
  InputAdornment,
  IconButton,
  Container,
} from "@material-ui/core";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Page from "src/component/Page";
import ApiConfig from "src/config/APIConfig";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import { GoogleLogin } from "react-google-login";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  loginLayoutForm: {
    display: "flex",
    padding: "208px 0px",
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
  },
  maindiv: {
    width: "30vw",
    height: "100vh",
    marginTop: "60px",
    [theme.breakpoints.down("xs")]: {
      width: "100vh",
      margin: "15px",
    },
  },
  backTo: {
    fontWeight: "400",
    fontSize: "13px",
    color: "black",
  },
  buttonIcon: {
    width: "100%",
    maxWidth: "27px",
  },
  lineContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    margin: "30px 0",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "rgba(113, 113, 113, 0.30)",
  },
  createback: {
    color: "#181818",
    fontWeight: "700",
    fontSize: "13px",
    textDecoration: "underline",
  },
}));

function Signup() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  // Function to handle password visibility toggle
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  // Function to handle user registration by sending signup details to the server
  const handleRegister = async (values) => {
    setLoader(true);
    try {
      const response = await axios({
        url: ApiConfig.userSignup,
        method: "POST",
        data: {
          email: values.email.toLowerCase(),
          password: values.password,
        },
      });
      console.log(response.data);
      if (response.data.responseCode === 200) {
        window.localStorage.setItem("email", response.data.result.email);
        setLoader(false);
        auth.setEndtime(moment().add(3, "m").unix());
        history.push("/otp-verify");

        toast.success(response.data.message);
      } else if (response.data.responseCode === 404) {
        toast.warn(response.data.message);
        setLoader(false);
      } else if (response.data.responseCode === 501) {
        toast.warn(response.data.message);
        setLoader(false);
      } else {
        toast.warn(response.data.data);
        console.log("data");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.warn(error.response.data.message);
    }
  };
  // Function to handle Google login response and save the access token
  const responseGoogle = (response) => {
    const token = response.accessToken;
    toast.success(
      "Account created successfully. You are redirecting to Dashboard"
    );
    setToken(token);
  };
  useEffect(() => {
    if (token) {
      handleGoogleLogin();
    }
  }, [token]);
  // Function to handle Google login by sending the access token to the server
  const handleGoogleLogin = async () => {
    try {
      const response = await axios({
        url: ApiConfig.goggleLogin,
        method: "POST",
        data: {
          accessToken: token,
        },
      });
      if (response.status === 200) {
        window.localStorage.setItem("email", response.data.email);
        window.localStorage.setItem("userType", response.data.userType);
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("_id", response.data._id);
        auth.userLogIn(true, response.data.token);
        history.push("/dashboard");
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <>
      <Page title="Login">
        <ToastContainer />
        <Container maxWidth="sm">
          <Box className={classes.loginLayoutForm}>
            <Box mb={3}>
              <Typography variant="h1">Create Account</Typography>
              <Typography
                variant="h6"
                style={{ color: "#717171", marginTop: "6px" }}
              >
                Start your 10-day free trial. Cancel anytime.
              </Typography>
            </Box>

            <Box>
              <GoogleLogin
                clientId="120058916450-gt4mo8t0tgigte4cqqufvqp235b9fcg7.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <Button
                    variant="contained"
                    className="googleButon"
                    startIcon={
                      <img
                        src="images/Google.svg"
                        alt="Google Icon"
                        className={classes.buttonIcon}
                      />
                    }
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <Typography variant="h5">Sign up with Google</Typography>
                  </Button>
                )}
              />
            </Box>
            <div className={classes.lineContainer}>
              <div className={classes.line}></div>
              <Typography
                variant="body2"
                style={{ color: "#000", fontWeight: "500" }}
              >
                OR
              </Typography>
              <div className={classes.line}></div>
            </div>
            <Box>
              <Formik
                onSubmit={(values) => handleRegister(values)}
                initialValues={{
                  email: "",
                  password: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  email: yep
                    .string()
                    .required("Please enter a valid email id.")
                    .matches(
                      "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                      "please enter your valid email"
                    ),

                  password: yep
                    .string()
                    .required(
                      "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
                    )
                    .matches(
                      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\s\S])[A-Za-z\d\s\S]{8,16}$/,
                      "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
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
                    <Typography variant="body1">
                      Email<span style={{ color: "red" }}>*</span>
                    </Typography>
                    <TextField
                      placeholder="Enter your email"
                      size="small"
                      variant="outlined"
                      inputProps={{ maxLength: 256 }}
                      fullWidth
                      type={"email"}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>

                    <Box mt={3}>
                      <FormControl fullWidth>
                        <Box>
                          <Typography variant="body1">
                            Password<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <TextField
                            placeholder="Create password"
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
                              // className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleTogglePassword}
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </Box>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText error>
                            {touched.password && errors.password}
                          </FormHelperText>
                        </Box>
                      </FormControl>
                    </Box>
                    <Box mt={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        type="submit"
                      >
                        {isLoading === false ? (
                          " Create Account"
                        ) : (
                          <ButtonCircularProgress />
                        )}
                      </Button>
                    </Box>
                    <Grid item style={{ paddingTop: "26px" }}>
                      <Typography
                        color="primary.main"
                        variant="body2"
                        style={{ textAlign: "center" }}
                      >
                        <span className={classes.backTo}>
                          {" "}
                          Already have an account?&nbsp;
                          <Link component={RouterComponent} to="/">
                            <span className={classes.createback}> Login </span>
                          </Link>
                        </span>
                      </Typography>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Container>
      </Page>
    </>
  );
}

export default Signup;
