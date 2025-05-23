import React, { useEffect, useState, useContext } from "react";
import { useHistory, matchPath, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import "./Navbar.css";

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
            href: "/settings",
          },
        ],
      },
    ],
    SDRC_ADMIN: [
      {
        items: [
          {
            title: "Companies",
            icon: "images/template/dashboard.svg",  
            href: "/SDRC-dashboard",
          },
          {
            title: "Settings",
            icon: "images/template/dashboard.svg",  
            href: "/settings",
          },
        ]
      }
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
            title: "Visitors",
            icon: "images/Leads.svg",
            href: "/leads",
            items: [
              {
                title: "Dashboard",
                href: "/leads-dashboard",
              },
              {
                title: "Search Visitors",
                href: "/leads-search",
              },
              {
                title: "Installation",
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

    MARKETING_USER: [
      {
        items: [
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
        ]
        }
      ],
    SALES_USER: [
      {
        items: [
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
  };
  return sections[userType] || [];
};

const NavBar = ({ onMobileClose, openMobile, drawerOpen, onToggleDrawer }) => {
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

        if (item.items && item.title === "Visitors") {
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
              style={{ marginLeft: 18, marginTop: 12 }}
            >
              <List className="sub-nav-list">
                {item.items.map((subItem) => (
                  <ListItem
                    key={subItem.title}
                    className="sub-nav-item"
                    onClick={() => {
                      history.push(subItem.href);
                      onMobileClose?.();
                    }}
                  >
                    <ListItemIcon>
                      <FaChevronRight size={12} color="#0358AC" />
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
    <div className="navbar-container">
      <div className="logo-container">
        <img src="images/template/SDR.png" alt="SDR Logo" className="logo" />
      </div>
      <div className="content-nav">
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
      <div
        className={`logout-container ${
          drawerOpen ? "drawer-open" : "drawer-closed"
        }`}
      >
        <Button
          className="logout-button-nav"
          fullWidth
          onClick={() => setShowLogoutDialog(true)}
        >
          <IoLogOutOutline size={24} />
          {drawerOpen && <span className="logout-text">Logout</span>}
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
      {/* Mobile Drawer */}
      <Hidden lgUp>
        <Drawer
          anchor="left"
          className="mobile-drawer"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Desktop Drawer */}
      <Hidden mdDown>
        <Drawer
          anchor="left"
          className={clsx(
            "desktop-drawer",
            drawerOpen ? "drawer-open" : "drawer-close"
          )}
          open={drawerOpen}
          variant="persistent"
          PaperProps={{
            style: {
              width: drawerOpen ? DRAWER_WIDTH : 0,
              transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            },
          }}
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
  onToggleDrawer: PropTypes.func,
};

export default NavBar;
