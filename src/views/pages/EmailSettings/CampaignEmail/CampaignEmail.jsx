import React from "react";
import styles from "./CampaignEmail.module.scss";
import useEmailSetup from "../Helpers/helpers"; // adjust path if needed

const EmailSetup = ({ onSave }) => {
  const {
    subject,
    setSubject,
    message,
    setMessage,
    htmlContent,
    setHtmlContent,
    useHtmlTemplate,
    setUseHtmlTemplate,
    attachedFiles,
    handleFileUpload,
    removeFile,
    attachedImages,
    handleImageUpload,
    removeImage,
    formatFileSize,
  } = useEmailSetup();

  const handleSave = () => {
    const data = {
      subject,
      message,
      htmlContent,
      useHtmlTemplate,
      attachedFiles,
      attachedImages,
    };
    console.log("Saving data:", data);
    if (onSave) onSave(data); // emit data to parent
  };
  return (
    <div className={styles.emailSetup}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.subjectSection}>
            <label htmlFor="subject" className={styles.label}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.subjectInput}
            />
          </div>

          <div className={styles.messageSection}>
            <textarea
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.messageTextarea}
              rows={12}
            />

            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className={styles.toolButton}
                  title="Attach file"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </button>

                <input
                  type="file"
                  id="imageInput"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className={styles.toolButton}
                  title="Insert image"
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* HTML Template Section */}
          {useHtmlTemplate && (
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
          {attachedFiles.length > 0 && (
            <div className={styles.attachmentSection}>
              <h4 className={styles.attachmentTitle}>Attached Files</h4>
              <div className={styles.attachmentGrid}>
                {attachedFiles.map((file) => (
                  <div key={file.id} className={styles.filePreview}>
                    <div className={styles.fileIcon}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                      </svg>
                    </div>
                    <div className={styles.fileInfo}>
                      <div className={styles.fileName}>{file.name}</div>
                      <div className={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeFile(file.id)}
                      title="Remove file"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* File Previews */}

          {/* Image Previews */}
          {attachedImages.length > 0 && (
            <div className={styles.attachmentSection}>
              <h4 className={styles.attachmentTitle}>Attached Images</h4>
              <div className={styles.attachmentGrid}>
                {attachedImages.map((image) => (
                  <div key={image.id} className={styles.imagePreview}>
                    <div className={styles.imageContainer}>
                      <img
                        src={image.preview}
                        alt={image.name}
                        className={styles.previewImage}
                      />
                    </div>
                    <div className={styles.fileInfo}>
                      <div className={styles.fileName}>{image.name}</div>
                      <div className={styles.fileSize}>
                        {formatFileSize(image.size)}
                      </div>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeImage(image.id)}
                      title="Remove image"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.bottomSection}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="htmlTemplate"
                checked={useHtmlTemplate}
                onChange={(e) => setUseHtmlTemplate(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="htmlTemplate" className={styles.checkboxLabel}>
                Use HTML Template
              </label>
            </div>

            <button onClick={handleSave} className={styles.saveButton}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSetup;
