import React, { useState } from "react";
import "src/scss/main.css";
import Logo from "src/component/Logo";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Page from "src/component/Page";
// Define custom styles
const useStyles = makeStyles((theme) => ({
  loginbanner: {
    backgroundImage: `url(${"/images/Home/skull-img.svg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  textfield: {
    background: "transparent",
    border: "1px",
    borderRadius: "4px",

    outline: "unset !important",
  },

  buttonbox: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    // maxWidth: "380px",
    width: "100%",

    height: "49px",
    color: "#FFFFFF",
    background: "#0F0037",
    borderRadius: "5px",

    [theme.breakpoints.only("sm")]: {
      maxWidth: "264px",
      fontSize: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "150px",
      fontSize: "16px",
    },
  },

  Title: {
    fontFamily: "Josefin Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "40px",
    lineHeight: "60px",
    color: "#000000",
  },
  mainSubHeading: {
    fontFamily: "Josefin Sans",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "24px",
    color: "#000000",
  },
  TopText: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  redText: {
    color: "#FF0000",
    marginLeft: "-4px",
  },

  SubmitBtnBox: {
    textAlign: "center",
  },
  getButton: {
    textAlign: "start",
  },
  bottomText: {
    textAlign: "center",
    padding: "14px",
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",

    color: " #181818",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },

  maindiv: {
    width: "30vw",
    height: "100vh",
    marginTop: "160px",
    [theme.breakpoints.down("xs")]: {
      width: "100vh",
      margin: "15px",
    },
  },

  LoginTitle: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "31px",
    lineHeight: "37.52px",
    color: "#0F0037",
    textAlign: "center",
    "@media (max-width: 1244px)": {
      fontSize: "30px !important",
    },
  },
  btnbox: {
    display: "flex",
    justifyContent: "center",
  },

  backTo: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "15.73px",
    color: "black",
  },
  BottomGrid: {
    textAlign: "center",
  },

  accountgrid: {
    paddingTop: "35px",
  },
  forgotpassword: {
    float: "right",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "15.73px",
    color: "#1756FF",
    paddingTop: "15px",
  },
  loginbtn: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",
    color: "#1756FF",
  },
  textFieldgrid: {
    marginBottom: "10px",
    marginTop: "1.5rem",
    justifyContent: "center",
  },
  eyeimg: {
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  span: {
    color: "black",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  googleButton: {
    backgroundColor: "transparent",
    border: "1px",
    width: "100%",
    height: "45px",
    [theme.breakpoints.only("sm")]: {
      width: "103%",
      fontSize: "10px",
    },
    [theme.breakpoints.only("xs")]: {
      width: "121%",
      fontSize: "9px",
    },
  },

  googleButtonNoHover: {
    "&:hover": {
      textDecoration: "none",
    },
  },

  appleButton: {
    backgroundColor: "transparent",
    border: "1px",
    width: "100%",
    height: "45px",
    [theme.breakpoints.only("xs")]: {
      width: "116%",
    },
  },

  buttonIcon: {
    marginRight: theme.spacing(1),
    height: "24px",
    width: "24px",
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "19.36px",
    [theme.breakpoints.only("sm")]: {
      fontSize: "10px",
    },

    [theme.breakpoints.only("xs")]: {
      fontSize: "9px",
    },
  },

  lineContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    margin: "16px 0",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "#000000",
  },

  createback: {
    color: "#0075FF",
    fontWeight: "600",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: "13px",
    lineHeight: "15.73px",
  },

  signon: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "15.73px",
    color: "#0075FF",
  },

  text: {
    color: "#000000",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);

  const history = useHistory();

  // const getData = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   setIP(res.data);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  console.log(props.location.state, "state");

  // const handleFormSubmit = async (values) => {
  //   sessionStorage.setItem("email", values.email);
  //   setLoader(true);
  //   try {
  //     const res = await axios({
  //       method: "POST",
  //       url: ApiConfig.login,
  //       data: {
  //         email: values.email,
  //         password: values.password,
  //       },
  //     });
  //     if (res.data.status === 200) {
  //       toast.success("You are successfully logged in.");
  //       window.localStorage.setItem("token", res.data.token.access);
  //       auth.userLogIn(res.data.token.access, true);
  //       {
  //         res.data.GitConnected == true
  //           ? history.push("/dashboard")
  //           : history.push("/connect-to-gitlab");
  //       }
  //     } else {
  //       toast.warn(res.data.data);
  //       console.log("ye wala");
  //       setLoader(false);
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     if (error.response.data.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("Something went wrong. Please try again.");
  //     }
  //   }
  // };
  const handleVerifyEmail = async (values) => {
    setLoader(true);
    console.log(values, "values");
    // var dataTosend = new FormData();

    //   if (values.email) {
    //     console.log(values.email, "aaya kya")
    //     dataTosend.append("email",values.email);
    //   }

    //   dataTosend.append("otp", props.location.state);
    //   console.log(dataTosend, "datatoSend")
    try {
      const response = await axios({
        url: "https://nodepune-aivideogenerator.mobiloitte.io/api/v1/user/verifyEmail",
        method: "POST",
        data: {
          email: values.email,
          otp: props.location.state.toString(),
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.message);
        history.push("/");
      } else {
        toast.warn(response.data.data);
        console.log("data");
        setLoader(false);
      }

      console.log(response, "aayakya");
    } catch (error) {
      setLoader(false);
      console.log(error, "error");
    }
  };

  return (
    <>
      <Page title="Login">
        <ToastContainer />
        <Grid container>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box className={classes.maindiv}>
              <Box className="d-flex.column" style={{ marginTop: "6rem" }}>
                <div>
                  <Logo />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <Typography className={classes.LoginTitle}>
                    Log in using Google SSO
                  </Typography>
                </div>
                <Box>
                  <Formik
                    onSubmit={(values) => handleVerifyEmail(values)}
                    initialValues={{
                      email: "",
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
                        <Grid item className={classes.textFieldgrid}>
                          <Box className={classes.inputfields}>
                            <label className={classes.label}>
                              Email
                              <span className={classes.span}>*</span>
                            </label>
                            <TextField
                              placeholder="Enter your email"
                              size="small"
                              variant="outlined"
                              maxLength={50}
                              fullWidth
                              className={classes.textfield}
                              type={"email"}
                              value={values.email}
                              name="email"
                              error={Boolean(touched.email && errors.email)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              // InputProps={{
                              //   className: classes.TextBox,
                              //   endAdornment: (
                              //     <InputAdornment position="end">
                              //       <IconButton
                              //         onClick={() => setShowPassword(!showPassword)}
                              //         edge="end"
                              //       >
                              //       </IconButton>
                              //     </InputAdornment>
                              //   ),
                              // }}
                            />
                            <FormHelperText
                              error
                              style={{ fontSize: "12px", marginTop: ".3px" }}
                            >
                              {touched.email && errors.email}
                            </FormHelperText>
                          </Box>
                        </Grid>
                        <br></br>
                        <Box className={classes.btnbox}>
                          <Button
                            fullWidth
                            disabled={isLoading}
                            className={classes.buttonbox}
                            type="submit"
                          >
                            {isLoading === false ? (
                              " Log In"
                            ) : (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Box>
                        <Grid item style={{ paddingTop: "18px" }}>
                          <Typography
                            color="primary.main"
                            variant="body2"
                            className={classes.BottomGrid}
                          >
                            <span className={classes.createback}>
                              {" "}
                              Log in with Google or Apple using Password{" "}
                            </span>
                          </Typography>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Page>
    </>
  );
}

export default Login;
