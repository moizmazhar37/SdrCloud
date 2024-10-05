import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
    },
    "& .MuiButton-contained": {
      color: "#fff",
      background: "#0358AC",
      fontSize: "16px",
    },
  },
  durationscroll: {
    "& .MuiInputBase-input": {
      textAlign: "center",
    },
  },
}));
function ViewElement({ linkObject, getSummary, setIsSectionCompleted }) {
  console.log(linkObject?.url, "linkObject");

  const classes = useStyles();
  return (
    <Box className={classes.secondmaingridBox}>
      <Box mb={3} mt={2} style={{ display: "flex", alignItems: "center" }}>
        <ArrowBackIcon
          style={{ cursor: "pointer", marginRight: "8px", fontSize: "large" }}
          onClick={() => {
            getSummary("summary");
            setIsSectionCompleted(true);
          }}
        />
        <Box style={{ color: "#0358AC" }}>
          {linkObject?.elementId?.element_Name === "STATICURL" ? (
            <Typography>Static URL | Element {linkObject?.sequence}</Typography>
          ) : linkObject?.elementId?.element_Name === "DYNAMICURL" ? (
            <Typography>
              Dynamic URL | Element {linkObject?.sequence}
            </Typography>
          ) : linkObject?.elementId?.element_Name === "UPLOADIMAGE" ? (
            <Typography>
              Upload Image | Element {linkObject?.sequence}
            </Typography>
          ) : linkObject?.elementId?.element_Name === "VIDEOCLIPS" ? (
            <Typography>
              Video Clips | Element {linkObject?.sequence}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      {linkObject?.elementId?.element_Name === "STATICURL" ? (
        <>
          <TextField fullWidth value={linkObject?.url} variant="outlined" />
          <Box
            style={{
              display: "flex",
              marginTop: "12px",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div
              style={{ width: "100%", maxWidth: "350px", borderRadius: "6px" }}
            >
              <Typography>Duration (sec)</Typography>
              <TextField
                className={classes.durationscroll}
                value={linkObject?.duration}
                type="number"
                fullWidth
                variant="outlined"
                placeholder="07"
              />
            </div>
            <div
              style={{ width: "100%", maxWidth: "350px", borderRadius: "6px" }}
            >
              <Typography>Scroll</Typography>
              <TextField
                className={classes.durationscroll}
                value={linkObject?.scrollEnabled === true ? "Yes" : "No"}
                fullWidth
                variant="outlined"
                placeholder="Scroll"
              />
            </div>
            <div
              style={{ width: "100%", maxWidth: "150px", borderRadius: "6px" }}
            >
              <Typography>Audio</Typography>
              <TextField
                className={classes.durationscroll}
                value={
                  linkObject?.audioTemplateReferral?.embedded === false
                    ? "Yes"
                    : "No"
                }
                fullWidth
                variant="outlined"
                placeholder="Scroll"
              />
            </div>
          </Box>
          <Box mt={2}>
            <iframe
              src={linkObject?.firstRowValue}
              alt=""
              height="400px"
              width="100%"
              style={{ borderRadius: "16px", border: "1px solid" }}
            ></iframe>
          </Box>
        </>
      ) : linkObject?.elementId?.element_Name === "DYNAMICURL" ? (
        <>
          <TextField
            fullWidth
            value={linkObject?.tagValueName}
            variant="outlined"
          />
          <Box
            style={{
              display: "flex",
              marginTop: "12px",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div
              style={{ width: "100%", maxWidth: "350px", borderRadius: "6px" }}
            >
              <Typography>Duration (sec)</Typography>
              <TextField
                disabled
                className={classes.durationscroll}
                value={linkObject?.duration}
                type="number"
                fullWidth
                variant="outlined"
                placeholder="07"
              />
            </div>
            <div
              style={{ width: "100%", maxWidth: "350px", borderRadius: "6px" }}
            >
              <Typography>Scroll</Typography>
              <TextField
                disabled
                className={classes.durationscroll}
                value={linkObject?.scrollEnabled === true ? "Yes" : "No"}
                fullWidth
                variant="outlined"
                placeholder="Scroll"
              />
            </div>

            <div
              style={{ width: "100%", maxWidth: "150px", borderRadius: "6px" }}
            >
              <Typography>Audio</Typography>
              <TextField
                disabled
                className={classes.durationscroll}
                value={
                  linkObject?.audioTemplateReferral?.embedded === false
                    ? "Yes"
                    : "No"
                }
                fullWidth
                variant="outlined"
                placeholder="Scroll"
              />
            </div>
          </Box>
          <Box mt={2}>
            <iframe
              src={linkObject?.firstRowValue}
              alt=""
              height="400px"
              width="100%"
              style={{ borderRadius: "16px", border: "1px solid" }}
            ></iframe>
          </Box>
        </>
      ) : linkObject?.elementId?.element_Name === "UPLOADIMAGE" ? (
        <>
          <TextField
            fullWidth
            value={linkObject?.url}
            variant="outlined"
            disabled
          />
          <Box
            style={{
              display: "flex",
              marginTop: "12px",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div
              style={{ width: "100%", maxWidth: "350px", borderRadius: "6px" }}
            >
              <Typography>Duration (sec)</Typography>
              <TextField
                disabled
                className={classes.durationscroll}
                value={linkObject?.duration}
                type="number"
                fullWidth
                variant="outlined"
                placeholder="07"
              />
            </div>
            <div
              style={{ width: "100%", maxWidth: "350px", borderRadius: "6px" }}
            >
              <Typography>Scroll</Typography>
              <TextField
                disabled
                className={classes.durationscroll}
                value={linkObject?.scrollEnabled === true ? "Yes" : "No"}
                fullWidth
                variant="outlined"
                placeholder="Scroll"
              />
            </div>

            <div
              style={{ width: "100%", maxWidth: "150px", borderRadius: "6px" }}
            >
              <Typography>Audio</Typography>
              <TextField
                disabled
                className={classes.durationscroll}
                value={
                  linkObject?.audioTemplateReferral?.embedded === false
                    ? "Yes"
                    : "No"
                }
                fullWidth
                variant="outlined"
                placeholder="Scroll"
              />
            </div>
          </Box>
          <Box mt={2}>
            <img
              src={linkObject?.firstRowValue || linkObject?.url}
              alt="Uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </>
      ) : linkObject?.elementId?.element_Name === "VIDEOCLIPS" ? (
        <>
          <TextField
            fullWidth
            value={linkObject?.elementId?.element_Name}
            variant="outlined"
            disabled
          />
          <Box
            style={{
              display: "flex",
              marginTop: "12px",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div
              style={{ width: "100%", maxWidth: "150px", borderRadius: "6px" }}
            >
              <Typography>Audio</Typography>
              <TextField
                disabled
                className={classes.durationscroll}
                value={
                  linkObject?.audioTemplateReferral?.embedded === false
                    ? "Yes"
                    : "No"
                }
                fullWidth
                variant="outlined"
                placeholder="Scroll"
              />
            </div>
          </Box>
          <Box mt={2}>
            <video
              width="100%"
              height="100%"
              controls
              style={{ maxHeight: "350px" }}
            >
              <source
                src={linkObject?.firstRowValue || linkObject?.url}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ViewElement;
