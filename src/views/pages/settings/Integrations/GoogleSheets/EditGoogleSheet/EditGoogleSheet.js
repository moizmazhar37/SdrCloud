import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import SheetDetails from "./SheetDetails";
import styles from "./sheet-details.module.scss"
import { useGoogleSheetTypes } from "./hooks";
import FullScreenLoader from "src/component/FullScreenLoader";

function EditGoogleSheet(props) {
  const sheetid = `4ead857f-45b0-450a-973f-7685e11c418d`
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  const hvoTypes = [
    "Image URL",
    "Logo",
    "Customer organization",
    "First name",
    "Last name",
    "Screenshot from URL",
    "Text",
    "URL",
    "Email (Required)",
    "Error (Required)",
    "HVO URL (Required)",
    "Status (Required)"
  ];

  const videoTypes = [
    "Customer id (Required)",
    "Customer organization (Required)",
    "Dynamic URL",
    "First name (Required)",
    "Last name",
    "Image URL",
    "Static URL",
    "Text",
    "Video URL",
    "Email (Required)",
    "Error (Required)",
    "Final video URL (Required)",
    "Status (Required)"
  ];


  const { data, loading, error } = useGoogleSheetTypes(sheetid);
  const sheetData = data?.headers_with_data_types
  const viewData = data?.google_sheet_response;


  return (
    <>
      {loading && <FullScreenLoader />}

      <div className={styles.breadcrumbNav}>
        <span className={styles.headText}>Settings /</span>
        <span className={styles.headText}>Integrations /</span>
        <span className={styles.headText}>Google Sheets /</span>
        <span className={styles.fallbackText}>Sheet Details</span>
      </div>

      <Formik
        // initialValues={viewdata}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        <Form>
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <SheetDetails viewData = {viewData} />
            </div>

            <div className={styles.rightColumn}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>
                      Column Headers: Fields
                      <button
                        className={styles.editButton}
                        onClick={handleEditToggle}
                      >
                        {isEditing ? "Disable Editing" : "Enable Editing"}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.dropwdrownrow}>
                    <td className={styles.column}>
                      {sheetData?.map((item) => (
                        <div key={item.value} className={styles.dropdownContainer}>
                          <p className={styles.title}>{item.value}</p>
                          <select
                            className={styles.dropdown}
                            disabled={!isEditing}
                          >
                            <option value={item.value}>
                              {item.dataType || "No DataType"}
                            </option>
                          </select>
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default EditGoogleSheet;
