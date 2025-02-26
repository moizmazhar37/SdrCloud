import { useState, useEffect } from "react";
import axios from "axios";
import { templates } from "src/config/APIConfig";
const useEmailTemplates = () => {
    const [template, setTemplate] = useState({ HVO: [], VIDEO: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

        fetchTemplates();
    }, []);

    return { template, loading, error };
};

export default useEmailTemplates;
