import React, { useState } from "react";
import Card from "src/Common/Card/Card";
import Table from "src/Common/Table/Table";
import AddUserImage from "src/images/AddUserImage.png";
import Dropdown from "src/Common/Dropdown/Dropdown";
import Loader from "src/Common/Loader/Loader";
import useGetSdrcAdmins from "./Hooks/useGetSdrcAdmins";
import styles from "./PPuserlist.module.scss";
import AddUser from "src/views/pages/PPAdmin/AddUser/AddUser";
import AssignTenants from "../Accounts/AssignTenants/AssignTenants";

const PPuserlist = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAssignTenants, setShowAssignTenants] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const { data, loading, error } = useGetSdrcAdmins();

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone_no" },
    { label: "Created At", key: "created_at" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  const handleAssignTenant = (userData) => {
    setSelectedUserData(userData);
    setShowAssignTenants(true);
  };

  const dropdownOptions = [
    {
      label: "View",
      onClick: (userData) => {
        console.log("Assign Tenant clicked for user:", userData.id);
        handleAssignTenant(userData);
      },
    },
  ];

  // Transform API data to include the actions dropdown
  const transformedData = data
    ? data.map((user) => ({
        ...user,
        // Format the date to be more readable
        created_at: new Date(user.created_at).toLocaleDateString(),
        actions: (
          <Dropdown
            options={dropdownOptions.map((option) => ({
              ...option,
              onClick: () => option.onClick(user),
            }))}
          />
        ),
      }))
    : [];

  // If AssignTenants view is shown, render it as a full page
  if (showAssignTenants) {
    return <AssignTenants isFromUserList={true} userData={selectedUserData} />;
  }

  return (
    <div className={styles.container}>
      <Card
        image={AddUserImage}
        onClick={() => {
          setShowPopup(true);
          console.log("Add User card clicked");
        }}
        text={"Add User"}
      />
      <div>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <Table headers={headers} data={transformedData} />
        )}
      </div>
      <AddUser show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default PPuserlist;
