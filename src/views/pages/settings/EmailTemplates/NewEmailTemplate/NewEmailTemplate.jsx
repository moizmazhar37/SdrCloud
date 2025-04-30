import React, { useState, useRef, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./NewEmailTemplate.module.scss";
import { useDataTypes, useSaveEmailTemplate } from "./hooks";
import CopyText from "../CopyText/CopyText";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import Loader from "src/Common/Loader/Loader";

const NewEmailTemplate = () => {
  const location = useLocation();
  const emailTemplate = location.state?.emailTemplate || null;

  // const { dataTypes, loading, error } = useDataTypes(templateId);
  const { saveTemplate, saving } = useSaveEmailTemplate();

  const [name, setName] = useState(emailTemplate?.name || "");
  const [subject, setSubject] = useState(emailTemplate?.subject || "");
  const [body, setBody] = useState(emailTemplate?.body || "");
  const [isHtml, setIsHtml] = useState(emailTemplate?.isHtml || false);

  const activeInputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (emailTemplate) {
      setName(emailTemplate.name);
      setSubject(emailTemplate.subject);
      setBody(emailTemplate.body);
      setIsHtml(emailTemplate.isHtml || false);
    }
  }, [emailTemplate]);

  const handleInsert = (text) => {
    if (activeInputRef.current) {
      const input = activeInputRef.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newText = input.value.substring(0, start) + text + input.value.substring(end);
      input.value = newText;
      input.setSelectionRange(start + text.length, start + text.length);
      if (input.name === "subject") {
        setSubject(newText);
      } else {
        setBody(newText);
      }
      input.focus();
    }
  };

  const validateFields = () => {
    if (!name.trim() || !subject.trim() || !body.trim()) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
    try {
      await saveTemplate({ name, subject, body, isHtml, emailTemplate_id: emailTemplate?.id, isUpdate: !!emailTemplate });
      toast.success(`Template ${emailTemplate ? "updated" : "saved"} successfully!`);
      history.push("/email-templates");
    } catch {
      toast.error("Failed to save template. Try again.");
    }
  };

  return (
    <div className={styles.container}>
      <DynamicNavigator items={[{ text: "Email Templates", route: "/email-templates" }, { text: emailTemplate ? "Edit Template" : "Create Template", route: "/create-email-template" }]} />
      <h2 className={styles.heading}>{emailTemplate ? "Edit Email Template" : "New Email Template"}</h2>
      {/* {loading ? (
        <Loader size={160} />
      ) : error ? (
        <div className={styles.error}>Failed to load template</div>
      ) : ( */}
        <div className={styles.content}>
          <div className={styles.copySection}>
            <h3 className={styles.sectionTitle}>Available Fields</h3>
            <CopyText fields={["[First name]", "[Last name]", "[Link]"]} onInsert={handleInsert} />
          </div>
          <div className={styles.emailEditor}>
            <input className={styles.input} type="text" name="name" placeholder="Template Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={styles.input} type="text" name="subject" placeholder="[Subject]" value={subject} onChange={(e) => setSubject(e.target.value)} onFocus={(e) => (activeInputRef.current = e.target)} />
            <textarea className={styles.textarea} name="body" placeholder="Email body..." value={body} onChange={(e) => setBody(e.target.value)} onFocus={(e) => (activeInputRef.current = e.target)}></textarea>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={isHtml} onChange={() => setIsHtml(!isHtml)} /> Use HTML Template
            </label>
            {isHtml && (
              <div className={styles.htmlPreview}>
                <h4>Live Preview</h4>
                <div className={styles.previewContent} dangerouslySetInnerHTML={{ __html: body }}></div>
              </div>
            )}
            <button className={styles.saveButton} onClick={handleSave} disabled={saving}>{saving ? "Saving..." : emailTemplate ? "Update" : "Save"}</button>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default NewEmailTemplate;
