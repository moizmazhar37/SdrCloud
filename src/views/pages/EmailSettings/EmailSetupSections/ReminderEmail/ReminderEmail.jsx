import React, { useState, useEffect, useRef } from "react";
import styles from "./ReminderEmail.module.scss";
import EmailForm from "../EmailForm/EmailForm";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";
import TemplateSection from "../TemplateSection/TemplateSection";
import useSaveReminderEmail from "../Hooks/useSaveReminderEmail";
import useUpdateReminderEmail from "../Hooks/useUpdateReminderEmail";
import useDeleteReminderEmail from "../Hooks/useDeleteReminderEmail";
import { toast } from "react-toastify";
import { defaultMessage, defaultHtmlContent } from "../helpers";

const ReminderEmail = ({
  onSave,
  onDataChange,
  onNext,
  data = [],
  templateId,
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [showForm, setShowForm] = useState(data.length === 0);
  const [lastSavedPayload, setLastSavedPayload] = useState(null);
  const [isNewSection, setIsNewSection] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [htmlContent, setHtmlContent] = useState(defaultHtmlContent);
  const [useHtmlTemplate, setUseHtmlTemplate] = useState(false);
  const [sendAfterValue, setSendAfterValue] = useState("");
  const [saveButtonText, setSaveButtonText] = useState("Save");
  const [deleteButtonText] = useState("Delete");
  const [isEditing, setIsEditing] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const selectedSection =
    data.find((section) => section.id === selectedSectionId) || null;

  const saveInProgress = useRef(false);
  const { saveReminderEmail } = useSaveReminderEmail();
  const { updateReminderEmail } = useUpdateReminderEmail();
  const { deleteReminderEmail } = useDeleteReminderEmail();

  useEffect(() => {
    if (selectedSection) {
      setSubject(selectedSection.subject || "");
      setMessage(selectedSection.body || defaultMessage);
      const isHtmlFromData =
        selectedSection.isHtml || selectedSection.is_html || false;
      setUseHtmlTemplate(isHtmlFromData);
      if (isHtmlFromData && selectedSection.body) {
        setHtmlContent(selectedSection.body);
      } else {
        setHtmlContent(selectedSection.htmlContent || defaultHtmlContent);
      }

      setSendAfterValue(selectedSection.send_after_days || "");
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
  }, [selectedSectionId, isNewSection]);

  useEffect(() => {
    if (lastSavedPayload) {
      const match = data.find(
        (section) =>
          section.subject === lastSavedPayload.subject &&
          section.message === lastSavedPayload.message &&
          section.sequence === lastSavedPayload.sequence
      );
      if (match?.id) {
        setSelectedSectionId(match.id);
        setShowForm(true);
        setLastSavedPayload(null);
      }
    }
  }, [data]);

  const handleSave = async () => {
    if (saveInProgress.current) return;

    const isUpdating = !!selectedSectionId;

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
      send_after_days: parseInt(sendAfterValue) || 0,
      sequence: isUpdating ? selectedSection.sequence : data.length + 1,
      templateId,
    };

    try {
      setSaveButtonText(isUpdating ? "Updating..." : "Saving...");

      if (isUpdating) {
        await updateReminderEmail({
          ...payload,
          templateId: selectedSectionId,
        });
        const updatedData = data.map((section) =>
          section.id === selectedSectionId
            ? { ...section, ...payload }
            : section
        );
        toast.success("Reminder section updated successfully.");
        onDataChange?.(updatedData);
      } else {
        await saveReminderEmail({ ...payload, existingTemplates: data });
        setLastSavedPayload(payload);
        setIsNewSection(false);
        setShowForm(false);
        onSave?.();
      }

      setSaveButtonText("Edit");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || "An error occurred while saving.");
      setSaveButtonText(isUpdating ? "Edit" : "Save");
    } finally {
      saveInProgress.current = false;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSection?.id) {
      toast.error("Section ID is missing.");
      return;
    }

    try {
      await deleteReminderEmail(selectedSection.id);
      const updatedData = data.filter(
        (section) => section.id !== selectedSectionId
      );
      setSelectedSectionId(null);
      setIsEditing(true);
      setSaveButtonText("Save");
      setShowForm(updatedData.length === 0);
      toast.success("Reminder section deleted successfully.");
      setIsDeleteModalOpen(false);
      onDataChange?.(updatedData);
      onSave?.();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModalClose = () => setIsDeleteModalOpen(false);

  return (
    <>
      <div className={styles.emailSetup}>
        <TemplateSection
          templates={data}
          selectedId={selectedSectionId}
          onSelect={(id) => {
            setSelectedSectionId(id);
            setShowForm(true);
          }}
          onAddNew={
            data.length > 0
              ? () => {
                  setSelectedSectionId(null);
                  setIsNewSection(true);
                  setShowForm(true);
                }
              : undefined
          }
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
                handleNext={onNext}
                handleDelete={() => setIsDeleteModalOpen(true)}
              />

              {/* <div className={styles.toolbar}>
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
                    onChange={(e) => handleImageUpload(e, setAttachedImages)}
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
              </div> */}

              {/* {attachedFiles.length > 0 && (
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
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* {attachedImages.length > 0 && (
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
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        title="Confirm Deletion"
        confirmationText="Are you sure you want to delete this reminder section?"
        cancelButtonText="Cancel"
        actionButtonText="Delete"
        onAction={handleDeleteConfirm}
        showInputField={false}
      />
    </>
  );
};

export default ReminderEmail;
