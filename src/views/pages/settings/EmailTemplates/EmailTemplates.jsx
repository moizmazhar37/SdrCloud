import React, { useState } from "react";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import EmailForm from "../../EmailSettings/EmailSetupSections/EmailForm/EmailForm";
import useGetEmailTemplates from "./Hooks/useGetEmailTemplates";
import useUpdateEmailTemplate from "./Hooks/useUpdateEmailTemplate";
import styles from "./EmailTemplates.module.scss";

const EmailTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { templates: data, loading, error, refetch } = useGetEmailTemplates();
  const {
    updateEmailTemplate,
    loading: updateLoading,
    error: updateError,
  } = useUpdateEmailTemplate();

  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Email Templates", route: "/email-templates" },
  ];

  // Transform API data to match the expected format
  const emailTemplates = data
    ? data.map((template) => ({
        id: template.id,
        title: template.name
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase()), // Convert SNAKE_CASE to Title Case
        subject: template.subject,
        body: template.body,
        isHtmlTemplate:
          template.body.includes("<") && template.body.includes(">"),
        createdAt: new Date().toISOString().split("T")[0],
        isActive: template.is_active,
        name: template.name,
        tenantId: template.tenant_id,
      }))
    : [];

  const handleTemplateClick = (template) => {
    setSelectedTemplate({
      ...template,
      message: template.body,
      htmlContent: template.isHtmlTemplate ? template.body : "", // Use body as htmlContent if it's HTML
      IsHtmlTemplate: template.isHtmlTemplate,
    });
    setIsEditing(true);
  };

  const handleBackToList = () => {
    setSelectedTemplate(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      const requestData = {
        name: selectedTemplate.name,
        subject: selectedTemplate.subject,
        body: selectedTemplate.IsHtmlTemplate
          ? selectedTemplate.htmlContent
          : selectedTemplate.message,
        is_active:
          selectedTemplate.isActive !== undefined
            ? selectedTemplate.isActive
            : true,
      };
      const result = await updateEmailTemplate(
        selectedTemplate.id,
        requestData,
        token
      );

      if (result) {
        setSaveSuccess(true);
        if (refetch) {
          await refetch();
        }
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Error saving template:", err);
    }
  };

  const handleDelete = () => {
    handleBackToList();
  };

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <DynamicNavigator items={navigationItems} />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Email Templates</h1>
            <p className={styles.subtitle}>Loading templates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <DynamicNavigator items={navigationItems} />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Email Templates</h1>
            <p className={styles.subtitle}>
              Error loading templates: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTemplate) {
    return (
      <div className={styles.wrapper}>
        <DynamicNavigator items={navigationItems} />
        <div className={styles.formContainer}>
          <button onClick={handleBackToList} className={styles.backButton}>
            ← Back to Templates
          </button>

          <EmailForm
            subject={selectedTemplate.subject}
            setSubject={(value) =>
              setSelectedTemplate((prev) => ({ ...prev, subject: value }))
            }
            subjectLabel={<label className={styles.label}>Subject</label>}
            message={selectedTemplate.message}
            setMessage={(value) =>
              setSelectedTemplate((prev) => ({
                ...prev,
                message: value,
                body: prev.IsHtmlTemplate ? prev.body : value,
              }))
            }
            htmlContent={selectedTemplate.htmlContent}
            setHtmlContent={(value) =>
              setSelectedTemplate((prev) => ({
                ...prev,
                htmlContent: value,
                body: prev.IsHtmlTemplate ? value : prev.body,
              }))
            }
            IsHtmlTemplate={selectedTemplate.IsHtmlTemplate}
            setHtmlTemplate={(value) =>
              setSelectedTemplate((prev) => ({
                ...prev,
                IsHtmlTemplate: value,
              }))
            }
            isEditing={isEditing}
            saveButtonText={updateLoading ? "Saving..." : "Save Template"}
            deleteButtonText="Delete Template"
            handleSave={handleSave}
            handleDelete={handleDelete}
            showNext={false}
            handleNext={() => console.log("Next clicked")}
            disabled={updateLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <DynamicNavigator items={navigationItems} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Email Templates</h1>
          <p className={styles.subtitle}>
            Manage your email templates and create new ones
          </p>
        </div>

        {emailTemplates.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No email templates found.</p>
          </div>
        ) : (
          <div className={styles.templateGrid}>
            {emailTemplates
              .filter((template) => template.isActive)
              .map((template) => (
                <div
                  key={template.id}
                  className={styles.templateCard}
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>
                      <h3>{template.title}</h3>
                      {template.isHtmlTemplate && (
                        <span className={styles.htmlBadge}>HTML</span>
                      )}
                    </div>
                    <span className={styles.cardDate}>
                      {template.createdAt}
                    </span>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.subjectSection}>
                      <span className={styles.fieldLabel}>Subject:</span>
                      <p className={styles.subject}>{template.subject}</p>
                    </div>

                    <div className={styles.bodySection}>
                      <span className={styles.fieldLabel}>Body:</span>
                      {template.isHtmlTemplate ? (
                        <div className={styles.htmlPreview}>
                          <div className={styles.htmlPreviewContainer}>
                            <iframe
                              srcDoc={template.body}
                              className={styles.previewFrame}
                              title={`Preview of ${template.title}`}
                              sandbox="allow-same-origin"
                            />
                          </div>
                          <div className={styles.htmlText}>
                            <p>{truncateText(stripHtmlTags(template.body))}</p>
                          </div>
                        </div>
                      ) : (
                        <p className={styles.bodyText}>
                          {truncateText(template.body)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.editHint}>Click to edit</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplates;
