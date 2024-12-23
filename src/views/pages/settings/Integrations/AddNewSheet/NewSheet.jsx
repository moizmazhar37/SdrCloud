import React, { useState } from "react";
import { useGetAllUsers, useFetchSheet } from "./hooks";
import DynamicNavigator from "../../../../../Common/DynamicNavigator/DynamicNavigator";
import styles from "./newSheet.module.scss";
import { toast } from "react-toastify";

const NewSheet = () => {
  const { data: users, loading: usersLoading, error: usersError } = useGetAllUsers();
  const { fetchSheet, loading: sheetLoading } = useFetchSheet();

  const [sheetName, setSheetName] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetType, setSheetType] = useState("VIDEO");
  const [assignedUser, setAssignedUser] = useState("");

  const handleFetch = async () => {
    if (!sheetName || !sheetUrl || !assignedUser) {
      toast.error("Please fill out all fields.");
      return;
    }

    const payload = {
      rangeName: sheetName,
      sheetUrl: sheetUrl,
      sheetType: sheetType,
      assignedUser: assignedUser,
    };

    try {
      const responseData = await fetchSheet(payload);
      toast.success("Successfully connected to Google Sheet");
      console.log("API Response:", responseData);
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Error fetching sheet.");
    }
  };
  const routes = [
    { text: 'Settings', route: '/settings' },
    { text: 'Integration', route: '/integrations' },
    { text: 'Google Sheet', route: '/googlesheets' },
    { text: 'Create New', route: '/create-new' },
  ];

  return (
    <>
    <DynamicNavigator items={routes}/>
    <div className={styles.container}>
      {(usersLoading || sheetLoading) && <div>Loading...</div>}
      {usersError && <div>Error loading users: {usersError.message}</div>}

      <div className={styles.field}>
        <div className={styles.label}>Select User</div>
        <div className={styles.select}>
          <select
            defaultValue=""
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option value="" disabled>
              Select a User
            </option>
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.label}>Select Sheet Type</div>
        <div className={styles.select}>
          <select
            value={sheetType}
            onChange={(e) => setSheetType(e.target.value)}
          >
            <option value="VIDEO">VIDEO</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.label}>Google Sheet Name</div>
        <input
          placeholder="Enter SDRCloud.ai Sheet Name"
          className={styles.input}
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
        />
        <div className={styles.error}>
          {sheetName.length === 0 || sheetName.length > 150
            ? "Sheet name is required and must be between 1 and 150 characters long."
            : null}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.label}>Google Sheet URL</div>
        <div className={styles.inputWithButton}>
          <input
            placeholder="Enter SDRCloud.ai Sheet URL"
            className={styles.input}
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
          />
          <button className={styles.button} onClick={handleFetch}>
            Fetch
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewSheet;
