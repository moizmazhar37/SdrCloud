import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import styles from "./email-template-card.module.scss";

const EmailTemplateCard = ({ template, onDelete, deleting }) => {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this template?")) {
            onDelete(template.id);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h3 className={styles.templateName}>{template.name}</h3>
                <p className={styles.subject}>📩 {template.subject}</p>
                <p className={styles.body}>{template.body}</p>
            </div>
            <div className={styles.actions}>
                <FaEdit className={styles.icon} title="Edit" />
                <FaTrash 
                    className={styles.icon} 
                    title="Delete" 
                    onClick={handleDelete} 
                    disabled={deleting} 
                />
            </div>
        </div>
    );
};

export default EmailTemplateCard;
