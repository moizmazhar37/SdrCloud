import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import SheetDetails from "./SheetDetails";
import styles from "./sheet-details.module.scss";
import {
  useGoogleSheetTypes,
  useSaveGoogleSheetTypes,
} from "./useGetAllSheets";
import FullScreenLoader from "src/component/FullScreenLoader";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import { hvoTypes, videoTypes } from "./types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditGoogleSheet() {
  const location = useLocation();
  const { sheetId } = location.state || {};

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
          column: item.column,
          trigger_field: Boolean(item.trigger_field || item.trigger_fields),
        }))
      );
    }
  }, [sheetData]);

  const handleDropdownChange = (value, newType) => {
    setUpdatedData((prev) =>
      prev.map((item) =>
        item.value === value
          ? { ...item, dataType: newType, column: item.column }
          : item
      )
    );
  };

  const handleTriggerChange = (value, isEnabled) => {
    setUpdatedData((prev) =>
      prev.map((item) =>
        item.value === value ? { ...item, trigger_field: isEnabled } : item
      )
    );
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      const requiredFields = getRequiredFields(type);
      const selectedFields = updatedData.map((item) => item.dataType);
      const missingFields = getMissingRequiredFields(
        requiredFields,
        selectedFields
      );

      if (missingFields.length > 0) {
        notifyMissingFields(missingFields);
        return;
      }

      await saveSheetTypes(sheetId, updatedData);
    }

    setIsEditing((prevState) => !prevState);
  };

  // --- Helper Functions ---

  const getRequiredFields = (type) => {
    let baseRequired =
      type === "HVO"
        ? hvoTypes.filter((t) => t.includes("(Required)"))
        : videoTypes.filter((t) => t.includes("(Required)"));
    return baseRequired;
  };

  const getMissingRequiredFields = (required, selected) => {
    return required.filter((field) => !selected.includes(field));
  };

  const notifyMissingFields = (missingFields) => {
    missingFields.forEach((field) => {
      const msg = `Please select required field: ${field}`;
      console.error(msg);
      toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  const navs = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Google Sheet", route: "/googlesheets" },
  ];

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className={styles.breadcrumbNav}>
        <DynamicNavigator items={navs} />
      </div>
      <Formik
        initialValues={{
          data: updatedData || [],
        }}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitted values:", values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <SheetDetails viewData={viewData} type={type} />
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeader}>
                        <span className={styles.headerTitle}>
                          Column Headers: Fields
                        </span>
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
                  <tbody className={styles.tableBody}>
                    {updatedData.map((item, index) => (
                      <tr key={item.value} className={styles.row}>
                        <td className={styles.column}>
                          <div className={styles.fieldContainer}>
                            <div className={styles.fieldRow}>
                              <div className={styles.dropdownContainer}>
                                <p className={styles.title}>
                                  {item.value}
                                  {getRequiredFields(type).includes(item.value) && (
                                    <span style={{ color: 'red' }}> Required</span>
                                  )}
                                </p>
                                <select
                                  className={styles.dropdown}
                                  disabled={!isEditing}
                                  value={item.dataType}
                                  onChange={(e) =>
                                    handleDropdownChange(
                                      item.value,
                                      e.target.value
                                    )
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
                              <div className={styles.triggerContainer}>
                                <span
                                  className={`${styles.triggerLabel} ${
                                    index !== 0 ? styles.triggerLabelWhite : ""
                                  }`}
                                >
                                  Trigger
                                </span>

                                <div className={styles.toggleSwitch}>
                                  <input
                                    type="checkbox"
                                    id={`trigger-${item.value}`}
                                    className={styles.toggleInput}
                                    disabled={!isEditing}
                                    checked={Boolean(item.trigger_field)}
                                    onChange={(e) =>
                                      handleTriggerChange(
                                        item.value,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`trigger-${item.value}`}
                                    className={styles.toggleLabel}
                                  >
                                    <span
                                      className={styles.toggleSlider}
                                    ></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </>
  );
}

export default EditGoogleSheet;
