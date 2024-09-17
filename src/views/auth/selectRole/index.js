import React from "react";
import Logo from "../../../component/Logo";
import { Box, Typography, makeStyles } from "@material-ui/core";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  selectLogo: {
    padding: "60px 92px",
    display: "flex",
    justifyContent: "start",
    "@media(max-width:768px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontStyle: "normal",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "38.6667px",
    color: "#2B2B2B",
    "@media(max-width:425px)": {
      fontSize: "28.6667px",
    },
  },

  mainContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "9rem",
    paddingTop: "5rem",
    "@media(max-width:768px)": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: "5rem",
    },
  },
  line: {
    backgroundColor: "black",
    height: "auto",
    width: "2px",
    "@media(max-width:768px)": {
      height: "2px",
      width: "auto",
      backgroundColor: "black",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    "@media(max-width:768px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  item: {
    display: "flex",
    justifyContent: "center",
  },
  contentTester: {
    textAlign: "center",
    "& h3": {
      fontFamily: "Josefin Sans",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "40px",
      display: "flex",
      justifyContent: "center",
      color: "black",
      "@media(max-width:425px)": {
        fontSize: "28.6667px",
      },
    },
  },
}));
function Role() {
  const classes = useStyles();
  return (
    <Box>
      <div className={classes.selectLogo}>
        <Logo />
      </div>
      <Box className={classes.container}>
        <div>
          <Typography className={classes.heading}>
            {" "}
            Select Your{" "}
            <span style={{ color: "#1756FF" }}>
              Role</span><span style={{ color: "#2B2B2B" }}>?
            </span>
          </Typography>
        </div>
        <Box className={classes.mainContainer}>
          <Box className={classes.contentTester}>
            <img src="/images/tester.svg" alt="" />
            <Typography variant="h3">TESTER</Typography>
          </Box>
          <div className={classes.line}></div>
          <Box className={classes.contentTester}>
            <img src="/images/developer.svg" alt="" />
            <Typography variant="h3">DEVELOPER</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Role;
