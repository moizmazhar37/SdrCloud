import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
  FormControl,
  IconButton,
  MenuItem,
  InputAdornment,
  Select,
  Divider,
  Modal,
  Tooltip,
  Dialog,
} from "@material-ui/core";
import { menuProps } from "src/utils";
import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";
import { Copy } from "react-feather";
import { SketchPicker } from "react-color";
import { CgColorPicker } from "react-icons/cg";
import FullScreenLoader from "src/component/FullScreenLoader";
import CloseIcon from "@material-ui/icons/Close";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CropImageHVO from "./CropImageHVO";
import { FiPlus } from "react-icons/fi";
const useStyles = makeStyles((theme) => ({
  menuitem: {
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-iconOpen": {
      borderRight: "none !important",
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-icon": {
      top: "0 !important",
      height: "40px !important",
      paddingLeft: "8px",
      color: "#152F40 !important",
    },
    "& .MuiOutlinedInput-root": {
      background: "transparent  !important",
      border: "1px solid #ECECEC !important",
    },
  },
  secondmaingridBox: {
    "& .error": {
      fontSize: "12px",
      color: "red",
    },
    borderRadius: "12px",
    background: "#FFF",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    padding: "16px 21px",
    border: "1px solid var(--light-stroke, #ECECEC)",
    height: "100%",
    minHeight: "450px",
    "& .MuiButton-root": {
      color: "#152F40",
      background: "transparent",
      fontSize: "16px",
      height: "42px",
    },
    "& .MuiButton-contained": {
      color: "#fff",
      background: "#0358AC",
      fontSize: "16px",
    },
    "& .dynamicFieldsBox": {
      border: "1px solid #ECECEC",
      borderRadius: "8px",
      background: "#FCFCFC",
      height: "calc(100% - 32px)",
      gap: "12px",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "0px",
    },
    "& .heading": {
      fontSize: "14px",
      color: "#0358AC",
    },
    "& .label": {
      color: "#152F40",
    },
    "& svg": {
      height: "16px",
      marginRight: "5px",
    },
    "& .durationField": {
      "& .MuiInputBase-input": {
        textAlign: "center",
      },
    },
    "& .sizeField": {
      "& .MuiFormControl-root": {
        width: "46px !important",
      },
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "5px !important",
    },
    "& .MuiIconButton-root": {
      height: "40px",
      padding: "10px",
    },
    "& .ctabtn": {
      fontSize: "14px",
      marginTop: "-10px !important",
    },
    "& .ctabtntext": {
      marginTop: "-10px !important",
    },
    "& .savebtn": {
      borderRadius: "6px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .savebtnDisables": {
      borderRadius: "6px  ",
      background: "#F4F4F4",
      color: "black",
      height: "42px",
      width: "100px",
    },
    "& .error": {
      fontSize: "12px",
      color: "red",
    },
  },
  durationscroll: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
  "& .savebtn": {
    borderRadius: "0px 6px 6px 0px",
    background: " #0358AC",
    color: "white",
    height: "42px",
    width: "100px",
  },
  "& .MuiSelect-iconOutlined": {
    borderLeft: "1px solid #ECECEC !important",
  },
  "& .MuiSelect-iconOpen": {
    borderRight: "none !important",
    borderLeft: "1px solid #ECECEC !important",
  },
  "& .MuiSelect-icon": {
    top: "0 !important",
    height: "40px !important",
    paddingLeft: "8px",
    color: "#152F40 !important",
  },
  "& .MuiOutlinedInput-root": {
    background: "transparent  !important",
    border: "1px solid #ECECEC !important",
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
  hinttext: {
    display: "flex",
    justifyContent: "end",
    color: "gray",
    fontSize: "12px",
    marginTop: "5px",
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
}));
// Function to render and manage the view elements based on the provided linkObject and getSummary function
function EditElement({
  footerData,
  fbLink,
  instaLink,
  linkedInLink,
  linkObject,
  getSummary,
  templateId,
  videoRefral,
  sectionId1,
  elementType,
  reload,
  handleScreen,
  typeIndex,
  getHVOTemplate,
  setLoading,
  loading,
  renderComponent,
  viewParamsData,
}) {
  const fileInputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(linkObject?.headerLogo);
  const [logos, setLogos] = useState({
    Logo1: linkObject?.logo,
    Logo2: linkObject?.prospectLogo,
  });
  const [open, setOpen] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setIsImageChanged(false);
    setOpen(false);
  };

  const classes = useStyles();

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setImgName(file?.name);
    console.log("File:", file);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData, "dfgfg");
      const res = await Axios({
        method: "POST",
        url: ApiConfig.uploadFile,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: formData,
      });

      if (res?.status == 200) {
        toast.success("Image Uploaded Successfully.");
        setIsImageChanged(true);
        setStaticImage(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIconButtonClick = (key) => {
    setSelectedOption(key);
    setImage("");
    console.log(key);

    // Reset the file input value
    if (fileInputRef?.current) {
      fileInputRef.current.value = null;
    }

    fileInputRef?.current?.click();
  };

  const submitSummary = async () => {
    try {
      getSummary("summary");
    } catch (error) {
      console.error("Error in handleSetData:", error);
    }
  };
  //header section
  const [scrollSelect, setScrollSelect] = useState(linkObject?.scroll);
  const [bannerText, setBannerText] = useState(linkObject?.bannerText);

  console.log(linkObject?.bannerText, bannerText);
  const [showTextField, setShowTextField] = useState(false);
  const [buttonText, setButtonText] = useState(linkObject?.ctaButtonText);
  const [demoButtonText, setDemoButtonText] = useState(
    linkObject?.demoButtonText
  );
  const [sectionId, setSectionId] = useState();
  const [companyDetails, setCompanyDetails] = useState();
  const [accountData, setAccountData] = useState("");
  const [h1, setH1] = useState(linkObject?.headline1);
  console.log("h1: ", h1);
  const [h1Size, setH1Size] = useState(linkObject?.headline1Size);
  console.log("h1Size: ", h1Size);
  const [h2, setH2] = useState(linkObject?.headline2);
  const [h2Size, setH2Size] = useState(linkObject?.headline2Size);
  console.log("h2Size: ", h2Size);
  const [body, setBody] = useState(linkObject?.bodyText);
  const [bodySize, setBodySize] = useState(linkObject?.bodyTextSize);
  const [staticURL, setStaticURL] = useState(linkObject?.staticUrl);
  const [staticURLDemo, setStaticURLDemo] = useState(linkObject?.staticUrlDemo);
  const [staticImage, setStaticImage] = useState();
  console.log("staticImage: ", staticImage);
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState(linkObject?.durationSec);
  const [scroll, setScroll] = useState(linkObject?.scroll);
  const [imgName, setImgName] = useState(linkObject?.image);
  const [sectionData, setSectionData] = useState();
  const [hexValueH1, setHexValueH1] = useState(linkObject?.headline1Color);
  const [hexValueH2, setHexValueH2] = useState(linkObject?.headline2Color);
  const [hexValueBody, setHexValueBody] = useState(linkObject?.bodyTextColor);
  const [hexValueBtn, setHexValueBtn] = useState(linkObject?.ctaButtonColor);
  const [hexValueDemoBtn, setHexValueDemoBtn] = useState(
    linkObject?.demoButtonColor
  );
  const [showColorPickerH1, setShowColorPickerH1] = useState(false);
  console.log("showColorPickerH1: ", showColorPickerH1);
  const [showColorPickerH2, setShowColorPickerH2] = useState(false);
  console.log("showColorPickerH2: ", showColorPickerH2);
  const [showColorPickerBody, setShowColorPickerBody] = useState(false);
  const [showColorPickerBtn, setShowColorPickerBtn] = useState(false);
  const [showColorPickerDemoBtn, setShowColorPickerDemoBtn] = useState(false);
  const [showColorPickerBtnText, setShowColorPickerBtnText] = useState(false);
  const [showColorPickerDemoBtnText, setShowColorPickerDemoBtnText] =
    useState(false);
  const [showColorPickerBannerText, setShowColorPickerBannerText] =
    useState(false);
  const [hexValueBanner, setHexValueBanner] = useState(linkObject?.bannerColor);
  console.log("hexValueBanner: ", hexValueBanner);
  const [hexValueBannerText, setHexValueBannerText] = useState("");
  const [hexValueBanner2Text, setHexValueBanner2Text] = useState("");

  const [hexValueBtnText, setHexValueBtnText] = useState(
    linkObject?.ctaButtonTextColor || linkObject?.bannerButtonTextColor
  );
  const [hexValueDemoBtnText, setHexValueDemoBtnText] = useState(
    linkObject?.demoButtonTextColor
  );
  const [showColorPickerBanner, setShowColorPickerBanner] = useState(false);
  const [showColorPickerBanner2Text, setShowColorPickerBanner2Text] =
    useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  const [selectedDynamicOption, setDynamicSelectedOption] = useState(
    linkObject?.dynamicUrl
  );
  const [selectedDynamicOptionDemo, setDynamicSelectedOptionDemo] = useState(
    linkObject?.dynamicUrlDemo
  );

  const [loadingSheetType, setLoadingSheetType] = useState(true);
  const [loadingFirstRowData, setLoadingFirstRowData] = useState(true);
  // Common loading state derived from both API calls
  const isLoading = loadingSheetType || loadingFirstRowData;
  const [firstRowData, setFirstRowData] = useState("");
  const [matchData, setMatchData] = useState(linkObject?.firstRowValue);

  const [bannerTextSize, setBannerTextSize] = useState(
    linkObject?.bannerTextSize
  );

  const [banner2TextSize, setBanner2TextSize] = useState(
    linkObject?.banner2TextSize
  );
  const handleSaveColorBanner2Text = () => {
    setShowColorPickerBanner2Text(false);
    setError((prevErrors) => ({
      ...prevErrors,
      hexValueBanner2Text: "",
    }));
  };
  const handleCancelColorBanner2Text = () => {
    setShowColorPickerBanner2Text(false);
  };

  const handleSaveColorH2 = () => {
    setShowColorPickerH2(false);
  };

  const handleCancelColorH2 = () => {
    setShowColorPickerH2(false);
  };
  const handleSaveColorBody = () => {
    setShowColorPickerBody(false);
  };
  const handleCancelColorBody = () => {
    setShowColorPickerBody(false);
  };
  const handleSaveColorBtn = () => {
    setShowColorPickerBtn(false);
  };
  const handleCancelColorBtn = () => {
    setShowColorPickerBtn(false);
  };

  const handleSaveColorDemoBtn = () => {
    setShowColorPickerDemoBtn(false);
  };
  const handleCancelColorDemoBtn = () => {
    setShowColorPickerDemoBtn(false);
  };
  const handleSaveColorBanner = () => {
    setShowColorPickerBanner(false);
  };
  const handleCancelColorBanner = () => {
    setShowColorPickerBanner(false);
  };
  const handleSaveColorBannerText = () => {
    setShowColorPickerBannerText(false);
  };
  const handleCancelColorBannerText = () => {
    setShowColorPickerBannerText(false);
  };
  const handleSaveColorBtnText = () => {
    setShowColorPickerBtnText(false);
  };
  const handleCancelColorBtnText = () => {
    setShowColorPickerBtnText(false);
  };

  const handleSaveColorDemoBtnText = () => {
    setShowColorPickerDemoBtnText(false);
  };
  const handleCancelColorDemoBtnText = () => {
    setShowColorPickerDemoBtnText(false);
  };
  //footer
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [fn, setfn] = useState(() => {});
  const [existcolor, setexistcolor] = useState("");

  // const [sectionData, setSectionData] = useState();

  const [socialIcon, setSocialIcon] = useState({
    fontsize: "",
    colorpicker: linkObject?.socialIconBackgroundColor,
    hovercolor: linkObject?.socialIconColor,
    textColor: "#000",
  });

  const [leftfooterTextColor, setLeftfooterTextColor] = useState({
    colorpicker: linkObject?.footerTextColor,
    hovercolor: linkObject?.footerTextHoverColor,
    fontsize: linkObject?.footerTextSize,
    headingSize: linkObject?.footerHeadingSize,
  });
  const [footerBackgroundColor, setFooterBackgroundColor] = useState(
    linkObject?.footerBackgroundColor
  );
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
  const [footerTextHeadingColor, setFooterTextHeadingColor] = useState({
    colorpicker: linkObject?.footerTextHeadingColor,
    hovercolor: "#000",
    fontsize: "",
  });
  const [benchmark, setBenchmark] = useState({
    text: "",
    fontsize: linkObject?.benchmarkSize,
    colorpicker: linkObject?.benchmarkColor,
  });

  const handleSaveColorH1 = () => {
    console.log("handleSaveColorH1: si working fine");
    setShowColorPicker(false);
    setShowColorPickerH1(false);
  };

  const handleCancelColorH1 = () => {
    console.log("handleCancelColorH1: : si working fine");
    setShowColorPicker(false);
    setShowColorPickerH1(false);
  };

  let fnsetSocialIconcolorpicker = (color) => {
    setSocialIcon((prev) => ({
      ...prev,
      colorpicker: color,
    }));
  };

  let fnsetFooterTextHeadingcolorpicker = (color) => {
    console.log(color);
    setFooterTextHeadingColor((prev) => ({
      ...prev,
      colorpicker: color,
    }));
  };
  let fnsetFooterBakgroundColor = (color) => {
    console.log(color);
    setFooterBackgroundColor(color);
  };

  let fnsetSocialIconhover = (color) => {
    setSocialIcon((prev) => ({
      ...prev,
      hovercolor: color,
    }));
  };

  let fnsetLeftFooterTexthover = (color) => {
    setLeftfooterTextColor((prev) => ({
      ...prev,
      hovercolor: color,
    }));
  };
  let fnsetLeftFooterTextcolorpicker = (color) => {
    console.log(color);
    setLeftfooterTextColor((prev) => ({
      ...prev,
      colorpicker: color,
    }));
  };

  let fnsetBenchmarkcolorpicker = (color) => {
    console.log(color, "hhhhhgj");
    setBenchmark((prev) => ({
      ...prev,
      colorpicker: color,
    }));
  };
  useEffect(() => {
    if (selectedOption && selectedOption !== "none" && firstRowData) {
      const matchedData = firstRowData[selectedOption];
      if (matchedData) {
        setMatchData(matchedData);
      }
    }
  }, [selectedOption, firstRowData]);
  const handleChangetitle = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setMatchData("");
  };
  //
  const handleDynamicimage = async (event) => {
    // const imageUrl = event.target.value;
    setImage(event.target.value);
    setStaticImage("");
    setImgName("");
  };
  const sheetFirstRowData = async () => {
    try {
      setLoadingFirstRowData(true);
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getFirstRowData,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: viewParamsData?.googleSheetsId,
        },
      });
      if (res?.data?.status === 200) {
        setFirstRowData(res?.data?.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoadingFirstRowData(false);
    }
  };

  const [error, setError] = useState({
    CTA: "",
    Demo: "",
    image: "",
    h1: "",
    h2: "",
    h1Size: "",
    h2Size: "",
    body: "",
    bodySize: "",
    hexValueH1: "",
    hexValueH2: "",
    hexValueBody: "",
    hexValueBtn: "",
    hexValueDemoBtn: "",
    static: "",
    dynamic: "",
    selectScroll: "",
    bannerText: "",
    hexValueBanner: "",
    hexValueBtnText: "",
    selectedDynamicOptionDemo: "",
    hexValueDemoBtnText: "",
    staticDemo: "",
    dynamicDemo: "",
    bannerTextSize: "",
    banner2TextSize: "",
    headingSize: "",
    fontsize: "",
  });

  const handleChangeDynamicURL = (event) => {
    setDynamicSelectedOption(event.target.value);
    setStaticURL("");
    setError((prevError) => ({ ...prevError, dynamic: "" }));
  };
  const handleChangeDynamicURLDemo = (event) => {
    setDynamicSelectedOptionDemo(event.target.value);
    setStaticURLDemo("");
    setError((prevError) => ({ ...prevError, dynamicDemo: "" }));
  };
  const handleStaticUrl = (e) => {
    setStaticURL(e.target.value);
    setDynamicSelectedOption("none");
    setError((prevError) => ({ ...prevError, static: "" }));
  };
  const handleStaticUrlDemo = (e) => {
    setStaticURLDemo(e.target.value);
    setDynamicSelectedOptionDemo("none");
    setError((prevError) => ({ ...prevError, staticDemo: "" }));
  };

  // Separate Validation Functions
  const validateHeroSection = () => {
    let errors = {};
    if (h1 === "" || h1 === null) errors.h1 = "Headline 1 is required.";
    if (h2 === "" || h2 === null) errors.h2 = "Headline 2 is required.";
    if (h1Size === "" || h1Size === null)
      errors.h1Size = "Headline 1 size is required.";
    if (h2Size === "" || h2Size === null)
      errors.h2Size = "Headline 2 size is required.";
    if (body === "" || body === null) errors.body = "Body text is required.";
    if (bodySize === "" || bodySize === null)
      errors.bodySize = "Body text size is required.";
    if (buttonText === "" || buttonText === null)
      errors.CTA = "CTA Button text is required.";
    // if (demoButtonText === "" || demoButtonText === null)
    //   errors.demo = "Demo text is required.";

    if (hexValueDemoBtnText === "" && demoButtonText !== "")
      errors.hexValueDemoBtnText = "Demo text color is required.";
    if (hexValueDemoBtn === "" && demoButtonText !== "")
      errors.hexValueDemoBtn = "Demo text hover color is required.";
    if (demoButtonText !== "") {
      if (
        (selectedDynamicOptionDemo === "none" ||
          selectedDynamicOptionDemo === "") &&
        staticURLDemo === ""
      )
        errors.dynamicDemo = "Dynamic or Static URL is required.";
    }
    if (demoButtonText !== "") {
      if (
        (selectedDynamicOptionDemo === "none" ||
          selectedDynamicOptionDemo === "") &&
        staticURLDemo === ""
      )
        errors.staticDemo = "Static or Dynamic URL is required.";
    }
    return errors;
  };
  const validateForRightTextLeftImage = () => {
    let errors = {};
    if (h1 === "" || h1 === null) errors.h1 = "Headline 1 is required.";
    if (h2 === "" || h2 === null) errors.h2 = "Headline 2 is required.";
    if (h1Size === "" || h1Size === null)
      errors.h1Size = "Headline 1 size is required.";
    if (h2Size === "" || h2Size === null)
      errors.h2Size = "Headline 2 size is required.";
    if (body === "" || body === null) errors.body = "Body text is required.";
    if (bodySize === "" || bodySize === null)
      errors.bodySize = "Body text size is required.";
    if (hexValueH1 === "" || hexValueH1 === null)
      errors.hexValueH1 = "Heading 1 Color is required.";
    if (hexValueH2 === "" || hexValueH2 === null)
      errors.hexValueH2 = "Heading 2 Color is required.";
    if (hexValueBody === "" || hexValueBody === null)
      errors.hexValueBody = "Body Text Color is required.";
    return errors;
  };
  const validateForLeftTextLeftImage = () => {
    let errors = {};
    if (h1 === "" || h1 === null) errors.h1 = "Headline 1 is required.";
    if (h2 === "" || h2 === null) errors.h2 = "Headline 2 is required.";
    if (h1Size === "" || h1Size === null)
      errors.h1Size = "Headline 1 size is required.";
    if (h2Size === "" || h2Size === null)
      errors.h2Size = "Headline 2 size is required.";
    if (body === "" || body === null) errors.body = "Body text is required.";
    if (bodySize === "" || bodySize === null)
      errors.bodySize = "Body text size is required.";
    if (hexValueH1 === "" || hexValueH1 === null)
      errors.hexValueH1 = "Heading 1 Color is required.";
    if (hexValueH2 === "" || hexValueH2 === null)
      errors.hexValueH2 = "Heading 2 Color is required.";
    if (hexValueBody === "" || hexValueBody === null)
      errors.hexValueBody = "Body Text Color is required.";
    return errors;
  };

  const validateBannerSection = () => {
    let errors = {};
    if (bannerText === "") errors.bannerText = "Banner text is required.";
    if (scrollSelect === "none")
      errors.selectScroll = "Horizontal scroll is required.";
    if (hexValueBanner === "")
      errors.hexValueBanner = "Choose Color for Banner Text.";
    if (hexValueBannerText === "")
      errors.hexValueBannerText = "Choose Banner Text Color.";
    return errors;
  };
  const validateBanner2Section = () => {
    let errors = {};
    if (bannerText === "") errors.bannerText = "Banner text is required.";
    if (hexValueBanner === "")
      errors.hexValueBanner = "Choose Color for Banner Text.";
    if (hexValueBannerText === "")
      errors.hexValueBannerText = "Choose Banner Text Color.";
    if (buttonText === "" || buttonText === null)
      errors.CTA = "CTA Button text is required.";
    return errors;
  };
  const validateFooterSection = () => {
    let errors = {};
    if (!leftfooterTextColor.headingSize) {
      errors.headingSize = "Footer Heading Text is required.";
    }
    if (!leftfooterTextColor.fontsize) {
      errors.fontsize = "Footer Text Size is required.";
    }
    if (!benchmark.fontsize) {
      errors.benchmarkFontsize = "Benchmark Text Size is required.";
    }
    return errors;
  };

  const EditSectionbyId = async () => {
    let newError = {};
    if (linkObject?.sectionType?.sectionName === "HERO") {
      newError = validateHeroSection();
    } else if (linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER") {
      newError = validateBannerSection();
    } else if (
      linkObject?.sectionType?.sectionName === "RIGHT_TEXT_LEFT_IMAGE"
    ) {
      newError = validateForRightTextLeftImage();
    } else if (
      linkObject?.sectionType?.sectionName === "LEFT_TEXT_RIGHT_IMAGE"
    ) {
      newError = validateForLeftTextLeftImage();
    } else if (linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER2") {
      newError = validateBanner2Section();
    } else if (linkObject?.sectionType?.sectionName === "FOOTER") {
      newError = validateFooterSection();
    }
    if (Object.keys(newError).length > 0) {
      console.log("Validation Errors:", newError);
      setError(newError);
      return;
    }
    const sequence = typeIndex + 1;
    const sanitizeData = (data) => {
      try {
        return JSON.parse(JSON.stringify(data));
      } catch (error) {
        return "";
      }
    };
    setLoading(true);
    try {
      console.log("finaly in the try");
      const data = {
        headerLogo: sanitizeData(selectedOption),
        companyLogo: accountData?.accountDetails?.accountLogo,
        firstRowValue: matchData,
        sectionTypeId: linkObject?.sectionType?.sectionId,
        sequence: sequence,
        userId: parseInt(localStorage.getItem("_id")),
        hvoTemplateId: templateId,
        id: linkObject?.id,
        ...(linkObject?.sectionType?.sectionName === "HERO" && {
          ctaButtonText: sanitizeData(buttonText),
          demoButtonText: sanitizeData(demoButtonText),
          staticImage: sanitizeData(staticImage),
          dynamicImageUrl: sanitizeData(selectedOption),
          dynamicUrl: sanitizeData(selectedDynamicOption),
          dynamicUrlDemo: sanitizeData(selectedDynamicOptionDemo),
          heroImg: sanitizeData(image),
          headline1: sanitizeData(h1),
          headline1Size: sanitizeData(h1Size),
          headline2: sanitizeData(h2),
          headline2Size: sanitizeData(h2Size),
          bodyText: sanitizeData(body),
          bodyTextSize: sanitizeData(bodySize),
          staticUrl: sanitizeData(staticURL),
          staticUrlDemo: sanitizeData(staticURLDemo),
          dynamicUrlDemo: sanitizeData(selectedDynamicOptionDemo),
          durationSec: sanitizeData(duration),
          headline1Color: sanitizeData(hexValueH1),
          headline2Color: sanitizeData(hexValueH2),
          bodyTextColor: sanitizeData(hexValueBody),
          ctaButtonColor: sanitizeData(hexValueBtn),
          bannerColor: sanitizeData(hexValueBanner),
          ctaButtonTextColor: sanitizeData(hexValueBtnText),
        }),
        ...(linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER" && {
          scroll: scrollSelect,
          bannerText: sanitizeData(bannerText),
          bannerTextColor: sanitizeData(hexValueBannerText),
          bannerColor: sanitizeData(hexValueBanner),
        }),
        ...(linkObject?.sectionType?.sectionName ===
          "RIGHT_TEXT_LEFT_IMAGE" && {
          staticImage: sanitizeData(staticImage),
          leftImageRightText: sanitizeData(image),
          headline1: sanitizeData(h1),
          headline1Size: sanitizeData(h1Size),
          headline2: sanitizeData(h2),
          headline2Size: sanitizeData(h2Size),
          bodyText: sanitizeData(body),
          bodyTextSize: sanitizeData(bodySize),
          headline1Color: sanitizeData(hexValueH1),
          headline2Color: sanitizeData(hexValueH2),
          bodyTextColor: sanitizeData(hexValueBody),
        }),
        ...(linkObject?.sectionType?.sectionName ===
          "LEFT_TEXT_RIGHT_IMAGE" && {
          staticImage: sanitizeData(staticImage),
          leftTextRightImageUrl: sanitizeData(image),
          headline1: sanitizeData(h1),
          headline1Size: sanitizeData(h1Size),
          headline2: sanitizeData(h2),
          headline2Size: sanitizeData(h2Size),
          bodyText: sanitizeData(body),
          bodyTextSize: sanitizeData(bodySize),
          headline1Color: sanitizeData(hexValueH1),
          headline2Color: sanitizeData(hexValueH2),
          bodyTextColor: sanitizeData(hexValueBody),
        }),
        ...(linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER2" && {
          bannerText: sanitizeData(bannerText),
          bannerTextColor: sanitizeData(hexValueBanner2Text),
          bannerColor: sanitizeData(hexValueBanner),
          banner2TextSize: sanitizeData(banner2TextSize),
          ctaButtonText: sanitizeData(buttonText),
          ctaButtonTextColor: sanitizeData(hexValueBtnText),
          ctaButtonColor: sanitizeData(hexValueBtn),
          dynamicUrl: sanitizeData(selectedDynamicOption),
          staticUrl: sanitizeData(staticURL),
        }),
        ...(linkObject?.sectionType?.sectionName === "FOOTER" && {
          benchmarkText1: sanitizeData(benchmark.text),
          benchmarkColor: sanitizeData(benchmark.colorpicker),
          benchmarkSize: sanitizeData(benchmark.fontsize),
          socialIconColor: sanitizeData(socialIcon.hovercolor),
          socialIconBackgroundColor: sanitizeData(socialIcon.colorpicker),
          footerTextColor: sanitizeData(leftfooterTextColor.colorpicker),
          footerTextHoverColor: sanitizeData(leftfooterTextColor.hovercolor),
          footerTextSize: sanitizeData(leftfooterTextColor.fontsize),
          footerBackgroundColor: sanitizeData(footerBackgroundColor),
          footerTextHeadingColor: sanitizeData(
            footerTextHeadingColor.colorpicker
          ),
          footerHeadingSize: sanitizeData(leftfooterTextColor?.headingSize),
        }),
        ...(linkObject?.sectionType?.sectionName !== "RIGHT_TEXT_LEFT_IMAGE" &&
          linkObject?.sectionType?.sectionName !== "LEFT_TEXT_RIGHT_IMAGE" && {
            heroImg: sanitizeData(image),
          }),
        benchmarkText1: sanitizeData(benchmark.text),
        benchmarkColor: sanitizeData(benchmark.colorpicker),
        benchmarkSize: sanitizeData(benchmark.fontsize),
        socialIconColor: sanitizeData(socialIcon.hovercolor),
        socialIconBackgroundColor: sanitizeData(socialIcon.colorpicker),
        footerTextColor: sanitizeData(leftfooterTextColor.colorpicker),
        footerTextHoverColor: sanitizeData(leftfooterTextColor.hovercolor),
        footerTextSize: sanitizeData(leftfooterTextColor.fontsize),
        footerBackgroundColor: sanitizeData(footerBackgroundColor),
        footerTextHeadingColor: sanitizeData(
          footerTextHeadingColor.colorpicker
        ),
        footerHeadingSize: sanitizeData(leftfooterTextColor?.headingSize),
        demoButtonTextColor: sanitizeData(hexValueDemoBtnText),
        demoButtonColor: sanitizeData(hexValueDemoBtn),
        bannerTextSize: sanitizeData(bannerTextSize),
        banner2TextSize: sanitizeData(banner2TextSize),
      };
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.EditSectionbyId,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          sectionId: linkObject?._id,
        },

        data,
      });
      console.log("res isndie edit e: ", res);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        setLoading(false);
        setNextBtn(true);
        getHVOTemplate(templateId);
      }
    } catch (error) {
      console.log(error, "error  rishabh");
      toast.error(error.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
      console.log(" data saved!");
    }
    // }
    setError(newError);
  };

  const handleButtonClick = () => {
    setShowTextField(true);
  };
  const handleInputChange = (e) => {
    setButtonText(e.target.value);
  };
  const handleInputChangeDemo = (e) => {
    setDemoButtonText(e.target.value);
  };

  const handleCopy = (text) => {
    const formattedText = `[${text}]`;
    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success("Text copied to clipboard.", {
          autoClose: 500,
        });
      })
      .catch((err) => {
        toast.error("Unable to copy text to clipboard. Please try again.", {
          autoClose: 500,
        });
      });
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setH1((prevH1) => {
      return newValue;
    });
  };

  const getSheetType = async () => {
    try {
      setLoadingSheetType(true);
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getsheettype,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          hvoId: templateId,
        },
      });
      if (res?.data?.status === 200) {
        setCompanyDetails(res?.data?.data?.data);
      }
    } catch (error) {
      console.log("error inside the edit element", error);
    } finally {
      setLoadingSheetType(false);
    }
  };
  useEffect(() => {
    console.log("consol exist color is doing ", existcolor);
  }, [existcolor]);
  useEffect(() => {
    getSheetType();
    sheetFirstRowData();
  }, []);
  useEffect(() => {
    setSelectedOption(linkObject?.headerLogo);
    setBannerText(linkObject?.bannerText);
    setHexValueBannerText(linkObject?.bannerTextColor);
    setHexValueBanner2Text(linkObject?.bannerTextColor);
    setScrollSelect(linkObject?.scroll);
    setShowTextField(false);
    setButtonText(linkObject?.ctaButtonText);
    setDemoButtonText(linkObject?.demoButtonText);
    setHexValueDemoBtnText(linkObject?.demoButtonTextColor);
    setHexValueDemoBtn(linkObject?.demoButtonColor);
    setStaticURLDemo(linkObject?.staticUrlDemo);
    setDynamicSelectedOptionDemo(linkObject?.dynamicUrlDemo);
    setH1(linkObject?.headline1);
    setH2(linkObject?.headline2);
    setH1Size(linkObject?.headline1Size);
    setH2Size(linkObject?.headline2Size);
    setBody(linkObject?.bodyText);
    setBodySize(linkObject?.bodyTextSize);
    setStaticURL(linkObject?.staticUrl);
    linkObject?.sectionType?.sectionName === "RIGHT_TEXT_LEFT_IMAGE"
      ? setImage(linkObject?.leftImageRightText)
      : linkObject?.sectionType?.sectionName === "LEFT_TEXT_RIGHT_IMAGE"
      ? setImage(linkObject?.leftTextRightImageUrl)
      : setImage(linkObject?.heroImg);
    setStaticImage(linkObject?.staticImage);
    setDuration(linkObject?.durationSec);
    // setScroll(linkObject?.scroll);
    setImgName(linkObject?.image);
    setHexValueH1(linkObject?.headline1Color);
    setHexValueH2(linkObject?.headline2Color);
    setHexValueBody(linkObject?.bodyTextColor);
    setHexValueBtn(linkObject?.ctaButtonColor);
    setHexValueBanner(linkObject?.bannerColor);
    setHexValueBtnText(
      linkObject?.ctaButtonTextColor || linkObject?.bannerButtonTextColor
    );
    setBanner2TextSize(linkObject?.banner2TextSize);
    setBannerTextSize(linkObject?.bannerTextSize);
  }, [renderComponent]);

  const getFilteredUrls = (companyDetail) => {
    try {
      if (Array.isArray(companyDetail) && companyDetail.length > 0) {
        return companyDetail
          .filter((item) => item && item.dataType === "URL")
          .map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ));
      }
      return (
        <MenuItem value="" disabled>
          No URLs available
        </MenuItem>
      );
    } catch (error) {
      console.error("Error filtering URLs:", error);
      return (
        <MenuItem value="" disabled>
          Error loading URLs
        </MenuItem>
      );
    }
  };
  const getAccountData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
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
        // setAccountId(res?.data?.data?.accountId);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountData();
  }, []);

  useEffect(() => {
    console.log("consol fn is doing ", fn);
  }, [fn]);
  return (
    <>
      <Box className={classes.secondmaingridBox}>
        <Box
          style={{ marginTop: "12px", marginBottom: "12px", color: "#0358AC" }}
        >
          {linkObject?.sectionType?.sectionName === "HEADER" ? (
            <Typography>Header | Section {linkObject?.sequence}</Typography>
          ) : linkObject?.sectionType?.sectionName === "HERO" ? (
            <Typography>Hero | Section {linkObject?.sequence}</Typography>
          ) : linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER" ? (
            <Typography>
              Highlight Banner | Section {linkObject?.sequence}
            </Typography>
          ) : linkObject?.sectionType?.sectionName ===
            "LEFT_TEXT_RIGHT_IMAGE" ? (
            <Typography>
              Left Text | Right Image | Section {linkObject?.sequence}
            </Typography>
          ) : linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER2" ? (
            <Typography>
              Highlight Banner 2 | Section {linkObject?.sequence}
            </Typography>
          ) : linkObject?.sectionType?.sectionName ===
            "RIGHT_TEXT_LEFT_IMAGE" ? (
            <Typography>
              Right Text | Left Image | Section {linkObject?.sequence}
            </Typography>
          ) : linkObject?.sectionType?.sectionName === "FOOTER" ? (
            <Typography>Footer | Section {linkObject?.sequence}</Typography>
          ) : (
            <></>
          )}
        </Box>
        {linkObject?.sectionType?.sectionName === "HEADER" ? (
          <>
            <Grid container spacing={3} marginTop="12px">
              <Grid item xs={12} sm={6}>
                <Typography className="label">Your Logo (Top Left)</Typography>
                <Box className="d-flex justify-start" mt={"20px"}>
                  <Box
                    style={{
                      maxWidth: "150px",
                      width: "100%",
                      marginRight: "22px",
                    }}
                  >
                    <img
                      src={accountData?.accountDetails?.accountLogo}
                      width={"100%"}
                    />
                  </Box>
                  {isLoading && <FullScreenLoader />}
                  {matchData && (
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FiPlus />
                      <Box
                        style={{
                          maxWidth: " 85px",
                          maxHeight: "85px",
                          width: " 100%",
                          height: "100%",
                          marginLeft: "10px",
                        }}
                      >
                        <img src={matchData} width={"100%"} alt="Selected" />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography className="label">
                  Optional: Dynamic Logo
                </Typography>
                <FormControl style={{ marginTop: "20px" }}>
                  <Select
                    variant="outlined"
                    className="selectitem"
                    id="choose-template"
                    fullWidth
                    MenuProps={menuProps}
                    value={selectedOption}
                    onChange={(e) => handleChangetitle(e)}
                    name=""
                    IconComponent={ExpandMoreIcon}
                  >
                    <MenuItem value="none" disabled>
                      Select Logo
                    </MenuItem>
                    <MenuItem value="none">Select None</MenuItem>
                    {companyDetails !== undefined &&
                      companyDetails.length > 0 &&
                      companyDetails
                        ?.filter((item) => item?.dataType == "Logo")
                        ?.map((item) => (
                          <MenuItem
                            value={item?.value}
                            // onClick={(e) => {
                            //   console.log(e);
                            // }}
                          >
                            {item?.value}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </>
        ) : linkObject?.sectionType?.sectionName === "HERO" ? (
          <>
            <Grid container spacing={3} marginTop="12px">
              <Grid item xs={12}>
                <Typography className="heading" style={{ color: "#152F40" }}>
                  Upload Static Image
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Upload Image"
                  value={staticImage}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onClick={handleOpenDialog}
                        />

                        <Button className="savebtn" onClick={handleOpenDialog}>
                          Choose
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className="error">{error.image}</Typography>
                <Typography
                  className="heading"
                  style={{ color: "#152F40", marginTop: "20px" }}
                >
                  Select Dynamic Image
                </Typography>
                <Select
                  style={{ marginTop: "5px" }}
                  variant="outlined"
                  className="selectitem"
                  id="choose-template"
                  fullWidth
                  MenuProps={menuProps}
                  value={image}
                  onChange={handleDynamicimage}
                  IconComponent={ExpandMoreIcon}
                  // error={!!error.image}
                  // helperText={error.image}
                >
                  <MenuItem value="none" disabled>
                    Select Dynamic URL to fetch image
                  </MenuItem>
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    companyDetails
                      ?.filter(
                        (item) =>
                          item?.dataType == "Image URL" ||
                          item?.dataType === "Screenshot from URL"
                      )
                      ?.map((item) => (
                        <MenuItem value={item?.value}>{item?.value}</MenuItem>
                      ))}
                </Select>
                {/* <Typography className="error">{error.image}</Typography> */}
              </Grid>

              <Grid item xs={12} sm={8}>
                <Grid container style={{ gap: "15px" }}>
                  <Grid item xs={10}>
                    <Typography className="label">Headline 1</Typography>
                    <TextField
                      fullWidth
                      value={h1}
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 100) {
                          setH1(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1: "Maximum character count is 100.",
                          }));
                        }
                      }}
                      error={!!error.h1}
                      helperText={error.h1}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      value={h1Size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setH1Size("");
                          setError((prevError) => ({
                            ...prevError,
                            h1Size: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 26) {
                            setH1Size(value);
                            setError((prevError) => ({
                              ...prevError,
                              h1Size: "",
                            }));
                          } else {
                            setError((prevError) => ({
                              ...prevError,
                              h1Size: "Value must be 26 or less",
                            }));
                          }
                        }
                      }}
                      placeholder="00"
                      inputProps={{
                        maxLength: 2,
                        type: "number",
                        min: 0,
                        max: 99,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />
                    <Typography className="error">
                      {error.h1Size}{" "}
                      <span className={classes.hinttext}>(Max 26 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Heading 1 Color
                    </Typography>

                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueH1}
                        onChange={(event) =>
                          setHexValueH1(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerH1(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Modal
                        open={showColorPickerH1}
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
                            color={hexValueH1}
                            onChange={(color) =>
                              setHexValueH1(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorH1}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorH1}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="label">Headline 2</Typography>
                    <TextField
                      fullWidth
                      value={h2}
                      variant="outlined"
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 150) {
                          setH2(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2: "Maximum character count is 150.",
                          }));
                        }
                      }}
                      error={!!error.h2}
                      helperText={error.h2}
                    />
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      value={h2Size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setH2Size("");
                          setError((prevError) => ({
                            ...prevError,
                            h2Size: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 36) {
                            setH2Size(value);
                            setError((prevError) => ({
                              ...prevError,
                              h2Size: "",
                            }));
                          } else {
                            setError((prevError) => ({
                              ...prevError,
                              h2Size: "Value must be 36 or less",
                            }));
                          }
                        }
                      }}
                      placeholder="00"
                      inputProps={{
                        maxLength: 2,
                        type: "number",
                        min: 0,
                        max: 99,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />
                    <Typography className="error">
                      {error.h2Size}{" "}
                      <span className={classes.hinttext}>(Max 36 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Heading 2 Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueH2}
                        onChange={(event) =>
                          setHexValueH2(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerH2(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Modal
                        open={showColorPickerH2}
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
                            color={hexValueH2}
                            onChange={(color) =>
                              setHexValueH2(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorH2}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorH2}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="label">Body Text</Typography>
                    <TextField
                      fullWidth
                      value={body}
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 200) {
                          setBody(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            body: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            body: "Maximum character count is 200.",
                          }));
                        }
                      }}
                      error={!!error.body}
                      multiline
                      minRows={5}
                      rows={5}
                      variant="outlined"
                    />
                    <Typography className="error">
                      {error.body}{" "}
                      <span className={classes.hinttext}>
                        (Max 200 Characters)
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      value={bodySize}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setBodySize("");
                          setError((prevError) => ({
                            ...prevError,
                            setBodySize: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 18) {
                            setBodySize(value);
                            setError((prevError) => ({
                              ...prevError,
                              bodySize: "",
                            }));
                          } else {
                            setError((prevError) => ({
                              ...prevError,
                              bodySize: "Value must be 18 or less",
                            }));
                          }
                        }
                      }}
                      placeholder="00"
                      inputProps={{
                        maxLength: 2,
                        type: "number",
                        min: 0,
                        max: 99,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />
                    <Typography className="error">
                      {error.bodySize}{" "}
                      <span className={classes.hinttext}>(Max 18 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Body Text Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueBody}
                        onChange={(event) =>
                          setHexValueBody(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerBody(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Modal
                        open={showColorPickerBody}
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
                            color={hexValueBody}
                            onChange={(color) =>
                              setHexValueBody(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorBody}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorBody}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  className="dynamicFieldsBox d-flex column alignstart justify-start"
                  p={2}
                >
                  <Typography className="label">
                    Copy to Add Dynamic Fields
                  </Typography>

                  <div>
                    <div style={{ height: "630px", overflowY: "auto" }}>
                      {companyDetails !== undefined &&
                        companyDetails.length > 0 &&
                        companyDetails
                          ?.filter(
                            (item) =>
                              item?.dataType === "Text" ||
                              item?.dataType === "First name" ||
                              item?.dataType === "Last name" ||
                              item?.dataType === "Customer organization"
                          )
                          ?.map((sheetfield, ind) => (
                            <Tooltip
                              title={sheetfield?.value || "Copy Text"}
                              arrow
                            >
                              <TextField
                                fullWidth
                                value={
                                  sheetfield?.value.length > 20
                                    ? `${sheetfield.value.substring(0, 20)}...`
                                    : sheetfield?.value
                                }
                                variant="outlined"
                                placeholder={sheetfield}
                                InputProps={{
                                  readOnly: true,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() => {
                                          handleCopy(sheetfield?.value);
                                        }}
                                      >
                                        <Copy style={{ color: "#858585" }} />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{ maxLength: 60, minLength: 2 }}
                              />
                            </Tooltip>
                          ))}
                    </div>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography className="label">CTA Button Text</Typography>

                <TextField
                  placeholder="Enter Button Text"
                  variant="outlined"
                  fullWidth
                  value={buttonText}
                  // onChange={handleInputChange}
                  onChange={(e) => {
                    const value = e.target.value.replace(htmlTagRegex, "");
                    const isSpecialCase =
                      value.startsWith("[") && value.endsWith("]");
                    if (isSpecialCase || value.length <= 20) {
                      setButtonText(value);
                      setError((prevErrors) => ({
                        ...prevErrors,
                        CTA: "",
                      }));
                    } else {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        CTA: "Maximum character count is 20.",
                      }));
                    }
                  }}
                  error={!!error.CTA}
                  helperText={error.CTA}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography className="label">
                  Choose Button Text Color
                </Typography>
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Choose Color"
                    value={hexValueBtnText}
                    onChange={(event) =>
                      setHexValueBtnText(event.target.value.toUpperCase())
                    }
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowColorPickerBtnText(true)}
                          >
                            <CgColorPicker
                              style={{
                                color: "#0358AC",
                                padding: "0px",
                                height: "20px",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!error.hexValueBtnText}
                    helperText={error.hexValueBtnText}
                  />
                  <Modal
                    open={showColorPickerBtnText}
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
                        color={hexValueBtnText}
                        onChange={(color) =>
                          setHexValueBtnText(color.hex.toUpperCase())
                        }
                      />
                      <div className={classes.colorpickerbtndiv}>
                        <Button
                          onClick={handleSaveColorBtnText}
                          variant="outlined"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelColorBtnText}
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography className="label">
                  Choose CTA Button Color
                </Typography>
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Choose Color"
                    value={hexValueBtn}
                    onChange={(event) =>
                      setHexValueBtn(event.target.value.toUpperCase())
                    }
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowColorPickerBtn(true)}
                          >
                            <CgColorPicker
                              style={{
                                color: "#0358AC",
                                padding: "0px",
                                height: "20px",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Modal
                    open={showColorPickerBtn}
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
                        color={hexValueBtn}
                        onChange={(color) =>
                          setHexValueBtn(color.hex.toUpperCase())
                        }
                      />
                      <div className={classes.colorpickerbtndiv}>
                        <Button onClick={handleSaveColorBtn} variant="outlined">
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelColorBtn}
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography className="label">
                  If Static Enter Static URL Here
                </Typography>
                <TextField
                  variant="outlined"
                  value={staticURL}
                  onChange={handleStaticUrl}
                  fullWidth
                  placeholder="Enter Link URL"
                />
                <Typography className="error">{error.static}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="label">
                  If Dynamic URL Select Here
                </Typography>
                <Select
                  variant="outlined"
                  className="selectitem"
                  id="choose-template"
                  fullWidth
                  style={{ marginTop: "5px" }}
                  name=""
                  MenuProps={menuProps}
                  IconComponent={ExpandMoreIcon}
                  value={selectedDynamicOption}
                  // onClick={setCompanyDetails}
                  onChange={handleChangeDynamicURL}
                >
                  <MenuItem value="none" disabled>
                    Select Dynamic Url
                  </MenuItem>
                  <MenuItem value="none">Select None</MenuItem>
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    companyDetails
                      ?.filter((item) => item?.dataType === "URL")
                      ?.map((item) => (
                        <MenuItem value={item?.value}>{item?.value}</MenuItem>
                      ))}
                </Select>
                <Typography className="error">{error.dynamic}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography className="label" style={{ marginBottom: "20px" }}>
                  Demo Text
                </Typography>
                <TextField
                  placeholder="Enter Button Text"
                  variant="outlined"
                  fullWidth
                  value={demoButtonText}
                  onChange={(e) => {
                    const value = e.target.value.replace(htmlTagRegex, "");
                    const isSpecialCase =
                      value.startsWith("[") && value.endsWith("]");
                    if (value.length === 0) {
                      setStaticURLDemo("");
                      setHexValueDemoBtnText("");
                      setHexValueDemoBtn("");
                      setStaticURLDemo("");
                      setDynamicSelectedOptionDemo("none");
                    }
                    if (isSpecialCase || value.length <= 30) {
                      setDemoButtonText(value);
                      setError((prevErrors) => ({
                        ...prevErrors,
                        Demo: "",
                      }));
                    } else {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        Demo: "Maximum character count is 30.",
                      }));
                    }
                  }}
                  error={!!error.Demo}
                  helperText={error.Demo}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography className="label" style={{ marginBottom: "20px" }}>
                  Choose Demo Text Color
                </Typography>
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Choose Color"
                    value={hexValueDemoBtnText}
                    onChange={(event) =>
                      setHexValueDemoBtnText(event.target.value.toUpperCase())
                    }
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowColorPickerDemoBtnText(true)}
                          >
                            <CgColorPicker
                              style={{
                                color: "#0358AC",
                                padding: "0px",
                                height: "20px",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!error.hexValueDemoBtnText}
                    helperText={error.hexValueDemoBtnText}
                  />
                  <Modal
                    open={showColorPickerDemoBtnText}
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
                        color={hexValueDemoBtnText}
                        onChange={(color) =>
                          setHexValueDemoBtnText(color.hex.toUpperCase())
                        }
                      />
                      <div className={classes.colorpickerbtndiv}>
                        <Button
                          onClick={handleSaveColorDemoBtnText}
                          variant="outlined"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelColorDemoBtnText}
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography className="label">
                  Choose Demo Text Hover Color
                </Typography>
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Choose Color"
                    value={hexValueDemoBtn}
                    onChange={(event) =>
                      setHexValueDemoBtn(event.target.value.toUpperCase())
                    }
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowColorPickerDemoBtn(true)}
                          >
                            <CgColorPicker
                              style={{
                                color: "#0358AC",
                                padding: "0px",
                                height: "20px",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!error.hexValueDemoBtn}
                    helperText={error.hexValueDemoBtn}
                  />
                  <Modal
                    open={showColorPickerDemoBtn}
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
                        color={hexValueDemoBtn}
                        onChange={(color) =>
                          setHexValueDemoBtn(color.hex.toUpperCase())
                        }
                      />
                      <div className={classes.colorpickerbtndiv}>
                        <Button
                          onClick={handleSaveColorDemoBtn}
                          variant="outlined"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelColorDemoBtn}
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography className="label">
                  If Static Enter Static URL Here
                </Typography>
                <TextField
                  variant="outlined"
                  value={staticURLDemo}
                  onChange={handleStaticUrlDemo}
                  fullWidth
                  placeholder="Enter Link URL"
                />
                <Typography className="error">{error.staticDemo}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="label">
                  If Dynamic URL Select Here
                </Typography>
                <Select
                  variant="outlined"
                  className="selectitem"
                  id="choose-template"
                  fullWidth
                  style={{ marginTop: "5px" }}
                  name=""
                  MenuProps={menuProps}
                  IconComponent={ExpandMoreIcon}
                  value={selectedDynamicOptionDemo}
                  // onClick={setCompanyDetails}
                  onChange={handleChangeDynamicURLDemo}
                >
                  <MenuItem value="none" disabled>
                    Select Dynamic Url
                  </MenuItem>
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    companyDetails
                      ?.filter((item) => item?.dataType === "URL")
                      ?.map((item) => (
                        <MenuItem value={item?.value}>{item?.value}</MenuItem>
                      ))}
                </Select>
                <Typography className="error">{error.dynamicDemo}</Typography>
              </Grid>
            </Grid>
          </>
        ) : linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER" ? (
          <>
            <Grid container spacing={2} marginTop="12px">
              <Grid item sx={12} sm={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <Typography className="label">Horizontal Scroll</Typography>
                    <Select
                      variant="outlined"
                      className="selectitem"
                      id="choose-template"
                      fullWidth
                      MenuProps={menuProps}
                      value={scrollSelect}
                      onChange={(e) => {
                        setScrollSelect(e.target.value);
                        setError((prevError) => ({
                          ...prevError,
                          selectScroll: "",
                        }));
                      }}
                      name=""
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem value="none" disabled>
                        Select{" "}
                      </MenuItem>
                      <MenuItem value={true}>YES</MenuItem>
                      <MenuItem value={false}>NO</MenuItem>
                    </Select>
                    <Typography className="error">
                      {error.selectScroll}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography className="label">Banner Text</Typography>
                    <TextField
                      fullWidth
                      value={bannerText}
                      onChange={(e) => {
                        const value = e.target.value;
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 160) {
                          setBannerText(value);
                          setError((prevError) => ({
                            ...prevError,
                            bannerText: "",
                          }));
                        } else {
                          setError((prevError) => ({
                            ...prevError,
                            bannerText: "Maximum 160 characters allowed",
                          }));
                        }
                      }}
                      variant="outlined"
                      style={{ marginTop: "2px" }}
                      placeholder="Enter Your Banner Text Here"
                    />
                    <Typography className="error" style={{ color: "red" }}>
                      {error.bannerText}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>

                    <TextField
                      variant="outlined"
                      value={bannerTextSize}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === "00" || value === "0") {
                          setBannerTextSize("");
                          setError((prevError) => ({
                            ...prevError,
                            bannerTextSize: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 32) {
                            setBannerTextSize(value);
                            setError((prevError) => ({
                              ...prevError,
                              bannerTextSize: "",
                            }));
                          } else {
                            setError((prevError) => ({
                              ...prevError,
                              bannerTextSize: "Value must be 32 or less",
                            }));
                          }
                        }
                      }}
                      placeholder="00"
                      inputProps={{
                        maxLength: 2,
                        type: "number",
                        min: 0,
                        max: 99,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />

                    <Typography className="error">
                      {error.bannerTextSize}

                      <span
                        className={classes.hinttext}
                        style={{ paddingLeft: "28px" }}
                      >
                        (Max 32 px.)
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Banner Color
                    </Typography>

                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Choose Color"
                      onClick={() => setShowColorPickerBanner(true)}
                      value={hexValueBanner}
                      onChange={(event) =>
                        setHexValueBanner(event.target.value.toUpperCase())
                      }
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowColorPickerBanner(true)}
                            >
                              <CgColorPicker
                                style={{
                                  color: "#0358AC",
                                  padding: "0px",
                                  height: "20px",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Modal
                      open={showColorPickerBanner}
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
                          color={hexValueBanner}
                          onChange={(color) =>
                            setHexValueBanner(color.hex.toUpperCase())
                          }
                        />
                        <div className={classes.colorpickerbtndiv}>
                          <Button
                            onClick={handleSaveColorBanner}
                            variant="outlined"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelColorBanner}
                            variant="contained"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </Grid>
                  <Grid item xs={6} className="colorField">
                    <Typography className="label">
                      {" "}
                      Choose Banner Text Color
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Choose Color"
                      onClick={() => setShowColorPickerBannerText(true)}
                      value={hexValueBannerText}
                      onChange={(event) => {
                        console.log(event.target.value);
                        setHexValueBannerText(event.target.value.toUpperCase());
                      }}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowColorPickerBannerText(true)}
                            >
                              <CgColorPicker
                                style={{
                                  color: "#0358AC",
                                  padding: "0px",
                                  height: "20px",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={!!error.hexValueBannerText}
                      helperText={error.hexValueBannerText}
                    />
                    <Modal
                      open={showColorPickerBannerText}
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
                          color={hexValueBannerText}
                          onChange={(color) => {
                            console.log(color.hex.toUpperCase());
                            setHexValueBannerText(color.hex.toUpperCase());
                          }}
                        />
                        <div className={classes.colorpickerbtndiv}>
                          <Button
                            onClick={handleSaveColorBannerText}
                            variant="outlined"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelColorBannerText}
                            variant="contained"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </Grid>{" "}
                </Grid>
              </Grid>

              <Grid item sx={12} sm={4}>
                <Box
                  className="dynamicFieldsBox d-flex column alignstart justify-start"
                  p={2}
                >
                  <Typography className="label">
                    Copy to Add Dynamic Fields
                  </Typography>

                  <div>
                    <div style={{ height: "260px", overflowY: "auto" }}>
                      {companyDetails !== undefined &&
                        companyDetails.length > 0 &&
                        companyDetails
                          ?.filter(
                            (item) =>
                              item?.dataType === "Text" ||
                              item?.dataType === "First name" ||
                              item?.dataType === "Last name" ||
                              item?.dataType === "Customer organization"
                          )
                          ?.map((sheetfield, ind) => (
                            <Tooltip
                              title={sheetfield?.value || "Copy Text"}
                              arrow
                            >
                              <TextField
                                fullWidth
                                value={
                                  sheetfield?.value.length > 20
                                    ? `${sheetfield.value.substring(0, 20)}...`
                                    : sheetfield?.value
                                }
                                variant="outlined"
                                placeholder={sheetfield}
                                InputProps={{
                                  readOnly: true,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() => {
                                          handleCopy(sheetfield?.value);
                                        }}
                                      >
                                        <Copy style={{ color: "#858585" }} />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{ maxLength: 60, minLength: 2 }}
                              />
                            </Tooltip>
                          ))}
                    </div>
                  </div>
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
              <Typography className="label">
                If Static Enter Static URL Here
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter Link URL"
                value={staticURL}
                onChange={handleStaticUrl}
                name="staticURL"
                disabled={scrollSelect === true}
              />
              <Typography className="error">{}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography className="label">
                If Dynamic URL Select Here
              </Typography>
              <Select
                style={{ marginTop: "5px" }}
                variant="outlined"
                className="selectitem"
                id="choose-template"
                fullWidth
                MenuProps={menuProps}
                value={selectedDynamicOption}
                onChange={handleChangeDynamicURL}
                IconComponent={ExpandMoreIcon}
                disabled={scrollSelect === true}
              >
                <MenuItem value="none" disabled>
                  Select Dynamic Url
                </MenuItem>
                <MenuItem>Company Url</MenuItem>
                <MenuItem>LinkedIn Url</MenuItem>
                <MenuItem>Map Url</MenuItem>
                <MenuItem>Facebook Url</MenuItem>
              </Select>
              <Typography className="error">{}</Typography>
            </Grid> */}
            </Grid>
          </>
        ) : linkObject?.sectionType?.sectionName === "LEFT_TEXT_RIGHT_IMAGE" ? (
          <>
            <Grid container spacing={3} marginTop="12px">
              {companyDetails && (
                <Grid item xs={12}>
                  <Typography className="heading" style={{ color: "#152F40" }}>
                    Upload Static Image
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Uplaod Image"
                    // value={linkObject?.image}
                    value={staticImage}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <input
                            type="file"
                            accept="image/jpeg, image/png,image/jpg"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onClick={handleOpenDialog}
                          />
                          <Button
                            className="savebtn"
                            onClick={handleOpenDialog}
                          >
                            Upload
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography
                    className="heading"
                    style={{ color: "#152F40", marginTop: "20px" }}
                  >
                    Select Dynamic Image
                  </Typography>
                  <Select
                    style={{ marginTop: "5px" }}
                    variant="outlined"
                    className="selectitem"
                    id="choose-template"
                    fullWidth
                    MenuProps={menuProps}
                    value={image}
                    onChange={handleDynamicimage}
                    IconComponent={ExpandMoreIcon}
                    error={!!error.image}
                    helperText={error.image}
                  >
                    <MenuItem value="none" disabled>
                      Select Dynamic URL to fetch image
                    </MenuItem>
                    {companyDetails !== undefined &&
                      companyDetails.length > 0 &&
                      companyDetails
                        ?.filter(
                          (item) =>
                            item?.dataType === "Image URL" ||
                            item?.dataType === "Screenshot from URL"
                        )
                        ?.map((item) => (
                          <MenuItem value={item?.value}>{item?.value}</MenuItem>
                        ))}
                  </Select>
                  <Typography className="error">{error.image}</Typography>
                </Grid>
              )}
              <Grid item xs={12} sm={8}>
                <Grid container style={{ gap: "15px" }}>
                  <Grid item xs={10}>
                    <Typography className="label">Headline 1</Typography>
                    <TextField
                      fullWidth
                      // value={linkObject?.headline1}
                      value={h1}
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 100) {
                          setH1(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1: "Maximum character count is 100.",
                          }));
                        }
                      }}
                      error={!!error.h1}
                      helperText={error.h1}
                      // onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      // value={linkObject?.headline1Size}
                      value={h1Size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setH1Size("");
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1Size: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 26) {
                            setH1Size(value);
                            setError((prevErrors) => ({
                              ...prevErrors,
                              h1Size: "",
                            }));
                          } else {
                            setError((prevErrors) => ({
                              ...prevErrors,
                              h1Size: "Value must be 26 or less",
                            }));
                          }
                        }
                      }}
                    />
                    <Typography className="error">
                      {error.h1Size}{" "}
                      <span className={classes.hinttext}>(Max 26 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Heading 1 Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueH1}
                        onChange={(event) =>
                          setHexValueH1(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerH1(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueH1}
                        helperText={error.hexValueH1}
                      />
                      <Modal
                        open={showColorPickerH1}
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
                            color={hexValueH1}
                            onChange={(color) =>
                              setHexValueH1(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorH1}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorH1}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="label">Headline 2</Typography>
                    <TextField
                      fullWidth
                      value={h2}
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 100) {
                          setH2(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2: "Maximum character count is 100.",
                          }));
                        }
                      }}
                      error={!!error.h2}
                      helperText={error.h2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      value={h2Size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setH2Size("");
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2Size: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 36) {
                            setH2Size(value);
                            setError((prevErrors) => ({
                              ...prevErrors,
                              h2Size: "",
                            }));
                          } else {
                            setError((prevErrors) => ({
                              ...prevErrors,
                              h2Size: "Value must be 36 or less",
                            }));
                          }
                        }
                      }}
                    />
                    <Typography className="error">
                      {error.h2Size}{" "}
                      <span className={classes.hinttext}>(Max 36 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Heading 2 Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueH2}
                        onChange={(event) =>
                          setHexValueH2(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerH2(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueH2}
                        helperText={error.hexValueH2}
                      />
                      <Modal
                        open={showColorPickerH2}
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
                            color={hexValueH2}
                            onChange={(color) =>
                              setHexValueH2(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorH2}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorH2}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="label">Body Text</Typography>
                    <TextField
                      fullWidth
                      value={body}
                      multiline
                      minRows={5}
                      rows={5}
                      variant="outlined"
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 400) {
                          setBody(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            body: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            body: "Maximum character count is 400.",
                          }));
                        }
                      }}
                    />
                    <Typography className="error">
                      {error.body}{" "}
                      <span className={classes.hinttext}>
                        (Max 400 Characters)
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      // value={linkObject?.bodyTextSize}
                      value={bodySize}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setBodySize("");
                          setError((prevErrors) => ({
                            ...prevErrors,
                            bodySize: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 18) {
                            setBodySize(value);
                            setError((prevErrors) => ({
                              ...prevErrors,
                              bodySize: "",
                            }));
                          } else {
                            setError((prevErrors) => ({
                              ...prevErrors,
                              bodySize: "Value must be 18 or less",
                            }));
                          }
                        }
                      }}
                    />
                    <Typography className="error">
                      {error.bodySize}{" "}
                      <span className={classes.hinttext}>(Max 18 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Body Text Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueBody}
                        onChange={(event) =>
                          setHexValueBody(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerBody(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueBody}
                        helperText={error.hexValueBody}
                      />
                      <Modal
                        open={showColorPickerBody}
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
                            color={hexValueBody}
                            onChange={(color) =>
                              setHexValueBody(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorBody}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorBody}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  className="dynamicFieldsBox d-flex column alignstart justify-start"
                  p={2}
                >
                  <Typography className="label">
                    Copy to Add Dynamic Fields
                  </Typography>

                  <div>
                    <div style={{ height: "640px", overflowY: "auto" }}>
                      {companyDetails !== undefined &&
                        companyDetails.length > 0 &&
                        companyDetails
                          ?.filter(
                            (item) =>
                              item?.dataType === "Text" ||
                              item?.dataType === "First name" ||
                              item?.dataType === "Last name" ||
                              item?.dataType === "Customer organization"
                          )
                          ?.map((sheetfield, ind) => (
                            <Tooltip
                              title={sheetfield?.value || "Copy Text"}
                              arrow
                            >
                              <TextField
                                fullWidth
                                value={
                                  sheetfield?.value.length > 20
                                    ? `${sheetfield.value.substring(0, 20)}...`
                                    : sheetfield?.value
                                }
                                variant="outlined"
                                placeholder={sheetfield}
                                InputProps={{
                                  readOnly: true,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() => {
                                          handleCopy(sheetfield?.value);
                                        }}
                                      >
                                        <Copy style={{ color: "#858585" }} />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{ maxLength: 60, minLength: 2 }}
                              />
                            </Tooltip>
                          ))}
                    </div>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER2" ? (
          <>
            <Grid container spacing={2} marginTop="12px">
              <Grid item sx={12} sm={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <Typography className="label">Banner Text</Typography>
                    <TextField
                      fullWidth
                      value={bannerText}
                      onChange={(e) => {
                        const value = e.target.value;
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 60) {
                          setBannerText(value);
                          setError((prevError) => ({
                            ...prevError,
                            bannerText: "",
                          }));
                        } else {
                          setError((prevError) => ({
                            ...prevError,
                            bannerText: "Maximum character count is 60.",
                          }));
                        }
                      }}
                      variant="outlined"
                      style={{ marginTop: "2px" }}
                      placeholder="Enter Your Banner Text Here"
                    />
                    <Typography className="error">
                      {error.bannerText}
                    </Typography>
                  </Grid>

                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Banner Color
                    </Typography>

                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Choose Color"
                      onClick={() => setShowColorPickerBanner(true)}
                      value={hexValueBanner}
                      onChange={(event) =>
                        setHexValueBanner(event.target.value.toUpperCase())
                      }
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowColorPickerBanner(true)}
                            >
                              <CgColorPicker
                                style={{
                                  color: "#0358AC",
                                  padding: "0px",
                                  height: "20px",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Modal
                      open={showColorPickerBanner}
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
                          color={hexValueBanner}
                          onChange={(color) =>
                            setHexValueBanner(color.hex.toUpperCase())
                          }
                        />
                        <div className={classes.colorpickerbtndiv}>
                          <Button
                            onClick={handleSaveColorBanner}
                            variant="outlined"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelColorBanner}
                            variant="contained"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>

                    <TextField
                      variant="outlined"
                      value={banner2TextSize}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === "00" || value === "0") {
                          setBanner2TextSize("");

                          setError((prevError) => ({
                            ...prevError,

                            banner2TextSize: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 32) {
                            setBanner2TextSize(value);

                            setError((prevError) => ({
                              ...prevError,

                              banner2TextSize: "",
                            }));
                          } else {
                            setError((prevError) => ({
                              ...prevError,

                              banner2TextSize: "Value must be 32 or less",
                            }));
                          }
                        }
                      }}
                      placeholder="00"
                      inputProps={{
                        maxLength: 2,
                        type: "number",
                        min: 0,
                        max: 99,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />

                    <Typography className="error">
                      {error.banner2TextSize}
                      <span
                        className={classes.hinttext}
                        style={{ paddingLeft: "28px" }}
                      >
                        (Max 32 px.)
                      </span>
                    </Typography>
                  </Grid>

                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Banner Text Color
                    </Typography>

                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Choose Color"
                      onClick={() => setShowColorPickerBanner2Text(true)}
                      value={hexValueBanner2Text}
                      onChange={(event) =>
                        setHexValueBanner2Text(event.target.value.toUpperCase())
                      }
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowColorPickerBanner2Text(true)
                              }
                            >
                              <CgColorPicker
                                style={{
                                  color: "#0358AC",
                                  padding: "0px",
                                  height: "20px",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={!!error.hexValueBannerText}
                      helperText={error.hexValueBannerText}
                    />
                    <Modal
                      open={showColorPickerBanner2Text}
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
                          color={hexValueBanner2Text}
                          onChange={(color) =>
                            setHexValueBanner2Text(color.hex.toUpperCase())
                          }
                        />
                        <div className={classes.colorpickerbtndiv}>
                          <Button
                            onClick={handleSaveColorBanner2Text}
                            variant="outlined"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelColorBanner2Text}
                            variant="contained"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </Grid>
                  {/* <Grid item xs={6}></Grid> */}
                  <Grid item xs={12} sm={6}>
                    <Typography className="label">CTA Button</Typography>
                    <Box mt={2}>
                      <TextField
                        className="ctabtntext"
                        placeholder="Enter Button Text"
                        variant="outlined"
                        fullWidth
                        value={buttonText}
                        // onChange={handleInputChange}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            htmlTagRegex,
                            ""
                          );
                          const isSpecialCase =
                            value.startsWith("[") && value.endsWith("]");
                          if (isSpecialCase || value.length <= 20) {
                            setButtonText(value);
                            setError((prevErrors) => ({
                              ...prevErrors,
                              CTA: "",
                            }));
                          } else {
                            setError((prevErrors) => ({
                              ...prevErrors,
                              CTA: "Maximum character count is 20.",
                            }));
                          }
                        }}
                        disabled={scrollSelect === true}
                      />

                      <Typography className="error">{error.CTA}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="label">
                      Choose Button Text Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueBtnText}
                        onChange={(event) =>
                          setHexValueBtnText(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerBtnText(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueBtnText}
                        helperText={error.hexValueBtnText}
                      />
                      <Modal
                        open={showColorPickerBtnText}
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
                            color={hexValueBtnText}
                            onChange={(color) =>
                              setHexValueBtnText(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorBtnText}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorBtnText}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className="label">
                      Choose CTA Button Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        onClick={() =>
                          scrollSelect !== true && setShowColorPickerBtn(true)
                        }
                        value={hexValueBtn}
                        onChange={(event) =>
                          setHexValueBtn(event.target.value.toUpperCase())
                        }
                        disabled={scrollSelect === true}
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  scrollSelect !== true &&
                                  setShowColorPickerBtn(true)
                                }
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueBtn}
                        helperText={error.hexValueBtn}
                      />
                      <Modal
                        open={showColorPickerBtn}
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
                            color={hexValueBtn}
                            onChange={(color) =>
                              setHexValueBtn(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorBtn}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorBtn}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={12} sm={4}>
                <Box
                  className="dynamicFieldsBox d-flex column alignstart justify-start"
                  p={2}
                >
                  <Typography className="label">
                    Copy to Add Dynamic Fields
                  </Typography>

                  <div>
                    <div style={{ height: "241px", overflowY: "auto" }}>
                      {companyDetails !== undefined &&
                        companyDetails.length > 0 &&
                        companyDetails
                          ?.filter(
                            (item) =>
                              item?.dataType === "Text" ||
                              item?.dataType === "First name" ||
                              item?.dataType === "Last name" ||
                              item?.dataType === "Customer organization"
                          )
                          ?.map((sheetfield, ind) => (
                            <Tooltip
                              title={sheetfield?.value || "Copy Text"}
                              arrow
                            >
                              <TextField
                                fullWidth
                                value={
                                  sheetfield?.value.length > 20
                                    ? `${sheetfield.value.substring(0, 20)}...`
                                    : sheetfield?.value
                                }
                                variant="outlined"
                                placeholder={sheetfield}
                                InputProps={{
                                  readOnly: true,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() => {
                                          handleCopy(sheetfield?.value);
                                        }}
                                      >
                                        <Copy style={{ color: "#858585" }} />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{ maxLength: 60, minLength: 2 }}
                              />
                            </Tooltip>
                          ))}
                    </div>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="label">
                  If Static Enter Static URL Here
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Link URL"
                  value={staticURL}
                  onChange={handleStaticUrl}
                  name="staticURL"
                  disabled={scrollSelect === true}
                />
                <Typography className="error">{}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography className="label">
                  If Dynamic URL Select Here
                </Typography>
                <Select
                  style={{ marginTop: "5px" }}
                  variant="outlined"
                  className="selectitem"
                  id="choose-template"
                  fullWidth
                  MenuProps={menuProps}
                  value={selectedDynamicOption}
                  onChange={handleChangeDynamicURL}
                  IconComponent={ExpandMoreIcon}
                  disabled={scrollSelect === true}
                >
                  <MenuItem value="none" disabled>
                    Select Dynamic Url
                  </MenuItem>
                  {getFilteredUrls(companyDetails)}
                </Select>
                <Typography className="error">{}</Typography>
              </Grid>
            </Grid>
          </>
        ) : linkObject?.sectionType?.sectionName === "RIGHT_TEXT_LEFT_IMAGE" ? (
          <>
            <Grid container spacing={3} marginTop="12px">
              {companyDetails && (
                <Grid item xs={12}>
                  <Typography className="heading" style={{ color: "#152F40" }}>
                    Upload Static Image
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Uplaod Image"
                    value={staticImage}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <input
                            type="file"
                            accept="image/jpeg, image/png,image/jpg"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onClick={handleOpenDialog}
                          />
                          <Button
                            className="savebtn"
                            onClick={handleOpenDialog}
                          >
                            Upload
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography
                    className="heading"
                    style={{ color: "#152F40", marginTop: "20px" }}
                  >
                    Select Dynamic Image
                  </Typography>
                  <Select
                    style={{ marginTop: "5px" }}
                    variant="outlined"
                    className="selectitem"
                    id="choose-template"
                    fullWidth
                    MenuProps={menuProps}
                    value={image}
                    onChange={handleDynamicimage}
                    IconComponent={ExpandMoreIcon}
                    error={!!error.image}
                    helperText={error.image}
                  >
                    {/* <MenuItem value="none" disabled>
                    Select Dynamic URL to fetch image
                  </MenuItem>
                  {getFilteredUrls(companyDetails)} */}

                    <MenuItem value="none" disabled>
                      Select Dynamic URL to fetch image
                    </MenuItem>
                    {companyDetails !== undefined &&
                      companyDetails.length > 0 &&
                      companyDetails
                        ?.filter(
                          (item) =>
                            item?.dataType == "Image URL" ||
                            item?.dataType === "Screenshot from URL"
                        )
                        ?.map((item) => (
                          <MenuItem value={item?.value}>{item?.value}</MenuItem>
                        ))}
                  </Select>
                  <Typography className="error">{error.image}</Typography>
                </Grid>
              )}
              <Grid item xs={12} sm={8}>
                <Grid container style={{ gap: "15px" }}>
                  <Grid item xs={10}>
                    <Typography className="label">Headline 1</Typography>
                    <TextField
                      fullWidth
                      value={h1}
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 100) {
                          setH1(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1: "Maximum character count is 100.",
                          }));
                        }
                      }}
                      error={!!error.h1}
                      helperText={error.h1}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      // value={linkObject?.headline1Size}
                      value={h1Size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setH1Size("");
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h1Size: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 26) {
                            setH1Size(value);
                            setError((prevErrors) => ({
                              ...prevErrors,
                              h1Size: "",
                            }));
                          } else {
                            setError((prevErrors) => ({
                              ...prevErrors,
                              h1Size: "Value must be 26 or less.",
                            }));
                          }
                        }
                      }}
                    />
                    <Typography className="error">
                      {error.h1Size}{" "}
                      <span className={classes.hinttext}>(Max 26 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Heading 1 Color
                    </Typography>

                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueH1}
                        onChange={(event) =>
                          setHexValueH1(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerH1(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueH1}
                        helperText={error.hexValueH1}
                      />
                      <Modal
                        open={showColorPickerH1}
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
                            color={hexValueH1}
                            onChange={(color) =>
                              setHexValueH1(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorH1}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorH1}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="label">Headline 2</Typography>
                    <TextField
                      fullWidth
                      value={h2}
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 100) {
                          setH2(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2: "Maximum character count is 100.",
                          }));
                        }
                      }}
                      error={!!error.h2}
                      helperText={error.h2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      // value={linkObject?.headline2Size}
                      value={h2Size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setH2Size("");
                          setError((prevErrors) => ({
                            ...prevErrors,
                            h2Size: "",
                          }));
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 36) {
                            setH2Size(value);
                            setError((prevError) => ({
                              ...prevError,
                              h2Size: "",
                            }));
                          } else {
                            setError((prevErrors) => ({
                              ...prevErrors,
                              h2Size: "Value must be 36 or less.",
                            }));
                          }
                        }
                      }}
                    />
                    <Typography className="error">
                      {error.h2Size}{" "}
                      <span className={classes.hinttext}>(Max 36 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Heading 2 Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueH2}
                        onChange={(event) =>
                          setHexValueH2(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerH2(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueH2}
                        helperText={error.hexValueH2}
                      />
                      <Modal
                        open={showColorPickerH2}
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
                            color={hexValueH2}
                            onChange={(color) =>
                              setHexValueH2(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorH2}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorH2}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="label">Body Text</Typography>
                    <TextField
                      fullWidth
                      value={body}
                      onChange={(e) => {
                        const value = e.target.value.replace(htmlTagRegex, "");
                        const isSpecialCase =
                          value.startsWith("[") && value.endsWith("]");
                        if (isSpecialCase || value.length <= 400) {
                          setBody(value);
                          setError((prevErrors) => ({
                            ...prevErrors,
                            body: "",
                          }));
                        } else {
                          setError((prevErrors) => ({
                            ...prevErrors,
                            body: "Maximum character count is 400.",
                          }));
                        }
                      }}
                      error={!!error.body}
                      multiline
                      minRows={5}
                      rows={5}
                      variant="outlined"
                    />
                    <Typography className="error">
                      {error.body}{" "}
                      <span className={classes.hinttext}>
                        (Max 400 Characters)
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className="sizeField">
                    <Typography className="label">Size</Typography>
                    <TextField
                      variant="outlined"
                      value={bodySize}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "00" || value === "0") {
                          setBodySize("");
                        } else if (/^\d{0,2}$/.test(value)) {
                          if (Number(value) <= 18) {
                            setBodySize(value);
                            setError((prevError) => ({
                              ...prevError,
                              bodySize: "",
                            }));
                          } else {
                            setError((prevErrors) => ({
                              ...prevErrors,
                              bodySize: "Value must be 18 or less.",
                            }));
                          }
                        }
                      }}
                    />
                    <Typography className="error">
                      {error.bodySize}{" "}
                      <span className={classes.hinttext}>(Max 18 px.)</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5} className="colorField">
                    <Typography className="label">
                      Choose Body Text Color
                    </Typography>
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="Choose Color"
                        value={hexValueBody}
                        onChange={(event) =>
                          setHexValueBody(event.target.value.toUpperCase())
                        }
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowColorPickerBody(true)}
                              >
                                <CgColorPicker
                                  style={{
                                    color: "#0358AC",
                                    padding: "0px",
                                    height: "20px",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!error.hexValueBody}
                        helperText={error.hexValueBody}
                      />
                      <Modal
                        open={showColorPickerBody}
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
                            color={hexValueBody}
                            onChange={(color) =>
                              setHexValueBody(color.hex.toUpperCase())
                            }
                          />
                          <div className={classes.colorpickerbtndiv}>
                            <Button
                              onClick={handleSaveColorBody}
                              variant="outlined"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelColorBody}
                              variant="contained"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  className="dynamicFieldsBox d-flex column alignstart justify-start"
                  p={2}
                >
                  <Typography className="label">
                    Copy to Add Dynamic Fields
                  </Typography>
                  <div>
                    <div style={{ height: "640px", overflowY: "auto" }}>
                      {companyDetails !== undefined &&
                        companyDetails.length > 0 &&
                        companyDetails
                          ?.filter(
                            (item) =>
                              item?.dataType === "Text" ||
                              item?.dataType === "First name" ||
                              item?.dataType === "Last name" ||
                              item?.dataType === "Customer organization"
                          )
                          ?.map((sheetfield, ind) => (
                            <Tooltip
                              title={sheetfield?.value || "Copy Text"}
                              arrow
                            >
                              <TextField
                                fullWidth
                                value={
                                  sheetfield?.value.length > 20
                                    ? `${sheetfield.value.substring(0, 20)}...`
                                    : sheetfield?.value
                                }
                                variant="outlined"
                                // placeholder={sheetfield}
                                InputProps={{
                                  readOnly: true,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() => {
                                          handleCopy(sheetfield?.value);
                                        }}
                                      >
                                        <Copy style={{ color: "#858585" }} />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{ maxLength: 60, minLength: 2 }}
                              />
                            </Tooltip>
                          ))}
                    </div>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : linkObject?.sectionType?.sectionName === "FOOTER" ? (
          <>
            <Modal open={showColorPicker} aria-labelledby="color-picker-modal">
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
                  color={existcolor}
                  onChange={(color) =>
                    // setHexValueH1(color.hex.toUpperCase())
                    {
                      setexistcolor(color);
                      fn(color.hex.toUpperCase());
                    }
                  }
                />
                <div className={classes.colorpickerbtndiv}>
                  <Button onClick={handleSaveColorH1} variant="outlined">
                    Save
                  </Button>
                  <Button onClick={handleCancelColorH1} variant="contained">
                    Cancel
                  </Button>
                </div>
              </Box>
            </Modal>

            <Box style={{ marginTop: "12px" }}>
              {/* <Box mb={3}>
                <Typography className="heading">
                  FOOTER {typeIndex + 1}
                </Typography>
              </Box> */}
              <Grid container spacing={3} style={{ display: "flex" }}>
                <Grid item xs={12}>
                  <Grid container style={{ gap: "15px" }}>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Choose Footer Background Color{" "}
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={footerBackgroundColor}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    setexistcolor(
                                      footerTextHeadingColor.colorpicker
                                    );
                                    setfn(() => fnsetFooterBakgroundColor);
                                    setShowColorPicker(true);
                                  }}
                                >
                                  <CgColorPicker
                                    style={{
                                      color: "#0358AC",
                                      padding: "0px",
                                      height: "20px",
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Choose Footer Heading Text Color{" "}
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={footerTextHeadingColor.colorpicker}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    setexistcolor(
                                      footerTextHeadingColor.colorpicker
                                    );
                                    setfn(
                                      () => fnsetFooterTextHeadingcolorpicker
                                    );
                                    setShowColorPicker(true);
                                  }}
                                >
                                  <CgColorPicker
                                    style={{
                                      color: "#0358AC",
                                      padding: "0px",
                                      height: "20px",
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Grid>
                    <Grid item xs={1} className="sizeField">
                      <Typography
                        className="label"
                        // style={{ marginBottom: "20px" }}
                      >
                        Size
                      </Typography>
                      <TextField
                        variant="outlined"
                        value={leftfooterTextColor.headingSize}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,2}$/.test(value)) {
                            if (Number(value) <= 20) {
                              setLeftfooterTextColor((prev) => ({
                                ...prev,
                                headingSize: value,
                              }));
                              setError((prevError) => ({
                                ...prevError,
                                headingSize: "",
                              }));
                            } else {
                              setError((prevError) => ({
                                ...prevError,
                                headingSize: "Value must be 20 or less",
                              }));
                            }
                          }
                        }}
                        placeholder="00"
                        inputProps={{
                          maxLength: 2,
                          type: "number",
                          min: 0,
                          max: 99,
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        error={!!error.headingSize}
                        helperText={error.headingSize}
                      />
                      <Typography className={classes.hinttext}>
                        (Max 20 px.)
                      </Typography>
                    </Grid>

                    <Grid item xs={5} className="colorField">
                      <Typography
                        className="label"
                        // style={{ marginBottom: "20px" }}
                      >
                        Choose Footer Text Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={leftfooterTextColor.colorpicker}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    setexistcolor(
                                      leftfooterTextColor.colorpicker
                                    );
                                    setfn(() => fnsetLeftFooterTextcolorpicker);
                                    setShowColorPicker(true);
                                  }}
                                >
                                  <CgColorPicker
                                    style={{
                                      color: "#0358AC",
                                      padding: "0px",
                                      height: "20px",
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Grid>
                    <Grid item xs={5} className="colorField">
                      <Typography className="label">
                        Choose Footer Text Hover Color{" "}
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={leftfooterTextColor.hovercolor}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    setexistcolor(
                                      leftfooterTextColor.hovercolor
                                    );
                                    setfn(() => fnsetLeftFooterTexthover);
                                    setShowColorPicker(true);
                                  }}
                                >
                                  <CgColorPicker
                                    style={{
                                      color: "#0358AC",
                                      padding: "0px",
                                      height: "20px",
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Grid>
                    <Grid item xs={1} className="sizeField">
                      <Typography
                        className="label"
                        // style={{ marginBottom: "20px" }}
                      >
                        Size
                      </Typography>
                      <TextField
                        variant="outlined"
                        value={leftfooterTextColor.fontsize}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,2}$/.test(value)) {
                            if (Number(value) <= 20) {
                              setLeftfooterTextColor((prev) => ({
                                ...prev,
                                fontsize: value,
                              }));
                              setError((prevError) => ({
                                ...prevError,
                                fontsize: "",
                              }));
                            } else {
                              setError((prevError) => ({
                                ...prevError,
                                fontsize: "Value must be 20 or less",
                              }));
                            }
                          }
                        }}
                        placeholder="00"
                        inputProps={{
                          maxLength: 2,
                          type: "number",
                          min: 0,
                          max: 99,
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        error={!!error.fontsize}
                        helperText={error.fontsize}
                      />
                      <Typography className={classes.hinttext}>
                        (Max 20 px.)
                      </Typography>
                    </Grid>
                    <Grid item xs={5} className="colorField">
                      <Typography className="label">
                        Choose Icon Background Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={socialIcon.colorpicker}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    setexistcolor(socialIcon.colorpicker);
                                    setfn(() => fnsetSocialIconcolorpicker);
                                    setShowColorPicker(true);
                                  }}
                                >
                                  <CgColorPicker
                                    style={{
                                      color: "#0358AC",
                                      padding: "0px",
                                      height: "20px",
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Grid>
                    <Grid item xs={5} className="colorField">
                      <Typography
                        className="label"
                        // style={{ marginBottom: "20px" }}
                      >
                        Choose Icon Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={socialIcon.hovercolor}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    setexistcolor(socialIcon.hovercolor);
                                    setfn(() => fnsetSocialIconhover);
                                    setShowColorPicker(true);
                                  }}
                                >
                                  <CgColorPicker
                                    style={{
                                      color: "#0358AC",
                                      padding: "0px",
                                      height: "20px",
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Grid>
                    <Grid container style={{ gap: "15px" }}>
                      <Grid item xs={5} className="colorField">
                        <Typography className="label">
                          {" "}
                          Choose Benchmark Color
                        </Typography>
                        <>
                          <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Your HEX Color"
                            value={benchmark.colorpicker}
                            InputProps={{
                              readOnly: true,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => {
                                      setexistcolor(benchmark.colorpicker);
                                      setfn(() => fnsetBenchmarkcolorpicker);
                                      setShowColorPicker(true);
                                    }}
                                  >
                                    <CgColorPicker
                                      style={{
                                        color: "#0358AC",
                                        padding: "0px",
                                        height: "20px",
                                      }}
                                    />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </>
                      </Grid>
                      <Grid item xs={1} className="sizeField">
                        <Typography className="label">Size</Typography>
                        <TextField
                          variant="outlined"
                          value={benchmark.fontsize}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,2}$/.test(value)) {
                              if (Number(value) <= 22) {
                                setBenchmark((prev) => ({
                                  ...prev,
                                  fontsize: value,
                                }));
                                setError((prevError) => ({
                                  ...prevError,
                                  benchmarkFontsize: "",
                                }));
                              } else {
                                setError((prevError) => ({
                                  ...prevError,
                                  benchmarkFontsize: "Value must be 22 or less",
                                }));
                              }
                            }
                          }}
                          placeholder="00"
                          inputProps={{
                            maxLength: 2,
                            type: "number",
                            min: 0,
                            max: 99,
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                          error={!!error.benchmarkFontsize}
                          helperText={error.benchmarkFontsize}
                        />
                        <Typography className={classes.hinttext}>
                          (Max 22 px.)
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      {footerData?.map((linkData, index) => (
                        <Grid item xs={12} key={index}>
                          <Typography
                            className="label"
                            style={{ color: "#152F40" }}
                          >
                            Link {index + 1}:
                          </Typography>

                          <TextField
                            variant="outlined"
                            value={linkData?.link}
                            disabled
                          />

                          <TextField
                            variant="outlined"
                            value={linkData.trackingLinkName}
                            disabled
                          />

                          {index < footerData.length - 1 && <Divider />}
                        </Grid>
                      ))}
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography
                          className="label"
                          style={{ color: "#152F40" }}
                        >
                          Instagram Link
                        </Typography>

                        <TextField
                          variant="outlined"
                          value={instaLink}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          className="label"
                          style={{ color: "#152F40" }}
                        >
                          Facebook Link
                        </Typography>

                        <TextField variant="outlined" value={fbLink} disabled />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          className="label"
                          style={{ color: "#152F40" }}
                        >
                          LinkedIn Link
                        </Typography>

                        <TextField
                          variant="outlined"
                          value={linkedInLink}
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <Grid container style={{ gap: "15px" }}>
                    <Grid item xs={12}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <></>
        )}

        <Box className="secondmaingridbtn">
          <Button
            className={`${nextBtn === true ? "savebtnDisables" : "savebtn"}`}
            mt={2}
            onClick={() => {
              EditSectionbyId();
            }}
            disabled={nextBtn === true}
          >
            Save
          </Button>

          <Button
            className={`${nextBtn === false ? "savebtnDisables" : "savebtn"}`}
            variant="contained"
            onClick={() => {
              submitSummary();
            }}
            disabled={nextBtn === false}
          >
            Next
          </Button>
        </Box>
      </Box>
      {openCrop ? (
        <Dialog open={open} className={classes.mainDialog}>
          <IconButton onClick={handleCloseDialog}></IconButton>

          <Typography variant="body1" className={classes.dialogHeading}>
            Upload Image
          </Typography>
          <CropImageHVO
            photoURL={staticImage}
            type={false}
            setOpenCrop={setOpenCrop}
            setPhotoURL={setPhotoURL}
            setUploadedImage={setStaticImage}
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
            Upload Image
          </Typography>
          {staticImage ? (
            <Box style={{ minHeight: "300px", margin: "0 44px" }}>
              <img
                src={staticImage}
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
                onChange={(e) => {
                  handleFileInputChange(e);
                  setOpenCrop(true);
                }}
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
                  // handleSaveClick6();
                  handleCloseDialog();
                } else {
                  setStaticImage(null);
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
}

export default EditElement;
