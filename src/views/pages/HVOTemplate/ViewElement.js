import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  InputAdornment,
  Select,
  Modal,
} from "@material-ui/core";
import { menuProps } from "src/utils";
import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import FullScreenLoader from "../../../component/FullScreenLoader";
import { SketchPicker } from "react-color";
import { CgColorPicker } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  secondmaingridBox: {
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
  },
  durationscroll: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
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
      borderRight: "none !important",
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
// Function to render and manage the view elements based on the provided linkObject and getSummary function
function ViewElement({
  linkObject,
  getSummary,
  templateId,
  fbLink,
  instaLink,
  linkedInLink,
  footerData,
}) {
  const fileInputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("none");
  const [logos, setLogos] = useState({
    Logo1: linkObject?.logo,
    Logo2: linkObject?.prospectLogo,
  });
  console.log("linkObject?.prospectLogo: ", linkObject?.prospectLogo);
  const handleChangetitle = (e) => {
    setSelectedOption(e.target.value);
  };
  const classes = useStyles();

  //header section
  const [scrollSelect, setScrollSelect] = useState("none");
  const [companyDetails, setCompanyDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    selectScroll: "",
    bannerText: "",
    CTA: "",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [existcolor, setexistcolor] = useState("");
  const [fn, setfn] = useState(() => {});
  console.log(linkObject, "linkObject");

  const [nextButton, setNextButton] = useState(false);
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
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    companyDetailsdata();
  }, []);
  //
  return (
    <Box className={classes.secondmaingridBox}>
      <Box style={{ marginTop: "12px", color: "#0358AC", marginBottom: "5px" }}>
        {linkObject?.sectionType?.sectionName === "HEADER" ? (
          <Typography>Header | Section {linkObject?.sequence}</Typography>
        ) : linkObject?.sectionType?.sectionName === "HERO" ? (
          <Typography>Hero Section | Section {linkObject?.sequence}</Typography>
        ) : linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER" ? (
          <Typography>
            Highlight Banner | Section {linkObject?.sequence}
          </Typography>
        ) : linkObject?.sectionType?.sectionName === "LEFT_TEXT_RIGHT_IMAGE" ? (
          <Typography>
            Left Text Right Image | Section {linkObject?.sequence}
          </Typography>
        ) : linkObject?.sectionType?.sectionName === "RIGHT_TEXT_LEFT_IMAGE" ? (
          <Typography>
            Right Text Left Image | Section {linkObject?.sequence}
          </Typography>
        ) : linkObject?.sectionType?.sectionName === "FOOTER" ? (
          <Typography>Footer | Section {linkObject?.sequence}</Typography>
        ) : (
          <></>
        )}
      </Box>
      {linkObject?.sectionType?.sectionName === "HEADER" ? (
        <>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography className="label">Your Logo (Top Left)</Typography>
              <Box className="d-flex justify-start" mt={"20px"}>
                <Box
                  style={{
                    maxWidth: "150px",
                    width: "100%",
                    marginRight: "10px",
                  }}
                >
                  <img src="/images/experienceremovebg.png" width={"100%"} />
                </Box>
                {linkObject?.firstRowValue && (
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
                      <img
                        src={linkObject?.firstRowValue}
                        width={"100%"}
                        alt="Selected"
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography className="label">Optional: Dynamic Logo</Typography>
              <FormControl style={{ marginTop: "20px" }}>
                {/* <Select
                  variant="outlined"
                  className="selectitem"
                  id="choose-template"
                  fullWidth
                  value={selectedOption}
                  onChange={handleChangetitle}
                  IconComponent={ExpandMoreIcon}
                > */}
                <MenuItem value="none" style={{ fontSize: "16px" }}>
                  {linkObject?.headerLogo}
                </MenuItem>
                {/* <MenuItem value="Logo1">Logo 1</MenuItem>
                  <MenuItem value="Logo2">Logo 2</MenuItem> */}
                {/* </Select> */}
              </FormControl>
            </Grid>
          </Grid>
        </>
      ) : linkObject?.sectionType?.sectionName === "HERO" ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="heading" style={{ color: "#152F40" }}>
                {/* Dynamic   */}
                Image URL
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Uplaod Image"
                value={
                  linkObject?.heroImg
                    ? linkObject?.heroImg
                    : linkObject?.staticImage
                }
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <input
                        type="file"
                        accept="image/jpeg, image/png,image/jpg"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container style={{ gap: "15px" }}>
                <Grid item xs={10}>
                  <Typography className="label">Headline 1</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.headline1}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.headline1Size}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Heading 1 Color</Typography>

                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    // placeholder="Enter Your HEX Color"
                    value={linkObject?.headline1Color}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Typography className="label">Headline 2</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.headline2}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.headline2Size}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography className="label">Body Text</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.bodyText}
                    multiline
                    minRows={5}
                    rows={5}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.bodyTextSize}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Body Text Color</Typography>

                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    // placeholder="Enter Your HEX Color"
                    value={linkObject?.bodyTextColor}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <Box
                className="dynamicFieldsBox d-flex column alignstart justify-start"
                p={2}
              >
                <Typography className="label">
                  Copy to Add Dynamic Fields
                </Typography>

                <div style={{ height: "450px", overflowY: "auto" }}>
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    Object.keys(companyDetails[0]).map((sheetfield, ind) => (
                      <TextField
                        fullWidth
                        value={sheetfield}
                        // onChange={(e) => {
                        //   const value = e.target.value;
                        //   if (/^[a-zA-Z0-9 ]{0,60}$/.test(value)) {
                        //     setCompanyName(value);
                        //   }
                        // }}
                        variant="outlined"
                        placeholder={sheetfield}
                        InputProps={{
                          readOnly: true,
                        }}
                        inputProps={{ maxLength: 60, minLength: 2 }}
                      />
                    ))}
                </div>
              </Box>
            </Grid> */}

            <Grid item xs={4}>
              <Typography className="label">CTA Button Text</Typography>

              <TextField
                placeholder="Enter Button Text"
                variant="outlined"
                fullWidth
                value={linkObject?.ctaButtonText}
              />
            </Grid>
            <Grid item xs={4} className="colorField">
              <Typography className="label">CTA Button Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.ctaButtonTextColor}
                />
              </>
            </Grid>
            <Grid item xs={4} className="colorField">
              <Typography className="label">CTA Button Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.ctaButtonColor}
                />
              </>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography className="label">
                Static / Dynamic URL Here
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={linkObject?.staticUrl || linkObject?.dynamicUrl}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography className="label">Demo Text</Typography>

              <TextField
                placeholder="Enter Button Text"
                variant="outlined"
                fullWidth
                value={linkObject?.demoButtonText}
              />
            </Grid>
            <Grid item xs={4} className="colorField">
              <Typography className="label">Demo Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.demoButtonTextColor}
                />
              </>
            </Grid>
            <Grid item xs={4} className="colorField">
              <Typography className="label">Demo Text Hover Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.demoButtonColor}
                />
              </>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography className="label">
                Static / Dynamic URL Here
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={linkObject?.staticUrlDemo || linkObject?.dynamicUrlDemo}
              />
            </Grid>
          </Grid>
        </>
      ) : linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER" ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography className="label">Horizontal Scroll</Typography>
              {/* <Select
                variant="outlined"
                className="selectitem"
                id="choose-template"
                fullWidth
                MenuProps={menuProps}
                value={linkObject?.scroll}
                name=""
              > */}
              {/* <MenuItem value="none" disabled>
                  Select{" "}
                </MenuItem>
                <MenuItem value={false}>NO</MenuItem> */}
              <MenuItem value={linkObject?.scroll == true ? "Yes" : "No"}>
                {linkObject?.scroll == true ? "Yes" : "No"}
              </MenuItem>
              {/* </Select> */}
              <Typography className="error">{error.selectScroll}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography className="label">Banner Text</Typography>
              <TextField
                fullWidth
                value={linkObject?.bannerText}
                // onChange={(e) => setBannerText(e.target.value)}
                variant="outlined"
                style={{ marginTop: "2px" }}
                placeholder="Enter Your Banner Text Here"
              />
              <Typography className="error">{error.bannerText}</Typography>
            </Grid>
            <Grid item xs={1} className="sizeField">
              <Typography className="label">Size</Typography>

              <TextField
                variant="outlined"
                value={linkObject?.bannerTextSize}
              />
            </Grid>
            {scrollSelect === true && (
              <Box mt={"4px"} mb={"8px"} ml={1}>
                <Typography style={{ color: "red" }}>
                  *Selecting 'Scroll' will disable the option to add a CTA link
                  to the banner
                </Typography>
              </Box>
            )}
            <Grid item xs={6} className="colorField">
              <Typography className="label">Banner Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.bannerColor}
                  placeholder="Your Banner Color"
                />
              </>
            </Grid>

            <Grid item xs={6} className="colorField">
              <Typography className="label">Banner Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.bannerTextColor}
                  placeholder="Your Banner Color"
                />
              </>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <Typography className="label">CTA Button</Typography>

              <TextField
                placeholder="Enter Button Text"
                variant="outlined"
                fullWidth
                value={linkObject?.ctaButtonText}
                // onChange={handleInputChange}
                disabled={scrollSelect === true}
              />
            </Grid>
            <Grid item xs={4} className="colorField">
              <Typography className="label">CTA Button Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value=""
                  placeholder="Your Button Text Color"
                />
              </>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className="label">CTA Button Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={""}
                  placeholder="Your Button Color"
                />
              </>
            </Grid> */}
            {/* <Grid item xs={12}>
              <Typography className="label">
                Static / Dynamic URL Here
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="staticURL"
                placeholder="Your CTA Button Url"
              />
            </Grid> */}
          </Grid>
        </>
      ) : linkObject?.sectionType?.sectionName === "LEFT_TEXT_RIGHT_IMAGE" ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="heading" style={{ color: "#152F40" }}>
                {/* Static Image or Dynamic Image */}
                Image Url
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Uplaod Image"
                value={
                  linkObject?.leftTextRightImageUrl
                    ? linkObject?.leftTextRightImageUrl
                    : linkObject?.staticImage
                }
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <input
                        type="file"
                        accept="image/jpeg, image/png,image/jpg"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container style={{ gap: "15px" }}>
                <Grid item xs={10}>
                  <Typography className="label">Headline 1</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.headline1}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.headline1Size}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Heading 1 Color</Typography>

                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={linkObject?.headline1Color}
                    />
                  </>
                </Grid>
                <Grid item xs={10}>
                  <Typography className="label">Headline 2</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.headline2}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.headline2Size}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Heading 2 Color</Typography>
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={linkObject?.headline2Color}
                    />
                  </>
                </Grid>
                <Grid item xs={10}>
                  <Typography className="label">Body Text</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.bodyText}
                    multiline
                    minRows={5}
                    rows={5}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.bodyTextSize}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Body Text Color</Typography>
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={linkObject?.bodyTextColor}
                    />
                  </>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid item xs={12} sm={4}>
              <Typography className="label">CTA Button Text</Typography>

              <TextField
                placeholder="Enter Button Text"
                variant="outlined"
                fullWidth
                value={linkObject?.ctaButtonText}
              />
            </Grid>
            <Grid item xs={4} className="colorField">
              <Typography className="label">CTA Button Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.ctaButtonTextColor}
                />
              </>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography className="label">CTA Button Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.ctaButtonColor}
                />
              </>
            </Grid> */}
            {/* <Grid item xs={12} sm={12}>
              <Typography className="label">
                Static / Dynamic URL Here
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={linkObject?.staticUrl || linkObject?.dynamicUrl}
              />
            </Grid> */}
          </Grid>
        </>
      ) : linkObject?.sectionType?.sectionName === "HIGHLIGHT_BANNER2" ? (
        <>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={3}> */}
            {/* <Typography className="label">Horizontal Scroll</Typography> */}
            {/* <Select
                variant="outlined"
                className="selectitem"
                id="choose-template"
                fullWidth
                MenuProps={menuProps}
                value={linkObject?.scroll}
                name=""
              > */}
            {/* <MenuItem value="none" disabled>
                  Select{" "}
                </MenuItem>
                <MenuItem value={false}>NO</MenuItem> */}
            {/* <MenuItem value={linkObject?.scroll}>{linkObject?.scroll}</MenuItem> */}
            {/* </Select> */}
            {/* <Typography className="error">{error.selectScroll}</Typography> */}
            {/* </Grid> */}
            <Grid item xs={6} sm={6}>
              <Typography className="label">Banner Text</Typography>
              <TextField
                fullWidth
                value={linkObject?.bannerText}
                // onChange={(e) => setBannerText(e.target.value)}
                variant="outlined"
                style={{ marginTop: "2px" }}
                placeholder="Enter Your Banner Text Here"
              />
              <Typography className="error">{error.bannerText}</Typography>
            </Grid>
            {/* {scrollSelect === true && (
              <Box mt={"4px"} mb={"8px"} ml={1}>
                <Typography style={{ color: "red" }}>
                  *Selecting 'Scroll' will disable the option to add a CTA link
                  to the banner
                </Typography>
              </Box>
            )} */}
            <Grid item xs={5} className="colorField">
              <Typography className="label">Banner Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.bannerColor}
                  placeholder="Your Banner Color"
                />
              </>
            </Grid>
            <Grid item xs={1} className="sizeField">
              <Typography className="label">Size</Typography>

              <TextField
                variant="outlined"
                value={linkObject?.banner2TextSize}
              />
            </Grid>
            <Grid item xs={6} className="colorField">
              <Typography className="label">Banner Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.bannerTextColor}
                  placeholder="Your Banner Color"
                />
              </>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography className="label">CTA Button</Typography>

              <TextField
                placeholder="Enter Button Text"
                variant="outlined"
                fullWidth
                value={linkObject?.ctaButtonText}
                // onChange={handleInputChange}
                disabled={scrollSelect === true}
              />
            </Grid>
            {/* <Grid item xs={4} className="colorField">
              <Typography className="label">CTA Button Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value=""
                  placeholder="Your Button Text Color"
                />
              </>
            </Grid> */}
            <Grid item xs={6} className="colorField">
              <Typography className="label">Button Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={
                    linkObject?.ctaButtonTextColor ||
                    linkObject?.bannerButtonTextColor
                  }
                  placeholder="Your Banner Color"
                />
              </>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="label">CTA Button Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.ctaButtonColor}
                  placeholder="Your Button Color"
                />
              </>
            </Grid>
            <Grid item xs={12}>
              <Typography className="label">Static / Dynamic URL</Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="staticURL"
                value={linkObject?.staticUrl || linkObject?.dynamicUrl}
                placeholder="Your CTA Button Url"
              />
            </Grid>
          </Grid>
        </>
      ) : linkObject?.sectionType?.sectionName === "RIGHT_TEXT_LEFT_IMAGE" ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="heading" style={{ color: "#152F40" }}>
                Image URL
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Uplaod Image"
                value={
                  linkObject?.staticImage
                    ? linkObject?.staticImage
                    : linkObject?.leftImageRightText
                }
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <input
                        type="file"
                        accept="image/jpeg, image/png,image/jpg"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <Typography className="label">Duration (sec)</Typography>
              <TextField
                fullWidth
                type="number"
                name="duration"
                variant="outlined"
                value={linkObject?.durationSec}
                className="durationField"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className="label">Scroll</Typography>
              <Select
                variant="outlined"
                className="selectitem"
                id="choose-template"
                MenuProps={menuProps}
                fullWidth
                value={linkObject?.scroll}
                style={{ marginTop: "5px" }}
                name=""
                IconComponent={ExpandMoreIcon}
                // IconComponent={() => <ExpandMoreIcon className="endIconbtn" />}
              >
                <MenuItem value="none" disabled>
                  Select{" "}
                </MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </Grid> */}

            <Grid item xs={12} sm={12}>
              <Grid container style={{ gap: "15px" }}>
                <Grid item xs={10}>
                  <Typography className="label">Headline 1</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.headline1}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.headline1Size}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Heading 1 Color</Typography>

                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={linkObject?.headline1Color}
                    />
                  </>
                </Grid>
                <Grid item xs={10}>
                  <Typography className="label">Headline 2</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.headline2}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.headline2Size}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Heading 2 Color</Typography>
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={linkObject?.headline2Color}
                    />
                  </>
                </Grid>
                <Grid item xs={10}>
                  <Typography className="label">Body Text</Typography>
                  <TextField
                    fullWidth
                    value={linkObject?.bodyText}
                    multiline
                    minRows={5}
                    rows={5}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={1} className="sizeField">
                  <Typography className="label">Size</Typography>
                  <TextField
                    variant="outlined"
                    value={linkObject?.bodyTextSize}
                  />
                </Grid>
                <Grid item xs={4} className="colorField">
                  <Typography className="label">Body Text Color</Typography>
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={linkObject?.bodyTextColor}
                    />
                  </>
                </Grid>
              </Grid>
            </Grid>
            {/* 
            <Grid item xs={12} sm={4}>
              <Typography className="label">CTA Button Text</Typography>
              <TextField
                placeholder="Enter Button Text"
                variant="outlined"
                fullWidth
                value={linkObject?.ctaButtonText}
              />
            </Grid>
            <Grid item xs={4} className="colorField">
              <Typography className="label">CTA Button Text Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.ctaButtonTextColor}
                />
              </>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className="label">CTA Button Color</Typography>
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={linkObject?.ctaButtonColor}
                />
              </>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography className="label">
                Static / Dynamic URL Here
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={linkObject?.staticUrl || linkObject?.dynamicUrl}
              />
            </Grid> */}
          </Grid>
        </>
      ) : linkObject?.sectionType?.sectionName === "FOOTER" ? (
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
            ></Box>
          </Modal>
          <Box className={classes.secondmaingridBox}>
            <Box style={{ marginTop: "12px" }}>
              {/* <Box mb={3}>
                <Typography className="heading">FOOTER</Typography>
              </Box> */}
              <Grid container spacing={3} style={{ display: "flex" }}>
                <Grid item xs={12} sm={12}>
                  <Grid container style={{ gap: "15px" }}>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Footer Background Color
                      </Typography>
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        // placeholder="Enter Your HEX Color"
                        value={linkObject?.footerBackgroundColor}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Footer Heading Text Color
                      </Typography>
                      <TextField
                        variant="outlined"
                        value={linkObject.footerTextHeadingColor}
                        placeholder="Enter Footer Text Here"
                      />
                    </Grid>
                    <Grid item xs={1} className="sizeField">
                      <Typography className="label">Size</Typography>
                      <TextField
                        variant="outlined"
                        value={linkObject?.footerHeadingSize}
                        placeholder="00"
                      />
                    </Grid>
                    <Grid item xs={5} className="colorField">
                      <Typography className="label">
                        Footer Text Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={linkObject?.footerTextColor}
                        />
                      </>
                    </Grid>
                    <Grid item xs={5} className="colorField">
                      <Typography className="label">
                        Footer Text Hover Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={linkObject?.footerTextHoverColor}
                        />
                      </>
                    </Grid>
                    <Grid item xs={1} className="sizeField">
                      <Typography className="label">Size</Typography>
                      <TextField
                        variant="outlined"
                        value={linkObject?.footerTextSize}
                        placeholder="00"
                      />
                    </Grid>

                    <Grid item xs={5} className="colorField">
                      <Typography className="label">
                        Icon Background Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={linkObject?.socialIconBackgroundColor}
                        />
                      </>
                    </Grid>
                    <Grid item xs={5} className="colorField">
                      <Typography className="label">Icon Color</Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={linkObject?.socialIconColor}
                        />
                      </>
                    </Grid>

                    <Grid container style={{ gap: "15px" }}>
                      <Grid item xs={5} className="colorField">
                        <Typography className="label">
                          {" "}
                          Benchmark Color
                        </Typography>
                        <>
                          <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter Your HEX Color"
                            value={linkObject?.benchmarkColor}
                          />
                        </>
                      </Grid>
                      <Grid item xs={5} className="sizeField">
                        <Typography className="label">Size</Typography>
                        <TextField
                          variant="outlined"
                          value={linkObject.benchmarkSize}
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

                    {/* <Grid item xs={12}></Grid> */}
                  </Grid>
                  {/* <Grid container style={{ gap: "15px" }}>
                    <Grid item xs={12}></Grid>
                  </Grid> */}
                  {/* <Grid container style={{ gap: "15px" }}>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Select Terms of Use URL
                      </Typography>
                      <Select
                        style={{ marginTop: "5px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        fullWidth
                        MenuProps={menuProps}
                        IconComponent={ExpandMoreIcon}
                      >
                        <MenuItem value="" disabled>
                          Select Footer Text Link
                        </MenuItem>
                      </Select>
                    </Grid>
                   
                    <Grid item xs={6}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Select Privacy Policy URL
                      </Typography>
                      <Select
                        style={{ marginTop: "5px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        fullWidth
                        MenuProps={menuProps}
                        IconComponent={ExpandMoreIcon}
                      >
                        <MenuItem value="" disabled>
                          Select Footer Text Link
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Select Do Not Share/Sell URL
                      </Typography>
                      <Select
                        style={{ marginTop: "5px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        fullWidth
                        MenuProps={menuProps}
                        IconComponent={ExpandMoreIcon}

                      >
                        <MenuItem value="" disabled>
                          Select Footer Text Link
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Select Responsible Disclosure URL
                      </Typography>
                      <Select
                        style={{ marginTop: "5px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        fullWidth
                        MenuProps={menuProps}
                        IconComponent={ExpandMoreIcon}
                      >
                        <MenuItem value="" disabled>
                          Select Footer Text Link
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Accessibility URL
                      </Typography>
                      <Select
                        style={{ marginTop: "5px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        fullWidth
                        MenuProps={menuProps}
                        IconComponent={ExpandMoreIcon}
                      >
                        <MenuItem value="" disabled>
                          Select Footer Text Link
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        HIPAA Statement URL
                      </Typography>
                      <Select
                        style={{ marginTop: "5px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        fullWidth
                        MenuProps={menuProps}
                        // value={footerText6.footerlink}
                        IconComponent={ExpandMoreIcon}
                        // error={!!errors.image}
                        // helperText={errors.image}
                      >
                        <MenuItem value="" disabled>
                          Select Footer Text Link
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className="label"
                        style={{ color: "#152F40" }}
                      >
                        Trust URL
                      </Typography>
                      <Select
                        style={{ marginTop: "5px" }}
                        variant="outlined"
                        className="selectitem"
                        id="choose-template"
                        fullWidth
                        MenuProps={menuProps}
                        IconComponent={ExpandMoreIcon}

                      >
                        <MenuItem value="" disabled>
                          Select Footer Text Link
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={5} className="colorField">
                      <Typography className="label">
                        {" "}
                        Choose Footer Text Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={linkObject.footerTextColor}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
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
                        Choose Footer Hover Color
                      </Typography>
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          placeholder="Enter Your HEX Color"
                          value={linkObject?.footerHoverColor}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton>
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
                        value={linkObject.footerTextSize}
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
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
      <Box mt={2} display={"flex"} justifyContent={"right"}>
        <Button
          variant="contained"
          style={{ padding: "13px 24px" }}
          disabled={linkObject?.length === 0}
          onClick={() => {
            getSummary("summary");
          }}
        >
          Summary
        </Button>
      </Box>
    </Box>
  );
}

export default ViewElement;
