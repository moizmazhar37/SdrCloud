import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
import GoogleSheet from "./../settings/GoogleSheet";
import DataNotFoundIMG from "src/component/DataNotFoundIMG";
import Link from "@material-ui/core/Link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";

// Custom styles for the Integration component
const useStyles = makeStyles((theme) => ({
  IntegrationContainer: {
    "& .headText": {
      color: "#0358AC",
      margin: "0px 5px",
    },
    "& .breads": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      "& nav li": {
        margin: "0px",
      },
    },
    "& .gridContainer": {
      marginTop: "32px",
      "& .commonBorder": {
        borderRadius: "8px",
        border: "0px solid #ECECEC",
        "& .commonHeadingBox": {
          padding: "12px 24px",
          backgroundColor: "#ECECEC",
          color: "#152F40",
          borderRadius: "8px 8px 0px 0px",
          "& .crossIcon": {
            color: "#152F40",
          },
        },
      },
    },
    "& .commomInnerBox": {
      border: "1px solid var(--light-stroke, #ECECEC)",
      "& .sourceBox": {
        padding: "12px 24px 12px 24px",
        borderBottom: "1px solid var(--light-stroke, #ECECEC)",
        "& .MuiTypography-body1": {
          fontWeight: 500,
          color: "#0358AC",
        },
      },
      "& .mainsubBox": {
        // padding: "16px 24px 16px 24px",
        "& .subBox": {
          justifyContent: "space-between",

          "& button": {
            padding: "3px 12px !important",
          },

          "& .enablebtn": {
            borderRadius: "14px",
            border: "1px solid var(--green, #7DC371)",
            background: "var(--light-green, #F4FFF4)",
            color: "#152F40",
            marginLeft: "2rem",
          },
          "& .disablebtn": {
            borderRadius: "14px",
            border: "1px solid var(--red, #EC2727)",
            background: "#FDE9E9",
            color: "#152F40",
            marginLeft: "6rem",
          },
          "& .MuiTypography-body1": {
            fontWeight: 500,
            color: "#858585",
          },
          "& .ArrowIcon": {
            width: "18px",
            height: "18px",
            color: "#858585",
            cursor: "pointer",
          },
        },
      },
    },
  },
}));

const CommonBoxStyle = {
  margin: "10px",
  padding: "10px",
  height: "40px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

// Integration component manages the display of different integration settings and navigation
const Integration = ({ settingRoute, handleClick, setSettingRoute }) => {
  const classes = useStyles();
  const [nextRoute, setnextRoutes] = useState("Integrations");
  console.log("nextRoute: ", nextRoute);
  const history = useHistory();
  const [hoverState, setHoverState] = useState({});
  const location = useLocation();
  useEffect(() => {
    console.log("tester is herer");
    if (location?.state?.type == "Google sheet") setnextRoutes("Google Sheet");
  }, []);
  const handleMouseEnter = (key) => {
    setHoverState((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleMouseLeave = (key) => {
    setHoverState((prevState) => ({ ...prevState, [key]: false }));
  };
  return (
    <>
      <Box className={classes.IntegrationContainer}>
        <Typography>

        </Typography>
        {nextRoute === "Google Sheet" ? (
          <>
            <GoogleSheet
              nextRoute={nextRoute}
              setnextRoutes={setnextRoutes}
              settingRoute={settingRoute}
              setSettingRoute={setSettingRoute}
              handleClick={handleClick}
            />
          </>
        ) : (
          <>
            <Box className="breads">

              <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
                <Typography variant="body1">
                  <Link
                    color="inherit"
                    to="/settings"
                    component={RouterLink}
                    onClick={handleClick}
                  >
                    Settings
                  </Link>
                </Typography>
                <Typography className="headText">
                  {settingRoute}
                  {!settingRoute && <Typography>Integrations</Typography>}
                </Typography>
              </Breadcrumbs>
            </Box>
            <Grid container className="gridContainer">
              <Grid item xs={12} sm={6} lg={5} className="gridItem">
                <Box className="commonBorder">
                  <Box className="commonHeadingBox d-flex justify-space-between">
                    <Typography variant="body1">Ingestion Settings</Typography>
                  </Box>
                </Box>
                <Box className="commomInnerBox">
                  <Box className="sourceBox">
                    <Typography variant="body1"> Source Type</Typography>
                  </Box>
                  <Box className="mainsubBox">
                    <Box
                      className="subBox d-flex"
                      onClick={() => setnextRoutes("Google Sheet")}
                      style={{
                        ...CommonBoxStyle,
                        backgroundColor: hoverState["google"]
                          ? "#f0f0f0"
                          : "transparent",
                      }}
                      onMouseEnter={() => handleMouseEnter("google")}
                      onMouseLeave={() => handleMouseLeave("google")}
                    >
                      <Box className="d-flex" style={{ margin: "10px" }}>
                        <Typography variant="body1">Google Sheets</Typography>
                        <Button variant="outlined" className="enablebtn">
                          Enabled
                        </Button>
                      </Box>
                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>

                    <Box
                      mt={2}
                      className="subBox d-flex"
                      style={{
                        ...CommonBoxStyle,
                        backgroundColor: hoverState["sftp"]
                          ? "#f0f0f0"
                          : "transparent",
                      }}
                      onMouseEnter={() => handleMouseEnter("sftp")}
                      onMouseLeave={() => handleMouseLeave("sftp")}
                    >
                      <Box className="d-flex" style={{ margin: "10px" }}>
                        <Typography variant="body1">SFTP</Typography>
                        <Button variant="outlined" className="disablebtn">
                          Disabled
                        </Button>
                      </Box>
                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>

                    <Box
                      mt={2}
                      className="subBox d-flex"
                      style={{
                        ...CommonBoxStyle,
                        backgroundColor: hoverState["api"]
                          ? "#f0f0f0"
                          : "transparent",
                      }}
                      onMouseEnter={() => handleMouseEnter("api")}
                      onMouseLeave={() => handleMouseLeave("api")}
                    >
                      <Typography variant="body1">API</Typography>
                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>

                    <Box
                      mt={2}
                      className="subBox d-flex"
                      style={{
                        ...CommonBoxStyle,
                        backgroundColor: hoverState["hubspot"]
                          ? "#f0f0f0"
                          : "transparent",
                      }}
                      onMouseEnter={() => handleMouseEnter("hubspot")}
                      onMouseLeave={() => handleMouseLeave("hubspot")}
                    >
                      <Typography variant="body1">Hubspot</Typography>
                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>

                    <Box
                      mt={2}
                      className="subBox d-flex"
                      style={{
                        ...CommonBoxStyle,
                        backgroundColor: hoverState["salesforce"]
                          ? "#f0f0f0"
                          : "transparent",
                      }}
                      onMouseEnter={() => handleMouseEnter("salesforce")}
                      onMouseLeave={() => handleMouseLeave("salesforce")}
                    >
                      <Typography variant="body1">Salesforce</Typography>
                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Integration;
