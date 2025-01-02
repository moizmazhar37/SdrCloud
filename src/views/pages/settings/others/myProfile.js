import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Form, Formik, ErrorMessage } from "formik";
import * as yep from "yup";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// Custom styles for the Integration component
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    width: "100%",
  },
  boxModel: {
    padding: "60px",
    "@media(max-width:567px)": {
      padding: "20px",
    },
  },
  boxBtn: {
    display: "flex",
    gap: "20px",
    justifyContent: "flex-end",
  },
  mTop: {
    marginTop: "20px",
    alignItems: "center",
  },
  boxUploader: {
    width: "86px",
    height: "86px",
    marginTop: "40px",
    "@media(max-width:599px)": {
      marginTop: "20px",
    },
  },
  inputUploader: {
    cursor: "pointer",
    display: "inline-block",
    width: "100%",
    padding: "92px 0 0 0",
    height: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
    background: "url('/images/orgLogo.svg') center center no-repeat #e4e4e4",
    borderRadius: "10px",
    border: "1.5px solid rgba(24, 28, 50, 0.13)",
    position: "relative",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    justifyContent: "end",
    "@media(max-width:650px)": {
      flexDirection: "column",
    },
    "@media(max-width:470px)": {
      paddingTop: "12px",
    },
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "12px",
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    margin: "auto",
  },
}));

const MyProfile = () => {
  const classes = useStyles();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const history = useHistory();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.profileData) {
      setSelectedPhoto(user.profileData.profilePic || null);
    }
  }, [user.profileData]);
  // Function to convert selected image file to base64 format
  const base64Image = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedPhoto(base64Image);
    };
    reader.readAsDataURL(file);
  };
  // Function to handle photo upload along with form submission
  const handlePhotoUpload = async (values) => {
    const token = localStorage.getItem("token");
    setLoading(false);
    if (selectedPhoto) {
      try {
        setLoading(true);
        const response = await axios({
          method: "PUT",
          url: ApiConfig.editUserProfile,
          headers: {
            token: token,
          },
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            companyName: values.companyName,
            profilePic: selectedPhoto,
            meetingURL: values.meetingURL,
          },
        });
        if (response.data.responseCode === 200) {
          setLoading(false);
          user.setProfileData(response.data.result);
          toast.success(response.data.message);
          history.push("/my-profile");
        } else if (response.data.responseCode === 404) {
          toast.error(response.data.message);
        } else {
          toast.warn(response.data.message);
        }
      } catch (error) {
        toast.warn(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("No Image Selected");
    }
  };

  const isMobileNumberValid = (value) => {
    const regex = /^\d+$/;
    if (!regex.test(value)) {
      return false;
    }
    return true;
  };

  return (
    <Paper className={classes.tabContainer}>
      <Box className={classes.boxModel}>
        {user.profileData ? (
          <Formik
            onSubmit={(values) => handlePhotoUpload(values)}
            initialValues={{
              profilePic: user.profileData.profilePic || "",
              firstName: user.profileData.firstName || "",
              lastName: user.profileData.lastName || "",
              companyName: user.profileData.companyName || "",
              email: user.profileData?.email || "",
              mobileNumber: user.profileData?.mobileNumber || "",
              meetingURL: user.profileData?.meetingURL || "",
            }}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({
              firstName: yep
                .string()
                .required("Please enter first name.")
                .matches(
                  /^[A-Za-z]+$/,
                  "First name must only contain letters."
                ),
              lastName: yep
                .string()
                .required("Please enter last name.")
                .matches(/^[A-Za-z]+$/, "Last name must only contain letters."),
              companyName: yep
                .string()
                .required("Please enter your company name.")
                .matches(
                  /[a-zA-Z][a-zA-Z ]*/,
                  "Company name must only contain letters."
                ),
              email: yep
                .string()
                .required("Please enter email.")
                .matches(
                  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  "Invalid email address."
                ),
              meetingURL: yep
                .string()
                .required("Please enter the url.")
                .matches(
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  "Invalid URL."
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
              handleReset,
            }) => (
              <Form>
                <Box>
                  <Grid container>
                    <Grid item xs={12} md={8} sm={4}>
                      <Box>
                        <Typography variant="h5">Personal Info</Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color: "rgba(57, 57, 57, 0.6)",
                            marginBottom: "5px",
                          }}
                        >
                          Update your photo and personal details here.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={4} sm={8} xs={12}>
                      <Box className={classes.buttons}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleReset}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          {loading ? (
                            <ButtonCircularProgress />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mTop}>
                    <Grid item xs={12} md={4} sm={4}>
                      <Box>
                        <Typography variant="h5">Your Photo</Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color: "rgba(57, 57, 57, 0.6)",
                            width: "100%",
                            maxWidth: "286px",
                          }}
                        >
                          This Photo will be displayed in your profile (Please
                          add a image of 1:1 ratio)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={8} sm={8} xs={12}>
                      <Box className={classes.boxUploader}>
                        <div style={{ position: "relative" }}>
                          {selectedPhoto && (
                            <img
                              src={selectedPhoto}
                              alt=""
                              className={classes.imagePreview}
                            />
                          )}
                          {selectedPhoto && (
                            <IconButton
                              className={classes.deleteIcon}
                              onClick={() => setSelectedPhoto(null)}
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "-7px",
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </div>
                        {!selectedPhoto && (
                          <input
                            type="file"
                            className={classes.inputUploader}
                            accept="image/jpeg, image/png,image/jpg"
                            onChange={base64Image}
                          />
                        )}
                      </Box>
                      {selectedPhoto == null && (
                        <ErrorMessage
                          name="profilePic"
                          component="div"
                          className={classes.error}
                        />
                      )}
                    </Grid>
                  </Grid>

                  <Grid container className={classes.mTop}>
                    <Grid item xs={12} md={4} sm={4}>
                      <Box>
                        <Typography variant="h5">Name</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={8} sm={8} xs={12}>
                      <Box className={classes.boxBtn}>
                        <div style={{ width: "100%" }}>
                          <TextField
                            name="firstName"
                            variant="outlined"
                            placeholder="First name"
                            value={values.firstName}
                            error={Boolean(
                              touched.firstName && errors.firstName
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                          />
                          <div>
                            <FormHelperText
                              error
                              style={{ fontSize: "12px", marginTop: ".3px" }}
                            >
                              {touched.firstName && errors.firstName}
                            </FormHelperText>
                          </div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <div>
                            <TextField
                              name="lastName"
                              placeholder="Last name"
                              variant="outlined"
                              value={values.lastName}
                              error={Boolean(
                                touched.lastName && errors.lastName
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                            />
                          </div>
                          <div>
                            <FormHelperText
                              error
                              style={{ fontSize: "12px", marginTop: ".3px" }}
                            >
                              {touched.lastName && errors.lastName}
                            </FormHelperText>
                          </div>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mTop}>
                    <Grid item xs={12} md={4} sm={4}>
                      <Box>
                        <Typography variant="h5">Company Name</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={8} sm={8} xs={12}>
                      <Box className={classes.boxBtn}>
                        <TextField
                          name="companyName"
                          variant="outlined"
                          placeholder="Your Company Name"
                          value={values.companyName}
                          error={Boolean(
                            touched.companyName && errors.companyName
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Box>
                      <FormHelperText
                        error
                        style={{ fontSize: "12px", marginTop: ".3px" }}
                      >
                        {touched.companyName && errors.companyName}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mTop}>
                    <Grid item xs={12} md={4} sm={4}>
                      <Box>
                        <Typography variant="h5">Email</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={8} sm={8} xs={12}>
                      <Box className={classes.boxBtn}>
                        <TextField
                          name="email"
                          variant="outlined"
                          placeholder="Enter your email address"
                          value={values.email}
                          inputProps={{ maxLength: 256 }}
                          error={Boolean(touched.email && errors.email)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Box>
                      <FormHelperText
                        error
                        style={{ fontSize: "12px", marginTop: ".3px" }}
                      >
                        {touched.email && errors.email}
                      </FormHelperText>
                    </Grid>
                    <Grid container className={classes.mTop}>
                      <Grid item xs={12} md={4} sm={4}>
                        <Box>
                          <Typography variant="h5"> Meeting URL</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Box className={classes.boxBtn}>
                          <TextField
                            name="meetingURL"
                            variant="outlined"
                            placeholder="Enter your meeting URL"
                            value={values.meetingURL}
                            error={Boolean(
                              touched.meetingURL && errors.meetingURL
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Box>
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.meetingURL && errors.meetingURL}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </Paper>
  );
};

export default MyProfile;
