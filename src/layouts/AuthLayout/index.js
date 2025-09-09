import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
  },
  loginLayoutBox: {
    background: "#fff",
    display: "flex",
    zIndex: "9",
    position: "relative",
    justifyContent: "center",

    minHeight: "729px",

    height: "100vh",
    alignItems: "center",
    "& .loginLayoutBoxImg": {
      width: "50%",
      zIndex: "1",
      position: "fixed",
      backgroundSize: "cover",
      backgroundImage: "url(./images/image.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh",
      right: 0,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      "& h1": {
        fontSize: "65px",
      },
    },
  },
  loginContentLayoutBox: {
    background: "#fff",
    // position: "absolute",
    left: 0,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: "55px 0 55px",
    },
  },
}));

const AuthLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.loginLayoutBox}>
      <Box className={classes.loginContentLayoutBox}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
