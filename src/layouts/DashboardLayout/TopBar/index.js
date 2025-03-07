import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/User";
import styles from "./TopBar.module.scss";

const TopBar = ({ onMobileNavOpen, onDrawerAction }) => {
  const history = useHistory();
  const user = useContext(UserContext);
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();

  const confirmationLogoutHandler = () => {
    history.push("/");
  };

  useEffect(() => {
    const id = window.localStorage.getItem("token");
    if (!id) confirmationLogoutHandler();
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("PP-createaccount") || pathname.includes("/PP-create")) {
      setPageTitle("Accounts");
    } else if (pathname.includes("PP-user-management") || pathname.includes("edit-PPAdmin")) {
      setPageTitle("User Management");
    } else if (pathname.includes("pp-settings") || pathname.includes("/edit-profile") || pathname.includes("/company-setting")) {
      setPageTitle("Settings");
    } else if (pathname.includes("dashboard")) {
      setPageTitle("Dashboard");
    } else if (pathname.includes("companyUsers-List") || pathname.includes("viewuser")) {
      setPageTitle("Users");
    } else if (pathname.includes("CreateTemplate")) {
      setPageTitle("Create");
    } else if (pathname.includes("Myprojects") || pathname.includes("view-myproject") || pathname.includes("Edit-Myproject")) {
      setPageTitle("Prospects");
    }
  }, [location.pathname]);

  const userType = localStorage.getItem("userType");
  const userProfile = user?.profileData;

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.toolbar}>
        <div className={styles.hiddenLogo}>
          <button className={styles.menuButton} onClick={onMobileNavOpen}>
            <AiOutlineMenuUnfold className={styles.menuIcon} />
          </button>
          <h4 className={styles.pageTitle}>{pageTitle}</h4>
        </div>
        <div className={styles.avatarBox}>
          {userProfile?.profilePicture && (
            <img className={styles.avatar} src={userProfile.profilePicture} alt="User Avatar" />
          )}
          <div className={styles.userDetails}>
            <span className={styles.accountType}>
              {userType === "ADMIN" ? "PP Admin" :
               userType === "SUBADMIN" ? "Company Admin" :
               userType === "USER" ? "Company User" : ""}
            </span>
            <span className={styles.accountName}>
              {userProfile?.first_name?.length > 10 ? userProfile?.first_name.slice(0, 10) + "..." : userProfile?.first_name}
              {" "}
              {userProfile?.last_name?.length > 10 ? userProfile?.last_name.slice(0, 10) + "..." : userProfile?.last_name}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

TopBar.propTypes = {
  onMobileNavOpen: PropTypes.func,
  onDrawerAction: PropTypes.func,
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {},
  onDrawerAction: () => {},
};

export default TopBar;
