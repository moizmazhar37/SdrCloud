import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Link, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import FullScreenLoader from "src/component/FullScreenLoader";
import { toast, ToastContainer } from "react-toastify";
import ApiConfig from "src/config/APIConfig";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: "32px",
    "& .headingBox": {
      borderRadius: "6px 6px 0px 0px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      background: "var(--light-grey2, #FCFCFC)",
      padding: "16px 24px",
      color: "#868686",
    },
    "& .middledata": {
      padding: "20px 30px",
    },
    "& .contentHeading": {
      color: "#868686",
      marginBottom: "10px",
      wordBreak: "break-all",
    },
    "& .acmeHeading": {
      color: "#152F40",
      fontWeight: 700,
    },
    "& .viewbtn": {
      color: "var(--blue, #0358AC)",
      minWidth: "35px",
      cursor: "pointer",
      "& .MuiButton-root": {
        fontSize: "14px",
      },
    },
    "& .viewbtnblack": {
      color: "#152F40",
      marginBottom: "10px",
      minWidth: "35px",
      cursor: "default",
      fontSize: "14px",
      wordBreak: "break-all",
      "& .MuiButton-root": {
        fontSize: "14px",
      },
    },
    "& .link": {
      color: "#0358AC",
    },
    "& .janeBtn": {
      color: "#152F40",
    },
    "& .dyanmicurlLinks": {
      color: "var(--blue, #0358AC)",
      textDecorationLine: "underline",
      cursor: "pointer",
    },
    "& .HvoVideoURL": {
      textDecorationLine: "underline",
      cursor: "pointer",
      color: "#152F40",
    },
    "& .errorhandlebtn": {
      "& .MuiButton-root": {
        color: "red",
        marginLeft: "-12px",
      },
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      "& .MuiButton-outlined": {
        color: "var(--blue, #0358AC)",
        borderRadius: "12px",
        border: "1px solid var(--light-stroke, #ECECEC)",
        background: "var(--white, #FFF)",
      },
    },
  },

  "& .savebtnDisables": {
    borderRadius: "0px 6px 6px 0px",
    background: "#F4F4F4",
    color: "black",
    height: "42px",
    width: "100px",
  },

  groupBtn: {
    display: "flex",
    gap: "30px",
    "& .Endbtn": {
      margin: "30px 0px",
      borderRadius: "8px",
      background: "var(--blue, #0358AC)",
      width: "262px",
      height: "44px",
      marginTop: "18px",
      marginLeft: "-3px",
      display: "flex",
      justifyContent: "center",
      color: "var(--light-blue, #F2F7FF)",
      fontSize: "16px",
      border: "none",
      fontWeight: 500,
      color: "white",
    },

    "& .EndbtnDisables": {
      margin: "30px 0px",
      borderRadius: "8px",
      width: "262px",
      height: "44px",
      marginTop: "18px",
      marginLeft: "-3px",
      display: "flex",
      justifyContent: "center",
      fontSize: "16px",
      border: "none",
      background: "#F4F4F4",
      color: "black",
    },
  },
}));

function UserViewProject(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [sheetData, setSheetData] = useState([]);

  const history = useHistory();

  const sheetId = props?.location?.state?.state?.ErrorSheetId;

  const {
    errorData,
    projectIndex,
    sheetUrl,
    videoUrl,
    firstName,
    lastName,
    hVOUrl,
    proscpectName,
    assignUser,
    templateType,
    status,
  } = props?.location?.state?.state || {};
  const CUSTOMER_ID = errorData?.CUSTOMER_ID;
  const getAllSheet = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllSheet,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          googleSheetId: sheetId,
        },
      });
      if (res?.status === 200) {
        setLoading(false);
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
    getAllSheet();
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}
      <Typography variant="body1">
        <Link style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
          Prospect Listings
        </Link>{" "}
        / <span style={{ color: "#0358AC" }}>Prospect Data</span>
      </Typography>

      <Paper className={classes.tableContainer}>
        <Box className="headingBox">
          <Typography variant="body1" style={{ fontWeight: 500 }}>
            Prospect Details
          </Typography>
        </Box>
        <Box className="middledata">
          <Grid container spacing={2} alignItems="baseline">
            {/* {sheetData &&
              sheetData.map((item) => ( */}
            <React.Fragment>
              <Grid item xs={6} sm={6} md={4} className="allmiddledata">
                <Typography className="contentHeading">
                  Prospect Company
                </Typography>
                <Typography className="contentHeading">
                  Prospect Name
                </Typography>

                <Typography className="contentHeading">User</Typography>
                <Typography className="contentHeading">Status</Typography>
                {templateType === "HVO" ? (
                  <Typography className="contentHeading">HVO URL</Typography>
                ) : (
                  <Typography className="contentHeading">Video URL</Typography>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={8}>
                <Typography className="viewbtnblack">
                  {proscpectName ? proscpectName : "--"}
                </Typography>
                <Typography className="viewbtnblack">
                  {firstName ? firstName : "--"} {lastName ? lastName : "--"}
                </Typography>
                <Typography className="viewbtnblack">
                  {assignUser ? assignUser : "-"}
                </Typography>
                <Typography className="viewbtnblack">
                  {status ? status : "Pending"}
                </Typography>
                {templateType === "HVO" ? (
                  <Typography className="viewbtnblack">
                    {status === "Failed" ? (
                      <>
                        <span style={{ color: "red" }}>Error</span>{" "}
                      </>
                    ) : (
                      <Link href={hVOUrl} className="link">
                        {hVOUrl ? hVOUrl : ""}
                      </Link>
                    )}
                  </Typography>
                ) : (
                  <Typography className="viewbtnblack">
                    {status === "Failed" ? (
                      <>
                        <span style={{ color: "red" }}>Error</span>{" "}
                      </>
                    ) : (
                      <Link href={videoUrl} className="link">
                        {videoUrl ? videoUrl : ""}
                      </Link>
                    )}
                  </Typography>
                )}
              </Grid>
            </React.Fragment>
            {/* ))} */}
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default UserViewProject;
