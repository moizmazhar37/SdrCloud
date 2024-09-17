import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Box, Drawer, Button } from "@material-ui/core";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  rightDrawer: {
    "& .MuiDrawer-paper": {
      padding: "15px",
      width: "35%",
      overflowY: "auto",

      "@media(max-width:800px)": {
        width: "50%",
      },
    },
  },

  saveDeailsBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "1rem 0px",
  },
  saveDetailsBtn: {
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#181C32",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Inter",

    "@media(max-width:500px)": {
      fontSize: "12px",
      padding: "6px",
    },
  },

  contentContainer: {
    padding:'5px',
  },
  audioHeading: {
    color: "#181C32",
    fontFamily: "Inter",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "25px",
    marginBottom:'1rem',
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTextlg: {
    color: "#0F0037",
    leadingTrim: "both",
    textEdge: "cap",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "18.811px",
    letterSpacing: "0.009px",
  },

  subTextsm: {
    color: "#4600FF",
    leadingTrim: "both",
    textEdge: "cap",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "18.811px",
    letterSpacing: "0.009px",
  },
  largeTextfield: {
    marginBottom:'20px',
    "& .MuiInputBase-input": {
      height: "8em",
    },

    "& .MuiOutlinedInput-root":{
        borderRadius:'6px',
    },

    "& .MuiOutlinedInput-notchedOutline":{
        border:'none',
    },
  },
}));

// Component for adding description drawer
const AddDescriptionDrawer = ({ descDrawerOpen, descDrawerClose }) => {
  const classes = useStyles();
  return (
    <>
      <Drawer
        anchor="right"
        open={descDrawerOpen}
        onClose={descDrawerClose}
        className={classes.rightDrawer}
      >
        <Box className={classes.contentContainer}>
          <Typography className={classes.audioHeading}>
            Audio Description
          </Typography>
          <Box className={classes.textContainer}>
            <Typography className={classes.subTextlg}>
              Add audio description
            </Typography>
            <Typography className={classes.subTextsm}>[Page 1]</Typography>
          </Box>
          <TextField className={classes.largeTextfield} variant="outlined" />

          <Box className={classes.textContainer}>
            <Typography className={classes.subTextlg}>
              Add audio description
            </Typography>
            <Typography className={classes.subTextsm}>[Page 2]</Typography>
          </Box>
          <TextField className={classes.largeTextfield} variant="outlined" />
          <Box className={classes.textContainer}>
            <Typography className={classes.subTextlg}>
              Add audio description
            </Typography>
            <Typography className={classes.subTextsm}>[Page 3]</Typography>
          </Box>
          <TextField className={classes.largeTextfield} variant="outlined" />
          <Box className={classes.textContainer}>
            <Typography className={classes.subTextlg}>
              Add audio description
            </Typography>
            <Typography className={classes.subTextsm}>[Page 4]</Typography>
          </Box>
          <TextField className={classes.largeTextfield} variant="outlined" />
          <Box className={classes.textContainer}>
            <Typography className={classes.subTextlg}>
              Add audio description
            </Typography>
            <Typography className={classes.subTextsm}>[Page 5]</Typography>
          </Box>
          <TextField className={classes.largeTextfield} variant="outlined" />
          <Box className={classes.saveDeailsBtnContainer}>
                <Button variant="contained" className={classes.saveDetailsBtn}>
                  Save Details
                </Button>
              </Box>
        </Box>

       
      </Drawer>
    </>
  );
};

export default AddDescriptionDrawer;
