import { useState, useEffect } from "react";
import axios from "axios";
import { emailTemplate } from "src/config/APIConfig";

const useFetchScheduleEmails = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    const token = localStorage.getItem("token");
    const url = `${emailTemplate}/all-schedules`;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchedules(response.data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return { schedules, loading, error, refetch: fetchSchedules };
};

export default useFetchScheduleEmails;
