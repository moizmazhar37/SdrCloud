import React, { useState } from "react";
import {
  Drawer,
  Button,
  Box,
  Typography,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Dialog, DialogContent, DialogActions, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  //right sidedrawer styles
  rightDrawer: {
    "& .MuiDrawer-paper": {
      padding: "15px",
      width: "100%",
      maxWidth: "545px",
      overflowY: "auto",

      "@media(max-width:800px)": {
        maxWidth: "300px",
      },
    },
    "& .mainBox": {},
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
    backgroundColor: "rgba(24, 28, 50, 0.10)",
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
  orgLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "1rem",
    margin: "40px 0px 30px",

    "& p": {
      marginTop: "10px",
    },
  },

  subContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "@media(max-width:500px)": {
      padding: "12px",
    },
  },
  inputUploader: {
    cursor: "pointer",
    display: "inline-block",
    width: "33%",
    padding: "67px 0 0 0",
    height: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
    background: "url('/images/orgLogo.svg') center center no-repeat #F1F1F2",
    borderRadius: "3px",
  },
}));
const RightDrawer = ({ drawerOpen, handleDrawerClose }) => {
  const classes = useStyles();
  const [isLoading, setLoader] = useState(false);
  const [isSingleProject, setIsSingleProject] = useState(true);
  const [orgLogo, setOrgLogo] = useState("");
  const [csvfile, setCsvfile] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setOrgLogo(base64Image);
    };
    reader.readAsDataURL(file);
  };
  const handleSingleProjectClick = () => {
    setIsSingleProject(true);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleMultipleProjectClick = () => {
    setIsSingleProject(false);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);

  const hideConfirmationPopup = () => {
    setShowConfirmation(false);
  };

  const handleOrganisation = async (values) => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.addOrganisation,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          organizationName: values.organizationName,
          prospectName: values.prospectName,
          emailAddress: values.emailAddress,
          websiteUrl1: values.websiteUrl1,
          websiteUrl2: values.websiteUrl2,
          websiteUrl3: values.websiteUrl3,
          salesSupport1: values.salesSupport1,
          salesSupport2: values.salesSupport2,
          salesSupport3: values.salesSupport3,
          organizationLogo: orgLogo,
        },
      });
      if (res.data.responseCode === 200) {
        setLoading(false);
        toast.success(res.data.message);
        setTimeout(() => {
          handleDrawerClose();
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    }
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    setCsvfile(file);
  };
  const CSVUplaodHandler = async () => {
    setLoading(false);
    if (csvfile) {
      try {
        setLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.uploadCsv,
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            csvFile: cf,
          },
        });
        if (res.data.responseCode === 200) {
          setLoading(false);
          toast.success(res.data.message);
          setTimeout(() => {
            handleDrawerClose();
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

  const urlRegex =
    "^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]$";

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        className={classes.rightDrawer}
      >
        <Box className="mainBox">
          <Box className={classes.twobtnsContainer}>
            <Button
              variant="contained"
              className={`${classes.singleProjectBtn} ${isSingleProject ? "" : classes.activeButton1
                }`}
              onClick={handleSingleProjectClick}
            >
              Single Project
            </Button>
            <Button
              variant="contained"
              className={`${classes.multipleProjectBtn} ${isSingleProject ? "" : classes.activeButton
                }`}
              onClick={handleMultipleProjectClick}
            >
              Multiple Project
            </Button>
          </Box>

          {isSingleProject ? (
            <>
              <Box className={classes.orgLogoContainer}>
                <Box className={classes.subContainer}>

                  {orgLogo && (
                    <img src={orgLogo} alt="" width="200px" height="50px" />
                  )}
                  {orgLogo && (
                    <IconButton
                      className={classes.deleteIcon}
                      onClick={() => setOrgLogo(null)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {!orgLogo && (
                    <input
                      type="file"
                      className={classes.inputUploader}
                      accept="image/jpeg, image/png,image/jpg"
                      onChange={handlePhotoUpload}
                      width="200px"
                      height="50px"
                    />
                  )}
                </Box>
                <Typography variant="body1">Organization Logo</Typography>
              </Box>
              <Formik
                onSubmit={(values) => handleOrganisation(values)}
                initialValues={{
                  organizationName: "",
                  prospectName: "",
                  emailAddress: "",
                  createdOn: new Date(),
                  websiteUrl1: "",
                  websiteUrl2: "",
                  websiteUrl3: "",
                  salesSupport1: "",
                  salesSupport2: "",
                  salesSupport3: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  organizationName: yep
                    .string()
                    .required("Organization name is required.")
                    .matches(
                      "^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
                      "Please enter your valid organisation name"
                    ),
                  prospectName: yep
                    .string()
                    .required("Prospect name is required.")
                    .matches(
                      "^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
                      "Please enter your valid prospect name"
                    ),
                  emailAddress: yep
                    .string()
                    .required("Email Address is required.")
                    .matches(
                      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                      "Please enter your valid email"
                    ),
                  websiteUrl1: yep
                    .string()
                    .required("Website Url 1 is required.")
                    .matches(urlRegex, "Please enter the valid URL"),
                  websiteUrl2: yep
                    .string()
                    .required("Website Url 2 is required.")
                    .matches(urlRegex, "Please enter the valid URL"),
                  websiteUrl3: yep
                    .string()
                    .required("WebsiteUrl 3 is required.")
                    .matches(urlRegex, "Please enter the valid URL"),
                  salesSupport1: yep
                    .string()
                    .required("Sales Support1 is required.")
                    .matches(
                      "^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
                      "Please enter your valid sales support1 name"
                    ),
                  salesSupport2: yep
                    .string()
                    .required("Sales Support2 is required.")
                    .matches(
                      "^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
                      "Please enter your valid sales support2 name"
                    ),
                  salesSupport3: yep
                    .string()
                    .required("Sales Support3 is required.")
                    .matches(
                      "^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$",
                      "Please enter your valid sales support3 name"
                    ),
                })}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <Form>
                    <Box className={classes.textfieldsContainer}>
                      <Typography variant="body1">Organization Name</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.organizationName}
                          name="organizationName"
                          error={Boolean(
                            touched.organizationName && errors.organizationName
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.organizationName && errors.organizationName}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Prospect Name</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.prospectName}
                          name="prospectName"
                          error={Boolean(
                            touched.prospectName && errors.prospectName
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.prospectName && errors.prospectName}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Email Address</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.emailAddress}
                          name="emailAddress"
                          error={Boolean(
                            touched.emailAddress && errors.emailAddress
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.emailAddress && errors.emailAddress}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Website URL-1</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.websiteUrl1}
                          name="websiteUrl1"
                          error={Boolean(
                            touched.websiteUrl1 && errors.websiteUrl1
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.websiteUrl1 && errors.websiteUrl1}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Website URL-2</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.websiteUrl2}
                          name="websiteUrl2"
                          error={Boolean(
                            touched.websiteUrl2 && errors.websiteUrl2
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.websiteUrl2 && errors.websiteUrl2}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Website URL-3</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.websiteUrl3}
                          name="websiteUrl3"
                          error={Boolean(
                            touched.websiteUrl3 && errors.websiteUrl3
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.websiteUrl3 && errors.websiteUrl3}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Sales Support 1</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.salesSupport1}
                          name="salesSupport1"
                          error={Boolean(
                            touched.salesSupport1 && errors.salesSupport1
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.salesSupport1 && errors.salesSupport1}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Sales Support 2</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.salesSupport2}
                          name="salesSupport2"
                          error={Boolean(
                            touched.salesSupport2 && errors.salesSupport2
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.salesSupport2 && errors.salesSupport2}
                        </FormHelperText>
                      </Box>

                      <Typography variant="body1">Sales Support 3</Typography>
                      <Box mb={2}>
                        <TextField
                          variant="outlined"
                          value={values.salesSupport3}
                          name="salesSupport3"
                          error={Boolean(
                            touched.salesSupport3 && errors.salesSupport3
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ fontSize: "12px", marginTop: ".3px" }}
                        >
                          {touched.salesSupport3 && errors.salesSupport3}
                        </FormHelperText>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        mt={2}
                        mb={2}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                        >
                          {loading ? (
                            <ButtonCircularProgress />
                          ) : (
                            "Save Details"
                          )}
                        </Button>
                        {showConfirmation && (
                          <Dialog
                            maxWidth="xs"
                            fullWidth
                            open={showConfirmation}
                            TransitionComponent={Transition}
                            onClose={() => setShowConfirmation(false)}
                            keepMounted
                          >
                            <DialogContent>
                              <Box align="center">
                                <Typography variant="h3">
                                  Are you sure you want to save the changes?
                                </Typography>
                              </Box>
                            </DialogContent>
                            <DialogActions
                              style={{
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Box mt={2}>
                                <Button variant="contained" color="primary">
                                  {isLoading === false ? (
                                    "Confirm"
                                  ) : (
                                    <ButtonCircularProgress />
                                  )}
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  style={{ marginLeft: "5px" }}
                                  onClick={hideConfirmationPopup}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </DialogActions>
                          </Dialog>
                        )}
                      </Box>
                    </Box>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <Box mt={5}>
              <Typography variant="body1">Upload CSV</Typography>
              <Box mb={2}>
                <TextField
                  variant="outlined"
                  value={csvfile ? csvfile.name : ""}
                  InputProps={{
                    readOnly: true,
                    style: {
                      cursor: "pointer",
                      color: "transparent",
                      textShadow: "0 0 0 black",
                    },
                  }}
                  onClick={() => document.getElementById("csv-upload").click()}
                />
              </Box>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                style={{ display: "none" }}
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mt={2}
                mb={3}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={CSVUplaodHandler}
                >
                  {loading ? <ButtonCircularProgress /> : "Save Details"}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default RightDrawer;
