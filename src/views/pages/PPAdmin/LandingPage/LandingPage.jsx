import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Table from "src/Common/Table/Table";
import styles from "./LandingPage.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const history = useHistory();

  const headers = [
    { label: "Account Name", key: "user_name" },
    { label: "SDRCloud Admin", key: "pp_admin" },
    { label: "Users", key: "users" },
    { label: "Account Creation Date", key: "created_at" },
    { label: "Status", key: "status" },
  ];

  const dummyData = [
    { id: 1, user_name: "Adnan Khattak", pp_admin: "Admin A", users: 12, created_at: new Date().toISOString(), status: "Active" },
    { id: 2, user_name: "Jane Smith", pp_admin: "Admin B", users: 8, created_at: new Date().toISOString(), status: "Inactive" },
    { id: 3, user_name: "Robert Brown", pp_admin: "Admin C", users: 20, created_at: new Date().toISOString(), status: "Active" },
    { id: 4, user_name: "Emily Johnson", pp_admin: "Admin A", users: 5, created_at: new Date().toISOString(), status: "Active" },
    { id: 5, user_name: "Michael Lee", pp_admin: "Admin D", users: 15, created_at: new Date().toISOString(), status: "Inactive" },
    { id: 6, user_name: "Sarah Kim", pp_admin: "Admin B", users: 9, created_at: new Date().toISOString(), status: "Active" },
    { id: 7, user_name: "Daniel Garcia", pp_admin: "Admin C", users: 17, created_at: new Date().toISOString(), status: "Pending" },
    { id: 8, user_name: "Olivia Martinez", pp_admin: "Admin D", users: 3, created_at: new Date().toISOString(), status: "Inactive" },
    { id: 9, user_name: "William Clark", pp_admin: "Admin A", users: 10, created_at: new Date().toISOString(), status: "Active" },
    { id: 10, user_name: "Sophia Walker", pp_admin: "Admin B", users: 7, created_at: new Date().toISOString(), status: "Pending" },
  ];

  const handleUserNameClick = (userName) => {
    try {
      const role = localStorage.getItem("userType");

      if (!role) {
        console.error("Role", role);
        toast.error("User not found.");
        return;
      }

      if (role === "ADMIN") {
        history.push("/dashboard");
      } else {
        toast.warning("You are not authorized to access the dashboard.");
      }
    } catch (err) {
      console.error("Navigation Error:", err);
      toast.error("Navigation Error.");
    }
  };

  const transformedData = dummyData.map((user) => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleDateString(),
    user_name: (
      <span
        className={styles.usernameLink}
        onClick={() => handleUserNameClick(user.user_name)}
      >
        {user.user_name}
      </span>
    ),
  }));

  return (
    <div className={styles.container}>
      <Table headers={headers} data={transformedData} />
    </div>
  );
};

export default LandingPage;