import React, { useState } from "react";
import Card from "src/Common/Card/Card";
import Table from "src/Common/Table/Table";
import AdduserImage from "src/images/AddUserImage.png";
import Dropdown from "src/Common/Dropdown/Dropdown";
import WarningModal from "src/Common/Modal/Modal";
import styles from "./Accounts.module.scss";
import Loader from "src/Common/Loader/Loader";
import useFetchAccounts from "./hooks"; // Import the Axios hook

const Accounts = () => {
  const { data, loading, error } = useFetchAccounts();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isCreateUserOpen, setCreateUserOpen] = useState(false);
  const [viewState, setViewState] = useState("create");

  const handleDelete = async () => {
    console.log(`Deleting user with ID: ${selectedUserId}`);
  };

  const handleCreateUserSuccess = () => {
    setCreateUserOpen(false);
  };

  const headers = [
    { label: "Account Name", key: "user_name" },
    { label: "SDRCloud Admin", key: "pp_admin" },
    { label: "Users", key: "users" },
    { label: "Account Creation Date", key: "created_at" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  const dropdownOptions = [
    {
      label: "View",
      onClick: (userId) => {
        setSelectedUserId(userId);
        setViewState("edit");
        setCreateUserOpen(true);
      },
    },
    {
      label: "Edit",
      onClick: (userId) => {
        setSelectedUserId(userId);
        setViewState("edit");
        setCreateUserOpen(true);
      },
    },
    {
      label: "Block",
      onClick: (userId) => {
        setSelectedUserId(userId);
        setDeleteOpen(true);
      },
    },
  ];

  const transformedData = data.map((user) => ({
    ...user,
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
        image={AdduserImage}
        onClick={() => {
          setViewState("create");
          setCreateUserOpen(true);
        }}
        text={"Create New Account"}
      />
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div>Error loading users: {error}</div>
        ) : (
          <Table headers={headers} data={transformedData} />
        )}
      </div>

      <WarningModal
        isOpen={isDeleteOpen}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedUserId(null);
        }}
        onDelete={handleDelete}
        message="This action is irreversible. Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default Accounts;
