import React from 'react';
import Card from "../../settings/Card/Card";
import Table from "src/Common/Table/Table";
import useGetAllUsers from "./Hooks/useGetAllUsers";
import AdduserImage from "src/images/AddUserImage.png";
import Dropdown from "src/Common/Dropdown/Dropdown";
import styles from "./Users.module.scss"

const Users = () => {
  const { loading, error, data } = useGetAllUsers();


  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Created At", key: "created_at" },
    { label: "Projects", key: "projects" },
    { label: "Actions", key: "actions" }
  ];

  const dropdownOptions = [
    {
      label: "Delete",
      onClick: () => {
        console.log("deleted");
      },
    },
  ];

  const transformedData = (data || []).map(user => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleDateString(),
    actions: <Dropdown options={dropdownOptions} />
  }));

  return (
    <div className={styles.Container}>
      <Card
        image={AdduserImage}
        onClick={() => {
          console.log("Clicked");
        }}
        text={"Add User"}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading users</div>
      ) : (
        <Table
          headers={headers}
          data={transformedData}
        />
      )}
    </div>
  );
};

export default Users;
