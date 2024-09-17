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
}));
// Main component to handle the cropping functionality
const CropEasy = ({
  photoURL,
  type,
  setOpenCrop,
  setPhotoURL,
  setUploadedImage,
  setFirstRightImg,
  firstRightImg,
  setApiImage,
  setErrors,
}) => {
  console.log("in the copbox ", type);
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
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setUploadedImage(file);
      setOpenCrop(false);
      setErrors({ image: "" });
    } catch (error) {
      console.log(error);
    }
  };
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
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
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
              min={1}
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
              setOpenCrop(false);
              setPhotoURL("");
              setUploadedImage("");
            }}
          >
            Cancel
          </Button>
          {type ? (
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage2}
            >
              Crop
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage}
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
