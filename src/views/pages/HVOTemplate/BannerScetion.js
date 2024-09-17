import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
  Modal,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { menuProps } from "src/utils";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import { SketchPicker } from "react-color";
import axios from "axios";
import { Copy } from "react-feather";
import { CgColorPicker } from "react-icons/cg";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
    "& .heading": {
      fontSize: "14px",
      color: "#0358AC",
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
    "& .label": {
      color: "#152F40",
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
    "& .sizeField": {
      "& .MuiFormControl-root": {
        width: "46px !important",
      },
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
    paddingLeft: "28px",
  },
}));

function BannerScetion({
  elementType,
  linkData,
  typeIndex,
  handleScreen,
  videoRefral,
  reload,
}) {
  const classes = useStyles();
  const [scrollSelect, setScrollSelect] = useState(false);
  const [bannerText, setBannerText] = useState("");
  console.log("bannerText: ", bannerText.length);
  const [sectionData, setSectionData] = useState();
  const [showTextField, setShowTextField] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [hexValueBanner, setHexValueBanner] = useState("");
  const [hexValueBannerText, setHexValueBannerText] = useState("");
  const [hexValueBtn, setHexValueBtn] = useState("");
  const [showColorPickerBanner, setShowColorPickerBanner] = useState(false);
  const [showColorPickerBannerText, setShowColorPickerBannerText] =
    useState(false);

  const [showColorPickerBtnText, setShowColorPickerBtnText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");
  const [bannerTextSize, setBannerTextSize] = useState("");
  console.log(bannerTextSize, "bannerTextSize");

  const handleSaveColorBanner = () => {
    setShowColorPickerBanner(false);
    setError((prevErrors) => ({
      ...prevErrors,
      hexValueBanner: "",
    }));
  };
  const handleCancelColorBanner = () => {
    setShowColorPickerBanner(false);
  };
  const handleSaveColorBannerText = () => {
    setShowColorPickerBannerText(false);
    setError((prevErrors) => ({
      ...prevErrors,
      hexValueBannerText: "",
    }));
  };
  const handleCancelColorBannerText = () => {
    setShowColorPickerBannerText(false);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");
  const [nextButton, setNextButton] = useState(false);
  const handleNext = () => {
    handleScreen("summary");
  };
  const goBackToElementSelection = () => {
    handleScreen("summary");
  };
  const [error, setError] = useState({
    selectScroll: "",
    bannerText: "",
    hexValueBanner: "",
    hexValueBannerText: "",
    bannerTextSize: "",
  });

  console.log("error: ", error?.bannerText);
  const handleSetData = async () => {
    let newError = {
      selectScroll: "",
      bannerText: "",
      hexValueBanner: "",
      hexValueBannerText: "",
      bannerTextSize: "",
    };
    if (scrollSelect === "none") {
      newError.selectScroll = "Horizontal scroll is required.";
    }

    if (bannerText === "") {
      newError.bannerText = "Banner text is required.";
    }
    if (hexValueBanner === "")
      newError.hexValueBanner = "Choose Color for Banner Text.";

    if (hexValueBannerText === "")
      newError.hexValueBannerText = "Choose Banner Text Color.";
    if (bannerTextSize === "")
      newError.bannerTextSize = "Choose Banner Text Size.";
    if (
      scrollSelect !== "none" &&
      bannerText !== "" &&
      hexValueBanner !== "" &&
      hexValueBannerText !== "" &&
      bannerTextSize !== "" &&
      bannerText.length <= 59
    ) {
      setLoading(true);
      try {
        const res = await Axios({
          method: "POST",
          url: ApiConfig.addElement,
          headers: {
            token: `${localStorage.getItem("token")}`,
          },
          params: {
            hvoTemplateId: templateId,
          },
          data: {
            scroll: scrollSelect,
            bannerText: bannerText,
            sectionTypeId: videoRefral.find(
              (data) => data.sectionName === elementType
            )?.sectionId,
            sequence: typeIndex + 1,
            userId: parseInt(localStorage.getItem("_id")),
            hvoId: templateId,
            bannerColor: hexValueBanner,
            bannerTextColor: hexValueBannerText,
            bannerTextSize: bannerTextSize,
          },
        });
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
          setNextButton(true);
          setLoading(false);
          reload();
        }
      } catch (error) {
        console.log(error, "error");
        toast.error(error?.response?.data?.message, "error");

        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    setError(newError);
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

  useEffect(() => {
    linkData(sectionData);
    handleReset();
  }, [sectionData]);

  const handleReset = () => {
    setScrollSelect("none");
    setBannerText("");
    setHexValueBannerText("");
    setHexValueBanner("");
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
    <Box className={classes.secondmaingridBox}>
      {loading === true && <FullScreenLoader />}

      <Box style={{ marginTop: "12px" }}>
        <Box mb={3} style={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon
            style={{ cursor: "pointer", marginRight: "8px", fontSize: "large" }}
            onClick={goBackToElementSelection}
          />
          <Typography className="heading">
            Banner | Section {typeIndex + 1}
          </Typography>
        </Box>
        <Grid container spacing={2}>
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
                    Select
                  </MenuItem>
                  <MenuItem value={true}>YES</MenuItem>
                  <MenuItem value={false}>NO</MenuItem>
                </Select>
                <Typography className="error">{error.selectScroll}</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography className="label">Banner Text</Typography>
                <TextField
                  fullWidth
                  value={bannerText}
                  onChange={(e) => {
                    const value = e.target.value.replace(htmlTagRegex, "");
                    if (value.length <= 60) {
                      setBannerText(value);
                      setError((prevError) => ({
                        ...prevError,
                        bannerText: "",
                      }));
                    } else {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        bannerText: "Maximum character count is 60.",
                      }));
                    }
                  }}
                  variant="outlined"
                  style={{ marginTop: "2px" }}
                  placeholder="Enter Your Banner Text Here"
                />
                <Typography className="error">{error.bannerText}</Typography>
              </Grid>
              {/* <Grid item xs={12} sm={1}>
                <Typography className="label">Size</Typography>
                <TextField
                  fullWidth
                  value={bannerTextSize}
                  onChange={(e) => {
                    const value = e.target.value.replace(htmlTagRegex, "");
                    if (value.length <= 60) {
                      setBannerText(value);
                      setError((prevError) => ({
                        ...prevError,
                        bannerText: "",
                      }));
                    } else {
                      setError((prevErrors) => ({
                        ...prevErrors,
                        bannerText: "Maximum character count is 60.",
                      }));
                    }
                  }}
                  variant="outlined"
                  style={{ marginTop: "2px" }}
                  placeholder="Enter Your Banner Text Here"
                />
                <Typography className="error">{error.bannerText}</Typography>
              </Grid> */}

              <Grid item xs={1} className="sizeField">
                <Typography className="label">Size</Typography>
                <TextField
                  variant="outlined"
                  value={bannerTextSize}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "00" || value === "0") {
                      setBannerTextSize("");
                      setError((prevErrors) => ({
                        ...prevErrors,
                        bannerTextSize: "",
                      }));
                    } else if (/^\d{0,2}$/.test(value)) {
                      if (Number(value) <= 32) {
                        setBannerTextSize(value);
                        setError((prevErrors) => ({
                          ...prevErrors,
                          bannerTextSize: "",
                        }));
                      } else {
                        setError((prevErrors) => ({
                          ...prevErrors,
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
                  {error.bannerTextSize}{" "}
                  <span className={classes.hinttext}>(Max 32 px.)</span>
                </Typography>
              </Grid>
              <Grid item xs={6} className="colorField">
                <Typography className="label"> Choose Banner Color</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder="Choose Color"
                  onClick={() => setShowColorPickerBanner(true)}
                  value={hexValueBanner}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setHexValueBanner(event.target.value.toUpperCase());
                  }}
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
                  error={!!error.hexValueBanner}
                  helperText={error.hexValueBanner}
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
                      onChange={(color) => {
                        console.log(color.hex.toUpperCase());
                        setHexValueBanner(color.hex.toUpperCase());
                      }}
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

              <div style={{ height: "260px", overflowY: "auto" }}>
                {companyDetails !== undefined &&
                  companyDetails.length > 0 &&
                  companyDetails
                    ?.filter((item) => item?.dataType === "Text Field")
                    ?.map((sheetfield, ind) => (
                      <Tooltip title={sheetfield?.value || "Copy Text"} arrow>
                        <TextField
                          key={ind}
                          fullWidth
                          value={sheetfield?.value}
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
            className={`${nextButton === true ? "savebtnDisables" : "savebtn"}`}
            disabled={nextButton === true}
            variant="contained"
            onClick={() => handleSetData()}
          >
            Save
          </Button>
          <Button
            variant="contained"
            className={`${nextButton === false ? "savebtnDisables" : "savebtn"
              }`}
            disabled={nextButton === false}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BannerScetion;
