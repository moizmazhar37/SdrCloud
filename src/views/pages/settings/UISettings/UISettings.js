import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import AddIcon from "@material-ui/icons/Add";
// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    width: "100%",
  },
  boxModel: {
    padding: "25px",
    "& .MuiDivider-root": {
      backgroundColor: "rgba(15, 0, 55, 0.60)",
      margin: "10px 0px 20px",
    },
    "& .accountsBox": {
      backgroundColor: "rgba(15, 0, 55, 0.05)",
      border: "1px solid rgba(24, 28, 50, 0.20)",
      padding: "10px",
      borderRadius: "5px",
      marginTop: "20px",
    },
    "& .flexBox": {
      display: "flex",
      justifyContent: "space-between",
      "@media(max-width:457px)": {
        display: "block",
      },
    },
  },

  accountsStatus: {
    backgroundColor: "rgba(52, 168, 83, 1)",
    padding: "2px",
    borderRadius: "2px",
  },

  deactivatedStatus: {
    backgroundColor: "rgba(234, 67, 53, 1)",
    padding: "2px",
    borderRadius: "2px",
  },
  icon: {
    backgroundColor: "#555a78 !important",
    borderRadius: "6px 6px 6px 0",
  },
  inputUploader: {
    cursor: "pointer",
    display: "inline-block",
    width: "100%",
    padding: "92px 0 0 0",
    height: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
    background:
      "url('/images/orgLogo.svg') center center no-repeat rgba(15, 0, 55, 0.05)",
    borderRadius: "10px",
    border: "1.5px solid rgba(24, 28, 50, 0.13)",
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: "0",
    right: "0",
    cursor: "pointer",
    zIndex: "1",
  },
  inputUploaderCover: {
    cursor: "pointer",
    display: "inline-block",
    width: "100%",
    padding: "273px 0 0 0",
    height: "16px",
    overflow: "hidden",
    boxSizing: "border-box",
    background:
      "url('/images/orgLogo.svg') center center no-repeat rgba(15, 0, 55, 0.05)",
    borderRadius: "10px",
    border: "1.5px solid rgba(24, 28, 50, 0.13)",
    position: "relative",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    // marginTop: "78px",
    "@media(max-width:650px)": {
      flexDirection: "column",
    },
    "@media(max-width:470px)": {
      paddingTop: "12px",
    },
  },

  buttonsSecond: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "30px",
    "@media(max-width:650px)": {
      flexDirection: "column",
    },
    "@media(max-width:470px)": {
      paddingTop: "12px",
    },
  },
  uploadLogo: {
    width: "100%",
    maxWidth: "171px",
    height: "auto",
    overflow: "hidden",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "@media(max-width:390px)": {
      paddingTop: "12px",
    },
  },

  uploadCover: {
    width: "100%",
    maxWidth: "252.104px",
    height: "auto",
    overflow: "hidden",
    borderRadius: "5px",
    "@media(max-width:959px)": {
      width: "100%",
    },
    "@media(max-width:599px)": {
      marginTop: "10px",
    },
  },
  updateContentBox: {
    "@media(max-width:650px)": {
      width: "100%",
    },
  },

  multilinedInput: {
    marginTop: "0",

    "& .MuiOutlinedInput-multiline": {
      padding: "0px !important",
    },

    "& .MuiOutlinedInput-input::placeholder": {
      color: "rgba(57, 57, 57, 0.30) !important",
      leadingTrim: "both",
      fontFamily: "Inter",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "400 !important",
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      border: "0.687px solid rgba(24, 28, 50, 0.20)",
      background: "rgba(15, 0, 55, 0.05) !important",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "0px !important",
    },
  },

  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    margin: "auto",
  },
  contentContainer: {
    marginTop: "40px",
  },
}));
const AccountsData = [
  {
    email: "abcd@hubspot.com",
    status: "ACTIVE",
  },
  {
    email: "abcd@hubspot.com",
    status: "DEACTIVATED",
  },
  {
    email: "abcd@hubspot.com",
    status: "DEACTIVATED",
  },
  {
    email: "abcd@hubspot.com",
    status: "DEACTIVATED",
  },
];
// React component for managing UI settings including logo, image, and viewer tracking.
const UISettings = () => {
  const classes = useStyles();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  // Function to handle photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedPhoto(base64Image);
    };
    reader.readAsDataURL(file);
  };
  // Function to handle cover upload
  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedCover(base64Image);
    };
    reader.readAsDataURL(file);
  };
  // Function to handle saving changes
  const handleSaveChanges = async (values) => {
    setLoading(false);
    const token = localStorage.getItem("token");

    if (selectedCover) {
      try {
        setLoading(true);

        const response = await axios({
          method: "POST",
          url: ApiConfig.addLogoOrCover,
          headers: {
            token: token,
          },
          data: {
            companyLogo: selectedPhoto,
            companyCover: selectedCover,
            description: values.updateDetails,
          },
        });
        if (response.data.responseCode === 200) {
          const coverId = response.data.result._id;
          console.log(response.data.result, "response");
          user.setCoverData(response.data.result);
          localStorage.setItem("coverId", coverId);
          setLoading(false);
          toast.success(response.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(error, "error");
      }
    } else {
      toast.error("No Image Selected");
    }
  };

  useEffect(() => {
    if (user.coverData) {
      setSelectedPhoto(user.coverData.companyLogo || null);
      setSelectedCover(user.coverData.companyCover || null);
    }
  }, [user.coverData]);
  // For handle photo and cover
  const handleCancel = () => {
    setSelectedPhoto(null);
    setSelectedCover(null);
  };
  // Validation schema using yup
  const validationSchema = yup.object().shape({
    updateDetails: yup
      .string()
      .required("Update details are required")
      .max(2000, "Update details must not exceed 1000 characters"),
  });

  return (
    <Paper className={classes.tabContainer}>
      <Box className={classes.boxModel}>
        <Typography variant="h4">Change logo and image </Typography>
        <Typography variant="body2" style={{ color: "rgba(24, 28, 50, 0.60)" }}>
          Add your company logo and cover image.
        </Typography>
        <Divider />
        <Formik
          initialValues={{ updateDetails: user.coverData?.description || "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSaveChanges(values)}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <Form>
              <div className={classes.mainDiv}>
                <Grid container>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box mb={2}>
                      <Typography variant="body1">
                        Upload Logo & Cover
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ color: "rgba(24, 28, 50, 0.6)" }}
                      >
                        This Logo and image will be displayed in your dashboards
                        authetication
                      </Typography>
                    </Box>

                    <Grid container>
                      <Grid item lg={5} md={5} sm={5} xs={12}>
                        <Box
                          className={classes.uploadLogo}
                          style={{ position: "relative" }}
                        >
                          {selectedPhoto && (
                            <img
                              src={selectedPhoto}
                              className={classes.imagePreview}
                              alt=""
                            />
                          )}
                          {selectedPhoto && (
                            <img
                              src="images/deleteIcon.svg"
                              alt="delete-icon"
                              className={classes.deleteIcon}
                              onClick={() => setSelectedPhoto(null)}
                            />
                          )}
                          {!selectedPhoto && (
                            <>
                              <input
                                type="file"
                                className={classes.inputUploader}
                                accept="image/jpeg, image/png,image/jpg"
                                onChange={handlePhotoUpload}
                              />
                            </>
                          )}
                        </Box>
                      </Grid>
                      <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Box
                          className={classes.uploadCover}
                          style={{ position: "relative" }}
                        >
                          {selectedCover && (
                            <img
                              src={selectedCover}
                              alt="Selected Cover"
                              className={classes.imagePreview}
                            />
                          )}
                          {selectedCover && (
                            <img
                              src="images/deleteIcon.svg"
                              alt="delete-icon"
                              className={classes.deleteIcon}
                              onClick={() => setSelectedCover(null)}
                            />
                          )}
                          {!selectedCover && (
                            <>
                              <input
                                type="file"
                                className={classes.inputUploaderCover}
                                accept="image/jpeg, image/png,image/jpg"
                                onChange={handleCoverUpload}
                              />
                            </>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box mb={2}>
                      <Typography variant="body1">Updates Content</Typography>
                      <Typography
                        variant="body2"
                        style={{ color: "rgba(24, 28, 50, 0.6)" }}
                      >
                        This Logo and image will be displayed in your dashboards
                        authetication
                      </Typography>
                    </Box>
                    <div className={classes.updateContentBox}>
                      <FormControl
                        fullWidth
                        error={touched.updateDetails && !!errors.updateDetails}
                      >
                        <TextField
                          placeholder="Enter the update details"
                          multiline
                          variant="outlined"
                          name="updateDetails"
                          rows={16}
                          value={values.updateDetails}
                          onChange={handleChange}
                          className={classes.multilinedInput}
                        />
                        {touched.updateDetails && errors.updateDetails && (
                          <FormHelperText>
                            {errors.updateDetails}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <div className={classes.buttons} style={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                  >
                    {" "}
                    Cancel{" "}
                  </Button>
                  <Button variant="contained" color="secondary" type="submit">
                    {loading ? <ButtonCircularProgress /> : "Save Changes"}
                  </Button>
                </div>
              </div>
              <Box className={classes.contentContainer}>
                <Typography variant="h4">Viewers tracking settings</Typography>
                <Typography
                  variant="body2"
                  style={{ color: "rgba(24, 28, 50, 0.60)" }}
                >
                  Track your viewers using different ad trackers
                </Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="body1">Facebook Pixel</Typography>
                    <TextField variant="outlined" placeholder="Enter URL" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="body1">Google Ads</Typography>
                    <TextField variant="outlined" placeholder="Enter URL" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="body1">Google Ads</Typography>
                    <TextField variant="outlined" placeholder="Enter URL" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="body1">Google Ads</Typography>
                    <TextField variant="outlined" placeholder="Enter URL" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="body1">Google Ads</Typography>
                    <TextField variant="outlined" placeholder="Enter URL" />
                  </Grid>
                </Grid>
              </Box>
              <Box mt={3}>
                <Typography variant="h4">Viewers tracking settings</Typography>
                <Typography
                  variant="body2"
                  style={{ color: "rgba(24, 28, 50, 0.60)" }}
                >
                  Track your viewers using different ad trackers
                </Typography>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item lg={2} md={2} sm={4} xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      style={{ whiteSpace: "pre" }}
                    >
                      Google Sheet
                    </Button>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ whiteSpace: "pre" }}
                    >
                      HubSpot
                    </Button>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      style={{ whiteSpace: "pre" }}
                    >
                      Salesforce
                    </Button>
                  </Grid>
                </Grid>
                <Box className="accountsBox">
                  <Box className="flexBox" mb={2}>
                    <Typography variant="h4">Connected Accounts</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={
                        <AddIcon
                          className={classes.icon}
                          style={{ borderRadius: "6px" }}
                        />
                      }
                    >
                      Add new
                    </Button>
                  </Box>
                  {AccountsData?.map((item, i) => {
                    return <StepCard classes={classes} item={item} />;
                  })}
                </Box>
                <div className={classes.buttonsSecond}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default UISettings;
const StepCard = ({ classes, item }) => {
  const getStatusColor = () => {
    if (item.status === "DEACTIVATED") {
      return classes.deactivatedStatus;
    } else {
      return classes.accountsStatus;
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" mb={1}>
      <Typography variant="body1" style={{ color: "rgba(24, 28, 50, 0.6)" }}>
        {item.email}
      </Typography>
      <Box className={getStatusColor()}>
        <Typography variant="body2">{item.status}</Typography>
      </Box>
    </Box>
  );
};
