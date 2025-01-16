import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useGetSheetData = (templateId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSheetType = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("In API");
      const res = await axios.get(`${ApiConfig.headers}/${templateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.status === 200) {
        setData(res?.data);
      }
    } catch (error) {
      console.log("error", error);
      setError(error?.response?.data?.message || "Something went wrong");
      toast.error(error?.response?.data?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (templateId) {
      getSheetType();
    }
  }, [templateId]);

  return { data, loading, error };
};

export default useGetSheetData;
