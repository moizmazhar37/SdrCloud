import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Breadcrumbs,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "@material-ui/core/Link";
import { BsWindowSidebar } from "react-icons/bs";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
const validatePhoneNumber = (value, country) => {
  // Parse the phone number, adding "+" if missing
  const phoneNumber = parsePhoneNumberFromString(
    value.startsWith("+") ? value : `+${value}`,
    country
  );

  // If phoneNumber is null or invalid, return false
  if (!phoneNumber || !phoneNumber.isValid()) {
    return false;
  }

  return true;
};
const useStyles = makeStyles((theme) => ({
  innerbox: {
    border: "1px solid #E7E7E7",
    padding: "8px 20px 16px 20px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .profileBox": {
      justifyContent: "start",
    },
    "& .MuiTypography-body1": {
      color: "#858585",
      fontWeight: 500,
    },
    "& .country-list": {
      background: "#FFF !important",

      "& .country.highlight": {
        background: "rgb(139 137 137 / 35%) !important",
      },
    },
    "& .react-tel-input .country-list": {
      maxHeight: "145px",
    },
    "& .error": {
      color: "#f44336 !important",
      marginTop: "3px",
      fontWeight: 500,
    },
  },
  textfieldRed: {
    color: "red !important", // Force red text for 'Delete'
  },
  textfieldGreen: {
    color: "green !important", // Force green text for other statuses
  },
  textfiledallbefore: {
    "& .MuiInputBase-input": {
      fontSize: "14px",
      fontWeight: 500,
      color: "#152F40",
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
    gap: "16px",
    justifyContent: "flex-end",
    "& .btnCan": {
      color: "#152F40",
      backgroundColor: "#F4F4F4",
      width: "100%",
      maxWidth: "100px",
      height: "40px",
      fontSize: "14px",
      borderRadius: "6px",
    },
    "& .btnSave": {
      color: "white !important",
      backgroundColor: "var(--blue, #0358AC)",
      width: "100%",
      maxWidth: "100px",
      height: "40px",
      fontSize: "14px",
      borderRadius: "6px",
    },
  },
  headingBox: {
    background: "#FCFCFC",
    padding: "10px 10px 10px 20px",
    borderRadius: "10px 10px 0px 0px",
    color: "#858585",
    border: "1px solid #ECECEC",
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
}));

// Validation schema for form fields
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(
      "Admin Name is required and must be between 2 and 100 characters, containing only alphabetic, alphanumeric or special characters."
    )
    .matches(
      /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{2,100}$/,
      {
        message:
          "Admin Name is required and must be between 2 and 100 characters, containing only alphabetic, alphanumeric or special characters.",
      }
    ),
  phoneNumber: Yup.string()
    .required(
      "A valid Admin Phone number is required, including the country code."
    )
    .test(
      "is-valid-phone",
      "A valid phone number is required, including the country code.",
      function (value) {
        const { country } = this.parent;
        return validatePhoneNumber(value, country);
      }
    ),
});

function ViewUser() {
  const [country, setCountry] = useState("us");
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const allData = location?.state;
  const [loading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [change, setChange] = useState(true);
  const [isFormValid, setFormValid] = useState(false);
  const [ppadminDetails, setPPadminDetails] = useState("");
  console.log("ppadminDetails", ppadminDetails);
  const [originalUserData, setOriginalUserData] = useState({});
  console.log("originalUserData: ", originalUserData);
  const [viewUserData, setViewUserData] = useState({
    userId: allData?.ppuserlist?.userId ? allData?.ppuserlist?.userId : "",
    fullName: allData?.ppuserlist?.name ? allData?.ppuserlist?.name : "",
    email: allData?.ppuserlist?.email ? allData?.ppuserlist?.email : "",
    phoneNumber: allData?.ppuserlist?.phoneNo
      ? allData?.ppuserlist?.phoneNo
      : "",
    country: country,
    DateCreated: allData?.ppuserlist?.createdDate
      ? allData?.ppuserlist?.createdDate
      : "",
    Status: allData?.ppuserlist?.userStatus
      ? allData?.ppuserlist?.userStatus.charAt(0).toUpperCase() +
        allData?.ppuserlist?.userStatus.slice(1).toLowerCase()
      : "",
  });
  console.log(viewUserData, "dadsad");

  useEffect(() => {
    setViewUserData({
      userId: allData?.ppuserlist?.userId ? allData?.ppuserlist?.userId : "",
      fullName: allData?.ppuserlist?.name ? allData?.ppuserlist?.name : "",
      email: allData?.ppuserlist?.email ? allData?.ppuserlist?.email : "",
      phoneNumber: allData?.ppuserlist?.phoneNo
        ? allData?.ppuserlist?.phoneNo
        : "",
      DateCreated: allData?.ppuserlist?.createdDate
        ? allData?.ppuserlist?.createdDate
        : "",
      Status: allData?.ppuserlist?.userStatus
        ? allData?.ppuserlist?.userStatus.charAt(0).toUpperCase() +
          allData?.ppuserlist?.userStatus.slice(1).toLowerCase()
        : "",
    });
  }, [isEditing]);

  const handleEditClick = () => {
    setEditing(true);
    setOriginalUserData(viewUserData);
  };
  const handleCancelClick = (resetForm, event) => {
    console.log("handleCancelClick:  si trgiirign on first click");
    event.preventDefault();
    setEditing(false);
    resetForm({ values: originalUserData });
  };
  const getPPDetails = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getppadmindetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          accountId: allData?.ppuserlist?.userId,
        },
      });
      if (res?.status === 200) {
        const data = res.data.data;
        setPPadminDetails(data);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = async (values) => {
    console.log("values", values);
    setEditing(false);
    try {
      setLoading(true);

      const res = await axios({
        method: "PUT",
        url: ApiConfig.editImages,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          updatedType: "PERSONAPRO",
        },
        data: values,
      });

      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        history.goBack();
        setLoading(false);
      } else if (res?.data?.status === 205) {
        toast.error(res?.data?.message);
        history.goBack();
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
        history.goBack();
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.data?.message);
      setLoading(false);
      history.goBack();
    }
  };

  const displayNames = {
    fullName: "Admin Name",
    email: "Email",
    phoneNumber: "Phone",
    DateCreated: "Created Date & Time",
    Status: "Status",
  };

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string" || string.length === 0) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChangeEdit = (key, value) => {
    // Block space entry for the fullName input field
    if (key === "fullName") {
      value = value.replace(
        /[^a-zA-Z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|~]/g,
        ""
      );
      // Ensure maximum 2 consecutive spaces
      // value = value.replace(/ {3,}/g, "  ");
    } else if (key === "phoneNumber") {
      // Ensure only numeric characters
      value = value.replace(/\D/g, "");
      value = value.slice(0, 20);
    }

    // Update the user data state
    setViewUserData((prevUserData) => ({
      ...prevUserData,
      [key]: value,
    }));
  };
  useEffect(() => {
    // getPPDetails();
  }, []);
  useEffect(() => {
    // Check if any required fields are empty
    const isValid = Object.values(viewUserData).every((value) => value !== "");
    setFormValid(isValid);
  }, [viewUserData]);

  return (
    <>
      <Box className={classes.breads}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/PP-user-management" color="inherit">
            User Managment&nbsp;
          </Link>
          <Typography className="breadCrumbText">
            {allData?.viewss ? "View" : "Edit"} PersoaPro Admin Details
          </Typography>
        </Breadcrumbs>
      </Box>
      <Formik
        initialValues={viewUserData}
        validationSchema={validationSchema}
        onSubmit={handleSaveClick}
        enableReinitialize
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          resetForm,
          values,
          setFieldValue,
          isValid,
          dirty,
        }) => (
          <Form>
            <Grid container spacing={1} style={{ paddingTop: "20px" }}>
              <Grid item md={7} sm={7} xs={12} lg={6}>
                <Box className={classes.headingBox}>
                  <Box className="d-flex" style={{ justifyContent: "start" }}>
                    <Typography variant="h5">Details</Typography>

                    {allData?.viewss ?? (
                      <Button
                        color="primary"
                        style={{ color: "#0358AC", fontWeight: 400 }}
                        disabled={isSubmitting}
                        onClick={handleEditClick}
                      >
                        Edit
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box className={classes.innerbox}>
                  {Object.keys(viewUserData).map(
                    (key) =>
                      key !== "userId" && (
                        <Box key={key} pt={1} className="d-flex">
                          <Grid container spacing={3} style={{ gap: "24px" }}>
                            <Grid
                              item
                              lg={4}
                              md={4}
                              sm={6}
                              xs={12}
                              className="profileBox d-flex"
                            >
                              <Typography variant="body1">
                                {capitalizeFirstLetter(displayNames[key])}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              lg={7}
                              md={7}
                              sm={6}
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
                                {key === "phoneNumber" ? (
                                  <Box style={{ width: "100%" }}>
                                    <PhoneInput
                                      country={country.toLowerCase()}
                                      value={values[key]}
                                      onChange={(value, countryData) => {
                                        const formattedPhone = value.startsWith(
                                          "+"
                                        )
                                          ? value
                                          : `+${value}`;

                                        setFieldValue(key, formattedPhone);
                                        setCountry(
                                          countryData.countryCode.toUpperCase()
                                        );
                                      }}
                                      disabled={!isEditing}
                                      inputStyle={{
                                        border: isEditing
                                          ? "1px solid #808080"
                                          : "none",
                                        width: "-webkit-fill-available",
                                        borderRadius: "4px",
                                        padding: "10px 45px",
                                        fontSize: "14px",
                                        color: "#000",
                                        fontWeight: 400,
                                      }}
                                      onBlur={() => {
                                        handleBlur({ target: { name: key } });
                                      }}
                                      inputClass={
                                        isEditing
                                          ? classes.textfiledall
                                          : classes.textfiledallbefore
                                      }
                                      inputProps={{
                                        name: key,
                                        required: true,
                                        autoFocus: false,
                                      }}
                                    />
                                    {touched[key] && errors[key] && (
                                      <Typography
                                        style={{ color: "#f44336" }}
                                        variant="body2"
                                        className="error"
                                      >
                                        {errors[key]}
                                      </Typography>
                                    )}
                                  </Box>
                                ) : (
                                  <Field name={key}>
                                    {({ field }) => (
                                      <TextField
                                        {...field}
                                        className={
                                          isEditing &&
                                          key !== "email" &&
                                          key !== "DateCreated" &&
                                          key !== "Status"
                                            ? classes.textfiledall
                                            : classes.textfiledallbefore
                                        }
                                        name={key}
                                        placeholder={`Enter Your ${
                                          key === "fullName"
                                            ? "Full Name"
                                            : key === "phoneNumber"
                                            ? "Phone Number"
                                            : capitalizeFirstLetter(key)
                                        }`}
                                        value={
                                          key === "DateCreated"
                                            ? new Date(
                                                viewUserData[key]
                                              ).toLocaleString()
                                            : key === "Status" &&
                                              values[key] === "Delete"
                                            ? "Inactive"
                                            : values[key]
                                        }
                                        disabled={
                                          !isEditing ||
                                          key === "email" ||
                                          key === "DateCreated" ||
                                          key === "Status"
                                        }
                                        onChange={(e) => {
                                          handleChange(e);
                                          if (
                                            (key !== "phone" &&
                                              e.target.value.length <= 101) ||
                                            key === "phone"
                                          ) {
                                            handleChangeEdit(
                                              key,
                                              e.target.value
                                            );
                                          }
                                        }}
                                        onBlur={handleBlur}
                                        error={
                                          touched[key] && Boolean(errors[key])
                                        } // Check if the field has been touched and has an error
                                        helperText={
                                          touched[key] ? errors[key] : ""
                                        } // Display the error message if the field has been touched
                                        InputProps={{
                                          classes: {
                                            notchedOutline: isEditing
                                              ? ""
                                              : classes.noBorder,
                                            input:
                                              key === "Status" &&
                                              values[key] === "Delete"
                                                ? classes.textfieldRed // Apply red color class for 'Delete'
                                                : key === "Status"
                                                ? classes.textfieldGreen // Apply green color class for other statuses
                                                : undefined,
                                          },
                                          onKeyPress: (event) => {
                                            const charCode = event.which
                                              ? event.which
                                              : event.keyCode;

                                            if (key === "phoneNumber") {
                                              if (
                                                !(
                                                  charCode >= 48 &&
                                                  charCode <= 57
                                                ) &&
                                                charCode !== 43
                                              ) {
                                                event.preventDefault();
                                              }
                                            } else if (key === "fullName") {
                                              if (
                                                !(
                                                  (
                                                    (charCode >= 65 &&
                                                      charCode <= 90) || // A-Z
                                                    (charCode >= 97 &&
                                                      charCode <= 122) || // a-z
                                                    (charCode >= 48 &&
                                                      charCode <= 57) || // 0-9
                                                    charCode === 32 || // Space
                                                    [
                                                      33, 34, 35, 36, 37, 38,
                                                      39, 40, 41, 42, 43, 45,
                                                      46, 47, 58, 59, 60, 61,
                                                      62, 63, 64, 91, 92, 93,
                                                      94, 95, 96, 123, 124, 125,
                                                      126,
                                                    ].includes(charCode)
                                                  ) // Special characters: !@#$%^&*()_+-=[]{};:',<>.?/|`~
                                                )
                                              ) {
                                                event.preventDefault();
                                              }
                                            }
                                          },

                                          inputProps: {
                                            maxLength:
                                              key === "phoneNumber" ? 20 : 100,
                                            style: {
                                              "&::placeholder": {
                                                color: "#767676",
                                              },
                                            },
                                            style: {
                                              color:
                                                key === "Status" &&
                                                values[key] === "Delete"
                                                  ? "red !important"
                                                  : "green !important",
                                            },
                                          },
                                        }}
                                        {...(isEditing &&
                                          key === "phone" && {
                                            type: "number",
                                          })}
                                      />
                                    )}
                                  </Field>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      )
                  )}

                  {isEditing && (
                    <Box pt={2} className={classes.btnCanSaveContainer}>
                      <Button
                        className="btnCan"
                        onClick={(e) => handleCancelClick(resetForm, e)} // P
                      >
                        Cancel
                      </Button>
                      <Button
                        className="btnSave"
                        type="submit"
                        disabled={isSubmitting || !isFormValid}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ViewUser;
