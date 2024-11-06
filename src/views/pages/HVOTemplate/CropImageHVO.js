import { Cancel } from "@material-ui/icons";
import CropIcon from "@material-ui/icons/Crop";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../CreateVideo/Crop/utils/cropImage";
import axios from "axios";
import Loader from "react-js-loader";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/config/APIConfig";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@material-ui/core";

// Custom Styles
const useStyles = makeStyles((theme) => ({
  DialogContentBox: {
    background: "#333",
    position: "relative",
    height: 400,
    width: "auto",
    minWidth: { sm: 500 },
    overflow: "hidden", // Prevent overflow
  },
  DialogActionsBox: {
    flexDirection: "column",
    margin: "24px 16px",
  },
  OuterBox: {
    width: "100%",
    marginBottom: "8px",
    "& .MuiSlider-root": {
      color: "#0358AC",
    },
  },
  cropbtnBox: {
    display: "flex",
    gap: 30,
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    "& .MuiButton-root": {
      color: "black",
    },
  },
  cropperContainer: {
    display: "flex",
    justifyContent: "center", // Horizontally center the image
    alignItems: "center", // Vertically center the image
    position: "relative",
    height: "100%",
    border: "2px dashed #0358AC", // Visible crop area border
    borderRadius: "8px",
    overflow: "hidden",
  },
  resizeHandle: {
    position: "absolute",
    width: "10px",
    height: "10px",
    background: "#0358AC",
    cursor: "nwse-resize", // Diagonal resize cursor
  },
}));

const CropImageHVO = ({
  photoURL,
  setOpenCrop,
  setPhotoURL,
  setUploadedImage,
  setErrors,
}) => {
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(null); // Default to "free" cropping mode (aspect = null)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cropSize, setCropSize] = useState({ width: 200, height: 200 }); // Default crop size
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedAspects = [
    { label: "Free", value: null },
    { label: "1:1", value: 1 / 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 },
    { label: "8:1", value: 8 / 1 }, // For your logo
  ];

  // Load image to get dimensions
  useEffect(() => {
    const img = new Image();
    img.src = photoURL;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [photoURL]);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      // Get the cropped image file (Blob format)
      const { file } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );

      // Directly handle the file (cropped image)
      await handleFileInputChange(file);

      // Close the crop dialog and clear errors
      setOpenCrop(false);
      setErrors({ image: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileInputChange = async (file) => {
    setIsLoading(true);
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

      if (res?.status === 200) {
        console.log(res?.data?.data, "Image uploaded successfully");
        setUploadedImage(res?.data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  // Resize crop area (for free cropping mode)
  const handleResize = (e) => {
    const newWidth = Math.max(
      100,
      e.clientX - containerRef.current.getBoundingClientRect().left
    );
    const newHeight = aspect
      ? newWidth / aspect
      : Math.max(
          100,
          e.clientY - containerRef.current.getBoundingClientRect().top
        ); // Maintain aspect ratio if defined
    setCropSize({ width: newWidth, height: newHeight });
  };

  const startResizing = (e) => {
    e.preventDefault();
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResizing);
  };

  const stopResizing = () => {
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResizing);
  };

  return (
    <>
      <DialogContent dividers className={classes.DialogContentBox}>
        {imageLoaded && (
          <Box className={classes.cropperContainer} ref={containerRef}>
            <Cropper
              image={photoURL}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect} // Dynamic aspect ratio
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={cropComplete}
              cropSize={cropSize}
            />
            <Box
              className={classes.resizeHandle}
              style={{
                bottom: 0,
                right: 0,
                cursor: "nwse-resize",
              }}
              onMouseDown={startResizing}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions className={classes.DialogActionsBox}>
        <Box className={classes.OuterBox}>
          <Typography>Zoom: {zoomPercent(zoom)}</Typography>
          <Slider
            color="primary"
            valueLabelDisplay="auto"
            valueLabelFormat={zoomPercent}
            min={0.1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e, zoom) => setZoom(zoom)}
          />
          <Typography>Rotation: {rotation + "°"}</Typography>
          <Slider
            valueLabelDisplay="auto"
            min={0}
            color="primary"
            max={360}
            value={rotation}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </Box>

        <Box className={classes.cropbtnBox}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => {
              setOpenCrop(false);
              setUploadedImage("");
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default CropImageHVO;

// Utility function to convert zoom value to percentage
const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
