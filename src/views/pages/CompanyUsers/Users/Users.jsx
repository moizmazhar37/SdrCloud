import React, { useState } from 'react';
import Card from '../../settings/Card/Card';
import Table from 'src/Common/Table/Table';
import useGetAllUsers from './Hooks/useGetAllUsers';
import useDeleteUser from './Hooks/useDeleteUser';
import AdduserImage from 'src/images/AddUserImage.png';
import Dropdown from 'src/Common/Dropdown/Dropdown';
import WarningModal from 'src/Common/Modal/Modal';
import styles from './Users.module.scss';

const Users = () => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  const { loading, error, data, refetch } = useGetAllUsers();
  const { deleteUser, isLoading: isDeleting } = useDeleteUser();

  const handleDelete = async () => {
    await deleteUser(selectedUserId, () => {
      setDeleteOpen(false);
      setSelectedUserId(null);
      refetch();
    });
  };

  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Created At", key: "created_at" },
    { label: "Projects", key: "projects" },
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
  ];

  const transformedData = (data || []).map((user) => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleDateString(),
    actions: (
      <Dropdown 
        options={dropdownOptions.map(option => ({
          ...option,
          onClick: () => option.onClick(user.id)
        }))} 
      />
    ),
  }));

  return (
    <div className={styles.container}>
      <Card
        image={AdduserImage}
        onClick={() => {
          console.log("Clicked");
        }}
        text={"Add User"}
      />
      <div>
        {loading ? (
          <div>Loading...</div>
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
    </div>
  );
};

export default Users;