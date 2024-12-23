import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useGoogleSheetViewData = (sheetId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                url: `${ApiConfig.googleSheet}/${sheetId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setData(response.data);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            fetchData();
    }, []);

    return { data, loading, error, fetchData };
};

// Hook for fetching sheet types
export const useGoogleSheetTypes = (sheetId) => {
    const [sheetData, setSheetData] = useState(null);
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
            setSheetData(res.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            getAllSheet();
    }, []);

    return { sheetData, loading, error, getAllSheet };
};


const requiredDataTypes = [
    "HVO URL (Required)",
    "Email (Required)",
    "Error (Required)",
    "Status (Required)",
];



const saveFieldDataTypeVideo = async () => {
    // setLoading(true);
    const requiredDataTypes = [
        "Final video URL (Required)",
        "Email (Required)",
        "Error (Required)",
        "Status (Required)",
    ];
    const missingDataTypes = requiredDataTypes.filter(dataType => {
        //   return !fieldValue.some(item => item.dataType === dataType);
    });

    if (missingDataTypes.length > 0) {
        //   toast.error(`Please assign the following required data types to fields: ${missingDataTypes.join(", ")}`);
        //   setLoading(false);
        return;
    }
    try {
        const response = await axios({
            url: `${ApiConfig.setHeadersDataType}/${"sheetid"}`,
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
                //   data: fieldValue,
            },
        });
        if (response?.status === 200) {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
};
