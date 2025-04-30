import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useGetSections = (templateId, trigger) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSections = async () => {
      if (!templateId) {
        setData(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${ApiConfig.getTemplatebyID}/${templateId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res?.status === 200) {
          setData(res?.data);
        }
      } catch (error) {
        console.error("Error fetching sheet data:", error);
        setError(error?.response?.data?.message || "Something went wrong on our end. Please try again.");
        toast.error(error?.response?.data?.message || "Something went wrong on our end. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getSections();
  }, [templateId, trigger]);

  return { data, loading, error };
};

export default useGetSections;
