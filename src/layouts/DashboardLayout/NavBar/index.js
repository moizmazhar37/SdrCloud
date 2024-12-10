import React, { useEffect, useState, useContext } from "react";
import { useHistory, matchPath, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  Button,
  ListSubheader,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
} from "@material-ui/core";
import clsx from "clsx";
import { IoLogOutOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import NavItem from "./NavItem";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const DRAWER_WIDTH = 270;

const getNavSections = (userType) => {
  const sections = {
    ADMIN: [
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
    ],
    SUBADMIN: [
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
            title: "Leads",
            icon: "images/Leads.svg",
            href: "/leads",
            items: [
              {
                title: "Dashboard",
                href: "/leads-search",
              },
              {
                title: "Search Leads",
                href: "/leads-search",
              },
              {
                title: "Installations",
                href: "/leads",
              },
            ],
          },
          {
            title: "Create",
            icon: "images/template/play.svg",
            href: "/CreateTemplate",
          },
          {
            title: "Prospects",
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
    ],
    USER: [
      {
        items: [
          {
            title: "My Dashboard",
            icon: "images/template/dashboard.svg",
            href: "/user-dashboard",
          },
          {
            title: "My Prospects",
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
    ],
  };
  return sections[userType] || [];
};

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
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.04)",
    width: DRAWER_WIDTH,
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
  logoutContainer: {
    marginTop: "auto",
    marginBottom: 30,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    color: "#858585",
    "&:hover": {
      color: "#fff",
      background: "#032E61",
      paddingLeft: 60,
      paddingBottom: 20,
      paddingTop: 20,
      paddingRight: 65,
      borderRadius: "9px",
    },
  },
  navbarContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    padding: theme.spacing(4, 2),
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    maxHeight: 60,
    objectFit: "contain",
  },
  content: {
    flex: 1,
    overflowY: "auto",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    color: "#0358AC",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",

    "& .MuiListItemIcon-root": {
      minWidth: 36,
    },
    "& .MuiTypography-root": {
      flex: 1,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },
  },
  subNavList: {
    padding: 0,
    backgroundColor: "transparent",
    marginLeft: theme.spacing(7),
  },
  subNavItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    color: "#0358AC",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#00A1E036",
      color: "#032E61",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 24,
      marginRight: theme.spacing(1),
    },
  },
  listItemText: {
    "& .MuiTypography-root": {
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
    },
  },
  chevron: {
    transition: "transform 0.2s",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
}));

const NavBar = ({ onMobileClose, openMobile, drawerOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [sections, setSections] = useState([]);
  const [activeLeadsSection, setActiveLeadsSection] = useState(null);

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    setSections(getNavSections(userType));
  }, [userType]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("creatturAccessToken");
      history.push("/");
      auth.userLogIn(false, "");
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
      setShowLogoutDialog(false);
    }
  };

  const renderNavItems = ({ items, pathname, depth = 0 }) => (
    <List disablePadding>
      {items.map((item) => {
        const key = item.title + depth;
        const isActive = matchPath(pathname, { path: item.href, exact: true });

        if (item.items && item.title === "Leads") {
          const open = Boolean(isActive || activeLeadsSection === item.title);
          return (
            <NavItem
              key={key}
              depth={depth}
              icon={item.icon}
              info={item.info}
              open={open}
              title={item.title}
              onClick={() => setActiveLeadsSection(open ? null : item.title)}
            >
              <List className={classes.subNavList}>
                {item.items.map((subItem) => (
                  <ListItem
                    key={subItem.title}
                    className={classes.subNavItem}
                    onClick={() => {
                      history.push(subItem.href);
                      onMobileClose?.();
                    }}
                  >
                    <ListItemIcon>
                      <FaCircle
                        size={8}
                        color={
                          activeLeadsSection === item.title
                            ? "#032E61"
                            : "#0358AC"
                        }
                      />
                    </ListItemIcon>

                    <ListItemText>{subItem.title}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </NavItem>
          );
        }

        return (
          <NavItem
            key={key}
            depth={depth}
            href={item.href}
            icon={item.icon}
            info={item.info}
            title={item.title}
            style={{
              backgroundColor: isActive ? "#00A1E036" : "transparent",
              color: isActive ? "#032E61" : "#0358AC",
            }}
            onClick={() => {
              history.push(item.href);
              onMobileClose?.();
            }}
          />
        );
      })}
    </List>
  );

  const drawerContent = (
    <div className={classes.navbarContainer}>
      <div className={classes.logoContainer}>
        <img
          src="images/template/SDR.png"
          alt="SDR Logo"
          className={classes.logo}
        />
      </div>
      <div className={classes.content}>
        {sections.map((section, index) => (
          <List
            key={`menu${index}`}
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
      </div>
      <div className={classes.logoutContainer}>
        <Button
          className={classes.logoutButton}
          onClick={() => setShowLogoutDialog(true)}
        >
          <IoLogOutOutline />
          {drawerOpen && <div style={{ marginLeft: 8 }}>Logout</div>}
        </Button>
      </div>

      <Dialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        TransitionComponent={Slide}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h3" align="center">
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? <ButtonCircularProgress /> : "Confirm"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowLogoutDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{
            paper: clsx(
              classes.desktopDrawer,
              drawerOpen ? classes.drawerOpen : classes.drawerClose
            ),
          }}
          open
          variant="persistent"
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  drawerOpen: PropTypes.bool,
};

export default NavBar;
