import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import * as Yup from "yup";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import FullScreenLoader from "src/component/FullScreenLoader";
import CropEasyProfile from "../CreateVideo/Crop/CropEasyProfile";
// Styles for the component
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
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  maingrid: {
    "& .country-list": {
      background: "#FFF !important",
      "& .country.highlight": {
        background: "rgb(139 137 137 / 35%) !important",
      },
    },
  },
  innerbox: {
    border: "1px solid #E7E7E7",
    padding: "8px 24px 10px 24px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .profileBox": {
      justifyContent: "start",
      marginTop: "10px",
      alignItems: "start",
    },
    "& .MuiTypography-body1": {
      color: "grey",
      fontWeight: 500,
    },
    "& .MuiGrid-container ": {
      gap: "10px",
    },
    "& .error": {
      color: "#f44336 !important",
      marginTop: "3px",
      fontWeight: 500,
    },
    "& .react-tel-input .country-list": {
      maxHeight: "130px",
    },
  },
  headingBox: {
    background: "#F4F4F4",
    padding: "6px 10px 6px 20px",
    borderRadius: "10px 10px 0px 0px",
    color: "#152F40",
    "& .EditButton": {
      color: "color: var(--blue, #0358AC)",
    },
    "& .MuiTypography-h5": {
      fontSize: "14px",
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
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
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
      fontWeight: 500,
      color: "#152F40 !important",
    },
  },
  textfiledall: {
    "& .MuiInputBase-root": {
      border: "0.5px solid gray",
    },
    "& .MuiInputBase-input": {
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
  btnCanSaveContainer: {
    display: "flex",
    gap: "22px",
    justifyContent: "flex-end",

    [theme.breakpoints.up("md")]: {
      width: "84%",
    },
    "& .btnCan": {
      color: "#152F40",
      backgroundColor: "#F4F4F4",
      width: "100%",
      maxWidth: "100px",
      height: "40px",
      fontSize: "14px",
      borderRadius: "6px",
      padding: "10px 12px 10px 12px",
    },
    "& .btnSave": {
      color: "white !important",
      backgroundColor: "var(--blue, #0358AC)",
      width: "100%",
      maxWidth: "100px",
      height: "40px",
      fontSize: "14px",

      borderRadius: "6px",
      padding: "10px 12px 10px 12px",
    },
  },
  changepassbtn: {
    marginTop: "5px",
    color: "var(--blue, #0358AC)",
    width: "100%",
    fontSize: "14px",
    whiteSpace: "nowrap",
    paddingLeft: "0px",
    justifyContent: "start",
  },
  uploadButton: {
    marginLeft: theme.spacing(2),
    fontSize: "16px",
    backgroundColor: "var(--blue, #0358AC)",
    borderRadius: "0px",
    color: "#fff",
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
}));

// Validation schema for form fields

const validatePhoneNumber = (value, country) => {
  const phoneNumber = parsePhoneNumberFromString(value, country);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return false;
  }
  return true;
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(
      "First name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
    )
    .matches(
      /^(?! )[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{1,49}[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~ ]$/,
      "First name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
    ),
  lastName: Yup.string()
    .required(
      "Last name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
    )

    .matches(
      /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{2,50}$/,
      "Last name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
    ),
  phone: Yup.string()
    .required("A valid phone number is required.")
    .test(
      "is-valid-phone",
      "A valid phone number is required, including the country code.",
      function (value) {
        console.log("value:: in the eidtprofile  ", value);
        const { country } = this.parent;
        console.log("country:: in the eidtprofile  ", country);
        return validatePhoneNumber(value, country);
      }
    ),
});

const EditProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isEditing, setEditing] = useState(false);
  const [change, setChange] = useState(true);
  const [settingRoute, setSettingRoute] = useState("Edit My Profile");
  const { setProfileData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("selectedFile: ", selectedFile);
  const [country, setCountry] = useState("us");
  console.log("country: ", country);
  const [open, setOpen] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showImageName, setShowImageName] = useState(null);
  const [profile, setProfile] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  console.log("photoURL: ", photoURL);
  const [openCrop, setOpenCrop] = useState(false);

  const [userData, setUserData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  });
  useEffect(() => {
    GetCompanyDetails();
  }, []);

  const formik = useFormik({
    initialValues: userData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await handleSaveClick(values);
    },
  });
  const GetCompanyDetails = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.profile,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        // toast.success(res?.data?.message);
        const profileData = res?.data?.data;
        setProfile(profileData);
        setUserData({
          profilePicture: profileData?.profilePicture || "",
          firstName: profileData?.firstName || "",
          lastName: profileData?.lastName || "",
          email: profileData?.email || "",
          phone: profileData?.phoneNo || "",
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      setLoading(false);
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    formik.resetForm();
    setEditing(false);
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   setIsImageChanged(true);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const base64Image = reader.result;
  //       formik.setFieldValue("profilePicture", base64Image);
  //       setSelectedFile(base64Image);
  //       setShowImageName(file?.name);
  //       setOpenCrop(true);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setShowImageName(file?.name);
      formik.setFieldValue("profilePicture", file);
      setIsImageChanged(true);
      setOpenCrop(true);
    }
  };
  const handleOpenDialog = () => {
    setOpen(true);
    setSelectedFile(userData?.profilePicture);
  };

  const handleCloseDialog = () => {
    setIsImageChanged(false);
    setOpen(false);
  };

  const updateProfilePic = async (values) => {
    setLoading(true)

    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.updateProfilePic,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          profilePicture: photoURL
        },

      });
      if (res?.data?.status === 200) {
        console.log(res?.data, "uih");
        toast.success("Image uploaded successfully.");

        handleCloseDialog();
        GetCompanyDetails()
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: res?.data?.data,

        }));
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSaveClick = async (values) => {
    setLoading(true);
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.updateProfile,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          ...values,
          ...(photoURL && { profilePicture: photoURL }),
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        GetCompanyDetails();
        setEditing(false);
        setLoading(false);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: res?.data?.data?.profilePicture,
          firstName: res?.data?.data?.firstName,
          lastName: res?.data?.data?.lastName,
        }));
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, "Error insdie the Edir compnay Profile");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <Box className={classes.breads}>
        <ArrowBackIcon
          style={{ color: "black", cursor: "pointer", fontSize: "large" }}
          onClick={() => {
            history.push("/pp-settings");
          }}
        />
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/pp-settings">
            Settings
          </Link>
          <Typography className="breadCrumbText">{settingRoute}</Typography>
        </Breadcrumbs>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} style={{ paddingTop: "20px" }}>
          <Grid item md={8} sm={8} xs={12} lg={5}>
            <Box className={classes.headingBox}>
              <Box className="d-flex" style={{ justifyContent: "start" }}>
                <Typography variant="h5">Personal Details</Typography>
                <Button
                  color="primary"
                  style={{ color: "#0358AC", fontWeight: 400 }}
                  disabled={formik.isSubmitting}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </Box>
            </Box>
            <Box className={classes.innerbox}>
              {Object.keys(userData).map((key) => (
                <Box key={key} py={1} className="d-flex">
                  <Grid container className={classes.maingrid}>
                    <Grid
                      item
                      lg={3}
                      md={3}
                      sm={4}
                      xs={12}
                      className="profileBox d-flex"
                    >
                      <Typography mt={1} variant="body1">
                        {key === "profilePicture"
                          ? "Profile Picture"
                          : key === "firstName"
                            ? "First Name"
                            : key === "lastName"
                              ? "Last Name"
                              : key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={7}
                      md={7}
                      sm={8}
                      xs={12}
                      style={{ display: "flex" }}
                    >
                      <Box
                        className="d-flex"
                        style={{
                          justifyContent: "start",
                          width: "100%",
                          paddingTop: "5px",
                        }}
                      >
                        {key === "profilePicture" && isEditing ? (
                          <>
                            <TextField
                              className={
                                isEditing
                                  ? classes.textfiledall2
                                  : classes.textfiledallbefore
                              }
                              name={key}
                              disabled={!isEditing || key === "profilePicture"}
                              value={
                                userData?.profilePicture
                              }
                              InputProps={{
                                classes: {
                                  notchedOutline: isEditing
                                    ? ""
                                    : classes.noBorder,
                                },
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <Button
                                      variant="contained"
                                      component="label"
                                      className={classes.uploadButton}
                                      onClick={handleOpenDialog}
                                    >
                                      Upload
                                    </Button>
                                  </InputAdornment>
                                ),
                              }}
                              type="text"
                            />
                          </>
                        ) : key === "phone" ? (
                          <Box style={{ width: "100%" }}>
                            <PhoneInput
                              value={
                                isEditing ? formik.values[key] : userData[key]
                              }
                              country={country}
                              onChange={(value, countryData) => {
                                const formattedPhone = value.startsWith("+")
                                  ? value
                                  : `+${value}`;
                                console.log("formattedPhone: ", formattedPhone);
                                formik.setFieldValue(key, formattedPhone);
                                setCountry(
                                  countryData.countryCode.toUpperCase()
                                );
                              }}
                              inputStyle={{
                                width: "100%",
                                height: "35px",
                                marginTop: "0px",
                                fontWeight: "normal",
                                border: isEditing ? "0.5px solid gray" : "none",
                                color: "#000000",
                                fontWeight: 400,
                              }}
                              onBlur={() => {
                                if (isEditing) {
                                  formik.handleBlur({ target: { name: key } });
                                }
                              }}
                              inputProps={{
                                name: key,
                                required: true,
                                autoFocus: false,
                              }}
                              disabled={!isEditing} // Disable when not in editing mode
                            />

                            {formik.touched[key] &&
                              formik.errors[key] &&
                              isEditing && (
                                <Typography
                                  style={{ color: "#f44336" }}
                                  variant="body2"
                                  className="error"
                                >
                                  {formik.errors[key]}
                                </Typography>
                              )}
                          </Box>
                        ) : isEditing ? (
                          <TextField
                            className={
                              isEditing && key !== "email" && key !== "password"
                                ? classes.textfiledall
                                : classes.textfiledallbefore
                            }
                            name={key}
                            placeholder={`${key === "profilePicture"
                              ? "Upload Your"
                              : "Enter Your"
                              } ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            value={
                              key === "firstName" || key === "lastName"
                                ? formik.values[key].charAt(0).toUpperCase() +
                                formik.values[key].slice(1)
                                : formik.values[key]
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched[key] && Boolean(formik.errors[key])
                            } // Error handling
                            helperText={
                              formik.touched[key] && formik.errors[key]
                            }
                            disabled={
                              !isEditing ||
                              key === "email" ||
                              key === "password"
                            }
                            inputProps={{
                              maxLength:
                                key === "phone"
                                  ? 20
                                  : key === "firstName"
                                    ? 50
                                    : key === "lastName"
                                      ? 50
                                      : undefined,
                              onKeyDown: (e) => {
                                const isAlphanumericOrSpecial =
                                  /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/.test(
                                    e.key
                                  );

                                if (
                                  key === "firstName" &&
                                  !isAlphanumericOrSpecial
                                ) {
                                  e.preventDefault();
                                } else if (
                                  key === "lastName" &&
                                  !isAlphanumericOrSpecial &&
                                  e.key !== " "
                                ) {
                                  e.preventDefault();
                                } else if (
                                  key === "phone" &&
                                  !/^[0-9]+$/.test(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              },
                            }}
                          />
                        ) : (
                          <Typography
                            variant="body1"
                            style={{ color: "#000000d4" }}
                          >
                            {userData[key].length > 40
                              ? `${userData[key].slice(0, 15)}...${userData[
                                key
                              ].slice(-15)}`
                              : userData[key]}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              {isEditing && (
                <Box pt={2} className={classes.btnCanSaveContainer}>
                  {console.log(formik.dirty, "kkkk")}
                  <Button className="btnCan" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <Button
                    className="btnSave"
                    onClick={handleSaveClick}
                    type="submit"
                    disabled={
                      !formik.isValid || !formik.dirty || formik.isSubmitting
                    }
                  >
                    Save
                  </Button>
                </Box>
              )}
              <Button
                color="primary"
                className={classes.changepassbtn}
                onClick={() => {
                  history.push("/change-your-password");
                }}
              >
                Change Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      {openCrop ? (
        <Dialog open={open} className={classes.mainDialog}>
          <IconButton onClick={handleCloseDialog}>
            {/* <CloseIcon className="closeicon" /> */}
          </IconButton>

          <Typography variant="body1" className={classes.dialogHeading}>
            Profile Image
          </Typography>
          <CropEasyProfile
            photoURL={photoURL}
            type={false} // Adjust as needed
            setOpenCrop={setOpenCrop}
            setPhotoURL={setPhotoURL}
            setUploadedImage={setSelectedFile}
            setErrors={() => { }}
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
            Profile Image
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
                Click to add image from your device.
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
              onClick={() => {
                if (isImageChanged) {
                  updateProfilePic()
                } else {
                  setSelectedFile(null);
                }
              }}
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

export default EditProfile;
