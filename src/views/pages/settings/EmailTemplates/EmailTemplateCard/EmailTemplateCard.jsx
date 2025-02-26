import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import styles from "./email-template-card.module.scss";
import { useHistory } from "react-router-dom";

const EmailTemplateCard = ({ emailTemplate, onDelete, deleting }) => {
    const history = useHistory();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this template?")) {
            onDelete(emailTemplate.id);
        }
    };

    const handleEdit = () => {
        history.push({
            pathname: "/create-email-template",
            state: { emailTemplate, templateId: emailTemplate.template_id }, // Pass entire template data
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h3 className={styles.templateName}>{emailTemplate.name}</h3>
                <p className={styles.subject}>📩 {emailTemplate.subject}</p>
                <p className={styles.body}>{emailTemplate.body}</p>
            </div>
            <div className={styles.actions}>
                <FaEdit className={styles.icon} title="Edit" onClick={handleEdit} />
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
