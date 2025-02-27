import { useState, useEffect } from "react";
import axios from "axios";
import { templates, emailTemplate } from "src/config/APIConfig";

const useTemplates = () => {
    const [template, setTemplate] = useState({ HVO: [], VIDEO: [] }); // Existing templates
    const [emailTemplatesList, setEmailTemplatesList] = useState([]); // New Email Templates
    const [loading, setLoading] = useState(true);
    const [emailLoading, setEmailLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get(`${templates}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTemplate(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchEmailTemplates = async () => {
            try {
                const response = await axios.get(`${emailTemplate}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setEmailTemplatesList(response.data); // API returns an array of email templates
            } catch (err) {
                setEmailError(err);
            } finally {
                setEmailLoading(false);
            }
        };

        fetchTemplates();
        fetchEmailTemplates();
    }, []);

    // Delete Email Template Function
    const deleteEmailTemplate = async (templateId) => {
        if (!templateId) return;
        setDeleting(true);
        setDeleteError(null);
        try {
            await axios.delete(`${emailTemplate}/${templateId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Remove deleted template from state
            setEmailTemplatesList((prev) => prev.filter((t) => t.id !== templateId));
        } catch (err) {
            setDeleteError("Failed to delete template. Try again.");
        } finally {
            setDeleting(false);
        }
    };

    return { 
        template, 
        loading, 
        error, 
        emailTemplatesList, 
        emailLoading, 
        emailError, 
        deleteEmailTemplate,
        deleting,
        deleteError
    };
};

export default useTemplates;
