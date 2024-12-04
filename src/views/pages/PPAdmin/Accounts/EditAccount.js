/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
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
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect } from "react";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { menuProps } from "src/utils";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { SketchPicker } from "react-color";
import { useLocation } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import FullScreenLoader from "src/component/FullScreenLoader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CropEasyCompanyLogo from "../../CreateVideo/Crop/CropEasyCompanyLogo";
// Styles for the component

const useStyles = makeStyles((theme) => ({
  innerbox: {
    border: "1px solid #E7E7E7",
    padding: "16px 24px 16px 24px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .MuiFormControl-marginNormal": {
      marginTop: "6px",
      marginBottom: "16px",
    },
    "& .MuiTypography-body1": {
      color: "#152F40",
      fontWeight: 400,
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
      },
      "& .MuiSelect-icon": {
        top: 0,
        height: "40px",
        paddingLeft: "8px",
        color: "#152F40",
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
      // height: "48px",
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
      height: "62px",
      cursor: "pointer",
    },

    "& .button:disabled": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      borderRadius: "6px",
      cursor: "not-allowed",
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
  uploadImage: {
    display: "flex",
    justifyContent: "space-between",
    "& .closeicon": {
      width: "24px",
      height: "24px",
      border: "1px solid #ECECEC",
      background: "#FFFFFF",
      borderRadius: "50%",
      position: "fixed",
      marginTop: "55px",
      marginRight: "49px",
      padding: "6px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        marginTop: "23px",
        marginRight: "49px",
      },
    },
  },
  dialogHeading: {
    padding: "24px 24px",
    color: "#152F40",
    fontSize: "18px",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      padding: "15px 15px",
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
      backgroundColor: "#F4F4F4",
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
}));

const EditAccount = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const accountNameErrorMessage =
    "Account name is required and must be between 3 and 100 characters, containing only alphabetic, alphanumeric or special characters.";
  const accountPhoneErrorMessage =
    "A valid account phone number is required, including the country code.";

  const accountFirstName =
    "Admin first name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters.";

  const accountLastName =
    "Admin last name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters.";
  const phoneNo =
    "A valid account admin phone number is required, including the country code.";
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

    accountPhone: Yup.string()
      .required(accountPhoneErrorMessage)
      .test("is-valid-phone", accountPhoneErrorMessage, function (value) {
        if (typeof value !== "string") return false;
        const phoneNumber = parsePhoneNumberFromString(value, selectedCountry);
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .max(20, accountPhoneErrorMessage),

    packageName: Yup.string()
      .min(2, "Minimum 2 character required.")
      .max(60, "Maximum 60 characters are allowed.")
      .matches(
        /^[A-Za-z]+(\s[A-Za-z]+)*$/,
        "Package name should only contain alphabetic characters."
      ),
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
      // .required("Please enter your email address.")
      .max(254, "A valid email address is required (e.g., user@example.com).")
      .matches(
        // /^(?!.*\.\.)(?!.*[@.]$)[a-zA-Z0-9][a-zA-Z0-9._+-]{0,252}@(?=[^.]*[A-Za-z])[a-zA-Z0-9-]{2,63}\.[a-zA-Z]{2,63}$/,
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,254}$/,
        "A valid email address is required (e.g., user@example.com)."
      ),
    phoneNo: Yup.string()
      .required(phoneNo)
      .test("is-valid-phone", phoneNo, function (value) {
        if (typeof value !== "string") return false;
        const phoneNumber = parsePhoneNumberFromString(value, selectedCountry);
        return phoneNumber ? phoneNumber.isValid() : false;
      })
      .max(20, phoneNo),
    bookDemo: Yup.string()
      .required("A valid URL is required (e.g., https://example.com).")
      .matches(
        /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:\d+)?(\/.*)?$/,
        "A valid URL is required (e.g., https://example.com)."
      ),
    redirectLink: Yup.string()
      .required("A valid URL is required (e.g., https://example.com).")
      .matches(
        /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:\d+)?(\/.*)?$/,
        "A valid URL is required (e.g., https://example.com)."
      ),
  });
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [ppuserlist, setppUserList] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [selectedPPAdmin, setSelectedPPAdmin] = useState(" ");
  const [selectedcustomerType, setSelectedCustomerType] = useState(" ");
  const [accountLogo, setAccountlogo] = useState(null);
  const [accountLogoName, setAccountLogoName] = useState(null);
  const [accountContract, setAccountContract] = useState(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [agreementUrl, setAgreementUrl] = useState("");
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
  const location = useLocation();
  const { accountId } = location.state;
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [newAccount, setNewAccount] = useState({
    accountId: accountId,
    accountName: "",
    accountPhone: "",
    packageName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    userId: localStorage.getItem("_id"),
    redirectLink: "",
    bookDemo: "",
    contractPdf: "",
    roleStatus: "SUBADMIN",
    ppAdmin: "",
    customerType: "",
  });
  console.log("newAccountnewAccount", newAccount);
  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setNewAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [isImageChanged, setIsImageChanged] = useState(false);
  const getDatabyAccountId = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.viewAccount,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          accountId: accountId,
        },
      });

      if (res?.status === 200) {
        const accountData = res?.data?.data;
        let ppAdmin = res?.data;
        let secondaryValue = res?.data?.data?.secondaryRGB;
        let PrimaryHex = res?.data?.data?.primaryHex;
        let SecondaryHex = res?.data?.data?.secondaryHex;
        let primaryValue = res?.data?.data?.primaryRGB;
        let AccountContract = res?.data?.data?.contractPdf;
        let accountLogo = res?.data?.data?.accountLogo;
        setAccountlogo(accountLogo);
        setRgbValueSecondary(secondaryValue);
        setHexValueSecondary(SecondaryHex);
        setRgbValue(primaryValue);
        setHexValue(PrimaryHex);
        setAccountContract(AccountContract);
        setSelectedPPAdmin(ppAdmin?.data?.ppAdmin);
        setNewAccount(accountData);
        setNewAccount((prevState) => ({
          ...prevState,
          secondaryRgb: secondaryValue,
        }));

        setNewAccount((prevState) => ({
          ...prevState,
          primaryRgb: primaryValue,
        }));

        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(error?.message);

      console.log(error, "error");
    } finally {
      setLoading(false);
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
        // params: {
        //   page: 0,
        //   pageSize: 10,
        // },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        console.log(res?.data?.data?.ppAdminList);
        setppUserList(res?.data?.data?.ppAdminList);
      } else if (res?.data?.status === 205) {
        toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        toast.success(res?.message);
        setCustomerType(res?.data);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateData = async (values, resetForm) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.editAccount,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          accountId: accountId,
          accountName: values.accountName,
          accountPhoneNo: values.accountPhone,
          bookDemoButton: values.bookDemo,
          redirectLinks: values.redirectLink,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNo: values.phoneNo,
          // companyUrl: values.companyURL,
          primaryRgb: rgbValue,
          primaryHex: hexValue,
          secondaryRgb: rgbValuesecondary,
          secondaryHex: hexValuesecondary,
          map: {
            IMAGE: photoURL ? photoURL : "",
          },
        },
      });
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        await getDatabyAccountId();
        setLoading(false);
        resetForm();
        history.push({
          // pathname: "/Edit-PP-createaccount",
          state: { accountId },
        });
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPPUserList();
    getDatabyAccountId();
    getCustomerType();
  }, []);

  // const handleUserChange = (event) => {
  //   const selectedUserId = event.target.value;
  //   setNewAccount((prevState) => ({
  //     ...prevState,
  //     ppAdmin: selectedUserId,
  //   }));
  // };

  const handlecustomerType = (event) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomerType(selectedCustomerId);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setIsImageChanged(false);
    setOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAccountLogoName(file?.name);

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setAccountlogo(event.target.result);
        setIsImageChanged(true);
        setOpenCrop(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSaveAccontLogo = (event) => {
    toast.success("Image uploaded successfully.");
    setOpen(false);
  };

  const handleContractUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        event.target.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        const blob = base64toBlob(base64String);
        const url = URL.createObjectURL(blob);
        setAccountContract({ name: file.name, base64: base64String, url: url });
      };
      reader.readAsDataURL(file);
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleViewAgreement = () => {
    const url = accountContract;
    setAgreementUrl(url);
    window.open(url, "_blank");
  };

  const formatDate = (dateString) => {
    // Check if dateString is a string and non-empty
    if (typeof dateString !== "string" || dateString.trim() === "") {
      return null; // Or any other default value or behavior you prefer
    }
    const [day, month, year] = dateString.split("/");
    const formattedDate = `${year}-${month}-${day}T00:00:00.000+0000`;
    return formattedDate;
  };

  const handleSaveColor = (form) => {
    // Save the color in RGB format
    const rgbString = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    form.setFieldValue("primaryRgb", rgbString);
    // Update the RGB and HEX values
    setRgbValue(rgbString);
    setNewAccount((prevState) => ({
      ...prevState,
      primaryRgb: rgbString,
    }));

    setHexValue(rgbToHex(currentColor));
    let newHexValue = rgbToHex(currentColor);

    setNewAccount((prevState) => ({
      ...prevState,
      primaryHex: newHexValue,
    }));

    setShowColorPicker(false);
  };

  const handleSaveColorSecondary = (form) => {
    const rgnStringsecond = `rgb(${currentColorsecondary.r}, ${currentColorsecondary.g}, ${currentColorsecondary.b})`;
    form.setFieldValue("secondaryRgb", rgnStringsecond);

    setRgbValueSecondary(rgnStringsecond);
    setNewAccount((prevState) => ({
      ...prevState,
      secondaryRgb: rgnStringsecond,
    }));

    setHexValueSecondary(rgbToHex(currentColorsecondary));
    let newshexvalue = rgbToHex(currentColorsecondary);
    setNewAccount((prevState) => ({
      ...prevState,
      secondaryHex: newshexvalue,
    }));
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

  const handleContractTermChange = (e) => {
    const term = e.target.value;
    let endDate = null;
    if (term === "1Month") {
      endDate = new Date(newAccount.contractedDate);
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (term === "1Year") {
      endDate = new Date(newAccount.contractedDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else if (term === "2Year") {
      endDate = new Date(newAccount.contractedDate);
      endDate.setFullYear(endDate.getFullYear() + 2);
    } else if (term === "4Year") {
      endDate = new Date(newAccount.contractedDate);
      endDate.setFullYear(endDate.getFullYear() + 4);
    }
    setNewAccount({
      ...newAccount,
      contractTerm: term,
      contractEndDate: endDate,
    });
  };
  //
  const handleRgbChange = (event) => {
    const { value } = event.target;
    setRgbValue(value);
    // Convert RGB to HEX and update hexValue
    const hex = rgbToHex(value); // Assuming you have a function to convert RGB to HEX
    setHexValue(hex);
    setNewAccount((prevState) => ({
      ...prevState,
      // primaryRgb: value,
      primaryHex: hex,
    }));
  };
  return (
    <>
      {loading && <FullScreenLoader />}
      <Box className={classes.breads}>
        <ArrowBackIcon
          style={{ color: "black", cursor: "pointer", fontSize: "large" }}
          onClick={() => {
            history.push("/PP-createaccount");
          }}
        />
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/PP-createaccount">
            Accounts&nbsp;
          </Link>

          <Typography className="breadCrumbText">
            Edit Account Details
          </Typography>
        </Breadcrumbs>
      </Box>

      <Formik
        initialValues={newAccount}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleUpdateData(values, resetForm);
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
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
            <Grid container spacing={10} style={{ paddingTop: "32px" }}>
              <Grid item md={6} sm={12} xs={12} lg={6}>
                <Box className={classes.headingBox}>
                  <Typography variant="h5">Account Details</Typography>
                </Box>
                <Box className={classes.innerbox}>
                  <div>
                    <Typography variant="body1">Account Name</Typography>
                    <TextField
                      name="accountName"
                      fullWidth
                      margin="normal"
                      inputProps={{ maxLength: 100 }}
                      variant="outlined"
                      placeholder="Enter Account Name"
                      error={Boolean(touched.accountName && errors.accountName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.accountName}
                    />
                    {console.log(
                      "values?.newAccount.accountName",
                      values.accountName
                    )}
                    {console.log("All values", values)}

                    <FormHelperText
                      error
                      style={{ fontSize: "12px", marginTop: ".3px" }}
                    >
                      {touched.accountName && errors.accountName}
                    </FormHelperText>
                  </div>
                  <div>
                    <Typography variant="body1" style={{ marginBottom: "5px" }}>
                      Account Phone
                    </Typography>
                    <FormControl
                      name="accountPhone"
                      fullWidth
                      margin="normal"
                      error={touched.accountPhone && !!errors.accountPhone}
                    >
                      <PhoneInput
                        onBlur={(e) => {
                          handleBlur(e);
                          setFieldTouched("accountPhone", true);
                        }}
                        value={values.accountPhone}
                        inputProps={{ maxLength: 20 }}
                        variant="outlined"
                        placeholder="Enter your phone number"
                        onChange={(value, countryData) => {
                          const formattedPhone = value.startsWith("+")
                            ? value
                            : `+${value}`;
                          setFieldValue("accountPhone", formattedPhone);
                          setSelectedCountry(
                            countryData.countryCode?.toUpperCase() || "US"
                          );
                        }}
                        defaultCountry={values?.country}
                        country={values?.country?.toLowerCase()}
                        inputStyle={{
                          width: "100%",
                          height: "45px",
                          marginTop: "0px",
                          fontWeight: "normal",
                          border: "1px solid #e7e7e7",
                        }}
                      />
                      {console.log("values?.newAccount", values.accountPhone)}
                      <FormHelperText error className={classes.helperText}>
                        {touched.accountPhone && errors.accountPhone}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    <Typography variant="body1">
                      Assigned SDRCloud.ai Admin to this Account
                    </Typography>
                    <FormControl style={{ marginTop: "0px" }}>
                      <TextField
                        disabled={true}
                        variant="outlined"
                        className="Accountadmins"
                        id="choose-template"
                        margin="normal"
                        MenuProps={menuProps}
                        value={newAccount.ppAdmin}
                        name="ppAdmin"
                        IconComponent={ExpandMoreIcon}
                      />
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
                      margin="normal"
                      variant="outlined"
                      disabled={true}
                      value={newAccount.packageName}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Typography variant="body1">Contract Date</Typography>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      format="DD/MM/YYYY"
                      placeholder="00/00/00"
                      autoOk
                      disabled={true}
                      fullWidth
                      value={newAccount.contractStartDate}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Typography variant="body1">Contract Term</Typography>

                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      disabled={true}
                      value={
                        newAccount.contractTerm
                          ? newAccount.contractTerm
                              .replace(/(\d)([A-Z])/g, "$1 $2")
                              .replace(/(\d) Year/, (match, p1) =>
                                p1 > 1 ? `${p1} Years` : `${p1} Year`
                              )
                          : ""
                      }
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <Typography variant="body1">Contract End Date</Typography>
                    <KeyboardDatePicker
                      inputVariant="outlined"
                      format="DD/MM/YYYY"
                      placeholder="00/00/00"
                      autoOk
                      fullWidth
                      disabled
                      value={newAccount.contractEndDate || null}
                    />
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
                      <Typography variant="h5">
                        Account Admin Details
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        border: "1px solid #E7E7E7",
                      }}
                    >
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
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Admin First Name"
                            value={values.firstName}
                            error={Boolean(
                              touched.firstName && errors.firstName
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(values?.firstName)}
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", marginTop: ".3px" }}
                          >
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
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 50 }}
                            variant="outlined"
                            placeholder="Enter Admin Last Name"
                            error={Boolean(touched.lastName && errors.lastName)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(values?.lastName)}
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", marginTop: ".3px" }}
                          >
                            {touched.lastName && errors.lastName}
                          </FormHelperText>
                        </div>
                        <div>
                          <Typography variant="body1">
                            Account Admin Email
                          </Typography>
                          <TextField
                            name="email"
                            value={values.email}
                            inputProps={{ maxLength: 254 }}
                            disabled={true}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Account Admin Email Address"
                            error={Boolean(touched.email && errors.email)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(values?.email)}
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", marginTop: ".3px" }}
                          >
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
                              inputProps={{ maxLength: 20 }}
                              variant="outlined"
                              value={values.phoneNo}
                              placeholder="Enter your phone number"
                              onChange={(value, countryData) => {
                                const formattedPhone = value.startsWith("+")
                                  ? value
                                  : `+${value}`;
                                setFieldValue("phoneNo", formattedPhone);
                                setSelectedCountry(
                                  countryData.countryCode?.toUpperCase() || "US"
                                );
                              }}
                              defaultCountry={values.country}
                              country={values?.country?.toLowerCase()}
                              inputStyle={{
                                width: "100%",
                                height: "45px",
                                marginTop: "0px",
                                fontWeight: "normal",
                                border: "1px solid #e7e7e7",
                              }}
                            />
                            {console.log("phoneNo", values.phoneNo)}
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.phoneNo && errors.phoneNo}
                            </FormHelperText>
                          </FormControl>
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
                      <Typography variant="h5">Create Account Admin</Typography>
                    </Box>
                    <Box
                      style={{
                        border: "1px solid #E7E7E7",
                        // borderRadius: "10px 10px 10px 10px",
                      }}
                    >
                      <Box
                        className={classes.innerbox}
                        style={{ border: "none" }}
                      >
                        <Typography variant="body1">Upload Logo </Typography>
                        <TextField
                          variant="outlined"
                          value={values.accountLogo}
                          placeholder="SDRCloud.ai.456765.jpg"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button
                                  className="editbuttonimage"
                                  onClick={handleOpenDialog}
                                >
                                  Edit Image
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
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
                                  // disabled={true}
                                  placeholder="Enter Your RGB Color"
                                  error={
                                    form.touched.primaryRgb &&
                                    form.errors.primaryRgb
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
                                  // value={newAccount.primaryRGB || ""}
                                  onChange={handleRgbChange}
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
                          <Field name="primaryHex">
                            {({ field, form }) => (
                              <TextField
                                {...field}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                // disabled={true}
                                placeholder="Enter Your HEX Color"
                                error={
                                  hexValue
                                    ? ""
                                    : form.touched.primaryHex &&
                                      form.errors.primaryHex
                                }
                                helperText={
                                  hexValue
                                    ? ""
                                    : form.touched.primaryHex &&
                                      form.errors.primaryHex
                                }
                                value={hexValue || ""}
                              />
                            )}
                          </Field>
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
                          <Typography variant="body1">RGB</Typography>
                          <Field name="secondaryRgb">
                            {({ field, form }) => (
                              <>
                                <TextField
                                  {...field}
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  // disabled={true}
                                  placeholder="Enter Your RGB Color"
                                  error={
                                    form.touched.secondaryRgb &&
                                    form.errors.secondaryRgb
                                  }
                                  helperText={
                                    form.touched.secondaryRgb &&
                                    form.errors.secondaryRgb
                                  }
                                  onClick={() => {
                                    setShowColorPickerSecondary(true);
                                    setTempColorSecondary(field.value);
                                  }}
                                  value={rgbValuesecondary || ""}
                                  // value={newAccount.secondaryRGB || ""}
                                  onChange={handleRgbChange}
                                />
                                <Modal
                                  open={showColorPickerSecondary}
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
                          <Field name="secondaryHex">
                            {({ field, form }) => (
                              <TextField
                                {...field}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                // disabled={true}
                                placeholder="Enter Your HEX Color"
                                error={
                                  hexValuesecondary
                                    ? " "
                                    : form.touched.secondaryHex &&
                                      form.errors.secondaryHex
                                }
                                helperText={
                                  hexValuesecondary
                                    ? " "
                                    : form.touched.secondaryHex &&
                                      form.errors.secondaryHex
                                }
                                value={hexValuesecondary || ""}
                              />
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6} style={{ paddingTop: "0px" }}>
                          <Typography variant="body1">Book Demo URL</Typography>
                          <TextField
                            name="bookDemo"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Link"
                            value={values.bookDemo}
                            error={Boolean(touched.bookDemo && errors.bookDemo)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(values?.bookDemo, "bookDemo")}
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", marginTop: ".3px" }}
                          >
                            {touched.bookDemo && errors.bookDemo}
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6} style={{ paddingTop: "0px" }}>
                          <Typography variant="body1">Redirect Link</Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="redirectLink"
                            margin="normal"
                            placeholder="Enter Link"
                            value={values.redirectLink}
                            error={Boolean(
                              touched.redirectLink && errors.redirectLink
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {console.log(
                            values?.redirectLink,
                            "redirectLinkredirectLink"
                          )}
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", marginTop: ".3px" }}
                          >
                            {touched.redirectLink && errors.redirectLink}
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
                    <TextField
                      className={classes.contractedUser}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      disabled={true}
                      value={newAccount.customerType}
                    />
                  </div>
                  <div>
                    <Typography variant="body1">Contracted Users </Typography>
                    <Field name="contractedUsers">
                      {({ field }) => (
                        <TextField
                          {...field}
                          className={classes.contractedUser}
                          fullWidth
                          inputProps={{ maxLength: 6 }}
                          margin="normal"
                          variant="outlined"
                          disabled={true}
                          placeholder="00"
                          error={
                            touched.contractedUsers && errors.contractedUsers
                          }
                          helperText={
                            touched.contractedUsers && errors.contractedUsers
                            //  ||
                            // (field.value.length > 5 && (
                            //   <span style={{ color: "#f44336" }}>
                            //     Maximum 5 digits allowed
                            //   </span>
                            // ))
                          }
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, "");
                            setFieldValue("contractedUsers", input);
                            setFieldTouched("contractedUsers", true);
                          }}
                          value={newAccount.contractedUsers}
                          onBlur={() =>
                            setFieldTouched("contractedUsers", true)
                          }
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Typography variant="body1">Media Credits</Typography>
                    <Field name="mediaCredits">
                      {({ field }) => (
                        <TextField
                          {...field}
                          className={classes.mediaCredits}
                          fullWidth
                          inputProps={{ maxLength: 6 }}
                          margin="normal"
                          variant="outlined"
                          disabled={true}
                          placeholder="00"
                          error={touched.mediaCredits && errors.mediaCredits}
                          helperText={
                            touched.mediaCredits && errors.mediaCredits
                            //   ||
                            // (field.value.length > 5 && (
                            //   <span style={{ color: "#f44336" }}>
                            //     Maximum 5 digits allowed
                            //   </span>
                            // ))
                          }
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, "");
                            setFieldValue("mediaCredits", input);
                            setFieldTouched("mediaCredits", true);
                          }}
                          value={newAccount.mediaCredits}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Typography variant="body1">Active Media Limit</Typography>
                    <Field name="activeMediaLimits">
                      {({ field }) => (
                        <TextField
                          {...field}
                          className={classes.activeMediaLimits}
                          fullWidth
                          margin="normal"
                          inputProps={{ maxLength: 6 }}
                          variant="outlined"
                          placeholder="00"
                          disabled={true}
                          error={
                            touched.activeMediaLimits &&
                            errors.activeMediaLimits
                          }
                          helperText={
                            touched.activeMediaLimits &&
                            errors.activeMediaLimits
                            //   ||
                            // (field.value.length > 5 && (
                            //   <span style={{ color: "#f44336" }}>
                            //     Maximum 5 digits allowed
                            //   </span>
                            // ))
                          }
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, "");
                            setFieldValue("activeMediaLimits", input);
                            setFieldTouched("activeMediaLimits", true);
                            setNewAccount({
                              ...newAccount,
                              activeMediaLimits: input,
                            });
                          }}
                          value={newAccount.activeMediaLimits}
                        />
                      )}
                    </Field>
                  </div>
                </Box>

                {accountContract && accountContract.length > 0 ? (
                  <Box className={classes.ContractDetails}>
                    <Box className={classes.headingBox}>
                      <Typography variant="h5">View Contract</Typography>
                    </Box>
                    <TextField
                      variant="outlined"
                      value={accountContract}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              className="editbuttonimage"
                              onClick={handleViewAgreement}
                            >
                              View Contract
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      disabled={true}
                    />
                  </Box>
                ) : (
                  <Box className={classes.contractbtn}>
                    <input
                      type="file"
                      id="contract-upload"
                      className={classes.hiddenInput}
                      onChange={handleContractUpload}
                      ref={fileInputRef}
                    />
                    <Button
                      variant="contained"
                      onClick={handleUploadButtonClick}
                    >
                      Upload Contract
                    </Button>
                  </Box>
                )}
                <Box className={classes.sendcancelbtn}>
                  <Button
                    variant="contained"
                    onClick={() => history.push("/PP-createaccount")}
                  >
                    Back
                  </Button>
                  <Button
                    className="button"
                    variant="outlined"
                    type="submit"
                    disabled={
                      !isValid
                      //  || !dirty
                    }
                  >
                    {loading === false ? (
                      " Update Account Admin Details"
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

      {openCrop ? (
        <Dialog open={open} className={classes.mainDialog}>
          <IconButton onClick={handleCloseDialog}>
            {/* <CloseIcon className="closeicon" /> */}
          </IconButton>

          <Typography variant="body1" className={classes.dialogHeading}>
            Account Logo
          </Typography>
          <CropEasyCompanyLogo
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
          <Box className={classes.uploadImage}>
            <Typography variant="body1" className={classes.dialogHeading}>
              Upload Account Logo
            </Typography>
          </Box>
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
            {/* <Button
            className="btnSave"
            onClick={handleSaveAccontLogo}
            disabled={!accountLogo}
          >
            {loading === false ? "Save" : <ButtonCircularProgress />}
          </Button> */}
            <Button
              onClick={() => {
                if (isImageChanged) {
                  toast.success("Image uploaded successfully.");
                  handleCloseDialog();
                } else {
                  setAccountlogo(null);
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

export default EditAccount;
