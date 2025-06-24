import { useEffect, useState } from "react";
import axios from "axios";
import { campaign } from "src/config/APIConfig";

const useGetTriggerFields = (templateId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${campaign}/trigger-fields/${templateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [templateId]);

  return { data, loading, error };
};

export default useGetTriggerFields;
