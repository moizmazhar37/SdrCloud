import React, { useState } from "react";
import styles from "./EmailSetup.module.scss";

const EmailSetup = ({ emailType = "Email Template" }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(`Hi [Recipient's Name],
I came across your profile and was impressed by your expertise in [specific area]. I'm currently exploring new opportunities for [specific roles/industries] and would love to connect and discuss how my skills could align with [Company's Name/Team].
Looking forward to hearing from you!
Best regards,`);
  const [useHtmlTemplate, setUseHtmlTemplate] = useState(false);

  const handleSave = () => {
    console.log("Saving email template:", {
      subject,
      message,
      useHtmlTemplate,
    });
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
                <button
                  type="button"
                  className={styles.toolButton}
                  title="Text formatting"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="4,7 4,4 20,4 20,7"></polyline>
                    <line x1="9" y1="20" x2="15" y2="20"></line>
                    <line x1="12" y1="4" x2="12" y2="20"></line>
                  </svg>
                </button>

                <button
                  type="button"
                  className={styles.toolButton}
                  title="Attach file"
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

                <button
                  type="button"
                  className={styles.toolButton}
                  title="Insert link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </button>

                <button
                  type="button"
                  className={styles.toolButton}
                  title="Insert emoji"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </button>

                <button
                  type="button"
                  className={styles.toolButton}
                  title="Insert image"
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
