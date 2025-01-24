import React from "react";
import { FaTrash, FaSpinner, FaEdit } from "react-icons/fa";
import styles from "./section-card.module.scss";
import useDeleteSection from "../hooks/useDeleteSection";

const SectionCard = ({
  id,
  sectionNumber,
  sectionName,
  duration,
  scroll,
  previewContent,
  onDeleteSuccess,
}) => {
  const { deleteSection, loading } = useDeleteSection(onDeleteSuccess);

  const handleDelete = () => {
    deleteSection(id);
  };

  const handleEdit = () => {
    console.log("OPEN");
  };

  const renderPreview = () => {
    if (!previewContent) {
      return <p className={styles.noPreview}>No Preview Available</p>;
    }
    // If it is a video
    if (previewContent.endsWith(".mp4")) {
      return <video src={previewContent} controls className={styles.video} />;
    }
    // If image
    if (
      previewContent.endsWith(".jpg") ||
      previewContent.endsWith(".png") ||
      previewContent.endsWith(".gif") ||
      previewContent.endsWith(".jpeg")
    ) {
      return (
        <img src={previewContent} alt="Preview" className={styles.image} />
      );
    }

    // Assume it's a link and render an iframe
    return (
      <iframe
        src={previewContent}
        className={styles.iframe}
        width="100%"
        height="300px"
        allowFullScreen
        title="Preview"
      />
    );
  };

  return (
    <div className={styles.sectionCard}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.sectionTitle}>Section {sectionNumber}</h3>
          <p className={styles.sectionName}>{sectionName}</p>
        </div>
        <div>
          <button onClick={handleEdit} className={styles.deleteButton}>
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
      </header>
      <div className={styles.preview}>{renderPreview()}</div>
      <footer className={styles.footer}>
        <span>{duration} sec</span>
        <span>Scroll - {scroll ? "Yes" : "No"}</span>
      </footer>
    </div>
  );
};

export default SectionCard;
