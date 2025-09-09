import React, { useState, useEffect } from "react";
import styles from "./Company.module.scss";
import CompanyTable from "./CompanyTable/CompanyTable";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useCompanyTenant from "./Hooks/useCompanyTenant";
import useUpdateTenant from "./Hooks/useUpdateTenant";
import {
  EDITABLE_FIELDS,
  tableHeaders,
  displayNames,
  extractChangedFields,
  updateChangedFields,
} from "./helpers";

const Company = () => {
  const { data: tenantData, loading, error } = useCompanyTenant();
  const {
    updateTenant,
    loading: saving,
    error: saveError,
    success,
  } = useUpdateTenant();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    if (tenantData) {
      setEditedData(tenantData);
    }
  }, [tenantData]);
  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Company", route: "/company-information" },
  ];
  const handleEditClick = async () => {
    if (isEditing) {
      const changes = extractChangedFields(changedFields, editedData);

      if (Object.keys(changes).length > 0) {
        await updateTenant(changes);
      }

      setChangedFields({});
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (section, key, value) => {
    if (!EDITABLE_FIELDS.includes(key)) return;

    setEditedData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));

    setChangedFields((prev) =>
      updateChangedFields(prev, section, key, value, tenantData)
    );
  };

  const handleFileUpload = (file) => {
    if (file) {
      setEditedData((prev) => ({
        ...prev,
        account_logo: {
          ...prev.account_logo,
          uploadLogo: file,
        },
      }));

      setChangedFields((prev) => ({
        ...prev,
        account_logo: {
          uploadLogo: true,
        },
      }));

      console.log("File selected for upload:", file);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer}>
        <DynamicNavigator items={navigationItems} />
        <button className={styles.editButton} onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className={styles.companyContainer}>
        {Object.keys(tenantData).map((section) => (
          <CompanyTable
            key={section}
            heading={displayNames[section]}
            headers={tableHeaders[section]}
            data={editedData[section]}
            isEditing={isEditing}
            onInputChange={(key, value) =>
              handleInputChange(section, key, value)
            }
            onFileUpload={handleFileUpload}
          />
        ))}
      </div>
    </div>
  );
};

export default Company;
