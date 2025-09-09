import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormHelperText,
  makeStyles,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  editCompanySettingsContainer: {
    "& .breads": {
      "& nav li": {
        margin: "0px",
      },
    },
    "& .headText": {
      color: "var(--blue, #0358AC)",
      margin: "0px 5px",
    },
    "& .nav a ": {
      color: "#152F40",
    },
    "& .gridContainer": {
      marginTop: "32px",
      gap: "90px",
      "& .MuiGrid-item": {
        width: "100%",
        maxWidth: "584px",
      },

      "& .commonHeadingBox": {
        padding: "12px 24px",
        backgroundColor: "#ECECEC",
        color: "#152F40",
        borderRadius: "8px 8px 0px 0px",
        "& .MuiTypography-body1": {
          fontWeight: 500,
        },
        "& .EditButton": {
          color: "var(--blue, #0358AC)",
          fontSize: "14px",
        },
      },
      "& .commonHeadingBoxes": {
        padding: "12px 24px",
        backgroundColor: "#ECECEC",
        color: "#152F40",
        borderRadius: "8px 8px 0px 0px",
        display: "flex",
        justifyContent: "space-between",
        "& .MuiTypography-body1": {
          fontWeight: 500,
        },
        "& .EditButton": {
          color: "var(--blue, #0358AC)",
          fontSize: "14px",
        },
        "& .viewBtn": {
          color: "var(--blue, #0358AC)",
          fontSize: "14px",
        },
      },

      "& .commomInnerBox": {
        padding: "8px 24px",
        "& .MuiInputBase-input.Mui-disabled": {
          color: "#152F40 !important",
          fontSize: "12px !important",
          fontWeight: 500,
        },
        "& .buttonTextfield": {
          "& button": {
            background: "var(--blue, #0358AC)",
          },
          "& .MuiOutlinedInput-input": {
            textAlign: "center",
            color: "#152F40 !important",
            fontSize: "14px",
            fontWeight: 400,
          },
        },

        "& .editableTextField": {
          border: "1px solid grey",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "14px !important",
          color: "#152F40 !important",
          fontWeight: "500 !important",
        },
        "& .staticText": {
          fontSize: "14px !important",
          color: "#152F40 !important",
          fontWeight: "500 !important",
        },
        "& .MuiOutlinedInput-adornedEnd": {
          padding: "0px",
        },
        "& .MuiButton-containedPrimary": {
          backgroundColor: "var(--blue, #0358AC)",
          color: "white !important",
        },
        "& .MuiTypography-body1": {
          color: "var(--grey, #858585)",
          fontSize: "13px !important",
          fontWeight: 500,
        },
        "& h6": {
          color: "var(--black, #152F40)",
          fontSize: "14px",
          fontWeight: 500,
        },
        "& .react-tel-input .form-control": {
          color: "#152F40",
          borderRadius: "10px",
          height: "50px",
          background: "#fff",
          border: "0px solid #1C1C1C",
          fontSize: "13px",
        },
        "& .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus":
          {
            backgroundColor: "transparent !important",
          },
        "& .react-tel-input .selected-flag": {
          backgroundColor: "#fff",
          padding: "0px",
          "&:hover": {
            backgroundColor: "none",
          },
        },
        "& .react-tel-input .selected-flag .arrow": {
          left: "20px",
        },
        "& .react-tel-input .flag-dropdown ": {
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "5px 0 0 5px",
        },
        "& .react-tel-input .flag-dropdown.open .selected-flag": {
          background: "#fff",
        },
        "& .react-tel-input .country-list": {
          margin: "10px 0 10px -6px",
        },
        "& .react-tel-input .country-list .country": {
          padding: "7px 9px",
          textAlign: "left",
          backgroundColor: "#fff",
          color: "black",
          "&:hover": {
            background: "#fff",
          },
        },
        "& .react-tel-input .country-list .country.highlight": {
          backgroundColor: "#fff !important",
        },
        "& .country-list": {
          background: "#FFF !important",
          "& .country.highlight": {
            background: "rgb(139 137 137 / 35%) !important",
          },
        },
      },

      "& .commonBorder": {
        borderRadius: "8px",
        border: "1px solid #F4F4F4",
      },

      "& .topMargin": {
        marginTop: "32px",
      },

      "& .commonTopMargin": {
        marginTop: "16px",
      },

      "& .btnContainer": {
        marginTop: "16px",
        "& button": {
          width: "100%",
          maxWidth: "90px",
          height: "40px",
          backgroundColor: "#0358AC",
          borderRadius: "8px",
          color: "#FFF",
        },
      },

      "& .companyLogo": {
        "& .uploadLogo": {
          "& .MuiOutlinedInput-adornedEnd": {
            paddingRight: "0px",
          },

          "& button": {
            borderRadius: "0 5px 5px 0",
            backgroundColor: "#0358AC",
          },
        },
      },
    },
  },
}));

// Function component for EditCompanySettings
const EditCompanySettings = ({ settingRoute, handleClick }) => {
  const classes = useStyles();
  const [isEditing1, setEditing1] = useState(false);
  const [isEditing2, setEditing2] = useState(false);
  const [isEditing3, setEditing3] = useState(false);
  const [isEditing4, setEditing4] = useState(false);
  const [isEditing5, setEditing5] = useState(false);
  const [isEditing6, setEditing6] = useState(false);
  const [agreementUrl, setAgreementUrl] = useState("");
  const [accountContract, setAccountContract] = useState(null);

  const [data, setData] = useState({
    AccountName: "Hubsopt",
    AccountPhone: "(937) 313-4466",
    PersonaProAdmin: "Jacob Marti",

    AdminFirstName: "Janet",
    AdminLastName: "Stevens",
    AccountAdminEmail: "JanetS@Hubspot.com",
    AccountAdminPhone: "(932) 759-7493",

    PrimaryColor: "RGB #000000",
    SecondaryColor: "RGB #FFFFFF",
    BookDemoURL: "www.calendly.com/jstevens",
    RedirectURL: "www.hubspot.com/demovideo",

    ContractDate: "01/07/2024o",
    ContractTerm: "1 Year",
    ContractDate: "01/06/2025",

    CustomerType: "Big Enterprise",
    UserCount: "25",
    MediaCredits: "6,000",
    ActiveMediaLimit1: "6,000",
    ActiveMediaLimit2: "6,000",
    UploadLogo: "Hubspot.456765.jpg",
  });

  const [selectedFileName, setSelectedFileName] = useState("");
  const [isImageSelection, setImageSelection] = useState(false);
  const [newCompanyAdminDialogOpen, setNewCompanyAdminDialogOpen] =
    useState(false);

  const handleEditClick1 = () => {
    setEditing1(true);
  };

  const handleSaveClick1 = () => {
    setEditing1(false);
  };
  const handleEditClick2 = () => {
    setEditing2(true);
  };

  const handleSaveClick2 = () => {
    setEditing2(false);
  };
  const handleEditClick3 = () => {
    setEditing3(true);
  };

  const handleSaveClick3 = () => {
    setEditing3(false);
  };
  const handleEditClick4 = () => {
    setEditing4(true);
  };

  const handleSaveClick4 = () => {
    setEditing4(false);
  };
  const handleEditClick5 = () => {
    setEditing5(true);
  };

  const handleSaveClick5 = () => {
    setEditing5(false);
  };
  const handleEditClick6 = () => {
    setEditing6(true);
    setImageSelection(true);
  };

  const handleSaveClick6 = () => {
    setEditing6(false);
    setImageSelection(false);
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setData({ ...data, UploadLogo: selectedFile.name });
  };

  const handleViewAgreement = () => {
    const url = accountContract?.url;
    setAgreementUrl(url);
    window.open(url, "_blank");
  };

  const formValidationSchemaOne = Yup.object().shape({
    AccountName: Yup.string()
      .min(2, "Account Name must be at least 2 characters")
      .max(60, "Account Name must be at most 60 characters")
      .required("Account Name is required.")
      .test(
        "no-special-characters",
        "Special characters are not allowed.",
        (value) => /^[a-zA-Z0-9\s]*$/.test(value)
      ),

    phoneNumberOne: Yup.string()
      .required("Mobile Number is required.")
      .max(15, "Mobile Number should not exceed 15 digits.")
      .min(7, "Mobile Number must be at least 7 digits."),

    PersonaProAdmin: Yup.string()
      .required("SDRCloud.ai Admin is required.")
      .max(60, "SDRCloud.ai Admin shuold be greater then 60 character")
      .matches(/^[a-zA-Z ]+$/, "Only alphabet characters are allowed"),
  });

  const formValidationSchemaTwo = Yup.object().shape({
    AdminFirstName: Yup.string()
      .min(3, "Admin First Name must be at least 3 characters.")
      .max(60, "Admin First Name must be at most 60 characters")
      .required("Admin First Name is required.")
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

    AdminLastName: Yup.string()
      .min(3, "Admin Last Name must be at least 3 characters.")
      .max(60, "Admin Last Name must be at most 60 characters")
      .required("Admin Last Name is required.")
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

    AccountAdminEmail: Yup.string()
      .email("A valid email address is required (e.g., user@example.com).")
      .required("A valid email address is required (e.g., user@example.com).")
      .max(254, "A valid email address is required (e.g., user@example.com).")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
        "A valid email address is required (e.g., user@example.com)."
      ),

    phoneNumberTwo: Yup.string()
      .required("Mobile Number is required.")
      .max(15, "Mobile Number should not exceed 15 digits.")
      .min(10, "Mobile Number must be at least 10 digits."),
  });

  const formValidationSchemaThree = Yup.object().shape({
    PrimaryColor: Yup.string()
      .required("Primary Color is required.")
      .max(60, "Primary Color should not exceed 60 characters."),

    SecondaryColor: Yup.string()
      .required("Secondary Color is required.")
      .max(60, "Secondary Color should not exceed 60 characters."),

    BookDemoURL: Yup.string()
      .url("Invalid URL")
      .required("Book Demo URL is required.")
      .max(60, "Book Demo URL should not exceed 60 characters."),

    RedirectURL: Yup.string()
      .url("Invalid URL")
      .required("Redirect URL is required."),

    ContractDate: Yup.string()
      .required("Contract Date is required.")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Contract date formate"),

    ContractTerm: Yup.string().required("ContractTerm is required."),

    CustomerType: Yup.string().required("CustomerType is required."),

    UserCount: Yup.string().required("UserCount is required."),

    MediaCredits: Yup.string().required("MediaCredits is required."),

    ActiveMediaLimit1: Yup.string().required("ActiveMediaLimit1 is required."),

    ActiveMediaLimit2: Yup.string().required("ActiveMediaLimit2 is required."),
  });

  const handleFormSubmitOne = () => {};

  const handleFormSubmitTwo = () => {};

  const handleFormSubmitThree = () => {};

  return (
    <Box className={classes.editCompanySettingsContainer}>
      <Box className="breads">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="body1" style={{ color: "#152F40" }}>
            <Link color="inherit" href="/setting" onClick={handleClick}>
              Accounts{" "}
            </Link>
          </Typography>
          <Typography className="headText">{settingRoute}</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2} className="gridContainer ">
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box className="companyDetails commonBorder">
            <Formik
              initialValues={{
                AccountName: "",
                phoneNumberOne: "",
                PersonaProAdmin: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchemaOne}
              onSubmit={(values, { resetForm }) =>
                handleFormSubmitOne(values, resetForm)
              }
            >
              {({
                errors,
                handleBlur,
                handleChange,
                touched,
                values,
                setFieldValue,
                setFieldTouched,
              }) => (
                <Form style={{ marginTop: "0px" }}>
                  <Box className="commonHeadingBox">
                    <Typography variant="body1">
                      Account Details
                      {isEditing1 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick1}
                          className="EditButton"
                          type="submit"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick1}
                          className="EditButton"
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                  </Box>
                  <Box className="innerbox commomInnerBox">
                    <Grid container>
                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Account Name:</Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.AccountName}
                          disabled={!isEditing1}
                          name="AccountName"
                          // onChange={handleChange}
                          onChange={(event) => {
                            const { name, value } = event.target;
                            const capitalizedValue =
                              value.charAt(0).toUpperCase() + value.slice(1);
                            handleChange({
                              target: { name, value: capitalizedValue },
                            });
                          }}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 60,
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          className={
                            isEditing1 ? "editableTextField" : "staticText"
                          }
                          style={{ color: "#152F40" }}
                        />
                        <FormHelperText error className={classes.helperText}>
                          {touched.AccountName && errors.AccountName}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Account Phone:</Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <PhoneInput
                          disabled={!isEditing1}
                          label="Phone Number"
                          name="phoneNumberOne"
                          value={values.phoneNumberOne}
                          className={
                            isEditing1 ? "editableTextField" : "staticText"
                          }
                          onBlur={(e) => {
                            handleBlur(e);

                            setFieldTouched("phoneNumberOne", true);
                          }}
                          onChange={(phoneNumberOne, e) => {
                            setFieldValue("phoneNumberOne", phoneNumberOne);
                          }}
                          defaultCountry="IN"
                          country={"in"}
                          inputStyle={{
                            width: "100%",
                            height: "30px",
                            marginTop: "0px",
                            fontWeight: "normal",
                          }}
                        />
                        <FormHelperText error className={classes.helperText}>
                          {touched.phoneNumberOne && errors.phoneNumberOne}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          SDRCloud.ai Admin:
                        </Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          disabled={!isEditing1}
                          value={values.PersonaProAdmin}
                          name="PersonaProAdmin"
                          onChange={(event) => {
                            const { name, value } = event.target;
                            const capitalizedValue =
                              value.charAt(0).toUpperCase() + value.slice(1);
                            handleChange({
                              target: { name, value: capitalizedValue },
                            });
                          }}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 60,
                            pattern: "[A-Za-z ]*",
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          className={isEditing1 ? "editableTextField" : ""}
                        />
                        <FormHelperText error className={classes.helperText}>
                          {touched.PersonaProAdmin && errors.PersonaProAdmin}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>

          <Box className="pointsOfContractDetails commonBorder topMargin">
            <Formik
              initialValues={{
                AdminFirstName: "",
                AdminLastName: "",
                AccountAdminEmail: "",
                phoneNumberTwo: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchemaTwo}
              onSubmit={(values, { resetForm }) =>
                handleFormSubmitTwo(values, resetForm)
              }
            >
              {({
                errors,
                handleBlur,
                handleChange,
                touched,
                values,
                setFieldValue,
                setFieldTouched,
              }) => (
                <Form style={{ marginTop: "0px" }}>
                  <Box className="commonHeadingBox">
                    <Typography variant="body1">
                      Create Account Admin
                      {isEditing2 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick2}
                          className="EditButton"
                          type="submit"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick2}
                          className="EditButton"
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                  </Box>
                  <Box className="innerbox commomInnerBox">
                    <Grid container>
                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Admin First Name:
                        </Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.AdminFirstName}
                          name="AdminFirstName"
                          disabled={!isEditing2}
                          onChange={(event) => {
                            const { name, value } = event.target;
                            const capitalizedValue =
                              value.charAt(0).toUpperCase() + value.slice(1);
                            handleChange({
                              target: { name, value: capitalizedValue },
                            });
                          }}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 60,
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          className={isEditing2 ? "editableTextField" : ""}
                        />
                        <FormHelperText error className={classes.helperText}>
                          {touched.AdminFirstName && errors.AdminFirstName}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Admin Last Name:
                        </Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.AdminLastName}
                          name="AdminLastName"
                          disabled={!isEditing2}
                          onChange={(event) => {
                            const { name, value } = event.target;
                            const capitalizedValue =
                              value.charAt(0).toUpperCase() + value.slice(1);
                            handleChange({
                              target: { name, value: capitalizedValue },
                            });
                          }}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 60,
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          className={isEditing2 ? "editableTextField" : ""}
                        />
                        <FormHelperText error className={classes.helperText}>
                          {touched.AdminLastName && errors.AdminLastName}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Account Admin Email:
                        </Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.AccountAdminEmail}
                          name="AccountAdminEmail"
                          disabled={!isEditing2}
                          onChange={handleChange}
                          inputProps={{ maxLength: 255 }}
                          onBlur={handleBlur}
                          className={isEditing2 ? "editableTextField" : ""}
                        />{" "}
                        <FormHelperText error className={classes.helperText}>
                          {touched.AccountAdminEmail &&
                            errors.AccountAdminEmail}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Account Admin Phone:
                        </Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <PhoneInput
                          disabled={!isEditing2}
                          label="Phone Number"
                          name="phoneNumberTwo"
                          value={values.phoneNumberTwo}
                          inputProps={{ maxLength: 20 }}
                          className={isEditing2 ? "editableTextField" : ""}
                          onBlur={(e) => {
                            handleBlur(e);
                            setFieldTouched("phoneNumberTwo", true);
                          }}
                          onChange={(phoneNumberTwo, e) => {
                            setFieldValue("phoneNumberTwo", phoneNumberTwo);
                          }}
                          defaultCountry="IN"
                          country={"in"}
                          inputStyle={{
                            width: "100%",
                            height: "30px",
                            marginTop: "0px",
                            fontWeight: "normal",
                          }}
                        />
                        <FormHelperText error className={classes.helperText}>
                          {touched.phoneNumberTwo && errors.phoneNumberTwo}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>

          <Box className="companyLogo commonBorder topMargin">
            <Formik
              initialValues={{
                PrimaryColor: "",
                SecondaryColor: "",
                BookDemoURL: "",
                RedirectURL: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchemaThree}
              onSubmit={(values, { resetForm }) =>
                handleFormSubmitThree(values, resetForm)
              }
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form style={{ marginTop: "0px" }}>
                  <Box className="commonHeadingBox">
                    <Typography variant="body1">
                      Account Details
                      {isEditing3 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick3}
                          className="EditButton"
                          stype="submit"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick3}
                          className="EditButton"
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                  </Box>
                  <Box className="innerbox commomInnerBox">
                    <Grid container>
                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Primary Color:</Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.PrimaryColor}
                          name="PrimaryColor"
                          disabled={!isEditing3}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 61,
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          className={isEditing3 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.PrimaryColor && errors.PrimaryColor}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Secondary Color:
                        </Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.SecondaryColor}
                          name="SecondaryColor"
                          disabled={!isEditing3}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 60,
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          className={isEditing3 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.SecondaryColor && errors.SecondaryColor}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Book Demo URL:</Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.BookDemoURL}
                          name="BookDemoURL"
                          disabled={!isEditing3}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            maxLength: 60,
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          className={isEditing3 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.BookDemoURL && errors.BookDemoURL}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Redirect URL:</Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.RedirectURL}
                          name="RedirectURL"
                          disabled={!isEditing3}
                          onChange={handleChange}
                          inputProps={{
                            maxLength: 60,
                            onKeyPress: (event) => {
                              const charCode = event.which
                                ? event.which
                                : event.keyCode;
                              if (
                                !(charCode >= 65 && charCode <= 90) &&
                                !(charCode >= 97 && charCode <= 122) &&
                                charCode !== 32
                              ) {
                                event.preventDefault();
                              }
                            },
                          }}
                          onBlur={handleBlur}
                          className={isEditing3 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.RedirectURL && errors.RedirectURL}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box className="companyDetails commonBorder">
            <Formik
              initialValues={{
                ContractDate: "",
                ContractTerm: "",
                ContractEndDate: "",
              }}
              validationSchema={formValidationSchemaThree}
              onSubmit={(values, { resetForm }) =>
                handleFormSubmitThree(values, resetForm)
              }
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form style={{ marginTop: "0px" }}>
                  <Box className="commonHeadingBox">
                    <Typography varient="body1">
                      Contract Term
                      {isEditing4 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick4}
                          className="EditButton"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick4}
                          className="EditButton"
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                  </Box>

                  <Box className="innerbox commomInnerBox">
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Contract Date:</Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.ContractDate}
                          disabled={!isEditing4}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="ContractDate"
                          className={isEditing4 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.ContractDate && errors.ContractDate}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Contract Term:</Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.ContractTerm}
                          disabled={!isEditing4}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="ContractTerm"
                          className={isEditing4 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.ContractTerm && errors.ContractTerm}
                        </FormHelperText>
                      </Grid>

                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Contract End Date:
                        </Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.ContractEndDate}
                          disabled={!isEditing4}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="ContractEndDate"
                          className={isEditing4 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.ContractDate && errors.ContractDate}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>

          <Box className="pointsOfContractDetails commonBorder topMargin">
            <Formik
              initialValues={{
                CustomerType: "",
                UserCount: "",
                MediaCredits: "",
                ActiveMediaLimit1: "",
                ActiveMediaLimit2: "",
              }}
              validationSchema={formValidationSchemaThree}
              onSubmit={(values, { resetForm }) =>
                handleFormSubmitThree(values, resetForm)
              }
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form style={{ marginTop: "0px" }}>
                  <Box className="commonHeadingBox">
                    <Typography variant="body1">
                      Contact Details
                      {isEditing5 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick5}
                          className="EditButton"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick5}
                          className="EditButton"
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                  </Box>
                  <Box className="innerbox commomInnerBox">
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Customer Type:</Typography>
                      </Grid>

                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          name="CustomerType"
                          value={values.CustomerType}
                          disabled={!isEditing5}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{ maxLength: 60 }}
                          className={isEditing5 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.CustomerType && errors.CustomerType}
                        </FormHelperText>
                      </Grid>
                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">User Count:</Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.UserCount}
                          name="UserCount"
                          disabled={!isEditing5}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={isEditing5 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.UserCount && errors.UserCount}
                        </FormHelperText>
                      </Grid>
                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">Media Credits:</Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.MediaCredits}
                          disabled={!isEditing5}
                          name="MediaCredits"
                          inputProps={{ maxLength: 60 }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={isEditing5 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.MediaCredits && errors.MediaCredits}
                        </FormHelperText>
                      </Grid>
                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Active Media Limit:
                        </Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.ActiveMediaLimit1}
                          disabled={!isEditing5}
                          name="ActiveMediaLimit1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={isEditing5 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.ActiveMediaLimit1 &&
                            errors.ActiveMediaLimit1}
                        </FormHelperText>
                      </Grid>
                      <Grid item lg={3} md={4} sm={6} className="flexCenter">
                        <Typography variant="body1">
                          Active Media Limit:
                        </Typography>
                      </Grid>
                      <Grid item lg={8} md={8} sm={6}>
                        <TextField
                          value={values.ActiveMediaLimit2}
                          disabled={!isEditing5}
                          onChange={handleChange}
                          name="ActiveMediaLimit2"
                          onBlur={handleBlur}
                          className={isEditing5 ? "editableTextField" : ""}
                        />
                        <FormHelperText error>
                          {touched.ActiveMediaLimit2 &&
                            errors.ActiveMediaLimit2}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>

          <Box className="companyLogo commonBorder topMargin">
            <Box className="commonHeadingBox">
              <Typography variant="body1">
                Account logo
                {isEditing6 ? (
                  <Button
                    color="primary"
                    onClick={handleSaveClick6}
                    className="EditButton"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={handleEditClick6}
                    className="EditButton"
                  >
                    Edit
                  </Button>
                )}
              </Typography>
            </Box>
            <Box className="innerbox commomInnerBox">
              <Grid container spacing={3}>
                <Grid item lg={3} md={4} sm={6} className="flexCenter">
                  <Typography variant="body1">Upload Logo :</Typography>
                </Grid>
                <Grid item lg={3} md={8} sm={6}>
                  {isImageSelection ? (
                    <input
                      type="file"
                      accept="image/jpeg, image/png,image/jpg"
                      onChange={handleImageChange}
                    />
                  ) : (
                    <Typography variant="h6">{data.UploadLogo}</Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box className="companyLogo commonBorder topMargin">
            <Box className="commonHeadingBoxes">
              <Typography variant="body1">View Agreement</Typography>
              <Button className="viewBtn" onClick={handleViewAgreement}>
                {" "}
                View{" "}
              </Button>
            </Box>
            <Box className="innerbox commomInnerBox">
              <Grid container spacing={3} justify="center" alignItems="center">
                <TextField
                  variant="outlined"
                  className="buttonTextfield"
                  value={selectedFileName || "hubspotcontract.pdf"}
                  disabled
                />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditCompanySettings;
