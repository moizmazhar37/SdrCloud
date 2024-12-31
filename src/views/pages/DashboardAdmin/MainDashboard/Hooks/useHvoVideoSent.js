import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useHvoVideoSent = (timeframe = "month", isViewed = true) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hvoVideoData, setData] = useState([]);

  const fetchHvoVideoData = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    try {
      const res = await axios({
        url: `${ApiConfig.mainDashboard}/user-template-data`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { timeframe, is_viewed: isViewed },
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch HVO/Video sent data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHvoVideoData();
  }, [timeframe, isViewed]);

  return { loading, error, hvoVideoData };
};

export default useHvoVideoSent;
