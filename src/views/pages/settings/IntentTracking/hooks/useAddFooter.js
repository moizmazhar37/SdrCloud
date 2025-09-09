import { useState } from "react";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useAddFooter = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addFooter = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await Axios({
                url: `${ApiConfig.footerLink}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: payload,
            });

            toast.success(response?.data?.message || "Footer link added successfully!");
        } catch (err) {
            console.error("Error adding footer link:", err);

            const errorMessage = err.response?.data?.message || "Failed to add footer link.";
            toast.error(errorMessage);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { addFooter, loading, error };
};
