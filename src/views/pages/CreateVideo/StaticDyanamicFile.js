import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  Tooltip,
} from "@material-ui/core";
import { Copy } from "react-feather";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import moment from "moment";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MdClose } from "react-icons/md";
import AudioDialog from "src/component/AudioDialog";
import { menuProps } from "src/utils";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  maindiv: {
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0px !important",
    },
    "& .gridcontainer": {
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "15px",
    },
    "& .savebtn": {
      borderRadius: "6px",
      background: "var(--blue, #0358AC)",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .savebtnDisables": {
      borderRadius: "6px",
      background: "#F4F4F4",
      color: "black",
      height: "42px",
      width: "100px",
    },
    "& .middleBox": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .secondmaingridbtn": {
      marginTop: "10px",
      display: "flex",
      gap: "1rem",
      justifyContent: "flex-end",
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
  },
  secondmaingridBox: {
    borderRadius: "12px",
    background: "#FFF",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    padding: "16px 23px",
    border: "1px solid var(--light-stroke, #ECECEC)",
    height: "100%",
    // minHeight: "450px",
    "& .MuiButton-root": {
      color: "#152F40",
      background: "transparent",
      fontSize: "16px",
    },
    "& .MuiButton-contained": {
      color: "#fff",
      background: "#0358AC",
      fontSize: "16px",
      height: "48px",
    },
    "& .MuiButton-contained:disabled": {
      backgroundColor: "#F4F4F4",
      color: "#152F40",
      borderRadius: "6px",
      cursor: "not-allowed",
    },
    "& .error": {
      fontSize: "12px",
      color: "red",
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
  durationscroll: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
}));
const StaticDyanamicFile = ({
  elementType,
  linkData,
  typeIndex,
  getSummary,
  handleScreen,
  elementID,
  reloadData,
  linkObject,
  viewParams,
  firstRowValue,
  setIsSectionCompleted,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOptionsecond, setSelectedOptionSecond] = useState("none");
  const [selectedOption, setSelectedOption] = useState("none");
  console.log(selectedOption, "selectedOption");

  const [link, setLink] = useState("");
  const [dymLink, setDymLink] = useState("none");
  console.log(link, "link");

  const [duration, setDuration] = useState("");
  const [elementData, setElementData] = useState();
  console.log(elementData, "elementData");

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState();
  const [selectedAudioType, setSelectedAudioType] = useState("audio");
  const [audioScriptInput, setAudioScriptInput] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  console.log("audioFile: ", audioFile);

  const [tags, setTags] = useState([]);

  const [isSaved, setIsSaved] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  const [saveButton, setSaveButton] = useState(false);

  const [companyDetails, setCompanyDetails] = useState("");
  console.log("companyDetails: ", companyDetails);
  const [firstRowData, setFirstRowData] = useState("");

  const [matchData, setMatchData] = useState("");
  const [matchDynamic, setMatchDynamic] = useState("");

  const [selectedUrl, setSelectedUrl] = useState("");
  const [sheetData, setSheetData] = useState([]);

  const handleUrlChange = (event) => {
    setSelectedUrl(event.target.value);
    console.log(selectedUrl);
  };

  const [audioURL, setAudioURL] = useState("");
  const [audioFiles, setAudioFiles] = useState(null);

  const handleAudioChange = (event) => {
    setAudioFiles(event.target.files[0]);
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

  const handleAudioUpload = async () => {
    if (!audioFiles)
      return toast.error("Please select an audio file to upload.");
    console.log("Hello");

    try {
      const formData = new FormData();
      formData.append("file", audioFiles);

      const response = await axios.post(ApiConfig.UploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { public_url } = response.data;
      setAudioURL(public_url);
      toast.success("Audio video successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpenAudioDescriptionEditor = () => {
    setOpen(true);
  };

  const handleCloseAudioDescription = () => {
    setOpen(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSaveDescription = () => {
    if (description.trim()) {
      console.log("Description saved:", description);
      setOpen(false);
    } else {
      console.log("Description cannot be empty");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // Function to handle audio type change
  const handleAudioTypeChange = (event) => {
    setSelectedAudioType(event.target.value);
    setAudioScriptInput("");
  };
  // Function to handle click event
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSaveClick = () => {
    if (selectedOptionsecond === "none") {
      toast.error("Please select any one option from scroll.");
    }
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
  const sheetFirstRowData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getFirstRowData,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: viewParams?.googleSheetsId,
        },
      });
      if (res?.data?.status === 200) {
        console.log(res?.data?.data?.data);
        setFirstRowData(res?.data?.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSheetType();
    sheetFirstRowData();
  }, []);

  const getSheetTypeVideo = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getSheetTypeVideo,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          videoTemplateId: templateId,
        },
      });
      if (res?.status === 200) {
        const filteredTags = res?.data?.data.filter(
          (item) => item?.dataType === "URL"
        );
        setTags(filteredTags);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.message);
      }
    }
  };
  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");
  let apiData;
  console.log(selectedUrl, "selectedUrl");

  if (elementType === "STATICURL") {
    let isDynamicUrl = link !== "" ? false : true;
    let audio_embedded = false;
    if (audioURL) {
      audio_embedded = true;
    }
    apiData = {
      section_name: "STATIC URL",
      section_number: 1,
      duration: duration,
      firstRowValue: link || matchData,
      scroll: selectedOptionsecond,
      elementId: elementID,
      sequence: typeIndex + 1,
      hvo_template_id: templateId,
      status: "PROCESSING",
      audio_url: audioURL,
      value: link || dymLink,
      is_dynamic: false,
      audio_embedded,
      audio_description: description,
    };
  } else if (elementType === "DYNAMICURL") {
    let audio_embedded = false;
    if (audioURL) {
      audio_embedded = true;
    }
    let is_dynamic = false;
    if (selectedUrl) {
      is_dynamic = true;
    }
    apiData = {
      section_name: "DYNAMIC URL",
      section_number: 2,
      duration: duration,
      tagValueName: selectedOption,
      scroll: selectedOptionsecond,
      firstRowValue: matchDynamic,
      elementId: elementID,
      sequence: typeIndex + 1,
      hvo_template_id: templateId,
      status: "PROCESSING",
      audio_url: audioURL,
      value: selectedUrl,
      is_dynamic,
      audio_embedded,
      audio_description: description,
    };
  }
  const [errors, setErrors] = useState({
    link: "",
    dymLink: "",
    duration: "",
    selectedOptionsecond: "",
    dynamic: "",
  });

  const fetchSheetData = async () => {
    try {
      const response = await axios.get(`${ApiConfig.headers}/${templateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching sheet data:", error);
      return [];
    }
  };

  const handleMenuOpen = async () => {
    if (sheetData.length === 0) {
      const data = await fetchSheetData();
      setSheetData(data);
    }
  };

  const urlPattern =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(?:\/[^\s?#]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/;
  // const urlPattern = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
  const handleSetData = async () => {
    // setIsSaved(true);
    if (elementType === "STATICURL") {
      const newError = {
        dymLink: "",
        link: "",
        duration: "",
        selectedOptionsecond: "",
      };
      // if (link === "" && dymLink === "none") {
      //   newError.link = "Static/Dynamic URL is Required";
      // }
      if (link !== "") {
        if (!urlPattern.test(link)) {
          newError.link = "Please enter a valid Static URL.";
        }
      }
      if (dymLink === "none" && link === "") {
        newError.dymLink = "Dynami/Static link is Required";
      }
      if (duration === "") {
        newError.duration = "Duration is required.";
      }
      if (selectedOptionsecond === "none") {
        newError.selectedOptionsecond = "Scroll type is required.";
      }
      // if (audioFile === null) {
      //   toast.error("Please upload audio file.");
      // }

      if (
        (link !== "" || dymLink !== "") &&
        duration !== "" &&
        selectedOptionsecond !== "none"
        // audioFile !== null
      ) {
        try {
          setSaveButton(true);
          setLoading(true);
          const res = await axios({
            method: "POST",
            url: ApiConfig.createVideoTemplateReferral,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },

            data: apiData,
          });
          if (res?.status === 200) {
            toast.success("Section saved successfully");
            // setElementData({
            //   firstRowValue: firstRowValue,
            //   index: typeIndex,
            //   type: elementType,
            //   link: link || dymLink,
            //   dynamicURL: selectedOption,
            //   duration: duration,
            //   scroll: selectedOptionsecond,
            // });
            setIsSaved(true); // Form successfully saved
            setNextBtn(true);
            setDescription("");
            handleNext();
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
          console.log(error, "error inside Static the create video upside");
          setLoading(false);
        } finally {
          setLoading(false);
          setSaveButton(false);
        }
      }
      setErrors(newError);
    } else if (elementType === "DYNAMICURL") {
      const newError = {
        dynamic: "",
        duration: "",
        selectedOptionsecond: "",
      };
      // if (selectedOption === "none") {
      //   newError.dynamic = "Dynamic URL is Required";
      // }
      if (duration === "") {
        newError.duration = "Duration is required.";
      }
      if (selectedOptionsecond === "none") {
        newError.selectedOptionsecond = "Scroll type is required.";
      }
      // if (audioFile === null) {
      //   toast.error("Please upload audio file.");
      // }
      // if (
      //   selectedOption !== "none" &&
      //   duration !== "" &&
      //   selectedOptionsecond !== "none"
      //   // audioFile !== null
      // ) {
      try {
        setLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.createVideoTemplateReferral,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          data: apiData,
        });
        if (res?.status === 200) {
          toast.success("Section saved successfully");
          // setElementData({
          //   firstRowValue: firstRowValue,
          //   index: typeIndex,
          //   type: elementType,
          //   link: link,
          //   dynamicURL: selectedOption,
          //   duration: duration,
          //   scroll: selectedOptionsecond,
          // });
          setIsSaved(true); // Form successfully saved
          setNextBtn(true);
          setDescription("");
          handleNext();
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error, "error isndeie the create video down");
        setLoading(false);
      } finally {
        setLoading(false);
      }
      // }
      // setErrors(newError);
    }
  };

  useEffect(() => {
    if (elementType === "DYNAMICURL") {
      getSheetTypeVideo();
    }
  }, [elementType]);

  useEffect(() => {
    linkData(elementData);
    handleReset();
  }, [elementData]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectChange = (event) => {
    const selectedDynamic = event.target.value;
    setSelectedOption(selectedDynamic);
    if (selectedDynamic !== "none" && firstRowData[selectedDynamic]) {
      setMatchDynamic(firstRowData[selectedDynamic]);
    } else {
      setMatchDynamic(""); // Clear matchData if no match is found
    }
    // handleClose();
  };
  const handleSelectChangeSecond = (event) => {
    setSelectedOptionSecond(event.target.value);
    handleClose();
  };
  // Function to handle resetting input fields
  const handleReset = () => {
    setLink("");
    setDuration("");
    setSelectedOptionSecond("none");
    setDymLink("none");
    setAudioFile(null);
  };
  // Function to submit summary data
  const handleNext = () => {
    setIsSectionCompleted(true);
    submitSummary();
    reloadData();
    handleScreen("none");
  };
  const submitSummary = async () => {
    if (linkObject?.length !== 0) {
      getSummary("summary");
    }
    // else {
    //   toast.error("Please add atleast one element.");
    // }
  };
  const handleDymLinkChange = (e) => {
    const selectedValue = e.target.value;
    setDymLink(selectedValue);
    setLink("");

    // Match the selected value with the keys in firstRowData
    if (selectedValue !== "none" && firstRowData[selectedValue]) {
      setMatchData(firstRowData[selectedValue]);
    } else {
      setMatchData(""); // Clear matchData if no match is found
    }

    if (!urlPattern.test(selectedValue)) {
      setErrors({
        dymLink: "Please enter a valid Static URL.",
      });
    } else {
      setErrors({ dymLink: "" });
    }
  };
  useEffect(() => {
    if (
      firstRowData &&
      Object.keys(firstRowData).length > 0 &&
      dymLink !== "none"
    ) {
      handleDymLinkChange({ target: { value: dymLink } });
    }
  }, [firstRowData]);
  const goBackToElementSelection = () => {
    setIsSectionCompleted(true);
    handleScreen("none");
  };
  return (
    <Box className={classes.secondmaingridBox}>
      {loading === true && <FullScreenLoader />}
      <Box style={{ marginTop: "12px", color: "#0358AC" }}>
        <Box mb={3} style={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon
            style={{ cursor: "pointer", marginRight: "8px", fontSize: "large" }}
            onClick={goBackToElementSelection}
          />
          {elementType === "STATICURL" ? (
            <Typography>Static URL | Element {typeIndex + 1}</Typography>
          ) : (
            <Typography>Dynamic URL | Element {typeIndex + 1}</Typography>
          )}
        </Box>
        {elementType === "STATICURL" ? (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} marginTop="12px">
                <Typography className="heading">Enter Static URL</Typography>

                <TextField
                  variant="outlined"
                  placeholder="https://www.hubspot.com"
                  value={link}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    setMatchData("");
                    setDymLink("none");
                    // Check if input is empty
                    if (inputValue === "") {
                      setLink(inputValue);
                      setErrors({ link: "" });
                      return;
                    }

                    // Prepend 'https://www.' only if the input is not empty
                    if (
                      !inputValue.startsWith("http://") &&
                      !inputValue.startsWith("https://")
                    ) {
                      // Only prepend if it's the first input or input was fully cleared
                      if (!inputValue.startsWith("www.") && link.length === 0) {
                        inputValue = "https://www." + inputValue;
                      }
                    }

                    // Validate the URL
                    if (!urlPattern.test(link)) {
                      setErrors({ link: "Please enter a valid Static URL." });
                    } else {
                      setErrors({ link: "" });
                    }

                    setLink(inputValue);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} marginTop="12px">
                <Typography className="heading">Select Static URL</Typography>
                <Select
                  style={{ marginTop: "5px" }}
                  variant="outlined"
                  placeholder="Select Static Url"
                  className="selectitem"
                  id="static-url-selector"
                  fullWidth
                  MenuProps={{
                    PaperProps: {
                      style: { maxHeight: 200 },
                    },
                  }}
                  value={selectedUrl}
                  onChange={handleUrlChange}
                  IconComponent={ExpandMoreIcon}
                  onOpen={handleMenuOpen}
                >
                  <MenuItem value="none" disabled>
                    Select Static URL
                  </MenuItem>

                  {sheetData
                    ?.filter((entry) => entry?.dataType === "Static URL")
                    ?.map((entry) => (
                      <MenuItem key={entry?.value} value={entry?.value}>
                        {entry?.value}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Select
              variant="outlined"
              id="choose-template"
              className="selectitem"
              fullWidth
              MenuProps={menuProps}
              value={selectedUrl}
              onChange={handleUrlChange}
              IconComponent={ExpandMoreIcon}
              onOpen={handleMenuOpen} // Fetch data when the menu opens
              // className={classes.menuitemSecond}
            >
              <MenuItem value="none" disabled>
                Select Dynamic URL
              </MenuItem>
              {sheetData
                ?.filter((entry) => entry?.dataType === "Dynamic URL")
                ?.map((entry) => (
                  <MenuItem key={entry?.value} value={entry?.value}>
                    {entry?.value}
                  </MenuItem>
                ))}
            </Select>
            <Typography className="error">{errors.dynamic}</Typography>
          </>
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          marginTop: "12px",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <div style={{ width: "100%", borderRadius: "6px" }}>
          <Typography>Duration (sec)</Typography>
          <TextField
            className={classes.durationscroll}
            disabled={selectedOption === "none" && dymLink === ""}
            value={duration}
            type="number"
            fullWidth
            onChange={(e) => {
              let value = e.target.value;

              // Convert value to number to ensure numeric comparison
              if (value !== "") {
                value = Number(value);
              }

              // Ensure value does not exceed 3600, has a max length of 10 characters, and is not negative
              if (
                value >= 0 &&
                value.toString().length <= 10 &&
                value <= 3600
              ) {
                setDuration(value);
                if (value === "") {
                  setErrors({ duration: "Duration is required." });
                } else {
                  setErrors({ duration: "" });
                }
              } else if (value > 3600) {
                setErrors({ duration: "Duration cannot exceed 3600 seconds." });
              } else if (value < 0) {
                setErrors({ duration: "Negative values are not allowed." });
              }
            }}
            variant="outlined"
            placeholder="00"
          />

          <Typography className="error">{errors.duration}</Typography>
        </div>
        <div style={{ width: "100%", borderRadius: "6px" }}>
          <Typography>Scroll</Typography>
          <Select
            variant="outlined"
            value={selectedOptionsecond}
            disabled={duration === ""}
            onChange={(e) => {
              handleSelectChangeSecond(e);
              if (e === "none") {
                setErrors({ selectedOptionsecond: "Scroll type is required." });
              } else {
                setErrors({ selectedOptionsecond: "" });
              }
            }}
            fullWidth
            MenuProps={menuProps}
            style={{ marginTop: "5px", borderRadius: "6px" }}
            className={classes.menuitem}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value="none" disabled>
              Select type
            </MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
          <Typography className="error">
            {errors.selectedOptionsecond}
          </Typography>
        </div>

        <div>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            style={{ marginBottom: "1rem" }}
          />
          <Button
            fullWidth
            variant={duration ? "contained" : "outlined"}
            style={{ height: "44px" }}
            className={`${!duration ? "savebtnDisables" : "savebtn"}`}
            onClick={handleAudioUpload}
          >
            Upload Audio
          </Button>
          <Button
            fullWidth
            variant={description ? "contained" : "outlined"}
            style={{ height: "44px", margin: "0 1rem" }}
            className={`${!description ? "savebtnDisables" : "savebtn"}`}
            onClick={handleOpenAudioDescriptionEditor}
          >
            Add Audio Description
          </Button>

          <Dialog
            open={open}
            onClose={handleCloseAudioDescription}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Add Audio Description</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  {" "}
                  <TextField
                    autoFocus
                    multiline
                    rows={16}
                    label="Audio Description"
                    fullWidth
                    value={description}
                    onChange={handleDescriptionChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  {" "}
                  <Box
                    className="dynamicFieldsBox d-flex column alignstart justify-start"
                    p={2}
                  >
                    <Typography className="label">
                      Copy to Add Dynamic Fields
                    </Typography>
                    <div style={{ height: "630px", overflowY: "auto" }}>
                      {companyDetails !== undefined &&
                        companyDetails.length > 0 &&
                        companyDetails
                          ?.filter(
                            (item) =>
                              item?.dataType === "Text" ||
                              item?.dataType === "First name (Required)" ||
                              item?.dataType === "Last name" ||
                              item?.dataType === "Customer organization"
                          )
                          ?.map((sheetfield, ind) => (
                            <Tooltip
                              title={sheetfield?.value || "Copy Text"}
                              arrow
                              key={ind}
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
                                        onClick={() =>
                                          handleCopy(sheetfield?.value)
                                        }
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
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseAudioDescription}
                style={{
                  backgroundColor: "#044D80",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveDescription}
                style={{
                  backgroundColor: "#044D80",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
      {elementType === "STATICURL" ? (
        <>
          {(link || matchData) && (
            <Box className="middleBox" style={{ marginTop: "12px" }}>
              {console.log(link, "linkkkkk", matchData, "matchhh")}
              <iframe
                src={link || matchData}
                // src={dymLink === "STATIC" ? link : elementData?.link}
                alt=""
                height="400px"
                width="100%"
                style={{ borderRadius: "16px", border: "1px solid" }}
              ></iframe>
            </Box>
          )}
        </>
      ) : (
        <>
          {matchDynamic && (
            <Box className="middleBox" style={{ marginTop: "12px" }}>
              <iframe
                src={matchDynamic}
                alt=""
                height="400px"
                width="100%"
                style={{ borderRadius: "16px", border: "1px solid" }}
              ></iframe>
            </Box>
          )}
        </>
      )}

      <Box className="secondmaingridbtn">
        <Button
          variant="contained"
          onClick={() => {
            handleSetData();
          }}
          className={classes.savebtn}
          disabled={isSaved || selectedOptionsecond === "none"}
        >
          Save
        </Button>
        <Button
          variant="contained"
          style={{ padding: "13px 24px" }}
          onClick={handleNext}
          className={classes.savebtn}
          disabled={!isSaved}
        >
          Next
        </Button>
      </Box>

      <AudioDialog
        open={openDialog}
        onClose={handleCloseDialog}
        setOpenDialog={setOpenDialog}
        dataFunction={setAudioScriptInput}
        data={audioScriptInput}
        videoDuration={duration}
        setAudioFile={setAudioFile}
        audioFile={audioFile}
      />
    </Box>
  );
};

export default StaticDyanamicFile;
