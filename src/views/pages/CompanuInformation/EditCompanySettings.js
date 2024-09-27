import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  TextField,
  FormHelperText,
  makeStyles,
  Button,
  Breadcrumbs,
  Modal,
  Dialog,
  IconButton,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import FullScreenLoader from "src/component/FullScreenLoader";
import { toast } from "react-toastify";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { SketchPicker } from "react-color";
import CloseIcon from "@material-ui/icons/Close";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CropEasyProfile from "../CreateVideo/Crop/CropEasyProfile";
// Styles for the component
const useStyles = makeStyles((theme) => ({
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
  editCompanySettingsContainer: {
    "& .breads": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
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
      justifyContent: "space-between",
      // gap: "90px",
      // "@media(max-width:960px)":{
      //   gap: '0px',
      // },
      "& .MuiGrid-item": {
        width: "100%",
        maxWidth: "634px",
        alignItems: "center",
      },

      "& .commonHeadingBox": {
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#F4F4F4",
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
      "& .contractpdf": {
        "& .MuiOutlinedInput-root": {
          border: "none !important",
        },
      },
      "& .commomInnerBox": {
        // padding: "16px 24px",
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
          "& .country-list": {
            background: "#FFF !important",
            "& .country.highlight": {
              background: "rgb(139 137 137 / 35%) !important",
            },
          },
        },

        "& .editableTextField": {
          marginTop: "5px",
          border: "1px solid grey",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "14px !important",
          color: "#152F40 !important",
          fontWeight: "500 !important",
        },
        "& .nonEditabletextField": {
          marginTop: "5px",
          marginBottom: "0px",
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
          width: "354px",
          margin: "2px 0 10px -6px",
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
}));

const EditCompanySettings = ({ settingRoute, handleClick }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedCompanyAdmin, setSelectedCompanyAdmin] = useState("");
  const [isEditing1, setEditing1] = useState(false);
  const [isEditing2, setEditing2] = useState(false);
  const [isEditing3, setEditing3] = useState(false);
  const [isEditing4, setEditing4] = useState(false);
  const [isEditing5, setEditing5] = useState(false);
  const [isEditing6, setEditing6] = useState(false);
  const [agreementUrl, setAgreementUrl] = useState("");

  const [accountContract, setAccountContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    AccountName: "Hubsopt",
    AccountPhone: "(937) 313-4466",
    PersonaProAdmin: "Jacob Marti",

    AdminFirstName: "Janet",
    AdminLastName: "Stevens",
    adminEmail: "JanetS@Hubspot.com",
    AccountAdminPhone: "(932) 759-7493",

    PrimaryColor: "RGB #000000",
    SecondaryColor: "RGB #FFFFFF",
    bookDemoButton: "www.calendly.com/jstevens",
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
  const [accountid, setAccountId] = useState(0);
  const [newCompanyAdminDialogOpen, setNewCompanyAdminDialogOpen] =
    useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [accountData, setAccountData] = useState("");

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPicker1, setShowColorPicker1] = useState(false);

  const [existcolor, setexistcolor] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("selectedImage: ", selectedImage);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const handleSaveColor = () => {
    setShowColorPicker(false);
  };

  const handleCancelColor = () => {
    setShowColorPicker(false);
  };
  const handleSaveColor1 = () => {
    setShowColorPicker1(false);
  };

  const handleCancelColor1 = () => {
    setShowColorPicker1(false);
  };
  const [hexValue, setHexValue] = useState(
    accountData?.accountDetails?.primaryHex
  );
  const [hexValue2, setHexValue2] = useState(
    accountData?.accountDetails?.secondaryHex
  );
  console.log("hexValue: ", hexValue);
  // Closes the new company admin dialog
  const handleDialogClose = () => {
    setNewCompanyAdminDialogOpen(false);
  };

  // Enables editing for section 1
  const handleEditClick1 = () => {
    setEditing1(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick1 = () => {
    setEditing1(false);
    putAccountData();
  };

  // Enables editing for section 2
  const handleEditClick2 = () => {
    setEditing2(true);
  };

  // Saves changes and disables editing for section 2
  const handleSaveClick2 = () => {
    setEditing2(false);
    putAccountData1();
  };

  // Enables editing for section 3
  const handleEditClick3 = () => {
    setEditing3(true);
  };

  // Saves changes and disables editing for section 3
  const handleSaveClick3 = () => {
    setEditing3(false);
    putAccountData2();
  };

  // Enables editing for section 4
  const handleEditClick4 = () => {
    setEditing4(true);
  };

  // Saves changes and disables editing for section 4
  const handleSaveClick4 = () => {
    setEditing4(false);
    putAccountData();
  };

  // Enables editing for section 5
  const handleEditClick5 = () => {
    setEditing5(true);
  };

  // Saves changes and disables editing for section 5
  const handleSaveClick5 = () => {
    setEditing5(false);
  };

  // Enables editing for section 6
  const handleEditClick6 = () => {
    setEditing6(true);
    setImageSelection(true);
  };

  // Saves changes and disables editing for section 6
  const handleSaveClick6 = () => {
    setEditing6(false);
    setImageSelection(false);
    putAccountData3();
  };

  // Handles the change event for image upload, setting the selected file name in state.
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setData({ ...data, UploadLogo: selectedFile.name });
  };

  // Handles the change event for agreement file upload, setting the selected file name in state.
  const handleUploadAgreement = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile ? selectedFile.name : "");
  };
  // Opens the agreement URL in a new browser tab.
  const handleViewAgreement = () => {
    const url = accountData?.accountDetails?.contractPdf;
    setAgreementUrl(url);
    window.open(url, "_blank");
  };
  // Validation schema for the first form sectio.
  const formValidationSchemaOne = Yup.object().shape({
    AccountName: Yup.string()
      .required(
        "Account name is required and must be between 3 and 100 characters, containing only alphabetic, alphanumeric or special characters."
      )

      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{3,100}$/,
        "Account name is required and must be between 3 and 100 characters, containing only alphabetic, alphanumeric or special characters."
      ),

    phoneNumberOne: Yup.string()
      .required("A valid phone number is required, including the country code.")
      .test(
        "is-valid-number",
        "A valid phone number is required, including the country code.",
        function (value) {
          if (typeof value !== "string") return false;
          const { country } = this.parent;
          const phoneNumber = parsePhoneNumberFromString(
            value,
            country?.toUpperCase()
          );
          return phoneNumber ? phoneNumber.isValid() : false;
        }
      ),
  });

  // Validation schema for the second form section.
  const formValidationSchemaTwo = Yup.object().shape({
    AdminFirstName: Yup.string()
      .required(
        "Account first name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
      )
      .matches(
        /^(?! )[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{1,49}[A-Za-z0-9!@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~ ]$/,
        "Account first name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
      ),

    AdminLastName: Yup.string()
      .required(
        "Account last name is required and must be between 2 and 50 characters, containing only alphabetic, alphanumeric or special characters."
      )
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 !@#\$%\^\&*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/\\|`~]{2,50}$/,
        "Account last name is required and must be between 2 and 50 characters, alphanumeric or special characters."
      ),

    adminEmail: Yup.string()
      .email("A valid email address is required. (e.g. user@example.com)")
      .required("A valid email address is required. (e.g. user@example.com)")
      .max(254, "A valid email address is required. (e.g. user@example.com)"),

    phoneNumberTwo: Yup.string()
      .required("A valid phone number is required, including the country code.")
      .test(
        "is-valid-number",
        "A valid phone number is required, including the country code.",
        function (value) {
          const { country } = this.parent;
          const phoneNumber = parsePhoneNumberFromString(
            value,
            country?.toUpperCase()
          );
          return phoneNumber ? phoneNumber.isValid() : false;
        }
      ),
  });

  // Validation schema for the third form section.
  const formValidationSchemaThree = Yup.object().shape({
    PrimaryColor: Yup.string(),

    SecondaryColor: Yup.string(),

    bookDemoButton: Yup.string()

      .required("A valid URL is required (e.g., https://example.com).")
      .matches(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "A valid url is required (e.g., https://example.com)."
      ),

    RedirectURL: Yup.string()
      .required("A valid URL is required (e.g., https://example.com).")
      .matches(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "A valid url is required (e.g., https://example.com)."
      ),

    ContractDate: Yup.string()
      .required("Contract date is required.")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Contract date formate"),

    ContractTerm: Yup.string().required(
      "Package name is required and must be at least 3 characters."
    ),

    CustomerType: Yup.string().required("CustomerType is required."),

    UserCount: Yup.string().required("UserCount is required."),

    MediaCredits: Yup.string().required("MediaCredits is required."),

    ActiveMediaLimit1: Yup.string().required("ActiveMediaLimit1 is required."),

    ActiveMediaLimit2: Yup.string().required("ActiveMediaLimit2 is required."),
  });

  // Handles the submission of the first form.
  const handleFormSubmitOne = () => {};

  // Handles the submission of the second form.
  const handleFormSubmitTwo = () => {};

  // Handles the submission of the third form.
  const handleFormSubmitThree = () => {};

  // Fetches account data from the server and sets it in the state.
  const getAccountData = async () => {
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
        setLoading(false);
        const data = res?.data;
        setAccountData(data?.data);
        setAccountId(res?.data?.data?.accountId);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const putAccountData = async () => {
    let update_Account_Id = accountid;
    console.log(accountid, "accountidrererte");
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.EditcompanyDetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          accountId: accountid,
          accountName: accountData?.accountDetails?.accountName,
          accountPhoneNo: accountData?.accountDetails?.accountPhoneNo,
          // primaryHex: accountData?.accountDetails?.primaryHex,
          bookDemoButton: accountData?.accountDetails?.bookDemoButton,
          // redirectLinks: accountData?.accountDetails?.redirectLinks,
          // mediaCredits: accountData?.accountDetails?.mediaCredits,
          // activeMediaLimits: accountData?.accountDetails?.activeMediaLimits,
        },
        params: {
          accountId: update_Account_Id,
          changeType: "ACCOUNT_DETAILS",
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Sends updated account data to the server.
  const putAccountData1 = async () => {
    let update_Account_Id = accountid;
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.EditcompanyDetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          accountId: accountid,
          firstName: accountData?.adminFirstName,
          lastName: accountData?.adminLastName,
          adminEmail: accountData?.adminEmail,
          // PersonaProAdmin: accountData?.ppAdmin,
          adminPhoneNo: accountData?.adminPhone,
        },
        params: {
          accountId: update_Account_Id,
          changeType: "ACCOUNT_ADMIN",
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const putAccountData2 = async () => {
    let update_Account_Id = accountid;
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.EditcompanyDetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          accountId: accountid,

          primaryHex: accountData?.accountDetails?.primaryHex,
          bookDemoButton: accountData?.accountDetails?.bookDemoButton,
          redirectLinks: accountData?.accountDetails?.redirectLinks,
          secondaryHex: accountData?.accountDetails?.secondaryHex,
        },
        params: {
          accountId: update_Account_Id,
          changeType: "ACCOUNT_INFO",
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const putAccountData3 = async () => {
    let update_Account_Id = accountid;
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.ChangeAccountLogo,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: {
          IMAGE: selectedImage,
        },
        params: {
          accountId: update_Account_Id,
          userId: localStorage.getItem("_id"),
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        setSelectedImage(res?.data?.data);
        setLoading(false);
        getAccountData();
      }
    } catch (error) {
      console.log("error in the Edit Company", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  // Fetches account data when the component mounts.
  useEffect(() => {
    getAccountData();
  }, []);
  useEffect(() => {
    if (accountData?.accountDetails?.primaryHex) {
      setHexValue(accountData.accountDetails.primaryHex);
    }
    if (accountData?.accountDetails?.secondaryHex) {
      setHexValue2(accountData.accountDetails.secondaryHex);
    }
  }, [accountData]);

  const initialValues = {
    AccountName: accountData?.accountDetails?.accountName || "",
    phoneNumberOne: accountData?.accountDetails?.accountPhone || "",
    PersonaProAdmin: accountData?.ppAdmin || "",
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setIsImageChanged(true);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // setSelectedImage(event.target.result);
        const base64Image = reader.result;
        setAccountData((prevUserData) => ({
          ...prevUserData,
          profilephoto: base64Image,
        }));
        setSelectedImage(base64Image);
        // setOpenCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setSelectedImage(accountData?.accountDetails?.accountLogo);
  };

  const handleCloseDialog = () => {
    setIsImageChanged(false);
    setOpen(false);
  };

  const handleColorChange = debounce((color) => {
    const updatedHexValue = color.hex.toUpperCase();

    // Update hexValue
    setHexValue(updatedHexValue);

    // Update accountData with the new primaryHex value
    setAccountData((prevData) => ({
      ...prevData,
      accountDetails: {
        ...prevData.accountDetails,
        primaryHex: updatedHexValue,
      },
    }));

    console.log("Updated hexValue:", updatedHexValue);
  }, 100);

  const handleColorChange1 = debounce((color) => {
    const updatedHexValue = color.hex.toUpperCase();

    // Update secondaryHex value
    setHexValue2(updatedHexValue);

    // Update accountData with the new secondaryHex value
    setAccountData((prevData) => ({
      ...prevData,
      accountDetails: {
        ...prevData.accountDetails,
        secondaryHex: updatedHexValue,
      },
    }));

    console.log("Updated secondaryHexValue:", updatedHexValue);
  }, 100);

  const formatContractTerm = (term) => {
    // Use a regular expression to find the first digit and separate it from the following text
    return term.replace(/(\d+)([a-zA-Z]+)/, "$1 $2");
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <Box className={classes.editCompanySettingsContainer}>
        <Typography></Typography>
        <Box className="breads">
          <ArrowBackIcon
            style={{ color: "black", cursor: "pointer", fontSize: "large" }}
            onClick={() => {
              history.push("/settings");
            }}
          />
          <Breadcrumbs aria-label="breadcrumb">
            <Typography variant="body1" style={{ color: "#152F40" }}>
              <Link
                color="inherit"
                component={RouterLink}
                to="/settings"
                onClick={handleClick}
              >
                Settings{" "}
              </Link>
            </Typography>
            <Typography className="headText">
              {settingRoute}
              <Typography>Edit Company Information</Typography>
            </Typography>
          </Breadcrumbs>
        </Box>
        <Grid container spacing={2} className="gridContainer ">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box className="companyDetails commonBorder">
              {accountData && (
                <Formik
                  initialValues={initialValues}
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
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    resetForm,
                    isValid,
                    dirty,
                  }) => (
                    <Form style={{ marginTop: "0px" }}>
                      <Box className="commonHeadingBox">
                        <Typography variant="body1">Account Details</Typography>
                        {isEditing1 ? (
                          <Button
                            color="primary"
                            onClick={handleSaveClick1}
                            className="EditButton"
                            type="submit"
                            disabled={!isValid || !dirty}
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
                      </Box>
                      <Box className="innerbox commomInnerBox">
                        <Grid container>
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Account Name:
                            </Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={
                                !isEditing1 &&
                                values.AccountName &&
                                values?.AccountName?.length >= 40
                                  ? values?.AccountName?.slice(0, 40) + "..."
                                  : values?.AccountName
                              }
                              disabled={!isEditing1}
                              name="AccountName"
                              onChange={(event) => {
                                const { name, value } = event.target;
                                const capitalizedValue =
                                  value.charAt(0).toUpperCase() +
                                  value.slice(1);
                                handleChange({
                                  target: { name, value: value },
                                });
                                setAccountData({
                                  ...accountData,
                                  accountDetails: {
                                    ...accountData?.accountDetails,
                                    accountName: value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              inputProps={{
                                maxLength: 100,
                                onKeyPress: (event) => {
                                  const charCode = event.which
                                    ? event.which
                                    : event.keyCode;
                                  if (
                                    !(
                                      (charCode >= 65 && charCode <= 90) || // A-Z
                                      (charCode >= 97 && charCode <= 122) || // a-z
                                      (charCode >= 48 && charCode <= 57) ||
                                      (charCode >= 33 && charCode <= 47) ||
                                      (charCode >= 58 && charCode <= 64) ||
                                      (charCode >= 91 && charCode <= 96) ||
                                      (charCode >= 123 && charCode <= 126) ||
                                      charCode === 32
                                    )
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
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.AccountName && errors.AccountName}
                            </FormHelperText>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Account Phone:
                            </Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
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
                              onChange={(phoneNumberOne, countryData) => {
                                const formattedPhone =
                                  phoneNumberOne.startsWith("+")
                                    ? phoneNumberOne
                                    : `+${phoneNumberOne}`;

                                setAccountData({
                                  ...accountData,
                                  accountDetails: {
                                    ...accountData?.accountDetails,
                                    accountPhoneNo: formattedPhone,
                                  },
                                });

                                // Set phoneNumberOne and country dynamically
                                setFieldValue("phoneNumberOne", formattedPhone);
                                setFieldValue(
                                  "country",
                                  countryData.countryCode
                                );
                              }}
                              defaultCountry="US"
                              country={"us"}
                              inputStyle={{
                                width: "100%",
                                height: "30px",
                                marginTop: "0px",
                                fontWeight: "normal",
                              }}
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.phoneNumberOne && errors.phoneNumberOne}
                            </FormHelperText>
                          </Grid>
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              PersonaPro Admin:
                            </Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              // disabled={!isEditing1}
                              disabled={true}
                              value={values.PersonaProAdmin}
                              name="PersonaProAdmin"
                              onChange={(event) => {
                                const { name, value } = event.target;
                                const capitalizedValue =
                                  value.charAt(0).toUpperCase() +
                                  value.slice(1);
                                handleChange({
                                  target: { name, value: capitalizedValue },
                                });
                                setAccountData({
                                  ...accountData,
                                  ppAdmin: capitalizedValue,
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
                          </Grid>
                        </Grid>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>

            <Box className="pointsOfContractDetails commonBorder topMargin">
              {accountData && (
                <Formik
                  initialValues={{
                    AdminFirstName: accountData?.adminFirstName || "",
                    AdminLastName: accountData?.adminLastName || "",
                    adminEmail: accountData?.adminEmail || "",
                    phoneNumberTwo: accountData?.adminPhone || "",
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
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    resetForm,
                    isValid,
                    dirty,
                  }) => (
                    <Form style={{ marginTop: "0px" }}>
                      <Box className="commonHeadingBox">
                        <Typography variant="body1">
                          Account Admin Details
                        </Typography>
                        {isEditing2 ? (
                          <Button
                            color="primary"
                            onClick={handleSaveClick2}
                            className="EditButton"
                            type="submit"
                            disabled={!isValid || !dirty}
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
                      </Box>
                      <Box className="innerbox commomInnerBox">
                        <Grid container>
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Admin First Name:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={
                                !isEditing2 &&
                                values.AdminFirstName &&
                                values.AdminFirstName.length >= 40
                                  ? values.AdminFirstName.slice(0, 40) + "..."
                                  : values.AdminFirstName
                              }
                              name="AdminFirstName"
                              disabled={!isEditing2}
                              onChange={(event) => {
                                const { name, value } = event.target;
                                handleChange({
                                  target: { name, value: value },
                                });
                                setAccountData({
                                  ...accountData,
                                  adminFirstName: value,
                                });
                              }}
                              onBlur={handleBlur}
                              inputProps={{
                                maxLength: 50,
                                onKeyPress: (event) => {
                                  const charCode = event.which
                                    ? event.which
                                    : event.keyCode;
                                  if (
                                    !(charCode >= 65 && charCode <= 90) &&
                                    !(charCode >= 97 && charCode <= 122) &&
                                    !(charCode >= 48 && charCode <= 57) &&
                                    !(charCode >= 33 && charCode <= 47) &&
                                    !(charCode >= 58 && charCode <= 64) &&
                                    !(charCode >= 91 && charCode <= 96) &&
                                    !(charCode >= 123 && charCode <= 126)
                                  ) {
                                    event.preventDefault();
                                  }
                                },
                              }}
                              className={isEditing2 ? "editableTextField" : ""}
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.AdminFirstName && errors.AdminFirstName}
                            </FormHelperText>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Admin Last Name:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={
                                !isEditing2 &&
                                values.AdminLastName &&
                                values?.AdminLastName?.length >= 40
                                  ? values?.AdminLastName?.slice(0, 40) + "..."
                                  : values?.AdminLastName
                              }
                              name="AdminLastName"
                              disabled={!isEditing2}
                              onChange={(event) => {
                                const { name, value } = event.target;
                                handleChange({
                                  target: { name, value: value },
                                });
                                setAccountData({
                                  ...accountData,
                                  adminLastName: value,
                                });
                              }}
                              onBlur={handleBlur}
                              inputProps={{
                                maxLength: 50,
                                onKeyPress: (event) => {
                                  const charCode = event.which
                                    ? event.which
                                    : event.keyCode;
                                  if (
                                    !(
                                      (charCode >= 65 && charCode <= 90) || // A-Z
                                      (charCode >= 97 && charCode <= 122) || // a-z
                                      (charCode >= 48 && charCode <= 57) ||
                                      (charCode >= 33 && charCode <= 47) ||
                                      (charCode >= 58 && charCode <= 64) ||
                                      (charCode >= 91 && charCode <= 96) ||
                                      (charCode >= 123 && charCode <= 126) ||
                                      charCode === 32
                                    )
                                  ) {
                                    event.preventDefault();
                                  }
                                },
                              }}
                              className={isEditing2 ? "editableTextField" : ""}
                            />
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.AdminLastName && errors.AdminLastName}
                            </FormHelperText>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Account Admin Email:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={values.adminEmail}
                              name="adminEmail"
                              // disabled={!isEditing2}
                              disabled={true}
                              onChange={(event) => {
                                const { name, value } = event.target;
                                handleChange({
                                  target: { name, value },
                                });
                                setAccountData({
                                  ...accountData,
                                  adminEmail: value,
                                });
                              }}
                              inputProps={{ maxLength: 255 }}
                              onBlur={handleBlur}
                              className={isEditing2 ? "editableTextField" : ""}
                            />{" "}
                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.adminEmail && errors.adminEmail}
                            </FormHelperText>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Account Admin Phone:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
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
                              onChange={(value, countryData) => {
                                const formattedPhone = value.startsWith("+")
                                  ? value
                                  : `+${value}`;
                                setFieldValue("phoneNumberTwo", formattedPhone);
                                setFieldValue(
                                  "country",
                                  countryData.countryCode
                                );
                              }}
                              defaultCountry="US"
                              country={"us"}
                              inputStyle={{
                                width: "100%",
                                height: "30px",
                                marginTop: "0px",
                                fontWeight: "normal",
                              }}
                            />

                            <FormHelperText
                              error
                              className={classes.helperText}
                            >
                              {touched.phoneNumberTwo && errors.phoneNumberTwo}
                            </FormHelperText>
                          </Grid>
                        </Grid>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>

            <Box className="companyLogo commonBorder topMargin">
              {accountData && (
                <Formik
                  initialValues={{
                    PrimaryColor: accountData?.accountDetails?.primaryHex || "",
                    SecondaryColor:
                      accountData?.accountDetails?.secondaryHex || "",
                    bookDemoButton:
                      accountData?.accountDetails?.bookDemoButton || "",
                    RedirectURL:
                      accountData?.accountDetails?.redirectLinks || "",
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
                    <Form style={{ marginTop: "0px" }}>
                      <Box className="commonHeadingBox">
                        {console.log("dirty: ", isValid)}
                        <Typography variant="body1">Account Details</Typography>
                        {isEditing3 ? (
                          <Button
                            color="primary"
                            onClick={handleSaveClick3}
                            className="EditButton"
                            stype="submit"
                            // disabled={!isValid || !dirty}
                            disabled={
                              !accountData?.accountDetails?.bookDemoButton ||
                              !accountData?.accountDetails?.redirectLinks ||
                              errors.bookDemoButton ||
                              errors.RedirectURL
                            }
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
                      </Box>
                      <Box className="innerbox commomInnerBox">
                        <Grid container>
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Primary Color:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <>
                              <TextField
                                name="PrimaryColor"
                                disabled={!isEditing3}
                                className={
                                  isEditing3
                                    ? "editableTextField"
                                    : "nonEditabletextField"
                                }
                                // onBlur={handleBlur}
                                margin="normal"
                                placeholder="Choose Color"
                                value={hexValue}
                                onClick={() => {
                                  setShowColorPicker(true);
                                }}
                              />
                              <Modal
                                open={showColorPicker}
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
                                    color={hexValue}
                                    onChange={handleColorChange}
                                  />
                                  <div className={classes.colorpickerbtndiv}>
                                    <Button
                                      onClick={handleSaveColor}
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

                            <FormHelperText error>
                              {touched.PrimaryColor && errors.PrimaryColor}
                            </FormHelperText>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Secondary Color:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={hexValue2}
                              onClick={() => setShowColorPicker1(true)}
                              name="SecondaryColor"
                              disabled={!isEditing3}
                              // onBlur={handleBlur}
                              margin="normal"
                              placeholder="Choose Color"
                              className={
                                isEditing3
                                  ? "editableTextField"
                                  : "nonEditabletextField"
                              }
                            />
                            <Modal
                              open={showColorPicker1}
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
                                  color={hexValue2}
                                  onChange={handleColorChange1}
                                />
                                <div className={classes.colorpickerbtndiv}>
                                  <Button
                                    onClick={handleSaveColor1}
                                    variant="outlined"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={handleCancelColor1}
                                    variant="contained"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </Box>
                            </Modal>
                            <FormHelperText error>
                              {touched.SecondaryColor && errors.SecondaryColor}
                            </FormHelperText>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Book Demo URL:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6}>
                            <TextField
                              value={values.bookDemoButton}
                              name="bookDemoButton"
                              disabled={!isEditing3}
                              onChange={(event) => {
                                const { name, value } = event.target;
                                handleChange({
                                  target: { name, value },
                                });
                                setAccountData({
                                  ...accountData,
                                  accountDetails: {
                                    ...accountData.accountDetails,
                                    bookDemoButton: value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              inputProps={{
                                maxLength: 60,
                                onKeyPress: (event) => {
                                  const charCode = event.which
                                    ? event.which
                                    : event.keyCode;
                                  if (charCode === 32) {
                                    event.preventDefault();
                                  }
                                },
                              }}
                              className={isEditing3 ? "editableTextField" : ""}
                            />
                            <FormHelperText error>
                              {touched.bookDemoButton && errors.bookDemoButton}
                            </FormHelperText>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Redirect URL:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6}>
                            <TextField
                              value={values.RedirectURL}
                              name="RedirectURL"
                              disabled={!isEditing3}
                              onChange={(event) => {
                                const { name, value } = event.target;
                                handleChange({
                                  target: { name, value },
                                });
                                setAccountData({
                                  ...accountData,
                                  accountDetails: {
                                    ...accountData.accountDetails,
                                    redirectLinks: value,
                                  },
                                });
                              }}
                              inputProps={{
                                maxLength: 60,
                                onKeyPress: (event) => {
                                  const charCode = event.which
                                    ? event.which
                                    : event.keyCode;
                                  if (charCode === 32) {
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
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box className="companyDetails commonBorder">
              {accountData && (
                <Formik
                  initialValues={{
                    ContractDate:
                      accountData?.accountDetails?.contractStartDate || "",
                    ContractTerm:
                      accountData?.accountDetails?.contractTerm || "",
                    ContractEndDate:
                      accountData?.accountDetails?.contractEndDate || "",
                  }}
                  validationSchema={formValidationSchemaThree}
                  onSubmit={(values, { resetForm }) =>
                    handleFormSubmitThree(values, resetForm)
                  }
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
                  }) => (
                    <Form style={{ marginTop: "0px" }}>
                      <Box className="commonHeadingBox">
                        <Typography varient="body1">Contract Term</Typography>
                      </Box>

                      <Box className="innerbox commomInnerBox">
                        <Grid container>
                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Contract Date:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={
                                // new Date(
                                //   values.ContractDate
                                // ).toLocaleTimeString() +
                                // " " +
                                new Date(
                                  values.ContractDate
                                ).toLocaleDateString()
                              }
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

                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Contract Term:
                            </Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={formatContractTerm(values.ContractTerm)}
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

                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Contract End Date:
                            </Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={
                                // new Date(
                                //   values.ContractEndDate
                                // ).toLocaleTimeString() +
                                // " " +
                                new Date(
                                  values.ContractEndDate
                                ).toLocaleDateString()
                              }
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
              )}
            </Box>

            <Box className="pointsOfContractDetails commonBorder topMargin">
              {accountData && (
                <Formik
                  initialValues={{
                    CustomerType:
                      accountData?.accountDetails?.customerType || "",
                    UserCount:
                      accountData?.accountDetails?.contractedUsers || "",
                    MediaCredits:
                      accountData?.accountDetails?.mediaCredits === 0
                        ? 0
                        : accountData?.accountDetails?.mediaCredits || "",

                    ActiveMediaLimit1:
                      accountData?.accountDetails?.activeMediaLimits === 0
                        ? 0
                        : accountData?.accountDetails?.activeMediaLimits || "",
                  }}
                  validationSchema={formValidationSchemaThree}
                  onSubmit={(values, { resetForm }) =>
                    handleFormSubmitThree(values, resetForm)
                  }
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
                  }) => (
                    <Form style={{ marginTop: "0px" }}>
                      <Box className="commonHeadingBox">
                        <Typography variant="body1">Contact Details</Typography>
                      </Box>
                      <Box className="innerbox commomInnerBox">
                        <Grid container>
                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Customer Type:
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={8} sm={6} xs={6}>
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
                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">User Count:</Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
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
                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Media Credits:
                            </Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={values.MediaCredits}
                              disabled={!isEditing5}
                              name="MediaCredits"
                              inputProps={{ maxLength: 60 }}
                              onChange={(event) => {
                                const { name, value } = event.target;
                                handleChange({
                                  target: { name, value },
                                });
                                setAccountData({
                                  ...accountData,
                                  accountDetails: {
                                    ...accountData.accountDetails,
                                    mediaCredits: value,
                                  },
                                });
                              }}
                              onBlur={handleBlur}
                              className={isEditing5 ? "editableTextField" : ""}
                            />
                            <FormHelperText error>
                              {touched.MediaCredits && errors.MediaCredits}
                            </FormHelperText>
                          </Grid>
                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={6}
                            className="flexCenter"
                          >
                            <Typography variant="body1">
                              Active Media Limit:
                            </Typography>
                          </Grid>
                          <Grid item lg={8} md={8} sm={6} xs={6}>
                            <TextField
                              value={values.ActiveMediaLimit1}
                              disabled={!isEditing5}
                              name="ActiveMediaLimit1"
                              onBlur={handleBlur}
                              onChange={(event) => {
                                const { name, value } = event.target;
                                handleChange({
                                  target: { name, value },
                                });
                                setAccountData({
                                  ...accountData,
                                  accountDetails: {
                                    ...accountData.accountDetails,
                                    activeMediaLimits: value,
                                  },
                                });
                              }}
                              className={isEditing5 ? "editableTextField" : ""}
                            />
                            <FormHelperText error>
                              {touched.ActiveMediaLimit1 &&
                                errors.ActiveMediaLimit1}
                            </FormHelperText>
                          </Grid>
                        </Grid>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
            {accountData && (
              <Box className="companyLogo commonBorder topMargin">
                <Box className="commonHeadingBox">
                  <Typography variant="body1">Account logo</Typography>
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

                    // <Button
                    //   variant="contained"
                    //   component="label"
                    //   className={classes.uploadButton}
                    //   onClick={handleOpenDialog}
                    // >
                    //   Upload
                    // </Button>
                  )}
                </Box>
                <Box className="innerbox commomInnerBox">
                  <Grid container spacing={3}>
                    <Grid item lg={3} md={4} sm={6} className="flexCenter">
                      <Typography variant="body1">Upload Logo :</Typography>
                    </Grid>
                    <Grid item lg={3} md={8} sm={6}>
                      {isImageSelection ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="h6"
                            style={{ marginRight: "10px" }}
                          >
                            {accountData?.accountDetails?.accountLogo
                              ? accountData.accountDetails.accountLogo.length >
                                30
                                ? `${accountData.accountDetails.accountLogo.slice(
                                    0,
                                    15
                                  )}...${accountData.accountDetails.accountLogo.slice(
                                    -15
                                  )}`
                                : accountData.accountDetails.accountLogo
                              : "No Logo Available"}
                          </Typography>
                          <Button
                            variant="contained"
                            component="label"
                            className={classes.uploadButton}
                            onClick={handleOpenDialog}
                          >
                            Upload
                          </Button>
                        </div>
                      ) : (
                        <Typography variant="h6">
                          {accountData?.accountDetails?.accountLogo
                            ? accountData.accountDetails.accountLogo.length > 30
                              ? `${accountData.accountDetails.accountLogo.slice(
                                  0,
                                  15
                                )}...${accountData.accountDetails.accountLogo.slice(
                                  -15
                                )}`
                              : accountData.accountDetails.accountLogo
                            : "No Logo Available"}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}

            {accountData && (
              <Box className="companyLogo commonBorder topMargin">
                <Box className="commonHeadingBoxes">
                  <Typography variant="body1">View Agreement</Typography>
                  <Button className="viewBtn" onClick={handleViewAgreement}>
                    {" "}
                    View{" "}
                  </Button>
                </Box>
                <Box
                  className="contractpdf commomInnerBox"
                  style={{ padding: "8px 12px" }}
                >
                  <Grid
                    container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      variant="outlined"
                      className="buttonTextfield"
                      value={accountData?.accountDetails?.contractPdf || ""}
                      disabled
                    />
                  </Grid>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      {openCrop ? (
        <Dialog open={open} className={classes.mainDialog}>
          <IconButton onClick={handleCloseDialog}></IconButton>

          <Typography variant="body1" className={classes.dialogHeading}>
            Account Logo
          </Typography>
          <CropEasyProfile
            photoURL={selectedImage}
            type={false}
            setOpenCrop={setOpenCrop}
            setPhotoURL={setPhotoURL}
            setUploadedImage={setSelectedImage}
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
            Account Logo
          </Typography>
          {selectedImage ? (
            <Box style={{ minHeight: "300px", margin: "0 44px" }}>
              <img
                src={selectedImage}
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
                  toast.success("Image uploaded successfully");
                  handleCloseDialog();
                } else {
                  setSelectedImage(null);
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

export default EditCompanySettings;
