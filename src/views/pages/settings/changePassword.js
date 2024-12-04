/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "src/scss/main.css";
import { toast, ToastContainer } from "react-toastify";
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
  Link,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yep from "yup";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Page from "src/component/Page";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { UserContext } from "src/context/User";
import { AuthContext } from "src/context/Auth";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: "595px",
    marginTop: "10%",
  },
  loginLayoutForm: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      padding: "90px 0",
    },
    "& .innerbox": {
      padding: "44px 44px 48px 44px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "var(--white, #FFF)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
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
    "&:hover": {
      background: "var(--blue, #0358AC)",
      color: "#fff",
    },
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
  forgetPass: {
    color: "#0358AC",
    textAlign: "end",
    cursor: "pointer",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPassword, setShowIsPassword] = useState(false);
  const [newisPassword, setShowNewIsPassword] = useState(false);
  const auth = useContext(AuthContext);

  // Function to toggle the visibility of the current password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  // Function to toggle the visibility of the confirm password
  const handlePassword = () => {
    setShowIsPassword(!isPassword);
  };
  // Function to toggle the visibility of the new password
  const handleNewPassword = () => {
    setShowNewIsPassword(!newisPassword);
  };
  const history = useHistory();
  // Function to handle the password reset process
  const handleResetPassword = async (values) => {
    try {
      setLoader(true);
      const response = await axios({
        method: "PUT",
        url: ApiConfig.changePassword,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          oldPassword: values.password,
          newPassword: values.newPassword,
        },
      });
      if (response?.data?.status === 200) {
        setLoader(false);
        localStorage.removeItem("token");
        localStorage.removeItem("creatturAccessToken");
        auth.userLogIn(false, "");
        history.push("/");

        toast.success(response?.data?.message);
      } else if (response?.data?.status === 205) {
        toast.error(response?.data?.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoader(false);
    }
  };

  return (
    <>
      <Page title="Login">
        <ToastContainer />
        <Container maxWidth="sm" className={classes.mainContainer}>
          <Box className={classes.loginLayoutForm}>
            <Box className="innerbox" style={{ marginTop: "45px" }}>
              <Typography
                variant="h1"
                style={{ textAlign: "center", fontSize: "36px" }}
              >
                Change Password
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: "var(--grey, #858585)",
                  fontSize: "16px",
                  marginTop: "24px",
                }}
              >
                Your new password must be differentss from previously used
                password
              </Typography>

              <Box mt={4}>
                <Formik
                  onSubmit={(values) => handleResetPassword(values)}
                  initialValues={{
                    password: "",
                    newPassword: "",
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

                    newPassword: yep
                      .string()
                      .required(
                        "New Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
                      )

                      .matches(
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\s\S])[A-Za-z\d\s\S]{8,16}$/,
                        "New Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
                      ),

                    confirmpassword: yep
                      .string()
                      .required("Please enter Confirm Password.")
                      .oneOf(
                        [yep.ref("newPassword"), null],
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
                      <Typography
                        variant="body1"
                        style={{ marginTop: "48px", color: "#152F40" }}
                      >
                        Current Password
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
                        // onChange={handleChange}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                          if (e.key === " ") {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                        }}
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
                      <Box
                        pt={2}
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "end",
                        }}
                      >
                        <Typography
                          variant="body1"
                          className={classes.forgetPass}
                          onClick={() =>
                            history.push("/forget-password", {
                              fromChangePassword: true,
                            })
                          }
                        >
                          Forgot Password?
                        </Typography>
                      </Box>
                      <Box mt={3} style={{ marginTop: "12px" }}>
                        <FormControl fullWidth>
                          <Box>
                            <Typography
                              variant="body1"
                              style={{ color: "#152F40" }}
                            >
                              New Password
                            </Typography>
                            <TextField
                              placeholder="Enter Your Password"
                              size="small"
                              inputProps={{ minLength: 8, maxLength: 16 }}
                              variant="outlined"
                              fullWidth
                              type={newisPassword ? "text" : "password"}
                              value={values.newPassword}
                              name="newPassword"
                              error={Boolean(
                                touched.newPassword && errors.newPassword
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onPaste={(e) => {
                                e.preventDefault();
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    className={classes.eyeIcon}
                                  >
                                    <IconButton
                                      onClick={handleNewPassword}
                                      edge="end"
                                    >
                                      {newisPassword ? (
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
                              {touched.newPassword && errors.newPassword}
                            </FormHelperText>
                          </Box>
                        </FormControl>
                      </Box>
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
                              onKeyDown={(e) => {
                                if (e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              onPaste={(e) => {
                                e.preventDefault();
                              }}
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
                      <Box mt={5} style={{ marginTop: "48px" }}>
                        <Button
                          fullWidth
                          className={
                            values.password &&
                            values.newPassword &&
                            values.confirmpassword
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
                      <Box textAlign="center" mt={3}>
                        <Typography
                          className={classes.bottomLink2}
                          onClick={() => {
                            history.push("/myprofile");
                          }}
                        >
                          Back to Settings
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
