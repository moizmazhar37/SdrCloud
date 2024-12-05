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
  IconButton,
  Divider,
  Modal,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Copy } from "react-feather";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoader from "../../../component/FullScreenLoader";
import { SketchPicker } from "react-color";
import { CgColorPicker } from "react-icons/cg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => ({
  menuitem: {
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-iconOpen": {
      borderLeft: "0px !important",
      borderRight: "1px solid #ECECEC !important",
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
    "& .ctabtn": {
      fontSize: "14px",
      marginTop: "-10px !important",
    },
    "& .ctabtntext": {
      marginTop: "-10px !important",
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "5px !important",
    },
    "& .MuiIconButton-root": {
      height: "40px",
      padding: "10px",
    },
    "& .MuiSelect-iconOutlined": {
      borderLeft: "1px solid #ECECEC !important",
    },
    "& .MuiSelect-iconOpen": {
      transform: "rotate(360deg) !important",
      borderRight: " !important",
      borderLeft: "1px solid #ECECEC !important",
      paddingLeft: "8px !important",
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
    "& .uploadtext": {
      "& .MuiOutlinedInput-adornedEnd": {
        paddingRight: "0px",
      },
    },

    "& .secondmaingridbtn": {
      display: "flex",
      justifyContent: "end",
      gap: "15px",
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
      boxShadow: " !important",
    },
    "& .MuiButton-contained": {
      color: "#152F40",
      width: "100%",
      fontSize: "15px",
      fontWeight: "500 !important",
      backgroundColor: "#dfd9d9",
      boxShadow: " !important",
    },
  },
  hinttext: {
    display: "flex",
    justifyContent: "end",
    color: "gray",
    fontSize: "12px",
    marginTop: "5px",
  },
}));
function Footer({
  elementType,
  linkData,
  typeIndex,
  getSummary,
  handleScreen,
  videoRefral,
  reload,
}) {
  const [existcolor, setexistcolor] = useState("");
  // console.log("existcolor", existcolor);
  const [fn, setfn] = useState(() => {});
  const classes = useStyles();
  const [logo, setLogo] = useState(null);
  const [imgName, setImgName] = useState();
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);
  // const [sectionData, setSectionData] = useState();
  const [h1, setH1] = useState("");
  const [h1Size, setH1Size] = useState("");
  const [h2, setH2] = useState("");
  const [h2Size, setH2Size] = useState("");
  const [body, setBody] = useState("");
  const [bodySize, setBodySize] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");

  // const [selectedOption, setSelectedOption] = useState("");
  const [staticURL, setStaticURL] = useState("");
  const [nextButton, setNextButton] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  // const [hexValueH1, setHexValueH1] = useState("#000");
  // const [hexValueH2, setHexValueH2] = useState("#000");

  const [socialIcon1, setSocialIcon1] = useState({
    iconUrl: "",
    footerlink: "",
  });
  const [socialIcon2, setSocialIcon2] = useState({
    iconUrl: "",
    footerlink: "",
  });
  const [socialIcon3, setSocialIcon3] = useState({
    iconUrl: "",
    footerlink: "",
  });
  const [socialIcon4, setSocialIcon4] = useState({
    iconUrl: "",
    footerlink: "",
  });
  const [socialIcon, setSocialIcon] = useState({
    fontsize: "",
    colorpicker: "",
    hovercolor: "#000",
    textColor: "",
  });
  const [leftfooterTextColor, setLeftfooterTextColor] = useState({
    colorpicker: "",
    hovercolor: "",
    fontsize: "",
    headingSize: "",
  });

  const [footerBackgroundColor, setFooterBackgroundColor] = useState("");
  const [footerTextHeadingColor, setFooterTextHeadingColor] = useState({
    colorpicker: "",
    hovercolor: "#000",
    fontsize: "",
  });
  const [benchmark, setBenchmark] = useState({
    text: "",
    fontsize: "",
    colorpicker: "",
  });

  const handleSaveColorH1 = () => {
    setShowColorPicker(false);
  };

  const handleCancelColorH1 = () => {
    setShowColorPicker(false);
  };

  let fnsetSocialIconcolorpicker = (color) => {
    setSocialIcon((prev) => ({
      ...prev,
      colorpicker: color,
    }));
  };

  let fnsetIconbgColor = (color) => {
    setSocialIcon((prev) => ({
      ...prev,
      textColor: color,
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
  let fnsetBenchmarkcolorpicker = (color) => {
    console.log(color, "hhhhhgj");
    setBenchmark((prev) => ({
      ...prev,
      colorpicker: color,
    }));
  };

  useEffect(() => {
    console.log("consol fn is doing ", fn);
  }, [fn]);

  useEffect(() => {
    console.log("consol exist color is doing ", existcolor);
  }, [existcolor]);

  const handleNext = () => {
    handleScreen("summary");
  };
  const goBackToElementSelection = () => {
    handleScreen("summary");
  };
  const handleDynamicimage = async (event, iconNumber) => {
    const imageUrl = event.target.value;
    console.log(imageUrl);
    let setSocialIcon;

    switch (iconNumber) {
      case 1:
        setSocialIcon = setSocialIcon1;
        break;
      case 2:
        setSocialIcon = setSocialIcon2;
        break;
      case 3:
        setSocialIcon = setSocialIcon3;
        break;
      case 4:
        setSocialIcon = setSocialIcon4;
        break;
      default:
        return;
    }
    console.log(imageUrl);
    setSocialIcon((prevState) => ({ ...prevState, iconUrl: imageUrl }));
    setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
  };
  const handleFooterImage = async (event) => {
    const imageUrl = event.target.value;
    setImage(imageUrl);
    // setLogo("");
    // setImgName("");
    // setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    // try {
    //   const response = await fetch(imageUrl);
    //   const blob = await response.blob();
    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     setLogo(reader.result);
    //   };

    //   reader.readAsDataURL(blob);
    // } catch (error) {
    //   console.error("Error converting image URL to base64:", error);
    // }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImgName(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
        setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
      };
      reader.readAsDataURL(file);
    }
    setImage("");
  };
  const handleIconButtonClick = () => {
    fileInputRef.current.click();
    setImage("");
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
        toast.error("Unable to copy text to clipboard.", {
          autoClose: 500,
        });
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setButtonText(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        CTA: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        CTA: "Maximum character count is 15",
      }));
    }
  };
  const [errors, setErrors] = useState({
    fontsize: "",
    footerBackgroundColor: "",
    benchmarkColor: "",
    footersize: "",
    headingColor: "",
    footertext: "",
    footertextHover: "",
    iconbackground: "",
    iconColor: "",
    footerheading: "",
  });
  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");
  //

  const handleSetData = async () => {
    let newError = {
      fontsize: "",
      footerBackgroundColor: "",
      benchmarkColor: "",
      footersize: "",
      headingColor: "",
      footertext: "",
      footertextHover: "",
      iconbackground: "",
      iconColor: "",
      footerheading: "",
    };

    if (footerBackgroundColor === "") {
      newError.footerBackgroundColor = "Footer Background Color is required.";
    }
    if (benchmark.fontsize === "") {
      newError.fontsize = "Benchmark Text size is required.";
    }
    if (benchmark.colorpicker === "") {
      newError.benchmarkColor = "Benchmark Color is required.";
    }
    if (leftfooterTextColor.fontsize === "") {
      newError.footersize = "Footer Text size is required.";
    }
    if (footerTextHeadingColor.colorpicker === "") {
      newError.headingColor = "Heading Text color is required.";
    }
    if (leftfooterTextColor.colorpicker === "") {
      newError.footertext = "Footer Text color is required.";
    }
    if (leftfooterTextColor.hovercolor === "") {
      newError.footertextHover = "Footer Text Hover color is required.";
    }
    if (socialIcon.colorpicker === "") {
      newError.iconbackground = "Icon background color is required.";
    }
    if (socialIcon.textColor === "") {
      newError.iconColor = "Icon color is required.";
    }
    if (leftfooterTextColor.headingSize === "") {
      newError.footerheading = "Footer Heading size is required.";
    }

    // Update errors state
    setErrors(newError);
    if (
      benchmark.fontsize !== "" &&
      benchmark.colorpicker !== "" &&
      leftfooterTextColor.fontsize !== "" &&
      footerTextHeadingColor.colorpicker !== "" &&
      leftfooterTextColor.colorpicker !== "" &&
      leftfooterTextColor.hovercolor !== "" &&
      socialIcon.colorpicker !== "" &&
      socialIcon.textColor !== "" &&
      leftfooterTextColor.headingSize !== ""
    ) {
      try {
        const res = await axios({
          method: "POST",
          url: ApiConfig.footerSection,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            sequence: 1,
            hvoTemplateId: templateId,
            footerBackgroundColor: footerBackgroundColor,
            footerTextHeadingColor: footerTextHeadingColor.colorpicker,
            footerHeadingSize: leftfooterTextColor.headingSize,
            footerTextColor: leftfooterTextColor.colorpicker,
            footerTextHoverColor: leftfooterTextColor.hovercolor,
            footerTextSize: leftfooterTextColor.fontsize,
            socialIconBackgroundColor: socialIcon.colorpicker,
            socialIconColor: socialIcon.textColor,
            benchmarkColor: benchmark.colorpicker,
            benchmarkSize: benchmark.fontsize,
            instagramLink: "http://instagram.com",
            facebookLink: "http://facebook.com",
            linkedinLink: "http://linkedin.com",

          },
        });
        setLoading(true);
        if (res?.status === 200) {
          toast.success("Data saved successfully.");
          setLoading(false);
          reload();
          setNextButton(true);
        }
      } catch (error) {
        console.log(error, "error");

        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);

        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  const companyDetailsdata = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.companySheetData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          hvoTemplateId: parseInt(templateId),
        },
      });
      if (res?.status === 200) {
        setCompanyDetails(res?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    companyDetailsdata();
  }, []);

  const handleReset = () => {
    setLogo("");
    setImgName();
    setH1("");
    setH2("");
    setBody("");
    setBodySize("");
    setH2Size("");
    setH1Size("");
    setButtonText("");
    setStaticURL("");
    setImage("");
  };

  const handleButtonClick = () => {
    setShowTextField(true);
  };

  const getSheetType = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiConfig.headers}/${templateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setCompanyDetails(res?.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const [footerData, setFooterData] = useState([]);
  const [instaLink, setInstaLink] = useState("");
  console.log("instaLink: ", instaLink);
  const [fbLink, setFbLink] = useState("");
  console.log("fbLink: ", fbLink);
  const [linkedInLink, setLinkedInLink] = useState("");
  console.log("linkedInLink: ", linkedInLink);
  const GetFooterLink = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllFooterLink,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setFooterData(res?.data?.data?.footerlinks);
        setLinkedInLink(res?.data?.data?.linkedinlink);
        setFbLink(res?.data?.data?.facebooklink);
        setInstaLink(res?.data?.data?.instagramlink);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    getSheetType();
    GetFooterLink();
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}
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
      <Box className={classes.secondmaingridBox}>
        <Box style={{ marginTop: "12px" }}>
          <Box mb={3} style={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIcon
              style={{ cursor: "pointer", marginRight: "8px" }}
              onClick={goBackToElementSelection}
            />
            <Typography className="heading">
              Footer | Section {typeIndex + 1}
            </Typography>
          </Box>
          <Grid container spacing={3} style={{ display: "flex" }}>
            <Grid item xs={12}>
              <Grid container style={{ gap: "15px" }}>
                <Grid item xs={5}>
                  <Typography className="label" style={{ color: "#152F40" }}>
                    Choose Footer Background Color
                  </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Choose Color"
                    value={footerBackgroundColor}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setexistcolor(footerTextHeadingColor.colorpicker);
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
                    error={!!errors.footerBackgroundColor}
                    helperText={errors.footerBackgroundColor}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography className="label" style={{ color: "#152F40" }}>
                    Choose Footer Heading Text Color
                  </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Choose Color"
                    value={footerTextHeadingColor.colorpicker}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setexistcolor(footerTextHeadingColor.colorpicker);
                              setfn(() => fnsetFooterTextHeadingcolorpicker);
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
                    error={!!errors.headingColor}
                    helperText={errors.headingColor}
                  />
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
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            footerheading: "",
                          }));
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            footerheading: "Value must be 20 or less",
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
                    error={!!errors.footerheading}
                    helperText={errors.footerheading}
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
                      placeholder="Choose Color"
                      value={leftfooterTextColor.colorpicker}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setexistcolor(leftfooterTextColor.colorpicker);
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
                      error={!!errors.footertext}
                      helperText={errors.footertext}
                    />
                  </>
                </Grid>
                <Grid item xs={5} className="colorField">
                  <Typography className="label">
                    Choose Footer Text Hover Color
                  </Typography>
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Choose Color"
                      value={leftfooterTextColor.hovercolor}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setexistcolor(leftfooterTextColor.hovercolor);
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
                      error={!!errors.footertextHover}
                      helperText={errors.footertextHover}
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
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            footersize: "",
                          }));
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            footersize: "Value must be 20 or less",
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
                    error={!!errors.footersize}
                    helperText={errors.footersize}
                  />
                  <Typography className={classes.hinttext}>
                    (Max 20 px.)
                  </Typography>
                </Grid>
                <Grid item xs={12}></Grid>

                <Grid item xs={5} className="colorField">
                  <Typography className="label">
                    Choose Icon Background Color
                  </Typography>
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="Choose Color"
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
                      error={!!errors.iconbackground}
                      helperText={errors.iconbackground}
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
                      placeholder="Choose Color"
                      value={socialIcon.textColor}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setexistcolor(socialIcon.textColor);
                                setfn(() => fnsetIconbgColor);
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
                      error={!!errors.iconColor}
                      helperText={errors.iconColor}
                    />
                  </>
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              <Grid container style={{ gap: "15px" }}>
                <Grid item xs={12}></Grid>
              </Grid>
              <Grid container style={{ gap: "15px" }}>
                <Grid item xs={12}></Grid>
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
                      placeholder="Choose Color"
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
                      error={!!errors.benchmarkColor}
                      helperText={errors.benchmarkColor}
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
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            fontsize: "",
                          }));
                        } else {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            fontsize: "Value must be 22 or less",
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
                    error={!!errors.fontsize}
                    helperText={errors.fontsize}
                  />
                  <Typography className={classes.hinttext}>
                    (Max 22 px.)
                  </Typography>
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
                    <Typography className="label" style={{ color: "#152F40" }}>
                      Instagram Link
                    </Typography>

                    <TextField variant="outlined" value={instaLink} disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="label" style={{ color: "#152F40" }}>
                      Facebook Link
                    </Typography>

                    <TextField variant="outlined" value={fbLink} disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="label" style={{ color: "#152F40" }}>
                      LinkedIn Link
                    </Typography>

                    <TextField
                      variant="outlined"
                      value={linkedInLink}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} >
              <Box
                className="dynamicFieldsBox d-flex column alignstart justify-start"
                p={2}
              >
                <Typography className="label">
                  Copy to Add Dynamic Fields
                </Typography>

                <div style={{ height: "970px", overflowY: "auto" }}>
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    companyDetails
                      ?.filter((item) => item?.dataType == "Text")
                      ?.map((sheetfield, ind) => (
                        <TextField
                          fullWidth
                          value={
                            sheetfield?.value.length > 20
                              ? `${sheetfield.value.substring(0, 20)}...`
                              : sheetfield?.value
                          }
                          variant="outlined"
                          placeholder={sheetfield?.value}
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
                      ))}
                </div>
              </Box>
            </Grid> */}
          </Grid>
          <Box className="secondmaingridbtn" mt={2}>
            <Button
              className={`${
                nextButton === true ? "savebtnDisables" : "savebtn"
              }`}
              // disabled={nextButton === true}
              variant="contained"
              onClick={() => handleSetData()}
            >
              Save
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
    </>
  );
}

export default Footer;
