import React from "react";
import styles from "./EmailForm.module.scss";

const EmailForm = ({
  subject,
  setSubject,
  subjectLabel,
  message,
  setMessage,
  htmlContent,
  setHtmlContent,
  IsHtmlTemplate,
  setHtmlTemplate,
  isEditing,
  saveButtonText,
  deleteButtonText,
  handleSave,
  handleDelete,
  handleNext,
  showNext = true,
}) => {
  return (
    <div className={styles.emailSetup}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          {/* Subject */}
          <div className={styles.subjectSection}>
            {subjectLabel}
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.subjectInput}
              disabled={!isEditing}
            />
          </div>

          {/* Message */}
          <div className={styles.messageSection}>
            <textarea
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.messageTextarea}
              rows={12}
              disabled={!isEditing}
            />
          </div>

          {/* HTML Section */}
          {IsHtmlTemplate && (
            <div className={styles.htmlSection}>
              <div className={styles.htmlInputContainer}>
                <label htmlFor="htmlContent" className={styles.label}>
                  HTML Content
                </label>
                <textarea
                  id="htmlContent"
                  placeholder="Enter your HTML content..."
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className={styles.htmlTextarea}
                  rows={12}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.htmlPreviewContainer}>
                <div className={styles.previewHeader}>
                  <span className={styles.previewTitle}>HTML Preview</span>
                </div>
                <div className={styles.htmlPreview}>
                  <iframe
                    srcDoc={htmlContent}
                    className={styles.previewFrame}
                    title="HTML Preview"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className={styles.bottomSection}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="htmlTemplate"
                checked={IsHtmlTemplate}
                onChange={(e) => setHtmlTemplate(e.target.checked)}
                className={styles.checkbox}
                disabled={!isEditing}
              />
              <label htmlFor="htmlTemplate" className={styles.checkboxLabel}>
                Use HTML Template
              </label>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={handleDelete} className={styles.deleteButton}>
                {deleteButtonText}
              </button>
              <button onClick={handleSave} className={styles.saveButton}>
                {saveButtonText}
              </button>
              {showNext && (
                <button onClick={handleNext} className={styles.nextButton}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
