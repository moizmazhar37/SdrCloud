import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useLeads = (hostName, timeframe = 'month') => {
  const [leadsData, setLeadsData] = useState(null);
  const [isLeadsLoading, setIsLeadsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLeadsLoading(true);
      setIsError(false);

      try {
        const token = localStorage.getItem('token');
        const res = await axios({
          url: `${ApiConfig.mainDashboard}/leads/${hostName}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { timeframe },
        });
        
        setLeadsData(res.data);
      } catch (error) {
        console.error("Error fetching leads data:", error);
        setIsError(true);
      } finally {
        setIsLeadsLoading(false);
      }
    };

    if (hostName) {
      fetchLeads();
    }
  }, [hostName, timeframe]);

  return { leadsData, isLeadsLoading, isError };
};

export default useLeads;