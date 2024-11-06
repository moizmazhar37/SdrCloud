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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { menuProps } from "src/utils";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { SketchPicker } from "react-color";
import { useLocation } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
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
      backgroundColor: "#0358AC",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500 !important",
      height: "48px",
      width: "100%",

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
      // marginTop: "-21px",
      // marginRight: "-17px",
      marginTop: "-45px",
      marginRight: "-35px",
      padding: "6px",
      cursor: "pointer",
    },
    "& .MuiIconButton-root": {
      position: "absolute",
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

const ViewAccount = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [ppuserlist, setppUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(" ");
  const [selectedPPAdmin, setSelectedPPAdmin] = useState(" ");
  const [selectedcustomerType, setSelectedCustomerType] = useState(" ");
  const [accountLogo, setAccountlogo] = useState(null);
  console.log("accountLogo", accountLogo);
  const [accountlogoUpload, setAccountLogoUpload] = useState(null);
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
  const [newAccount, setNewAccount] = useState({
    accountId: accountId,
    accountName: "",
    accountPhone: "",
    packageName: "",
    contractedDate: " ",
    contractTerm: " ",
    contractendDate: " ",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    contractedUsers: "",
    mediaCredits: "",
    activeMediaLimits: "",
    bookDemo: "",
    userId: localStorage.getItem("_id"),
    redirectLinks: "",
    primaryRgb: "",
    primaryHex: "",
    secondaryHex: "",
    secondaryRgb: "",
    redirectLinks: "",
    bookDemoButton: "",
    redirectLink: "",
    contractPdf: "",
    roleStatus: "SUBADMIN",
    ppAdmin: "",
    customerType: "",
  });
  console.log(newAccount, "jsdsajj");

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
        // toast.success("User detail fetched successfullly!!");
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
        let ppAdmin = res?.data;
        let secondaryValue = res?.data?.data?.secondaryRGB;
        let PrimaryHex = res?.data?.data?.primaryHex;
        let SecondaryHex = res?.data?.data?.secondaryHex;
        let primaryValue = res?.data?.data?.primaryRGB;
        let AccountContract = res?.data?.data?.contractPdf;
        let Accountlogo = res?.data?.data?.accountLogo;
        console.log("accountLogoaccountLogo", res?.data?.data?.accountLogo);
        setAccountlogo(Accountlogo);
        setRgbValueSecondary(secondaryValue);
        setHexValueSecondary(SecondaryHex);
        setRgbValue(primaryValue);
        setHexValue(PrimaryHex);
        setAccountContract(AccountContract);
        setSelectedPPAdmin(ppAdmin?.data?.ppAdmin);
        setNewAccount(res?.data?.data);

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

  useEffect(() => {
    getPPUserList();
    getDatabyAccountId();
  }, [selectedUser]);

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setNewAccount((prevState) => ({
      ...prevState,
      ppAdmin: selectedUserId,
    }));
  };

  const handlecustomerType = (event) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomerType(selectedCustomerId);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAccountLogoName(file?.name);

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setAccountlogo(event.target.result);
      };

      reader.readAsDataURL(file);
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
          {/* <Link color="inherit" href="/PP-create"> */}
          <Typography className="breadCrumbText">
            View Account Details
          </Typography>
          {/* </Link> */}
        </Breadcrumbs>
      </Box>

      <Formik
        initialValues={newAccount}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
                      inputProps={{ maxLength: 60 }}
                      disabled={true}
                      variant="outlined"
                      placeholder="Enter Account Name"
                      value={newAccount.accountName}
                    />
                  </div>
                  <div>
                    <Typography variant="body1" style={{ marginBottom: "5px" }}>
                      Account Phone
                    </Typography>
                    <PhoneInput
                      name="accountPhone"
                      fullWidth
                      inputProps={{ maxLength: 20 }}
                      margin="normal"
                      variant="outlined"
                      disabled={true}
                      placeholder="+1 (___) __ __ ___"
                      defaultCountry="US"
                      country={"us"}
                      inputStyle={{
                        width: "100%",
                        height: "45px",
                        marginTop: "0px",
                        fontWeight: "normal",
                        border: "1px solid #e7e7e7",
                      }}
                      value={newAccount.accountPhone}
                    />
                  </div>
                  <div>
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
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
                      fullWidth
                      inputProps={{ maxLength: 60 }}
                      margin="normal"
                      variant="outlined"
                      disabled={true}
                      placeholder="Enter Package Name"
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
                        border: " 1px solid #E7E7E7",
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
                            disabled={true}
                            inputProps={{ maxLength: 31 }}
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Admin First Name"
                            value={newAccount.firstName}
                          />
                        </div>
                        <div>
                          <Typography variant="body1">
                            Admin Last Name
                          </Typography>
                          <TextField
                            name="lastName"
                            value={newAccount.lastName}
                            disabled={true}
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 31 }}
                            variant="outlined"
                            placeholder="Enter Admin Last Name"
                          />
                        </div>
                        <div>
                          <Typography variant="body1">
                            Account Admin Email
                          </Typography>

                          <TextField
                            name="email"
                            value={newAccount.email}
                            disabled={true}
                            inputProps={{ maxLength: 257 }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Account Admin Email Address"
                          />
                        </div>
                        <div>
                          <Typography
                            variant="body1"
                            style={{ marginBottom: "5px" }}
                          >
                            Account Admin Phone
                          </Typography>
                          <PhoneInput
                            name="phoneNo"
                            value={newAccount.phoneNo}
                            fullWidth
                            disabled={true}
                            inputProps={{ maxLength: 20 }}
                            margin="normal"
                            variant="outlined"
                            placeholder="+1 (___) __ __ ___"
                            defaultCountry="US"
                            country={"us"}
                            inputStyle={{
                              width: "100%",
                              height: "45px",
                              marginTop: "0px",
                              fontWeight: "normal",
                              border: "1px solid #e7e7e7",
                            }}
                          />
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
                    <Box
                      style={{
                        border: " 1px solid #E7E7E7",
                      }}
                    >
                      <Box
                        className={classes.innerbox}
                        style={{ border: "none" }}
                      >
                        <Typography variant="body1">Upload Logo</Typography>
                        <TextField
                          variant="outlined"
                          value={newAccount.accountLogo}
                          disabled={true} // If you want the text field to be editable, set this to false
                          placeholder="SDRCloud.ai.456765.jpg"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button
                                  className="editbuttonimage" // You can define styles for this class in your CSS
                                  onClick={handleOpenDialog} // Define this function to handle button clicks
                                >
                                  View
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
                          <TextField
                            fullWidth
                            name="primaryRgb"
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                            value={rgbValue || ""}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">HEX</Typography>

                          <TextField
                            name="primaryHex"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            disabled={true}
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
                          <Typography variant="body1">RGB</Typography>
                          <TextField
                            name="secondaryRgb"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                            value={rgbValuesecondary || ""}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">HEX</Typography>
                          <TextField
                            name="secondaryHex"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                            placeholder="Enter Your HEX Color"
                            value={hexValuesecondary || ""}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6} style={{ paddingTop: "0px" }}>
                          <Typography variant="body1">Book Demo URL</Typography>

                          <TextField
                            name="bookDemo"
                            fullWidth
                            margin="normal"
                            disabled={true}
                            variant="outlined"
                            placeholder="Enter Link"
                            value={newAccount.bookDemo}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} style={{ paddingTop: "0px" }}>
                          <Typography variant="body1">Redirect Link</Typography>

                          <TextField
                            name="redirectLink"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                            placeholder="Enter Link"
                            value={newAccount.redirectLink}
                          />
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
                    <TextField
                      name="contractedUsers"
                      className={classes.contractedUser}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      disabled={true}
                      value={newAccount.contractedUsers}
                    />
                  </div>
                  <div>
                    <Typography variant="body1">Media Credits</Typography>
                    <TextField
                      name="mediaCredits"
                      className={classes.mediaCredits}
                      fullWidth
                      inputProps={{ maxLength: 6 }}
                      margin="normal"
                      variant="outlined"
                      disabled={true}
                      value={newAccount.mediaCredits}
                    />
                  </div>
                  <div>
                    <Typography variant="body1">Active Media Limit</Typography>

                    <TextField
                      name="activeMediaLimits"
                      className={classes.activeMediaLimits}
                      fullWidth
                      margin="normal"
                      inputProps={{ maxLength: 6 }}
                      variant="outlined"
                      disabled={true}
                      value={newAccount.activeMediaLimits}
                    />
                  </div>
                </Box>

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
                <Box className={classes.sendcancelbtn}>
                  <Button
                    variant="contained"
                    fullwidth
                    onClick={() => history.goBack()}
                  >
                    Back
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
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
        <Typography variant="body1" className={classes.dialogHeading}>
          View account Logo
        </Typography>

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

        <Box className={classes.btnConatainer}></Box>
      </Dialog>
    </>
  );
};

export default ViewAccount;
