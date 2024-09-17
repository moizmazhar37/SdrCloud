import React from "react";
import { Button, makeStyles, Typography,Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

// Define custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "fit-content",
    background: "#ffffff",
    borderRadius: "24px",
    paddingBottom: "10px",
    "& .MuiDialogContent-root": {
      flex: "none !important",
    },
    "& .MuiDialogActions-root": {
      marginRight: "0px !important",
    },
  },
  Titlemain: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "23.989px",
    lineHeight: "36px",
    color: "#000",
    marginTop: "16px",
  },
  subMain: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#000",
  },
  yesNoButton: {
    width: "82px",
    height: "37px",
    borderRadius: "6px",
    border: "1px solid rgba(24, 28, 50, 0.10)",
    background: "#181C32",
  },
}));
// AlertDialog component to display a confirmation dialog
export default function AlertDialog({
  open,
  loading,
  handleClose,
  title,
  desc,
  confirmationHandler,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          <Typography variant="h2" >
            {" "}
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box align="center">
            <Typography variant="h3">{desc} </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              autoFocus
            >
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "5px" }}

              onClick={() => {
                confirmationHandler();
              }}
            >
              {loading ? <ButtonCircularProgress /> : "Yes"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
