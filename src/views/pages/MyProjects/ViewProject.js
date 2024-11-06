import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Reprocess from "./Reporcess";
import Link from "@material-ui/core/Link";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import FullScreenLoader from "src/component/FullScreenLoader";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
    },
    "& .acmeHeading": {
      color: "#152F40",
      fontWeight: 700,
    },
    // "& .allmiddledata": {
    //   marginTop: "18px",
    // },
    "& .viewbtn": {
      color: "var(--blue, #0358AC)",
      minWidth: "35px",
      // cursor:'pointer',
      // padding: "6px 0px",
      cursor: "pointer",
      "& .MuiButton-root": {
        fontSize: "14px",
      },
    },
    "& .viewbtnblack": {
      color: "#152F40",
      minWidth: "35px",
      // padding: "6px 0px",
      cursor: "default",
      "& .MuiButton-root": {
        fontSize: "14px",
      },
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
      color: "var(--light-blue, #F2F7FF)",
      fontSize: "16px",
      border: "none",
      background: "#F4F4F4",
      color: "black",
    },
  },
}));

function ViewProjects(props) {
  const classes = useStyles();
  const [errorhandle, setErrorhandle] = useState("error");
  const [reprocessopen, setReprocessOpen] = useState(false);
  const [adminUserList, setAdminUserList] = useState([]);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const location = useLocation();
  const handleReprocessClose = () => {
    setReprocessOpen(!reprocessopen);
  };

  const sheetId = location?.state?.state?.sheetId;
  const sheetName = location?.state?.state?.sheetName;
  const index = location?.state?.state?.index;
  const errorData = adminUserList;
  const CUSTOMER_ID = adminUserList?.CUSTOMER_ID;

  useEffect(() => {
    const checkMissingFields = () => {
      const requiredFields = [
        "FIRST_NAME",
        "LAST_NAME",
        "EMAIL",
        "FACEBOOK",
        "LINKEDIN",
        "LOGO",
        "CUSTOMER_ORGANIZATION",
        "PHONE_NO",
        "COMPANYURL",
        // "STATUS",
        // "ERROR_MSG",
        "Maps_URL",
        "TWITTER",
      ];
      const missing = requiredFields.filter(
        (field) => !errorData || !errorData[field]
      );
      setMissingFields(missing);
    };

    checkMissingFields();
  }, [errorData]);
  useEffect(() => {
    adminManagement();
  }, []);

  const adminManagement = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.ErrorDataListing,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          sheetId: sheetId,
          page: 0,
          pageSize: 10,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setAdminUserList(res?.data?.data?.failedCustomerData[index]);
        setData(res?.data?.data);
      } else if (res?.data.status === 205) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  const reprocess = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.reprocess,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          videoTemplateId: data?.videoTemplateId,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        toast.success("Reprocess done successfully");
      } else if (res?.data?.status === 205) {
        toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  const truncateText = (text, maxLength = 30) => {
    return text?.length > maxLength
      ? `${text.slice(0, 15)}...${text.slice(-15)}`
      : text;
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <Typography variant="body1">
        <Link href="/Myprojects">Project Listings</Link> /{" "}
        <Link href="/project-list">Sheet All Data</Link> /{" "}
        <span style={{ color: "#0358AC" }}>Project Settings</span>
      </Typography>

      <Paper className={classes.tableContainer}>
        <Box className="headingBox">
          <Typography variant="body1" style={{ fontWeight: 500 }}>
            Project Details
          </Typography>
        </Box>

        <Box className="middledata">
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">First Name</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtnblack">
                {adminUserList?.FIRST_NAME
                  ? truncateText(adminUserList?.FIRST_NAME)
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Last Name</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtnblack">
                {adminUserList?.LAST_NAME
                  ? truncateText(adminUserList?.LAST_NAME)
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Email</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtnblack">
                {adminUserList?.EMAIL
                  ? truncateText(adminUserList.EMAIL)
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Facebook</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtn">
                {adminUserList?.FACEBOOK ? (
                  <Link
                    href={adminUserList.FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="viewbtn"
                  >
                    {truncateText(adminUserList.FACEBOOK)}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">LinkedIn</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography>
                {adminUserList?.LINKEDIN ? (
                  <Link
                    href={adminUserList.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="viewbtn"
                  >
                    {truncateText(adminUserList.LINKEDIN)}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Logo</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtn">
                {adminUserList?.LOGO ? (
                  <Link
                    href={adminUserList.LOGO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="viewbtn"
                  >
                    {truncateText(adminUserList.LOGO)}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Organization</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtnblack">
                {truncateText(adminUserList.CUSTOMER_ORGANIZATION)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Phone No</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtnblack">
                {adminUserList?.PHONE_NO ? adminUserList?.PHONE_NO : "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Company Url</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtn">
                {adminUserList?.COMPANYURL ? (
                  <a
                    href={adminUserList.COMPANYURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="viewbtn"
                  >
                    {truncateText(adminUserList.COMPANYURL)}
                  </a>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Status</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtnblack">
                {adminUserList?.STATUS ? adminUserList?.STATUS : "Pending"}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Error Msg</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtnblack">
                {adminUserList?.ERROR_MSG ? adminUserList?.ERROR_MSG : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Maps</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtn">
                {adminUserList?.Maps_URL ? (
                  <Link
                    href={adminUserList.Maps_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="viewbtn"
                  >
                    {truncateText(adminUserList.Maps_URL)}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={2} className="allmiddledata">
              <Typography className="contentHeading">Twitter</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <Typography className="viewbtn">
                {adminUserList?.TWITTER ? (
                  <Link
                    href={adminUserList.TWITTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="viewbtn"
                  >
                    {truncateText(adminUserList.TWITTER)}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default ViewProjects;
