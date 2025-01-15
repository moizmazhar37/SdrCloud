import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useDeleteCategory = (refetch) => {
    const [loading, setLoading] = useState(false);

    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            const response = await axios({
                url: `${ApiConfig.category}/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response?.status === 200) {
                toast.success("Category Deleted Successfully");
                if (refetch) {
                    refetch();
                }
            }
        } catch (error) {
            toast.error("Failed to delete the category");
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategory, loading };
};

export default useDeleteCategory;
