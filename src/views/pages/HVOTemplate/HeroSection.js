import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
  Dialog,
  IconButton,
  Modal,
  Tooltip,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Copy } from "react-feather";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
import ApiConfig from "src/config/APIConfig";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import axios from "axios";
import { SketchPicker } from "react-color";
import { CgColorPicker } from "react-icons/cg";
import CloseIcon from "@material-ui/icons/Close";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CropImageHVO from "./CropImageHVO";

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
    "& .savebtn": {
      borderRadius: "0px 6px 6px 0px",
      background: " #0358AC",
      color: "white",
      height: "42px",
      width: "100px",
    },
  },
  secondmaingridBox: {
    borderRadius: "12px",
    background: "#FFF",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    padding: "16px 22px",
    border: "1px solid var(--light-stroke, #ECECEC)",
    "& .MuiButton-root": {
      color: "#152F40",
      background: "transparent",
      height: "42px",
      fontSize: "16px",
    },
    "& .MuiButton-contained": {
      color: "#fff",
      background: "#0358AC",
      height: "48px",
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
    "& .error": {
      fontSize: "12px",
      color: "red",
    },
    "& .label": {
      color: "#152F40",
    },
    "& svg": {
      height: "16px",
      marginRight: "5px",
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
    "& .MuiFormControl-marginNormal": {
      marginTop: "5px !important",
    },
    "& .sizeField": {
      "& .MuiFormControl-root": {
        width: "46px !important",
      },
    },
    "& .ctabtn": {
      fontSize: "14px",
      marginTop: "-10px !important",
    },
    "& .ctabtntext": {
      marginTop: "-10px !important",
    },
    "& .MuiIconButton-root": {
      height: "40px",
      padding: "10px",
    },
  },
  menuitemSecond: {
    width: "100%",
    justifyContent: "space-between",
    border: "1px solid black",
    height: "100%",
    height: "45px",
    marginTop: "6px",
    color: "var(--black, #152F40)",
    borderRadius: "6px",
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
function HeroSection({
  elementType,
  linkData,
  typeIndex,
  getSummary,
  handleScreen,
  videoRefral,
  reload,
}) {
  const classes = useStyles();
  const [imgName, setImgName] = useState();
  const [image, setImage] = useState("none");
  const [staticImage, setStaticImage] = useState("");
  const fileInputRef = useRef(null);
  const [h1, setH1] = useState("");
  const [h2, setH2] = useState("");
  const [body, setBody] = useState("");
  const [h1Size, setH1Size] = useState("");
  const [h2Size, setH2Size] = useState("");
  const [bodySize, setBodySize] = useState("");
  const [staticURL, setStaticURL] = useState("");
  const [staticURLDemo, setStaticURLDemo] = useState("");
  const [sectionData, setSectionData] = useState();
  const [showTextField, setShowTextField] = useState(false);
  const [showDemoTextField, setDemoShowTextField] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [demobuttonText, setDemoButtonText] = useState("");
  const [selectedOption, setSelectedOption] = useState("none");
  const [selectedOptionDemo, setSelectedOptionDemo] = useState("none");
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");
  const [nextButton, setNextButton] = useState(false);

  const [showColorPickerH1, setShowColorPickerH1] = useState(false);
  const [showColorPickerH2, setShowColorPickerH2] = useState(false);
  const [showColorPickerBody, setShowColorPickerBody] = useState(false);
  const [showColorPickerBtn, setShowColorPickerBtn] = useState(false);
  const [showColorPickerDemoBtn, setShowColorPickerDemoBtn] = useState(false);
  const [showColorPickerBtnText, setShowColorPickerBtnText] = useState(false);
  const [showColorPickerDemoBtnText, setShowColorPickerDemoBtnText] =
    useState(false);
  const [hexValueH1, setHexValueH1] = useState("");
  const [hexValueH2, setHexValueH2] = useState("");
  const [hexValueBody, setHexValueBody] = useState("");
  const [hexValueBtn, setHexValueBtn] = useState("");
  const [hexValueDemoBtn, setHexValueDemoBtn] = useState("");
  const [hexValueBtnText, setHexValueBtnText] = useState("");
  const [hexValueDemoBtnText, setHexValueDemoBtnText] = useState("");
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

  const handleSaveColorH1 = () => {
    setShowColorPickerH1(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueH1: "",
    }));
  };

  const handleCancelColorH1 = () => {
    setShowColorPickerH1(false);
  };

  const handleSaveColorH2 = () => {
    setShowColorPickerH2(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueH2: "",
    }));
  };

  const handleCancelColorH2 = () => {
    setShowColorPickerH2(false);
  };
  const handleSaveColorBody = () => {
    setShowColorPickerBody(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueBody: "",
    }));
  };
  const handleCancelColorBody = () => {
    setShowColorPickerBody(false);
  };
  const handleSaveColorBtn = () => {
    setShowColorPickerBtn(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueBtn: "",
    }));
  };
  const handleCancelColorBtn = () => {
    setShowColorPickerBtn(false);
  };

  const handleSaveColorDemoBtn = () => {
    setShowColorPickerDemoBtn(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueDemoBtn: "",
    }));
  };
  const handleCancelColorDemoBtn = () => {
    setShowColorPickerDemoBtn(false);
  };
  const handleSaveColorBtnText = () => {
    setShowColorPickerBtnText(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueBtnText: "",
    }));
  };
  const handleCancelColorBtnText = () => {
    setShowColorPickerBtnText(false);
  };
  const handleSaveColorDemoBtnText = () => {
    setShowColorPickerDemoBtnText(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueDemoBtnText: "",
    }));
  };
  const handleCancelColorDemoBtnText = () => {
    setShowColorPickerDemoBtnText(false);
  };

  const handleNext = () => {
    handleScreen("summary");
  };
  const goBackToElementSelection = () => {
    handleScreen("summary");
  };
  const [errors, setErrors] = useState({
    staticImage: "",
    image: "",
    h1: "",
    h2: "",
    body: "",
    CTA: "",
    static: "",
    staticDemo: "",
    dynamic: "",
    dynamicDemo: "",
    h1Size: "",
    h2Size: "",
    bodySize: "",
    hexValueH1: "",
    hexValueH2: "",
    hexValueBody: "",
    hexValueBtn: "",
    hexValueBtnText: "",
    demo: "",

    hexValueDemoBtn: "",
    hexValueDemoBtnText: "",
  });
  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");

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
        toast.error("Unable to copy text to clipboard.", {
          autoClose: 500,
        });
      });
  };

  const handleDynamicimage = async (event) => {
    const imageUrl = event.target.value;
    setImage(imageUrl);
    setImgName("");
    setStaticImage("");
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

  const handleFileInputChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setImgName(file);

    try {
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData, "dfgfg");
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadFile,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: formData,
      });

      if (res?.status == 200) {
        setIsImageChanged(true);
        setStaticImage(res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    setShowTextField(true);
  };
  const handleDemoButtonClick = () => {
    setDemoShowTextField(true);
  };

  const handleChangeDynamicURL = (event) => {
    setSelectedOption(event.target.value);
    setStaticURL("");
    setErrors((prevErrors) => ({ ...prevErrors, dynamic: "" }));
  };
  const handleChangeDynamicDemoURL = (event) => {
    setSelectedOptionDemo(event.target.value);
    setStaticURLDemo("");
    setErrors((prevErrors) => ({ ...prevErrors, dynamicDemo: "" }));
  };

  const handleStaticUrl = (e) => {
    setStaticURL(e.target.value);
    setSelectedOption("none");
    setErrors((prevErrors) => ({ ...prevErrors, static: "" }));
  };
  const handleStaticDemoUrl = (e) => {
    setStaticURLDemo(e.target.value);
    setSelectedOptionDemo("none");
    setErrors((prevErrors) => ({ ...prevErrors, staticDemo: "" }));
  };

  const handleSetData = async () => {
    let newError = {
      staticImage: "",
      image: "",
      h1: "",
      h2: "",
      body: "",
      CTA: "",
      demo: "",
      h1Size: "",
      h2Size: "",
      bodySize: "",
      hexValueH1: "",
      hexValueH2: "",
      hexValueBody: "",
      hexValueDemoBtnText: "",
      hexValueDemoBtn: "",
    };
    if (staticImage === "" && image === "none")
      newError.logo = "Static or Dynamic Image is required.";
    if (staticImage === "" && image === "none")
      newError.image = "Dynamic or Static Image is required.";
    if (h1 === "") newError.h1 = "Headline 1 is required.";
    if (h2 === "") newError.h2 = "Headline 2 is required.";
    if (body === "") newError.body = "Body text is required.";
    if (h1Size === "") newError.h1Size = "Headline1 size is required.";
    if (h2Size === "") newError.h2Size = "Headline2 size is required.";
    if (bodySize === "") newError.bodySize = "Body text size is required.";
    if (buttonText === "") newError.CTA = "CTA Button text is required.";
    if (hexValueH1 === "") newError.hexValueH1 = "Choose Color for Headline 1.";
    if (hexValueH2 === "") newError.hexValueH2 = "Choose Color for Headline 2.";
    if (hexValueBody === "")
      newError.hexValueBody = "Choose Color for Body text.";
    if (hexValueBtn === "")
      newError.hexValueBtn = "Choose Color for CTA Button.";
    if (hexValueDemoBtn === "" && demobuttonText !== "")
      newError.hexValueDemoBtn = "Choose Color for Demo Text.";
    if (hexValueDemoBtnText === "" && demobuttonText !== "")
      newError.hexValueDemoBtnText = "Choose Color for Demo Text.";
    if (hexValueBtnText === "")
      newError.hexValueBtnText = "Choose Color for CTA Button Text.";
    if (staticURL === "" && selectedOption === "none")
      newError.static = "Static or Dynamic URL is required.";
    if (
      staticURLDemo === "" &&
      selectedOptionDemo === "none" &&
      demobuttonText !== ""
    )
      newError.staticDemo = "Static or Dynamic URL is required.";
    if (staticURL === "" && selectedOption === "none")
      newError.dynamic = "Dynamic or Static URL is required.";
    if (
      staticURLDemo === "" &&
      selectedOptionDemo === "none" &&
      demobuttonText !== ""
    )
      newError.dynamicDemo = "Dynamic or Static URL is required.";

    if (
      (staticImage !== null || image !== "none") &&
      h1 !== "" &&
      h2 !== "" &&
      body !== "" &&
      h1Size !== "" &&
      h2Size !== "" &&
      bodySize !== "" &&
      buttonText !== "" &&
      hexValueH1 !== "" &&
      hexValueH2 !== "" &&
      hexValueBody !== "" &&
      hexValueBtn !== "" &&
      hexValueBtnText !== "" &&
      (demobuttonText === "" ||
        (demobuttonText !== "" &&
          hexValueDemoBtnText !== "" &&
          hexValueDemoBtn !== "" &&
          (selectedOptionDemo !== "none" || staticURLDemo !== ""))) &&
      (selectedOption !== "none" || staticURL !== "")
    ) {
      setLoading(true);
      try {
        const res = await axios({
          method: "POST",
          url: ApiConfig.addElement,
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            hvoTemplateId: templateId,
          },
          data: {
            heroImg: image,
            staticImage: staticImage,
            bodyText: body,
            ctaButtonText: buttonText,
            dynamicUrl: selectedOption,
            headline1: h1,
            headline2: h2,
            staticUrl: staticURL,
            staticUrlDemo: staticURLDemo,
            dynamicUrlDemo: selectedOptionDemo,
            sectionTypeId: videoRefral.find(
              (data) => data.sectionName === elementType
            )?.sectionId,
            sequence: typeIndex + 1,
            userId: parseInt(localStorage.getItem("_id")),
            hvoId: templateId,
            headline1Color: hexValueH1,
            headline2Color: hexValueH2,
            bodyTextColor: hexValueBody,
            ctaButtonColor: hexValueBtn,
            ctaButtonTextColor: hexValueBtnText,
            headline1Size: h1Size,
            headline2Size: h2Size,
            bodyTextSize: bodySize,
            demoButtonText: demobuttonText,
            demoButtonTextColor: hexValueDemoBtnText,
            demoButtonColor: hexValueDemoBtn,
          },
        });
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
          setLoading(false);
          reload();
          setNextButton(true);
        }
      } catch (error) {
        console.log(error, "error");
        toast.error(error?.response?.data?.message, "error");

        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    setErrors(newError);
  };

  const getSheetType = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getsheettype,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          hvoId: templateId,
        },
      });
      if (res.data.status === 200) {
        console.log(res?.data?.data?.data);
        setCompanyDetails(res?.data?.data?.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
  useEffect(() => {
    getSheetType();
  }, []);

  return (
    <>
      <Box className={classes.secondmaingridBox}>
        {loading === true && <FullScreenLoader />}

        <Box style={{ marginTop: "12px" }}>
          <Box mb={3} style={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIcon
              style={{
                cursor: "pointer",
                marginRight: "8px",
                fontSize: "large",
              }}
              onClick={goBackToElementSelection}
            />
            <Typography className="heading">
              Hero | Section {typeIndex + 1}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="heading" style={{ color: "#152F40" }}>
                Upload Static Image
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Upload Image"
                value={imgName?.name || ""}
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
                      <Button className="savebtn" onClick={handleOpenDialog}>
                        Choose
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography className="error">{errors.image}</Typography>
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
                error={!!errors.image}
                helperText={errors.image}
                placeholder="Select Dynamic URL to fetch image"
              >
                <MenuItem value="none" disabled>
                  Select Dynamic URL to fetch image
                </MenuItem>
                <MenuItem value="--">Select None</MenuItem>
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
              <Typography className="error">{errors.image}</Typography>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Grid container style={{ gap: "15px" }}>
                <Grid item xs={10}>
                  <Typography className="label">Headline 1</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Headline 1"
                    value={h1}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      const isSpecialCase =
                        value.startsWith("[") && value.endsWith("]");
                      if (isSpecialCase || value.length <= 100) {
                        setH1(value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h1: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h1: "Maximum character count is 100.",
                        }));
                      }
                    }}
                    error={!!errors.h1}
                    helperText={errors.h1}
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
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h1Size: "",
                        }));
                      } else if (/^\d{0,2}$/.test(value)) {
                        if (Number(value) <= 26) {
                          setH1Size(value);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            h1Size: "",
                          }));
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
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
                    {errors.h1Size}{" "}
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
                      error={!!errors.hexValueH1}
                      helperText={errors.hexValueH1}
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
                    variant="outlined"
                    placeholder="Headline 2"
                    value={h2}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      const isSpecialCase =
                        value.startsWith("[") && value.endsWith("]");
                      if (isSpecialCase || value.length <= 150) {
                        setH2(value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h2: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h2: "Maximum character count is 150.",
                        }));
                      }
                    }}
                    error={!!errors.h2}
                    helperText={errors.h2}
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
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h2Size: "",
                        }));
                      } else if (/^\d{0,2}$/.test(value)) {
                        if (Number(value) <= 36) {
                          setH2Size(value);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            h2Size: "",
                          }));
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
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
                    {errors.h2Size}{" "}
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
                      error={!!errors.hexValueH2}
                      helperText={errors.hexValueH2}
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
                    multiline
                    value={body}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      const isSpecialCase =
                        value.startsWith("[") && value.endsWith("]");
                      if (isSpecialCase || value.length <= 200) {
                        setBody(value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          body: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          body: "Maximum character count is 200.",
                        }));
                      }
                    }}
                    error={!!errors.body}
                    minRows={5}
                    rows={5}
                    variant="outlined"
                    placeholder="Enter Your Text Here"
                  />
                  <Typography className="error">{errors.body}</Typography>{" "}
                  <span className={classes.hinttext}>
                    {" "}
                    (Max 200 Characters)
                  </span>
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
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          bodySize: "",
                        }));
                      } else if (/^\d{0,2}$/.test(value)) {
                        if (Number(value) <= 18) {
                          setBodySize(value);
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            bodySize: "",
                          }));
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
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
                    {errors.bodySize}{" "}
                    <span className={classes.hinttext}>(Max 18 px.)</span>
                  </Typography>
                </Grid>
                <Grid item xs={5} className="colorField">
                  <Typography className="label">
                    {" "}
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
                      error={!!errors.hexValueBody}
                      helperText={errors.hexValueBody}
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
                            item?.dataType == "Text Field" ||
                            item?.dataType == "First name" ||
                            item?.dataType == "Last name" ||
                            item?.dataType == "Customer organization"
                        )
                        ?.map((sheetfield, ind) => (
                          <Tooltip
                            title={sheetfield?.value || "Copy Text"}
                            arrow
                          >
                            <TextField
                              fullWidth
                              // value={sheetfield?.value}
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
              <Typography className="label">CTA Button</Typography>
              <Box mt={2}>
                {showTextField ? (
                  <TextField
                    className="ctabtntext"
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
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          CTA: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          CTA: "Maximum character count is 20.",
                        }));
                      }
                    }}
                  />
                ) : (
                  <Button
                    variant="outlined"
                    className="ctabtn"
                    onClick={handleButtonClick}
                  >
                    Enter Button Text
                  </Button>
                )}
                <Typography className="error">{errors.CTA}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className="label">
                Choose CTA Button Text Color
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
                  error={!!errors.hexValueBtnText}
                  helperText={errors.hexValueBtnText}
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
              <Typography className="label">Choose CTA Button Color</Typography>
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
                        <IconButton onClick={() => setShowColorPickerBtn(true)}>
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
                  error={!!errors.hexValueBtn}
                  helperText={errors.hexValueBtn}
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
                // onChange={(e) => {
                //   setStaticURL(e.target.value);
                // }}
                onChange={handleStaticUrl}
                fullWidth
                placeholder="Enter Link URL"
              />
              <Typography className="error">{errors.static}</Typography>
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
                value={selectedOption}
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
                    ?.filter((item) => item?.dataType == "URL")
                    ?.map((item) => (
                      <MenuItem value={item?.value}>{item?.value}</MenuItem>
                    ))}
              </Select>
              <Typography className="error">{errors.dynamic}</Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography className="label" style={{ marginBottom: "20px" }}>
                Demo Text
              </Typography>
              <Box mt={2}>
                {showDemoTextField ? (
                  <TextField
                    className="demobtntext"
                    placeholder="Enter Button Text"
                    variant="outlined"
                    fullWidth
                    value={demobuttonText}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      const isSpecialCase =
                        value.startsWith("[") && value.endsWith("]");
                      if (value.length === 0) {
                        setStaticURLDemo("");
                        setHexValueDemoBtnText("");
                        setHexValueDemoBtn("");
                        setStaticURLDemo("");
                        setSelectedOptionDemo("none");
                      }
                      if (isSpecialCase || value.length <= 30) {
                        setDemoButtonText(value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          demo: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          demo: "Maximum character count is 30.",
                        }));
                      }
                    }}
                  />
                ) : (
                  <Box style={{}}>
                    <Button
                      variant="outlined"
                      className="ctabtn"
                      onClick={handleDemoButtonClick}
                    >
                      Enter Button Text
                    </Button>
                  </Box>
                )}
                <Typography className="error">{errors.demo}</Typography>
              </Box>
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
                  error={!!errors.hexValueDemoBtnText}
                  helperText={errors.hexValueDemoBtnText}
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
                  error={!!errors.hexValueDemoBtn}
                  helperText={errors.hexValueDemoBtn}
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
                onChange={handleStaticDemoUrl}
                fullWidth
                placeholder="Enter Link URL"
              />
              <Typography className="error">{errors.staticDemo}</Typography>
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
                value={selectedOptionDemo}
                // onClick={setCompanyDetails}
                onChange={handleChangeDynamicDemoURL}
              >
                <MenuItem value="none" disabled>
                  Select Dynamic Url
                </MenuItem>
                {companyDetails !== undefined &&
                  companyDetails.length > 0 &&
                  companyDetails
                    ?.filter((item) => item?.dataType == "URL")
                    ?.map((item) => (
                      <MenuItem value={item?.value}>{item?.value}</MenuItem>
                    ))}
              </Select>
              <Typography className="error">{errors.dynamicDemo}</Typography>
            </Grid>
          </Grid>

          <Box className="secondmaingridbtn" mt={2}>
            <Button
              className={`${
                nextButton === true ? "savebtnDisables" : "savebtn"
              }`}
              disabled={nextButton === true}
              onClick={() => handleSetData()}
            >
              Save{" "}
            </Button>
            <Button
              className={`${
                nextButton === false ? "savebtnDisables" : "savebtn"
              }`}
              disabled={nextButton === false}
              onClick={handleNext}
              variant="contained"
            >
              Next
            </Button>
          </Box>
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
                  handleCloseDialog();
                } else {
                  setStaticImage(null);
                }
              }}
              className="btnSave"
            >
              {loading === false ? "Save" : <ButtonCircularProgress />}
            </Button>
          </Box>
        </Dialog>
      )}
    </>
  );
}

export default HeroSection;
