import { Cancel } from "@material-ui/icons";
import CropIcon from "@material-ui/icons/Crop";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, useRef } from "react";
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


// Utility function to convert Blob to base64
const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
const CropEasyCompanyLogo = ({
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
            const { file } = await getCroppedImg(photoURL, croppedAreaPixels, rotation);
            const base64 = await blobToBase64(file);
            setPhotoURL(base64);
            setUploadedImage(base64);
            setOpenCrop(false);
            setErrors({ image: "" });
        } catch (error) {
            console.log(error);
        }
    };

    // Resize crop area (for free cropping mode)
    const handleResize = (e) => {
        const newWidth = Math.max(100, e.clientX - containerRef.current.getBoundingClientRect().left);
        const newHeight = aspect ? newWidth / aspect : Math.max(100, e.clientY - containerRef.current.getBoundingClientRect().top); // Maintain aspect ratio if defined
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
                {/* Aspect ratio selector */}
                {/* <Box className={classes.OuterBox}>
                    <Typography>Select Aspect Ratio</Typography>
                    <Box>
                        {predefinedAspects.map((option) => (
                            <Button
                                key={option.value}
                                variant={aspect === option.value ? "contained" : "outlined"}
                                onClick={() => setAspect(option.value)}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </Box>
                </Box> */}

                {/* Controls for Zoom and Rotation */}
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

export default CropEasyCompanyLogo;


// Utility function to convert zoom value to percentage
const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};
