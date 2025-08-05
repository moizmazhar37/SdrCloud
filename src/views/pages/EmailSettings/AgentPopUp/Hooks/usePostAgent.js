import { useState } from "react";
import { url } from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";

const usePostAgent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postAgent = async (name, email) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ name, email });

      const response = await axios.post(`${url}/campaign/agent`, body, {
        headers,
      });

      setData(response.data);
      toast.success("Agent created successfully!");
      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred while posting agent.";

      toast.error(message);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, postAgent };
};

export default usePostAgent;
