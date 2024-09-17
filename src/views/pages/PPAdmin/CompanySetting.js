import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import CloseIcon from "@material-ui/icons/Close";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import FullScreenLoader from "src/component/FullScreenLoader";
import CropEasyProfile from "../CreateVideo/Crop/CropEasyProfile";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  innerbox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #E7E7E7",
    padding: "8px 24px 16px 24px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .profileBox": {
      justifyContent: "start",
    },
    "& .MuiTypography-body1": {
      color: "grey",
      fontWeight: 500,
      width: "100%",
      maxWidth: "120px",
      display: "flex",
      alignItems: "center",
    },
    "& .uploadImage": {
      cursor: "pointer",
    },

    "& .MuiInputBase-input": {
      color: "#152F40 !important",
      fontWeight: 500,
      fontSize: "14px",
    },
  },
  innerCompanyBoxEdit: {
    gap: "0px",
    border: "1px solid #E7E7E7",
    padding: "0px 24px 10px 24px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    display: "flex",
    flexDirection: "column",
  },
  innerCompanyBox: {
    border: "1px solid #E7E7E7",
    padding: "8px 24px 16px 24px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    display: "flex",
    flexDirection: "column",
    gap: ({ isEditing }) => (isEditing ? "0px" : "16px"),
    "& .profileBox": {
      justifyContent: "start",
    },
    "& .MuiTypography-body1": {
      color: "grey",
      fontWeight: 500,
      width: "100%",
      // maxWidth: "156px",
      display: "flex",
      alignItems: "center",
    },
    "& .uploadImage": {
      cursor: "pointer",
    },
  },
  mainDialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "637px !important",
      width: "100% !important",
      height: "537px",
      borderRadius: "12px",
    },
  },
  dialogHeading: {
    marginTop: "-15px",
    padding: "0px 44px 24px 44px",
    color: "#152F40",
    fontSize: "18px",
    fontWeight: 500,
    "& .btnCancel": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      borderRadius: "8px",
    },
    "& .btnSave": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      borderRadius: "8px",
    },
  },
  btnConatainer: {
    display: "flex",
    gap: "16px",
    // padding: "24px 44px 32px 44px",
    padding: "35px 44px 32px 44px",
    "& .btnCancel": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      width: "100%",
      maxWidth: "266.5px",
      height: "48px",
      borderRadius: "8px",
    },
    "& .btnSave": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      width: "100%",
      maxWidth: "266.5px",
      height: "48px",
      borderRadius: "8px",
    },
  },
  dialogBtnBox: {
    padding: "130px 123px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px dashed #CACACA",
    borderRadius: "10px",
    borderSpacing: "10px",
    margin: "-11px 44px",
    "& .dialogTypo": {
      color: "#858585",
      fontSize: "14px",
      width: "100%",
      maxWidth: "273px",
    },
    "& .btnUpload": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      height: "40px",
      width: "80px",
      marginTop: "17px",
    },
  },
  headingBox: {
    background: "#F4F4F4",
    padding: "10px 10px 10px 20px",
    borderRadius: "10px 10px 0px 0px",
    color: "#152F40",
    "& .EditButton": {
      color: "color: var(--blue, #0358AC)",
    },
    "& .MuiTypography-h5": {
      fontSize: "14px",
    },
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
  inputPlaceholder: {
    color: "red",
  },
  placeholder: {
    color: "green",
  },
  CrossIcon: {
    display: "flex",
    justifyContent: "end",
    // padding: "5px",
    "& .closeicon": {
      width: "24px",
      height: "24px",
      border: "1px solid #ECECEC",
      background: "#FFFFFF",
      borderRadius: "50%",
      position: "fixed",
      marginTop: "-19px",
      marginRight: "-13px",
      padding: "6px",
      cursor: "pointer",
    },
  },
  editableTextField: {
    border: "0.5px solid black",
    "& .MuiInputBase-input": {
      paddingLeft: "5px",
    },
  },
  companyNameField: {
    "& .MuiOutlinedInput-input": {
      padding: "10px !important",
    },
  },
}));
// Validation schema for form fields

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .required(
      "Company Name is required and must be between 2 and 100 characters, containing only alphabetic, alphanumeric or special characters."
    )

    .matches(
      /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{2,100}$/,

      "Company Name is required and must be between 2 and 100 characters, containing only alphabetic, alphanumeric or special characters."
    ),
  companyURL: Yup.string()
    .required("A valid URL is required (e.g., https://www.example.com).")
    .matches(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      "A valid URL is required (e.g., https://www.example.com)."
    ),
});

const CompanySetting = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isEditing, setEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatedType, setUpdatedType] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showimagename, setShowImageName] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  // Fetches company data from the server and updates the state with the retrieved data
  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getcompanydetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setUserData(res?.data?.data);
        setCompanyName(res?.data?.data?.companyName);
        setCompanyURL(res?.data?.data?.companyUrl);
      } else if (res?.data?.status === 205) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.data?.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setIsImageChanged(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedFile(event.target.result);
        setShowImageName(file?.name);
        // setOpenCrop(true);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleEditImage = async () => {
    try {
      setLoading(true);
      let requestData = {};

      if (updatedType === "COMPANY_DETAILS") {
        // Check if company details are updated
        if (
          companyName !== userData.companyName ||
          companyURL !== userData.companyUrl
        ) {
          requestData = {
            companyId: userData.companyId,
            companyName: companyName,
            companyUrl: companyURL,
          };
        } else {
          setOpen(false); // Close the dialog if no changes are made
          setLoading(false);
          return; // Exit the function without making API call
        }
      } else if (
        updatedType === "ACCOUNT_LOGO" ||
        updatedType === "LOGIN_SCREEN_IMAGE"
      ) {
        // Check if an image is selected
        if (selectedFile) {
          requestData = {
            companyId: userData.companyId,
            map: {
              IMAGE: selectedFile,
            },
          };
        } else {
          setOpen(false); // Close the dialog if no image is selected
          setLoading(false);
          return; // Exit the function without making API call
        }
      }

      const res = await axios({
        method: "PUT",
        url: ApiConfig.editImages,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          updatedType: updatedType,
        },
        data: requestData,
      });

      if (res?.data?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        setOpen(false);
        setEditing(false);
        fetchCompanyData();
        setIsImageChanged(false);
        // window.location.reload();
      } else if (res?.data?.status === 205) {
        setLoading(false);
        toast.error(res?.data?.message);
        setOpen(false);
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleOpenDialog = (type) => {
    setUpdatedType(type);
    setOpen(true);
    // Set selected file based on the type of image being edited
    if (type === "LOGIN_SCREEN_IMAGE") {
      setSelectedFile(userData.loginImage);
      {
        console.log("userData", userData);
      }
    } else if (type === "ACCOUNT_LOGO") {
      setSelectedFile(userData.accountLogo);
    }
  };

  const handleCloseDialog = () => {
    // setUpdatedType(null);
    setIsImageChanged(false);
    setOpen(false);
  };

  const handleButtonClick = (type) => {
    // Handles the button click event, triggers editing or submitting the form
    setUpdatedType(type);
    if (isEditing) {
      handleEditImage();
    } else {
      setEditing(true);
    }
  };
  const truncateText = (text, maxLength = 50) => {
    return text?.length > maxLength
      ? `${text.slice(0, 20)}...${text.slice(-20)}`
      : text;
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <Box className={classes.breads}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/pp-settings">
            Settings&nbsp;
          </Link>
          <Typography className="breadCrumbText">Company</Typography>
        </Breadcrumbs>
      </Box>
      <Formik
        initialValues={{
          companyName: companyName || "",
          companyURL: companyURL || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, errors, touched, isValid }) => (
          <Form>
            <Grid container spacing={4} style={{ paddingTop: "32px" }}>
              <Grid item md={6} sm={12} xs={12} lg={6}>
                <Grid container spacing={4}>
                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Box className={classes.headingBox}>
                      <Box
                        className="d-flex"
                        style={{ justifyContent: "start" }}
                      >
                        <Typography variant="h5">Login Screen Image</Typography>
                        <Button
                          color="primary"
                          style={{ color: "#0358AC", fontWeight: 400 }}
                          disabled={isSubmitting}
                          // onClick={handleOpenDialog}
                          onClick={() => handleOpenDialog("LOGIN_SCREEN_IMAGE")}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Box>

                    <Box className={classes.innerbox}>
                      <Typography className="uploadImage">
                        {" "}
                        Upload Image :
                      </Typography>
                      <TextField
                        value={userData.loginImage ? userData.loginImage : ""}
                        type="text"
                        fullWidth
                        disabled
                        InputProps={{
                          disableUnderline: true,
                          style: { color: "red" },
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Box className={classes.headingBox}>
                      <Box
                        className="d-flex"
                        style={{ justifyContent: "start" }}
                      >
                        <Typography variant="h5">Account Logo</Typography>
                        <Button
                          color="primary"
                          style={{ color: "#0358AC", fontWeight: 400 }}
                          disabled={isSubmitting}
                          onClick={() => {
                            handleOpenDialog("ACCOUNT_LOGO");
                            setSelectedFile(userData.accountLogo);
                          }}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Box>
                    <Box className={classes.innerbox}>
                      <Typography className="uploadImage">
                        {" "}
                        Upload Logo :
                      </Typography>
                      <TextField
                        value={userData.accountLogo ? userData.accountLogo : ""}
                        type="text"
                        fullWidth
                        disabled
                        InputProps={{ disableUnderline: true }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={6} sm={12} xs={12} lg={6}>
                <Box className={classes.headingBox}>
                  <Box className="d-flex" style={{ justifyContent: "start" }}>
                    <Typography variant="h5">Company Details</Typography>
                    <Button
                      color="primary"
                      style={{ color: "#0358AC", fontWeight: 400 }}
                      onClick={() => {
                        handleButtonClick("COMPANY_DETAILS");
                      }}
                      disabled={!isValid || isSubmitting}
                    >
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </Box>
                </Box>
                <Box
                  className={
                    isEditing
                      ? classes.innerCompanyBoxEdit
                      : classes.innerCompanyBox
                  }
                >
                  <Box style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography style={{ width: "200px" }}>
                      {" "}
                      Company Name :
                    </Typography>
                    {isEditing ? (
                      <Field name="companyName">
                        {({ field, form }) => (
                          <TextField
                            {...field}
                            className={classes.companyNameField}
                            fullWidth
                            margin="normal"
                            value={values?.companyName}
                            variant="outlined"
                            placeholder="Enter Company Name"
                            error={
                              form.touched.companyName &&
                              Boolean(form.errors.companyName)
                            }
                            helperText={
                              form.touched.companyName &&
                              form.errors.companyName
                                ? form.errors.companyName
                                : ""
                            }
                            onChange={(e) => {
                              form.setFieldValue("companyName", e.target.value);
                              form.setFieldTouched("companyName", true);
                              setCompanyName(e.target.value);
                            }}
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        )}
                      </Field>
                    ) : (
                      <Typography
                        style={{
                          color: "#152F40",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        {companyName ? companyName : ""}
                      </Typography>
                    )}
                  </Box>
                  <Box style={{ display: "flex", alignItems: "baseline" }}>
                    <Typography style={{ width: "200px" }}>
                      {" "}
                      Company URL :
                    </Typography>
                    {isEditing ? (
                      <Field name="companyURL">
                        {({ field, form }) => (
                          <TextField
                            {...field}
                            className={classes.companyNameField}
                            value={values?.companyURL}
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Company URL"
                            error={
                              form.touched.companyURL &&
                              Boolean(form.errors.companyURL)
                            }
                            helperText={
                              form.touched.companyURL && form.errors.companyURL
                                ? form.errors.companyURL
                                : ""
                            }
                            onChange={(e) => {
                              const url = e.target.value;

                              // Simple URL validation using URL constructor
                              let isValidURL = false;
                              try {
                                new URL(url);
                                isValidURL = true;
                              } catch (_) {
                                isValidURL = false;
                              }

                              if (isValidURL) {
                                setCompanyURL(url);
                              }

                              form.setFieldValue("companyURL", url);
                              form.setFieldTouched("companyURL", true);
                            }}
                          />
                        )}
                      </Field>
                    ) : (
                      <Typography
                        style={{
                          color: "#152F40",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        {companyURL ? truncateText(companyURL) : ""}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {openCrop ? (
        <Dialog open={open} className={classes.mainDialog}>
          <IconButton onClick={handleCloseDialog}>
            {/* <CloseIcon className="closeicon" /> */}
          </IconButton>

          <Typography variant="body1" className={classes.dialogHeading}>
            Profile Image
          </Typography>
          <CropEasyProfile
            photoURL={selectedFile}
            type={false} // Adjust as needed
            setOpenCrop={setOpenCrop}
            setPhotoURL={setPhotoURL}
            setUploadedImage={setSelectedFile}
            setErrors={() => {}}
          />
        </Dialog>
      ) : (
        <Dialog open={open} className={classes.mainDialog}>
          <Box className={classes.CrossIcon}>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon className="closeicon" />
            </IconButton>
          </Box>
          <Typography variant="body1" className={classes.dialogHeading}>
            {updatedType === "LOGIN_SCREEN_IMAGE"
              ? "Login Screen Image"
              : "Account Logo"}
          </Typography>
          {selectedFile ? (
            <Box style={{ minHeight: "300px", margin: "0 44px" }}>
              <img
                src={selectedFile}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  aspectRatio: "1.9",
                  objectFit: "contain",
                }}
              />
            </Box>
          ) : (
            <Box className={classes.dialogBtnBox}>
              <Typography variant="body1" className="dialogTypo">
                Click to add image from your device Or drag and drop your image
                here
              </Typography>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="upload-input"
              />
              <label htmlFor="upload-input">
                <Button component="span" className="btnUpload">
                  Upload
                </Button>
              </label>
            </Box>
          )}
          <Box className={classes.btnConatainer}>
            <Button onClick={handleCloseDialog} className="btnCancel">
              Cancel
            </Button>
            <Button
              onClick={
                !isImageChanged ? () => setSelectedFile(null) : handleEditImage
              }
              className="btnSave"
            >
              {loading === false ? (
                !isImageChanged ? (
                  "Change Image"
                ) : (
                  "Save"
                )
              ) : (
                <ButtonCircularProgress />
              )}
            </Button>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default CompanySetting;
