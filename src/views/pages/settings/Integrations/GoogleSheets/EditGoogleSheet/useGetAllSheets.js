import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

// Hook for fetching sheet types
export const useGoogleSheetTypes = (sheetId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllSheet = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios({
                method: "GET",
                url: `${ApiConfig.googleSheetDataTypes}/${sheetId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setData(res.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong on our end. Please try again.");
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllSheet();
    }, []);

    return { data, loading, error, getAllSheet };
};


export const useSaveGoogleSheetTypes = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveSheetTypes = async (sheetId, fieldValue) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                url: `${ApiConfig.setHeadersDataType}/${sheetId}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: {
                    data: fieldValue,
                },
            });

            if (response?.status === 200) {
                toast.success("Sheet types saved successfully.");
                return response.data; 
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to save sheet types. Please try again.");
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { saveSheetTypes, loading, error };
};