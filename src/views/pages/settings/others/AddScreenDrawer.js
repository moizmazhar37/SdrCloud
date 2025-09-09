import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Box,
  Drawer,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

// Styles for the component
const useStyles = makeStyles((theme) => ({
  rightDrawer: {
    "& .MuiDrawer-paper": {
      padding: "15px 35px",
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
    padding: "5px",
  },
  audioHeading: {
    color: "#181C32",
    fontFamily: "Inter",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "25px",
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
    marginBottom: "20px",
    "& .MuiInputBase-input": {
      height: "8em",
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  radioAndText: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "10px 0",
    gap: "5px",

    "& label": {
      margin: "0",
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
  },

  formControl: {
    "& .MuiSelect-select.MuiSelect-select": {
      padding: "14px 13px",
      background: "#F1F1F2",
      borderRadius: "6px",
      color: "rgba(57, 57, 57, 0.30) !important",
      fontFamily: "Inter !important",
      fontSize: "18px !important",
      fontWeight: "500 !important",
    },
    "& .MuiSelect-icon": {
      right: "6px",
    },
  },

  standardTxt: {
    "& .MuiInputBase-input": {
      padding: "14px",
      background: "#F1F1F2",
      borderRadius: "6px",
    },
  },

  inputUploader: {
    cursor: "pointer",
    display: "inline-block",
    width: "100%",
    padding: "200px 0 0 0",
    height: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
    background: "url('/images/orgLogo.svg') center center no-repeat #F1F1F2",
    borderRadius: "3px",
  },
  addScreenTxt: {
    color: "#181C32",
    fontFamily: "Inter",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "25px",
  },

  radio: {
    appearance: "none",
    margin: "0",
    width: "25px",
    height: "25px",
    borderRadius: '50%',
    border: "none",
    background: '#D9D9D9',
    cursor: 'pointer',

    "&:checked": {
      border: "4px solid #D9D9D9 ",
      background: '#181C32',
    },
  },
}));
// Component for adding description drawer
const AddDescriptionDrawer = ({ addUserDrawerOpen, addUserDrawerClose }) => {
  const classes = useStyles();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Function to handle background image selection
  const handleBackgroundImage = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedPhoto(base64Image);
    };
    reader.readAsDataURL(file);
  };
  // Function to handle background image selection
  const handleSave = async () => {
    const token = localStorage.getItem("token");
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={addUserDrawerOpen}
        onClose={addUserDrawerClose}
        className={classes.rightDrawer}
      >
        <Typography className={classes.addScreenTxt}>Add Screen </Typography>
        <Box className={classes.radioAndText}>
          <input type="radio" className={classes.radio} name='addOption' />
          <label>Add existing webpage URL</label>
        </Box>
        <FormControl varinat="outlined" className={classes.formControl}>
          <Select className={classes.select} defaultValue="value">
            <MenuItem value="value" className={classes.menuItem}>
              Existing Web URL
            </MenuItem>
          </Select>
        </FormControl>

        <Box className={classes.radioAndText}>
          <input type="radio" className={classes.radio} name='addOption' />
          <label>Add Website URL</label>
        </Box>
        <TextField varint="outlined" className={classes.standardTxt} />

        <Box className={classes.radioAndText}>
          <input type="radio" className={classes.radio} name='addOption' />
          <label>Add Background Image</label>

        </Box>
        {selectedPhoto && (
          <img
            src={selectedPhoto}
            alt=""

          />
        )}
        {selectedPhoto && (
          <IconButton
            className={classes.deleteIcon}
            onClick={() => setSelectedPhoto(null)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {!selectedPhoto && (
          < input type="file"
            accept="image/jpeg, image/png,image/jpg"
            className={classes.inputUploader}
            onChange={handleBackgroundImage}
          />
        )}

        <Box className={classes.radioAndText}>
          <input type="radio" className={classes.radio} name='addOption' />
          <label>Add Blank page</label>
        </Box>

        <Box className={classes.saveDeailsBtnContainer}>
          <Button variant="contained" className={classes.saveDetailsBtn}
            onClick={handleSave} >
            {" "}
            Save Details{" "}
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default AddDescriptionDrawer;
