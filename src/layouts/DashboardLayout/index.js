import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { useLocation } from "react-router-dom";
import SettingsContext from "src/context/SettingsContext";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ffffff",
    height: "100%",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
  },

  wrapper: {
    overflow: "hidden",
    position: "relative",
    minHeight: "calc(100vh - 70px)",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 271,
      width: "calc(100% - 271px)",
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  wrapper2: {
    overflow: "hidden",
    position: "relative",
    minHeight: "calc(100vh - 70px)",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 70,
      width: "calc(100% - 70px)",
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },

  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "30px 15px 25px 13px",

    [theme.breakpoints.down("md")]: {
      padding: "30px 15px 25px 13px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 13px 15px 13px",
    },
    "@media(max-width:400px)": {
      padding: "15px 5px 15px 5px",
    },
  },
}));

const DashboardLayout = ({ children }) => {
  const themeSeeting = React.useContext(SettingsContext);
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [themeChange, seThemeChange] = useState("");
  useEffect(() => {
    const activeTheme = themeSeeting?.themekey?.theme;
    seThemeChange(activeTheme);
  }, [themeSeeting?.themekey?.theme]);
  return (
    <div className={classes.root}>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        drawerOpen={drawerOpen}
      />
      <div
        className={clsx({
          [classes.wrapper]: drawerOpen,
          [classes.wrapper2]: !drawerOpen,
        })}
      >
        <TopBar
          onMobileNavOpen={() => setMobileNavOpen(true)}
          onDrawerAction={() => {
            setDrawerOpen(!drawerOpen);
          }}
        />
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
