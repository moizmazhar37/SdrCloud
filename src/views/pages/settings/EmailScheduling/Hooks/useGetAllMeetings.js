// src/hooks/useGetAllMeetings.js
import { useCallback, useEffect, useState } from "react";
import { tenantMeeting } from "src/config/APIConfig";

const useGetAllMeetings = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    setError(null);

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
      return result;
    } catch (err) {
      setError(err.message || "Failed to fetch meetings");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  // Return refetch function along with data, error, and loading
  return { data, error, loading, refetch: fetchMeetings };
};

export default useGetAllMeetings;
