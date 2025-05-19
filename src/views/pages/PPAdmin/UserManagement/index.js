import React, { useState } from "react";
import Card from "src/Common/Card/Card";
import Table from "src/Common/Table/Table";
import AddUserImage from "src/images/AddUserImage.png";
import Dropdown from "src/Common/Dropdown/Dropdown";
import styles from "./PPuserlist.module.scss";
import AddUser from "src/views/pages/PPAdmin/AddUser/AddUser";

const PPuserlist = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const headers = [
    { label: "Full Name", key: "full_name" },
    { label: "Email", key: "email" },
    { label: "Created At", key: "created_at" },
    { label: "Projects", key: "projects" },
    { label: "Active", key: null },
    { label: "Error", key: null },
    { label: "Actions", key: "actions" },
  ];

  const dropdownOptions = [
    {
      label: "Add Tenant",
      onClick: (userId) => {
        // Do nothing upon clicking
        console.log("Add Tenant clicked for user:", userId);
      },
    },
  ];

  // Dummy data for the table
  const dummyData = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      created_at: "2024-01-15T10:30:00Z",
      projects: 5,
      active: true,
      error: false,
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      created_at: "2024-02-20T14:15:00Z",
      projects: 3,
      active: true,
      error: false,
    },
    {
      id: 3,
      first_name: "Mike",
      last_name: "Johnson",
      email: "mike.johnson@example.com",
      created_at: "2024-03-10T09:45:00Z",
      projects: 7,
      active: false,
      error: true,
    },
    {
      id: 4,
      first_name: "Sarah",
      last_name: "Williams",
      email: "sarah.williams@example.com",
      created_at: "2024-04-05T16:20:00Z",
      projects: 2,
      active: true,
      error: false,
    },
    {
      id: 5,
      first_name: "David",
      last_name: "Brown",
      email: "david.brown@example.com",
      created_at: "2024-05-01T11:10:00Z",
      projects: 4,
      active: true,
      error: false,
    },
  ];

  const transformedData = dummyData.map((user) => ({
    ...user,
    full_name: `${user.first_name} ${user.last_name}`,
    created_at: new Date(user.created_at).toLocaleDateString(),
    actions: (
      <Dropdown
        options={dropdownOptions.map((option) => ({
          ...option,
          onClick: () => option.onClick(user.id),
        }))}
      />
    ),
  }));

  return (
    <div className={styles.container}>
      <Card
        image={AddUserImage}
        onClick={() => {
          setShowPopup(true)
          console.log("Add User card clicked");
        }}
        text={"Add User"}
      />
      <div>
        <Table headers={headers} data={transformedData} />
      </div>
      <AddUser show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default PPuserlist;
