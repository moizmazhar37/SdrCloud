import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import styles from "./email-template-card.module.scss"

const EmailTemplateCard = ({ template }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h3 className={styles.templateName}>{template.name}</h3>
                <p className={styles.subject}>📩 {template.subject}</p>
                <p className={styles.body}>{template.body}</p>
            </div>
            <div className={styles.actions}>
                <FaEye className={styles.icon} title="View" />
                <FaEdit className={styles.icon} title="Edit" />
                <FaTrash className={styles.icon} title="Delete" />
            </div>
        </div>
    );
};

export default EmailTemplateCard;
