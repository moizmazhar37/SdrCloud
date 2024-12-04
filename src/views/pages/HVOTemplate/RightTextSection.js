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
  Dialog,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Copy } from "react-feather";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
import CloseIcon from "@material-ui/icons/Close";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import FullScreenLoader from "../../../component/FullScreenLoader";
import { SketchPicker } from "react-color";
import { CgColorPicker } from "react-icons/cg";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
    height: "100%",
    minHeight: "450px",
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
    "& .error": {
      fontSize: "12px",
      color: "red",
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
function RightTextSection({
  elementType,
  linkData,
  typeIndex,
  getSummary,
  handleScreen,
  reload,
  videoRefral,
}) {
  const classes = useStyles();
  const [logo, setLogo] = useState(null);
  const [imgName, setImgName] = useState();
  const fileInputRef = useRef(null);
  const [scroll, setScroll] = useState("none");
  const [sectionData, setSectionData] = useState();
  const [duration, setDuration] = useState();
  const [h1, setH1] = useState("");
  const [h1Size, setH1Size] = useState("");
  const [h2, setH2] = useState("");
  const [h2Size, setH2Size] = useState("");
  const [body, setBody] = useState("");
  const [bodySize, setBodySize] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const [staticURL, setStaticURL] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [image, setImage] = useState("none");
  const [staticImage, setStaticImage] = useState("");
  console.log("staticImage: ", staticImage);
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
  const [open, setOpen] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const handleSaveColorH1 = () => {
    setShowColorPickerH1(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      hexValueH1: "",
    }));
  };

  const [imageURL, setImageURL] = useState("")

  const handleStaticImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(ApiConfig.UploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { public_url } = response.data;
      console.log("File uploaded successfully:", public_url);

      setImageURL(public_url);
      console.log("imageURL: ", imageURL);
      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
    }
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

  const handleNext = () => {
    handleScreen("summary");
  };
  const goBackToElementSelection = () => {
    handleScreen("summary");
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

  const handleDynamicimage = async (event) => {
    const imageUrl = event.target.value;
    setImage(imageUrl);
    setStaticImage("");
    setImgName("");
  };
  const handleFileInputChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setImgName(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

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
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setIsImageChanged(false);
    setOpen(false);
  };

  const handleIconButtonClick = () => {
    fileInputRef.current.click();
    setImage("none");
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
    staticImage: "",
    image: "",
    h1: "",
    h1Size: "",
    h2: "",
    h2Size: "",
    body: "",
    bodySize: "",
    CTA: "",
    static: "",
    hexValueH1: "",
    hexValueH2: "",
    hexValueBody: "",
    hexValueBtn: "",
    hexValueBtnText: "",
  });
  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");

  // Function to set section data and hide the screen upon submission.

  const handleSetData = async () => {
    let newError = {
      staticImage: "",
      image: "",
      h1: "",
      h2: "",
      body: "",
      bodySize: "",
      CTA: "",
      h2Size: "",
      h1Size: "",

      hexValueH1: "",
      hexValueH2: "",
      hexValueBody: "",
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

    if (hexValueH1 === "") newError.hexValueH1 = "Choose Color for Headline 1.";
    if (hexValueH2 === "") newError.hexValueH2 = "Choose Color for Headline 2.";
    if (hexValueBody === "")
      newError.hexValueBody = "Choose Color for Body text.";

    if (
      (staticImage !== "" || image !== "none ") &&
      h1 !== "" &&
      h2 !== "" &&
      h1Size !== "" &&
      h2Size !== "" &&
      body !== "" &&
      bodySize !== "" &&
      hexValueH1 !== "" &&
      hexValueH2 !== "" &&
      hexValueBody !== ""
    ) {
      setLoading(true);
      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.rightTextLeftImageSection,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            hvoTemplateId: templateId,
            staticImage: imageURL,
            leftImageRightText: `[${image}]`,
            headline1: h1,
            headline1Size: h1Size,
            headline2: h2,
            headline2Size: h2Size,
            bodyText: body,
            bodyTextSize: bodySize,
            sequence: typeIndex + 1,
            headline1Color: hexValueH1,
            headline2Color: hexValueH2,
            bodyTextColor: hexValueBody,
          },
        });
        if (res?.status === 200) {
          toast.success("Section saved successfully.");
          setLoading(false);
          reload();
          setNextButton(true);
        }
      } catch (error) {
        console.log(error, "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    setErrors(newError);
  };
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
    setScroll("");
    setDuration("");
    setImage("none");
    setHexValueH1("");
    setHexValueH2("");
    setHexValueBody("");
    setHexValueBtn("");
    setHexValueBtnText("");
  };

  const getSheetType = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiConfig.headers}/${templateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setCompanyDetails(res?.data);
      }
    } catch (error) {
      console.log("error");
      toast.error(error?.response?.data?.message, "error");
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
              Right Text | Left Image | Section {typeIndex + 1}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="heading" style={{ color: "#152F40" }}>
                Upload Static Image{" "}
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Upload Image"
                value={imgName?.name || ""}
                name="staticImage"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <input
                        type="file"
                        accept="image/jpeg, image/png,image/jpg"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        name="staticImage"
                        onClick={handleOpenDialog}
                      />
                      <Button
                        className="savebtn"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Choose
                      </Button>

                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        ref={fileInputRef}
                        style={{ display: "none" }} 
                        onChange={handleStaticImage}
                      />
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
                placeholder="Select dynamic Upload Image"
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
                <MenuItem disabled value="--">Select None</MenuItem>
                {companyDetails !== undefined &&
                  companyDetails.length > 0 &&
                  companyDetails
                    // ?.filter(
                    //   (item) =>
                    //     item?.dataType === "Image URL" ||
                    //     item?.dataType === "Screenshot from URL"
                    // )
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
                            h1Size: "Value must be 26 or less.",
                          }));
                        }
                      }
                    }}
                    placeholder="00"
                    inputProps={{
                      maxLength: 2,
                      type: "number",
                      min: 0,
                      max: 64,
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
                    value={h2}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      const isSpecialCase =
                        value.startsWith("[") && value.endsWith("]");
                      if (isSpecialCase || value.length <= 100) {
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
                            h2Size: "Value must be 36 or less.",
                          }));
                        }
                      }
                    }}
                    placeholder="00"
                    inputProps={{
                      maxLength: 2,
                      type: "number",
                      min: 0,
                      max: 54,
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
                      const isSpecialCase =
                        value.startsWith("[") && value.endsWith("]");
                      if (isSpecialCase || value.length <= 400) {
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
                    error={!!errors.body}
                    multiline
                    minRows={5}
                    rows={5}
                    variant="outlined"
                    placeholder="Enter Your Text Here"
                    // inputProps={{ maxLength: 400 }}
                  />
                  <Typography className="error">
                    {errors.body}{" "}
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
                            bodySize: "Value must be 18 or less.",
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
                      // ?.filter(
                      //   (item) =>
                      //     item?.dataType == "Text Field" ||
                      //     item?.dataType == "First name" ||
                      //     item?.dataType == "Last name" ||
                      //     item?.dataType == "Customer organization"
                      // )
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
          </Grid>
          <Box className="secondmaingridbtn" mt={2}>
            <Button
              className={`${
                nextButton === true ? "savebtnDisables" : "savebtn"
              }`}
              disabled={nextButton === true}
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
              {loading === false ? "Save" : <ButtonCircularProgress />}
            </Button>
          </Box>
        </Dialog>
      )}
    </>
  );
}

export default RightTextSection;
