import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useHvoSections = (templateId, trigger = false) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios({
          method: "GET",
          url: `${ApiConfig.getHVOTemplateById}/${templateId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res?.status === 200) {
          setData(res.data);
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
  }, [templateId, trigger]);

  return { data, error, loading };
};

export default useHvoSections;
