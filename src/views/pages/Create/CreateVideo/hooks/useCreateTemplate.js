import { useState } from "react";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useCreateTemplate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTemplate = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await Axios({
                url: `${ApiConfig.createVdoTemplate}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: payload,
            });

            toast.success(response?.data?.message || "Template created successfully!");
        } catch (err) {
            console.error("Error creating template:", err);

            const errorMessage = err.response?.data?.message || "Failed to create template.";
            toast.error(errorMessage);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createTemplate, loading, error };
};
