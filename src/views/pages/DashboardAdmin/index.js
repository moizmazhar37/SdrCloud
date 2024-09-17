import {
  Box,
  Button,
  Grid,
  Typography,
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import LinearProgress from "@material-ui/core/LinearProgress";
import clsx from "clsx";
import { GoGraph } from "react-icons/go";

import SingleBarChart from "./SingleBarGraph";
import SingleColumnChartBar from "./SingleColumnChart";
import GroupBarGraph from "./GroupBarGraph";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
// Styles for the component
const useStyles = makeStyles((theme) => ({
  displayFlexColumn: {
    "& .border": {
      borderRadius: "8px",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      border: "1px solid var(--light-stroke, #ECECEC)",
      width: "100%",
      padding: "8px",
      "@media(max-width:1400px)": {
        padding: "5px",
      },
      "& .MuiTypography-body1": {
        color: "rgba(133, 133, 133, 1)",
        fontWeight: "500",
        gap: "10px",
        "@media(max-width:1400px)": {
          gap: "5px",
        },
      },
      "& .d-flex justify-start": {},
    },
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 8px 0 8px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px 0px 5px",
      marginTop: "20px",
    },
    "& .TotalUserBox": {
      padding: "8px",
      flexDirection: "column",
      alignItems: "flex-start",
      alignSelf: "stretch",
      marginTop: "5px",
      marginBottom: "5px",
    },
  },
  secondBox: {
    "@media (min-width: 960px) and (max-width: 1280px)": {
      marginLeft: "1px",
      paddingRight: "5px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20px",
      padding: "0px 0px 0px 5px",
    },

    "& .subSecondBox": {
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      width: "100%",
      "@media(max-width:400px)": {
        padding: "10px",
      },
      "& .CommanBox": {
        color: "var(--grey, #858585)",
        padding: "8px",
        gap: "8px",
        margin: "4px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        border: "1px solid var(--light-stroke, #ECECEC)",
        boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
        justifyContent: "center",
        // width: "100%",
        height: "auto",
        padding: "8px",
        // justifyContent: "center",
        alignItems: "center",
        "& .MuiTypography-h2": {
          color: "var(--black, #152F40)",
          width: "100%",
        },
        "& .MuiTypography-h3": {
          color: "var(--black, #152F40)",
          width: "100%",
        },
        "& .EnterpriseTxt": {
          color: "var(--blue, #0358AC)",
          display: "flex",
          justifyContent: "center",
          lineHeight: "28px",
        },
        "& .MediaCreditBox": {
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          "& .MediaCreditimg": {
            width: "45px",
            height: "45px",
          },
        },
      },
    },
  },
  thirdBox: {
    padding: "0px 6px 0px 0px",
    margin: "-8px -4px",
    [theme.breakpoints.down("md")]: {
      marginTop: "24px",
      padding: "0px 16px 0 6px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px 4px 0px 2px",
    },
    "@media (min-width: 960px) and (max-width: 1280px)": {
      padding: "0px 0px 0px 6px",
    },
    "& .subThirdBox": {
      borderRadius: "8px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      width: "100%",
      padding: "15px 18px",
      "@media(max-width:400px)": {
        padding: "10px",
      },
      "& .MuiTypography-body1": {
        color: "#152F40",
        fontSize: "14px",
        fontWeight: 500,
      },
      "& .border": {
        borderRadius: "8px",
        border: "1px solid var(--light-stroke, #ECECEC)",
        width: "100%",
        boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
        padding: "8px",
      },
      "& .subUpperBox": {
        "& .MuiTypography-h6 ": {
          color: "var(--grey, #858585)",
          fontWeight: "500",
        },
        "& .MuiTypography-h3 ": {
          color: "var(--blue, #0358AC)",
        },
      },
      "& .subBoxes": {
        margin: "4px 0px",
        "& .MuiButton-root": {
          color: "var(--blue, #0358AC)",
          fontFamily: "Inter",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "400",
          gap: "10px",
        },
        "& .MuiTypography-h6 ": {
          color: "var(--grey, #858585)",
          fontWeight: "500",
        },
      },
    },
  },
  "& .border": {
    borderRadius: "8px",
    border: "1px solid var(--light-stroke, #ECECEC)",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    width: "100%",
    padding: "8px",
  },
  border: {
    borderRadius: "8px",
    border: "1px solid var(--light-stroke, #ECECEC)",
    width: "-webkit-fill-available",
    padding: "15px 18px",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    "& .MuiTypography-body1": {
      "@media (max-width:1455px) and (min-width : 1280px)": {
        fontSize: "12px",
      },
    },
    "@media(max-width:400px)": {
      padding: "10px",
      "& .MuiBox-root-99": {
        marginLeft: "0px",
      },
      "& .MuiBox-root-116": {
        marginLeft: "0px",
      },
    },
  },
  "& .MuiTypography-body1": {
    color: "var(--grey, #858585)",
  },
  TextColor: {
    color: "var(--grey, #858585)",
  },
  firstChartBox: {
    padding: "12px 0px",
    color: "var(--grey, #858585)",
    marginLeft: "-8px",
    "& .MuiTypography-h2": {
      color: "var(--black, #152F40)",
    },
    "& .MuiTypography-body1": {
      fontWeight: "500",
    },
    "& .border": {
      borderRadius: "8px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      padding: "8px",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    },
    "& .singleColBarBox": {
      padding: "12px 10px 0px 0px",
      "@media (min-width: 960px) and (max-width: 1280px)": {
        marginLeft: "10px",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },

      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "14px 0px 0px 7px",
      },
      "& .subGraph1": {
        padding: "15px",
        height: "100%",
        maxHeight: "503px",
        justifyContent: "start",
        "@media (max-width: 1280px)": {
          maxHeight: "470px",
        },
        // '@media (min-width: 1400px)': {
        //     maxHeight: "530px",
        // },
        "@media (max-width: 400px)": {
          padding: "10px",
        },
      },
    },
  },
  secondChartBox: {
    color: "var(--grey, #858585)",
    "& .MuiTypography-h2": {
      color: "var(--black, #152F40)",
    },
    padding: "24px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "25px 8px 0px 0px",
    },
    "@media (max-width: 400px)": {
      padding: "24px 9px 0px 0px",
    },
    "@media (min-width: 960px) and (max-width: 1280px)": {
      padding: "24px 0px 0px 0px",
    },
    gridRowGap: "12px",
    "& .TotalContactBox": {
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      borderRadius: "8px",
      marginTop: "4px",
      gap: "5px",
      "& .subSecondChartBox": {
        gap: "12px",
        height: "100%",
        maxHeight: "110px",
        "@media (max-width:1455px) and (min-width : 1280px)": {
          gap: "10px",
        },
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: "10px",
      },
    },
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 12,
    borderRadius: 6,
    width: "100%",
    backgroundColor: "#F4F4F4",
  },
  colorPrimary: {},
  bar: {
    borderRadius: 6,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const BorderLinearProgress1 = withStyles((theme) => ({
  root: {
    height: 12,
    borderRadius: 6,
    width: "100%",
    backgroundColor: "#F4F4F4",
  },
  colorPrimary: {},
  bar: {
    borderRadius: 6,
    backgroundColor: "#FFC047",
  },
}))(LinearProgress);

// Fetches the total user count and updates the state with the count
function NoProjects() {
  const classes = useStyles();

  const [userCount, setUserCount] = useState({});

  const [adminCounting, setAdminCounting] = useState("");

  const totalUser = async () => {
    const token = window?.localStorage?.getItem("token");
    const accountId = window?.localStorage?.getItem("accountId");
    const UserId = window?.localStorage?.getItem("_id");
    try {
      const res = await axios({
        url: ApiConfig.totalUserCount,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          accountId: accountId,
          userId: UserId,
        },
      });

      if (res?.data?.status === 200) {
        console.log("resresresres");
        setUserCount(res?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    totalUser();
  }, []);

  const adminCount = async () => {
    const token = window?.localStorage?.getItem("token");
    const accountId = window?.localStorage?.getItem("accountId");
    const userId = window?.localStorage?.getItem("_id");
    try {
      const res = await axios({
        url: ApiConfig.getAllAdminSeat,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },

        params: {
          accountId: accountId,
        },
      });
      if (res?.data?.status === 200) {
        setAdminCounting(res?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    adminCount();
  }, []);

  return (
    <Box style={{ marginLeft: "8px" }} mt={1}>
      <Grid container xs={12} justifyContent="space-between">
        <Grid
          container
          spacing={2}
          lg={5}
          md={6}
          sm={12}
          xs={12}
          className={classes.secondBox}
        >
          <Grid container xs={12} className="subSecondBox">
            <Grid item xs={12} md={6}>
              <Box className="CommanBox" style={{ height: "100px" }}>
                <Typography variant="h5">Your package</Typography>
                <Typography variant="h3" className="EnterpriseTxt">
                  Enterprise Plus
                </Typography>
                <Typography variant="body1" style={{ fontWeight: "500" }}>
                  {adminCounting?.mediaDetails?.totalMediaCredits} Credits
                  Monthly
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                className="CommanBox"
                style={{ height: "100px", justifyContent: "start" }}
              >
                <Box className="MediaCreditBox">
                  <img
                    src="/images/Totalseat.png"
                    alt="Active"
                    className="Totalseat"
                  />
                  <Typography variant="body1">Total Seats</Typography>
                </Box>

                <Typography variant="h3">
                  {adminCounting?.userSeatsUsed} used |{" "}
                  {adminCounting?.userSeatsAvailable} available
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="CommanBox" style={{ height: "100px" }}>
                <Box className="MediaCreditBox">
                  <img
                    src="/images/MediaCredit.png"
                    alt="MediaCredit"
                    className="MediaCreditimg"
                  />
                  <Typography variant="body1">Monthly Media Credits</Typography>
                </Box>

                <Typography variant="h2" style={{ fontSize: "16px" }}>
                  {adminCounting?.mediaDetails?.used}{" "}
                  <span style={{ fontSize: "14px", color: "#858585" }}>
                    of {adminCounting?.mediaDetails?.totalMediaCredits} used
                  </span>
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={40}
                  color={"#3A75AF"}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="CommanBox" style={{ height: "100px" }}>
                <Box className="MediaCreditBox">
                  <img
                    src="/images/Active.png"
                    alt="Active"
                    className="MediaCreditimg"
                  />
                  <Typography variant="body1">Active Media Limit</Typography>
                </Box>
                <Typography variant="h2" style={{ fontSize: "16px" }}>
                  {adminCounting?.package?.activeMediaLimits?.usedActiveMedia}{" "}
                  <span style={{ fontSize: "14px", color: "#858585" }}>
                    of{" "}
                    {
                      adminCounting?.package?.activeMediaLimits
                        ?.TotalActiveMediaLimits
                    }{" "}
                    used
                  </span>
                </Typography>
                <BorderLinearProgress1
                  variant="determinate"
                  value={50}
                  color={"#FFC047"}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                className="CommanBox"
                style={{ height: "100%", maxHeight: "21px", padding: "12px" }}
              >
                <Typography variant="body1" style={{ fontWeight: "500" }}>
                  You have{" "}
                  <span style={{ color: "var(--blue, #0358AC)" }}>
                    {adminCounting?.mediaDetails?.unusedMediaCredits}{" "}
                  </span>
                  <span style={{ color: "red" }}> Unused Seats</span> Media
                  Credits
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          lg={4}
          md={6}
          sm={12}
          xs={12}
          className={classes.displayFlexColumn}
        >
          <Grid container xs={12} className={classes.border}>
            <Grid
              item
              xs={7}
              className="TotalUserBox d-flex justify-space-between border"
            >
              <Typography
                variant="body1"
                className="d-flex justify-start"
                style={{ gap: "12px" }}
              >
                <img src="images/users.png" alt="" />
                Total Users
              </Typography>
              <Typography variant="h2">{userCount?.totalCount}</Typography>
            </Grid>

            <Grid
              item
              xs={5}
              className="d-flex column justify-space-between alignstart"
              style={{
                gap: "8px",
                padding: "0 0 0 8px",
                width: "122px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <Grid
                item
                xs={12}
                className="d-flex column justify-space-between alignstart border"
              >
                <Typography variant="body1" className="d-flex justify-start">
                  <img src="images/users.png" alt="" />
                  Admins
                </Typography>
                <Typography variant="h2">{userCount?.admins}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                className="d-flex column justify-space-between alignstart border"
              >
                <Typography
                  variant="body1"
                  className="d-flex justify-start"
                  style={{ gap: "12px" }}
                >
                  <img src="images/users.png" alt="" />
                  Users
                </Typography>
                <Typography variant="h2">{userCount?.users}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          lg={3}
          md={6}
          sm={12}
          xs={12}
          className={classes.thirdBox}
        >
          <Grid container xs={12} className="subThirdBox">
            <Grid
              item
              xs={12}
              className="d-flex column border subUpperBox subBoxes"
            >
              <Typography variant="h6">Your Top Performing</Typography>
              <Typography variant="h3">Templates</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              className="d-flex column border alignstart subBoxes"
            >
              <Typography variant="body1">
                Hubspot for Small Business
              </Typography>
              <Box className="d-flex justify-space-between fullwidth">
                <Typography variant="h6" style={{ fontSize: "13px" }}>
                  1m:22s Video &nbsp; 42% &nbsp; CTR{" "}
                </Typography>
                <Box className="d-flex justify-end">
                  <Button style={{ minWidth: "35px" }} disabled>
                    View
                  </Button>
                  <Button style={{ minWidth: "35px" }} disabled>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              className="d-flex column border alignstart subBoxes"
            >
              <Typography variant="body1">Hubspot for Startups</Typography>
              <Box className="d-flex justify-space-between fullwidth">
                <Typography variant="h6" style={{ fontSize: "13px" }}>
                  HVO Page &nbsp; 26% &nbsp; CTR{" "}
                </Typography>
                <Box className="d-flex justify-end">
                  <Button style={{ minWidth: "35px" }} disabled>
                    View
                  </Button>
                  <Button style={{ minWidth: "35px" }} disabled>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              className="d-flex column border alignstart subBoxes"
            >
              <Typography variant="body1">Hubspot for Mid Market</Typography>
              <Box className="d-flex justify-space-between fullwidth">
                <Typography variant="h6" style={{ fontSize: "13px" }}>
                  1m:22s Video &nbsp; 42% &nbsp; CTR{" "}
                </Typography>
                <Box className="d-flex justify-end">
                  <Button style={{ minWidth: "35px" }} disabled>
                    View
                  </Button>
                  <Button style={{ minWidth: "35px" }} disabled>
                    Edit
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          lg={4}
          md={6}
          sm={12}
          xs={12}
          className={classes.firstChartBox}
        >
          <Box className="singleColBarBox">
            <Box className="d-flex column border subGraph1">
              <Box
                className={clsx(classes.border, "d-flex column")}
                style={{ gap: "4px", margin: "4px" }}
              >
                <Typography variant="h5">Your Best Month</Typography>
                <Typography variant="h2">5,840 Views</Typography>
              </Box>
              <Box
                className={clsx(classes.border, "d-flex column")}
                style={{ margin: "4px", height: "100%", padding: "10px" }}
              >
                <Box className="d-flex" style={{ gap: "12px" }}>
                  <img src="images/tranding.png" alt="" />
                  <Typography variant="body1">
                    Total Views within Total Active Media <br />
                    (Last 4 Months)
                  </Typography>
                </Box>
                <SingleColumnChartBar />
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          container
          lg={8}
          md={12}
          sm={12}
          xs={12}
          className={clsx(classes.secondChartBox)}
        >
          <Grid container xs={12} className={classes.border}>
            <Grid
              item
              lg={4}
              md={4}
              sm={4}
              xs={12}
              className="TotalContactBox d-flex column justify-space-between"
            >
              <Box
                className={clsx(
                  classes.border,
                  "d-flex",
                  "column",
                  "subSecondChartBox"
                )}
                pd={2}
              >
                <Typography variant="h5">Total Contacts</Typography>
                <Typography variant="h2">2,364</Typography>
                <Typography
                  variant="body1"
                  style={{ fontWeight: 500, textAlign: "center" }}
                >
                  1240 in Active Campaigns
                </Typography>
              </Box>
              <Box className={clsx(classes.border, "d-flex")}>
                <Typography variant="body1" style={{ textAlign: "center" }}>
                  Active media for up to{" "}
                  <span style={{ color: "#7DC371" }}> 1,260</span> <br />{" "}
                  <span style={{ display: "block", textAlign: "center" }}>
                    more contacts
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={12}>
              <Box
                className={classes.border}
                ml={"10px"}
                pb={"20px"}
                style={{ marginTop: "4px" }}
              >
                <SingleBarChart />
              </Box>
            </Grid>
          </Grid>

          <Grid container xs={12} className={classes.border}>
            <Grid
              item
              lg={4}
              md={4}
              sm={4}
              xs={12}
              className="TotalContactBox d-flex column justify-space-between"
              style={{ gap: "5px" }}
            >
              <Box
                className={clsx(
                  classes.border,
                  "d-flex",
                  "column",
                  "subSecondChartBox"
                )}
                pd={2}
              >
                <Typography variant="h6" style={{ fontWeight: "500" }}>
                  Average CTR
                </Typography>
                <Typography variant="h2">+37%</Typography>
                <Typography variant="body1">CTR (%)</Typography>
              </Box>
              <Box className={clsx(classes.border, "d-flex")}>
                <Typography variant="body1">
                  <span style={{ color: "#7DC371" }}>618 </span>HVOs |{" "}
                  <span style={{ color: "#7DC371" }}> 622 </span>Videos Active
                </Typography>
              </Box>
              <Box
                className="d-flex justify-start alignstart fullwidth"
                style={{ gap: "12px" }}
              >
                <Box className="d-flex column">
                  <Typography variant="body2" style={{ fontWeight: "400" }}>
                    Average
                  </Typography>
                  <Box
                    style={{
                      height: "19px",
                      width: "47px",
                      borderRadius: "4px",
                      background: "var(--blue, #0358AC)",
                    }}
                  ></Box>
                </Box>
                <Box className="d-flex column">
                  <Typography variant="body2" style={{ fontWeight: "400" }}>
                    Best
                  </Typography>
                  <Box
                    style={{
                      height: "19px",
                      width: "47px",
                      borderRadius: "4px",
                      background: "var(--green, #7DC371)",
                    }}
                  ></Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              sm={8}
              xs={12}
              style={{ marginTop: "5px" }}
            >
              <Box
                className={classes.border}
                ml={"10px"}
                pb={"26px !important"}
              >
                <GroupBarGraph />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NoProjects;
