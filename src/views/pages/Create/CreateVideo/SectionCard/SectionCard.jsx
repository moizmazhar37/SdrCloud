import React from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./section-card.module.scss";
import useDeleteSection from "../../Hooks/useDeleteSection";

const SectionCard = ({
  id,
  sectionNumber,
  sectionName,
  templateId,
  duration,
  scroll,
  previewContent,
  onDeleteSuccess,
}) => {
  const { deleteSection, loading } = useDeleteSection(onDeleteSuccess);

  const handleDelete = () => {
    deleteSection(id);
  };

  return (
    <div className={styles.sectionCard}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.sectionTitle}>Section {sectionNumber}</h3>
          <p className={styles.sectionName}>{sectionName}</p>
        </div>
        <button
          onClick={handleDelete}
          className={styles.deleteButton}
          disabled={loading}
        >
          {loading ? "Deleting..." : <FaTrash />}
        </button>
      </header>
      <div className={styles.preview}>
        {previewContent ? (
          previewContent.endsWith(".mp4") ? (
            <video src={previewContent} controls className={styles.video} />
          ) : (
            <img src={previewContent} alt="Preview" className={styles.image} />
          )
        ) : (
          <p className={styles.noPreview}>No Preview Available</p>
        )}
      </div>
      <footer className={styles.footer}>
        <span>{duration} sec</span>
        <span>Scroll - {scroll ? "Yes" : "No"}</span>
      </footer>
    </div>
  );
};

export default SectionCard;
