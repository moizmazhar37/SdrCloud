import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useProspectUserList = (templateId, tempType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${ApiConfig.prospects}/${tempType}/${templateId}`;
        const res = await axios({
          method: "GET",
          url,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res?.status === 200) {
          setData(res?.data?.sheet_data);
        }
      } catch (error) {
        setError(error);
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (templateId && tempType) {
      fetchData();
    }
  }, [templateId, tempType]);

  return { loading, error, data };
};

export default useProspectUserList;
