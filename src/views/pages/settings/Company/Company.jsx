import React, { useState, useEffect } from "react";
import styles from "./Company.module.scss";
import CompanyTable from "./CompanyTable/CompanyTable";
import useCompanyTenant from "./Hooks/useCompanyTenant";

const Company = () => {
  const { data: tenantData, loading, error } = useCompanyTenant();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [changedFields, setChangedFields] = useState({});

  const EDITABLE_FIELDS = [
    "accountName",
    "accountPhone",
    "adminFirstName",
    "adminLastName",
    "accountAdminPhone",
    "primaryColor",
    "secondaryColor",
    "bookDemoUrl",
    "redirectUrl",
    "uploadLogo",
  ];

  const tableHeaders = {
    account_details: [
      { key: "accountName", label: "Account Name", editable: true },
      { key: "accountPhone", label: "Account Phone", editable: true },
      { key: "personaProAdmin", label: "PersonaPro Admin", editable: false },
    ],
    contract_term: [
      { key: "contractDate", label: "Contract Date", editable: false },
      { key: "contractTerm", label: "Contract Term", editable: false },
      { key: "contractEndDate", label: "Contract End Date", editable: false },
    ],
    create_account_admin: [
      { key: "adminFirstName", label: "Admin First Name", editable: true },
      { key: "adminLastName", label: "Admin Last Name", editable: true },
      {
        key: "accountAdminEmail",
        label: "Account Admin Email",
        editable: false,
      },
      {
        key: "accountAdminPhone",
        label: "Account Admin Phone",
        editable: true,
      },
    ],
    contact_details: [
      { key: "customerType", label: "Customer Type", editable: false },
      { key: "userCount", label: "User Count", editable: false },
      { key: "mediaCredits", label: "Media Credits", editable: false },
      { key: "activeMediaLimit", label: "Active Media Limit", editable: false },
    ],
    account_colors_and_links: [
      { key: "primaryColor", label: "Primary Color", editable: true },
      { key: "secondaryColor", label: "Secondary Color", editable: true },
      { key: "bookDemoUrl", label: "Book Demo URL", editable: true },
      { key: "redirectUrl", label: "Redirect URL", editable: true },
    ],
    account_logo: [
      {
        key: "uploadLogo",
        label: "Upload Logo",
        editable: true,
        type: "file",
      },
    ],
    view_agreement: [
      {
        key: "viewAgreement",
        label: "View Agreement",
        type: "pdf",
      },
    ],
  };

  const displayNames = {
    account_details: "Account Details",
    contract_term: "Contract Term",
    create_account_admin: "Create Account Admin",
    contact_details: "Contract Details",
    account_colors_and_links: "Account Details",
    account_logo: "Account Logo",
    view_agreement: "View Agreement",
  };

  useEffect(() => {
    if (tenantData) {
      setEditedData(tenantData);
    }
  }, [tenantData]);

  const handleEditClick = () => {
    if (isEditing) {
      const changes = {};
      Object.keys(changedFields).forEach((section) => {
        if (Object.keys(changedFields[section]).length > 0) {
          changes[section] = {};
          Object.keys(changedFields[section]).forEach((key) => {
            changes[section][key] = editedData[section][key];
          });
        }
      });

      if (Object.keys(changes).length > 0) {
        console.log("Changed fields:", changes);
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

    if (value !== tenantData[section][key]) {
      setChangedFields((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: true,
        },
      }));
    } else {
      setChangedFields((prev) => {
        const updatedSection = { ...prev[section] };
        delete updatedSection[key];

        if (Object.keys(updatedSection).length === 0) {
          const updatedChanges = { ...prev };
          delete updatedChanges[section];
          return updatedChanges;
        }

        return {
          ...prev,
          [section]: updatedSection,
        };
      });
    }
  };

  const handleFileUpload = (file) => {
    if (file) {
      setEditedData((prev) => ({
        ...prev,
        account_logo: {
          ...prev.account_logo,
          uploadLogo: URL.createObjectURL(file),
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
  if (error) return <div>Error: {error}</div>;
  if (!tenantData) return <div>No data available</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer}>
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
