import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useGetFirstRowData = (templateId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${ApiConfig.getFirstRowbyTemplateId}/${templateId}`;
      try {
        const token = localStorage.getItem("token");
        const res = await axios({
          url,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
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

export default useGetFirstRowData;
