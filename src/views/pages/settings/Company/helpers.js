export const EDITABLE_FIELDS = [
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

export const tableHeaders = {
  account_details: [
    { key: "accountName", label: "Account Name", editable: true },
    { key: "accountPhone", label: "Account Phone", editable: true },
    { key: "personaProAdmin", label: "SDRCloud Admin", editable: false },
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

export const displayNames = {
  account_details: "Account Details",
  contract_term: "Contract Term",
  create_account_admin: "Create Account Admin",
  contact_details: "Contract Details",
  account_colors_and_links: "Account Details",
  account_logo: "Account Logo",
  view_agreement: "View Agreement",
};

//Getting data fields that were changed to send
export const extractChangedFields = (changedFields, editedData) => {
  const changes = {};
  Object.keys(changedFields).forEach((section) => {
    if (Object.keys(changedFields[section]).length > 0) {
      Object.keys(changedFields[section]).forEach((key) => {
        changes[key] = editedData[section][key];
      });
    }
  });
  return changes;
};

export const updateChangedFields = (
  prevChangedFields,
  section,
  key,
  value,
  tenantData
) => {
  if (value !== tenantData[section][key]) {
    return {
      ...prevChangedFields,
      [section]: {
        ...prevChangedFields[section],
        [key]: true,
      },
    };
  } else {
    const updatedSection = { ...prevChangedFields[section] };
    delete updatedSection[key];

    if (Object.keys(updatedSection).length === 0) {
      const updatedChanges = { ...prevChangedFields };
      delete updatedChanges[section];
      return updatedChanges;
    }

    return {
      ...prevChangedFields,
      [section]: updatedSection,
    };
  }
};
