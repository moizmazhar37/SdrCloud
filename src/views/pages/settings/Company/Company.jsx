import React from "react";
import styles from "./Company.module.scss";

import CompanyTable from "./CompanyTable/CompanyTable";

const Company = () => {
  const companyData = {
    account_details: {
      accountName: "Hubspot",
      accountPhone: "(937) 313-4466",
      personaProAdmin: "Jacob Marti",
    },
    contract_term: {
      contractDate: "01/07/2024",
      contractTerm: "1 Year",
      contractEndDate: "01/06/2025",
    },
    create_account_admin: {
      adminFirstName: "Janet",
      adminLastName: "Stevens",
      accountAdminEmail: "JanetS@Hubspot.com",
      accountAdminPhone: "(932) 759-7493",
    },
    contact_details: {
      customerType: "Big Enterprise",
      userCount: 25,
      mediaCredits: 6000,
      activeMediaLimit: 6000,
    },
    account_colors_and_links: {
      primaryColor: "RGB #000000",
      secondaryColor: "RGB #FFFFFF",
      bookDemoUrl: "www.calendly.com/jstevens",
      redirectUrl: "www.hubspot.com/demovideo",
    },
    account_logo: {
      uploadLogo: "Hubspot.456765.jpg",
    },
    view_agreement: {
      viewAgreement: "hubspotcontract.pdf",
    },
  };

  const tableHeaders = {
    account_details: [
      { key: "accountName", label: "Account Name" },
      { key: "accountPhone", label: "Account Phone" },
      { key: "personaProAdmin", label: "PersonaPro Admin" },
    ],
    contract_term: [
      { key: "contractDate", label: "Contract Date" },
      { key: "contractTerm", label: "Contract Term" },
      { key: "contractEndDate", label: "Contract End Date" },
    ],
    create_account_admin: [
      { key: "adminFirstName", label: "Admin First Name" },
      { key: "adminLastName", label: "Admin Last Name" },
      { key: "accountAdminEmail", label: "Account Admin Email" },
      { key: "accountAdminPhone", label: "Account Admin Phone" },
    ],
    contact_details: [
      { key: "customerType", label: "Customer Type" },
      { key: "userCount", label: "User Count" },
      { key: "mediaCredits", label: "Media Credits" },
      { key: "activeMediaLimit", label: "Active Media Limit" },
    ],
    account_colors_and_links: [
      { key: "primaryColor", label: "Primary Color" },
      { key: "secondaryColor", label: "Secondary Color" },
      { key: "bookDemoUrl", label: "Book Demo URL" },
      { key: "redirectUrl", label: "Redirect URL" },
    ],
    account_logo: [{ key: "uploadLogo", label: "Upload Logo" }],
    view_agreement: [{ key: "viewAgreement", label: "View Agreement" }],
  };

  const displayNames = {
    account_details: "Account Details",
    contract_term: "Contract Term",
    create_account_admin: "Create Account Admin",
    contact_details: "Contact Details",
    account_colors_and_links: "Account Details",
    account_logo: "Account Logo",
    view_agreement: "View Agreement",
  };

  const handleSave = (section, updatedData) => {
    console.log(`Saving updated data for ${section}:`, updatedData);
  };

  return (
    <div className={styles.companyContainer}>
      {Object.keys(companyData).map((section) => (
        <CompanyTable
          key={section}
          heading={displayNames[section]}
          headers={tableHeaders[section]}
          data={companyData[section]}
          canEdit={true}
          onSave={(updatedData) => handleSave(section, updatedData)}
        />
      ))}
    </div>
  );
};

export default Company;
