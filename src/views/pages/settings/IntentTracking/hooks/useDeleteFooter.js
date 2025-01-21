import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useDeleteFooter = (refetch) => {
    const [loading, setLoading] = useState(false);

    const deleteFooter = async (id) => {
        setLoading(true);
        try {
            const response = await axios({
                url: `${ApiConfig.footerLink}/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response?.status === 200) {
                toast.success("Footer Link Deleted Successfully");
                if (refetch) {
                    refetch();
                }
            }
        } catch (error) {
            toast.error("Failed to delete the footer link");
        } finally {
            setLoading(false);
        }
    };

    return { deleteFooter, loading };
};

export default useDeleteFooter;
