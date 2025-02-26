import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./emailTemplates.module.scss";
import EmailTemplateCard from "./EmailTemplateCard/EmailTemplateCard";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useTemplates from "./hooks";

const navigationItems = [
  { text: "Settings", route: "/settings" },
  { text: "Integration", route: "/integrations" },
  { text: "Email Templates", route: "/email-templates" },
];

const EmailTemplates = () => {
  const history = useHistory();
  const { template, loading, error, emailTemplatesList, emailLoading, emailError } = useTemplates();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTemplateSelect = (template) => {
    history.push({
      pathname: "/create-email-template",
      state: { templateId: template.template_id }, // Using API response key
    });
  };

  return (
    <div className={styles.container}>
      {/* Navigation & Create Button */}
      <div className={styles.topBar}>
        <DynamicNavigator items={navigationItems} />

        {/* Dropdown Button */}
        <div className={styles.dropdownContainer}>
          <button className={styles.createButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
            + Create New Template ▼
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>HVO</div>
              {loading ? (
                <div className={styles.loading}>Loading...</div>
              ) : error ? (
                <div className={styles.error}>Failed to load</div>
              ) : template.HVO.length > 0 ? (
                template.HVO.map((template) => (
                  <div key={template.id} className={styles.dropdownItem} onClick={() => handleTemplateSelect(template)}>
                    {template.template_name}
                  </div>
                ))
              ) : (
                <div className={styles.noTemplates}>No HVO Templates</div>
              )}

              <div className={styles.dropdownHeader}>VIDEO</div>
              {loading ? (
                <div className={styles.loading}>Loading...</div>
              ) : error ? (
                <div className={styles.error}>Failed to load</div>
              ) : template.VIDEO.length > 0 ? (
                template.VIDEO.map((template) => (
                  <div key={template.id} className={styles.dropdownItem} onClick={() => handleTemplateSelect(template)}>
                    {template.template_name}
                  </div>
                ))
              ) : (
                <div className={styles.noTemplates}>No Video Templates</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Heading */}
      <h2 className={styles.heading}>Email Templates</h2>

      {/* Template Cards from API */}
      <div className={styles.templatesContainer}>
        {emailLoading ? (
          <div className={styles.loading}>Loading Email Templates...</div>
        ) : emailError ? (
          <div className={styles.error}>Failed to load Email Templates</div>
        ) : emailTemplatesList.length > 0 ? (
          emailTemplatesList.map((template) => (
            <EmailTemplateCard key={template.template_id} template={template} />
          ))
        ) : (
          <div className={styles.noTemplates}>No Email Templates Available</div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplates;
