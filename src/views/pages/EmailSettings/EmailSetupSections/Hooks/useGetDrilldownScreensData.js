import { useState, useEffect } from "react";
import ApiConfig from "src/config/APIConfig";

const useGetDrilldownScreensData = (heading) => {
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
        const response = await fetch(
          `${ApiConfig.mainDashboard}/drilldown?headline=${encodeURIComponent(
            heading
          )}`,
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
  }, [heading]);

  return { data, loading, error };
};
export default useGetDrilldownScreensData;
