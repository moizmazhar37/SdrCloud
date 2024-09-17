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
import GoogleSheet from "./GoogleSheet";
import Link from "@material-ui/core/Link";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// Custom styles for the Integration component
const useStyles = makeStyles((theme) => ({
  IntegrationContainer: {
    "& .headText": {
      color: "#0358AC",
      margin: "0px 5px",
    },
    "& .breads": {
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
        padding: "16px 24px 16px 24px",
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
// Integration component handles displaying integration settings and navigation to specific integration configurations
const Integration = ({ settingRoute, handleClick, setSettingRoute }) => {
  const classes = useStyles();
  const [nextRoute, setnextRoutes] = useState("Integrations");

  const location = useLocation();
  useEffect(() => {
    console.log("tester is herer");
    if (location?.state?.type == "Google sheet") setnextRoutes("Google Sheet");
  }, []);

  return (
    <>
      <Box className={classes.IntegrationContainer}>
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
                  <Link color="inherit" href="/setting" onClick={handleClick}>
                    Settings
                  </Link>
                </Typography>
                <Typography className="headText">{settingRoute}</Typography>
              </Breadcrumbs>
            </Box>
            <Grid container className="gridContainer">
              <Grid item xs={12} sm={4} lg={5} className="gridItem">
                <Box className="commonBorder">
                  <Box className="commonHeadingBox d-flex justify-space-between">
                    <Typography variant="body1">Ingestion Settings</Typography>
                    {/* <CloseIcon className="crossIcon" /> */}
                  </Box>
                </Box>
                <Box className="commomInnerBox">
                  <Box className="sourceBox">
                    <Typography variant="body1"> Source Type</Typography>
                  </Box>
                  <Box className="mainsubBox">
                    <Box className="subBox d-flex">
                      <Box className="d-flex">
                        <Typography variant="body1"> Google Sheets</Typography>
                        <Button variant="outlined" className="enablebtn">
                          Enabled
                        </Button>
                      </Box>
                      <ArrowForwardIosIcon
                        className="ArrowIcon"
                        onClick={() => {
                          setnextRoutes("Google Sheet");
                        }}
                      />
                    </Box>
                    <Box mt={2} className="subBox d-flex">
                      <Box className="d-flex">
                        <Typography variant="body1">SFTP</Typography>
                        <Button variant="outlined" className="disablebtn">
                          Disabled
                        </Button>
                      </Box>

                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>
                    <Box mt={2} className="subBox d-flex">
                      <Typography variant="body1">API</Typography>
                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>
                    <Box mt={2} className="subBox d-flex">
                      <Typography variant="body1">Hubspot</Typography>
                      <ArrowForwardIosIcon className="ArrowIcon" />
                    </Box>
                    <Box mt={2} className="subBox d-flex">
                      <Typography variant="body1"> Salesforce</Typography>
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
