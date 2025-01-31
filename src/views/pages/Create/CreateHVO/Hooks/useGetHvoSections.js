import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useHvoSections = (templateId) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const res = await axios({
          method: "GET",
          url: `${ApiConfig.getHVOTemplateById}/${templateId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res?.status === 200) {
          setData(res.data); // Store the successful response data
        } else {
          setError("Unexpected response from the server.");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchData();
    }
  }, [templateId]);

  return { data, error, loading };
};

export default useHvoSections;
