import React from "react";
import useCompanyTenant from "./Hooks/useCompanyTenant";
import styles from "./Company.module.scss";
import CompanyTable from "./CompanyTable/CompanyTable";

const Company = () => {
  const { data: tenantData, loading, error } = useCompanyTenant();

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tenantData) return <div>No data available</div>;

  return (
    <div className={styles.companyContainer}>
      {Object.keys(tenantData).map((section) => (
        <CompanyTable
          key={section}
          heading={displayNames[section]}
          headers={tableHeaders[section]}
          data={tenantData[section]}
          canEdit={false}
          onSave={(updatedData) => handleSave(section, updatedData)}
        />
      ))}
    </div>
  );
};

export default Company;
