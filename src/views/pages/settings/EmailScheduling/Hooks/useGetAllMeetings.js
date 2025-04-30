// src/hooks/useGetAllMeetings.js
import { useEffect, useState } from "react";
import { tenantMeeting } from "src/config/APIConfig";

const useGetAllMeetings = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${tenantMeeting}/meetings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || "Failed to fetch meetings");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return { data, error, loading };
};

export default useGetAllMeetings;
