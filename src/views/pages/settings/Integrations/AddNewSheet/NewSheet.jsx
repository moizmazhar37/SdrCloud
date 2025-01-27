import React, { useState } from "react";
import { useGetAllUsers, useFetchSheet } from "./hooks";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import styles from "./newSheet.module.scss";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";

const NewSheet = () => {
  const { data: users, loading: usersLoading } = useGetAllUsers();
  const { fetchSheet, loading: sheetLoading } = useFetchSheet();

  const [sheetName, setSheetName] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetType, setSheetType] = useState("VIDEO");
  const [assignedUser, setAssignedUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleFetch = async () => {
    if (!sheetName || !sheetUrl || !assignedUser) {
      toast.error("Please fill out all fields.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalFetch = async () => {
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
    } finally {
      setIsModalOpen(false);
    }
  };

  const routes = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Google Sheet", route: "/googlesheets" },
    { text: "Create New", route: "/create-new" },
  ];

  return (
    <>
      <DynamicNavigator items={routes} />
      <div className={styles.container}>
        {(usersLoading || sheetLoading) && <FullScreenLoader />}

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
              <option value="HVO">HVO</option>
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

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Confirm Fetch</h2>
            <p className={styles.modalMessage}>
              Please make sure that you have shared the sheet with our service
              account <span className={styles.highlight}>sa-for-gsp@sdr-cloud-441006.iam.gserviceaccount.com</span>{" "}
              with write access so we can connect with your sheet.
            </p>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="edit-access-checkbox"
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
              <label htmlFor="edit-access-checkbox">
                Yes, I have shared the sheet with edit access.
              </label>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.button}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={styles.button}
                onClick={handleModalFetch}
                disabled={!isCheckboxChecked}
              >
                Fetch
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewSheet;
