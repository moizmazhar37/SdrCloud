import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

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
// Function to render and manage the view elements based on the provided linkObject and getSummary function
function ViewElement({ linkObject, getSummary }) {
  const classes = useStyles();
  console.log(linkObject, "vide Object");
  return (
    <Box className={classes.secondmaingridBox}>
      <Box style={{ marginTop: "12px", color: "#0358AC" }}>
        {linkObject?.elementId?.element_Name === "STATICURL" ? (
          <Typography>Static URL | Element {linkObject?.sequence}</Typography>
        ) : linkObject?.elementId?.element_Name === "DYNAMICURL" ? (
          <Typography>Dynamic URL | Element {linkObject?.sequence}</Typography>
        ) : linkObject?.elementId?.element_Name === "UPLOADIMAGE" ? (
          <Typography>Upload Image | Element {linkObject?.sequence}</Typography>
        ) : linkObject?.elementId?.element_Name === "VIDEOCLIPS" ? (
          <Typography>Upload Video | Element {linkObject?.sequence}</Typography>
        ) : (
          <></>
        )}
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
        </>
      ) : linkObject?.elementId?.element_Name === "UPLOADIMAGE" ? (
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
            <video width="100%" height="100%" controls>
              <source src={linkObject?.firstRowValue} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
