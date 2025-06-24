import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/User";
import useGetAllUsers from "src/views/pages/CompanyUsers/Users/Hooks/useGetAllUsers";
import useViewAsUser from "./useViewAsUser"
import styles from "./TopBar.module.scss";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const TopBar = ({ onMobileNavOpen }) => {
  const history = useHistory();
  const user = useContext(UserContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isViewingAs, setIsViewingAs] = useState(
    sessionStorage.getItem("isViewingAs") === "true"
  );
  const [viewingUser, setViewingUser] = useState(
    isViewingAs ? JSON.parse(sessionStorage.getItem("slaveUser")) : null
  );

  const { getTemporaryToken } = useViewAsUser(); // Use API hook
  const { loading, error, data } = useGetAllUsers();

  // Handle user selection
  const handleUserSelect = async (selectedUser) => {
    toast.info(`Switching to ${selectedUser.first_name}...`);

    const {user_details, token} = await getTemporaryToken(selectedUser.id);
    if (!token) return; // Stop if token request failed

    // Store Master’s session before switching
    if (!isViewingAs) {
      sessionStorage.setItem("masterUser", JSON.stringify({
        email: localStorage.getItem("email"),
        userType: localStorage.getItem("userType"),
        token: localStorage.getItem("token"),
        _id: localStorage.getItem("_id"),
      }));
    }

    // Set Slave user session
    localStorage.setItem("email", selectedUser.email);
    localStorage.setItem("userType", user_details?.role);
    localStorage.setItem("_id", selectedUser.id);
    localStorage.setItem("token", token); // Use new token

    sessionStorage.setItem("slaveUser", JSON.stringify(selectedUser));
    sessionStorage.setItem("isViewingAs", "true");

    setIsViewingAs(true);
    setViewingUser(selectedUser);

    toast.success(`Now viewing as ${selectedUser.first_name}`);
    setDropdownOpen(false);
    history.push("/CreateTemplate"); // Redirect
  };

  // Handle stopping "View As"
  const handleStopViewing = () => {
    const masterUser = JSON.parse(sessionStorage.getItem("masterUser"));

    if (masterUser) {
      // Restore Master’s session
      localStorage.setItem("email", masterUser.email);
      localStorage.setItem("userType", masterUser.userType);
      localStorage.setItem("_id", masterUser._id);
      localStorage.setItem("token", masterUser.token);

      sessionStorage.removeItem("slaveUser");
      sessionStorage.removeItem("isViewingAs");
      sessionStorage.removeItem("masterUser");

      setIsViewingAs(false);
      setViewingUser(null);

      toast.info("Returned to Master account.");
      history.push("/dashboard"); // Redirect
    }
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.toolbar}>
        <div className={styles.hiddenLogo}>
          <button className={styles.menuButton} onClick={onMobileNavOpen}>
            <AiOutlineMenuUnfold className={styles.menuIcon} />
          </button>
          <h4 className={styles.pageTitle}>
            {isViewingAs ? `Viewing as ${viewingUser?.first_name}` : "Dashboard"}
          </h4>
        </div>

        {/* Right Section: User Info & "View As" */}
        <div className={styles.rightSection}>
        {!isViewingAs ? (
            <div className={styles.dropdownContainer}>
              <button
                className={styles.createButton}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                View As
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>Select a User</div>
                  {loading ? (
                    <div className={styles.loading}>Loading...</div>
                  ) : error ? (
                    <div className={styles.error}>Failed to load users</div>
                  ) : data?.length > 0 ? (
                    data.map((user) => (
                      <div
                        key={user.id}
                        className={styles.dropdownItem}
                        onClick={() => handleUserSelect(user)}
                      >
                        {user.first_name} {user.last_name}
                      </div>
                    ))
                  ) : (
                    <div className={styles.noTemplates}>No users available</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button className={styles.stopViewingButton} onClick={handleStopViewing}>
              Stop Viewing as {viewingUser?.first_name ?? viewingUser?.name}
            </button>
          )}
          {/* User Info */}
          <div className={styles.avatarBox}>
          <div className={styles.avatarContainer}>
  {loading || !user?.profileData?.profile_picture ? (
    <FaUserCircle className={styles.defaultAvatarIcon} />
  ) : (
    <img
      className={styles.avatar}
      src={user.profileData.profile_picture}
      alt="User Avatar"
      onError={(e) => (e.target.style.display = "none")}
    />
  )}
</div>
            <div className={styles.userDetails}>
              <span className={styles.accountType}>
                {isViewingAs ? "Viewing As User" : "Company Admin"}
              </span>
              <span className={styles.accountName}>
                {user?.profileData?.first_name} {user?.profileData?.last_name}
              </span>
            </div>
          </div>

          
        </div>
      </div>
    </nav>
  );
};

TopBar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
