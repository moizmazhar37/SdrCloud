import React, { useState } from "react";
import styles from "./Company.module.scss";
import CompanyTable from "./CompanyTable/CompanyTable";

const Company = () => {
  const tables = [
    {
      heading: "Create Account Admin",
      headers: [
        { key: "firstName", label: "Admin First Name" },
        { key: "lastName", label: "Admin Last Name" },
        { key: "email", label: "Account Admin Email" },
        { key: "phone", label: "Account Admin Phone" },
      ],
      initialData: {
        firstName: "Janet",
        lastName: "Stevens",
        email: "JanetS@Hubspot.com",
        phone: "(932) 759-7493",
      },
    },
    {
      heading: "Contact Details",
      headers: [
        { key: "customerType", label: "Customer Type" },
        { key: "userCount", label: "User Count" },
        { key: "mediaCredits", label: "Media Credits" },
        { key: "activeMediaLimit", label: "Active Media Limit" },
        { key: "totalMediaLimit", label: "Active Media Limit" },
      ],
      initialData: {
        customerType: "Big Enterprise",
        userCount: "25",
        mediaCredits: "6,000",
        activeMediaLimit: "6,000",
        totalMediaLimit: "18,000",
      },
    },
    {
      heading: "Account Details",
      headers: [
        { key: "primaryColor", label: "Primary Color" },
        { key: "secondaryColor", label: "Secondary Color" },
        { key: "bookDemoUrl", label: "Book Demo URL" },
        { key: "redirectUrl", label: "Redirect URL" },
      ],
      initialData: {
        primaryColor: "RGB #000000",
        secondaryColor: "RGB #FFFFFF",
        bookDemoUrl: "www.calendly.com/jstevens",
        redirectUrl: "www.hubspot.com/demovideo",
      },
    },
    {
      heading: "Account Logo",
      headers: [{ key: "logo", label: "Upload Logo" }],
      initialData: { logo: "Hubspot.456765.jpg" },
    },
    {
      heading: "View Agreement",
      headers: [{ key: "agreement", label: "Agreement File" }],
      initialData: { agreement: "hubspotcontract.pdf" },
    },
  ];

  const handleSave = (index, updatedData) => {
    console.log(`Saving updated data for table ${index}:`, updatedData);
  };

  return (
    <div className={styles.companyContainer}>
      {tables.map((table, index) => (
        <CompanyTable
          key={index}
          heading={table.heading}
          headers={table.headers}
          data={table.initialData}
          canEdit={true}
          onSave={(updatedData) => handleSave(index, updatedData)}
        />
      ))}
    </div>
  );
};

export default Company;
