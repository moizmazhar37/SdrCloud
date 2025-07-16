import { useState, useEffect } from "react";
import { url } from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-hot-toast";

const useGetAgents = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${url}/campaign/agents`, {
        headers,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred while fetching agents.";

      toast.error(message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return { loading, error, data, refetch: fetchAgents };
};

export default useGetAgents;
