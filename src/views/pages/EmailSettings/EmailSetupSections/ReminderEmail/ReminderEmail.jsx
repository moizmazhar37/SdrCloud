import React, { useState, useEffect, useRef } from "react";
import styles from "./ReminderEmail.module.scss";
import EmailForm from "../EmailForm/EmailForm";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";
import TemplateSection from "../TemplateSection/TemplateSection";
import useSaveReminderEmail from "../Hooks/useSaveReminderEmail";
import useUpdateReminderEmail from "../Hooks/useUpdateReminderEmail";
import useDeleteReminderEmail from "../Hooks/useDeleteReminderEmail";
import { toast } from "react-toastify";
import {
  defaultMessage,
  defaultHtmlContent,
  handleFileUpload,
  handleImageUpload,
  removeFile,
  removeImage,
  formatFileSize,
} from "../helpers";

const ReminderEmail = ({ onDataChange, data = [] }) => {
  const [templates, setTemplates] = useState(data);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [showForm, setShowForm] = useState(data.length === 0);

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || null;

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [htmlContent, setHtmlContent] = useState(defaultHtmlContent);
  const [useHtmlTemplate, setUseHtmlTemplate] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachedImages, setAttachedImages] = useState([]);
  const [sendAfterValue, setSendAfterValue] = useState("");
  const [deleteButtonText] = useState("Delete");
  const [saveButtonText, setSaveButtonText] = useState("Save");
  const [isEditing, setIsEditing] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const saveInProgress = useRef(false);
  const { saveReminderEmail } = useSaveReminderEmail();
  const { updateReminderEmail } = useUpdateReminderEmail();
  const { deleteReminderEmail } = useDeleteReminderEmail();

  useEffect(() => {
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject || "");
      setMessage(selectedTemplate.body || defaultMessage);
      setHtmlContent(selectedTemplate.htmlContent || defaultHtmlContent);
      setUseHtmlTemplate(selectedTemplate.isHtml || false);
      setSendAfterValue(selectedTemplate.send_after_days || "");
      setIsEditing(false);
      setSaveButtonText("Edit");
      setShowForm(true);
    } else {
      setSubject("");
      setMessage(defaultMessage);
      setHtmlContent(defaultHtmlContent);
      setUseHtmlTemplate(false);
      setSendAfterValue("");
      setIsEditing(true);
      setSaveButtonText("Save");
    }
  }, [selectedTemplateId]);

  const handleSave = async () => {
    if (saveInProgress.current) return;

    const isUpdating = !!selectedTemplateId;

    if (!isEditing && isUpdating) {
      setIsEditing(true);
      setSaveButtonText("Update");
      return;
    }

    saveInProgress.current = true;

    const payload = {
      subject,
      message: useHtmlTemplate ? htmlContent : message,
      isHtml: useHtmlTemplate,
      send_days: parseInt(sendAfterValue) || 0,
      sequence: isUpdating ? selectedTemplate.sequence : templates.length + 1,
    };

    try {
      setSaveButtonText(isUpdating ? "Updating..." : "Saving...");

      if (isUpdating) {
        await updateReminderEmail({ ...payload, templateId: selectedTemplateId });
        const updatedTemplates = templates.map(t =>
          t.id === selectedTemplateId ? { ...t, ...payload } : t
        );
        setTemplates(updatedTemplates);
        toast.success("Reminder email updated successfully.");
      } else {
        const response = await saveReminderEmail({ ...payload, existingTemplates: templates });
        const newTemplate = { id: response?.id || Date.now().toString(), ...payload };
        const updatedTemplates = [...templates, newTemplate];
        setTemplates(updatedTemplates);
        toast.success("Reminder email saved successfully.");
        setShowForm(false); // hide form after first template is saved
      }

      setSelectedTemplateId(null);
      setSaveButtonText("Edit");
      setIsEditing(false);
      onDataChange?.(templates);
    } catch (err) {
      toast.error(err.message || "An error occurred while saving.");
      setSaveButtonText(isUpdating ? "Edit" : "Save");
    } finally {
      saveInProgress.current = false;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTemplate?.id) {
      toast.error("Template ID is missing.");
      return;
    }

    try {
      await deleteReminderEmail(selectedTemplate.id);
      const updated = templates.filter(t => t.id !== selectedTemplateId);
      setTemplates(updated);
      setSelectedTemplateId(null);
      setIsEditing(true);
      setSaveButtonText("Save");
      setShowForm(updated.length === 0);
      toast.success("Template deleted successfully.");
      onDataChange?.(updated);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModalClose = () => setIsDeleteModalOpen(false);

  return (
    <>
      <div className={styles.emailSetup}>
        <TemplateSection
          templates={templates}
          selectedId={selectedTemplateId}
          onSelect={id => {
            setSelectedTemplateId(id);
            setShowForm(true);
          }}
          onAddNew={() => {
            setSelectedTemplateId(null);
            setShowForm(true);
          }}
        />

        {showForm && (
          <div className={styles.container}>
            <div className={styles.formCard}>
              <div className={styles.reminderHeader}>
                <div className={styles.sendAfterSection}>
                  <span className={styles.sendAfterLabel}>Send After</span>
                  <input
                    type="number"
                    value={sendAfterValue}
                    onChange={(e) => setSendAfterValue(e.target.value)}
                    className={styles.sendAfterInput}
                    placeholder=""
                    min="1"
                    readOnly={!isEditing}
                  />
                  <span className={styles.timeframeText}>Days</span>
                </div>
              </div>

              <EmailForm
                subject={subject}
                setSubject={setSubject}
                subjectLabel={<></>}
                message={message}
                setMessage={setMessage}
                htmlContent={htmlContent}
                setHtmlContent={setHtmlContent}
                IsHtmlTemplate={useHtmlTemplate}
                setHtmlTemplate={setUseHtmlTemplate}
                isEditing={isEditing}
                saveButtonText={saveButtonText}
                deleteButtonText={deleteButtonText}
                handleSave={handleSave}
                handleDelete={() => setIsDeleteModalOpen(true)}
              />

              <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    onChange={(e) => handleFileUpload(e, setAttachedFiles)}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className={styles.toolButton}
                    title="Attach file"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    📎
                  </button>

                  <input
                    type="file"
                    id="imageInput"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setAttachedImages)}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className={styles.toolButton}
                    title="Insert image"
                    onClick={() => document.getElementById("imageInput").click()}
                  >
                    🖼️
                  </button>
                </div>
              </div>

              {attachedFiles.length > 0 && (
                <div className={styles.attachmentSection}>
                  <h4 className={styles.attachmentTitle}>Attached Files</h4>
                  <div className={styles.attachmentGrid}>
                    {attachedFiles.map((file) => (
                      <div key={file.id} className={styles.filePreview}>
                        <div className={styles.fileInfo}>
                          <div className={styles.fileName}>{file.name}</div>
                          <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
                        </div>
                        <button
                          className={styles.removeButton}
                          onClick={() => removeFile(file.id, setAttachedFiles)}
                        >❌</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {attachedImages.length > 0 && (
                <div className={styles.attachmentSection}>
                  <h4 className={styles.attachmentTitle}>Attached Images</h4>
                  <div className={styles.attachmentGrid}>
                    {attachedImages.map((image) => (
                      <div key={image.id} className={styles.imagePreview}>
                        <img src={image.preview} alt={image.name} className={styles.previewImage} />
                        <div className={styles.fileName}>{image.name}</div>
                        <div className={styles.fileSize}>{formatFileSize(image.size)}</div>
                        <button
                          className={styles.removeButton}
                          onClick={() => removeImage(image.id, setAttachedImages)}
                        >❌</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        title="Confirm Deletion"
        confirmationText="Are you sure you want to delete this reminder template?"
        cancelButtonText="Cancel"
        actionButtonText="Delete"
        onAction={handleDeleteConfirm}
        showInputField={false}
      />
    </>
  );
};

export default ReminderEmail;
