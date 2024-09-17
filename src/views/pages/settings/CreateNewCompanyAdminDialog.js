import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

// Styles for the component
const useStyles = makeStyles(() => ({
  dialogMain: {
    position: 'relative',
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      maxWidth: "637px",
      borderRadius: "12px",
      position: 'relative',
      zIndex: '1600'

    },
    "& .dialogtitle": {
      "& h4": {
        marginTop: "16px",
        position: 'relative',
        color: "#152F40",
      },
    },

    "& .subText": {
      color: '#0358AC',
    },
    "& .typoMain": {
      color: "#152F40"
    },

    "& .commonMargin": {
      marginTop: "16px",
    },

    "& .dialogActions": {
      padding: "8px 24px",
      justifyContent: "space-between",
      marginBottom: "14px",

      "& .cancelBtn": {
        background: "#F4F4F4",
        color: "#152F40",
        flexBasis: "48%",
        height: "48px",
        borderRadius: "8px",
      },

      "& .saveBtn": {
        background: "#0358AC",
        color: "#fff",
        flexBasis: "48%",
        height: "48px",
        borderRadius: "8px",
      },
    },
  },

}));
// Function component for CreateNewCompanyAdminDialog
const CreateNewCompanyAdminDialog = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <>
      <Dialog open={open} onClose={onClose} className={classes.dialogMain}>
        <DialogTitle className="dialogtitle">
          <Typography style={{ color: "#152F40" }} color="textLink" variant="body1">
            {" "}
            Company Admin / <Link color="inherit" to="/settings"></Link><span className="subText" >Create
              New Company Admin</span>
          </Typography>

          <Typography className="typoMain" variant="h4">Create New Company Admin</Typography>
        </DialogTitle>
        <DialogContent className="typoMain">
          <Box className="">
            <Typography> First Name</Typography>
            <TextField
              name="oldPassword"
              variant="outlined"
              placeholder="Enter Company Admin First Name"
              fullWidth
            />
          </Box>

          <Box className="commonMargin">
            <Typography>Company Admin Last Name</Typography>
            <TextField
              name="oldPassword"
              variant="outlined"
              placeholder="Enter Company Admin Last Name"
              fullWidth
            />
          </Box>

          <Box className="commonMargin">
            <Typography>Company Admin Email</Typography>
            <TextField
              name="oldPassword"
              variant="outlined"
              placeholder="Enter Company Admin Email"
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions className="dialogActions">
          <Button
            variant="contained"
            onClick={() => onClose()}
            className="cancelBtn"
          >
            Back
          </Button>
          <Button variant="contained" className="saveBtn">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateNewCompanyAdminDialog;
