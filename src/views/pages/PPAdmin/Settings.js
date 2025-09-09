import React, { useEffect, useContext } from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    height: "100%",
    padding: "5px",
    "&.MuiPaper-root": {
      border: "none",
      boxShadow: "none !important",
    },
    "& .templatebox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "208px",
      width: "240px",
      borderRadius: "12px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "#FFF",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      padding: "20px 10px 20px 10px",
      cursor: "pointer",
      "& p": {
        marginTop: "24px",
        textAlign: "center",
      },
    },
  },
  settingBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    gridGap: "2rem",
    "& .MuiTypography-body1": {
      color: "#152F40",
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));

const Settings = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);

  return (
    <div style={{ marginLeft: "-5px" }}>
      <Box className={classes.paperContainer}>
        <Paper className={classes.tabContainer}>
          <Box className={classes.settingBox}>
            <Box
              className="templatebox"
              onClick={() => {
                history.push("/edit-profile");
              }}
            >
              <div className="d-flex">
                <img src="images/Setting/my_personal.svg" alt="img" />
              </div>
              <Typography variant="body1">My Profile</Typography>
            </Box>

            {/* <Box className="templatebox" >
                            <div className="d-flex">
                                <img src="images/Setting/Tracking.png" alt="img" />
                            </div>
                            <Typography variant="body1">Intent Tracking</Typography>
                        </Box> */}

            <Box
              className="templatebox"
              onClick={() => {
                history.push("/company-setting");
              }}
            >
              <div className="d-flex">
                <img src="images/Setting/Company.png" alt="img" />
              </div>
              <Typography variant="body1">Company</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Settings;
