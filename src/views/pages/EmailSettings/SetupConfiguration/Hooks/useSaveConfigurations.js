import { useState } from "react";
import axios from "axios";
import { campaign } from "src/config/APIConfig";

const useSaveConfigurations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const saveConfigurations = async (payload) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${campaign}/trigger-conditions`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveConfigurations, loading, error, response };
};

export default useSaveConfigurations;
