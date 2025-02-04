import React, { useState } from "react";
import Card from "src/Common/Card/Card";
import Table from "src/Common/Table/Table";
import useGetAllUsers from "./Hooks/useGetAllUsers";
import useDeleteUser from "./Hooks/useDeleteUser";
import AdduserImage from "src/images/AddUserImage.png";
import Dropdown from "src/Common/Dropdown/Dropdown";
import WarningModal from "src/Common/Modal/Modal";
import CreateUser from "./CreateUser/CreateUser";
import styles from "./Users.module.scss";
import Loader from "src/Common/Loader/Loader";

const Users = () => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isCreateUserOpen, setCreateUserOpen] = useState(false);
  const [viewState, setViewState] = useState("create");

  const { loading, error, data, refetch } = useGetAllUsers();
  const { deleteUser, isLoading: isDeleting } = useDeleteUser();

  const handleDelete = async () => {
    await deleteUser(selectedUserId, () => {
      setDeleteOpen(false);
      setSelectedUserId(null);
      refetch();
    });
  };

  const handleCreateUserSuccess = () => {
    setCreateUserOpen(false);
    refetch();
  };

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
      label: "Delete",
      onClick: (userId) => {
        setSelectedUserId(userId);
        setDeleteOpen(true);
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
  ];

  const transformedData = (data || []).map((user) => ({
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
        image={AdduserImage}
        onClick={() => {
          setViewState("create");
          setCreateUserOpen(true);
        }}
        text={"Add User"}
      />
      <div>
        {loading ? (
          <div>
            .<Loader />
          </div>
        ) : error ? (
          <div>Error loading users</div>
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
        message="Please be aware that this action is irreversible. By clicking the 'Delete' button below, you will permanently remove the user from the system. This means you will not be able to retrieve or restore it in the future."
      />

      <CreateUser
        isOpen={isCreateUserOpen}
        onClose={() => setCreateUserOpen(false)}
        onSuccess={handleCreateUserSuccess}
        userId={selectedUserId}
        viewState={viewState}
      />
    </div>
  );
};

export default Users;
