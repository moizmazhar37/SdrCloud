import React, { useState } from "react";
import styles from "./EmailSetup.module.scss";

const EmailSetup = ({ emailType = "Email Template" }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(`Hi [Recipient's Name],
I came across your profile and was impressed by your expertise in [specific area]. I'm currently exploring new opportunities for [specific roles/industries] and would love to connect and discuss how my skills could align with [Company's Name/Team].
Looking forward to hearing from you!
Best regards,`);
  const [htmlContent, setHtmlContent] = useState(`<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: #f4f4f4; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background: #333; color: white; padding: 10px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Professional Email Template</h1>
        </div>
        <div class="content">
            <p>Hi [Recipient's Name],</p>
            <p>I came across your profile and was impressed by your expertise in <strong>[specific area]</strong>. I'm currently exploring new opportunities for [specific roles/industries] and would love to connect and discuss how my skills could align with [Company's Name/Team].</p>
            <p>Looking forward to hearing from you!</p>
            <p>Best regards,<br>[Your Name]</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Professional Communications</p>
        </div>
    </div>
</body>
</html>`);
  const [useHtmlTemplate, setUseHtmlTemplate] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachedImages, setAttachedImages] = useState([]);

  const handleSave = () => {
    console.log("Saving email template:", {
      subject,
      message,
      htmlContent,
      useHtmlTemplate,
      attachedFiles,
      attachedImages,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const fileData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
      };
      setAttachedFiles((prev) => [...prev, fileData]);
    });
    e.target.value = "";
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            preview: event.target.result,
          };
          setAttachedImages((prev) => [...prev, imageData]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = "";
  };

  const removeFile = (id) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const removeImage = (id) => {
    setAttachedImages((prev) => prev.filter((image) => image.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
