import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  FormControl,
  Select,
  Modal,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect } from "react";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { menuProps } from "src/utils";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { SketchPicker } from "react-color";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { FormHelperText } from "@mui/material";
import CropEasyProfile from "../../CreateVideo/Crop/CropEasyProfile";
import { useFormik } from "formik";
import { Close } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  innerbox: {
    border: "1px solid #E7E7E7",
    padding: "16px 24px 16px 24px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .MuiFormControl-marginNormal": {
      marginTop: "8px",
      marginBottom: "8px",
    },
    "& .MuiTypography-body1": {
      color: "#152F40",
      fontWeight: 500,
      font: "Inter",
    },
    "& .MuiTypography-body2": {
      color: "#152F40",
      fontWeight: 400,
      font: "Inter",
    },

    "& .MuiInputBase-input": {
      color: "#152F40 !important",
      fontWeight: 500,
      fontSize: "14px",
    },
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC",
      height: "45px",
    },
    "& .MuiSelect-icon": {
      top: "0px",
    },
    "& .editbuttonimage": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      height: "44px",
      marginRight: "-6px",
      width: "137px",
      "@media (min-width: 320px and max-width: 375px )": {
        width: "110px",
      },
    },
    "& .selectitem": {
      color: "#858585 !important",
      border: "1px solid #ECECEC",
      height: "44px",
      background: "transparent",
      borderRadius: "8px",
      marginTop: "6px",
      marginBottom: "8px",
      "& .MuiSelect-iconOutlined": {
        borderLeft: "1px solid #ECECEC",
      },
      "& .MuiSelect-iconOpen": {
        borderLeft: "0px !important",
        borderRight: "1px solid #ECECEC",
        transform: "rotate(360deg)",
        marginRight: "-1px !important",
      },

      "& .MuiSelect-icon": {
        top: 0,
        height: "40px",
        paddingLeft: "8px",
      },
      "& .MuiPopover-paper": {
        marginTop: "85px",
      },
      "& .MuiInputBase-input": {
        color: "#858585 !important",
      },
    },
    "& .country-list": {
      background: "#FFF !important",
      "& .country.highlight": {
        background: "rgb(139 137 137 / 35%) !important",
      },
    },
  },
  errorClass: {
    fontSize: "12px !important",
    marginTop: ".5px !important",
    marginBottom: "10px !important",
  },
  errorClass2: {
    marginTop: "10px !important",
    marginBottom: "10px !important",
    fontSize: "12px !important",
  },
  contractdateTextfield: {
    "& .MuiInputBase-input": {
      textAlign: "center !important",
    },
  },
  contractendTextfield: {
    "& .MuiInputBase-input": {
      textAlign: "center !important",
    },
  },
  contractedUser: {
    "& .MuiInputBase-input": {
      textAlign: "center !important",
    },
  },
  mediaCredits: {
    "& .MuiInputBase-input": {
      textAlign: "center !important",
    },
  },
  activeMediaLimits: {
    "& .MuiInputBase-input": {
      textAlign: "center !important",
    },
  },
  headingBox: {
    background: "#F4F4F4",
    padding: "12px 24px 12px 24px",
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
  contractbtn: {
    marginTop: "32px",
    "& .MuiButton-contained": {
      width: "100%",
      height: "48px",
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      fontSize: "16px",
      fontWeight: 500,
    },
  },
  sendcancelbtn: {
    marginTop: "32px",
    gap: "16px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginTop: "25px",
      gap: "8px",
    },
    "& .MuiButton-contained": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      fontSize: "16px",
      fontWeight: "500 !important",
      height: "48px",
      width: "100%",
      maxWidth: "196px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
        height: "50px",
      },
    },

    "& .MuiButton-outlined": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      fontSize: "16px",
      fontWeight: "500 !important",
      height: "48px",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
        height: "50px",
      },
    },
    "& .button": {
      borderRadius: "6px",
      background: " #0358AC",
      color: "white",
      height: "48px",
      cursor: "pointer",
    },

    "& .button:disabled": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      borderRadius: "6px",
      cursor: " not-allowed",
    },
  },
  mainDialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "637px !important",
      width: "100% !important",
      borderRadius: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiDialog-paper": {
        margin: "10px !important",
      },
    },
  },
  CrossIcon: {
    // display: "flex",
    // justifyContent: "end",
    // padding: "5px",
    position: "absolute",
    top: "2%",
    right: "1%",
    "& .closeicon": {
      width: "24px",
      height: "24px",
      border: "1px solid #ECECEC",
      background: "#FFFFFF",
      borderRadius: "50%",
      position: "fixed",
      // marginTop: "-21px",
      // marginRight: "-17px",
      marginTop: "-45px",
      marginRight: "-35px",
      padding: "6px",
      cursor: "pointer",
    },
  },
  dialogHeading: {
    padding: "24px 44px",
    color: "#152F40",
    fontSize: "18px",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      padding: "15px 44px",
    },
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
  dialogBtnBox: {
    padding: "130px 123px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px dashed #CACACA",
    borderRadius: "10px",
    borderSpacing: "10px",
    margin: "0px 44px",
    [theme.breakpoints.down("sm")]: {
      padding: "70px 40px",
      margin: "0px 30px",
    },
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
    padding: "24px 44px 32px 44px",
    "& .btnCancel": {
      backgroundColor: "#0358AC",
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
    "& .savebtn": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      width: "100%",
      maxWidth: "266.5px",
      height: "48px",
      borderRadius: "8px",
    },
    "& .savebtnDisables": {
      background: "#F4F4F4",
      color: "black",
      width: "100%",
      maxWidth: "266.5px",
      height: "48px",
      borderRadius: "8px",
    },
  },
  hiddenInput: {
    display: "none",
  },
  ContractDetails: {
    marginTop: "15px",
    "& .editbuttonimage": {
      backgroundColor: "#0358AC",
      color: "#F2F7FF",
      height: "44px",
      marginRight: "-7px",
      width: "145px",
    },
    "& .MuiFormControl-root": {
      marginTop: "0px",
    },
  },
  input: {
    "& .MuiInputAdornment-root": {
      display: "none", // Hide calendar icon
    },
  },
  colorpicker: {
    width: "100% !important",
    maxWidth: "300px !important",
    padding: "5px 15px 5px",
  },
  colorpickerbtndiv: {
    gap: "15px",
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",

    "& .MuiButton-outlined": {
      color: "#F2F7FF",
      width: "100%",
      fontSize: "15px",
      fontWeight: "500 !important",
      backgroundColor: "#0358AC",
      boxShadow: "none !important",
    },
    "& .MuiButton-contained": {
      color: "#152F40",
      width: "100%",
      fontSize: "15px",
      fontWeight: "500 !important",
      backgroundColor: "#dfd9d9",
      boxShadow: "none !important",
    },
  },
  secondmainGrid: {
    paddingTop: "0px !important",
    marginTop: "-40px",
    "@media(max-width:900px)": {
      paddingTop: "30px !important",
      marginTop: "0px",
    },
  },
  contractTermGrid: {
    "@media(max-width:900px)": {
      paddingTop: "0px !important",
    },
  },
  contractdetailsGrid: {
    "@media(max-width:900px)": {
      paddingTop: "0px !important",
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
  addCategory: {
    " & .MuiDialog-paperWidthSm": { width: "610px", height: "202px" },
  },
  dialogebtn: {
    "& .savebtn": {
      borderRadius: "6px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .savebtnDisables": {
      borderRadius: "6px",
      background: "#F4F4F4",
      color: "black",
      height: "42px",
      width: "100px",
    },
  },
}));

const CreateAccount = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const accountNameErrorMessage =
    "Account Name is required and must be between 3 and 100 characters, containing only alphabetic, alphanumeric or special characters.";

  const accountPhoneErrorMessage =
    "A valid account phone number is required, including the country code.";

  const accountFirstName =
    "Admin First Name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters.";

  const accountLastName =
    "Admin Last Name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters.";

  const accountPhoneAdmin =
    "A valid account phone number is required, including the country code.";

  const validationSchema = Yup.object().shape({
    accountName: Yup.string()
      .test(
        "valid-length",
        accountNameErrorMessage,
        (value) => value && value.length > 1
      )
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{3,100}$/,
        accountNameErrorMessage
      )
      .max(100, accountNameErrorMessage)
      .required(accountNameErrorMessage)
      .test(
        "is-not-only-numeric",
        accountNameErrorMessage,
        (value) => !/^\d+$/.test(value)
      ),

    accountPhoneNo: Yup.string()
      .required(accountPhoneErrorMessage)
      .test("is-valid-phone", accountPhoneErrorMessage, function (value) {
        if (typeof value !== "string") return false;
        const phoneNumber = parsePhoneNumberFromString(value, selectedCountry);
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .max(20, accountPhoneErrorMessage),

    contractFile: Yup.mixed()
      .required("Contract file is required.")
      .test(
        "fileType",
        "Only PDF files are allowed.",
        (value) => value && value.type === "application/pdf"
      ),
    contractEndDate: Yup.date()
      .nullable()
      .required("Contract end date is required"),
    phoneNo: Yup.string()
      .required(accountPhoneAdmin)
      .test("is-valid-phone", accountPhoneAdmin, function (value) {
        if (typeof value !== "string") return false;
        const phoneNumber = parsePhoneNumberFromString(value, selectedCountry);
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .max(20, accountPhoneAdmin),

    contractTerm: Yup.string().required("Contract Term is required."),
    firstName: Yup.string()
      .required(accountFirstName)
      .test(
        "valid-length",
        accountFirstName,
        (value) => value && value.length > 0
      )
      .matches(
        /^(?! )[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{1,49}[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~ ]$/,
        accountFirstName
      ),
    lastName: Yup.string()
      .required(accountLastName)
      .test(
        "valid-length",
        accountLastName,
        (value) => value && value.length > 0
      )

      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{2,50}$/,
        accountLastName
      ),
    email: Yup.string()
      .email("A valid email address is required (e.g., user@example.com).")
      .required("A valid email address is required (e.g., user@example.com).")
      .max(254, "A valid email address is required (e.g., user@example.com).")
      .matches(
        // /^(?!.*\.\.)(?!.*[@.]$)[a-zA-Z0-9][a-zA-Z0-9._+-]{0,252}@(?=[^.]*[A-Za-z])[a-zA-Z0-9-]{2,63}\.[a-zA-Z]{2,63}$/,
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
        "A valid email address is required (e.g., user@example.com)."
      ),

    contractedUsers: Yup.number()
      .required("Contracted Users must be a valid number.")
      .positive("Contracted Users must be a positive number.")
      .integer("Contracted Users must be an integer."),
    // .max(1000, "Contracted Users cannot be greater than 1000."),
    mediaCredits: Yup.number()
      .required("Media Credits must be a valid number.")
      .positive("Media Credits must be a positive number.")
      .integer("Media Credits must be an integer."),
    // .max(1000, "Media Credits cannot be greater than 1000."),
    activeMediaLimits: Yup.number()
      .required("Active Media Limit must be a valid number.")
      .positive("Active Media Limit must be a positive number.")
      .integer("Active Media Limit must be an integer."),
    // .max(1000, "Active Media Limit cannot be greater than 1000."),
    primaryRgb: Yup.string()
      .required("A valid RGB color code is required (e.g., 255, 255, 255).")
      .matches(
        /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        "A valid RGB color code is required (e.g., 255, 255, 255)."
      ),
    secondaryRgb: Yup.string()
      .required("A valid RGB color code is required (e.g., 255, 255, 255).")
      .matches(
        /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        "The matches with Secondary RGB color codes, e.g., rgb(255, 255, 255)."
      ),
    bookDemoButton: Yup.string()
      .required("A valid URL is required (e.g., https://example.com).")
      .matches(
        /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:\d+)?(\/.*)?$/,
        "A valid URL is required (e.g., https://example.com)."
      ),
    redirectLinks: Yup.string()
      .required("A valid URL is required (e.g., https://example.com).")
      .matches(
        /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:\d+)?(\/.*)?$/,
        "A valid URL is required (e.g., https://example.com)."
      ),
    packageName: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s]{3,100}$/,
        "Package Name is required and must be between 3 and 100 characters, containing only alphabetic or alphanumeric characters."
      )
      .test(
        "not-only-numbers",
        "Package Name is required and must be between 3 and 100 characters, containing only alphabetic or alphanumeric characters.",
        (value) => !/^\d+$/.test(value)
      )
      .max(
        100,
        "Package Name is required and must be between 3 and 100 characters, containing only alphabetic or alphanumeric characters."
      )
      .required(
        "Package Name is required and must be between 3 and 100 characters, containing only alphabetic or alphanumeric characters."
      ),
    accountLogo: Yup.mixed()
      .required("Account Logo is required.")
      .test("fileFormat", "Unsupported Format", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(
              value.type
            )
          : true
      ),
  });

  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [ppuserlist, setppUserList] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [newlyAdded, setNewlyAdded] = useState();
  const [isShow, setIsShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(" ");
  const [selectedcustomerType, setSelectedCustomerType] = useState(" ");
  const [accountLogo, setAccountlogo] = useState(null);
  const [accountlogoUpload, setAccountLogoUpload] = useState(null);
  console.log("accountlogoUpload: ", accountlogoUpload);
  const [accountLogoName, setAccountLogoName] = useState(null);
  console.log("accountLogoName: ", accountLogoName);
  const [accountContract, setAccountContract] = useState(null);
  console.log("accountContract: ", accountContract);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [logoFile, setLogoFile] = useState(null);
  const [agreementUrl, setAgreementUrl] = useState("");
  const [clearImage, setClearImage] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPickerSecondary, setShowColorPickerSecondary] =
    useState(false);

  const [currentColor, setCurrentColor] = useState({ r: 0, g: 0, b: 0 });
  const [tempColor, setTempColor] = useState({ r: 0, g: 0, b: 0 });
  const [rgbValue, setRgbValue] = useState("");
  const [hexValue, setHexValue] = useState("");
  const [currentColorsecondary, setCurrentColorSecondary] = useState({
    r: 0,
    g: 0,
    b: 0,
  });
  const [tempColorsecondary, setTempColorSecondary] = useState({
    r: 0,
    g: 0,
    b: 0,
  });
  const [rgbValuesecondary, setRgbValueSecondary] = useState("");
  const [hexValuesecondary, setHexValueSecondary] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [newAccount, setNewAccount] = useState({
    accountName: "",
    accountPhoneNo: "",
    packageName: "",
    contractedDate: null,
    contractTerm: " ",
    contractEndDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    contractedUsers: "",
    mediaCredits: "",
    activeMediaLimits: "",
    bookDemoButton: "",
    userId: localStorage.getItem("_id"),
    redirectLinks: "",
    roleStatus: "SUBADMIN",
  });
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string()
        .max(
          25,
          "Category is required and must be between 2 and 25 characters."
        )
        .min(2, "Category is required and must be between 2 and 25 characters"),
    }),
    onSubmit: (values) => {
      handleAddNewCategory(values.category);
      setIsDialogOpen(false);
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNewCategory = (values) => {
    addCategory(values);
    console.log(values, "valuesvalues");

    setIsDialogOpen(false);
    setNewCategory("");
  };
  const addCategory = async (values) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.addCategory,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          categoryName: values,
        },
      });
      if (res?.data?.status === 200) {
        setIsShow(true);
        getCustomerType();

        setLoading(false);

        formik.resetForm();
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);

        // else if (res?.data?.status === 205) {
        //   toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteCategory = async (categoryId, categoryName) => {
    try {
      setIsShow(false);
      setLoading(true);
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteCategory,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          categoryId,
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        if (selectedcustomerType === categoryName) {
          setSelectedCustomerType(" ");
        }

        getCustomerType();
        setLoading(false);
      } else if (res?.data?.status === 205) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handlecreateNewAccount = async (values) => {
    console.log("values: ", values);
    const isImageEmpty = !accountLogo;
    const isContractEmpty = !accountContract?.name;

    if (isImageEmpty || isContractEmpty) {
      toast.error("Please verify all the fields are filled.");
    } else {
      const formattedNewAccountData = {
        accountName: values.accountName,
        accountPhoneNo: values.accountPhoneNo,
        phoneNo: values.phoneNo,
        packageName: values.packageName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        contractedUsers: values.contractedUsers,
        mediaCredits: values.mediaCredits,
        activeMediaLimits: values.activeMediaLimits,
        contractedDate: values.contractedDate,
        contractTerm: values.contractTerm,
        contractEndDate: values.contractEndDate,
        bookDemoButton: values.bookDemoButton,
        redirectLinks: values.redirectLinks,
        primaryRgb: rgbValue,
        primaryHex: hexValue,
        secondaryRgb: rgbValuesecondary,
        secondaryHex: hexValuesecondary,
        customerType: selectedcustomerType,
        ppAdminId: selectedUser,
        map: {
          IMAGE: photoURL ? photoURL : accountLogo,
          PDF: accountContract.base64,
        },
        roleStatus: "SUBADMIN",
      };

      setLoading(true);
      try {
        const res = await axios({
          method: "POST",
          url: ApiConfig.createNewAccount,
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          data: formattedNewAccountData,
        });
        if (res?.data?.status === 200) {
          setLoading(false);
          setNewAccount(res?.data?.data);
          toast.success(res?.data?.message);
          history.push("/PP-createaccount");
        } else if (res?.data?.status === 205) {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "error");
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    }
  };

  const getPPUserList = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.ppadminUserListNew,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setppUserList(res?.data?.data?.ppAdminList);
      } else if (res?.data?.status === 205) {
        toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  const getCustomerType = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllCategories,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setCustomerType(res?.data?.data);
        setNewlyAdded(res?.data?.data[res?.data?.data.length - 1]);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPPUserList();
    getCustomerType();
  }, []);

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
  };

  const handlecustomerType = (event) => {
    console.log("event: ", event.target);
    setIsShow(false);
    const selectedCustomerId = event.target.value;
    setSelectedCustomerType(selectedCustomerId);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    if (!clearImage) {
      setAccountlogo("");
      setAccountLogoUpload("");
    }
  };

  const handleFileUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    setLogoFile(file?.name);
    setAccountLogoName(logoFile);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAccountlogo(event.target.result);
        // Update the Formik field value
        setFieldValue("accountLogo", file); // Pass the file itself for validation
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAccontLogo = (event) => {
    setAccountLogoUpload(accountLogo);
    setAccountLogoName(logoFile);
    toast.success("Image uploaded successfully.");
    setOpen(false);
    setClearImage(true);
  };

  const handleEditAccontLogo = () => {
    setAccountLogoName(null);
    setAccountlogo("");
    setAccountLogoUpload("");
    handleOpenDialog();
  };

  const handleContractUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        event.target.value = null;
        setFieldValue("contractFile", null); // Update Formik's value
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = reader.result.split(",")[1];
        const blob = base64toBlob(base64String);
        const url = URL.createObjectURL(blob);
        setAccountContract({
          name: file.name,
          base64: event.target.result,
          url: url,
        });
        setFieldValue("contractFile", file); // Update Formik's value
      };
      reader.readAsDataURL(file);
      toast.success("Contract Uploaded Successfully.");
    } else {
      setFieldValue("contractFile", null); // Set to null if no file is uploaded
    }
  };

  const base64toBlob = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
  };

  const handleUploadButtonClick = () => {
    console.log("handleUploadButtonClick: is triggering ");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setAccountContract(null);
  };

  const handleViewAgreement = () => {
    const url = accountContract?.url;
    setAgreementUrl(url);
    window.open(url, "_blank");
  };

  const formatDate = (dateString) => {
    if (typeof dateString !== "string" || dateString.trim() === "") {
      return null;
    }
    const [day, month, year] = dateString.split("/");
    const formattedDate = `${year}-${month}-${day}T00:00:00.000+0000`;
    return formattedDate;
  };

  const handleSaveColor = (form) => {
    // Convert currentColor to RGB string
    const rgbString = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    // Update Formik field value for RGB
    form.setFieldValue("primaryRgb", rgbString);
    // Update local state for HEX value
    const hexString = rgbToHex(currentColor);
    form.setFieldValue("primaryHex", hexString);
    setRgbValue(rgbString);
    setHexValue(hexString);
    setShowColorPicker(false);
  };

  const handleSaveColorSecondary = (form) => {
    const rgnStringsecond = `rgb(${currentColorsecondary.r}, ${currentColorsecondary.g}, ${currentColorsecondary.b})`;
    form.setFieldValue("secondaryRgb", rgnStringsecond);

    setRgbValueSecondary(rgnStringsecond);
    setHexValueSecondary(rgbToHex(currentColorsecondary));
    setShowColorPickerSecondary(false);
  };

  const handleCancelColor = () => {
    setShowColorPicker(false);
    setShowColorPickerSecondary(false);
    setCurrentColor(tempColor); // Reset to previous color
    setCurrentColorSecondary(tempColorsecondary);
  };

  const rgbToHex = (rgb) => {
    // Convert RGB to HEX
    const { r, g, b } = rgb;
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    return `#${hex}`;
  };

  const handleContractTermChange = (e, setFieldValue, values) => {
    const term = e.target.value;
    let endDate = null;
    const contractedDate = values.contractedDate || new Date(); // Default to current date if not set

    if (term === "Trial") {
      endDate = new Date(contractedDate);
      endDate.setDate(endDate.getDate() + 7); // 1-week trial
    } else if (term === "1Month") {
      endDate = new Date(contractedDate);
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (term === "1Year") {
      endDate = new Date(contractedDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else if (term === "2Year") {
      endDate = new Date(contractedDate);
      endDate.setFullYear(endDate.getFullYear() + 2);
    } else if (term === "3Year") {
      endDate = new Date(contractedDate);
      endDate.setFullYear(endDate.getFullYear() + 3);
    } else if (term === "4Year") {
      endDate = new Date(contractedDate);
      endDate.setFullYear(endDate.getFullYear() + 4);
    }

    setFieldValue("contractTerm", term);
    setFieldValue("contractEndDate", endDate);
  };

  const handleRgbChange = (event, form) => {
    const { value } = event.target;
    setRgbValue(value);
    const hex = rgbToHex(value);
    setHexValue(hex);
    form.setFieldValue("primaryRgb", value);
    form.setFieldValue("primaryHex", hex);
  };
  useEffect(() => {
    if (isShow && customerType?.length > 0) {
      const lastIndex = customerType.length - 1;
      const lastItem = customerType[0];
      console.log("lastItem: ", lastItem);
      setSelectedCustomerType(lastItem?.category_Name);
      setCategoryName(lastItem.category_Name); // Assuming you have a state for category name
    }
  }, [isShow, addCategory]);

  return (
    <>
      <Box className={classes.breads}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/PP-createaccount">
            Accounts&nbsp;
          </Link>
          <Typography className="breadCrumbText">Create New Account</Typography>
        </Breadcrumbs>
      </Box>

      <Formik
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values, "formik Values");
          handlecreateNewAccount(values);
        }}
        initialValues={{
          accountName: "",
          accountPhoneNo: "",
          phoneNo: "",
          country: "US",
          packageName: "",
          firstName: "",
          lastName: "",
          email: "",
          contractedUsers: "",
          mediaCredits: "",
          activeMediaLimits: "",
          bookDemoButton: "",
          redirectLinks: "",
          contractedDate: null,
          contractTerm: "",
          contractEndDate: null,
          contractFile: null,
          primaryRgb: "",
          secondaryRgb: "",
          accountLogo: null,
        }}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
          setFieldValue,
          setFieldTouched,
          resetForm,
          isValid,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={10} style={{ paddingTop: "20px" }}>
              <Grid item md={6} sm={12} xs={12} lg={6}>
                <Box className={classes.headingBox}>
                  <Typography variant="h5">Account Details</Typography>
                </Box>
                <Box className={classes.innerbox}>
                  <div>
                    <Typography variant="body1">Account Name</Typography>
                    <TextField
                      inputProps={{ maxLength: 100 }}
                      name="accountName"
                      fullWidth
                      value={values.accountName}
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter Account Name"
                      error={Boolean(touched.accountName && errors.accountName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {console.log(values?.accountName)}
                    <FormHelperText error className={classes.errorClass}>
                      {touched.accountName && errors.accountName}
                    </FormHelperText>
                  </div>

                  <div>
                    <Typography variant="body1" style={{ marginBottom: "5px" }}>
                      Account Phone
                    </Typography>
                    <FormControl
                      name="accountPhoneNo"
                      fullWidth
                      margin="normal"
                      error={touched.accountPhoneNo && !!errors.accountPhoneNo}
                    >
                      <PhoneInput
                        onBlur={(e) => {
                          handleBlur(e);
                          setFieldTouched("accountPhoneNo", true);
                        }}
                        inputProps={{ maxLength: 20 }}
                        value={values.accountPhoneNo}
                        variant="outlined"
                        placeholder="Enter your phone number"
                        onChange={(value, countryData) => {
                          const formattedPhone = value.startsWith("+")
                            ? value
                            : `+${value}`;
                          setFieldValue("accountPhoneNo", formattedPhone);
                          setSelectedCountry(
                            countryData.countryCode.toUpperCase()
                          );
                        }}
                        defaultCountry={values.country}
                        country={values.country.toLowerCase()}
                        inputStyle={{
                          width: "100%",
                          height: "45px",
                          marginTop: "0px",
                          fontWeight: "normal",
                          border: "1px solid #e7e7e7",
                        }}
                      />
                      {console.log("values.country", values.country)}
                    </FormControl>
                    <FormHelperText error className={classes.errorClass}>
                      {touched.accountPhoneNo && errors.accountPhoneNo}
                    </FormHelperText>
                  </div>
                  <div>
                    <Typography variant="body1">
                      Assign PersonaPro Admin to this Account
                    </Typography>

                    <FormControl style={{ marginTop: "0px" }}>
                      <Select
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        MenuProps={menuProps}
                        value={selectedUser}
                        onChange={handleUserChange}
                        name=""
                        IconComponent={ExpandMoreIcon}
                        renderValue={(selected) => {
                          const selectedUserObj = ppuserlist.find(
                            (user) => user.userId === selected
                          );
                          return (
                            <span
                              style={{
                                color: selected === " " ? "#A2A2A2" : "black",
                              }}
                            >
                              {selectedUserObj?.name || "Select PP Admin"}
                            </span>
                          );
                        }}
                      >
                        <MenuItem value=" " style={{ color: "#B8B8B8" }}>
                          Select PP Admin
                        </MenuItem>
                        {ppuserlist?.map((user) => (
                          <MenuItem
                            key={user.id}
                            value={user.userId}
                            style={{
                              color:
                                selectedUser === user.userId
                                  ? "black"
                                  : "inherit",
                            }}
                          >
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Box>
              </Grid>

              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                lg={6}
                className={classes.contractTermGrid}
              >
                <Box className={classes.headingBox}>
                  <Typography variant="h5">Contract Term</Typography>
                </Box>
                <Box className={classes.innerbox}>
                  <div>
                    <Typography variant="body1">Package Name</Typography>
                    <TextField
                      name="packageName"
                      fullWidth
                      inputProps={{ maxLength: 60 }}
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter Package Name"
                      error={Boolean(touched.packageName && errors.packageName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error className={classes.errorClass}>
                      {touched.packageName && errors.packageName}
                    </FormHelperText>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Typography variant="body1">Contract Date</Typography>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      format="MM/DD/YYYY"
                      placeholder="MM/DD/YYYY"
                      autoOk
                      fullWidth
                      value={values.contractedDate}
                      disablePast
                      onChange={(date) => setFieldValue("contractedDate", date)}
                      onBlur={() => setFieldTouched("contractedDate", true)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      error={Boolean(
                        touched.contractedDate && errors.contractedDate
                      )}
                    />
                    {console.log(
                      "values?.contractedDate",
                      values?.contractedDate
                    )}
                    <FormHelperText
                      error
                      className={classes.errorClass2}
                      // style={{

                      // }}
                    >
                      {touched.contractedDate && errors.contractedDate}
                    </FormHelperText>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Typography variant="body1">Contract Term</Typography>
                    <FormControl
                      style={{ marginTop: "0px" }}
                      disabled={!values.contractedDate}
                    >
                      <Select
                        variant="outlined"
                        className="selectitem"
                        MenuProps={menuProps}
                        value={values?.contractTerm || " "}
                        onChange={(e) =>
                          handleContractTermChange(e, setFieldValue, values)
                        }
                        IconComponent={ExpandMoreIcon}
                        renderValue={(selected) => {
                          if (selected === " ") {
                            return (
                              <span style={{ color: "gray" }}>Select</span>
                            );
                          }

                          // Handle singular and plural for "Year(s)"
                          let displayValue = selected.replace(
                            /(\d)([A-Z])/g,
                            "$1 $2"
                          );
                          if (
                            /(\d) Year/.test(displayValue) &&
                            !displayValue.includes("Trial")
                          ) {
                            const yearCount = parseInt(displayValue);
                            displayValue =
                              yearCount > 1
                                ? `${yearCount} Years`
                                : `${yearCount} Year`;
                          }

                          return (
                            <span style={{ color: "black" }}>
                              {displayValue}
                            </span>
                          );
                        }}
                      >
                        <MenuItem value=" " style={{ color: "gray" }}>
                          Select
                        </MenuItem>
                        <MenuItem value="Trial">Trial</MenuItem>
                        <MenuItem value="1Month">1 Month</MenuItem>
                        <MenuItem value="1Year">1 year</MenuItem>
                        <MenuItem value="2Year">2 years</MenuItem>
                        <MenuItem value="3Year">3 years</MenuItem>
                        <MenuItem value="4Year">4 years</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                    <FormHelperText error className={classes.errorClass}>
                      {touched.contractTerm && errors.contractTerm}
                    </FormHelperText>
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <Typography variant="body1">Contract End Date</Typography>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      format="MM/DD/YYYY"
                      placeholder="MM/DD/YYYY"
                      autoOk
                      fullWidth
                      disabled={values.contractTerm !== "other"}
                      value={values.contractEndDate || null}
                      onChange={(date) =>
                        setFieldValue("contractEndDate", date)
                      }
                      onBlur={() => setFieldTouched("contractEndDate", true)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      error={Boolean(
                        touched.contractEndDate && errors.contractEndDate
                      )}
                    />
                    {console.log(
                      "values.contractEndDate",
                      values.contractEndDate
                    )}
                    <FormHelperText error className={classes.errorClass2}>
                      {touched.contractEndDate && errors.contractEndDate}
                    </FormHelperText>
                  </div>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={10}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                className={classes.secondmainGrid}
              >
                <Grid container>
                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Box className={classes.headingBox}>
                      <Typography variant="h5">Create Account Admin</Typography>
                    </Box>
                    <Box style={{ border: " 1px solid #E7E7E7" }}>
                      <Box
                        className={classes.innerbox}
                        style={{ border: "none" }}
                      >
                        <div>
                          <Typography variant="body1">
                            Admin First Name
                          </Typography>
                          <TextField
                            name="firstName"
                            value={values.firstName}
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Admin First Name"
                            error={Boolean(
                              touched.firstName && errors.firstName
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(values?.firstName)}
                          <FormHelperText error className={classes.errorClass}>
                            {touched.firstName && errors.firstName}
                          </FormHelperText>
                        </div>
                        <div>
                          <Typography variant="body1">
                            Admin Last Name
                          </Typography>
                          <TextField
                            name="lastName"
                            value={values.lastName}
                            error={Boolean(touched.lastName && errors.lastName)}
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 50 }}
                            variant="outlined"
                            placeholder="Enter Admin Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(values?.lastName)}
                          <FormHelperText error className={classes.errorClass}>
                            {touched.lastName && errors.lastName}
                          </FormHelperText>
                        </div>
                        <div>
                          <Typography variant="body1">
                            Account Admin Email
                          </Typography>
                          <TextField
                            value={values.email}
                            name="email"
                            inputProps={{ maxLength: 254 }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Account Admin Email Address"
                            error={Boolean(touched.email && errors.email)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(values?.email)}
                          <FormHelperText error className={classes.errorClass}>
                            {touched.email && errors.email}
                          </FormHelperText>
                        </div>
                        <div>
                          <Typography
                            variant="body1"
                            style={{ marginBottom: "5px" }}
                          >
                            Account Admin Phone
                          </Typography>
                          <FormControl
                            name="phoneNo"
                            fullWidth
                            margin="normal"
                            error={touched.phoneNo && !!errors.phoneNo}
                          >
                            <PhoneInput
                              onBlur={(e) => {
                                handleBlur(e);
                                setFieldTouched("phoneNo", true);
                              }}
                              value={values.phoneNo}
                              inputProps={{ maxLength: 20 }}
                              variant="outlined"
                              placeholder="Enter your phone number"
                              onChange={(value, countryData) => {
                                const formattedPhone = value.startsWith("+")
                                  ? value
                                  : `+${value}`;
                                setFieldValue("phoneNo", formattedPhone);
                                setSelectedCountry(
                                  countryData.countryCode.toUpperCase()
                                );
                              }}
                              defaultCountry={values.country}
                              country={values.country.toLowerCase()}
                              inputStyle={{
                                width: "100%",
                                height: "45px",
                                marginTop: "0px",
                                fontWeight: "normal",
                                border: "1px solid #e7e7e7",
                              }}
                            />
                          </FormControl>
                          <FormHelperText error className={classes.errorClass}>
                            {touched.phoneNo && errors.phoneNo}
                          </FormHelperText>
                        </div>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    lg={12}
                    style={{ paddingTop: "40px" }}
                  >
                    <Box className={classes.headingBox}>
                      <Typography variant="h5">Account Logo</Typography>
                    </Box>
                    <Box style={{ border: " 1px solid #E7E7E7" }}>
                      <Box
                        className={classes.innerbox}
                        style={{ border: "none" }}
                      >
                        <Typography
                          variant="body1"
                          sytyle={{ marginBottom: "5px" }}
                        >
                          Upload Logo{" "}
                        </Typography>
                        {/* <Field name="accountLogo">
                          {({ field, form }) => ( */}
                        <TextField
                          variant="outlined"
                          name="accountLogo"
                          value={accountLogo}
                          disabled={true}
                          placeholder="Upload Account Logo"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button
                                  className="editbuttonimage"
                                  onClick={handleOpenDialog}
                                >
                                  {accountLogo
                                    ? "Uploaded Logo"
                                    : "Upload Logo"}
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                        {console.log(
                          "values?.accountLogo",
                          values?.accountLogo
                        )}
                        <FormHelperText error>
                          {touched.accountLogo && errors.accountLogo}
                        </FormHelperText>

                        {openCrop ? (
                          <Dialog open={open} className={classes.mainDialog}>
                            <IconButton onClick={handleCloseDialog}>
                              {/* <CloseIcon className="closeicon" /> */}
                            </IconButton>

                            <Typography
                              variant="body1"
                              className={classes.dialogHeading}
                            >
                              Profile Image
                            </Typography>
                            <CropEasyProfile
                              photoURL={accountLogo}
                              type={false} // Adjust as needed
                              setOpenCrop={setOpenCrop}
                              setPhotoURL={setPhotoURL}
                              setUploadedImage={setAccountlogo}
                              setErrors={() => {}}
                            />
                          </Dialog>
                        ) : (
                          <Dialog
                            open={open}
                            onClose={handleCloseDialog}
                            className={classes.mainDialog}
                          >
                            <Box className={classes.CrossIcon}>
                              {accountLogo && (
                                <IconButton onClick={handleCloseDialog}>
                                  <CloseIcon className="closeicon" />
                                </IconButton>
                              )}
                            </Box>
                            <Typography
                              variant="body1"
                              className={classes.dialogHeading}
                            >
                              Upload Account Logo
                            </Typography>
                            {accountLogo ? (
                              <img
                                src={accountLogo}
                                alt="Preview"
                                style={{
                                  width: "100%",
                                  maxHeight: "300px",
                                  aspectRatio: "1.9",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              <Box className={classes.dialogBtnBox}>
                                <Typography
                                  variant="body1"
                                  className="dialogTypo"
                                >
                                  Click to upload logo from the device.
                                </Typography>
                                <input
                                  type="file"
                                  accept="image/jpeg, image/png,image/jpg"
                                  // onChange={handleFileUpload}
                                  onChange={(e) => {
                                    handleFileUpload(e, setFieldValue);
                                    setOpenCrop(true);
                                  }}
                                  style={{ display: "none" }}
                                  id="upload-input"
                                />
                                <label htmlFor="upload-input">
                                  <Button
                                    component="span"
                                    className="btnUpload"
                                  >
                                    Upload
                                  </Button>
                                </label>
                              </Box>
                            )}
                            {accountlogoUpload ? (
                              <Box className={classes.btnConatainer}>
                                <Button
                                  onClick={handleCloseDialog}
                                  className="btnCancel"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className={`${
                                    !accountLogo ? "savebtnDisables" : "savebtn"
                                  }`}
                                  onClick={handleEditAccontLogo}
                                  disabled={!accountLogo}
                                >
                                  {loading === false ? (
                                    "Edit"
                                  ) : (
                                    <ButtonCircularProgress />
                                  )}
                                </Button>
                              </Box>
                            ) : (
                              <Box className={classes.btnConatainer}>
                                <Button
                                  onClick={handleCloseDialog}
                                  className="btnCancel"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleSaveAccontLogo}
                                  disabled={!accountLogo}
                                  className={`${
                                    !accountLogo ? "savebtnDisables" : "savebtn"
                                  }`}
                                >
                                  {loading === false ? (
                                    "Save"
                                  ) : (
                                    <ButtonCircularProgress />
                                  )}
                                </Button>
                              </Box>
                            )}
                          </Dialog>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    lg={12}
                    style={{ paddingTop: "40px" }}
                  >
                    <Box className={classes.headingBox}>
                      <Typography variant="h5">Account Details</Typography>
                    </Box>
                    <Box className={classes.innerbox}>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "8px" }}
                      >
                        Primary Color
                      </Typography>

                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">RGB</Typography>
                          <Field name="primaryRgb">
                            {({ field, form }) => (
                              <>
                                <TextField
                                  {...field}
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  placeholder="Enter Your RGB Color"
                                  error={
                                    form.touched.primaryRgb &&
                                    Boolean(form.errors.primaryRgb)
                                  }
                                  helperText={
                                    form.touched.primaryRgb &&
                                    form.errors.primaryRgb
                                      ? form.errors.primaryRgb
                                      : ""
                                  }
                                  onClick={() => {
                                    setShowColorPicker(true);
                                    setTempColor(field.value);
                                  }}
                                  value={rgbValue || ""}
                                  onChange={(event) =>
                                    handleRgbChange(event, form)
                                  }
                                />
                                <Modal
                                  open={showColorPicker}
                                  // onClose={handleCancelColor}
                                  aria-labelledby="color-picker-modal"
                                >
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 400,
                                      borderRadius: 4,
                                    }}
                                  >
                                    <SketchPicker
                                      className={classes.colorpicker}
                                      color={currentColor}
                                      onChange={(color) =>
                                        setCurrentColor(color.rgb)
                                      }
                                    />
                                    <div className={classes.colorpickerbtndiv}>
                                      <Button
                                        onClick={() => handleSaveColor(form)}
                                        variant="outlined"
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        onClick={handleCancelColor}
                                        variant="contained"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </Box>
                                </Modal>
                              </>
                            )}
                          </Field>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">HEX</Typography>
                          <TextField
                            name="primaryHex"
                            fullWidth
                            disabled
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Your HEX Color"
                            value={hexValue || ""}
                          />
                        </Grid>
                      </Grid>

                      <Typography
                        variant="body1"
                        style={{ marginBottom: "8px" }}
                      >
                        Secondary Color
                      </Typography>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body">RGB</Typography>
                          <Field name="secondaryRgb">
                            {({ field, form }) => (
                              <>
                                <TextField
                                  {...field}
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  placeholder="Enter Your RGB Color"
                                  error={
                                    form.touched.secondaryRgb &&
                                    Boolean(form.errors.secondaryRgb)
                                  }
                                  helperText={
                                    form.touched.secondaryRgb &&
                                    form.errors.secondaryRgb
                                      ? form.errors.secondaryRgb
                                      : ""
                                  }
                                  onClick={() => {
                                    setShowColorPickerSecondary(true);
                                    setTempColorSecondary(field.value);
                                  }}
                                  onBlur={() => {
                                    form.setFieldTouched("secondaryRgb", true);
                                  }}
                                  value={rgbValuesecondary || ""}
                                  onChange={(event) =>
                                    handleRgbChange(event, form)
                                  }
                                />
                                <Modal
                                  open={showColorPickerSecondary}
                                  // onClose={handleCancelColor}
                                  aria-labelledby="color-picker-modal"
                                >
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      bgcolor: "background.paper",
                                      boxShadow: 24,
                                      p: 4,
                                      maxWidth: 400,
                                      borderRadius: 4,
                                    }}
                                  >
                                    <SketchPicker
                                      className={classes.colorpicker}
                                      color={currentColorsecondary}
                                      onChange={(color) =>
                                        setCurrentColorSecondary(color.rgb)
                                      }
                                    />
                                    <div className={classes.colorpickerbtndiv}>
                                      <Button
                                        onClick={() =>
                                          handleSaveColorSecondary(form)
                                        }
                                        variant="outlined"
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        onClick={handleCancelColor}
                                        variant="contained"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </Box>
                                </Modal>
                              </>
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">HEX</Typography>
                          <TextField
                            name="secondaryHex"
                            disabled
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Your HEX Color"
                            value={hexValuesecondary || ""}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6} style={{ paddingTop: "0px" }}>
                          <Typography variant="body1">Book Demo URL</Typography>
                          <TextField
                            name="bookDemoButton"
                            value={values.bookDemoButton}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Link"
                            error={Boolean(
                              touched.bookDemoButton && errors.bookDemoButton
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(
                            values?.bookDemoButton,
                            "bookDemoButton"
                          )}
                          <FormHelperText error className={classes.errorClass}>
                            {touched.bookDemoButton && errors.bookDemoButton}
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} style={{ paddingTop: "0px" }}>
                          <Typography variant="body1">Redirect Link</Typography>
                          <TextField
                            name="redirectLinks"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Link"
                            error={Boolean(
                              touched.redirectLinks && errors.redirectLinks
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(
                            values?.redirectLinks,
                            "redirectLinksredirectLinks"
                          )}
                          <FormHelperText error className={classes.errorClass}>
                            {touched.redirectLinks && errors.redirectLinks}
                          </FormHelperText>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                lg={6}
                className={classes.contractdetailsGrid}
              >
                <Box className={classes.headingBox}>
                  <Typography variant="h5">Contract Details</Typography>
                </Box>
                <Box className={classes.innerbox}>
                  <div>
                    <Typography variant="body1">Customer Type</Typography>
                    <FormControl style={{ marginTop: "0px" }}>
                      <Select
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        MenuProps={menuProps}
                        value={selectedcustomerType}
                        onChange={handlecustomerType}
                        IconComponent={ExpandMoreIcon}
                        renderValue={(selected) => {
                          const selectedCategory = customerType.find(
                            (category) => category?.category_Name === selected
                          );
                          return (
                            <div
                              style={{
                                color: selectedCategory ? "#000" : "#A2A2A2",
                              }}
                            >
                              {selectedCategory?.category_Name ||
                                "Select Category"}
                            </div>
                          );
                        }}
                      >
                        <MenuItem value=" " style={{ color: "gray" }}>
                          Select Customer Type
                        </MenuItem>

                        {/* Newly added options */}
                        {customerType
                          ?.filter(
                            (data) =>
                              ![
                                "Startup",
                                "ENT",
                                "MM",
                                "SMB",
                              ].includes(data?.category_Name)
                          )
                          .map((data, i) => (
                            <MenuItem
                              divider
                              key={i}
                              style={{
                                color: "#000",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                              value={data?.category_Name}
                              name={data?.category_Name}
                            >
                              {data?.category_Name}
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  deleteCategory(data?._id, data?.category_Name)
                                }
                                disabled={loading}
                                style={{ marginRight: "20px" }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </MenuItem>
                          ))}

                        {/* Predefined options */}
                        {customerType
                          ?.filter((data) =>
                            [
                              "Startup",
                              "ENT",
                              "MM",
                              "SMB",
                            ].includes(data?.category_Name)
                          )
                          .map((data, i) => (
                            <MenuItem
                              divider
                              key={i}
                              style={{
                                color: "#000",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                              value={data?.category_Name}
                              name={data?.category_Name}
                            >
                              {data?.category_Name}
                            </MenuItem>
                          ))}

                        <MenuItem
                          style={{ color: "#0358AC", fontWeight: "bold" }}
                          onClick={() => setIsDialogOpen(true)}
                        >
                          + Add New Customer Type
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <Typography variant="body1">Contracted Users </Typography>
                    {/* <Field name="contractedUsers">
                      {({ field }) => ( */}
                    <TextField
                      name="contractedUsers"
                      className={classes.contractedUser}
                      fullWidth
                      // type="number"
                      // inputProps={{ maxLength: 4 }}
                      margin="normal"
                      variant="outlined"
                      placeholder="00"
                      error={Boolean(
                        touched.contractedUsers && errors.contractedUsers
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {console.log(values?.contractedUsers)}
                    <FormHelperText error className={classes.errorClass}>
                      {touched.contractedUsers && errors.contractedUsers}
                    </FormHelperText>
                  </div>
                  <div>
                    <Typography variant="body1">Media Credits</Typography>
                    <TextField
                      name="mediaCredits"
                      className={classes.mediaCredits}
                      fullWidth
                      // inputProps={{ maxLength: 4 }}
                      margin="normal"
                      variant="outlined"
                      placeholder="00"
                      error={Boolean(
                        touched.mediaCredits && errors.mediaCredits
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {console.log(values?.mediaCredits)}
                    <FormHelperText error className={classes.errorClass}>
                      {touched.mediaCredits && errors.mediaCredits}
                    </FormHelperText>
                  </div>
                  <div>
                    <Typography variant="body1">Active Media Limit</Typography>
                    <TextField
                      name="activeMediaLimits"
                      className={classes.activeMediaLimits}
                      fullWidth
                      margin="normal"
                      // inputProps={{ maxLength: 4 }}
                      variant="outlined"
                      placeholder="00"
                      error={Boolean(
                        touched.activeMediaLimits && errors.activeMediaLimits
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {console.log(values?.activeMediaLimits)}
                    <FormHelperText error className={classes.errorClass}>
                      {touched.activeMediaLimits && errors.activeMediaLimits}
                    </FormHelperText>
                  </div>
                </Box>

                {accountContract?.name ? (
                  <Box className={classes.ContractDetails}>
                    <Box className={classes.headingBox}>
                      <Typography variant="h5">View Contract</Typography>
                    </Box>
                    <TextField
                      variant="outlined"
                      value={accountContract?.name}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <>
                              <DeleteIcon
                                onClick={handleDeleteButtonClick}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />

                              <Button
                                className="editbuttonimage"
                                onClick={handleViewAgreement}
                              >
                                View Contract
                              </Button>
                            </>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                ) : (
                  <Box className={classes.contractbtn}>
                    <input
                      name="contractFile"
                      type="file"
                      id="contract-upload"
                      className={classes.hiddenInput}
                      // onChange={handleContractUpload}
                      onChange={(event) =>
                        handleContractUpload(event, setFieldValue)
                      }
                      ref={fileInputRef}
                      accept=".pdf"
                      error={Boolean(
                        touched.contractFile && errors.contractFile
                      )}
                    />
                    {console.log(values?.contractFile)}
                    <Button
                      variant="contained"
                      onClick={handleUploadButtonClick}
                      disabled={loading}
                      style={{ marginTop: "8px", marginBottom: "8px" }}
                    >
                      Upload Contract
                    </Button>
                    <FormHelperText error className={classes.errorClass}>
                      {touched.contractFile && errors.contractFile}
                    </FormHelperText>
                  </Box>
                )}

                <Box className={classes.sendcancelbtn}>
                  <Button
                    variant="contained"
                    style={{ height: "48px" }}
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="button"
                    type="submit"
                    // disabled={!isValid || !dirty}
                    variant="outlined"
                  >
                    {loading === false ? (
                      " Create & Send Invite to New Admin"
                    ) : (
                      <ButtonCircularProgress />
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          formik.resetForm();
        }}
        aria-labelledby="add-category-dialog-title"
        aria-describedby="add-category-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          id="add-category-dialog-title"
          style={{
            color: "rgb(3, 88, 172)",
            padding: "36px 24px 8px 24px",
            fontWeight: "bold",
          }}
        >
          Add New Category
          <IconButton
            aria-label="close"
            onClick={() => {
              setIsDialogOpen(false);
              formik.resetForm();
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "gray",
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              placeholder="Enter Category"
              variant="outlined"
              fullWidth
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="dense"
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              inputProps={{ maxLength: 26 }}
            />
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "18px 24px",
              }}
              className={classes.dialogebtn}
            >
              <Button
                className="savebtnDisables"
                onClick={() => {
                  setIsDialogOpen(false);
                  formik.resetForm();
                }}
                variant="outlined"
                // color="secondary"
                style={{ marginRight: "8px" }}
              >
                Cancel
              </Button>
              <Button
                className={`${
                  !formik.isValid || !formik.dirty
                    ? "savebtnDisables"
                    : "savebtn"
                }`}
                type="submit"
                variant="contained"
                // color="primary"
                disabled={!formik.isValid || !formik.dirty} // Disable button if form is invalid or untouched
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAccount;
