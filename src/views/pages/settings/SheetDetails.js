import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Button,
  Breadcrumbs,
  ButtonGroup,
  InputAdornment,
  TextField,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import FullScreenLoader from "src/component/FullScreenLoader";
import { useHistory } from "react-router-dom";
// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  IntegrationContainer: {
    "& .breads": {
      "& nav li": {
        margin: "0px",
      },
      "& .linkClass": {
        margin: "0px 5px",
      },
    },
    "& .gridContainer": {
      marginTop: "32px",
      gap: "30px",
      "& .commonBorder": {
        borderRadius: "8px 8px 0px 0px",
        border: "1px solid #ECECEC",
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
      "& .commomInnerBox": {
        "& h6": {
          fontSize: "14px",
          fontWeight: 400,
          color: "#152F40",
        },
        "& .createButton": {
          padding: "15px",
          width: "100%",
          borderRadius: "8px",
          background: "var(--blue, #0358AC)",
          "& .MuiButton-label": {
            color: "#F2F7FF",
            fontSize: "16px",
            fontWeight: 500,
          },
        },
        "& .textfield": {
          "& .MuiOutlinedInput-adornedEnd": {
            padding: "0px",
          },
          "& .iconButton": {
            border: "1px solid #ccc", // Add your desired border style
            borderRadius: "4px", // Add your desired border radius

            "& .MuiSvgIcon-root": {
              color: "#858585",
            },
          },
        },
        "& .subGridContainer": {
          marginTop: "16px",
          "& h6": {
            fontSize: "14px",
            color: " var(--black, #152F40)",
            fontWeight: 500,
          },
          "& .MuiTypography-body1": {
            color: "var(--grey, #858585)",
            fontWeight: 500,
          },
        },
        "& .increment": {
          background: "#F4F4F4",
          border: "2px solid var(--light-stroke, #ECECEC)",
          borderRadius: "0px 5px 5px 0px ",
          color: "black",
        },
        "& .decrement": {
          background: "#F4F4F4",
          border: "2px solid var(--light-stroke, #ECECEC)",
          borderRadius: "5px 0px 0px 5px ",
          color: "black",
        },
        "& .count": {
          color: "#152F40",
        },
      },
    },
  },
}));

const SheetDetails = ({
  settingRoute,
  nextRoute,
  nextRoute1,
  nextRoutes2,
  handleClick,
  setNextRoutes2,
  sheetData1,
}) => {
  const classes = useStyles();
  const [recordCount, setRecordCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sheetData, setSheetData] = useState([]);
  const [sheetDataUrl, setSheetDataUrl] = useState([]);
  const history = useHistory();
  console.log(sheetDataUrl, "sheetDataUrl====");
  // Function to handle incrementing record count
  const handleIncrement = () => {
    setRecordCount(recordCount + 1);
  };
  // Function to handle decrementing record count
  const handleDecrement = () => {
    if (recordCount > 0) {
      setRecordCount(recordCount - 1);
    }
  };

  const getAllSheet = async (value) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllSheet,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: localStorage.getItem("_id"),
        },
        params: {
          rangeName: sheetData1.sheetName,
          sheetUrl: sheetData1.sheetUrl,
        },
      });
      if (res?.status === 200) {
        setLoading(false);
        const dataMap = {
          company_url: res?.data?.data[11],
          linkedin: res?.data?.data[4],
          customer_id: res?.data?.data[0],
          logo: res?.data?.data[5],
          customer_organization: res?.data?.data[1],
          last_name: res?.data?.data[3],
          maps_URL: res?.data?.data[6],
          email: res?.data?.data[8],
          first_name: res?.data?.data[2],
          phone_no: res?.data?.data[7],
          twitter: res?.data?.data[10],
          facebook: res?.data?.data[9],
        };
        setSheetDataUrl(dataMap);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  const getSheetById = async (value) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getSheetById,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetData1.sheetId,
        },
      });
      if (res?.status === 200) {
        setSheetData(res?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSheetById();
    getAllSheet();
  }, []);
  return (
    <>
      {loading && <FullScreenLoader />}
      <Box className={classes.IntegrationContainer}>
        <Box className="breads">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography variant="body1" style={{ color: "#152F40" }}>
              <Link color="inherit" href="/pp-settings" onClick={handleClick}>
                Settings{" "}
              </Link>{" "}
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#152F40", marginLeft: "5px" }}
            >
              <Link color="inherit" href="/integration" onClick={handleClick}>
                Integration
              </Link>
            </Typography>{" "}
            <Link className="linkClass">{nextRoute}</Link>
            <Link className="linkClass">{nextRoute1}</Link>
            <Typography className="headText">{nextRoutes2}</Typography>
          </Breadcrumbs>
        </Box>
        <Grid container className="gridContainer">
          <Grid item xs={12} md={12} lg={6} className="gridItem">
            <Box className="commonBorder">
              <Box className="commonHeadingBox">
                <Typography variant="body1">Sheet Details</Typography>
              </Box>
            </Box>
            {sheetData && (
              <Box
                className="commomInnerBox"
                style={{ padding: "8px 8px 8px 20px" }}
              >
                <Grid container spacing={2} className="subGridContainer">
                  <Grid item lg={4} sm={4}>
                    <Typography variant="body1">Title</Typography>
                  </Grid>
                  <Grid item lg={5} sm={5}>
                    <Typography variant="h6">{sheetData?.title}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="subGridContainer">
                  <Grid item lg={4} sm={4}>
                    <Typography variant="body1">Fetch URL</Typography>
                  </Grid>
                  <Grid item lg={5} sm={5}>
                    <Typography variant="h6" style={{ color: "#0358AC" }}>
                      <a
                        style={{ color: "#0358AC" }}
                        href={sheetData?.fetchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sheetData?.fetchUrl
                          ? sheetData.fetchUrl.slice(0, 30) + "..."
                          : null}
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="subGridContainer">
                  <Grid item lg={4} sm={4}>
                    <Typography variant="body1">Connected</Typography>
                  </Grid>
                  <Grid item lg={5} sm={5}>
                    {sheetData?.createdOn && (
                      <Typography variant="h6">
                        {new Date(sheetData.createdOn).toLocaleTimeString()}{" "}
                        {new Date(sheetData.createdOn).toLocaleDateString()}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="subGridContainer">
                  <Grid item lg={4} sm={4}>
                    <Typography variant="body1">Field Count</Typography>
                  </Grid>
                  <Grid item lg={5} sm={5}>
                    <Typography variant="h6">
                      {sheetData?.fieldsCount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="subGridContainer">
                  <Grid item lg={4} sm={4}>
                    <Typography variant="body1">Total Records</Typography>
                  </Grid>
                  <Grid item lg={5} sm={5}>
                    <Typography variant="h6">
                      {sheetData?.totalRecords}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="subGridContainer">
                  <Grid item lg={4} sm={4}>
                    <Typography variant="body1">
                      Fetch New Records Every
                    </Typography>
                  </Grid>
                  <Grid item lg={5} sm={5}>
                    <Typography variant="h6">
                      {sheetData?.fetchDays}{" "}
                      {sheetData?.fetchDays === 1 ? "Day" : "Days"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={5} className="gridItem">
            <Box className="commonBorder">
              <Box
                className="commonHeadingBox"
                style={{ padding: "8px 8px 8px 20px" }}
              >
                <Typography variant="body1">Column Headers: Fields</Typography>
              </Box>
            </Box>
            <Box className="commomInnerBox">
              <Box pt={2} pl={3} pr={2}>
                <Typography variant="h6">Company Name</Typography>
                <TextField
                  name="oldPassword"
                  variant="outlined"
                  placeholder="Text Field"
                  className="textfield"
                  fullWidth
                  value={sheetDataUrl.customer_organization || ""}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton className="iconButton">
                  //         <ExpandMoreIcon />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>

              <Box className="BoxButton" mt={3}>
                <Button
                  variant="contained"
                  className="createButton"
                  onClick={() => history.goBack()}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SheetDetails;
