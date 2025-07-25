import { useState, useEffect } from "react";
import ApiConfig from "src/config/APIConfig";

const useGetDrilldownScreensData = (heading, startDate = null, endDate = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!heading) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchDrilldownData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      try {
        // Build query parameters
        const queryParams = new URLSearchParams({
          headline: heading
        });
        
        if (startDate) {
          queryParams.append('start_date', startDate);
        }
        
        if (endDate) {
          queryParams.append('end_date', endDate);
        }

        const response = await fetch(
          `${ApiConfig.mainDashboard}/drilldown?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorText}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching drilldown data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrilldownData();
  }, [heading, startDate, endDate]);

  return { data, loading, error };
};
export default useGetDrilldownScreensData;
