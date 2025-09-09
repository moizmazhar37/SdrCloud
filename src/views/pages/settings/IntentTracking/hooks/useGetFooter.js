import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useGetFooters = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFooters = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                url: `${ApiConfig.footerLink}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response?.status === 200) {
                setData(response.data);
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (err) {
            setError(
                err.response?.data?.msg || err.message || "Something went wrong on our end. Please try again.g"
            );
            setData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFooters();
    }, [fetchFooters]);

    return { data, loading, error, refetch: fetchFooters };
};

export default useGetFooters;
