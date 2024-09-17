import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import UserSingleColumnChart from "./UserSingleColumnChart";
import UserSingleBarGraph from "./UserSingleBarGraph";
import UserGroupBarGraph from "./UserGroupBarGraph";
import ListTable from "./ListTable";

// Custom styles
const useStyles = makeStyles((theme) => ({
  displayFlexColumn: {
    "& .border": {
      borderRadius: "8px",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      border: "1px solid var(--light-stroke, #ECECEC)",
      width: "100%",
      padding: "8px",
      "& .MuiTypography-body1": {
        color: "var(--grey, #858585)",
        fontWeight: "500",
      },
    },
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 12px 0 8px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
    "& .TotalUserBox": {
      padding: "8px",
      flexDirection: "column",
      alignItems: "flex-start",
      alignSelf: "stretch",
    },
  },
  secondBox: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "16px",
    },
    "& .subSecondBox": {
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      width: "100%",
      gridRowGap: "12px",
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
        minHeight: "90px",
        height: "auto",
        padding: "8px",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiTypography-h2": {
          color: "var(--black, #152F40)",
        },
        "& .MuiTypography-h3": {
          color: "var(--black, #152F40)",
        },
        "& .EnterpriseTxt": {
          color: "var(--blue, #0358AC)",
        },
      },
    },
  },
  thirdBox: {
    padding: "0px 6px",
    margin: "-8px -4px",
    [theme.breakpoints.down("md")]: {
      marginTop: "24px",
      padding: "0px 16px 0 6px",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0px",
      margin: "20px 0px",
    },

    "& .subThirdBox": {
      borderRadius: "8px",
      border: "1px solid var(--light-stroke, #ECECEC)",
      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
      width: "100%",
      padding: "8px",
      "& .border": {
        borderRadius: "8px",
        border: "1px solid var(--light-stroke, #ECECEC)",
        width: "100%",
        boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
        padding: "8px",
      },
      "& .subUpperBox": {
        marginBottom: "12px",
        "& .MuiTypography-h6 ": {
          color: "var(--grey, #858585)",
          fontWeight: "500",
        },
        "& .MuiTypography-h2 ": {
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
    padding: "8px",
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
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
      padding: "12px 14px 0px 0px",
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },

      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "14px 0px 0px 7px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0px",
      },
      "& .subGraph1": {
        gap: "8px",
        padding: "12px 12px",
      },
    },
  },
  secondChartBox: {
    color: "var(--grey, #858585)",
    "& .MuiTypography-h2": {
      color: "var(--black, #152F40)",
      lineHeight: "140%",
    },
    padding: "24px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 0px",
    },
    gridRowGap: "12px",
    "& .TotalContactBox": {
      "& .d-flex": {
        "& .MuiTypography-body1": {
          textAlign: "center",
        },
      },
      "& .subSecondChartBox": {
        gap: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: "10px",
      },
    },
  },
}));
// Functional component definition
const UserDashboard = () => {
  const classes = useStyles();
  return (
    <Box>
      <Grid container xs={12} justifyContent="space-between">
        <Grid
          container
          lg={4}
          md={6}
          sm={6}
          xs={12}
          className={classes.firstChartBox}
        >
          <Box className="singleColBarBox">
            <Box className="d-flex column border subGraph1">
              <Box
                className={clsx(classes.border, "d-flex column")}
                style={{ gap: "4px" }}
              >
                <Typography variant="h5">Your Best Month</Typography>
                <Typography variant="h2">5,840 Views</Typography>
              </Box>
              <Box className={clsx(classes.border, "d-flex column")}>
                <Box className="d-flex" style={{ gap: "12px" }}>
                  <img src="images/tranding.png" alt="" />
                  <Typography variant="body1">
                    Total Views within Total Active Media <br />
                    (Last 4 Months)
                  </Typography>
                </Box>
                <UserSingleColumnChart />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          lg={8}
          md={6}
          sm={6}
          xs={12}
          className={clsx(classes.secondChartBox)}
        >
          <Grid container xs={12} className={classes.border}>
            <Grid
              item
              lg={4}
              md={12}
              sm={12}
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
                <Typography variant="body1">
                  1240 in Active Campaigns
                </Typography>
              </Box>
              <Box className={clsx(classes.border, "d-flex")}>
                <Typography variant="body1">
                  Active media for up to{" "}
                  <span style={{ color: "#7DC371" }}> 1,260</span> more contacts
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
              <Box className={classes.border} ml={"10px"} pb={"20px"}>
                {/* <UserSingleBarGraph /> */}
              </Box>
            </Grid>
          </Grid>

          <Grid container md={12} sm={12} xs={12} className={classes.border}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box className={classes.border} ml={"10px"}>
                {/* <UserGroupBarGraph /> */}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ListTable />
    </Box>
  );
};

export default UserDashboard;
