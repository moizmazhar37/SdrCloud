import React, { useState, useEffect, useRef } from "react";
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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useDropzone } from "react-dropzone";
import CropEasy from "./Crop/CropEasy";
import AudioDialog from "src/component/AudioDialog";
import FullScreenLoader from "src/component/FullScreenLoader";
import { toast } from "react-toastify";
import { truncate } from "lodash";
import { menuProps } from "src/utils";
//Custom style of ImageVideo page
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
      borderRadius: "0px 6px 6px 0px",
      background: "var(--blue, #0358AC)",
      color: "white",
      height: "42px",
      width: "100px",
    },
    "& .menuitem": {
      width: "100%",
      justifyContent: "space-between",
      border: "1px solid black",
      height: "100%",
      maxWidth: "300px",
      height: "45px",
      marginTop: "6px",
      color: "var(--black, #152F40)",
    },
    "& .secondmaingridBox": {
      borderRadius: "12px",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "16px 24px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      height: "100%",
      // minHeight: "450px",
    },
    "& .middleBox": {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      minHeight: "400px",
      alignItems: "center",
    },
  },
  secondmaingridbtn: {
    marginTop: "10px",
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    "& .MuiButton-root": {
      color: "#152F40",
      background: "transparent",
      fontSize: "16px",
    },
    "& .MuiButton-contained": {
      color: "#fff",
      background: "#0358AC",
      fontSize: "16px",
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
  secondimage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    cursor: "pointer",
  },
  secondmaingridBox: {
    borderRadius: "12px",
    background: "#FFF",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    padding: "16px 24px",
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
    },
    "& .MuiFormControlLabel-root": {
      marginLeft: "0px",
      marginTop: "0px",
    },
    "& .error": {
      fontSize: "12px",
      color: "red",
    },
  },
  DialogBox: {
    "& .MuiDialog-paperWidthXl": {
      width: "100%",
      maxWidth: "500px",
    },
  },
  durationscroll: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
}));
// Component for handling image and video uploads, with associated data management
const ImageVideo = ({
  elementType,
  linkData,
  typeIndex,
  getSummary,
  handleScreen,
  elementID,
  reloadData,
  setIsSectionCompleted,
  linkObject,
  viewParams,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOptionsecond, setSelectedOptionSecond] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [apiImage, setApiImage] = useState("");

  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const videoRef = useRef(null);
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [elementData, setElementData] = useState();
  const [duration, setDuration] = useState("");
  const [videoName, setVideoName] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [type, setType] = useState("none");

  const [openDialog, setOpenDialog] = useState();
  const [audioScriptInput, setAudioScriptInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  console.log("audioFile: ", audioFile);
  const [img64, setImg64] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  const [dynamicImage, setDynamicImage] = useState("none");

  const [dynamicVideo, setDynamicVideo] = useState("none");

  const [companyDetails, setCompanyDetails] = useState("");
  const [firstRowData, setFirstRowData] = useState("");
  const [firstRowDataVideo, setFirstRowDataVideo] = useState("");
  const [firstRightImg, setFirstRightImg] = useState(null);

  const [matchData, setMatchData] = useState("");

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
        setCompanyDetails(res?.data?.data?.data);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  const sheetFirstRowData = async (type) => {
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
      if (res.data.status === 200) {
        setUploadedImage(null);
        const firstRowData = res?.data?.data;
        setFirstRowDataVideo(firstRowData);
        if (firstRowData) {
          setPhotoURL(firstRowData[type]);
        } else {
          setPhotoURL(null);
        }

        setFirstRowData(firstRowData);
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSheetType();
    sheetFirstRowData(type);
  }, []);

  const handleImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Do something with the base64 string, e.g., save it in state

      setApiImage(base64String); // Save the base64 string in state or handle it as needed
    };
    reader.readAsDataURL(file);
    setType("none");
  };

  const handleDynamicImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL?.createObjectURL(file);
    setPhotoURL(imageUrl);
    if (file) {
      handleImageToBase64(file);
    }
  };

  const handleDynamicimage = async (event) => {
    const imageUrl = event.target.value;

    setUploadedImage1(imageUrl);
    setUploadedImage(null);
    setOpenCrop(true);
    setPhotoURL(imageUrl);
    setDynamicImage(imageUrl);
    setImg64(null);
    setUploadedImage1(imageUrl);
    setOpenCrop(true);

    // setImgName("");
    setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        setImg64(reader.result);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error converting image URL to base64:", error);
    }
  };

  // Function to handle checkbox change
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  // Function to open the upload dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  // Function to close the upload dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const templateId = searchParams.get("templateId");

  let apiData;
  if (elementType === "UPLOADIMAGE") {
    apiData = {
      duration: duration,
      scrollEnabled: false,
      elementId: elementID,
      sequence: typeIndex + 1,
      videoTemplateId: templateId,
      userId: localStorage.getItem("_id"),
      status: "PROCESSING",
      firstRowValue: firstRowData[type],
      audioTemplateReferralDto: {
        audioTypeId: "AUDIOURL",
        embedded: false,
        fileType: {
          AUDIO: audioFile,
        },
      },
      fileType: {
        // IMAGE: img64 || dynamicImage,
        IMAGE: apiImage ? photoURL : "",
      },
      url: type,
    };
  } else if (elementType === "VIDEOCLIPS") {
    apiData = {
      duration: duration,
      firstRowValue: matchData,
      scrollEnabled: false,
      elementId: elementID,
      sequence: typeIndex + 1,
      videoTemplateId: templateId,
      userId: localStorage.getItem("_id"),
      status: "PROCESSING",
      audioTemplateReferralDto: {
        audioTypeId: !checked ? "EMBEDDED" : "AUDIOURL",
        embedded: !checked,

        fileType: {
          AUDIO: audioFile,
        },
      },
      fileType: {
        VIDEO: uploadedVideo,
      },
      tagValueName: dynamicVideo,
    };
  }
  // State for managing form errors
  const [errors, setErrors] = useState({
    image: "",
    dynamicImage: "",
    duration: "",
    audio: "",
    video: "",
    dynamicVideo: "",
  });
  // Function to handle saving data
  const handleSetData = async () => {
    const newError = {
      image: "",
      dynamicImage: "",
      duration: "",
      video: "",
      audio: "",
      dynamicVideo: "",
    };
    if (elementType === "UPLOADIMAGE") {
      if (img64 === null || dynamicImage === "none")
        newError.image = "Static or Dynamic Image URL is required.";
      if (img64 === null || dynamicImage === "none")
        newError.dynamicImage = "Dynamic or Static Image URL is required.";

      if (duration === "") {
        newError.duration = "Duration is required.";
      }

      if (audioFile === null) {
        toast.error("Please upload audio file.");
      }
      if (
        duration !== "" &&
        audioFile !== null &&
        (img64 !== null || dynamicImage !== "none ")
      ) {
        try {
          setLoading(true);
          const res = await axios({
            method: "POST",
            url: ApiConfig.createVideoTemplateReferral,
            headers: {
              token: `${localStorage.getItem("token")}`,
            },

            data: apiData,
          });
          if (res?.data?.status === 200) {
            setIsVideoUploaded(false);
            setIsSaved(true);
            reloadData();
            toast.success(res?.data?.message);
            setElementData({
              index: typeIndex,
              type: elementType,
              fileName:
                videoName || uploadedImage?.name || uploadedImage1?.name,
              file:
                uploadedVideo || URL?.createObjectURL(uploadedImage) || type,
              duration: duration,
            });
            setLoading(false);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
          console.log(error, "error isndeie the create video");
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
      setErrors(newError);
    } else if (elementType === "VIDEOCLIPS") {
      if (uploadedVideo === null && dynamicVideo === "none")
        newError.video = "Static or Dynamic Video URL is required.";
      if (uploadedVideo === null && dynamicVideo === "none")
        newError.dynamicVideo = "Dynamic or Static Video URL is required.";

      if (duration === "") {
        newError.duration = "Duration is required.";
      }
      if (checked === true && audioFile === null) {
        toast.error("Please upload audio file.");
      }
      if (
        (uploadedVideo !== null || dynamicVideo !== "none") &&
        duration !== "" &&
        (checked === true ? audioFile !== null : true)
      ) {
        try {
          setLoading(true);
          const res = await axios({
            method: "POST",
            url: ApiConfig.createVideoTemplateReferral,
            headers: {
              token: `${localStorage.getItem("token")}`,
            },

            data: apiData,
          });
          if (res?.data?.status === 200) {
            setIsSaved(true);
            reloadData();
            setIsVideoUploaded(false);
            toast.success(res?.data?.message);
            setElementData({
              index: typeIndex,
              type: elementType,
              fileName: videoName || uploadedImage?.name,
              file: uploadedVideo || URL?.createObjectURL(uploadedImage),
              duration: duration,
            });
            setLoading(false);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
          console.log(error, "error isndeie the create video down");
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
      setErrors(newError);
    }
  };
  // Effect hook to update link data and reset state
  useEffect(() => {
    linkData(elementData);
    handleReset();
  }, [elementData]);
  // Function to reset uploaded files
  const handleReset = () => {
    setUploadedImage(null);
    setUploadedVideo(null);
    setDynamicVideo("none");
    setDynamicImage("none");
  };
  //  handle dropped files
  const onDrop = (acceptedFiles) => {
    setUploadedImage(acceptedFiles[0]);
    setOpenCrop(true);

    setPhotoURL(URL?.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".jpg,.jpeg,.png",
  });

  const handleDynamicVideo = (e) => {
    setShowUploadButton(false);
    const videoDynamicURL = e.target.value;

    setDynamicVideo(videoDynamicURL);
    setIsVideoUploaded(true);
    setVideoName("");
    setUploadedVideo(null);
    if (videoDynamicURL !== "none" && firstRowDataVideo[videoDynamicURL]) {
      setDynamicVideo(videoDynamicURL);
      const videoUrl = firstRowDataVideo[videoDynamicURL];
      setMatchData(videoUrl);

      const videoElement = document.createElement("video");
      videoElement.addEventListener("loadedmetadata", () => {
        const duration = videoElement.duration;
        setDuration(duration.toFixed(0));
      });
      videoElement.onerror = () => {
        console.error(
          "Failed to load video. Unsupported source or invalid URL."
        );
        setMatchData("");
      };
      videoElement.src = videoUrl;
      videoElement.load();

      if (videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.play().catch((error) => { });
      }
    } else {
      setMatchData("");
    }
  };
  useEffect(() => {
    if (
      firstRowDataVideo &&
      Object.keys(firstRowDataVideo).length > 0 &&
      dynamicVideo !== "none"
    ) {
      handleDynamicVideo({ target: { value: dynamicVideo } });
    }
  }, [firstRowDataVideo]);

  const handleVideoUpload = async (e) => {
    const uploadedVideoFile = e.target.files[0];

    // Check if the file size exceeds 100MB (100 * 1024 * 1024 = 104857600 bytes)
    if (uploadedVideoFile?.size > 104857600) {
      toast.error("File size should not exceed 100MB.");
      return; // Stop execution if the file is too large
    }

    setVideoName(uploadedVideoFile?.name);
    setDynamicVideo("none");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", uploadedVideoFile);
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
        toast.success("Video Uploaded Successfully.");
        const videoURL = res?.data?.data;
        setShowUploadButton(false);
        setUploadedVideo(videoURL);
        setIsVideoUploaded(true);

        const videoElement = document.createElement("video");
        videoElement.addEventListener("loadedmetadata", () => {
          const duration = videoElement.duration;
          setDuration(duration.toFixed(0));
        });
        videoElement.src = videoURL;
        videoElement.load();

        if (videoRef.current) {
          videoRef.current.src = videoURL;
          videoRef.current.play();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const file = dynamicImage;
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result;
    setImg64(base64String);
  };
  // Function to toggle fullscreen mode
  const toggleFullScreen = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }
  };
  // Function to open fullscreen mode
  const openFullScreen = () => {
    setIsFullScreen(true);
  };
  // Function to close fullscreen mode
  const closeFullScreen = () => {
    setIsFullScreen(false);
  };
  // Function to submit summary data
  const handleNext = () => {
    setIsSectionCompleted(true);
    submitSummary();
    handleScreen("none");
  };
  const goBackToElementSelection = () => {
    setIsSectionCompleted(true);
    handleScreen("none");
  };

  const submitSummary = async () => {
    if (linkObject?.length !== 0) {
      getSummary("summary");
    }
  };
  // Function to close crop dialog
  const handleCloseCrop = () => {
    setOpenCrop(false);
  };
  // Ref for file input
  const fileInputRef = useRef(null);
  // Function to handle editing image
  const handleEditImage = () => {
    setPhotoURL("");
    setImg64(null);
    setUploadedImage(null);
  };
  // Function to handle editing video
  const handleEditVideo = () => {
    setVideoName(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoName(file);
    setErrors({ video: "" }); // Clear any previous errors
  };

  const handleBlur = () => {
    if (!videoName || videoName.name !== "cropped.mp4") {
      setErrors({ video: "Video is required." });
    } else {
      setErrors({ video: "" });
    }
  };
  useEffect(() => {
    if (videoRef.current && matchData) {
      videoRef.current.src = matchData;
      videoRef.current.play().catch((error) => {
        console.error("Failed to play video:", error);
      });
    }
  }, [matchData]);
  return (
    <Box className={classes.secondmaingridBox}>
      {loading === true && <FullScreenLoader />}
      <Box style={{ marginTop: "12px", color: "#0358AC" }}>
        <Box mb={3} style={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon
            style={{ cursor: "pointer", marginRight: "8px", fontSize: "large" }}
            onClick={goBackToElementSelection}
          />
          {elementType === "UPLOADIMAGE" ? (
            <Typography>Upload Image | Element {typeIndex + 1}</Typography>
          ) : (
            <Typography>Upload Video Clip | Element {typeIndex + 1}</Typography>
          )}
        </Box>
        {elementType === "UPLOADIMAGE" ? (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} marginTop="12px">
                <Typography className="heading">Upload Image</Typography>

                <TextField
                  variant="outlined"
                  placeholder="Upload Image"
                  disabled
                  value={apiImage ? photoURL : ""}
                  onBlur={() => {
                    if (!photoURL) {
                      setErrors({ image: "Image is required." });
                    } else {
                      setErrors({ image: "" });
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {uploadedImage && !uploadedImage1 ? (
                          <Button
                            className="savebtn"
                            onClick={() => handleEditImage()}
                          >
                            Edit Image
                          </Button>
                        ) : (
                          <>
                            <Button
                              className="savebtn"
                              onClick={(e) => {
                                fileInputRef.current.click();
                                handleDynamicimage(e);
                                // setDynamicImage('none');
                              }}
                            >
                              Choose
                            </Button>
                            <input
                              type="file"
                              {...getInputProps({
                                accept: ".jpg,.jpeg,.png",
                              })}
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={handleDynamicImage}
                            />
                          </>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className="error">{errors.image}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} marginTop="12px">
                <Typography className="heading">Select Image URL</Typography>
                <Select
                  style={{ marginTop: "5px" }}
                  variant="outlined"
                  placeholder="Select Image Url"
                  className="selectitem"
                  id="choose-template"
                  fullWidth
                  MenuProps={menuProps}
                  value={type === "none" ? type : dynamicImage}
                  onChange={(e) => handleDynamicimage(e)}
                  IconComponent={ExpandMoreIcon}
                // error={!!errors.image}
                // helperText={errors.image}
                >
                  <MenuItem value="none">Select Image Url</MenuItem>
                  {/* <MenuItem value="--">Select None</MenuItem> */}
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    companyDetails
                      ?.filter((item) => item?.dataType == "Image URL")
                      ?.map((item) => (
                        <MenuItem
                          value={item?.value}
                          onClick={() => {
                            setType(item?.value);
                            sheetFirstRowData(item?.value);
                          }}
                        >
                          {item?.value}
                        </MenuItem>
                      ))}
                </Select>
                <Typography className="error">{errors.image}</Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} marginTop="12px">
                <Typography className="heading">Upload Video</Typography>

                <TextField
                  variant="outlined"
                  placeholder="Upload Video"
                  value={videoName}
                  onBlur={() => {
                    if (videoName?.name !== "cropped.mp4") {
                      setErrors({ image: "Video is required." });
                    } else {
                      setErrors({ video: "" });
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {videoName ? (
                          <Button
                            className="savebtn"
                            onClick={() => handleEditVideo()}
                          >
                            Edit
                          </Button>
                        ) : (
                          <>
                            <Button className="savebtn" component="label">
                              Choose
                              <input
                                type="file"
                                accept="video/*"
                                style={{ display: "none" }}
                                onChange={handleVideoUpload}
                              />
                            </Button>
                          </>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography className="error">{errors.video}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} marginTop="12px">
                <Typography className="heading">Select Video URL</Typography>
                <Select
                  style={{ marginTop: "5px" }}
                  variant="outlined"
                  placeholder="Select dynamic Upload Video"
                  className="selectitem"
                  id="choose-template"
                  fullWidth
                  MenuProps={menuProps}
                  value={dynamicVideo}
                  onChange={handleDynamicVideo}
                  IconComponent={ExpandMoreIcon}
                  error={!!errors.dynamicVideo}
                  helperText={errors.dynamicVideo}
                >
                  <MenuItem value="none" disabled>
                    Select Dynamic URL to fetch Video
                  </MenuItem>
                  {companyDetails !== undefined &&
                    companyDetails.length > 0 &&
                    companyDetails
                      ?.filter((item) => item?.dataType == "Video URL")
                      ?.map((item) => (
                        <MenuItem value={item?.value}>{item?.value}</MenuItem>
                      ))}
                </Select>
                <Typography className="error">{errors.dynamicVideo}</Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      <Box
        style={{ marginTop: "12px" }}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {elementType === "UPLOADIMAGE" ? (
          <>
            <div style={{ width: "100%", maxWidth: "350px" }}>
              <Typography>Duration (sec)</Typography>
              <TextField
                type="number"
                value={duration}
                onChange={(e) => {
                  const value = e.target.value;

                  // Convert the value to a number for validation
                  const numericValue = Number(value);

                  // Check if the value is non-negative, within 3600 seconds, and has a max length of 10
                  if (
                    value === "" ||
                    (numericValue >= 0 &&
                      numericValue <= 3600 &&
                      value.length <= 10)
                  ) {
                    setDuration(value);

                    if (value === "") {
                      setErrors({ duration: "Duration is required." });
                    } else if (numericValue < 0) {
                      setErrors({ duration: "Duration cannot be negative." });
                    } else {
                      setErrors({ duration: "" });
                    }
                  } else if (numericValue > 3600) {
                    setErrors({
                      duration: "Duration cannot exceed 3600 seconds.",
                    });
                  }
                }}
                className={classes.durationscroll}
                variant="outlined"
                placeholder="00"
                inputProps={{ maxLength: 10 }}
              />

              <Typography className="error">{errors.duration}</Typography>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "100px",
                display: "flex",
                justifyContent: "end",
                marginTop: "26px",
              }}
            >
              <Button
                fullWidth
                variant={duration ? "contained" : "outlined"}
                style={{ height: "44px" }}
                className={`${!duration ? "savebtnDisables" : "savebtn"}`}
                onClick={handleOpenDialog}
                disabled={!duration}
              >
                Audio
              </Button>
            </div>
          </>
        ) : (
          <Box className="d-flex">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheck}
                  name="checked"
                  color="primary"
                />
              }
              label="Use External Audio"
            />
            {checked === true && (
              <>
                <Button
                  variant="contained"
                  style={{ height: "44px" }}
                  onClick={handleOpenDialog}
                >
                  Audio
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>

      {elementType === "UPLOADIMAGE" ? (
        <>
          {(uploadedImage || firstRightImg) && (
            <Box className="secondmaingridBox" style={{ marginTop: "12px" }}>
              <Box className="middleBox" {...getRootProps()}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <>
                    {isFullScreen ? (
                      <div
                        onClick={closeFullScreen}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={photoURL}
                          alt="Uploaded"
                          style={{
                            width: "100%",
                            height: "100vh",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <Typography
                          style={{ color: "black", marginBottom: "10px" }}
                        >
                          Image Preview
                        </Typography>
                        <img
                          src={photoURL || dynamicImage || firstRightImg}
                          alt="Uploaded"
                          className={classes.secondimage}
                        // onClick={openFullScreen}
                        />
                      </>
                    )}
                  </>
                </div>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <>
          {!showUploadButton && (
            <Box className="secondmaingridBox" style={{ marginTop: "12px" }}>
              <Box className="middleBox">
                <video
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  style={{ maxHeight: "450px" }}
                  controls
                >
                  <source src={matchData || uploadedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </Box>
          )}
        </>
      )}

      <Box className={classes.secondmaingridbtn}>
        {elementType === "UPLOADIMAGE" ? (
          <>
            {" "}
            <Button
              variant="contained"
              onClick={() => handleSetData()}
              className={`${audioFile === null || isSaved ? "savebtnDisables" : "savebtn"
                }`}
              disabled={isSaved || !audioFile}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{ padding: "13px 24px" }}
              onClick={handleNext}
              className={`${!isSaved ? "savebtnDisables" : "savebtn"}`}
              disabled={!isSaved}
            >
              Next
            </Button>{" "}
          </>
        ) : (
          <>
            {" "}
            <Button
              variant={isSaved ? "outlined" : "contained"}
              onClick={() => handleSetData()}
              className={`${isVideoUploaded === false || isSaved
                ? "savebtnDisables"
                : "savebtn"
                }`}
              disabled={isVideoUploaded === false || isSaved}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{ padding: "13px 24px" }}
              onClick={handleNext}
              className={`${!isSaved ? "savebtnDisables" : "savebtn"}`}
              disabled={!isSaved}
            >
              Next
            </Button>{" "}
          </>
        )}
      </Box>
      {openCrop && (
        <Dialog
          open={openCrop}
          onClose={handleCloseCrop}
          maxWidth={"xl"}
          className={classes.DialogBox}
        >
          <DialogTitle>
            <Typography variant="h2">Crop Image</Typography>
          </DialogTitle>
          <CropEasy
            {...{
              photoURL,
              setType,
              setFirstRightImg,
              firstRightImg,
              setApiImage,
              type,
              openFullScreen,
              setOpenCrop,
              setPhotoURL,
              setUploadedImage,
              setUploadedImage1,
              setErrors,
              setDynamicImage,
              setImg64,
            }}
          />
        </Dialog>
      )}

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

export default ImageVideo;
