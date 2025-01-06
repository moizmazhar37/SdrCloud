import React from 'react';
import Card from "../../settings/Card/Card";
import Table from "src/Common/Table/Table";
import useGetAllUsers from "./Hooks/useGetAllUsers";
import AdduserImage from "src/images/AddUserImage.png";
import Dropdown from "src/Common/Dropdown/Dropdown";

const Users = () => {
  const { loading, error, data } = useGetAllUsers();

  // Define table headers
  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Created At", key: "created_at" },
    { label: "Projects", key: "projects" },
    { label: "Actions", key: "actions" }
  ];

  // Define dropdown options for the Actions column
  const dropdownOptions = [
    {
      label: "Delete",
      onClick: () => {
        console.log("deleted");
      },
    },
  ];

  // Transform the data to include the dropdown in each row
  const transformedData = data?.map(user => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleDateString(),
    actions: <Dropdown options={dropdownOptions} />
  }));

  return (
    <div>
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