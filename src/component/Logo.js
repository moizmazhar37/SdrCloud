import React, { useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";

// Define custom styles
const useStyles = makeStyles((theme) => ({
  logoBoxmain: {
    display: "flex",
    justifyContent: "center",
    // padding: "16px 0px",
    paddingBottom: "16px",
    marginBottom: "16px",
    "& .logoDiv": {
      width: "210.5px",
      height: "35.572px",
    },
  },
}));
// Logo component to render the company logo and handle click event to redirect to home page
const Logo = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);

  return (
    <Box
      onClick={() => {
        history.push("/");
      }}
      className={classes.logoBoxmain}
    >
      <img
        src={
          user.coverData.companyLogo
            ? user.coverData.companyLogo
            : "images/personaprosvglogo.svg"
        }
        alt=""
        className="logoDiv"
      />
    </Box>
  );
};

export default Logo;
