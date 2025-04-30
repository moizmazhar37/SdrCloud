import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./emailTemplates.module.scss";
import EmailTemplateCard from "./EmailTemplateCard/EmailTemplateCard";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useTemplates from "./hooks";
import Loader from "src/Common/Loader/Loader";

const navigationItems = [
  { text: "Settings", route: "/settings" },
  { text: "Email Templates", route: "/email-templates" },
];

const EmailTemplates = () => {
  const history = useHistory();
  const { template, loading, error, emailTemplatesList, emailLoading, emailError, deleteEmailTemplate, deleting } = useTemplates();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTemplateSelect = (template) => {
    history.push({
      pathname: "/create-email-template",
      state: { templateId: template.id },
    });
  };

  return (
    <div className={styles.container}>
      {/* Navigation & Create Button */}
      <div className={styles.topBar}>
        <DynamicNavigator items={navigationItems} />

        {/* Dropdown Button */}
        <div className={styles.dropdownContainer}>
          <button className={styles.createButton} onClick={() => history.push("/create-email-template")}>
            + Create New Template
          </button>
        </div>
      </div>

      {/* Heading */}
      <h2 className={styles.heading}>Email Templates</h2>

      {/* Template Cards from API */}
      <div className={styles.templatesContainer}>
        {emailLoading ? (
          <div className={styles.loaderWrapper}>{<Loader size={160} />}</div>
        ) : emailError ? (
          <div className={styles.error}>Failed to load Email Templates</div>
        ) : emailTemplatesList.length > 0 ? (
          emailTemplatesList.map((emailTemplate) => (
            <EmailTemplateCard 
              key={emailTemplate.id} 
              emailTemplate={emailTemplate} 
              onDelete={deleteEmailTemplate} 
              deleting={deleting}
            />
          ))
        ) : (
          <div className={styles.noTemplates}>No Email Templates Available</div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplates;
