import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./FollowupEmail.module.scss";
import useSaveFollowupEmail from "../Hooks/useSaveFollowupEmail";
import useUpdateFollowupEmail from "../Hooks/useUpdateFollowupEmail";
import useDeleteFollowupEmail from "../Hooks/useDeleteFollowupEmail";
import { toast } from "react-toastify";
import { defaultMessage, defaultHtmlContent } from "../helpers";
import FollowupEmailForm from "../EmailForm/EmailForm";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";

const typeOptions = [
  { label: "Opened Email", value: "email" },
  { label: "Played Video", value: "video" },
];

const FollowupEmail = ({
  onSave,
  onNext,
  data = {},
  isReadOnly = false,
  templateId,
}) => {
  // State to track newly created follow-up email IDs
  const [newlyCreatedIds, setNewlyCreatedIds] = useState({});

  const groupedTemplates = useMemo(() => {
    console.log("DATA===", data);
    if (Array.isArray(data)) {
      return data.reduce((acc, item) => {
        acc[item.action] = item;
        return acc;
      }, {});
    } else {
      return { [data.action || "email"]: data };
    }
  }, [data]);

  const existingActions = useMemo(() => {
    return Object.keys(groupedTemplates).filter((action) => {
      const template = groupedTemplates[action];
      return !!(template.subject || template.body || template.htmlContent);
    });
  }, [groupedTemplates]);

  const initialAction = groupedTemplates["email"]
    ? "email"
    : Object.keys(groupedTemplates)[0] || "";

  const [selectedAction, setSelectedAction] = useState(initialAction);
  const [editStates, setEditStates] = useState(() => {
    const states = {};
    typeOptions.forEach(({ value }) => {
      states[value] = !existingActions.includes(value);
    });
    return states;
  });

  const currentData = groupedTemplates[selectedAction] || {};

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [htmlContent, setHtmlContent] = useState(defaultHtmlContent);
  const [IsHtmlTemplate, setHtmlTemplate] = useState(false);
  const isFirstSave = !existingActions.includes(selectedAction);

  const getSaveButtonText = () => {
    if (editStates[selectedAction]) {
      return isFirstSave ? "Save" : "Update";
    }
    return "Edit";
  };

  const [saveButtonText, setsaveButtonText] = useState(getSaveButtonText());
  const [deleteButtonText, setdeleteButtonText] = useState("Delete");
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const saveInProgress = useRef(false);

  const { saveFollowupEmail } = useSaveFollowupEmail();
  const { updateFollowupEmail } = useUpdateFollowupEmail();
  const { deleteFollowupEmail } = useDeleteFollowupEmail();

  useEffect(() => {
    setSubject(currentData.subject || "");
    setMessage(currentData.body || defaultMessage);
    const isHtmlFromData = currentData.isHtml || currentData.is_html || false;
    setHtmlTemplate(isHtmlFromData);
    if (isHtmlFromData && currentData.body) {
      setHtmlContent(currentData.body);
    } else {
      setHtmlContent(currentData.htmlContent || defaultHtmlContent);
    }

    setsaveButtonText(getSaveButtonText());
  }, [selectedAction, groupedTemplates]);

  useEffect(() => {
    const newExistingActions = Object.keys(groupedTemplates).filter(
      (action) => {
        const template = groupedTemplates[action];
        return !!(template.subject || template.body || template.htmlContent);
      }
    );

    setEditStates((prevStates) => {
      const updatedStates = { ...prevStates };
      typeOptions.forEach(({ value }) => {
        if (newExistingActions.includes(value)) {
          if (prevStates[value] !== false) {
            updatedStates[value] = false;
          }
        } else {
          if (prevStates[value] !== true) {
            updatedStates[value] = true;
          }
        }
      });
      return updatedStates;
    });
  }, [groupedTemplates]);

  const handleSave = async () => {
    if (saveInProgress.current) return;

    if (!selectedAction) {
      toast.error("Please select an action before saving.");
      return;
    }

    saveInProgress.current = true;

    if (!editStates[selectedAction] && !isFirstSave) {
      setEditStates((prev) => ({ ...prev, [selectedAction]: true }));
      setsaveButtonText("Update");
      saveInProgress.current = false;
      return;
    }

    const payload = {
      subject,
      message: IsHtmlTemplate ? htmlContent : message,
      isHtml: IsHtmlTemplate,
      action: selectedAction,
      templateId, // This should be the main template ID for creating new follow-up emails
    };

    try {
      setsaveButtonText(isFirstSave ? "Saving..." : "Updating...");
      if (isFirstSave) {
        // Save new follow-up email
        const response = await saveFollowupEmail(payload);
        // Store the newly created ID
        setNewlyCreatedIds((prev) => ({
          ...prev,
          [selectedAction]: response.id,
        }));
        toast.success("Follow up email saved successfully.");
      } else {
        const followupEmailId =
          newlyCreatedIds[selectedAction] || currentData.id;
        if (!followupEmailId) {
          toast.error("Follow-up email ID is missing for update.");
          setsaveButtonText(getSaveButtonText());
          saveInProgress.current = false;
          return;
        }
        await updateFollowupEmail({
          followupEmailId,
          subject,
          message: IsHtmlTemplate ? htmlContent : message,
          isHtml: IsHtmlTemplate,
          action: selectedAction,
        });
        toast.success("Follow up email updated successfully.");
      }

      setEditStates((prev) => ({ ...prev, [selectedAction]: false }));
      setsaveButtonText("Edit");
      onSave?.();
    } catch (err) {
      toast.error(err.message);
      setsaveButtonText(getSaveButtonText());
    } finally {
      saveInProgress.current = false;
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const followupEmailId = newlyCreatedIds[selectedAction] || currentData.id;
    if (!followupEmailId) {
      toast.error("Follow-up email ID is missing for deletion.");
      return;
    }
    try {
      await deleteFollowupEmail(followupEmailId);
      toast.success("Follow up email deleted successfully.");
      setNewlyCreatedIds((prev) => {
        const updated = { ...prev };
        delete updated[selectedAction];
        return updated;
      });

      setSubject("");
      setMessage(defaultMessage);
      setHtmlContent(defaultHtmlContent);
      setHtmlTemplate(false);
      setEditStates((prev) => ({ ...prev, [selectedAction]: true }));
      setsaveButtonText("Save");
      setIsDeleteModalOpen(false);
      onSave?.();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOptionClick = (value) => {
    setSelectedAction(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.emailSetup}>
      <div className={styles.container}>
        {/* Action Dropdown */}
        <div className={styles.dropdownWrapper}>
          <div className={styles.headerRow}>
            <span className={styles.labelText}>
              {typeOptions.find((option) => option.value === selectedAction)
                ?.label || "Action"}
            </span>
            <button
              type="button"
              className={styles.dropdownToggle}
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className={`${styles.arrowIcon} ${
                  isOpen ? styles.arrowOpen : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className={styles.dropdownMenu}>
              {typeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.dropdownItem} ${
                    selectedAction === option.value ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Email Editor */}
        <FollowupEmailForm
          subject={subject}
          setSubject={setSubject}
          message={message}
          setMessage={setMessage}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
          IsHtmlTemplate={IsHtmlTemplate}
          setHtmlTemplate={setHtmlTemplate}
          isEditing={editStates[selectedAction]}
          saveButtonText={saveButtonText}
          deleteButtonText={deleteButtonText}
          handleSave={handleSave}
          handleDelete={handleDeleteClick}
          handleNext={onNext}
          isReadOnly={isReadOnly}
        />
      </div>
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
    </div>
  );
};

export default FollowupEmail;
