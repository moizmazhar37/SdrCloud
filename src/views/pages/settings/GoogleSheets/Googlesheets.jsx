import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FullScreenLoader from "../../../../component/FullScreenLoader";
import Dropdown from "../../../../Common/Dropdown/Dropdown";
import styles from "./googlesheets.module.scss";

import useGoogleSheetsData from "./hooks";

function GoogleSheets() {
  const { data, loading, error } = useGoogleSheetsData();
  if (loading) {
    return <FullScreenLoader />;
  }
  console.log(data);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backNavigators}>
          <FontAwesomeIcon icon={faArrowLeft} color="#0358AC" />
          <div className={styles.navigationText}>
            <p>Settings</p>/ <p>Integration</p>/{" "}
            <p style={{ color: "#0358AC" }}>Google Sheet</p>
          </div>
        </div>
        <button>Create New Gooogle Sheet Connection</button>
      </div>
    </>
  );
}

export default GoogleSheets;
