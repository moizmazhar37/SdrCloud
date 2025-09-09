import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Box,
  makeStyles,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import ApiConfig from "../../config/APIConfig";

const useStyles = makeStyles((theme) => ({
  myProjectsNav: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    "@media(max-width:979px)": {
      gap: "12px",
    },
  },
  leftBox: {
    "& h4": {
      color: "#3F4254",
    },
  },
  rightBox: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    "@media(max-width:768px)": {
      flexDirection: "column",
    },

    "@media(max-width:979px)": {
      flexBasis: "100%",
    },
  },
  searchTextfield: {
    marginTop: "0px !important",
    "& .MuiFormControl-root": {
      marginTop: "0px !important",
    },
  },
  darkBtn: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#181C32",
    fontSize: "14px",
    fontWeight: "600 !important",
    fontFamily: "Inter",
    color: "#fff",
    width: "100%",
    whiteSpace: "nowrap",
    maxWidth: "109px",
    "@media(max-width:979px)": {
      maxWidth: "100%",
    },
    "@media(max-width:380px)": {
      padding: "7px",
      fontSize: "12px",
    },
  },
  icon: {
    backgroundColor: "#555a78 !important",
    borderRadius: "6px 6px 6px 0",
  },
  middleDiv: {
    display: "flex",
    alignItems: "center",
    flexBasis: "45%",
    gap: "12px",
    "@media(max-width:979px)": {
      flexBasis: "100%",
    },
    "& .MuiOutlinedInput-root": {
      background: "rgba(36, 39, 60, 0.20) !important",
    },
    "& .MuiInputAdornment-positionStart": {
      marginrightBox: "0px",
    },
  },
  navbarContainer: {
    "@media(min-width:1280px)": {
      paddingLeft: "270px",
    },
  },
  hamburgerIcon: {
    "@media and screen (min-width:1280px)": {
      display: "none",
    },
  },
  loaderCss: {
    width: 15,
    height: 15,
    borderRadius: "50%",
    border: "3px solid rgb(0,0,0)",
    borderTopColor: "transparent",
    animationName: "$spin",
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbarContainer} {...rest}>
      <TopBarData />
    </nav>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => { },
};

export default TopBar;

export function TopBarData() {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);
  const pathname = location?.pathname;
  const [targetExists, setTargetExists] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  //rightBox sidedrawer logic
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  const handleDrawerClose = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const getGlobalSearchHandler = async () => {
    const token = localStorage.getItem("token");
    try {
      const params = {
        page: user.page,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await axios({
        method: "GET",
        url: ApiConfig.globalSearch,
        headers: {
          token: token,
        },
        params: params,
      });

      if (response.data.responseCode === 200) {
        user.updateSearchResults(response.data.result.docs);
        user.updatePagesCount(response.data.result.pages);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getGlobalSearchHandler();
    }
  }, [searchQuery, user.page]);

  useEffect(() => {
    const targetElement = document.getElementById("targetElement");
    setTargetExists(!targetElement);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const userType = localStorage.getItem("USER");
  return (
    <>
      <Grid md={2} className={classes.hamburgerIcon}></Grid>
      <Box className={classes.myProjectsNav}>
        <Box className={classes.leftBox}>
          <Typography variant="h4">
            {window.location.pathname === "/dashboard"
              ? "Dashboard"
              : window.location.pathname === "/my-projects"
                ? "My Projects"
                : window.location.pathname === "/all-projects"
                  ? "All Projects"
                  : window.location.pathname === "/settings"
                    ? "Settings"
                    : null}
          </Typography>
          <Box display="flex" alignItems="center">
            <img src="images/home.svg" alt="home icon" />
            &nbsp;
            <img src="images/forwardArrow.svg" alt="forward Arrow" />
            &nbsp;
            <Typography
              variant="body2"
              color="secondary"
              style={{ fontWeight: "600" }}
            >
              {window.location.pathname === "/my-projects"
                ? "My Projects"
                : window.location.pathname === "/all-projects"
                  ? "All Projects"
                  : user.value
                    ? user.value
                    : null}
            </Typography>
          </Box>
        </Box>

        {user.isTargetComponentVisited ? (
          <div className={classes.middleDiv}>
            <TextField
              className={classes.searchTextfield}
              variant="outlined"
              placeholder="Search by name or email"
              onKeyUp={user.handleKeyUp}
              value={user.searchUser}
              onChange={(e) => user.updateSearchUser(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon className={classes.searchIcon} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        ) : (
          <div className={classes.middleDiv}>
            <TextField
              className={classes.searchTextfield}
              variant="outlined"
              placeholder="Search by organisation or prospect name"
              onKeyUp={user.handleKeyUp}
              value={userType ? user.searchUser : searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                user.updateSearchUser(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon className={classes.searchIcon} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
        <Box className={classes.rightBox}>
          <Button
            variant="contained"
            color="primary"
            disabled={user.loading || user.allData?.length === 0}
            fullWidth
            style={{ whiteSpace: "pre" }}
            onClick={() => setOpen(true)}
          >
            Create Video{user.loading && <div className={classes.loaderCss}></div>}
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            style={{ whiteSpace: "pre" }}
            endIcon={<AddIcon className={classes.icon} />}
            onClick={handleDrawerOpen}
          >
            New Organization
          </Button>
        </Box>
      </Box>


    </>
  );
}
