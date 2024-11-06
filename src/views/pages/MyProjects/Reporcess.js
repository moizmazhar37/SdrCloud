import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  InputLabel,
  Grid,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RxCross2 } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CloseIcon from "@material-ui/icons/Close";
import { toast } from "react-toastify";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ApiConfig from "src/config/APIConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  DialogMain: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "700px",
    },
  },
  savecancelbtn: {
    justifyContent: "center",
    padding: "25px 0px 30px",
    "& .canclereprocessbtn": {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    "& .MuiButton-contained": {
      padding: "9px 30px",
      fontSize: "15px",
    },
    "& .MuiButton-containedPrimary": {
      backgroundColor: "var(--blue, #0358AC)",
      color: "white !important",
    },
  },
  CrossIcon: {
    display: "flex",
    justifyContent: "end",
    padding: "5px",
    "& .closeicon": {
      width: "24px",
      height: "24px",
      border: "1px solid #ECECEC",
      background: "#FFFFFF",
      borderRadius: "50%",
      position: "fixed",
      marginTop: "-21px",
      marginRight: "-17px",
      padding: "6px",
      cursor: "pointer",
    },
  },
  DialogTitleFirst: {
    textAlign: "center",
    "& span": {
      color: "#0358AC",
    },
    "& h2": {
      fontSize: "24px",
      fontWeight: 600,
    },
  },
  innerallinfoform: {
    "& .MuiFormControl-marginNormal": {
      marginTop: "1px",
      marginBottom: "16px",
    },
    "& .savebtn": {
      borderRadius: "0px 6px 6px 0px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0px",
    },
    "& .imageuploadbox": {
      "& label": {
        marginTop: "0px",
      },
    },
  },
  error: {
    color: "red !important",
    fontSize: "12px !important",
  },
  mainDialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "721px !important",
      width: "100% !important",
      height: "567px",
      borderRadius: "12px",
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
}));

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  FIRST_NAME: Yup.string()
    .min(3, " First Name must be at least 3 characters.")
    .max(60, " First Name must be at most 60 characters")
    .required(" First Name is required.")
    .test("no-numbers", "Numbers or Space are not allowed .", (value) =>
      /^[^0-9\s]*$/.test(value)
    )
    .test("capital-letter", "First letter should be capital.", (value) =>
      /^[A-Z]/.test(value)
    )
    .test(
      "no-special-characters",
      "Special characters are not allowed.",
      (value) => /^[a-zA-Z\s]*$/.test(value)
    ),

  LAST_NAME: Yup.string()
    .min(3, "Last Name must be at least 3 characters.")
    .max(60, "Last Name must be at most 60 characters")
    .required(" Last Name is required.")
    .test("no-numbers", "Numbers  or Space are not allowed .", (value) =>
      /^[^0-9\s]*$/.test(value)
    )
    .test("capital-letter", "First letter should be capital.", (value) =>
      /^[A-Z]/.test(value)
    )
    .test(
      "no-special-characters",
      "Special characters are not allowed.",
      (value) => /^[a-zA-Z\s]*$/.test(value)
    ),
  EMAIL: Yup.string().email("Invalid email").required("Email is required"),
  FACEBOOK: Yup.string().url("Invalid URL"),
  LINKEDIN: Yup.string().url("Invalid URL"),
  LOGO: Yup.mixed().required("Logo is required"),
  CUSTOMER_ORGANIZATION: Yup.string().required(
    "Customer Organization is required"
  ),
  PHONE_NO: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .required("Phone number is required"),
  COMPANYURL: Yup.string().url("Invalid URL"),
  STATUS: Yup.string().required("Status is required"),
  ERROR_MSG: Yup.string().required("Error Message is required"),
  Maps_URL: Yup.string().url("Invalid URL"),
  TWITTER: Yup.string().url("Invalid URL"),
});

// This component handles the reprocessing of user errors and allows users to upload images.
function Reprocess({
  reprocessopen,
  handleReprocessClose,
  missingFields,
  sheetUrl,
  sheetName,
  CUSTOMER_ID,
  sheetId,
  index,
}) {
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatedType, setUpdatedType] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showimagename, setShowImageName] = useState(null);
  const [adminUserList, setAdminUserList] = useState([]);

  const history = useHistory();
  const classes = useStyles();
  const [data, setdata] = useState({
    FIRST_NAME: "",
    LAST_NAME: "",
    EMAIL: "",
    FACEBOOK: "",
    LINKEDIN: "",
    LOGO: "",
    CUSTOMER_ORGANIZATION: "",
    PHONE_NO: "",
    COMPANYURL: "",
    STATUS: "",
    ERROR_MSG: "",
    Maps_URL: "",
    TWITTER: "",
  });

  const handleCancel = () => {
    console.log("Cancel button clicked");
    handleReprocessClose();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Implement your submit logic here
    console.log("Form Values Submitted: ", values);
    handleReprocessClose();
    setSubmitting(false);
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    console.log(file, "filefile");
    if (file) {
      setFileName(file.name);
      setFieldValue("LOGO", file); // setting the file object in formik field
    }
  };

  const handleCloseDialog = () => {
    // setUpdatedType(null);
    setOpen(false);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setIsImageChanged(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = reader.result;
        setFileName(event.target.result);
        setSelectedFile(event.target.result);
        setShowImageName(file?.name);
        setdata((prevUserData) => ({
          ...prevUserData,
          LOGO: base64Image,
        }));
      };
      reader.readAsDataURL(file);
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

  const handleChangeInput = (e, inputName) => {
    const update = e.target.value;
    setdata((prevData) => ({
      ...prevData,
      [inputName]: update,
    }));
  };

  const errorDataList = async () => {
    setLoading(false);
    const params = {
      page: 0,
      pageSize: 10 || 0,
      sheetId: sheetId,
    };
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.ErrorDataListing,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: params,
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setAdminUserList(res?.data?.data?.failedCustomerData[index]);
        history.push("/view-myproject", {
          state: {
            index: index,
            sheetId: sheetId,
            sheetName: sheetName,
            page: 0,
            pageSize: 10,
          },
        });
        history.go(-1);
      } else if (res?.data?.status === 205) {
        // toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  const PostProjectDetails = async (values) => {
    try {
      const fileMap = {
        IMAGE: selectedFile,
      };
      console.log("Form Values Submitted: ", data);
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.PostProjectDetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          sheetURL: sheetUrl,
          sheetName: sheetName,
          customerId: CUSTOMER_ID,
        },
        data: [
          {
            firstName: data.FIRST_NAME,
            lastName: data.LAST_NAME,
            customerId: CUSTOMER_ID,
            linkedIn: data.LINKEDIN,
            customerOrganization: data.CUSTOMER_ORGANIZATION,
            companyUrl: data.COMPANYURL,
            email: data.EMAIL,
            errorMessage: data.ERROR_MSG,
            facebook: data.FACEBOOK,
            // finalVideoUrl:data.
            // hvo:data.
            map: fileMap,
            mapsUrl: data.Maps_URL,
            phoneNo: data.PHONE_NO,
            twitter: data.TWITTER,
            // userName:data.
            // video:data.
          },
        ],
      });

      if (res.data.status === 200) {
        errorDataList();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleReprocessClose();
    }
  };
  return (
    <>
      <Formik
        initialValues={{ data }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <Dialog
              fullWidth
              maxWidth="sm"
              open={reprocessopen}
              onClose={handleReprocessClose}
              className={classes.DialogMain}
            >
              <Box className={classes.CrossIcon}>
                <RxCross2 className="closeicon" onClick={handleCancel} />
              </Box>
              <DialogTitle className={classes.DialogTitleFirst} variant="h2">
                You are still missing information to create media.
                <br />
                <span>Project Details</span>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  {missingFields.map((field) => (
                    <Grid item xs={12} key={field}>
                      <InputLabel>
                        {field.replace(/_/g, " ").charAt(0).toUpperCase() +
                          field.replace(/_/g, " ").slice(1)}
                      </InputLabel>
                      {field === "LOGO" ? (
                        <Field
                          name="LOGO"
                          as={TextField}
                          fullWidth
                          variant="outlined"
                          placeholder="Upload an image"
                          value={fileName}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button
                                  variant="contained"
                                  onClick={(event) => {
                                    event.preventDefault(); // Prevent default behavior
                                    handleOpenDialog("LOGIN_SCREEN_IMAGE");
                                  }}
                                  style={{
                                    background: "#0358AC",
                                    color: "#fff",
                                    fontSize: "14px",
                                  }}
                                >
                                  Upload
                                  <input
                                    type="file"
                                    accept="image/jpeg, image/png,image/jpg"
                                    style={{ display: "none" }}
                                    onChange={(event) =>
                                      handleFileChange(event, setFieldValue)
                                    }
                                  />
                                </Button>
                              </InputAdornment>
                            ),
                            style: {
                              border: "1px solid #ced4da",
                              borderRadius: "8px",
                            },
                          }}
                        />
                      ) : (
                        <Field
                          name={field}
                          placeholder={`Enter ${
                            field.replace(/_/g, " ").charAt(0).toUpperCase() +
                            field.replace(/_/g, " ").slice(1)
                          }`}
                          as={TextField}
                          fullWidth
                          // onchange={(e)=>handleChangeInput(e,field)}
                          onChange={(e) => {
                            handleChangeInput(e, field);
                            const update = e.target.value;
                            setdata((prevData) => ({
                              ...prevData,
                              [field]: update,
                            }));
                          }}
                          variant="outlined"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "8px",
                          }}
                        />
                      )}
                      <ErrorMessage
                        name={field}
                        component="div"
                        className={classes.error}
                      />
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>

              <DialogActions className={classes.savecancelbtn}>
                <Box fullWidth className="canclereprocessbtn">
                  <Button
                    variant="contained"
                    color="default"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={PostProjectDetails}
                  >
                    Save
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>

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
              style={{ width: "100%", maxHeight: "300px" }}
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
              accept="image/jpeg,image/png,image/jpg"
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
              !isImageChanged ? () => setSelectedFile(null) : handleCloseDialog
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
    </>
  );
}

export default Reprocess;
