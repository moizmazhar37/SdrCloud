import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { leads } from "src/config/APIConfig";

const useLeadsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(leads, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
        toast.error("Unable to fetch leads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return { data, loading, error };
};

export default useLeadsDashboard;
