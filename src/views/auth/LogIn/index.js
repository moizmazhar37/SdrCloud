import React, { useContext, useState, useEffect } from "react";
import "src/scss/main.css";

import {
  Box,
  Typography,
  TextField,
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
import { AuthContext } from "src/context/Auth";
import Page from "src/component/Page";
import ApiConfig from "src/config/APIConfig";
import Logo from "src/component/Logo";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const useStyles = makeStyles((theme) => ({
  loginLayoutForm: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      padding: "90px 0",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "45px 0",
    },
    "& .loginboxinner": {
      padding: "44px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      "@media(max-width:450px)": {
        padding: "24px 22px 30px 22px",
      },
    },
  },
  checkBox: {
    width: "18px",
    height: "18px",
    borderRadius: "5px",
    marginLeft: "1px",
    border: "1px solid var(--light-stroke, #ECECEC)",
    position: "relative",
    cursor: "pointer",
    "&:checked": {
      backgroundColor: "var(--white-bg, rgba(255, 255, 255, 0.20))",
    },
    "&:checked::after": {
      position: "absolute",
      top: "3px",
      left: "7px",
      width: "4px",
      height: "9px",
      border: "solid white",
      borderWidth: "0 2px 2px 0",
      transform: "rotate(45deg)",
    },
  },
  checkBoxGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "32px",
  },
  checkBoxdiv: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  loginButtonBox: {
    "& .MuiButton-containedPrimary": {
      borderRadius: "8px",
      background: "var(--blue, #0358AC)",
      boxShadow: "none",
      height: "48px",
      // width:'451px',
      fontSize: "16px",
      color: "white !important",
    },
  },
  eyeIcon: {
    "& .MuiIconButton-root": {
      width: "50px",
      color: "#858585 !important",
    },
  },
  disbledbtn: {
    borderRadius: "8px",
    backgroundColor: "var(--stroke, #CACACA) !important",
    color: "var(--light-blue, #F2F7FF) !important",
    fontSize: "16px",
    boxShadow: "none",
  },
}));

function Login(props) {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [isRememberMe, setIsRememberMe] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(
    localStorage.getItem("password") != null
  );
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // const rememberMe = () => {
  //   if (!isRememberMe) {
  //     setIsRememberMe(true);
  //     const email = document.getElementById("email");
  //     const password = document.getElementById("password");
  //     window.localStorage.setItem("email", email?.value);
  //     window.localStorage.setItem("password", password?.value);
  //   } else {
  //     // setIsRememberMe(false);
  //     window.localStorage.removeItem("email");
  //     window.localStorage.removeItem("password");
  //   }
  // };

  // const formInitialSchema = isRememberMe
  //   ? {
  //       email: "",
  //       password: "",
  //     }
  //   : {
  //       email: window.localStorage.getItem("email")
  //         ? window.localStorage.getItem("email")
  //         : "",
  //       password: window.localStorage.getItem("password")
  //         ? window.localStorage.getItem("password")
  //         : "",
  //     };

  const formInitialSchema = {
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
  };

  const handleLogin = async (values) => {
    setLoader(true);

    try {
      const response = await axios({
        url: ApiConfig.login,
        method: "POST",
        data: {
          email: values.email.toLowerCase(),
          password: values.password,
        },
      });
    
      if (response?.status === 200) {
        console.log(response, "Login response");
        setLoader(false);
    
        window.localStorage.setItem("email", response?.data?.user_details?.email);
        window.localStorage.setItem("userType", response?.data?.user_details?.role);
        window.localStorage.setItem("token", response?.data?.token);
        window.localStorage.setItem("_id", response?.data?.user_details?.id);
    
        toast.success(`${response?.data?.user_details?.role} logged in successfully`);
        auth.userLogIn(true, response?.data?.token);
    
        const userType = response?.data?.user_details?.role;
    

        if (userType === "USER") {
          history.push("/user-dashboard");
          toast.success(response?.data?.message);
        } else if (userType === "ADMIN") {
          history.push("/PP-createaccount");
          toast.success(response?.data?.message);
        } else if (userType === "SUBADMIN") {
          history.push("/dashboard");
          toast.success(response?.data?.message);
        }
    
        if (isRememberMe) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
      } else {
        setLoader(false);
        toast.warn("Unexpected response. Please try again.");
      }
    } catch (error) {
      setLoader(false)
    
      if (error?.response) {
        const status = error.response.status; 
    
        switch (status) {
          case 401:
            toast.warn("Unauthorized! Please check your credentials.");
            break;
          case 403:
            toast.warn("Access Forbidden! You don't have the required permissions.");
            break;
          case 404:
            toast.warn("Resource not found! Please check the URL or resource availability.");
            break;
          default:
            toast.error("Unexpected error");
            break;
        }
      } else if (error?.message) {
        console.error("Network error:", error.message);
        toast.error("Network error: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong! Try again later.");
      }
    }
  };

  // useEffect(() => {
  //   if (
  //     window.localStorage.getItem("email") ||
  //     window.localStorage.getItem("password")
  //   ) {
  //     setIsRememberMe(true);
  //   } else {
  //     setIsRememberMe(false);
  //   }
  // }, [
  //   window.localStorage.getItem("email"),
  //   window.localStorage.getItem("password"),
  // ]);

  useEffect(() => {
    if (auth.userLoggedIn === true) {
      if (localStorage.getItem("userType") === "USER") {
        history.push("/user-dashboard");
      } else if (localStorage.getItem("userType") === "ADMIN") {
        history.push("/PP-createaccount");
      } else if (localStorage.getItem("userType") === "SUBADMIN") {
        history.push("/dashboard");
      }
    } else {
    }
  }, []);

  return (
    <div style={{ maxWidth: "520px", width: "100%", margin: "0px 10px" }}>
      <Page title="Login">
        <ToastContainer />

        <Box className={classes.loginLayoutForm}>
          <Box className="loginboxinner">
            <Logo />
            <Typography
              variant="h1"
              style={{
                textAlign: "center",
                color: "var(--black, #152F40)",
                fontSize: "36px",
              }}
            >
              Login
            </Typography>
            <Box>
              <Formik
                onSubmit={(values) => handleLogin(values)}
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  email: yep
                    .string()
                    .email(
                      "A valid email address is required. (e.g. user@example.com)"
                    )
                    .required(
                      "A valid email address is required. (e.g. user@example.com)"
                    )

                    .matches(
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
                      "A valid email address is required. (e.g. user@example.com)"
                    ),

                  password: yep
                    .string()
                    .trim()
                    .matches(
                      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\s\S])[A-Za-z\d\s\S]{8,16}$/,
                      "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
                    )
                    .required(
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
                    <Box style={{ marginTop: "48px", marginBottom: "48px" }}>
                      <Typography variant="body1" style={{ color: "#152F40" }}>
                        Your Email
                      </Typography>
                      <TextField
                        placeholder="Enter Your Email"
                        size="small"
                        variant="outlined"
                        id="email"
                        inputProps={{ maxLength: 254 }}
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
                        onInput={(e) => {
                          // e.target.value = e.target.value.toLowerCase();
                          handleChange(e);
                        }}
                      />
                      <FormHelperText error style={{ marginLeft: "2px" }}>
                        {touched.email && errors.email}
                      </FormHelperText>
                      <Box mt={3} style={{ marginTop: "32px" }}>
                        <FormControl fullWidth>
                          <Box>
                            <Typography
                              variant="body1"
                              style={{ color: "#152F40" }}
                            >
                              Your Password
                            </Typography>
                            <TextField
                              placeholder="Enter Your Password"
                              size="small"
                              inputProps={{ maxLength: 16 }}
                              id="password"
                              variant="outlined"
                              fullWidth
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              name="password"
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              // onInput={(e) => {
                              //   e.target.value = e.target.value.toLowerCase();
                              //   handleChange(e);
                              // }}
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
                                      {showPassword ? (
                                        <VscEye />
                                      ) : (
                                        <VscEyeClosed />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <FormHelperText error style={{ marginLeft: "2px" }}>
                              {touched.password && errors.password}
                            </FormHelperText>
                          </Box>
                        </FormControl>
                      </Box>

                      <Box item className={classes.checkBoxGrid}>
                        <div className={classes.checkBoxdiv}>
                          <input
                            className={classes.checkBox}
                            type="checkbox"
                            // checked={isRememberMe}
                            // onClick={rememberMe}
                            checked={isRememberMe}
                            onChange={() => setIsRememberMe(!isRememberMe)}
                          />
                          <Typography
                            variant="body1"
                            style={{ color: "var(--grey, #858585)" }}
                          >
                            Remember me
                          </Typography>
                        </div>
                        <Typography variant="body1">
                          <Link
                            component={RouterComponent}
                            to="/forget-password"
                            style={{ color: "#0358AC", fontWeight: "400" }}
                          >
                            Forgot Password?
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                    <Box mt={5} className={classes.loginButtonBox}>
                      <Button
                        fullWidth
                        className={
                          values.email && values.password
                            ? classes.Sendbtn
                            : classes.disbledbtn
                        }
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        type="submit"
                      >
                        {isLoading === false ? (
                          " Log In"
                        ) : (
                          <ButtonCircularProgress />
                        )}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Page>
    </div>
  );
}

export default Login;
