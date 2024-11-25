import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString, isValidNumber } from "libphonenumber-js";
const useStyles = makeStyles((theme) => ({
  savecancelbtn: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    marginRight: "10px",
    "& .MuiButton-contained": {
      padding: "9px 30px",
      fontSize: "15px",
      width: "100%",
      maxWidth: "210px",
    },
  },
  disbledbtn: {
    border: "none",
    color: "#000 !important",
    fontSize: "15px",
    boxShadow: "none",
  },
  enabled: {
    border: "none",
    backgroundColor: "var(--blue, #0358AC) !important",
    color: "white !important",
    fontSize: "15px",
    boxShadow: "none",
  },
  DialogTitleFirst: {
    "& h2": {
      fontSize: "18px",
      fontWeight: 500,
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
  DialogBox: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "500px",
    },
    "& .MuiDialog-paper": {
      overflowY: "hidden",
    },
  },
  DialogContentBox: {
    overflowY: "auto",
    marginRight: "10px",
    marginBottom: "10px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#0358AC",
      borderRadius: "4px",
    },
    "& .MuiTypography-body1": {
      color: "#152F40",
    },
    "& .MuiTypography-h6": {
      color: "#152F40",
    },
    "& .country-list": {
      background: "#FFF !important",
      "& .country.highlight": {
        background: "rgb(139 137 137 / 35%) !important",
      },
    },
    "& .error": {
      color: "#f44336 !important",
      marginTop: "3px",
      fontWeight: 500,
    },
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
}));

function AddUser({ adduser, id, roleid, handleAddUserClose }) {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const validationSchema = Yup.object({
    roleStatus: Yup.string().required("Please select a User Type."),
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
    email: Yup.string()
      .required("A valid email address is required (e.g., user@example.com).")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
        "A valid email address is required (e.g., user@example.com)."
      )
      .transform((value) => value.toLowerCase()),
    phoneNo: Yup.string()
      .required("A valid phone number is required, including the country code.")
      .test(
        "is-valid-phone",
        "A valid Admin phone number is required, including the country code.",
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
        "Password is required and must be between 8 and 20 characters, including a mix of uppercase, lowercase, numbers, and special characters."
      )
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\s\S])[A-Za-z\d\s\S]{8,16}$/,
        "Password is required and must be between 8 and 16 characters, including a mix of uppercase, lowercase, numbers, and special characters."
      ),
    title: Yup.string()
      .required("Title must be between 2 and 100 characters.")
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{2,100}$/,
        "Title must be between 2 and 100 characters."
      ),
    linkedinUrl: Yup.string()
      .required(
        "Please enter a valid linkedIn profile url (e.g., https://www.linkedin.com/in/username)."
      )
      .matches(
        /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
        "Please enter a valid linkedIn profile url (e.g., https://www.linkedin.com/in/username)."
      ),

    meetLink: Yup.string()
      .required("Please enter a valid meeting link url.")
      .matches(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Please enter a valid meeting link url."
      ),
  });

  const initialValues = {
    roleStatus: "USER",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    title: "",
    linkedinUrl: "",
    meetLink: "",
  };
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const reload = true;
  const history = useHistory();

  // Function to handle cancel action
  const handleCancel = () => {
    formik.resetForm();
    handleAddUserClose();
  };

  // Formik hook for form management
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    context: { country: selectedCountry },
  });

  // Function to handle saving user data
  const handlesave = async () => {
    try {
      // if (Object.values(formik.values).some((value) => !value)) {
      //   toast.error("Please fill out all required fields");
      //   return;
      // }
      setLoading(true);
      const { showPassword, ...data } = {
        ...formik.values,
        title: formik.values.title.trim(),
        linkedinUrl: formik.values.linkedinUrl.trim(),
        meetLink: formik.values.meetLink.trim(),
        roleStatus: "USER",
      };
      const res = await axios({
        method: "POST",
        url: ApiConfig.addUser,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: data,
      });
      console.log("resres", res);
      if (res?.data?.status === 200) {
        setLoading(false);

        toast.success(res?.data?.message);
        history.push({
          pathname: "/companyUsers-List",
          state: reload,
        });
        handleAddUserClose();
        formik.resetForm();
      }
      //  else if (res?.data?.status === 205) {
      //   setLoading(false);
      //   toast.error(res?.data?.message);
      // }
      else if (res?.data?.status === 404) {
        console.log("ygygyuguguy");
        setLoading(false);
        toast.error(res?.data?.message);
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
        handleAddUserClose();
      }
    } catch (error) {
      console.log(error, "error in side the add  user");
      toast.error(error?.response?.data?.message);
      setLoading(false);
      // handleAddUserClose();
    }
  };

  useEffect(() => {
    if (adduser) {
      formik.resetForm();
    }
  }, [adduser]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={adduser}
        onClose={false}
        className={classes.DialogBox}
      >
        <Box className={classes.CrossIcon}>
          <RxCross2 className="closeicon" onClick={handleCancel} />
        </Box>
        <DialogTitle className={classes.DialogTitleFirst} variant="h2">
          Add New User{" "}
        </DialogTitle>
        <DialogContent className={classes.DialogContentBox}>
          <form onSubmit={formik.handleSubmit}>
            {Object.keys(initialValues).map(
              (field) =>
                field !== "roleStatus" && (
                  <React.Fragment key={field}>
                    <Typography variant="body1">
                      {getFieldLabel(field)}
                    </Typography>
                    {field === "phoneNo" ? (
                      <Box style={{ marginBottom: "10px" }}>
                        {" "}
                        <PhoneInput
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.phoneNo &&
                            Boolean(formik.errors.phoneNo)
                          }
                          helperText={
                            formik.touched.phoneNo && formik.errors.phoneNo
                          }
                          defaultCountry="US"
                          country={selectedCountry.toLowerCase()}
                          value={formik.values.phoneNo}
                          onChange={(phone) => {
                            const formattedPhone = phone.startsWith("+")
                              ? phone
                              : `+${phone}`;
                            formik.setFieldValue("phoneNo", formattedPhone);
                          }}
                          inputStyle={{
                            width: "-webkit-fill-available",
                            height: "45px",
                            marginTop: "0px",
                            fontWeight: "normal",
                            border: "1px solid #e7e7e7",
                          }}
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
                        type={
                          field === "password" && !formik.values.showPassword
                            ? "password"
                            : "text"
                        }
                        value={formik.values[field]}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          if (name === "email") {
                            formik.setFieldValue(name, value.toLowerCase());
                          } else if (
                            name === "firstName" ||
                            name === "lastName"
                          ) {
                            const filteredValue = value.replace(
                              /[^a-zA-Z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]/g,
                              ""
                            );

                            const capitalizedValue =
                              filteredValue.charAt(0).toUpperCase() +
                              filteredValue.slice(1).toLowerCase();
                            formik.setFieldValue(name, filteredValue);
                          } else {
                            formik.handleChange(e);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched[field] && Boolean(formik.errors[field])
                        }
                        helperText={
                          formik.touched[field] && formik.errors[field]
                        }
                        placeholder={`${getFieldPlaceholder(field)}`}
                        inputProps={{
                          maxLength:
                            field === "phoneNo"
                              ? 20
                              : field === "password"
                              ? 16
                              : field === "email"
                              ? 254
                              : field === "title"
                              ? 101
                              : field === "firstName" || field === "lastName"
                              ? 51
                              : undefined,
                          onKeyDown: (e) => {
                            if (
                              field !== "title" &&
                              field !== "lastName" &&
                              e.keyCode === 32
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
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }
                            : undefined
                        }
                      />
                    )}
                  </React.Fragment>
                )
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Box fullWidth className={classes.savecancelbtn}>
            <Button variant="contained" color="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlesave}
              disabled={!formik.isValid || !formik.dirty || loading}
              className={
                formik.isValid && formik.dirty && !loading
                  ? classes.enabled
                  : classes.disbledbtn
              }
            >
              {loading === false ? (
                "Add & Send Invite"
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
      return "User First Name";
    case "lastName":
      return "User Last Name";
    case "email":
      return "Email";
    case "phoneNo":
      return "Phone";
    case "password":
      return "Password";
    case "title":
      return "Title";
    case "linkedinUrl":
      return "LinkedIn URL";
    case "meetLink":
      return "Meeting Link";
    default:
      return "";
  }
};

const getFieldPlaceholder = (field) => {
  switch (field) {
    case "firstName":
      return "Enter User First Name";
    case "lastName":
      return "Enter User Last Name";
    case "email":
      return "Enter User Email";
    case "phoneNo":
      return "+1 (___) __ __ ___";
    case "password":
      return "Enter User Password";
    case "title":
      return "Enter Title";
    case "linkedinUrl":
      return "Enter User LinkedIn URL";
    case "meetLink":
      return "Enter Meeting Link";
    default:
      return "";
  }
};

export default AddUser;
