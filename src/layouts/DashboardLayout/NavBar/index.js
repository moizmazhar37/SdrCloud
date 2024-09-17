import React, { useEffect, useState, useContext } from "react";
import { useHistory, matchPath, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography,
  Button,
  ListSubheader,
} from "@material-ui/core";
import { Dialog, DialogContent, DialogActions, Slide } from "@material-ui/core";
import clsx from "clsx";
import { FaSignOutAlt } from "react-icons/fa";
import NavItem from "./NavItem";
import PerfectScrollbar from "react-perfect-scrollbar";
import { UserContext } from "src/context/User";
import { AuthContext } from "src/context/Auth";
import { IoLogOutOutline } from "react-icons/io5";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { UserLogoContext } from "src/context/UserLogoContext";
const drawerWidth = 260;

const sectionsBelow = [
  {
    items: [],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}
const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 290,
    background: theme.palette.background.taf,
  },
  desktopDrawer: {
    width: "100%",
    maxWidth: 270,
    top: 0,
    height: "100%",
    "&.MuiDrawer-paperAnchorDockedLeft": {
      borderRight: "none !Important",
    },
  },

  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: `${theme.palette.text.primary} !important`,
    "&:hover": {
      color: "#0358AC !important",
    },
  },
  Terms: {
    color: theme.palette.text.primary,
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    borderLeft: "solid 8px transparent",
    borderRadius: 0,
    color: "#858585",
    fontSize: "16px",
    marginleft: "10px",
    paddingBottom: "15px",
    "& .MuiButton-label": {
      padding: "10px",
    },
    "& svg": {
      fontSize: "25px",
      marginLeft: "0px",
      marginRight: "10px",
    },
    "&:hover": {
      "& .MuiButton-label": {
        color: "#fff !important",
        background: "#3A96DD",
        padding: "10px",
        borderRadius: "9px",
        fontWeight: theme.typography.fontWeightRegular,
        "& $title": {
          fontWeight: theme.typography.fontWeightMedium,
        },
        "& $icon": {
          color: "#0358AC !important",
        },
      },
    },
    "&.depth-0": {
      "& $title": {
        fontWeight: 400,
      },
    },
  },

  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  secondDiv: {
    display: "flex",
    gap: "10px",
    padding: "12px 19px",
  },
  innerBox: {
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    alignItems: "center",
    padding: "40px 20px 0px",
    justifyContent: "center",
  },

  arrowimage: {
    marginLeft: "auto",

    cursor: "pointer",
  },

  profilediv: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  paul: {
    margin: "0",
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "500",
    color: "white",
  },

  online: {
    margin: "0",
    fontSize: "9px",
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#50CD89",
  },
  onlineul: {
    margin: "0",
    paddingLeft: "17px",
    color: "#50CD89",
    fontSize: "9px",
  },

  logout: {
    margin: "0",
    color: "#ffff",
    marginLeft: "4px",
    cursor: "pointer",
  },
  navbarContainer: {
    height: "auto",
    maxHeight: "100%",

    "& .MuiDivider-root": {
      backgroundColor: "#3F4254",
    },
  },
  profileView: {
    width: "100%",
    maxWidth: "50px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    width: drawerWidth,
    borderRight: "1px solid #EFEFEF",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  logoutBtn: {
    "& .MuiButton-containedPrimary": {
      "&:hover": {
        backgroundColor: "var(--blue, #0358AC)",
        color: "#fff !important",
      },
    },
  },
  scroll: {
    height: "inherit",
    overflowY: "scroll",
  },
  sidebarlladmin: {
    height: "calc(100vh - 180px)",
    marginTop: "0px",
  },
  sidebarllsubadmin: {
    height: "calc(100vh - 215px)",
  },
}));

const NavBar = ({ onMobileClose, openMobile, drawerOpen }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userlogo, setUserLogo] = useState("");
  const { userLogo, fetchUserLogo } = useContext(UserLogoContext);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const user = useContext(UserContext);
  const profile = user.profileData;
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [sections, setSections] = useState([]);

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    let newSections = [];
    const userType = localStorage.getItem("userType");

    if (userType === "ADMIN") {
      newSections = [
        {
          items: [
            {
              title: "Accounts",
              icon: "images/template/profile-tick.png",
              href: "/PP-createaccount",
            },
            {
              title: "User Management",
              icon: "images/template/document.svg",
              href: "/PP-user-management",
            },
            {
              title: "Settings",
              icon: "images/template/setting.svg",
              href: "/pp-settings",
            },
          ],
        },
      ];
    } else if (userType === "SUBADMIN") {
      newSections = [
        {
          items: [
            {
              title: "Dashboard",
              icon: "images/template/dashboard.svg",
              href: "/dashboard",
            },
            {
              title: "Users",
              icon: "images/usersnew.png",
              href: "/companyUsers-List",
            },
            {
              title: "Create",
              icon: "images/template/play.svg",
              href: "/CreateTemplate",
            },
            {
              title: "Projects",
              icon: "images/template/clipboard-text.svg",
              href: "/Myprojects",
            },
            {
              title: "Settings",
              icon: "images/template/setting.svg",
              href: "/settings",
            },
          ],
        },
      ];
    } else if (userType === "USER") {
      newSections = [
        {
          items: [
            {
              title: "My Dashboard",
              icon: "images/template/dashboard.svg",
              href: "/user-dashboard",
            },
            {
              title: "My Project",
              icon: "images/template/clipboard-text.svg",
              href: "/myprojects-list",
            },
            {
              title: "Settings",
              icon: "images/template/setting.svg",
              href: "/user-settings",
            },
          ],
        },
      ];
    }

    setSections(newSections);
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      if (!openMobile) {
        onMobileClose();
      }
    }
  }, [openMobile, onMobileClose]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const displayConfirmationPopup = () => {
    setShowConfirmation(true);
  };

  const hideConfirmationPopup = () => {
    setShowConfirmation(false);
  };

  const logout = async () => {
    setLoader(true);
    localStorage.removeItem("token");
    localStorage.removeItem("creatturAccessToken");
    history.push("/");
    auth.userLogIn(false, "");
    toast.success("Logged out successfully.");
  };
  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.getcompanydetails,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.status === 200) {
        setLoading(false);
        setUserLogo(res?.data?.data?.accountLogo);
      } else if (res?.data?.status === 205) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.data?.message);
      setLoading(false);
    }
  };
  // const fetchUserLogo = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios({
  //       method: "GET",
  //       url: ApiConfig.getuserlogo,
  //       headers: {
  //         token: `${localStorage.getItem("token")}`,
  //       },
  //     });
  //     if (res?.data?.status === 200) {
  //       setLoading(false);
  //       setUserLogo(res?.data?.data?.accountLogo);
  //     } else if (res?.data?.status === 205) {
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //     toast.error(error?.data?.message);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchCompanyData();
    // fetchUserLogo();
  }, []);

  const content = (
    <Box className={classes.navbarContainer}>
      <Box
        height="auto"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box className={classes.innerBox}>
          <div className={classes.container}>
            {drawerOpen ? (
              <>
                <img
                  src={userLogo}
                  alt=""
                  width="100%"
                  style={{
                    width: "100%",
                    maxHeight: "80px",
                    objectFit: "contain",
                  }}
                />
              </>
            ) : (
              <>
                <img
                  src={userlogo}
                  alt=""
                  width="100%"
                  style={{
                    width: "100%",
                    maxWidth: "170px",
                    marginTop: "14px",
                    marginLeft: "13px",
                    marginRight: "6px",
                  }}
                />
              </>
            )}
          </div>

          {showConfirmation && (
            <Dialog
              maxWidth="xs"
              fullWidth
              open={showConfirmation}
              TransitionComponent={Transition}
              onClose={() => setShowConfirmation(false)}
              keepMounted
            >
              <DialogContent>
                <Box align="center">
                  <Typography variant="h3">
                    Are you sure want to Logout?
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Box mt={2} className={classes.logoutBtn}>
                  <Button variant="outlined" color="secondary" onClick={logout} style={{ width: "100px" }}>
                    {isLoading === false ? (
                      "Confirm"
                    ) : (
                      <ButtonCircularProgress />
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "5px", width: "100px" }}
                    onClick={hideConfirmationPopup}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          )}

          <Box
            style={{ marginLeft: "-11px" }}
            my={3}
            className={
              userType === "ADMIN"
                ? classes.sidebarlladmin
                : classes.sidebarllsubadmin
            }
          >
            {sections?.map((section, i) => (
              <List
                className="scroll"
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location?.pathname,
                })}
              </List>
            ))}
            <Button
              onClick={displayConfirmationPopup}
              className={classes.Terms}
            >
              <IoLogOutOutline />
              {drawerOpen ? "Logout" : ""}
            </Button>
            <Box style={{ height: "100px !important" }}></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile && open}
          variant="temporary"
          style={{ overflowY: "scroll" }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
          style={{ overflowY: "scroll" }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
