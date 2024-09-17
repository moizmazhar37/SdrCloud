import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { useHistory, useLocation } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

//Custom Style of View page
const useStyles = makeStyles((theme) => ({
  vieworgLogoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "40px 0px 30px",
    "& p": {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter",
      color: "#181C32",
    },
    "& .MuiTypography-h6": {
      fontFamily: "Inter",
      fontWeight: "600",
      fontSize: "24px",
      color: "#181C32",
    },
  },

  saveDeailsBtnContainer: {
    gap: "7px",
    padding: "12px 15px 25px",
    display: "flex",
    justifyContent: "space-around",
    "& button": {
      whiteSpace: "pre",
      "@media(max-width:800px)": {
        marginBottom: "10px",
      },
    },
    "@media(max-width:800px)": {
      display: "block",
    },
  },
  rightDrawer: {
    "& .MuiDrawer-paper": {
      padding: "15px",
      width: "100%",
      maxWidth: "545px",
      overflowY: "auto",

      "@media(max-width:800px)": {
        maxWidth: "300px",
      },
    },
  },

  inputUploader: {
    maxWidth: "100%",
    height: "113px",
    cursor: "pointer",
    display: "inline-block",
    width: "33%",
    padding: "114px 0 0 0",
    height: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
    background: "url('/images/orgLogo.svg') center center no-repeat #F1F1F2",
    borderRadius: "3px",
  },
  mercedesHeading: {
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "Inter",
    padding: "10px 15px",
    background: "#F4F4F4",
    borderRadius: "8px 8px 0px 0px",
    color: "152F40",
  },
  fetchedLogo: {
    width: "100%",
    maxWidth: "210px",
  },
  innerbox: {
    border: "0.5px solid #F4F4F4",
    borderRadius: "0px 0px 8px 8px",
    paddingTop: ".5rem",
    "& .MuiGrid-item": {
      justifyContent: "start",
      padding: "0px 0px 0px 24px",
    },
  },
  breads: {
    "& nav li": {
      margin: "0px",
    },
    "& .breadCrumbText": {
      color: "#0358AC",
      margin: "0px 5px",
    },
  },
}));

// Component for viewing detailed information about a specific user
function ViewUser(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const Userid = location?.state?.userid;
  const [viewUserData, setViewUserData] = useState({});
  const [loading, setLoading] = useState(false);
  // Function to fetch and display user data from the API
  const viewData = async () => {
    setLoading(false);
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.viewUser,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
        params: {
          userId: Userid,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setViewUserData(res?.data?.data);
      } else if (res?.data?.status === 205) {
        toast.error("No User Found");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    viewData();
  }, []);

  const displayNames = {
    firstName: "First Name:",
    lastName: "Last Name:",
    projects: "No of Projects:",
    createTime: "Created Date and Time:",
    active: "Active:",
    errors: "Errors:",
    archived: "Archived:",
  };
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    if (string && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  return (
    <>
      <Box className={classes.breads}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/companyUsers-List">
            Users&nbsp;
          </Link>
          <Typography className="breadCrumbText">View User Details</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={1} style={{ paddingTop: "32px" }}>
        <Grid item md={8} sm={8} xs={12} lg={5}>
          <Box>
            <Typography variant="h5" className={classes.mercedesHeading}>
              View User Details
            </Typography>
          </Box>
          {loading ? (
            <ButtonCircularProgress />
          ) : (
            <Box className={classes.innerbox}>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">First Name:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {viewUserData?.userDetails?.firstName
                          ? viewUserData?.userDetails?.firstName
                          : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">Last Name:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {viewUserData?.userDetails?.lastName
                          ? viewUserData?.userDetails?.lastName
                          : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">Email:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {viewUserData?.userDetails?.email
                          ? viewUserData?.userDetails?.email
                          : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">Projects:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {/* {viewUserData?.projects ? viewUserData?.projects : ""} */}
                        {viewUserData?.projects !== null &&
                        viewUserData?.projects !== undefined
                          ? viewUserData?.projects
                          : "--"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">Created At:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {viewUserData?.userDetails?.createdTime
                          ? `${new Date(
                              viewUserData.userDetails.createdTime
                            ).toLocaleTimeString()} ${new Date(
                              viewUserData.userDetails.createdTime
                            ).toLocaleDateString()}`
                          : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">Active Projects:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {viewUserData?.active !== null &&
                        viewUserData?.active !== undefined
                          ? viewUserData?.active
                          : "--"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">Archived Projects:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {viewUserData?.archieved
                          ? viewUserData?.archieved
                          : "0"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={1} className="d-flex">
                <Grid container>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    className="profileBox d-flex"
                  >
                    <Typography variant="body1">Errors:</Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={6}
                    xs={12}
                    style={{ display: "flex" }}
                  >
                    <Box
                      className="d-flex"
                      style={{ justifyContent: "start", width: "100%" }}
                    >
                      <Typography variant="body1">
                        {viewUserData?.errors !== null &&
                        viewUserData?.errors !== undefined
                          ? viewUserData?.errors
                          : "--"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default ViewUser;
