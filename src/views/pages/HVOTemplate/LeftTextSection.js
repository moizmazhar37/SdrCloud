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
  Modal,
  Tooltip,
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
// Styles for the component
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
}));
function LeftTextSection({
  elementType,
  linkData,
  typeIndex,
  getSummary,
  handleScreen,
  videoRefral,
  reload,
}) {
  const classes = useStyles();
  const [logo, setLogo] = useState(null);
  const [imgName, setImgName] = useState();
  const [image, setImage] = useState("none");
  const fileInputRef = useRef(null);
  const [sectionData, setSectionData] = useState();
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
  const [staticImage, setStaticImage] = useState("");
  const [selectedOption, setSelectedOption] = useState("none");
  const [staticURL, setStaticURL] = useState("");
  const [nextButton, setNextButton] = useState(false);
  const [showColorPickerH1, setShowColorPickerH1] = useState(false);
  const [showColorPickerH2, setShowColorPickerH2] = useState(false);
  const [showColorPickerBody, setShowColorPickerBody] = useState(false);
  const [showColorPickerBtn, setShowColorPickerBtn] = useState(false);
  const [showColorPickerBtnText, setShowColorPickerBtnText] = useState(false);
  const [hexValueH1, setHexValueH1] = useState("");
  const [hexValueH2, setHexValueH2] = useState("");
  const [hexValueBody, setHexValueBody] = useState("");
  const [hexValueBtn, setHexValueBtn] = useState("");
  const [hexValueBtnText, setHexValueBtnText] = useState("");
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

  const handleNext = () => {
    handleScreen("summary");
  };
  const goBackToElementSelection = () => {
    handleScreen("summary");
  };
  const handleDynamicimage = async (event) => {
    console.log(event);
    const imageUrl = event.target.value;
    setImage(imageUrl);
    setStaticImage("");
    setImgName("");

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
  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   setImgName(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setLogo(event.target.result);
  //       setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   setImage("none");
  // };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setImgName(file);
    console.log("File:", file);

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
        console.log(res, "abcdef");
        // setLogo(event.target.result);
        //       setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
        setStaticImage(res?.data?.data);

        // setIsLoading(false);
        // setSelectedFile(null);

        // sessionStorage.setItem("userImageUrl", res.data.result);
      }
    } catch (error) {
      // setIsLoading(false);
      console.log(error);
    }
  };
  const handleIconButtonClick = () => {
    fileInputRef.current.click();
    setImage("none");
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

  const handleChangeDynamicURL = (event) => {
    setSelectedOption(event.target.value);
    setStaticURL("");
    setErrors((prevErrors) => ({ ...prevErrors, selectedOption: "" }));
  };
  const handleStaticUrl = (e) => {
    setStaticURL(e.target.value);
    setSelectedOption("none");
    setErrors((prevErrors) => ({ ...prevErrors, staticURL: "" }));
  };
  const handleInputChange = (e) => {
    const value = e.target.value;

    setButtonText(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      CTA: "",
    }));
  };
  const [errors, setErrors] = useState({
    logo: "",
    image: "",
    h1: "",
    h2: "",
    body: "",
    // CTA: "",
    // static: "",
    // selectedOption: "",
    h2Size: "",
    h1Size: "",
    bodySize: "",
    hexValueH1: "",
    hexValueH2: "",
    hexValueBody: "",
    // hexValueBtn: "",
    // hexValueBtnText: "",
  });
  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");

  const handleSetData = async () => {
    let newError = {
      staticImage: "",
      image: "",
      h1: "",
      h2: "",
      body: "",
      bodySize: "",
      // static: "",
      // selectedOption: "",
      h2Size: "",
      h1Size: "",
      // staticURL: "",
      // buttonText: "",
      hexValueH1: "",
      hexValueH2: "",
      hexValueBody: "",
      // hexValueBtn: "",
      // hexValueBtnText: "",
    };
    if (staticImage === "" && image === "none")
      newError.logo = "Static or Dynamic Image is required.";
    if (staticImage === "" && image === "none")
      newError.image = "Dynamic or Static Image is required.";
    if (h1 === "") {
      newError.h1 = "Headline 1 is required.";
    }
    if (h1Size === "") {
      newError.h1Size = "Headline1 size is required.";
    }
    if (h2 === "") {
      newError.h2 = "Headline 2 is required.";
    }
    if (h2Size === "") {
      newError.h2Size = "Headline2 size is required.";
    }
    if (body === "") {
      newError.body = "Body text is required.";
    }
    if (bodySize === "") {
      newError.bodySize = "Body text size is required.";
    }
    // if (buttonText === "") {
    //   newError.CTA = "CTA Button text is required.";
    // }
    if (hexValueH1 === "") newError.hexValueH1 = "Choose Color for Headline 1.";
    if (hexValueH2 === "") newError.hexValueH2 = "Choose Color for Headline 2.";
    if (hexValueBody === "")
      newError.hexValueBody = "Choose Color for Body text.";
    // if (hexValueBtn === "")
    //   newError.hexValueBtn = "Choose Color for CTA Button.";
    // if (hexValueBtnText === "")
    //   newError.hexValueBtnText = "Choose Color for CTA Button Text.";
    // if (staticURL === "" && selectedOption === "none")
    //   newError.staticURL = "Static or Dynamic URL is required.";
    // if (staticURL === "" && selectedOption === "none")
    //   newError.selectedOption = "Dynamic or Static URL is required.";

    if (
      (staticImage !== "" || image !== "none") &&
      h1 !== "" &&
      h2 !== "" &&
      h1Size !== "" &&
      h2Size !== "" &&
      body !== "" &&
      bodySize !== "" &&
      // buttonText !== "" &&
      hexValueH1 !== "" &&
      hexValueH2 !== "" &&
      hexValueBody !== ""
      // hexValueBtn !== "" &&
      // hexValueBtnText !== ""
      // (selectedOption !== "" || staticURL !== "")
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
            userId: parseInt(localStorage.getItem("_id")),
            hvoId: templateId,
            // fileType: {
            //   IMAGE: logo || image,
            // },
            staticImage: staticImage,
            leftTextRightImageUrl: image,
            // dynamicUrl: selectedOption,
            headline1: h1,
            headline1Size: h1Size,
            headline2: h2,
            headline2Size: h2Size,
            bodyText: body,
            bodyTextSize: bodySize,
            // ctaButtonText: buttonText,
            // staticUrl: staticURL,
            sectionTypeId: videoRefral.find(
              (data) => data.sectionName === elementType
            )?.sectionId,
            sequence: typeIndex + 1,
            headline1Color: hexValueH1,
            headline2Color: hexValueH2,
            bodyTextColor: hexValueBody,
            // ctaButtonColor: hexValueBtn,
            // ctaButtonTextColor: hexValueBtnText,
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
  // const companyDetailsdata = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios({
  //       method: "GET",
  //       url: ApiConfig.companySheetData,
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       params: {
  //         hvoTemplateId: parseInt(templateId),
  //       },
  //     });
  //     if (res?.status === 200) {
  //       setCompanyDetails(res?.data?.data);
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   companyDetailsdata();
  // }, []);

  useEffect(() => {
    linkData(sectionData);
    handleReset();
  }, [sectionData]);
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
    setImage("none");
    setHexValueH1("");
    setHexValueH2("");
    setHexValueBody("");
    setHexValueBtn("");
    setHexValueBtnText("");
  };
  const handleButtonClick = () => {
    setShowTextField(true);
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
      {loading && <FullScreenLoader />}
      <Box className={classes.secondmaingridBox}>
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
              Left Text | Right Image | Section {typeIndex + 1}
            </Typography>
          </Box>
          <Grid container spacing={3} style={{ display: "flex" }}>
            <Grid item xs={12}>
              <Typography className="heading" style={{ color: "#152F40" }}>
                Upload Static Image
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Uplaod Image"
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
                        onChange={handleFileInputChange}
                      />
                      <Button
                        className="savebtn"
                        onClick={handleIconButtonClick}
                      >
                        Upload
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
                    value={h1}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      if (value.length <= 100) {
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
                    variant="outlined"
                    placeholder="Enter Your Text Here"
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
                    {" "}
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
                    value={h2}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      if (value.length <= 100) {
                        setH2(value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h2: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          h2: "Maximum character count is 100.",
                        }));
                      }
                    }}
                    error={!!errors.h2}
                    helperText={errors.h2}
                    variant="outlined"
                    placeholder="Enter Your Text Here"
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
                    value={body}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      if (value.length <= 400) {
                        setBody(value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          body: "",
                        }));
                      } else {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          body: "Maximum character count is 400.",
                        }));
                      }
                    }}
                    // onChange={(e) => {
                    //   setBody(e.target.value);
                    //   setErrors((prevErrors) => ({ ...prevErrors, body: "" }));
                    // }}
                    error={!!errors.body}
                    multiline
                    minRows={5}
                    rows={5}
                    variant="outlined"
                    placeholder="Enter Your Text Here"
                  />
                  <Typography className="error">{errors.body}</Typography>
                  <span className={classes.hinttext}>
                    {" "}
                    (Max 400 Characters)
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

                <div style={{ height: "640px", overflowY: "auto" }}>
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    companyDetails
                      ?.filter((item) => item.dataType == "Text Field")
                      ?.map((sheetfield, ind) => (
                        <Tooltip title={sheetfield?.value || "Copy Text"} arrow>
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
                        </Tooltip>
                      ))}
                </div>
              </Box>
            </Grid>

            {/* <Grid item xs={12} sm={4}>
              <Typography className="label">CTA Button</Typography>
              <Box mt={2}>
                {showTextField ? (
                  <TextField
                    placeholder="Enter Button Text"
                    className="ctabtntext"
                    variant="outlined"
                    fullWidth
                    value={buttonText}
                    onChange={handleInputChange}
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
                fullWidth
                value={staticURL}
                onChange={handleStaticUrl}
                placeholder="Enter Link URL"
              />
              <Typography className="error">{errors.selectedOption}</Typography>
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
                value={selectedOption}
                onChange={handleChangeDynamicURL}
                IconComponent={ExpandMoreIcon}
              >
                <MenuItem value="none" disabled>
                  Select Dynamic Url
                </MenuItem>
                {companyDetails !== undefined &&
                  companyDetails.length > 0 &&
                  companyDetails
                    ?.filter((item) => item.dataType == "URL")
                    ?.map((sheetfield, ind) => (
                      <MenuItem value={sheetfield?.value}>
                        {sheetfield?.value}
                      </MenuItem>
                    ))}
              </Select>
              <Typography className="error">{errors.selectedOption}</Typography>
            </Grid> */}
          </Grid>

          <Box className="secondmaingridbtn" mt={2}>
            <Button
              className={`${nextButton === true ? "savebtnDisables" : "savebtn"
                }`}
              disabled={nextButton === true}
              variant="contained"
              onClick={() => handleSetData()}
            >
              Save
            </Button>
            <Button
              className={`${nextButton === false ? "savebtnDisables" : "savebtn"
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

export default LeftTextSection;
