import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Box,
  Drawer,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// Validation schema for form fields
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .transform((value) =>
      value
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : value
    ),
  lastName: Yup.string()
    .required("Last Name is required")
    .transform((value) =>
      value
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : value
    ),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email"
    )
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/,
      "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, and one digit"
    )
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
// Styles for the component
const useStyles = makeStyles((theme) => ({
  rightDrawer: {
    "& .MuiDrawer-paper": {
      padding: "15px",
      width: "35%",
      overflowY: "auto",

      "@media(max-width:800px)": {
        width: "50%",
      },
    },
  },
  twobtnsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  singleProjectBtn: {
    backgroundColor: "#181C32",
    fontFamily: "Inter",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "12px",
    borderRadius: "2px 0px 0px 2px",
    width: "50%",
    border: "1px solid #181C32",
    padding: "19px",
    whiteSpace: "nowrap",

    "@media(max-width:500px)": {
      fontSize: "12px",
      padding: "12px",
    },
  },

  multipleProjectBtn: {
    backgroundColor: "#F2F4FF",
    fontFamily: "Inter",
    color: "#181C32",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "12px",
    borderRadius: "0px 2px 2px 0px",
    width: "50%",
    border: "1px solid #181C32",
    padding: "19px",
    whiteSpace: "nowrap",

    "@media(max-width:500px)": {
      fontSize: "12px",
      padding: "12px",
    },
  },

  activeButton: {
    color: "#F2F4FF",
    backgroundColor: "#181C32",
  },
  activeButton1: {
    color: "#181C32",
    backgroundColor: "#F2F4FF",
  },

  textfieldsContainer: {
    padding: "12px 15px",
    "& label": {
      fontSize: "14px",
      fontFamily: "Inter",
      color: "#0F0037",
      fontWeight: 500,

      "@media(max-width:500px)": {
        fontSize: "12px",
      },
    },
  },

  dialogText: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
    },

    "& .MuiOutlinedInput-input": {
      borderRadius: "6px",
      backgroundColor: "#F1F1F2",
      padding: "12px 13px !important",

      "@media(max-width:500px)": {
        padding: "10px",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  saveDeailsBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "1rem 0px",
  },
  saveDetailsBtn: {
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#181C32",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Inter",

    "@media(max-width:500px)": {
      fontSize: "12px",
      padding: "6px",
    },
  },
  csvContainer: {
    "& label": {
      color: "#0F0037",
      fontFamily: "Inter",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "18.811px",
      letterSpacing: "0.009px",
    },
  },
  error: {
    fontSize: "12px",
    color: "red",
  },
}));
// Component for adding user drawer
const AddUserDrawer = ({ userDrawerOpen, userDrawerClose, allUserHandler }) => {
  const classes = useStyles();
  const [csvfile, setCsvfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSingleProject, setIsSingleProject] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // Function to handle CSV upload
  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    setCsvfile(file);
  };
  // Function to handle adding multiple users
  const addMultipleUserHandler = async () => {
    setLoading(false);
    if (csvfile) {
      try {
        setLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.addMultipleUser,
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            csvFile: csvfile,
          },
        });
        if (res.data.responseCode === 200) {
          setLoading(false);
          toast.success(res.data.message);
          setTimeout(() => {
            userDrawerClose();
          }, 1000);
        }
      } catch (error) {
        setLoading(false);
        console.log(error, "error");
      }
    } else {
      toast.error("No CSV file selected");
    }
  };
  // Function to handle adding a single user
  const addUserhandler = async (values) => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.adminCreateUser,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      });
      if (res.data.responseCode === 200) {
        setLoading(false);
        toast.success(res.data.message);
        allUserHandler();
        setTimeout(() => {
          userDrawerClose();
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    }
  };
  // Function to handle click on Single Project butt
  const handleSingleProjectClick = () => {
    setIsSingleProject(true);
  };
  // Function to handle click on Multiple Project button
  const handleMultipleProjectClick = () => {
    setIsSingleProject(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={userDrawerOpen}
        onClose={userDrawerClose}
        className={classes.rightDrawer}
      >
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            addUserhandler(values);
          }}
        >
          {({ errors, touched, handleBlur, handleChange, values }) => (
            <Form>
              <Box className={classes.twobtnsContainer}>
                <Button
                  variant="contained"
                  className={`${classes.singleProjectBtn} ${
                    isSingleProject ? "" : classes.activeButton1
                  }`}
                  onClick={handleSingleProjectClick}
                >
                  Single User
                </Button>
                <Button
                  variant="contained"
                  className={`${classes.multipleProjectBtn} ${
                    isSingleProject ? "" : classes.activeButton
                  }`}
                  onClick={handleMultipleProjectClick}
                >
                  Multiple User
                </Button>
              </Box>

              {isSingleProject ? (
                <>
                  <Box className={classes.textfieldsContainer}>
                    <label htmlFor="firstName">First Name</label>
                    <TextField
                      variant="outlined"
                      className={classes.dialogText}
                      name="firstName"
                      error={Boolean(touched.firstName && errors.firstName)}
                      id="firstName"
                      onBlur={handleBlur}
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={classes.error}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      className={classes.dialogText}
                      name="lastName"
                      error={Boolean(touched.lastName && errors.lastName)}
                      value={values.lastName}
                      id="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={classes.error}
                    />

                    <label htmlFor="email">Email Address</label>
                    <TextField
                      variant="outlined"
                      className={classes.dialogText}
                      name="email"
                      error={Boolean(touched.email && errors.email)}
                      value={values.email}
                      id="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={classes.error}
                    />
                    <label htmlFor="password">Password</label>
                    <TextField
                      variant="outlined"
                      className={classes.dialogText}
                      name="password"
                      error={Boolean(touched.password && errors.password)}
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
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
                                    className={classes.eyeimg}
                                  />
                                ) : (
                                  <img
                                    alt="img"
                                    src="/images/Hide.png"
                                    className={classes.eyeimg}
                                  />
                                )}
                              </Box>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={classes.error}
                    />

                    <Box className={classes.saveDeailsBtnContainer}>
                      <Button
                        type="submit"
                        variant="contained"
                        className={classes.saveDetailsBtn}
                      >
                        {loading === false ? (
                          "Save Details"
                        ) : (
                          <ButtonCircularProgress />
                        )}
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box className={classes.csvContainer}>
                  <label>Upload CSV</label>
                  <TextField
                    variant="outlined"
                    className={classes.dialogText}
                    value={csvfile ? csvfile.name : ""}
                    InputProps={{
                      readOnly: true,
                      style: {
                        cursor: "pointer",
                        color: "transparent",
                        textShadow: "0 0 0 black",
                      },
                    }}
                    onClick={() =>
                      document.getElementById("csv-upload").click()
                    }
                  />
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    style={{ display: "none" }}
                  />
                  <Box className={classes.saveDeailsBtnContainer}>
                    <Button
                      variant="contained"
                      className={classes.saveDetailsBtn}
                      onClick={addMultipleUserHandler}
                    >
                      {loading ? <ButtonCircularProgress /> : "Save Details"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default AddUserDrawer;
