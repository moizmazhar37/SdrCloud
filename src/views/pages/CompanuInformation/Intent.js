import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, FieldArray } from "formik";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory, Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
// Custom styles for the Intent component
const useStyles = makeStyles((theme) => ({
  phoneInput: {
    "& .react-tel-input .country-list": {
      backgroundColor: "#fff !important",
    },
    "& .react-phone-input-2": {
      width: "100%",
      height: "30px",
      marginTop: "0px",
      fontWeight: "normal",
    },
    "& .react-phone-input-2 .form-control": {
      backgroundColor: "#fff", // Apply white background color to input
    },
    "& .react-phone-input-2 .country-list": {
      backgroundColor: "#fff !important", // Apply white background color to country list
    },
    "& .react-phone-input-2 .country-list .country": {
      backgroundColor: "#fff !important", // Apply white background color to individual countries in the list
    },
  },
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
      fontWeight: 400,
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  innerbox: {
    border: "1px solid #E7E7E7",
    padding: "12px 20px",
    borderRadius: "0px 0px 10px 10px",
    color: "#152F40",
    "& .profileBox": {
      justifyContent: "start",
    },
    "& .MuiTypography-body1": {
      color: "#152F40",
      fontWeight: 500,
    },
    "& .savebtn": {
      borderRadius: "0px 6px 6px 0px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .savebtnDisables": {
      borderRadius: "0px 6px 6px 0px",
      background: "#F4F4F4",
      color: "black",
      height: "42px",
      width: "100px",
    },
  },
  headingBox: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "#F4F4F4",
    padding: "12px 10px 12px 24px",
    borderRadius: "10px 10px 0px 0px",
    color: "#152F40",
    "& h5": {
      fontSize: "14px",
    },
    "& .EditButton": {
      color: "color: var(--blue, #0358AC)",
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
      fontWeight: "500",
    },
  },
  textfiledall: {
    "& .MuiInputBase-root": {
      border: "0.5px solid gray",
      borderRadius: "5px",
      height: "35px",
    },
    "& .MuiInputBase-input": {
      marginLeft: "5px",
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
  savebtn: {
    borderRadius: "6px",
    background: " #0358AC",
    color: "white",
    height: "42px",
    width: "100px",
  },
}));
const Intent = (props) => {
  const [settingRoute, setSettingRoute] = useState(
    props?.location?.state?.id || "setting"
  );
  const classes = useStyles();
  const history = useHistory();
  const [intent, setIntent] = useState({ trackingLinkName: "", link: "" });
  const [showData, setShowData] = useState("");
  const [initialFooterLinks, setInitialFooterLinks] = useState([]);
  const accountId2 = window?.localStorage?.getItem("accountId");
  const [otherlink, setOtherlink] = useState({
    FACEBOOK: "",
    GOOGLE: "",
    LINKEDIN: "",
    DEMAND_BASE: "",
    SALESFORCE: "",
    OTHER: "",
    CRM: "",
    SALESSOFT: "",
    TERMINUS: "",
    SENSE6: "",
    HUBSPOT: "",
    OUTREACH: "",
    EXPERIENCE_COM: "",
  });
  const [footerLinks, setFooterLinks] = useState([
    { link: "", trackingLinkName: "" },
  ]);
  console.log("footerLinks: ", footerLinks);
  const [trakingPixel, setTrackingPixel] = useState([
    { linkName: "", linkUrl: "" },
  ]);

  const [isLoading, setLoader] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [isFooterData, setIsFooterData] = useState(false);

  const GetFooterLink = async (setFieldValue) => {
    setLoader(false);
    try {
      setLoader(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllFooterLink,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });

      if (res?.data?.status === 200) {
        const footerLinksData = res?.data?.data.footerlinks;
        const retrievedPhoneNumber = res?.data?.data?.footerContact;
        const instagramLink = res?.data?.data?.instagramlink;
        const facebooklink = res?.data?.data?.facebooklink;
        const linkedinlink = res?.data?.data?.linkedinlink;
        if (
          footerLinksData ||
          retrievedPhoneNumber ||
          instagramLink ||
          facebooklink ||
          linkedinlink
        ) {
          setIsFooterData(true);
        }
        setLoader(false);
        setFooterLinks(footerLinksData);
        setPhoneNumber(retrievedPhoneNumber);
        setFacebookLink(facebooklink);
        setInstagramLink(instagramLink);
        setLinkedinLink(linkedinlink);
        setFieldValue("footerLinks", footerLinksData);
        setFieldValue("phoneNumberOne", retrievedPhoneNumber);

        setIsEditing(false);
        setIsEditingContact(false);
      } else if (res?.data?.status === 205) {
        setLoader(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoader(false);
    }
  };

  const FooterLink = async (footerLinks) => {
    console.log("Submitting Footer Links", footerLinks);
    try {
      setLoader(true);
      const requestData = footerLinks?.map((data) => ({
        link: data.link,
        trackingLinkName: data.trackingLinkName,
      }));

      const res = await axios({
        method: "POST",
        url: ApiConfig.FooterLink,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: requestData,
      });

      if (res?.data?.status === 200) {
        GetFooterLink();
        setLoader(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
      setLoader(false);
    }
  };
  const updateFooterLink = async (footerLinks) => {
    console.log("Submitting Footer Links", footerLinks);
    try {
      setLoader(true);
      const requestData = footerLinks?.map((data) => ({
        link: data.link,
        trackingLinkName: data.trackingLinkName,
      }));
      let method = isFooterData ? "PUT" : "POST";
      let url = isFooterData
        ? ApiConfig.updateFooterLink
        : ApiConfig.FooterLink;
      const res = await axios({
        method: method,
        url: url,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        data: requestData,
      });

      if (res?.data?.status === 200) {
        GetFooterLink();
        setLoader(false);
        toast.success(res?.data?.message);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
      setLoader(false);
    }
  };

  const saveFooterContact = async (
    phoneNumber,
    // countryCode,
    facebookLink,
    instagramLink,
    linkedinLink
  ) => {
    setLoader(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.saveFooterContact,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          contact: phoneNumber,
          // countrycode: countryCode,
          facebooklink: facebookLink,
          instagramlink: instagramLink,
          linkedinlink: linkedinLink,
        },
      });
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        GetFooterLink();
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  const updateFooterContact = async (
    phoneNumber,
    // countryCode,
    facebookLink,
    instagramLink,
    linkedinLink
  ) => {
    console.log("updateFooterContactupdateFooterContact");
    try {
      setLoader(true);
      let method = isFooterData ? "PUT" : "POST";
      let url = isFooterData
        ? ApiConfig.updateFooterContact
        : ApiConfig.saveFooterContact;
      const res = await axios({
        method: method,
        url: url,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          contact: phoneNumber,
          // countrycode: countryCode,
          facebooklink: facebookLink,
          instagramlink: instagramLink,
          linkedinlink: linkedinLink,
        },
      });

      if (res?.data?.status === 200) {
        GetFooterLink();
        setLoader(false);
        toast.success(res?.data?.message);
        setIsEditingContact(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
      setLoader(false);
    }
  };

  const GetIntentTracking = async () => {
    setLoader(false);
    try {
      setLoader(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.GetIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          accountId: accountId2,
        },
      });
      if (res?.data?.status === 200) {
        setLoader(false);
        handleHeadingClick1("Terminus");
        handleHeadingClick2("Salesforce");
        handleHeadingClick3("Outreach");
        handleHeadingClick4("Experience.com");
        const apiData = res?.data?.data;
        apiData.forEach((item) => {
          if (otherlink.hasOwnProperty(item.linkName)) {
            setOtherlink((prevState) => ({
              ...prevState,
              [item.linkName]: item.linkUrl,
            }));
          }
        });
      } else if (res?.data?.status === 205) {
        setLoader(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async (setFieldValue) => {
      await GetIntentTracking();
      await GetFooterLink(setFieldValue);
    };

    fetchData();
  }, []);

  const convertOtherlinkToDataArray = (otherlink) => {
    const dataArray = [];
    for (const linkName in otherlink) {
      if (otherlink[linkName]) {
        dataArray.push({
          accountId: accountId2,

          linkName,
          linkUrl: otherlink[linkName],
        });
      }
    }
    return dataArray;
  };

  const IntentTracking = async () => {
    const dataToSend = convertOtherlinkToDataArray(otherlink);
    // const dataToSend = { [htext1]: otherlink[htext1] };

    try {
      setLoader(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.IntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          ContentType: "application/json",
        },
        data: dataToSend,
        params: {
          accountId: accountId2,
        },
      });
      if (res?.data?.responseCode === 200) {
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const addFooterLink = () => {
    setFooterLinks((prevLinks) => [
      ...prevLinks,
      { link: "", trackingLinkName: "" },
    ]);
  };

  // Function to handle form submission
  const handleFormSubmit = () => {};
  // Function to handle form submission (alternative)
  const handleFormSubmit1 = () => {};

  const handleLinkNameChange = (e, index) => {
    const { value } = e.target;
    const updatedLinks = [...footerLinks];
    updatedLinks[index].link = value;
    setFooterLinks(updatedLinks);
  };
  const handleLinkURLChange = (e, index) => {
    const { value } = e.target;
    const updatedLinks = [...footerLinks];
    updatedLinks[index].trackingLinkName = value;
    setFooterLinks(updatedLinks);
  };
  // Function to handle click event on breadcrumb links
  function handleClick(event) {
    event.preventDefault();
    setSettingRoute("setting");
    console.info("You clicked a breadcrumb.");
  }
  const [selectedHeading1, setSelectedHeading1] = useState("");
  const [selectedHeading2, setSelectedHeading2] = useState("");
  const [selectedHeading3, setSelectedHeading3] = useState("");
  const [selectedHeading4, setSelectedHeading4] = useState("");
  const [isEditing1, setEditing1] = useState(false);
  const [isEditing2, setEditing2] = useState(false);
  const [isEditing3, setEditing3] = useState(false);
  const [isEditing4, setEditing4] = useState(false);
  const [isEditing5, setEditing5] = useState(false);
  const [isEditing6, setEditing6] = useState(false);
  const [isEditing7, setEditing7] = useState(false);
  const [saveBotton, setSaveBotton] = useState(false);
  const [loading, setLoading] = useState(false);
  const headings1 = [
    "Terminus",
    "|",
    "Demand Base",
    "|",
    "SENSE 6",
    "|",
    "Other",
  ];
  const headings2 = ["Salesforce", "|", "Hubspot", "|", "CRM"];
  const headings3 = ["Salessoft", "|", "Outreach"];
  const headings4 = ["Experience.com", "|", "Other"];

  // Enables editing for section 1
  const handleEditClick1 = () => {
    setEditing1(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick1 = () => {
    setEditing1(false);
    UpdateIntentTracking1();
  };

  // Enables editing for section 1
  const handleEditClick2 = () => {
    setEditing2(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick2 = () => {
    setEditing2(false);
    UpdateIntentTracking2();
  };

  // Enables editing for section 1
  const handleEditClick3 = () => {
    setEditing3(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick3 = () => {
    setEditing3(false);
    UpdateIntentTracking3();
  };

  // Enables editing for section 1
  const handleEditClick4 = () => {
    setEditing4(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick4 = () => {
    setEditing4(false);
    UpdateIntentTracking4();
  };

  // Enables editing for section 1
  const handleEditClick5 = () => {
    setEditing5(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick5 = () => {
    setEditing5(false);
    UpdateIntentTracking5();
  };
  // Enables editing for section 1
  const handleEditClick6 = () => {
    setEditing6(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick6 = () => {
    setEditing6(false);
    UpdateIntentTracking6();
  };
  // Enables editing for section 1
  const handleEditClick7 = () => {
    setEditing7(true);
  };

  // Saves changes and disables editing for section 1
  const handleSaveClick7 = () => {
    setEditing7(false);
    UpdateIntentTracking7();
  };

  const UpdateIntentTracking1 = async () => {
    // const dataToSend = convertOtherlinkToDataArray(otherlink);
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.UpdateIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          accountId: accountId2,
          linkName: "FACEBOOK",
        },
        data: {
          accountId: accountId2,
          id: 1,
          linkUrl: otherlink.FACEBOOK,
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        console.log("Edit Data Successfully...");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const UpdateIntentTracking2 = async () => {
    // const dataToSend = convertOtherlinkToDataArray(otherlink);
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.UpdateIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          accountId: accountId2,
          linkName: "LINKEDIN",
        },
        data: {
          accountId: accountId2,
          id: 1,
          linkUrl: otherlink.LINKEDIN,
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        console.log("Edit Data Successfully...");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const UpdateIntentTracking3 = async () => {
    // const dataToSend = convertOtherlinkToDataArray(otherlink);
    try {
      setLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.UpdateIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          accountId: accountId2,
          linkName: "GOOGLE",
        },
        data: {
          accountId: accountId2,
          id: 1,
          linkUrl: otherlink.GOOGLE,
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        console.log("Edit Data Successfully...");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const UpdateIntentTracking4 = async () => {
    // const dataToSend = convertOtherlinkToDataArray(otherlink);
    try {
      setLoading(true);
      let linkdata = otherlink[htext1];
      const res = await axios({
        method: "PUT",
        url: ApiConfig.UpdateIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          accountId: accountId2,
          linkName: htext1,
        },
        data: {
          accountId: accountId2,
          id: 1,
          linkUrl: linkdata,
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        console.log("Edit Data Successfully...");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const UpdateIntentTracking5 = async () => {
    // const dataToSend = convertOtherlinkToDataArray(otherlink);
    try {
      setLoading(true);
      let linkdata = otherlink[htext2];
      const res = await axios({
        method: "PUT",
        url: ApiConfig.UpdateIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          accountId: accountId2,
          linkName: htext2,
        },
        data: {
          accountId: accountId2,
          id: 1,
          linkUrl: linkdata,
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        console.log("Edit Data Successfully...");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const UpdateIntentTracking6 = async () => {
    const dataToSend = convertOtherlinkToDataArray(otherlink);
    try {
      setLoading(true);
      let linkdata = otherlink[htext3];
      const res = await axios({
        method: "PUT",
        url: ApiConfig.UpdateIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          accountId: accountId2,
          linkName: htext3,
        },
        data: {
          accountId: accountId2,
          id: 1,
          linkUrl: linkdata,
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        console.log("Edit Data Successfully...");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const UpdateIntentTracking7 = async () => {
    // const dataToSend = convertOtherlinkToDataArray(otherlink);
    try {
      setLoading(true);
      let linkdata = otherlink[htext4];
      const res = await axios({
        method: "PUT",
        url: ApiConfig.UpdateIntentTracking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          accountId: accountId2,
          linkName: htext4,
        },
        data: {
          accountId: accountId2,
          id: 1,
          linkUrl: linkdata,
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        console.log("Edit Data Successfully...");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getvalue1 = (htext1) => {
    switch (htext1) {
      case "DEMAND_BASE":
        return otherlink.DEMAND_BASE;
      case "TERMINUS":
        return otherlink.TERMINUS;
      case "SENSE6":
        return otherlink.SENSE6;
      case "OTHER":
        return otherlink.OTHER;
      default:
        return "";
    }
  };
  const [htext1, setHtext1] = useState("Terminus");
  const handleHeadingClick1 = (heading1) => {
    if (selectedHeading1 !== heading1) {
      setSelectedHeading1(heading1);

      console.log("otherlin is here ");
      console.log(otherlink);
      if (heading1 === "Terminus") {
        setHtext1("TERMINUS");
      } else if (heading1 === "Demand Base") {
        setHtext1("DEMAND_BASE");
      } else if (heading1 === "SENSE 6") {
        setHtext1("SENSE6");
      } else if (heading1 === "Other") {
        setHtext1("OTHER");
      }
    }
  };

  const getvalue2 = (htext2) => {
    switch (htext2) {
      case "SALESFORCE":
        return otherlink.SALESFORCE;
      case "HUBSPOT":
        return otherlink.HUBSPOT;
      case "CRM":
        return otherlink.CRM;
      default:
        return "";
    }
  };
  const [htext2, setHtext2] = useState("Salesforce");
  const handleHeadingClick2 = (heading2) => {
    if (selectedHeading2 !== heading2) {
      setSelectedHeading2(heading2);
      //  debugger;
      console.log("otherlin is here ");
      console.log(otherlink);
      if (heading2 === "Salesforce") {
        setHtext2("SALESFORCE");
      } else if (heading2 === "Hubspot") {
        setHtext2("HUBSPOT");
      } else if (heading2 === "CRM") {
        setHtext2("CRM");
      }
    }
  };

  const getvalue3 = (htext3) => {
    switch (htext3) {
      case "SALESSOFT":
        return otherlink.SALESSOFT;
      case "OUTREACH":
        return otherlink.OUTREACH;
      default:
        return "";
    }
  };
  const [htext3, setHtext3] = useState("Salessoft");
  const handleHeadingClick3 = (heading3) => {
    if (selectedHeading3 !== heading3) {
      setSelectedHeading3(heading3);
      console.log("otherlin is here ");
      console.log(otherlink);
      if (heading3 === "Salessoft") {
        setHtext3("SALESSOFT");
      } else if (heading3 === "Outreach") {
        setHtext3("OUTREACH");
      }
    }
  };

  const getvalue4 = (htext4) => {
    switch (htext4) {
      case "EXPERIENCE_COM":
        return otherlink.EXPERIENCE_COM;
      case "OTHER":
        return otherlink.OTHER;
      default:
        return "";
    }
  };
  const [htext4, setHtext4] = useState("Experience.com");
  const handleHeadingClick4 = (heading4) => {
    if (selectedHeading4 !== heading4) {
      setSelectedHeading4(heading4);
      if (heading4 === "Experience.com") {
        setHtext4("EXPERIENCE_COM");
      } else if (heading4 === "Other") {
        setHtext3("OTHER");
      }
    }
  };
  const formValidationSchemaOne = Yup.object().shape({
    FACEBOOK: Yup.string().matches(
      /^(ftp|http|https):\/\/[^ "]+$/,
      "Invalid URL format. Please enter a valid URL."
    ),
    LINKEDIN: Yup.string().matches(
      /^(ftp|http|https):\/\/[^ "]+$/,
      "Invalid URL format. Please enter a valid URL."
    ),

    GOOGLE: Yup.string().matches(
      /^(ftp|http|https):\/\/[^ "]+$/,
      "Invalid URL format. Please enter a valid URL."
    ),
    // .required("URL is required"),

    TERMINUS: Yup.string().matches(
      /^(ftp|http|https):\/\/[^ "]+$/,
      "Invalid URL format. Please enter a valid URL."
    ),
    // .required("URL is required"),

    HUBSPOT: Yup.string().matches(
      /^(ftp|http|https):\/\/[^ "]+$/,
      "Invalid URL format. Please enter a valid URL."
    ),
    // .required("URL is required"),

    OUTREACH: Yup.string().matches(
      /^(ftp|http|https):\/\/[^ "]+$/,
      "Invalid URL format. Please enter a valid URL."
    ),
    // .required("URL is required"),

    EXPERIENCE_COM: Yup.string().matches(
      /^(ftp|http|https):\/\/[^ "]+$/,
      "Invalid URL format. Please enter a valid URL."
    ),
  });
  const hasValidEntries = (footerLinks) => {
    return footerLinks?.some(
      (link) => link.link.trim() !== "" && link.trackingLinkName.trim() !== ""
    );
  };

  const validationSchemaPhone = Yup.object().shape({
    phoneNumberOne: Yup.string()
      .required("A valid Phone number is required, including the country code.")
      .test(
        "is-valid-number",
        "A valid phone number is required, including the country code.",
        function (value) {
          console.log("value: ", value);
          const { country } = this.parent;
          console.log("country: ", country);
          const phoneNumber = parsePhoneNumberFromString(
            value,
            country?.toUpperCase()
          );
          return phoneNumber ? phoneNumber.isValid() : false;
        }
      ),
    // countryCode: Yup.string().required("Country code is required"),
  });

  return (
    <Box className={classes.editCompanySettingsContainer}>
      <Typography> </Typography>
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
          <Typography className="breadCrumbText">
            <Typography>Footer Links</Typography>
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={3} style={{ paddingTop: "30px" }}>
        <Grid item sm={6} xs={12}>
          <Grid item sm={12} xs={12}>
            <Grid item sm={12} xs={12}>
              <Box className={classes.headingBox} mb={2}>
                <Typography variant="h5">Contact</Typography>
                <Typography
                  onClick={() => setIsEditingContact(true)}
                  style={{
                    color: "#4d89c4",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </Typography>
              </Box>
              <Box className={classes.innerbox}>
                <Formik
                  initialValues={{
                    phoneNumberOne: phoneNumber,
                    // countryCode: "us",
                    FACEBOOK: facebookLink,
                    INSTAGRAM: instagramLink,
                    LINKEDIN: linkedinLink,
                  }}
                  enableReinitialize={true}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={validationSchemaPhone}
                  onSubmit={async (values, { resetForm }) => {
                    if (isEditingContact) {
                      updateFooterContact(
                        values.phoneNumberOne,
                        // values.countryCode,
                        values.FACEBOOK,
                        values.INSTAGRAM,
                        values.LINKEDIN
                      );
                    } else {
                      await saveFooterContact(
                        values.phoneNumberOne,
                        // values.countryCode,
                        values.FACEBOOK,
                        values.INSTAGRAM,
                        values.LINKEDIN
                      );
                    }
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
                    <Form style={{ marginTop: "0px" }}>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          lg={4}
                          md={4}
                          sm={6}
                          xs={12}
                          className="flexCenter"
                        >
                          <Typography variant="body1">
                            Account Phone:
                          </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                          <PhoneInput
                            disabled={!isEditingContact}
                            label="Phone Number"
                            name="phoneNumberOne"
                            value={values.phoneNumberOne}
                            classes={classes.phoneInput}
                            onBlur={(e) => {
                              handleBlur(e);
                              setFieldTouched("phoneNumberOne", true);
                            }}
                            onChange={(phoneNumberOne, countryData) => {
                              const formattedPhone = phoneNumberOne.startsWith(
                                "+"
                              )
                                ? phoneNumberOne
                                : `+${phoneNumberOne}`;
                              setFieldValue("phoneNumberOne", formattedPhone);
                              setFieldValue("country", countryData.countryCode);
                            }}
                            defaultCountry="US"
                            country={"us"}
                            inputStyle={{
                              width: "100%",
                              height: "42px",
                              marginTop: "0px",
                              fontWeight: "normal",
                            }}
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.phoneNumberOne && errors.phoneNumberOne}
                          </FormHelperText>
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          md={4}
                          sm={6}
                          xs={12}
                          className="flexCenter"
                        >
                          <Typography variant="body1">
                            Facebook Link:
                          </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                          <TextField
                            disabled={!isEditingContact}
                            name="FACEBOOK"
                            placeholder="Enter Facebook link"
                            variant="outlined"
                            value={values.FACEBOOK}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.FACEBOOK && errors.FACEBOOK}
                          </FormHelperText>
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          md={4}
                          sm={6}
                          xs={12}
                          className="flexCenter"
                        >
                          <Typography variant="body1">
                            Instagram Link:
                          </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                          <TextField
                            disabled={!isEditingContact}
                            placeholder="Enter Instagram link"
                            name="INSTAGRAM"
                            variant="outlined"
                            value={values.INSTAGRAM}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.INSTAGRAM && errors.INSTAGRAM}
                          </FormHelperText>
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          md={4}
                          sm={6}
                          xs={12}
                          className="flexCenter"
                        >
                          <Typography variant="body1">
                            LinkedIn Link:
                          </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} sm={6} xs={12}>
                          <TextField
                            disabled={!isEditingContact}
                            variant="outlined"
                            placeholder="Enter LinkedIn link"
                            name="LINKEDIN"
                            value={values.LINKEDIN}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.LINKEDIN && errors.LINKEDIN}
                          </FormHelperText>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12}>
                          <Box>
                            <Button
                              variant="contained"
                              type="submit"
                              color="primary"
                              disabled={!isEditingContact || !isValid || !dirty}
                            >
                              {isEditingContact ? "Update" : "Save"}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Box className={classes.headingBox} mt={2} mb={2}>
              <Typography variant="h5">Footer Links</Typography>
              <Typography
                onClick={() => setIsEditing(true)}
                style={{
                  color: "#4d89c4",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Edit
              </Typography>
            </Box>

            <Formik
              initialValues={{
                footerLinks: footerLinks,
              }}
              enableReinitialize={true}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={Yup.object().shape({
                footerLinks: Yup.array().of(
                  Yup.object().shape({
                    link: Yup.string()
                      .min(
                        3,
                        "Please enter at least 3 characters for Link Name."
                      )
                      .max(
                        60,
                        "You can enter up to 60 characters for Link Name."
                      )
                      .required("Link Name is required"),
                    trackingLinkName: Yup.string()
                      .matches(
                        /^(ftp|http|https):\/\/[^ "]+$/,
                        "Invalid URL format. Please enter a valid URL for Link URL."
                      )
                      .required("Link URL is required"),
                  })
                ),
              })}
              onSubmit={async (values) => {
                if (isEditing) {
                  await updateFooterLink(values.footerLinks); // Update if in edit mode
                } else {
                  await FooterLink(values.footerLinks); // Create new links if not in edit mode
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                isValid,
                dirty,
                setFieldValue,
                push, // Function to add new footer link
                remove, // Function to remove footer link
              }) => (
                <Form>
                  <Box className={classes.innerbox}>
                    <FieldArray
                      name="footerLinks"
                      render={({ push, remove }) => (
                        <>
                          {values?.footerLinks?.map((link, index) => (
                            <Grid container spacing={4} key={index}>
                              <Grid item xs={12} sm={5} md={5}>
                                <Box pt={1}>
                                  <Typography
                                    variant="body1"
                                    style={{ fontWeight: 400 }}
                                  >
                                    Link Name
                                  </Typography>
                                  <TextField
                                    name={`footerLinks[${index}].link`}
                                    variant="outlined"
                                    placeholder="Enter Link Name"
                                    fullWidth
                                    inputProps={{ maxLength: 61 }}
                                    value={link.link}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={!isEditing}
                                  />
                                  <FormHelperText
                                    error
                                    className={classes.helperText}
                                  >
                                    {touched.footerLinks &&
                                      errors.footerLinks &&
                                      errors.footerLinks[index] &&
                                      errors.footerLinks[index].link}
                                  </FormHelperText>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={5} md={5}>
                                <Box pt={1}>
                                  <Typography
                                    variant="body1"
                                    style={{ fontWeight: 400 }}
                                  >
                                    Link URL
                                  </Typography>
                                  <TextField
                                    name={`footerLinks[${index}].trackingLinkName`}
                                    variant="outlined"
                                    placeholder="Enter Link URL"
                                    fullWidth
                                    value={link.trackingLinkName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={!isEditing}
                                  />
                                  <FormHelperText
                                    error
                                    className={classes.helperText}
                                  >
                                    {touched.footerLinks &&
                                      errors.footerLinks &&
                                      errors.footerLinks[index] &&
                                      errors.footerLinks[index]
                                        .trackingLinkName}
                                  </FormHelperText>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={2}
                                md={2}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {isEditing && (
                                  <DeleteIcon
                                    style={{
                                      marginTop: "32px",
                                      cursor: "pointer",
                                      color: "#4d89c4",
                                    }}
                                    onClick={() => remove(index)}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          ))}
                          {isEditing && (
                            <Box className={classes.btnContainer}>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  push({ link: "", trackingLinkName: "" })
                                }
                              >
                                + Add More Footer Links
                              </Button>
                            </Box>
                          )}
                        </>
                      )}
                    />
                    <Box mt={3}>
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        style={{ boxShadow: "none" }}
                        disabled={
                          !hasValidEntries(values?.footerLinks) || !isEditing
                        }
                      >
                        {isEditing ? "Update" : "Save"}
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box className={classes.headingBox}>
            <Typography variant="h5">Tracking Pixels</Typography>
          </Box>
          <Formik
            initialValues={otherlink}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={formValidationSchemaOne}
            onSubmit={(values) => {
              handleFormSubmit1(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              isValid,
              dirty,
              setFieldValue,
            }) => (
              <Form>
                <Box className={classes.innerbox}>
                  <Box pt={1} mb={1}>
                    <Typography variant="body1" style={{ fontWeight: 400 }}>
                      Facebook
                      {isEditing1 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick1}
                          className="EditButton"
                          style={{
                            color: "var(--blue, #0358AC)",
                            fontSize: "14px",
                            marginTop: "-1px",
                          }}
                          type="submit"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick1}
                          className="EditButton"
                          style={{
                            color: "var(--blue, #0358AC)",
                            fontSize: "14px",
                            marginTop: "-1px",
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                    <TextField
                      name="facebook"
                      // value={values.facebook}
                      value={otherlink.FACEBOOK}
                      variant="outlined"
                      placeholder="Enter Facebook Tracking Pixels"
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        setOtherlink({
                          ...otherlink,
                          FACEBOOK: e.target.value,
                        });
                        setFieldValue("FACEBOOK", e.target.value);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.FACEBOOK && errors.FACEBOOK}
                    </FormHelperText>
                  </Box>

                  <Box pt={1} mb={1}>
                    <Typography variant="body1" style={{ fontWeight: 400 }}>
                      LinkedIn
                      {isEditing2 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick2}
                          className="EditButton"
                          style={{
                            color: "var(--blue, #0358AC)",
                            fontSize: "14px",
                            marginTop: "-1px",
                          }}
                          type="submit"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick2}
                          className="EditButton"
                          style={{
                            color: "var(--blue, #0358AC)",
                            fontSize: "14px",
                            marginTop: "-1px",
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                    <TextField
                      name="linkedIn"
                      value={otherlink.LINKEDIN}
                      variant="outlined"
                      placeholder="Enter Linkedin Tracking Pixels"
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        setOtherlink({
                          ...otherlink,
                          LINKEDIN: e.target.value,
                        });
                        setFieldValue("LINKEDIN", e.target.value);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.LINKEDIN && errors.LINKEDIN}
                    </FormHelperText>
                  </Box>

                  <Box pt={1} mb={1}>
                    <Typography variant="body1" style={{ fontWeight: 400 }}>
                      Google
                      {isEditing3 ? (
                        <Button
                          color="primary"
                          onClick={handleSaveClick3}
                          className="EditButton"
                          style={{
                            color: "var(--blue, #0358AC)",
                            fontSize: "14px",
                            marginTop: "-1px",
                          }}
                          type="submit"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={handleEditClick3}
                          className="EditButton"
                          style={{
                            color: "var(--blue, #0358AC)",
                            fontSize: "14px",
                            marginTop: "-1px",
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </Typography>
                    <TextField
                      name="google"
                      // value={values.google}
                      value={otherlink.GOOGLE}
                      variant="outlined"
                      placeholder="Enter Google Analytics Tracking Pixels"
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        setOtherlink({
                          ...otherlink,
                          GOOGLE: e.target.value,
                        });
                        setFieldValue("GOOGLE", e.target.value);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.GOOGLE && errors.GOOGLE}
                    </FormHelperText>
                  </Box>

                  <Box pt={1} mb={1}>
                    {headings1?.map((heading1) => (
                      <span
                        key={heading1}
                        onClick={() => handleHeadingClick1(heading1)}
                        style={{
                          cursor: "pointer",
                          fontWeight:
                            selectedHeading1 === heading1 ? "bold" : "normal",
                          textDecoration:
                            selectedHeading1 === heading1
                              ? "underline"
                              : "none",
                          marginRight: "15px",
                        }}
                      >
                        {heading1}
                      </span>
                    ))}
                    {isEditing4 ? (
                      <Button
                        color="primary"
                        onClick={handleSaveClick4}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                        type="submit"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onClick={handleEditClick4}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <TextField
                      //  name="TERMINUS"
                      //  value={values.terminus}
                      // value={otherlink.TERMINUS}
                      name={htext1}
                      value={getvalue1(htext1)}
                      // placeholder="Enter ABM Tracking Pixels"
                      placeholder={`Enter ABM Tracking Pixels for ${selectedHeading1}`}
                      variant="outlined"
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        setOtherlink({
                          ...otherlink,
                          // TERMINUS: e.target.value
                          //     TERMINUS: e.target.value,
                          // DEMAND_BASE: e.target.value ,
                          // SENSE6: e.target.value
                          [htext1]: e.target.value,
                        });
                        setFieldValue("TERMINUS", e.target.value);
                      }}
                      fullWidth
                      onBlur={handleBlur}
                      margin="normal"
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.TERMINUS && errors.TERMINUS}
                    </FormHelperText>
                  </Box>
                  <Box pt={1} mb={1}>
                    {headings2?.map((heading2) => (
                      <span
                        key={heading2}
                        onClick={() => handleHeadingClick2(heading2)}
                        style={{
                          cursor: "pointer",
                          fontWeight:
                            selectedHeading2 === heading2 ? "bold" : "normal",
                          textDecoration:
                            selectedHeading2 === heading2
                              ? "underline"
                              : "none",
                          marginRight: "15px",
                        }}
                      >
                        {heading2}
                      </span>
                    ))}
                    {isEditing5 ? (
                      <Button
                        color="primary"
                        onClick={handleSaveClick5}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                        type="submit"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onClick={handleEditClick5}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <TextField
                      //  name="HUBSPOT"
                      // //  value={values.hubspot}
                      // value={otherlink.HUBSPOT}
                      name={htext2}
                      value={getvalue2(htext2)}
                      placeholder={`Enter CRM Tracking Pixels for ${selectedHeading2}`}
                      variant="outlined"
                      fullWidth
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        setOtherlink({
                          ...otherlink,
                          [htext2]: e.target.value,
                          // HUBSPOT: e.target.value,
                          // SALESFORCE:e.target.value,
                        });
                        setFieldValue("HUBSPOT", e.target.value);
                      }}
                      onBlur={handleBlur}
                      margin="normal"
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.HUBSPOT && errors.HUBSPOT}
                    </FormHelperText>
                  </Box>

                  <Box pt={1} mb={1}>
                    {headings3?.map((heading3) => (
                      <span
                        key={heading3}
                        onClick={() => handleHeadingClick3(heading3)}
                        style={{
                          cursor: "pointer",
                          fontWeight:
                            selectedHeading3 === heading3 ? "bold" : "normal",
                          textDecoration:
                            selectedHeading3 === heading3
                              ? "underline"
                              : "none",
                          marginRight: "15px",
                        }}
                      >
                        {heading3}
                      </span>
                    ))}
                    {isEditing6 ? (
                      <Button
                        color="primary"
                        onClick={handleSaveClick6}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                        type="submit"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onClick={handleEditClick6}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <TextField
                      name={htext3}
                      value={getvalue3(htext3)}
                      placeholder={`Enter Outbound Cadence Platform Tracking Pixels for ${selectedHeading3}`}
                      variant="outlined"
                      fullWidth
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        setOtherlink({
                          ...otherlink,
                          // OUTREACH: e.target.value,
                          [htext3]: e.target.value,
                        });
                        setFieldValue("OUTREACH", e.target.value);
                      }}
                      onBlur={handleBlur}
                      margin="normal"
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.OUTREACH && errors.OUTREACH}
                    </FormHelperText>
                  </Box>

                  <Box pt={1} mb={1}>
                    {headings4?.map((heading4) => (
                      <span
                        key={heading4}
                        onClick={() => handleHeadingClick4(heading4)}
                        style={{
                          cursor: "pointer",
                          fontWeight:
                            selectedHeading4 === heading4 ? "bold" : "normal",
                          textDecoration:
                            selectedHeading4 === heading4
                              ? "underline"
                              : "none",
                          marginRight: "15px",
                        }}
                      >
                        {heading4}
                      </span>
                    ))}
                    {isEditing7 ? (
                      <Button
                        color="primary"
                        onClick={handleSaveClick7}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                        type="submit"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onClick={handleEditClick7}
                        className="EditButton"
                        style={{
                          color: "var(--blue, #0358AC)",
                          fontSize: "14px",
                          marginTop: "-1px",
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <TextField
                      name={htext4}
                      value={getvalue4(htext4)}
                      placeholder={`Enter Other Tracking Pixels for ${selectedHeading4}`}
                      variant="outlined"
                      // onChange={handleChange}
                      onChange={(e) => {
                        handleChange(e);
                        setOtherlink({
                          ...otherlink,
                          // EXPERIENCE_COM: e.target.value
                          [htext4]: e.target.value,
                        });
                        setFieldValue("EXPERIENCE_COM", e.target.value);
                      }}
                      fullWidth
                      onBlur={handleBlur}
                      margin="normal"
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.EXPERIENCE_COM && errors.EXPERIENCE_COM}
                    </FormHelperText>
                  </Box>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ boxShadow: "none" }}
                      color="primary"
                      disabled={!isValid || !dirty}
                      onClick={IntentTracking}
                    >
                      {" "}
                      Save
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Intent;
