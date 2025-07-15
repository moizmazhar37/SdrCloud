import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "src/config/APIConfig";

const useDuplicateTemplate = (refetch) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const duplicateTemplate = async (id) => {
        setLoading(true);
        try {
            const response = await axios({
                url: `${url}/templates/duplicate/${id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response?.status === 200) {
                setData(response.data);
                toast.success("Template Duplicated Successfully.");
                if (refetch) {
                    refetch();
                }
                return response.data; 
            }
        } catch (error) {
            const errorMessage = error.response?.data?.detail || "Failed to duplicate the template";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return { duplicateTemplate, loading, data };
};

export default useDuplicateTemplate;
