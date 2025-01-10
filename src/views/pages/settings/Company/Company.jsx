import React, { useState } from "react";
import styles from "./Company.module.scss";
import CompanyTable from "./CompanyTable/CompanyTable";

const Company = () => {
  // Table 1: Account Details
  const headers1 = [
    { key: "accountName", label: "Account Name" },
    { key: "accountPhone", label: "Account Phone" },
    { key: "personaProAdmin", label: "PersonaPro Admin" },
  ];

  const data1 = {
    accountName: "Hubspot",
    accountPhone: "(937) 313-4466",
    personaProAdmin: "Jacob Marti",
  };

  // Table 2: Contract Term
  const headers2 = [
    { key: "contractDate", label: "Contract Date" },
    { key: "contractTerm", label: "Contract Term" },
    { key: "contractEndDate", label: "Contract End Date" },
  ];

  const data2 = {
    contractDate: "01/07/2024",
    contractTerm: "1 Year",
    contractEndDate: "01/06/2025",
  };

  // Table 3: Create Account Admin
  const headers3 = [
    { key: "adminFirstName", label: "Admin First Name" },
    { key: "adminLastName", label: "Admin Last Name" },
    { key: "accountAdminEmail", label: "Account Admin Email" },
    { key: "accountAdminPhone", label: "Account Admin Phone" },
  ];

  const data3 = {
    adminFirstName: "Janet",
    adminLastName: "Stevens",
    accountAdminEmail: "JanetS@Hubspot.com",
    accountAdminPhone: "(932) 759-7493",
  };

  // Table 4: Contact Details
  const headers4 = [
    { key: "customerType", label: "Customer Type" },
    { key: "userCount", label: "User Count" },
    { key: "mediaCredits", label: "Media Credits" },
    { key: "activeMediaLimit", label: "Active Media Limit" },
  ];

  const data4 = {
    customerType: "Big Enterprise",
    userCount: 25,
    mediaCredits: 6000,
    activeMediaLimit: 6000,
  };

  // Table 5: Account Details (Colors and Links)
  const headers5 = [
    { key: "primaryColor", label: "Primary Color" },
    { key: "secondaryColor", label: "Secondary Color" },
    { key: "bookDemoUrl", label: "Book Demo URL" },
    { key: "redirectUrl", label: "Redirect URL" },
  ];

  const data5 = {
    primaryColor: "RGB #000000",
    secondaryColor: "RGB #FFFFFF",
    bookDemoUrl: "www.calendly.com/jstevens",
    redirectUrl: "www.hubspot.com/demovideo",
  };

  // Table 6: Account Logo
  const headers6 = [{ key: "uploadLogo", label: "Upload Logo" }];

  const data6 = {
    uploadLogo: "Hubspot.456765.jpg",
  };

  // Table 7: View Agreement
  const headers7 = [{ key: "viewAgreement", label: "View Agreement" }];

  const data7 = {
    viewAgreement: "hubspotcontract.pdf",
  };

  // Save handler
  const handleSave = (updatedData) => {
    console.log("Saving updated data:", updatedData);
  };

  return (
    <div className={styles.companyContainer}>
      <CompanyTable
        heading="Account Details"
        headers={headers1}
        data={data1}
        canEdit={true}
        onSave={handleSave}
      />

      <CompanyTable
        heading="Contract Term"
        headers={headers2}
        data={data2}
        canEdit={true}
        onSave={handleSave}
      />

      <CompanyTable
        heading="Create Account Admin"
        headers={headers3}
        data={data3}
        canEdit={true}
        onSave={handleSave}
      />

      <CompanyTable
        heading="Contact Details"
        headers={headers4}
        data={data4}
        canEdit={true}
        onSave={handleSave}
      />

      <CompanyTable
        heading="Account Details"
        headers={headers5}
        data={data5}
        canEdit={true}
        onSave={handleSave}
      />

      <CompanyTable
        heading="Account Logo"
        headers={headers6}
        data={data6}
        canEdit={true}
        onSave={handleSave}
      />
      <CompanyTable
        heading="View Agreement"
        headers={headers7}
        data={data7}
        canEdit={true}
        onSave={handleSave}
      />
    </div>
  );
};

export default Company;
