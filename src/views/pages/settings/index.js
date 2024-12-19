import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { UserContext } from "src/context/User";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import EditCompanySettings from "./others/EditCompanySettings";
// import Integration from "./Integration";
import * as Yup from "yup";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Integration from "./Integrations/Integration";

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    height: "100%",
    padding: "5px",
    "&.MuiPaper-root": {
      border: "none",
      boxShadow: "none !important",
    },
    "& .templatebox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "150px",
      width: "208px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "20px 10px 20px 10px",
      cursor: "pointer",
      "& p": {
        marginTop: "24px",
        textAlign: "center",
      },
    },
  },
  settingBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    gridGap: "2rem",
    "& .MuiTypography-body1": {
      color: "#152F40",
      fontWeight: 400,
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  innerbox: {
    border: "1px solid #E7E7E7",
    padding: "12px 20px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .profileBox": {
      justifyContent: "start",
    },
    "& .MuiTypography-body1": {
      color: "#152F40",
      fontWeight: 500,
    },
  },
  headingBox: {
    background: "#F4F4F4",
    padding: "12px 10px 12px 24px",
    borderRadius: "10px 10px 0px 0px",
    color: "#152F40",
    "& h5": {
      fontSize: "14px",
    },
    "& .EditButton": {
      color: "color: var(--blue, #0358AC)",
    },
  },

  btnContainer: {
    marginTop: "16px",

    "& button": {
      border: "none !important",
      color: "#152F40",
      fontSize: "16px",
      fontWeight: 500,
    },
  },
  btnChangePass: {
    color: "var(--blue, #0358AC)",
    fontWeight: 500,
  },
  iconVisBtn: {
    color: "grey",
  },
  breads: {
    "& nav li": {
      margin: "0px",
    },
    "& .breadCrumbText": {
      color: "#0358AC",
      margin: "0px 5px",
    },
  },
  textfiledallbefore: {
    "& .MuiInputBase-input": {
      fontSize: "14px",
      fontWeight: "500",
    },
  },
  textfiledall: {
    "& .MuiInputBase-root": {
      border: "0.5px solid gray",
      borderRadius: "5px",
      height: "35px",
    },
    "& .MuiInputBase-input": {
      marginLeft: "5px",
    },
  },
}));
// Define validation schema for personal details
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .transform((value) =>
      value
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : value
    ),
  lastName: Yup.string()
    .required("Last name is required")
    .transform((value) =>
      value
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : value
    ),
  email: Yup.string()
    .email("A valid email address is required (e.g., user@example.com).")
    .required("A valid email address is required (e.g., user@example.com).")
    .max(254, "A valid email address is required (e.g., user@example.com).")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
      "A valid email address is required (e.g., user@example.com)."
    ),
  phone: Yup.string().required("Phone is required"),
});
// Define state variables and context
const Settings = (props) => {
  const user = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  // Define state variables and initial values
  const [settingRoute, setSettingRoute] = useState(
    props?.location?.state?.id || "setting"
  );
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    firstName: user?.profileData?.firstName
      ? user?.profileData?.firstName
      : "--",
    lastName: user?.profileData?.lastName ? user?.profileData?.lastName : "---",
    email: user?.profileData?.email ? user?.profileData?.email : "--",
    phone: user?.profileData?.phoneNo ? user?.profileData?.phoneNo : "--",
  });
  // useEffect hook to update user data when context changes
  useEffect(() => {
    setUserData({
      firstName: user?.profileData?.firstName
        ? user?.profileData?.firstName
        : "--",
      lastName: user?.profileData?.lastName
        ? user?.profileData?.lastName
        : "--",
      email: user?.profileData?.email ? user?.profileData?.email : "--",
      phone: user?.profileData?.phoneNo ? user?.profileData?.phoneNo : "--",
    });
  }, [user]);
  // Display names for user details
  const displayNames = {
    firstName: "First Name:",
    lastName: "Last Name:",
    email: "Email:",
    phone: "Phone:",
  };
  // Footer links state and functions to handle changes
  const [footerLinks, setFooterLinks] = useState([
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
  ]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // Function to handle the save click event, update user profile and manage responses
  const handleSaveClick = async () => {
    setEditing(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.updateProfile,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: userData,
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        user.getProfilehandler();
        history.goBack();
      } else if (res?.data?.status === 205) {
        setLoading(false);
        toast.error(res?.data?.message);
        history.goBack();
      } else {
        setLoading(false);
        toast.success(res?.data?.message);
        history.goBack();
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.data?.message);
      setLoading(false);
      history.goBack();
    }
  };
  const handleChangeEdit = (key, value) => {
    if (key === "firstName" || key === "lastName") {
      value = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 60);
    } else if (key === "phone") {
      value = value.replace(/\D/g, "").slice(0, 20);
    }
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChange = (newValue) => {
    user.setValue(newValue);
  };
  const userType = window.localStorage.getItem("userType");
  // Function to handle click event and set the current route to 'setting'
  function handleClick(event) {
    event.preventDefault();
    setSettingRoute("setting");
  }

  const handleLinkNameChange = (e, index) => {
    const updatedLinks = [...footerLinks];
    updatedLinks[index].name = e.target.value;
    setFooterLinks(updatedLinks);
  };
  // Function to handle changes to the link URL in the footer links array
  const handleLinkURLChange = (e, index) => {
    const updatedLinks = [...footerLinks];
    updatedLinks[index].url = e.target.value;
    setFooterLinks(updatedLinks);
  };
  // Add new footer link
  const addFooterLink = () => {
    setFooterLinks((prevLinks) => [...prevLinks, { name: "", url: "" }]);
  };
  // Validation schema for the form using Yup to validate link name and URL
  const formValidationSchema = Yup.object().shape({
    linkName: Yup.string()
      .required("Link name is required.")
      .min(3, "Please enter at least 3 characters.")
      .max(60, "You can enter up to 60 characters."),

    linkURL: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),
  });

  const handleFormSubmit = () => {};

  const handleFormSubmit1 = () => {};

  const formValidationSchemaOne = Yup.object().shape({
    facebook: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),

    linkedIn: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),

    google: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),

    terminus: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),

    hubspot: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),

    outreach: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),

    experinece: Yup.string()
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        "Invalid URL format. Please enter a valid URL."
      )
      .required("URL is required"),
  });

  return (
    <div style={{ marginLeft: "-5px" }}>
      <Box className={classes.paperContainer}>
        <Paper className={classes.tabContainer}>
          {settingRoute === "setting" && (
            <Box className={classes.settingBox}>
              <Box
                className="templatebox"
                onClick={() => {
                  history.push("/company-information");
                }}
              >
                <div className="d-flex">
                  <img src="images/Setting/Company.png" alt="img" />
                </div>

                <Typography variant="body1">Company</Typography>
              </Box>

              <Box
                className="templatebox"
                onClick={() => {
                  history.push("/integrations");
                }}
              >
                <div className="d-flex">
                  <img src="images/Setting/add_integration.svg" alt="img" />
                </div>

                <Typography variant="body1">Integrations</Typography>
              </Box>

              <Box
                className="templatebox"
                onClick={() => {
                  history.push("/intent");
                }}
              >
                <div className="d-flex">
                  <img src="images/Setting/Tracking.png" alt="img" />
                </div>

                <Typography variant="body1">Intent Tracking</Typography>
              </Box>

              <Box
                className="templatebox"
                onClick={() => {
                  history.push("/myprofile");
                }}
              >
                <div className="d-flex">
                  <img src="images/Setting/my_personal.svg" alt="img" />
                </div>

                <Typography variant="body1">My Profile</Typography>
              </Box>
            </Box>
          )}

          {settingRoute === "Edit My Profile" && (
            <>
              <Box className={classes.breads}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="/setting" onClick={handleClick}>
                    Settings
                  </Link>

                  <Typography className="breadCrumbText">
                    {settingRoute}
                  </Typography>
                </Breadcrumbs>
              </Box>
              <Formik
                initialValues={userData}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  handleSaveClick();
                }}
              >
                <Form>
                  <Grid container spacing={1} style={{ paddingTop: "30px" }}>
                    <Grid item md={8} sm={10} xs={12} lg={5}>
                      <Box className={classes.headingBox}>
                        <Box
                          className="d-flex"
                          style={{ justifyContent: "start" }}
                        >
                          <Typography variant="h5">Personal Details</Typography>
                          {isEditing ? (
                            <Button
                              color="primary"
                              onClick={handleSaveClick}
                              style={{ color: "var(--blue, #0358AC)" }}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              color="primary"
                              onClick={handleEditClick}
                              style={{
                                color: "var(--blue, #0358AC)",
                                fontSize: "14px",
                              }}
                            >
                              Edit
                            </Button>
                          )}
                        </Box>
                      </Box>
                      <Box className={classes.innerbox}>
                        {Object.keys(userData).map((key) => (
                          <Box key={key} pt={1} className="d-flex">
                            <Grid container>
                              <Grid
                                item
                                lg={3}
                                md={4}
                                sm={3}
                                xs={12}
                                className="profileBox d-flex"
                              >
                                {" "}
                                <Typography
                                  variant="body1"
                                  style={{ color: "rgba(133, 133, 133, 1)" }}
                                >
                                  {capitalizeFirstLetter(displayNames[key])}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                lg={9}
                                md={8}
                                sm={9}
                                xs={12}
                                style={{ display: "flex" }}
                              >
                                <Box
                                  className="d-flex"
                                  style={{
                                    justifyContent: "start",
                                    width: "200px",
                                  }}
                                >
                                  <TextField
                                    className={
                                      isEditing
                                        ? classes.textfiledall
                                        : classes.textfiledallbefore
                                    }
                                    name={key}
                                    placeholder={`Enter Your ${capitalizeFirstLetter(
                                      key
                                    )}`}
                                    style={{
                                      "& .MuiInputBase-input::placeholder": {
                                        color: "#767676",
                                      },
                                    }}
                                    value={userData[key]}
                                    disabled={!isEditing || key === "email"}
                                    onChange={(e) =>
                                      handleChangeEdit(key, e.target.value)
                                    }
                                    InputProps={{
                                      classes: {
                                        notchedOutline: isEditing
                                          ? ""
                                          : classes.noBorder,
                                      },
                                    }}
                                    type={key === "phone" ? "number" : "text"}
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                        <Button
                          fullWidth
                          color="primary"
                          style={{
                            marginTop: "8px",
                            color: "var(--blue, #0358AC)",
                            width: "100%",
                            fontSize: "14px",
                            display: "flex",
                            justifyContent: "start",
                            padding: "0px",
                          }}
                          onClick={() => {
                            history.push("/change-password");
                          }}
                        >
                          Change Password
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </>
          )}

          {settingRoute === "Integrations" && (
            <>
              <Integration
                settingRoute={settingRoute}
                handleClick={handleClick}
                setSettingRoute={setSettingRoute}
              />
            </>
          )}

          {settingRoute === "Footer Links" && (
            <>
              <Box className={classes.breads}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="/setting" onClick={handleClick}>
                    Settings
                  </Link>
                  <Typography className="breadCrumbText">
                    {settingRoute}
                  </Typography>
                </Breadcrumbs>
              </Box>
              <Grid container spacing={3} style={{ paddingTop: "30px" }}>
                <Grid item sm={6} xs={12}>
                  <Box className={classes.headingBox}>
                    <Typography variant="h5">Footer Links</Typography>
                  </Box>
                  <Formik
                    initialValues={{
                      linkName: "",
                      linkURL: "",
                    }}
                    initialStatus={{
                      success: false,
                      successMsg: "",
                    }}
                    validationSchema={formValidationSchema}
                    onSubmit={(values) => handleFormSubmit(values)}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      touched,
                      isValid,
                      dirty,
                    }) => (
                      <Form>
                        <Box className={classes.innerbox}>
                          {footerLinks.map((link, index) => (
                            <Grid container spacing={4} key={index}>
                              <Grid item xs={12} sm={6} md={4}>
                                <Box pt={1}>
                                  <Typography
                                    variant="body1"
                                    style={{ fontWeight: 400 }}
                                  >
                                    Link Name
                                  </Typography>
                                  <TextField
                                    name="linkName"
                                    variant="outlined"
                                    placeholder="Enter Link Name"
                                    fullWidth
                                    inputProps={{ maxLength: 61 }}
                                    value={link.name}
                                    onChange={(e) => {
                                      handleLinkNameChange(e, index);
                                      handleChange(e, index);
                                    }}
                                    onBlur={handleBlur}
                                  />

                                  <FormHelperText
                                    error
                                    className={classes.helperText}
                                  >
                                    {touched.linkName && errors.linkName}
                                  </FormHelperText>
                                </Box>
                              </Grid>

                              <Grid item xs={12} sm={6} md={8}>
                                <Box pt={1}>
                                  <Typography
                                    variant="body1"
                                    style={{ fontWeight: 400 }}
                                  >
                                    Link URL
                                  </Typography>
                                  <TextField
                                    name="linkURL"
                                    variant="outlined"
                                    placeholder="Enter Link URL"
                                    fullWidth
                                    value={link.url}
                                    onChange={(e) => {
                                      handleLinkURLChange(e, index);
                                      handleChange(e, index);
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  <FormHelperText
                                    error
                                    className={classes.helperText}
                                  >
                                    {touched.linkURL && errors.linkURL}
                                  </FormHelperText>
                                </Box>
                              </Grid>
                            </Grid>
                          ))}

                          <Box className={classes.btnContainer}>
                            <Button variant="outlined" onClick={addFooterLink}>
                              + Add More Footer Links{" "}
                            </Button>
                          </Box>

                          <Box mt={3}>
                            <Button
                              variant="contained"
                              type="submit"
                              color="primary"
                              style={{ boxShadow: "none" }}
                              disabled={!isValid || !dirty}
                            >
                              {" "}
                              Save
                            </Button>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Box className={classes.headingBox}>
                    <Typography variant="h5">Tracking Pixels</Typography>
                  </Box>
                  <Formik
                    initialValues={{
                      facebook: "",
                      linkedIn: "",
                      google: "",
                      terminus: "",
                      hubspot: "",
                      outreach: "",
                      experinece: "",
                    }}
                    initialStatus={{
                      success: false,
                      successMsg: "",
                    }}
                    validationSchema={formValidationSchemaOne}
                    onSubmit={(values) => handleFormSubmit1(values)}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      touched,
                      values,
                      isValid,
                      dirty,
                    }) => (
                      <Form>
                        <Box className={classes.innerbox}>
                          <Box pt={1} mb={1}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 400 }}
                            >
                              Facebook
                            </Typography>
                            <TextField
                              name="facebook"
                              value={values.facebook}
                              variant="outlined"
                              placeholder="Enter Facebook Tracking Pixels"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.facebook && errors.facebook}
                            </FormHelperText>
                          </Box>

                          <Box pt={1} mb={1}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 400 }}
                            >
                              LinkedIn
                            </Typography>
                            <TextField
                              name="linkedIn"
                              value={values.linkedIn}
                              variant="outlined"
                              placeholder="Enter Linkedin Tracking Pixels"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.linkedIn && errors.linkedIn}
                            </FormHelperText>
                          </Box>

                          <Box pt={1} mb={1}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 400 }}
                            >
                              Google
                            </Typography>
                            <TextField
                              name="google"
                              value={values.google}
                              variant="outlined"
                              placeholder="Enter Google Analytics Tracking Pixels"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.google && errors.google}
                            </FormHelperText>
                          </Box>

                          <Box pt={1} mb={1}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 400 }}
                            >
                              Terminus l Demand Base l 6Sense l Other{" "}
                            </Typography>
                            <TextField
                              name="terminus"
                              value={values.terminus}
                              variant="outlined"
                              placeholder="Enter ABM Tracking Pixels"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.terminus && errors.terminus}
                            </FormHelperText>
                          </Box>

                          <Box pt={1} mb={1}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 400 }}
                            >
                              Salesforce i Hubspot i CRM
                            </Typography>
                            <TextField
                              name="hubspot"
                              value={values.hubspot}
                              variant="outlined"
                              placeholder="Enter CRM Tracking Pixels"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.hubspot && errors.hubspot}
                            </FormHelperText>
                          </Box>

                          <Box pt={1} mb={1}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 400 }}
                            >
                              Salesloft l Outreach
                            </Typography>
                            <TextField
                              name="outreach"
                              value={values.outreach}
                              variant="outlined"
                              placeholder="Enter Outbound Cadence Platform Tracking Pixels"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.outreach && errors.outreach}
                            </FormHelperText>
                          </Box>

                          <Box pt={1} mb={1}>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: 400 }}
                            >
                              Experience.com i Other
                            </Typography>
                            <TextField
                              name="experinece"
                              value={values.experinece}
                              variant="outlined"
                              placeholder="Enter Other Tracking Pixels"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.experinece && errors.experinece}
                            </FormHelperText>
                          </Box>

                          <Box mt={3}>
                            <Button
                              variant="contained"
                              type="submit"
                              style={{ boxShadow: "none" }}
                              color="primary"
                              disabled={!isValid || !dirty}
                            >
                              {" "}
                              Save
                            </Button>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </>
          )}

          {settingRoute === "Edit Company Information" && (
            <>
              <EditCompanySettings
                settingRoute={settingRoute}
                handleClick={handleClick}
              />
            </>
          )}

          {settingRoute === "Archive Users" && (
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/setting" onClick={handleClick}>
                Setting
              </Link>
              <Typography color="textLink">{settingRoute}</Typography>
            </Breadcrumbs>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default Settings;
