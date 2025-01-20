import React from "react";
import { FaTrash } from "react-icons/fa"; // Import FontAwesome icon
import styles from "./section-card.module.scss";

const SectionCard = ({
    sectionNumber,
    sectionName,
    templateId,
    duration,
    scroll,
    previewContent,
    onDelete,
}) => {
    return (
        <div className={styles.sectionCard}>
            <header className={styles.header}>
                <div>
                    <h3 className={styles.sectionTitle}>Section {sectionNumber}</h3>
                    <p className={styles.sectionName}>{sectionName}</p>
                </div>
                <button onClick={onDelete} className={styles.deleteButton}>
                    <FaTrash />
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
