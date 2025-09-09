import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "src/Common/Card/Card";
import Table from "src/Common/Table/Table";
import AdduserImage from "src/images/AddUserImage.png";
import Dropdown from "src/Common/Dropdown/Dropdown";
import WarningModal from "src/Common/Modal/Modal";
import ViewAdminModal from "src/Common/ViewAdminModal/ViewAdminModal";
import styles from "./Accounts.module.scss";
import Loader from "src/Common/Loader/Loader";
import useFetchAccounts from "./hooks";
import useGetSubAdminData from "./Hooks/useGetSubAdminData";
import useUpdateSubAdmin from "./Hooks/useUpdateSubAdmin";

const Accounts = () => {
  const { data, loading, error } = useFetchAccounts();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isCreateUserOpen, setCreateUserOpen] = useState(false);
  const [viewState, setViewState] = useState("create");
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [adminModalMode, setAdminModalMode] = useState("view");
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useGetSubAdminData(selectedUserId);

  const {
    updateSubAdmin,
    loading: updateLoading,
    error: updateError,
  } = useUpdateSubAdmin();

  const history = useHistory();

  const handleDelete = async () => {
    console.log(`Deleting user with ID: ${selectedUserId}`);
  };

  const handleCreateUserSuccess = () => {
    setCreateUserOpen(false);
  };

  const handleCreateUserClick = () => {
    setCreateUserOpen(true);
    setViewState("create");
  };

  const handleEditUserClick = () => {
    setCreateUserOpen(true);
    setViewState("edit");
  };

  const handleViewUserClick = () => {
    setCreateUserOpen(true);
    setViewState("view");
  };

  const openAdminModal = (user, mode) => {
    setSelectedUserId(user.id);
    setSelectedUser(user);
    setAdminModalMode(mode);
    setAdminModalOpen(true);
  };

  useEffect(() => {
    if (userData && isAdminModalOpen) {
      setSelectedUser(userData);
    }
  }, [userData, isAdminModalOpen]);

  const handleSaveAdminData = async (updatedData) => {
    if (!selectedUserId) return;

    try {
      // The selectedUserId will be included in the payload by the hook
      await updateSubAdmin(selectedUserId, updatedData);
      console.log("Updated admin data:", updatedData);
      setAdminModalOpen(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    if (isCreateUserOpen) {
      history.push("/pp-create", { state: { viewState } });
    }
  }, [isCreateUserOpen, viewState, history]);

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
      onClick: (userId, userData) => {
        setSelectedUserId(userId);
        openAdminModal(userData, "view");
      },
    },
    {
      label: "Edit",
      onClick: (userId, userData) => {
        setSelectedUserId(userId);
        openAdminModal(userData, "edit");
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
          onClick: () => option.onClick(user.id, user),
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

      <ViewAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          setSelectedUserId(null);
        }}
        userData={userData || selectedUser}
        viewMode={adminModalMode}
        onSave={handleSaveAdminData}
        isLoading={userDataLoading || updateLoading}
        error={userDataError || updateError}
      />
    </div>
  );
};

export default Accounts;
