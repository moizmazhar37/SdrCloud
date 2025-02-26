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

    return { 
        template, 
        loading, 
        error, 
        emailTemplatesList, 
        emailLoading, 
        emailError 
    };
};

export default useTemplates;
