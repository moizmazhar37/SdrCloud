import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import SheetDetails from "./SheetDetails";
import styles from "./sheet-details.module.scss";
import { useGoogleSheetTypes, useSaveGoogleSheetTypes } from "./hooks";
import FullScreenLoader from "src/component/FullScreenLoader";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import { hvoTypes, videoTypes } from "./types";

function EditGoogleSheet() {
  const location = useLocation();
  const { sheetId } = location.state || {}
  
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const { data, loading, error } = useGoogleSheetTypes(sheetId);
  const {
    saveSheetTypes,
    loading: saving,
    error: saveError,
  } = useSaveGoogleSheetTypes();

  const sheetData = data?.headers_with_data_types;
  const viewData = data?.google_sheet_response;
  const type = data?.google_sheet_response?.sheet_type;

  useEffect(() => {
    if (type === "HVO") {
      setDropdownData(hvoTypes);
    } else if (type === "VIDEO") {
      setDropdownData(videoTypes);
    }
  }, [type]);

  useEffect(() => {
    if (sheetData) {
      setUpdatedData(
        sheetData.map((item) => ({
          value: item.value,
          dataType: item.dataType || "",
        }))
      );
    }
  }, [sheetData]);

  const handleDropdownChange = (value, newType) => {
    setUpdatedData((prev) =>
      prev.map((item) =>
        item.value === value ? { ...item, dataType: newType } : item
      )
    );
  };

  const handleEditToggle = async () => {
    isEditing && (await saveSheetTypes(sheetId, updatedData));
    setIsEditing((prevState) => !prevState);
  };

  const navs = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
  ];

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className={styles.breadcrumbNav}>
        <DynamicNavigator items={navs} />{" "}
      </div>
      <Formik
        initialValues={{
          data: updatedData || [],
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitted values:", values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <SheetDetails viewData={viewData} />
            </div>

            {/* ------------------- Right Column Table ----------------- */}
            <div className={styles.rightColumn}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>
                      Column Headers: Fields
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={handleEditToggle}
                        disabled={saving}
                      >
                        {isEditing ? (saving ? "Saving..." : "Save") : "Edit"}
                      </button>
                    </th>
                  </tr>
                </thead>
                <div className={styles.RowsContainer}>
                  <div className={styles.dropdownRow}>
                    <td className={styles.column}>
                      {updatedData.map((item) => (
                        <div
                          key={item.value}
                          className={styles.dropdownContainer}
                        >
                          <p className={styles.title}>{item.value}</p>
                          <select
                            className={styles.dropdown}
                            disabled={!isEditing}
                            value={item.dataType}
                            onChange={(e) =>
                              handleDropdownChange(item.value, e.target.value)
                            }
                          >
                            <option disabled value="">
                              Select DataType
                            </option>
                            {dropdownData.map((typeOption) => (
                              <option key={typeOption} value={typeOption}>
                                {typeOption}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </td>
                  </div>
                </div>
              </table>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default EditGoogleSheet;
