import React, { useState, useEffect, useRef } from "react";
import styles from "./CampaignEmail.module.scss";
import useSaveCampaignEmail from "../Hooks/useSaveCampaignEmail";
import useUpdateEmailTemplates from "../Hooks/useUpdateCampainEmail";
import useDeleteCampaignEmail from "../Hooks/useDeleteCampaignEmail";
import { toast } from "react-toastify";
import { defaultMessage, defaultHtmlContent } from "../helpers";
import CampaignEmailForm from "../EmailForm/EmailForm";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";

const EmailSetup = ({
  onSave,
  onNext,
  data = {},
  isReadOnly = false,
  templateId,
}) => {
  const [subject, setSubject] = useState(data.subject || "");
  const [message, setMessage] = useState(data.body || defaultMessage);
  const [htmlContent, setHtmlContent] = useState(
    data.htmlContent || data.body || defaultHtmlContent
  );
  const [IsHtmlTemplate, setHtmlTemplate] = useState(
    data.isHtml || data.is_html || false
  );
  const [isFirstSave, setIsFirstSave] = useState(!data?.subject);
  const [isEditing, setIsEditing] = useState(!isReadOnly);
  const [saveButtonText, setsaveButtonText] = useState(
    isFirstSave ? "Save" : "Edit"
  );
  const [deleteButtonText, setdeleteButtonText] = useState("Delete");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const firstRenderRef = useRef(true);

  const { saveCampaignEmail } = useSaveCampaignEmail();
  const { updateCampaignEmail } = useUpdateEmailTemplates();
  const { deleteCampaignEmail } = useDeleteCampaignEmail();

  useEffect(() => {
    if (firstRenderRef.current) {
      setSubject(data.subject || "");
      setMessage(data.body || defaultMessage);

      // Fix: Check for both camelCase and snake_case properties
      const isHtmlFromData = data.isHtml || data.is_html || false;
      setHtmlTemplate(isHtmlFromData);

      // Fix: If it's HTML template and has body content, use body as htmlContent
      if (isHtmlFromData && data.body) {
        setHtmlContent(data.body);
      } else {
        setHtmlContent(data.htmlContent || defaultHtmlContent);
      }

      const isNew = !(data.subject || data.body || data.htmlContent);
      setIsFirstSave(isNew);
      setsaveButtonText(isNew ? "Save" : "Edit");

      firstRenderRef.current = false;
    }
  }, [data]);

  const handleSave = async () => {
    if (!isEditing && !isFirstSave) {
      setIsEditing(true);
      setsaveButtonText("Update");
      return;
    }

    const payload = {
      subject,
      message: IsHtmlTemplate ? htmlContent : message,
      isHtml: IsHtmlTemplate,
      templateId,
    };

    try {
      setsaveButtonText(isFirstSave ? "Saving..." : "Updating...");

      if (isFirstSave) {
        const response = await saveCampaignEmail(payload);
        toast.success(response.message || "Campaign email saved successfully.");
      } else {
        const templateId = data.id;
        if (!templateId) {
          toast.error("Template ID is missing for update.");
          return;
        }

        await updateCampaignEmail({
          templateId,
          subject: payload.subject,
          message: payload.message,
          isHtml: payload.isHtml,
        });
        toast.success("Campaign email updated successfully.");
      }

      setIsEditing(false);
      setIsFirstSave(false);
      setsaveButtonText("Edit");

      onSave?.();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      setsaveButtonText(isFirstSave ? "Save" : isEditing ? "Update" : "Edit");
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!data.id) {
      toast.error("Template ID is missing.");
      return;
    }

    try {
      const response = await deleteCampaignEmail(data.id);
      toast.success(response.message || "Template deleted successfully.");

      // Only reset on success
      setSubject("");
      setMessage(defaultMessage);
      setHtmlContent(defaultHtmlContent);
      setHtmlTemplate(false);
      setIsFirstSave(true);
      setIsEditing(true);
      setsaveButtonText("Save");

      setIsDeleteModalOpen(false);

      onSave?.();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <CampaignEmailForm
        subject={subject}
        setSubject={setSubject}
        message={message}
        setMessage={setMessage}
        htmlContent={htmlContent}
        setHtmlContent={setHtmlContent}
        IsHtmlTemplate={IsHtmlTemplate}
        setHtmlTemplate={setHtmlTemplate}
        isEditing={isEditing}
        saveButtonText={saveButtonText}
        deleteButtonText={deleteButtonText}
        handleSave={handleSave}
        handleDelete={handleDeleteClick}
        handleNext={onNext}
        subjectLabel={
          <label htmlFor="subject" className={styles.label}>
            Subject
          </label>
        }
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        title="Confirm Deletion"
        confirmationText="Are you sure you want to delete this template?"
        cancelButtonText="Cancel"
        actionButtonText="Delete"
        onAction={handleDeleteConfirm}
        showInputField={false}
      />
    </>
  );
};

export default EmailSetup;
