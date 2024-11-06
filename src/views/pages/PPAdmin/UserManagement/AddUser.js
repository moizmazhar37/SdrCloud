import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString, isValidNumber } from "libphonenumber-js";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  savecancelbtn: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "16px",
    paddingTop: "0px",
    [theme.breakpoints.down("xs")]: {
      display: "block !important",
    },
    "& .MuiButton-contained": {
      padding: "9px 30px",
      fontSize: "15px",
      width: "100%",
      height: "48px",
    },
    "& .MuiButton-containedPrimary": {
      backgroundColor: "var(--blue, #0358AC)",
      color: "white !important",
      [theme.breakpoints.down("xs")]: {
        marginTop: "20px",
      },
    },
    "& .savebtn": {
      borderRadius: "6px 6px 6px 6px",
      background: " #0358AC",
      color: "white",

      width: "100%",
    },
    "& .savebtnDisables": {
      borderRadius: "6px 6px 6px 6px",
      background: "#F4F4F4",
      color: "black",
      height: "48px",
      padding: "9px 30px",
      width: "100%",
    },
  },
  DialogTitleFirst: {
    padding: "0px",
    color: "#152F40",
    "& h2": {
      fontSize: "18px",
      fontWeight: 500,
      padding: "16px 0 8px 0",
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
      marginTop: "-45px",
      marginRight: "-63px",
      padding: "6px",
      cursor: "pointer",
    },
  },
  adminHeading: {
    color: "#152F40",
    "& span": {
      color: "#0358AC",
    },
  },
  fieldLabelHeading: {
    color: "#152F40",
    paddingTop: "8px",
  },
  DialogBox: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "547px",
    },
    "& .MuiDialog-paper": {
      overflowY: "hidden",
      padding: "24px 44px",
      borderRadius: "12px",
    },
  },
  DialogContentBox: {
    // overflowY: "scroll",
    // marginRight: "10px",

    marginBottom: "10px",
    padding: "10px 0px 10px 0px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#0358AC",
      borderRadius: "4px",
    },
    "& .country-list": {
      background: "#FFF !important",
      maxHeight: "196px !important",
      "& .country.highlight": {
        background: "rgb(139 137 137 / 35%) !important",
      },
    },
    "& .react-tel-input.country-list": {
      maxHeight: "196px !important",
    },
    "& .error": {
      color: "#f44336 !important",
      marginTop: "3px",
      fontWeight: 500,
    },
  },
  eyescloseicons: {
    "& .MuiIconButton-label": {
      width: "24px",
      color: "#858585 !important",
    },
  },
}));
// Validation schema for form fields

function AddUser({ adduser, handleAddUserClose, PPUsers }) {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(
        "Admin first name is required and must be between 2 and 50 characters, containing only alphabetic or alphanumeric characters."
      )
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9]{2,50}$/,
        "Admin first name is required and must be between 2 and 50 characters, containing only alphabetic or alphanumeric characters."
      ),
    lastName: Yup.string()
      .required(
        "Admin last name is required and must be between 2 and 50 characters, containing only alphabetic or alphanumeric characters."
      )

      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 ]{2,50}$/,
        "Admin last name is required and must be between 2 and 50 characters, containing only alphabetic or alphanumeric characters."
      ),
    email: Yup.string()
      .required("A valid email address is required (e.g., user@example.com).")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
        "A valid email address is required (e.g., user@example.com)."
      )
      .transform((value) => value.toLowerCase()),
    phoneNo: Yup.string()
      .required(
        "A valid admin phone number is required, including the country code."
      )
      .test(
        "is-valid-phone",
        "A valid admin phone number is required, including the country code.",
        function (value) {
          if (typeof value !== "string") return false;
          const phoneNumber = parsePhoneNumberFromString(
            value,
            selectedCountry
          );
          return phoneNumber ? phoneNumber.isValid() : false;
        }
      ),
    password: Yup.string()
      .required(
        "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
      )
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\s\S])[A-Za-z\d\s\S]{8,16}$/,
        "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
      ),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
  };

  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  // Resets the form using Formik and closes the add user modal
  const handleCancel = () => {
    formik.resetForm();
    handleAddUserClose();
  };

  // Manages form state and validation using Formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    context: { country: selectedCountry },
  });

  useEffect(() => {
    formik.resetForm(); // Reset form when component mounts or updates
  }, [adduser]);
  // Handles the creation of a PP admin by making an API call

  const handlecreatePPAdmin = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.createPPAdmin,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: formik.values,
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        await PPUsers();
        handleAddUserClose();
        formik.resetForm();
        // window.location.reload();
      } else if (res?.data?.status === 205) {
        setLoading(false);
        toast.error(res?.data?.message);
        handleAddUserClose();
      } else {
        setLoading(false);
        toast.success(res?.data?.message);
        handleAddUserClose();
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.message);
      setLoading(false);
      handleAddUserClose();
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={adduser}
        onClose={false}
        className={classes.DialogBox}
        BackdropProps={{
          style: { backdropFilter: "blur(4px)" },
        }}
        PaperProps={{
          style: {
            maxHeight: "82vh",
            overflowY: "none",
            scrollbarColor: "gray", // Change scrollbar color
            scrollbarWidth: "thin",
          },
        }}
      >
        <Box className={classes.CrossIcon}>
          <RxCross2 className="closeicon" onClick={handleCancel} />
        </Box>
        <Typography variant="body1" className={classes.adminHeading}>
          Account Admin / <span>Create New SDRCloud.ai Admin</span>
        </Typography>
        <DialogTitle className={classes.DialogTitleFirst} variant="h4">
          Create New SDRCloud.ai Employee Admin
        </DialogTitle>
        <DialogContent className={classes.DialogContentBox}>
          <form onSubmit={formik.handleSubmit}>
            {Object.keys(initialValues).map((field) => (
              <>
                <Typography
                  className={classes.fieldLabelHeading}
                  variant="body1"
                >
                  {getFieldLabel(field)}
                </Typography>
                {field === "phoneNo" ? (
                  <Box>
                    <PhoneInput
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneNo && Boolean(formik.errors.phoneNo)
                      }
                      helperText={
                        formik.touched.phoneNo && formik.errors.phoneNo
                      }
                      value={formik.values.phoneNo}
                      onChange={(phone) => {
                        const formattedPhone = phone.startsWith("+")
                          ? phone
                          : `+${phone}`;
                        formik.setFieldValue("phoneNo", formattedPhone);
                      }}
                      defaultCountry="US"
                      country={selectedCountry.toLowerCase()}
                      inputStyle={{
                        width: "100%",
                        height: "45px",
                        marginTop: "0px",
                        fontWeight: "normal",
                        border: "1px solid #e7e7e7",
                      }}
                      containerStyle={{ marginTop: "5px" }}
                      placeholder="Enter your phone number"
                      inputProps={{
                        name: "phoneNo",
                        required: true,
                        autoFocus: false,
                      }}
                    />
                    {formik.touched.phoneNo && formik.errors.phoneNo && (
                      <Typography
                        style={{ color: "#f44336" }}
                        variant="body2"
                        className="error"
                      >
                        {formik.errors.phoneNo}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <TextField
                    style={{ marginTop: "5px" }}
                    key={field}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name={field}
                    // type={(field === 'password' && !formik.values.showPassword) ? 'password' : (field === 'phoneNo' && !formik.values.phoneNo) ? 'phoneNo' : 'number'}
                    type={
                      field === "password" && !formik.values.showPassword
                        ? "password"
                        : "text"
                    }
                    // type={showPassword ? 'text' : 'password'}
                    value={formik.values[field]}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === "email") {
                        formik.setFieldValue(name, value.toLowerCase());
                      }
                      // Allow only alphabetic characters for first name and last name fields
                      else if (name === "firstName" || name === "lastName") {
                        let filteredValue =
                          name === "lastName"
                            ? value
                            : value.replace(/\s/g, "");
                        filteredValue =
                          filteredValue.charAt(0).toUpperCase() +
                          filteredValue.slice(1).toLowerCase(); // Capitalize first letter, lowercase the rest
                        formik.setFieldValue(name, value);
                      } else if (name === "phoneNo") {
                        const filteredValue = value.replace(/\D/g, ""); // Replace non-numeric characters
                        formik.setFieldValue(name, filteredValue);
                      } else {
                        formik.handleChange(e);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field] && Boolean(formik.errors[field])
                    }
                    helperText={formik.touched[field] && formik.errors[field]}
                    placeholder={`${getFieldPlaceholder(field)}`}
                    inputProps={{
                      maxLength:
                        field === "phoneNo"
                          ? 20
                          : field === "password"
                          ? 17
                          : field === "email"
                          ? 255
                          : field === "firstName"
                          ? 51
                          : field === "lastName"
                          ? 51
                          : undefined,

                      onKeyDown: (e) => {
                        const isAlphanumeric = /^[A-Za-z0-9]+$/.test(e.key);
                        const isSpace = e.key === " ";

                        if (field === "firstName" && !isAlphanumeric) {
                          e.preventDefault();
                        } else if (
                          field === "lastName" &&
                          !(isAlphanumeric || isSpace)
                        ) {
                          e.preventDefault();
                        } else if (
                          (field === "email" || field === "password") &&
                          isSpace
                        ) {
                          e.preventDefault();
                        }
                      },
                    }}
                    InputProps={
                      field === "password"
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  className={classes.eyescloseicons}
                                  edge="end"
                                  aria-label="toggle password visibility"
                                  onClick={() =>
                                    formik.setFieldValue(
                                      "showPassword",
                                      !formik.values.showPassword
                                    )
                                  }
                                >
                                  {formik.values.showPassword ? (
                                    <VscEye />
                                  ) : (
                                    <VscEyeClosed />
                                  )}

                                  {/* {showPassword ? <VscEye /> : <VscEyeClosed />} */}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        : undefined
                    }
                  />
                )}
              </>
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Box fullWidth pt={1.5} className={classes.savecancelbtn}>
            <Button variant="contained" color="default" onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              // variant="contained"
              // color="primary"
              onClick={handlecreatePPAdmin}
              disabled={!formik.dirty || !formik.isValid || loading}
              className={
                formik.dirty && formik.isValid && !loading
                  ? "savebtn"
                  : "savebtnDisables"
              }
            >
              {loading === false ? (
                "Create & Send Invite"
              ) : (
                <ButtonCircularProgress />
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
const getFieldLabel = (field) => {
  switch (field) {
    case "firstName":
      return "Admin First Name";
    case "lastName":
      return "Admin Last Name";
    case "email":
      return "Admin Email";
    case "phoneNo":
      return "Admin Phone";
    case "password":
      return "Admin Password";
  }
};
const getFieldPlaceholder = (field) => {
  switch (field) {
    case "firstName":
      return "Enter SDRCloud.ai Admin First Name ";
    case "lastName":
      return "Enter SDRCloud.ai Admin Last Name ";
    case "email":
      return "Enter SDRCloud.ai Admin Email ";
    case "phoneNo":
      return "+1 (___) __ __ ___";
    case "password":
      return "Enter Your Password";
  }
};

export default AddUser;
