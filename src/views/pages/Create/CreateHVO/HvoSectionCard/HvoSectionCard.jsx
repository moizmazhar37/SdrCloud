import React from "react";
import { FaTrash, FaSpinner, FaEdit } from "react-icons/fa";
import styles from "./section-card.module.scss";
import useDeleteHvoSection from "../Hooks/UseDeleteHvoSection";

const HvoSectionCard = ({
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
  const { deleteSection, loading } = useDeleteHvoSection(onDeleteSuccess);
  console.log("==sectionSequnece=", sectionSequnece, "id=", id);
  const handleDelete = () => {
    deleteSection(id, sectionNumber);
  };

  const renderPreview = () => {
    if (!previewContent) {
      return "No Preview Available";
    }

    // If it is a video
    if (previewContent.endsWith(".mp4")) {
      return (
        <video controls>
          <source src={previewContent} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    // If image
    if (
      previewContent.endsWith(".jpg") ||
      previewContent.endsWith(".png") ||
      previewContent.endsWith(".gif") ||
      previewContent.endsWith(".jpeg")
    ) {
      return (
        <img src={previewContent} alt={`Section ${sectionSequnece} preview`} />
      );
    }

    // Assume it's a link and render an iframe
    return (
      <iframe
        src={previewContent}
        title={`Section ${sectionSequnece} preview`}
      />
    );
  };

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
};

export default HvoSectionCard;
