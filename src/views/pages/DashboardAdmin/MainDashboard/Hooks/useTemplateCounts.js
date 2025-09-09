import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useGraphData = (timeframe = "month") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [GraphData, setData] = useState([]);

  const fetchTemplateCounts = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    try {
      const res = await axios({
        url: `${ApiConfig.mainDashboard}/user-templates`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { timeframe },
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch template counts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplateCounts();
  }, [timeframe]);

  return { loading, error, GraphData };
};

export default useGraphData;
