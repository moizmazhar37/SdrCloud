import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  SvgIcon,
  Box,
  Typography,
  Avatar,
} from "@material-ui/core";
import { AiOutlineMenuUnfold } from "react-icons/ai";

import { Menu as MenuIcon } from "react-feather";
import { TopBarData } from "src/layouts/HomeLayout/TopBar";
import { useHistory, useLocation } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { UserContext } from "../../../context/User";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "transparent",
  },
  toolbar: {
    background: "transparent !important",
    height: "60px",
    padding: "12px 29px 12px 0",
    width: "100%",
    "& svg": {
      fontSize: "25px ",
    },
    "& .hiddenlogo": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "16px",
      gap: "10px",
      "@media (max-width: 1280px)": {
        gap: "5px",
        marginLeft: "8px",
      },
      "@media (min-width: 960px) and (max-width: 1280px)": {
        gap: "5px",
        marginLeft: "14px",
      },
      "@media (max-width: 400px)": {
        gap: "0px",
        marginLeft: "3px",
      },
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  navbarContainer: {
    "@media(min-width:1280px)": {},
    "& .MuiPaper-elevation4 ": {
      boxShadow: "none !important",
    },
    "& .MuiPaper-root": {
      boxShadow: "none !important",
    },
    "& .MuiAppBar-positionFixed": {
      right: "auto",
    },
    "& h4": {
      color: "#152F40",
      fontWeight: 600,
    },
    "& .avatarBox": {
      gap: "10px",
      marginRight: "15px",
      [theme.breakpoints.down("sm")]: {
        marginRight: "23px",
      },
      "@media(max-width:400px)": {
        marginRight: "15px",
      },
      "& .svgBox": {
        background: "#F2F7FF",
        padding: "10px",
        borderRadius: "50px",
        cursor: "pointer",
        "& svg": {
          fontSize: "24px ",
        },
      },
      "& .MuiAvatar-root": {
        width: "44px",
        height: "44px",
      },
      "& .MuiTypography-body2": {
        color: "#858585",
        fontWeight: 400,
      },
      "& .MuiTypography-body1": {
        fontFamily: " Inter",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "16.8px",
        color: "#858585 !important",
      },
      "& .accounttype": {
        fontFamily: " Inter",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "16.8px",
        color: "#858585 !important",
      },
      "& .accountname": {
        fontFamily: " Inter",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "19.6px !important",
        color: "#152F40 !important",
      },
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, onDrawerAction, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  console.log(user, "ipweri");
  const [open, setOpen] = React.useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pageTitle1, setPageTitle1] = useState("");
  const [pageTitle2, setPageTitle2] = useState("");
  const location = useLocation();
  const confirmationLogouthandler = () => {
    history.push("/");
  };
  useEffect(() => {
    const id = window.localStorage.getItem("token");
    if (!id) {
      confirmationLogouthandler();
    }
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    if (
      pathname.includes("PP-createaccount") ||
      pathname.includes("/PP-create")
    ) {
      setPageTitle("Accounts");
    } else if (
      pathname.includes("PP-user-management") ||
      pathname.includes("edit-PPAdmin")
    ) {
      setPageTitle("User Management");
    } else if (
      pathname.includes("pp-settings") ||
      pathname.includes("/edit-profile") ||
      pathname.includes("/company-setting")
    ) {
      setPageTitle("Settings");
    }
  }, [location.pathname]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("dashboard")) {
      setPageTitle1("Dashboard");
    } else if (pathname.includes("companyUsers-List")) {
      setPageTitle1("Users");
    } else if (pathname.includes("CreateTemplate")) {
      setPageTitle1("Create");
    } else if (pathname.includes("Myprojects")) {
      setPageTitle1("Prospects");
    } else if (pathname.includes("view-myproject")) {
      setPageTitle1("Prospects");
    } else if (pathname.includes("Edit-Myproject")) {
      setPageTitle1("Prospects");
    } else if (pathname.includes("userProfile")) {
      setPageTitle1("Settings");
    }
  }, [location.pathname]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("dashboard")) {
      setPageTitle2("Dashboard");
    } else if (
      pathname.includes("companyUsers-List") ||
      pathname.includes("viewuser")
    ) {
      setPageTitle2("Users");
    } else if (
      pathname.includes("CreateTemplate") ||
      pathname.includes("createtemplate&Video") ||
      pathname.includes("preview-video") ||
      pathname.includes("Create-hvo-template")
    ) {
      setPageTitle2("Create");
    } else if (
      pathname.includes("Myprojects") ||
      pathname.includes("View-Myprojects") ||
      pathname.includes("error-list") ||
      pathname.includes("user-myprojects") ||
      pathname.includes("view-myproject")
    ) {
      setPageTitle2("Prospects");
    } else if (
      pathname.includes("settings") ||
      pathname.includes("viewSheets") ||
      pathname.includes("company-information") ||
      pathname.includes("integrations") ||
      pathname.includes("intent") ||
      pathname.includes("myprofile")
    ) {
      setPageTitle2("Settings");
    }
  }, [location.pathname]);
  return (
    <nav className={classes.navbarContainer} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Box
          width={"100%"}
          className="d-flex justify-space-between"
          style={{ marginTop: "29px", flexWrap: "wrap" }}
        >
          <div className="hiddenlogo">
            <Hidden lgUp>
              <IconButton
                color="#FF2626"
                onClick={onMobileNavOpen}
                style={{ marginRight: 10 }}
              >
                <SvgIcon fontSize="large">
                  <AiOutlineMenuUnfold />
                </SvgIcon>
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerAction}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <SvgIcon fontSize="large">
                  <AiOutlineMenuUnfold style={{ color: "#152F40" }} />
                </SvgIcon>
              </IconButton>
            </Hidden>
            {localStorage.getItem("userType") === "ADMIN" ? (
              <Typography variant="h4" style={{ fontSize: "21px" }}>
                {pageTitle}
              </Typography>
            ) : localStorage.getItem("userType") === "SUBADMIN" ? (
              <Typography variant="h4" style={{ fontSize: "21px" }}>
                {" "}
                {pageTitle2}
              </Typography>
            ) : localStorage.getItem("userType") === "USER" ? (
              <Typography variant="h4">{pageTitle1}</Typography>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex avatarBox">
            {localStorage.getItem("userType") === "ADMIN" ? (
              <Avatar src={user?.profileData?.profilePicture}></Avatar>
            ) : localStorage.getItem("userType") === "SUBADMIN" ? (
              <Avatar src={user?.profileData?.adminProfileImage}></Avatar>
            ) : localStorage.getItem("userType") === "USER" ? (
              <Avatar src={user?.profileData?.profilePicture}></Avatar>
            ) : (
              ""
            )}
            <div className="d-flex column alignstart">
              {localStorage.getItem("userType") === "ADMIN" ? (
                <Typography ClassName="accounttype">PP Admin</Typography>
              ) : localStorage.getItem("userType") === "SUBADMIN" ? (
                <Typography ClassName="accounttype">Company Admin</Typography>
              ) : localStorage.getItem("userType") === "USER" ? (
                <Typography ClassName="accounttype">Company User</Typography>
              ) : (
                ""
              )}
              <Typography className="accountname" style={{ marginTop: "2px" }}>
                {user?.profileData?.firstName &&
                user?.profileData?.firstName.length > 10
                  ? user?.profileData?.firstName.slice(0, 10) + "..."
                  : user?.profileData?.firstName}{" "}
                {user?.profileData?.lastName &&
                user?.profileData?.lastName.length > 10
                  ? user?.profileData?.lastName.slice(0, 10) + "..."
                  : user?.profileData?.lastName}
              </Typography>
            </div>
          </div>
        </Box>
      </Toolbar>
    </nav>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
  onDrawerAction: () => {},
};

export default TopBar;
