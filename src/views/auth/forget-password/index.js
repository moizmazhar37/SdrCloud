import React, { useState, useContext } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Button,
  FormHelperText,
  Container,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import moment from "moment";

// useStyles hook to define styles
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100vh", // Full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginLayoutForm: {
    display: "flex",
    padding: "230px 0px",
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
    "& .innerbox": {
      padding: "44px 44px 44px 44px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "var(--white, #FFF)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    },
  },
  bottomLink2: {
    fontWeight: "500",
    height: "48px",
    fontSize: "16px",
    color: "var(--black, #152F40)",
    cursor: "pointer",
    borderRadius: "8px",
    background: "#F4F4F4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Sendbtn: {
    borderRadius: "8px",
    height: "48px",
    backgroundColor: "var(--blue, #0358AC) !important",
    color: "#F2F7FF !important",
    fontSize: "16px",
    boxShadow: "none",
  },
  disbledbtn: {
    borderRadius: "8px",
    backgroundColor: "var(--stroke, #CACACA) !important",
    color: "var(--light-blue, #F2F7FF) !important",
    fontSize: "16px",
    boxShadow: "none",
    height: "48px",
  },
  mainBox: {
    margin: "48px 0px",
    "& .emailHeading": {
      color: "#152F40",
    },
  },
}));
// Login component: Handles the  form and its submission
function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  const auth = useContext(AuthContext);
  // Check if the form is from the change password page
  const isFromChangePassword =
    location?.state && location?.state?.fromChangePassword;
  // Handle form submission
  const handleFormSubmit = async (values) => {
    try {
      setLoader(true);

      const response = await axios({
        url: ApiConfig.forgotPassword,
        method: "GET",
        params: {
          email: values.email.toLowerCase(),
          webUrl: `${window.location.origin}/otpverify?email=${values.email.toLowerCase()}`,
        },
      });

      if (response?.data?.status === 200) {
        setLoader(false);
        toast.success(response?.data?.message);
        localStorage.setItem("remainingTime", 180);
        auth.setEndtime(moment().add(3, "m").unix());
        history.push("/otpverify", { state: { data: values.email } });
      } else if (response.data.responseCode === 404) {
        setLoader(false);
        toast.warn(response?.data?.message);
      } else {
        toast.error("Email is not registered with SDRCloud.ai.");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };
  // Redirect to login page
  const goToLogin = () => {
    history.push("/");
  };

  return (
    <>
      <Container maxWidth="sm" className={classes.mainContainer}>
        <Box className={classes.loginLayoutForm}>
          <Box className="innerbox">
            <Typography
              variant="h1"
              style={{
                color: "var(--black, #152F40)",
                textAlign: "center",
                fontSize: "36px",
                letterSpacing: "0.5px",
              }}
            >
              Forgot Your Password?
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "var(--grey, #858585)",
                marginTop: "24px",
                fontSize: "16px",
              }}
            >
              Enter your email for the verification proccess, we will send 4
              digits code to your email.
            </Typography>
            <Box mt={4}>
              <Formik
                onSubmit={(values) => handleFormSubmit(values)}
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
                })}
              >
                {({ errors, handleBlur, handleChange, touched, values }) => (
                  <Form>
                    <Box mb={4} className={classes.mainBox}>
                      <Typography className="emailHeading" variant="body1">
                        Your Email
                      </Typography>
                      <TextField
                        placeholder="Enter Your Email"
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name="email"
                        value={values.email}
                        inputProps={{ maxLength: 254 }}
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
                    </Box>
                    <Box>
                      <Button
                        className={
                          values.email ? classes.Sendbtn : classes.disbledbtn
                        }
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                      >
                        {isLoading === false ? (
                          "Send"
                        ) : (
                          <ButtonCircularProgress />
                        )}
                      </Button>
                    </Box>
                    <Box
                      textAlign="center"
                      mt={4}
                      style={{ marginTop: "16px" }}
                    >
                      <Typography
                        className={classes.bottomLink2}
                        onClick={() => {
                          history.push(
                            isFromChangePassword
                              ? localStorage.getItem("userType")
                                ? localStorage.getItem("userType") ==
                                  "SUBADMIN" ||
                                  localStorage.getItem("userType") == "USER"
                                  ? "/change-your-password"
                                  : "/edit-profile"
                                : "/edit-profile"
                              : "/"
                          );
                        }}
                      >
                        {isFromChangePassword
                          ? "Back to Settings"
                          : "Back to Login"}
                      </Typography>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
