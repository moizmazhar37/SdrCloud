// HvoSectionCard.jsx
import React, { useCallback, memo } from "react";
import { FaTrash, FaSpinner, FaEdit } from "react-icons/fa";
import styles from "./section-card.module.scss";
import useDeleteHvoSection from "../Hooks/UseDeleteHvoSection";

const HvoSectionCard = memo(
  ({
    id,
    sectionSequnece,
    sectionName,
    duration,
    scroll,
    previewContent,
    onDeleteSuccess,
    onEdit,
    sectionNumber,
  }) => {
    const handleSuccess = useCallback(() => {
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    }, [onDeleteSuccess]);

    const { deleteSection, loading } = useDeleteHvoSection(handleSuccess);

    const handleDelete = async () => {
      await deleteSection(id, sectionNumber);
    };

    const renderPreview = useCallback(() => {
      if (!previewContent) {
        return (
          <div className={styles.noPreview}>
            {sectionName === "Highlight Banner" ||
            sectionName === "Highlight Banner 2" ||
            sectionName === "Footer"
              ? `No preview available for ${sectionName}`
              : "No Preview Available"}
          </div>
        );
      }

      if (previewContent.endsWith(".mp4")) {
        return (
          <video controls className={styles.previewMedia}>
            <source src={previewContent} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }

      if (
        previewContent.endsWith(".jpg") ||
        previewContent.endsWith(".png") ||
        previewContent.endsWith(".gif") ||
        previewContent.endsWith(".jpeg")
      ) {
        return (
          <img
            src={previewContent}
            alt={`Section ${sectionSequnece} preview`}
            className={styles.previewMedia}
          />
        );
      }

      return (
        <iframe
          src={previewContent}
          title={`Section ${sectionSequnece} preview`}
          className={styles.previewMedia}
        />
      );
    }, [previewContent, sectionName, sectionSequnece]);

    return (
      <div className={styles.sectionCard}>
        <div className={styles.header}>
          <h3>Section {sectionSequnece}</h3>
          <div className={styles.actions}>
            <button onClick={onEdit} className={styles.editButton}>
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className={styles.deleteButton}
              disabled={loading}
            >
              {loading ? <FaSpinner className={styles.spinner} /> : <FaTrash />}
            </button>
          </div>
        </div>
        <h4>{sectionName}</h4>
        <div className={styles.preview}>{renderPreview()}</div>
        <div className={styles.footer}>
          <span>{duration} sec</span>
          <span>Scroll - {scroll ? "Yes" : "No"}</span>
        </div>
      </div>
    );
  }
);

export default HvoSectionCard;
