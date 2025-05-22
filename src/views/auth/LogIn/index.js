import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "src/context/Auth";
import ApiConfig from "src/config/APIConfig";
import Logo from "src/component/Logo";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Page from "src/component/Page";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import styles from "./Login.module.scss";

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory(); // Changed from useNavigate to useHistory
  const [isLoading, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(
    localStorage.getItem("password") != null
  );

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formInitialSchema = {
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("A valid email address is required. (e.g. user@example.com)")
      .required("A valid email address is required. (e.g. user@example.com)")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
        "A valid email address is required. (e.g. user@example.com)"
      ),
    password: yup
      .string()
      .trim()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\s\S])[A-Za-z\d\s\S]{8,16}$/,
        "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
      )
      .required(
        "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
      ),
  });

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
        setLoader(false);

        window.localStorage.setItem(
          "email",
          response?.data?.user_details?.email
        );
        window.localStorage.setItem(
          "userType",
          response?.data?.user_details?.role
        );
        window.localStorage.setItem("token", response?.data?.token);
        window.localStorage.setItem("_id", response?.data?.user_details?.id);

        toast.success(
          `${response?.data?.user_details?.role} logged in successfully`
        );
        auth.userLogIn(true, response?.data?.token);

        if (response?.data?.user_details?.status === "PENDING") {
          history.push("/set-password");
        } else {
          const userType = response?.data?.user_details?.role;

          if (userType === "USER") {
            history.push("/CreateTemplate");
            toast.success(response?.data?.message);
          } else if (userType === "ADMIN") {
            history.push("/PP-createaccount");
            toast.success(response?.data?.message);
          } else if (userType === "SUBADMIN") {
            history.push("/dashboard");
            toast.success(response?.data?.message);
          } else if ((userType = "SDRC_ADMIN")) {
            toast.success(response?.data?.message);
            history.push("/sdrc-dashboard");
          }
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
      setLoader(false);
      if (error?.response) {
        const status = error.response.status;
        switch (status) {
          case 401:
            toast.warn("Unauthorized! Please check your credentials.");
            break;
          case 403:
            toast.warn(
              "Access Forbidden! You don't have the required permissions."
            );
            break;
          case 404:
            toast.warn(
              "Resource not found! Please check the URL or resource availability."
            );
            break;
          default:
            toast.error("Unexpected error");
            break;
        }
      } else if (error?.message) {
        toast.error("Network error: " + error.message);
      } else {
        toast.error("Something went wrong! Try again later.");
      }
    }
  };
  useEffect(() => {
    if (auth.userLoggedIn === true) {
      const userType = localStorage.getItem("userType");
      if (userType === "USER") {
        history.push("/CreateTemplate");
      } else if (userType === "ADMIN") {
        history.push("/PP-createaccount");
      } else if (userType === "SUBADMIN") {
        history.push("/dashboard");
      } else if (userType === "SDRC_ADMIN") {
        history.push("/sdrc-dashboard");
      }
    }
  }, [auth.userLoggedIn, history]);

  return (
    <div className={styles.loginContainer}>
      <Page title="Login">
        <ToastContainer />
        <div className={styles.loginLayoutForm}>
          <div className={styles.loginBoxInner}>
            <Logo />
            <h1 className={styles.title}>Login</h1>
            <div>
              <Formik
                onSubmit={handleLogin}
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={validationSchema}
              >
                {({ errors, handleBlur, handleChange, touched, values }) => (
                  <Form>
                    <div className={styles.formContent}>
                      <div className={styles.formField}>
                        <label className={styles.label}>Your Email</label>
                        <input
                          className={`${styles.input} ${
                            touched.email && errors.email ? styles.error : ""
                          }`}
                          placeholder="Enter Your Email"
                          id="email"
                          maxLength={254}
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault();
                            }
                          }}
                        />
                        {touched.email && errors.email && (
                          <div className={styles.errorText}>{errors.email}</div>
                        )}
                      </div>

                      <div className={styles.formField}>
                        <label className={styles.label}>Your Password</label>
                        <div className={styles.passwordField}>
                          <input
                            className={`${styles.input} ${
                              touched.password && errors.password
                                ? styles.error
                                : ""
                            }`}
                            placeholder="Enter Your Password"
                            id="password"
                            maxLength={16}
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              if (e.key === " ") {
                                e.preventDefault();
                              }
                            }}
                          />
                          <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={handleTogglePassword}
                          >
                            {showPassword ? <VscEye /> : <VscEyeClosed />}
                          </button>
                        </div>
                        {touched.password && errors.password && (
                          <div className={styles.errorText}>
                            {errors.password}
                          </div>
                        )}
                      </div>

                      <div className={styles.checkBoxGrid}>
                        <div className={styles.checkBoxDiv}>
                          <input
                            className={styles.checkBox}
                            type="checkbox"
                            checked={isRememberMe}
                            onChange={() => setIsRememberMe(!isRememberMe)}
                          />
                          <span className={styles.rememberText}>
                            Remember me
                          </span>
                        </div>
                        <Link
                          to="/forget-password"
                          className={styles.forgotLink}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    <div className={styles.loginButtonBox}>
                      <button
                        className={`${styles.loginButton} ${
                          values.email && values.password
                            ? styles.activeBtn
                            : styles.disabledBtn
                        }`}
                        type="submit"
                        disabled={
                          isLoading || !values.email || !values.password
                        }
                      >
                        {isLoading ? <ButtonCircularProgress /> : "Log In"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default Login;
