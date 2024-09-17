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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Copy } from "react-feather";
import { CgColorPicker } from "react-icons/cg";
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

function BannerSection2({
  elementType,
  linkData,
  typeIndex,
  handleScreen,
  videoRefral,
  reload,
}) {
  const classes = useStyles();
  const [scrollSelect, setScrollSelect] = useState("none");
  const [bannerText, setBannerText] = useState("");
  const [sectionData, setSectionData] = useState();
  const [showTextField, setShowTextField] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [hexValueBanner, setHexValueBanner] = useState("");
  const [hexValueBannerText, setHexValueBannerText] = useState("");
  const [hexValueBtn, setHexValueBtn] = useState("");
  const [showColorPickerBanner, setShowColorPickerBanner] = useState(false);

  const [showColorPickerBannerText, setShowColorPickerBannerText] =
    useState(false);
  const [showColorPickerBtn, setShowColorPickerBtn] = useState(false);
  const [showColorPickerBtnText, setShowColorPickerBtnText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState("");
  const [staticURL, setStaticURL] = useState("");
  const [selectedOption, setSelectedOption] = useState("none");
  const [hexValueBtnText, setHexValueBtnText] = useState("");
  const [banner2TextSize, setBanner2TextSize] = useState("");
  const [error, setError] = useState({
    selectScroll: "",
    bannerText: "",
    buttonText: "",
    hexValueBanner: "",
    hexValueBtn: "",
    static: "",
    dynamic: "",
    hexValueBtnText: "",
    hexValueBanner: "",
    banner2TextSize: "",
  });
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

  //
  const handleCancelColorBannerText = () => {
    setShowColorPickerBannerText(false);
  };
  const handleSaveColorBannerText = () => {
    setShowColorPickerBannerText(false);
    setError((prevErrors) => ({
      ...prevErrors,
      hexValueBannerText: "",
    }));
  };

  const handleSaveColorBtn = () => {
    setShowColorPickerBtn(false);
    setError((prevErrors) => ({
      ...prevErrors,
      hexValueBtn: "",
    }));
  };
  const handleCancelColorBtn = () => {
    setShowColorPickerBtn(false);
  };
  const handleSaveColorBtnText = () => {
    setShowColorPickerBtnText(false);
    setError((prevErrors) => ({
      ...prevErrors,
      hexValueBtnText: "",
    }));
  };
  const handleCancelColorBtnText = () => {
    setShowColorPickerBtnText(false);
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
  const handleChangeDynamicURL = (event) => {
    setSelectedOption(event.target.value);
    setStaticURL("");
    setError((prevError) => ({ ...prevError, dynamic: "" }));
  };
  const handleStaticUrl = (e) => {
    setStaticURL(e.target.value);
    setSelectedOption("none");
    setError((prevError) => ({ ...prevError, static: "" }));
  };

  const handleSetData = async () => {
    let newError = {
      selectScroll: "",
      bannerText: "",
      buttonText: "",
      hexValueBanner: "",
      hexValueBtn: "",
      static: "",
      dynamic: "",
      hexValueBtnText: "",
      hexValueBannerText: "",
      banner2TextSize: "",
    };
    if (scrollSelect === "none") {
      newError.selectScroll = "Horizontal scroll is required.";
    }
    if (buttonText === "") {
      newError.buttonText = "CTA Button text is required.";
    }
    if (bannerText === "") {
      newError.bannerText = "Banner text is required.";
    }
    if (hexValueBanner === "")
      newError.hexValueBanner = "Choose Color for Banner.";
    if (hexValueBannerText === "")
      newError.hexValueBannerText = "Choose Color for Banner Text.";
    if (hexValueBtn === "")
      newError.hexValueBtn = "Choose Color for CTA Button.";
    if (hexValueBtnText === "")
      newError.hexValueBtnText = "Choose Color for CTA Button Text.";
    if (staticURL === "" && selectedOption === "none")
      newError.static = "Static or Dynamic URL is required.";
    if (staticURL === "" && selectedOption === "none")
      newError.dynamic = "Dynamic or Static URL is required.";
    if (banner2TextSize === "")
      newError.banner2TextSize = "Choose Banner Text Size.";

    if (
      bannerText !== "" &&
      hexValueBanner !== "" &&
      hexValueBannerText !== "" &&
      buttonText !== "" &&
      hexValueBtn !== "" &&
      hexValueBtnText !== "" &&
      banner2TextSize !== "" &&
      (selectedOption !== "none" || staticURL !== "")
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
            bannerText: bannerText,
            ctaButtonText: buttonText,
            sectionTypeId: videoRefral.find(
              (data) => data.sectionName === elementType
            )?.sectionId,
            sequence: typeIndex + 1,
            userId: parseInt(localStorage.getItem("_id")),
            hvoId: templateId,
            bannerColor: hexValueBanner,
            ctaButtonColor: hexValueBtn,
            bannerButtonTextColor: hexValueBtnText,
            bannerButtonColor: hexValueBtn,
            staticUrl: staticURL,
            dynamicUrl: selectedOption,
            bannerTextColor: hexValueBannerText,
            banner2TextSize: banner2TextSize,
          },
        });
        if (res?.data?.status === 200) {
          toast.success("success");
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
            Highlight Banner | Section {typeIndex + 1}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item sx={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Typography className="label">Banner Text</Typography>
                <TextField
                  fullWidth
                  value={bannerText}
                  onChange={(e) => {
                    const value = e.target.value.replace(htmlTagRegex, "");
                    if (value.length <= 60) {
                      setBannerText(value);
                      setError((prevErrors) => ({
                        ...prevErrors,
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

              <Grid item xs={5} className="colorField">
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
              <Grid item xs={1} className="sizeField">
                <Typography className="label">Size</Typography>

                <TextField
                  variant="outlined"
                  value={banner2TextSize}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "00" || value === "0") {
                      setBanner2TextSize("");

                      setError((prevErrors) => ({
                        ...prevErrors,

                        banner2TextSize: "",
                      }));
                    } else if (/^\d{0,2}$/.test(value)) {
                      if (Number(value) <= 32) {
                        setBanner2TextSize(value);

                        setError((prevErrors) => ({
                          ...prevErrors,
                          banner2TextSize: "",
                        }));
                      } else {
                        setError((prevErrors) => ({
                          ...prevErrors,
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
                  {error.banner2TextSize}{" "}
                  <span className={classes.hinttext}>(Max 32 px.)</span>
                </Typography>
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
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Typography className="label">CTA Button</Typography>
                <Box mt={2}>
                  <TextField
                    className="ctabtntext"
                    placeholder="Enter Button Text"
                    variant="outlined"
                    fullWidth
                    value={buttonText}
                    onChange={(e) => {
                      const value = e.target.value.replace(htmlTagRegex, "");
                      if (value.length <= 20) {
                        setButtonText(value);
                        setError((prevErrors) => ({
                          ...prevErrors,
                          buttonText: "",
                        }));
                      } else {
                        setError((prevErrors) => ({
                          ...prevErrors,
                          buttonText: "Maximum character count is 20.",
                        }));
                      }
                    }}
                  />
                  <Typography className="error">{error.buttonText}</Typography>
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

              <div style={{ height: "341px", overflowY: "auto" }}>
                {companyDetails !== undefined &&
                  companyDetails.length > 0 &&
                  companyDetails
                    ?.filter((item) => item?.dataType == "Text Field")
                    ?.map((sheetfield, ind) => (
                      <Tooltip title={sheetfield?.value || "Copy Text"} arrow>
                        <TextField
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
            <Typography className="error">{error.static}</Typography>
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
              disabled={scrollSelect === true}
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
            <Typography className="error">{error.dynamic}</Typography>
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

export default BannerSection2;
