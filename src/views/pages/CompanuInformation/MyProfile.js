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
import { Formik, Form, Field, useFormikContext } from "formik";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import * as Yup from "yup";
import { UserContext } from "src/context/User";
import { useHistory, Link as RouterLink } from "react-router-dom";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useFormik } from "formik";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import FullScreenLoader from "src/component/FullScreenLoader";
import CropEasyProfile from "../CreateVideo/Crop/CropEasyProfile";
import { parsePhoneNumberFromString } from "libphonenumber-js";
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
    padding: "8px 24px 16px 24px",
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
    marginTop: "14px",
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
      height: "520px",
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
    padding: "113px 113px",
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

const EditProfile = () => {
  const [country, setCountry] = useState("us");
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
        "First Name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
      )
      .matches(
        /^(?! )[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{1,49}[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~ ]$/,
        "First Name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
      ),
    lastName: Yup.string()
      .required(
        "Last Name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
      )
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{2,50}$/,
        "Last Name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
      ),

    adminPhoneNo: Yup.string()
      .required("A valid Phone number is required, including the country code.")
      .test(
        "is-valid-phone",
        "A valid Phone number is required, including the country code.",
        function (value) {
          console.log("value:: in the eidtprofile  ", value);
          const { country } = this.parent;
          console.log("country:: in the eidtprofile  ", country);
          return validatePhoneNumber(value, country);
        }
      ),
  });
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

  const [open, setOpen] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showImageName, setShowImageName] = useState(null);
  const [profile, setProfile] = useState("");
  const [accountId, setAccountId] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  console.log("photoURL: ", photoURL);
  const [openCrop, setOpenCrop] = useState(false);

  const [userData, setUserData] = useState({
    adminProfileImage: "",
    firstName: "",
    lastName: "",
    adminEmail: "",
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
        url: ApiConfig.companyDetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setAccountId(res?.data?.data?.accountDetails.accountId);
        const profileData = res?.data?.data;
        setProfile(profileData);
        setUserData({
          adminProfileImage: profileData?.adminProfileImage || "",
          firstName: profileData?.adminFirstName || "",
          lastName: profileData?.adminLastName || "",
          adminEmail: profileData?.adminEmail || "",
          adminPhoneNo: profileData?.adminPhone || "",
        });
        setLoading(false);
      }
    } catch (error) {
      // toast.error("Something went wrong")
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
  //       formik.setFieldValue("adminProfileImage", base64Image); // Update Formik value
  //       setSelectedFile(base64Image); // Preview image
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
      setIsImageChanged(true);
      setOpenCrop(true);
    }
  };
  const handleOpenDialog = () => {
    setOpen(true);
    setSelectedFile(userData?.adminProfileImage);
  };

  const handleCloseDialog = () => {
    setIsImageChanged(false);
    setOpen(false);
  };

  const handleSaveClick = async (values) => {
    setLoading(true);
    let update_Account_Id = accountId;
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.EditcompanyDetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          ...values,
          ...(photoURL && { adminProfileImage: photoURL }),
        },
        params: {
          accountId: update_Account_Id,
          changeType: "ACCOUNT_ADMIN",
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        GetCompanyDetails();
        setEditing(false);
        GetCompanyDetails();
        setEditing(false);
        setLoading(false);
        setProfileData((prevData) => ({
          ...prevData,
          adminProfileImage: res?.data?.data?.imageurl,
          firstName: res?.data?.data?.firstName,
          lastName: res?.data?.data?.lastName,
        }));
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
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
            history.push("/settings");
          }}
        />
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/settings">
            Settings
          </Link>
          <Typography className="breadCrumbText">{settingRoute}</Typography>
        </Breadcrumbs>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} style={{ paddingTop: "32px" }}>
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
                        {key === "adminProfileImage"
                          ? "Profile Picture"
                          : key === "firstName"
                          ? "First Name"
                          : key === "lastName"
                          ? "Last Name"
                          : key === "adminEmail"
                          ? "Email"
                          : key === "adminPhoneNo"
                          ? "Phone No."
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
                        }}
                      >
                        {key === "adminProfileImage" && isEditing ? (
                          <>
                            <TextField
                              className={
                                isEditing
                                  ? classes.textfiledall2
                                  : classes.textfiledallbefore
                              }
                              name={key}
                              disabled={
                                !isEditing || key === "adminProfileImage"
                              }
                              value={formik.values[key]}
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
                        ) : key === "adminPhoneNo" ? (
                          isEditing ? (
                            <Box style={{ width: "100%" }}>
                              <PhoneInput
                                value={formik.values[key]}
                                onChange={(value, countryData) => {
                                  const formattedPhone = value.startsWith("+")
                                    ? value
                                    : `+${value}`;
                                  formik.setFieldValue(key, formattedPhone);
                                  setCountry(
                                    countryData.countryCode.toUpperCase()
                                  );
                                }}
                                inputStyle={{
                                  width: "100%",
                                  height: "35px",
                                  marginTop: "0px",
                                  color: "#000",
                                  fontWeight: 400,
                                  border: "0.5px solid gray",
                                }}
                                onBlur={() => {
                                  formik.handleBlur({ target: { name: key } });
                                }}
                                country={country}
                                inputProps={{
                                  name: key,
                                  required: true,
                                  autoFocus: false,
                                }}
                                disabled={!isEditing}
                              />

                              {formik.touched[key] && formik.errors[key] && (
                                <Typography
                                  style={{ color: "#f44336" }}
                                  variant="body2"
                                  className="error"
                                >
                                  {formik.errors[key]}
                                </Typography>
                              )}
                            </Box>
                          ) : (
                            <PhoneInput
                              value={formik.values[key]}
                              fullWidth
                              inputStyle={{
                                width: "100%",
                                height: "35px",
                                marginTop: "0px",
                                fontWeight: "normal",
                                border: "none",
                                color: "#000",
                                fontWeight: 400,
                                backgroundColor: "#ffffff",
                              }}
                              disabled={!isEditing}
                              country={"us"}
                              inputProps={{
                                name: key,
                                required: false,
                                autoFocus: false,
                              }}
                            />
                          )
                        ) : (
                          <TextField
                            className={
                              isEditing &&
                              key !== "adminEmail" &&
                              key !== "password"
                                ? classes.textfiledall
                                : classes.textfiledallbefore
                            }
                            name={key}
                            placeholder={`Enter Your ${
                              key.charAt(0).toUpperCase() + key.slice(1)
                            }`}
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
                              key === "adminEmail" ||
                              key === "password"
                            }
                            inputProps={{
                              maxLength:
                                key === "adminPhoneNo"
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
                                  key === "adminPhoneNo" &&
                                  !/^[0-9]+$/.test(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              },
                            }}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              {isEditing && (
                <Box pt={2} className={classes.btnCanSaveContainer}>
                  <Button className="btnCan" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <Button
                    className="btnSave"
                    onClick={handleSaveClick}
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
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
            type={false}
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
                  toast.success("Image uploaded successfully.");
                  handleCloseDialog();
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
