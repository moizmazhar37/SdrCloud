import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import styles from "./email-template-card.module.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailTemplateCard = ({ emailTemplate, onDelete, deleting }) => {
    const history = useHistory();


    const handleDelete = () => {
            onDelete(emailTemplate.id);
            toast.success(emailTemplate.name + " deleted successfully");
    };

    const handleEdit = () => {
        history.push({
            pathname: "/create-email-template",
            state: { emailTemplate, templateId: emailTemplate.template_id }, 
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
