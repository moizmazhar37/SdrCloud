import { Cancel } from "@material-ui/icons";
import CropIcon from "@material-ui/icons/Crop";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@material-ui/core";
//Custom Stlye of CropEasy Page
const useStyles = makeStyles((theme) => ({
  DialogContentBox: {
    background: "#333",
    position: "relative",
    height: 400,
    width: "auto",
    minWidth: { sm: 500 },
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
  cropContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
}));
// Main component to handle the cropping functionality
const CropEasy = ({
  photoURL,
  type,
  setOpenCrop,
  setPhotoURL,
  setUploadedImage,
  setType,
  setFirstRightImg,
  firstRightImg,
  setApiImage,
  setErrors,
  setDynamicImage,
  setImg64,
}) => {
  console.log("typetype", type);
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // Callback function to handle the completion of cropping
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  // Function to handle the cropping action and update the image state
  const cropImage = async () => {
    try {
      const { file } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      const base64 = await blobToBase64(file);
      setPhotoURL(base64); // Update with base64 image
      setUploadedImage(base64); // Assuming you want to set the uploaded image as well
      setOpenCrop(false);
      setErrors({ image: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  // Function to handle the cropping action and update the image state
  const cropImage2 = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setFirstRightImg(file);
      setApiImage("");
      setOpenCrop(false);
      setErrors({ image: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DialogContent dividers className={classes.DialogContentBox}>
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={16 / 9}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
          cropShape="rect"
          showGrid={true}
          restrictPosition={false}
          cropperClassName={classes.cropContainer}
        />



      </DialogContent>
      <DialogActions className={classes.DialogActionsBox}>
        <Box className={classes.OuterBox}>
          <Box>
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
          </Box>
          <Box>
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
        </Box>
        <Box className={classes.cropbtnBox}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => {
              console.log("we are inside this on CLick evenet");
              setType("none");
              setOpenCrop(false);
              setPhotoURL("");
              setUploadedImage("");
              setFirstRightImg("");
              setDynamicImage("");
              setImg64(null);
            }}
          >
            Cancel
          </Button>
          {type === "none" ? (
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage}
            >
              Crop
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage2}
            >
              Crop
            </Button>
          )}
        </Box>
      </DialogActions>
    </>
  );
};

export default CropEasy;
// Utility function to convert zoom value to percentage
const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
