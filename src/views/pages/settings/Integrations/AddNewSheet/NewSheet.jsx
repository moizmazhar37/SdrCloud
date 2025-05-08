import React, { useState } from "react";
import { useGetAllUsers, useFetchSheet, useFetchSheetNames } from "./hooks";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import styles from "./newSheet.module.scss";
import { toast } from "react-toastify";
import FullScreenLoader from "src/component/FullScreenLoader";
import { useHistory } from "react-router-dom";

const NewSheet = () => {
  const { data: users, loading: usersLoading } = useGetAllUsers();
  const { fetchSheet, loading: sheetLoading } = useFetchSheet();
  const { fetchnames, loading1, error1 } = useFetchSheetNames();

  const [sheetName, setSheetName] = useState("");
  const [sheetOptions, setSheetOptions] = useState([]);
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [sheetData, setSheetData] = useState(null); // Optional: store returned data
  const [sheetType, setSheetType] = useState("VIDEO");
  const [assignedUser, setAssignedUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const history = useHistory();

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
      toast.success("Connected to Google Sheet successfully.");
      console.log("API Response:", responseData);
      history.push({
        pathname: "/editSheets",
        state: { sheetId: responseData.id },
      });
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Error fetching sheet.");
    }
  };

  const handleModalFetchNames = async () => {
    if (!sheetId) {
      console.warn("Sheet ID is missing or invalid.");
      toast.error(
        "Sheet ID is missing or invalid. Please check your Google Sheet link."
      );
      setIsModalOpen(false);
      return;
    }

    try {
      const data = await fetchnames(sheetId);
      toast.success("Google Sheet names are fetched.");
      setSheetData(data);
      setSheetOptions(data); // Array of sheet names
    } catch (err) {
      console.error("❌ Failed to fetch sheet tabs.");
      toast.error("Failed to fetch sheet tabs. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    if (!sheetUrl) {
      toast.error("Please enter a Google Sheet URL.");
      return;
    }
    setIsModalOpen(true);
  };

  const routes = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Google Sheet", route: "/googlesheets" },
    { text: "Create New", route: "/create-new" },
  ];

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setSheetUrl(url);
    // Try to extract Google Sheet ID
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      setSheetId(match[1]); // Set the extracted ID
    } else {
      setSheetId(""); // fallback if not a valid URL
    }
  };

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
          <div className={styles.label}>Google Sheet URL</div>
          <div className={styles.inputWithButton}>
            <input
              placeholder="Enter SDRCloud.ai Sheet URL"
              className={styles.input}
              value={sheetUrl}
              onChange={handleUrlChange}
            />
            <button className={styles.button} onClick={handleOpenModal}>
              Fetch names
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Select Sheet</div>
          <div className={styles.inputWithButton}>
            <div className={styles.select}>
              <select
                defaultValue=""
                onChange={(e) => setSheetName(e.target.value)}
                disabled={sheetOptions.length === 0}
              >
                <option value="" disabled>
                  Select a sheet name
                </option>
                {sheetOptions &&
                  sheetOptions.map((sheet, index) => (
                    <option key={index} value={sheet}>
                      {sheet}
                    </option>
                  ))}
              </select>
            </div>
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
              account{" "}
              <span className={styles.highlight}>
                sa-for-gsp@sdr-cloud-441006.iam.gserviceaccount.com
              </span>{" "}
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
                onClick={handleModalFetchNames}
                disabled={!isCheckboxChecked}
              >
                Fetch Names
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewSheet;
