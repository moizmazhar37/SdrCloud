import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./emailTemplates.module.scss";
import EmailTemplateCard from "./EmailTemplateCard/EmailTemplateCard";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useEmailTemplates from "./hooks";

const dummyTemplates = [
  { id: 1, name: "Welcome Email", subject: "Welcome to Our Service", body: "Thank you for signing up!" },
  { id: 2, name: "Promotion Email", subject: "Exclusive Discount for You!", body: "Enjoy 20% off on your next purchase." },
  { id: 3, name: "Reminder Email", subject: "Don't Forget Your Appointment", body: "Your appointment is scheduled for tomorrow." },
];

const navigationItems = [
  { text: "Settings", route: "/settings" },
  { text: "Integration", route: "/integrations" },
  { text: "Email Templates", route: "/email-templates" },
];

const EmailTemplates = () => {
  const history = useHistory();
  const { template, loading, error } = useEmailTemplates();
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

      {/* Template Cards (Dummy Data) */}
      <div className={styles.templatesContainer}>
        {dummyTemplates.map((template) => (
          <EmailTemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default EmailTemplates;
