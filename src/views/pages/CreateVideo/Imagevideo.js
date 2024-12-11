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
  DialogContent,
  DialogActions,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Copy } from "react-feather";
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
  const [imageURL, setImageURL] = useState("");
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
  const [description, setDescription] = useState("");

  const [matchData, setMatchData] = useState("");

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
  const sheetFirstRowData = async (type) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "GET",
        url: `${ApiConfig.getTemplatebyID}/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Response", response);

      const sheetId = response?.data?.sheet?.googleSheetsId;
      console.log("Response", sheetId);

      const res = await axios({
        method: "GET",
        url: `${ApiConfig.getFirstRowData}/${sheetId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setUploadedImage(null);
        const firstRowData = res?.data;
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

  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [sheetData, setSheetData] = useState([]);

  const handleUrlChange = (event) => {
    setSelectedUrl(event.target.value);
    console.log(selectedUrl);
  };

  const handleVideoUrlChange = (event) => {
    setSelectedVideoUrl(event.target.value);
    console.log(selectedUrl);
  };

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
    const data = await fetchSheetData();
    setSheetData(data);
  };

  useEffect(() => {
    getSheetType();
    sheetFirstRowData(type);
  }, []);

  const handleImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      setApiImage(base64String);
    };
    reader.readAsDataURL(file);
    setType("none");
  };

  const [audioURL, setAudioURL] = useState("");
  const [audioFiles, setAudioFiles] = useState(null);
  const [videoURL, setVideoURL] = useState("");

  const handleVideoUploadNew = async (event) => {
    console.log("Hello");
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      // API call to upload video
      const response = await axios.post(ApiConfig.UploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { public_url } = response.data;
      setVideoURL(public_url);
      toast.success("Uploaded video successfully.");
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleAudioChange = (event) => {
    setAudioFiles(event.target.files[0]);
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

  const handleDynamicImage = async (e) => {
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
      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
    }
  };

  const handleDynamicimage = async (event) => {
    const imageUrl = event.target.value;

    setDynamicImage(imageUrl);

    // setImgName("");
    setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
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
    let audio_embedded = false;
    if (audioURL) {
      audio_embedded = true;
    }
    let url;
    let is_dynamic = false;
    if (selectedUrl) {
      url = selectedUrl;
      is_dynamic = true;
    } else {
      url = imageURL;
      is_dynamic = false;
    }
    apiData = {
      duration: duration,
      elementId: elementID,
      sequence: typeIndex + 1,
      hvo_template_id: templateId,
      section_name: "UPLOAD IMAGE",
      section_number: 3,
      status: "PROCESSING",
      scroll: false,
      audio_url: audioURL,
      audio_embedded,
      value: url,
      is_dynamic,
      audio_description: description,
    };
  } else if (elementType === "VIDEOCLIPS") {
    let audio_embedded = false;
    if (audioURL) {
      audio_embedded = true;
    }
    let url;
    let is_dynamic = false;
    if (selectedVideoUrl) {
      url = selectedVideoUrl;
      is_dynamic = true;
    } else {
      url = videoURL;
      is_dynamic = false;
    }
    console.log(url, "url");
    apiData = {
      // firstRowValue: matchData,
      scroll: false,
      elementId: elementID,
      sequence: typeIndex + 1,
      section_name: "VIDEO CLIPS",
      section_number: 4,
      hvo_template_id: templateId,
      status: "PROCESSING",
      audio_url: audioURL,
      audio_embedded,
      value: url,
      is_dynamic,
      audio_description: description,
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
      // if (img64 === null || dynamicImage === "none")
      //   newError.image = "Static or Dynamic Image URL is required.";
      // if (img64 === null || dynamicImage === "none")
      //   newError.dynamicImage = "Dynamic or Static Image URL is required.";

      // if (duration === "") {
      //   newError.duration = "Duration is required.";
      // }

      // if (audioFile === null) {
      //   toast.error("Please upload audio file.");
      // }
      if (
        duration !== "" &&
        // audioFile !== null &&
        (img64 !== null || dynamicImage !== "none ")
      ) {
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
            setDescription("");
            handleNext();
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

      // if (checked === true && audioFile === null) {
      //   toast.error("Please upload audio file.");
      // }
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
          setIsSaved(true);
          reloadData();
          setIsVideoUploaded(false);
          toast.success("Section saved successfully");
          setElementData({
            index: typeIndex,
            type: elementType,
            fileName: videoName || uploadedImage?.name,
            file: uploadedVideo || URL?.createObjectURL(uploadedImage),
            duration: duration,
          });
          setLoading(false);
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

  // const handleDynamicVideo = (e) => {
  //   setShowUploadButton(false);
  //   const videoDynamicURL = e.target.value;

  //   setDynamicVideo(videoDynamicURL);
  //   setIsVideoUploaded(true);
  //   setVideoName("");
  //   setUploadedVideo(null);
  //   if (videoDynamicURL !== "none" && firstRowDataVideo[videoDynamicURL]) {
  //     setDynamicVideo(videoDynamicURL);
  //     const videoUrl = firstRowDataVideo[videoDynamicURL];
  //     setMatchData(videoUrl);

  //     const videoElement = document.createElement("video");
  //     videoElement.addEventListener("loadedmetadata", () => {
  //       const duration = videoElement.duration;
  //       setDuration(duration.toFixed(0));
  //     });
  //     videoElement.onerror = () => {
  //       console.error(
  //         "Failed to load video. Unsupported source or invalid URL."
  //       );
  //       setMatchData("");
  //     };
  //     videoElement.src = videoUrl;
  //     videoElement.load();

  //     if (videoRef.current) {
  //       videoRef.current.src = videoUrl;
  //       videoRef.current.play().catch((error) => {});
  //     }
  //   } else {
  //     setMatchData("");
  //   }
  // };
  // useEffect(() => {
  //   if (
  //     firstRowDataVideo &&
  //     Object.keys(firstRowDataVideo).length > 0 &&
  //     dynamicVideo !== "none"
  //   ) {
  //     handleDynamicVideo({ target: { value: dynamicVideo } });
  //   }
  // }, [firstRowDataVideo]);

  // const handleVideoUpload = async (e) => {
  //   const uploadedVideoFile = e.target.files[0];

  //   // Check if the file size exceeds 100MB (100 * 1024 * 1024 = 104857600 bytes)
  //   if (uploadedVideoFile?.size > 104857600) {
  //     toast.error("File size should not exceed 100MB.");
  //     return; // Stop execution if the file is too large
  //   }

  //   setVideoName(uploadedVideoFile?.name);
  //   setDynamicVideo("none");

  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("image", uploadedVideoFile);
  //     console.log(formData, "dfgfg");

  //     const res = await axios({
  //       method: "POST",
  //       url: ApiConfig.uploadFile,
  //       headers: {
  //         token: localStorage.getItem("token"),
  //       },
  //       data: formData,
  //     });

  //     if (res?.status == 200) {
  //       toast.success("Video Uploaded Successfully.");
  //       console.log("Hello")
  //       console.log(res?.data)
  //       const videoURL = res?.data?.public_url;
  //       setVideoURL(videoURL)
  //       console.log(videoURL, "dfgfg");
  //       setShowUploadButton(false);
  //       setUploadedVideo(videoURL);
  //       setIsVideoUploaded(true);

  //       const videoElement = document.createElement("video");
  //       videoElement.addEventListener("loadedmetadata", () => {
  //         const duration = videoElement.duration;
  //         setDuration(duration.toFixed(0));
  //       });
  //       videoElement.src = videoURL;
  //       videoElement.load();

  //       if (videoRef.current) {
  //         videoRef.current.src = videoURL;
  //         videoRef.current.play();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  const [open, setOpen] = useState(false);

  const handleOpenAudioDescriptionEditor = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
                            {/* Button to trigger file input */}
                            <Button
                              className="savebtn"
                              onClick={() => fileInputRef.current.click()} // Open the file dialog on button click
                            >
                              Choose
                            </Button>

                            {/* Hidden file input for image selection */}
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png" // Only allow image files
                              ref={fileInputRef}
                              style={{ display: "none" }} // Hide the input element
                              onChange={handleDynamicImage} // Trigger the upload when a file is selected
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
                  IconComponent={ExpandMoreIcon}
                  // error={!!errors.image}
                  // helperText={errors.image}
                  value={selectedUrl}
                  onChange={handleUrlChange}
                  onOpen={handleMenuOpen}
                >
                  <MenuItem disabled value="none">
                    Select Image Url
                  </MenuItem>
                  {/* <MenuItem value="--">Select None</MenuItem> */}
                  {sheetData
                    ?.filter((entry) => entry?.dataType === "Image URL")
                    ?.map((entry) => (
                      <MenuItem key={entry?.value} value={entry?.value}>
                        {entry?.value}
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
                              Choose Video
                              <input
                                type="file"
                                accept="video/*"
                                style={{ display: "none" }}
                                onChange={handleVideoUploadNew}
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
                  error={!!errors.dynamicVideo}
                  helperText={errors.dynamicVideo}
                  onChange={handleVideoUrlChange}
                  IconComponent={ExpandMoreIcon}
                  onOpen={handleMenuOpen}
                  value={selectedVideoUrl}
                >
                  <MenuItem value="none" disabled>
                    Select Dynamic URL to fetch Video
                  </MenuItem>
                  {sheetData
                    ?.filter((entry) => entry?.dataType === "Video URL")
                    ?.map((entry) => (
                      <MenuItem key={entry?.value} value={entry?.value}>
                        {entry?.value}
                      </MenuItem>
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
                  onClose={handleClose}
                  fullWidth
                  maxWidth="md"
                >
                  <DialogTitle>Add Audio Description</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
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
                                .filter(
                                  (item) =>
                                    item?.dataType === "Text" ||
                                    item?.dataType === "First name (Required)" ||
                                    item?.dataType === "Last name" ||
                                    item?.dataType === "Customer organization"
                                )
                                .map((sheetfield, ind) => (
                                  <Tooltip
                                    title={sheetfield?.value || "Copy Text"}
                                    arrow
                                    key={ind}
                                  >
                                    <TextField
                                      fullWidth
                                      value={
                                        sheetfield?.value.length > 20
                                          ? `${sheetfield.value.substring(
                                              0,
                                              20
                                            )}...`
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
                                              <Copy
                                                style={{ color: "#858585" }}
                                              />
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        maxLength: 60,
                                        minLength: 2,
                                      }}
                                    />
                                  </Tooltip>
                                ))}
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleSaveDescription} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
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
                  onClose={handleClose}
                  fullWidth
                  maxWidth="md"
                >
                  <DialogTitle>Add Audio Description</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
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
                                .filter(
                                  (item) =>
                                    item?.dataType === "Text" ||
                                    item?.dataType === "First name (Required)" ||
                                    item?.dataType === "Last name" ||
                                    item?.dataType === "Customer organization"
                                )
                                .map((sheetfield, ind) => (
                                  <Tooltip
                                    title={sheetfield?.value || "Copy Text"}
                                    arrow
                                    key={ind}
                                  >
                                    <TextField
                                      fullWidth
                                      value={
                                        sheetfield?.value.length > 20
                                          ? `${sheetfield.value.substring(
                                              0,
                                              20
                                            )}...`
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
                                              <Copy
                                                style={{ color: "#858585" }}
                                              />
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        maxLength: 60,
                                        minLength: 2,
                                      }}
                                    />
                                  </Tooltip>
                                ))}
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleSaveDescription} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
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
              className={`${
                // audioFile === null ||
                duration === "" || isSaved ? "savebtnDisables" : "savebtn"
              }`}
              disabled={
                duration === "" || isSaved

                // || !audioFile
              }
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
              className={`${
                isVideoUploaded === false || isSaved
                  ? "savebtnDisables"
                  : "savebtn"
              }`}
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
