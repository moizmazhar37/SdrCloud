import { useState } from "react";
import Axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useAddCateogry = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addCategory = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await Axios({
                url: `${ApiConfig.category}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: payload,
            });

            toast.success(response?.data?.message || "Category added successfully.");
        } catch (err) {
            console.error("Error adding category:", err);

            const errorMessage = err.response?.data?.message || "Failed to add category.";
            toast.error(errorMessage);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { addCategory, loading, error };
};
